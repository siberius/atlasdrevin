import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API proxy endpoint for wood macro/micro images to prevent hotlink blocks
  app.get("/api/image-proxy", async (req, res) => {
    try {
      const urlString = req.query.url as string;
      if (!urlString) {
        return res.status(400).send("Parameter url is required");
      }

      // Basic validation to only allow common domains we use
      const targetUrl = new URL(urlString);
      const allowedHosts = [
        "upload.wikimedia.org",
        "www.wsl.ch",
        "wsl.ch",
        "www.wood-database.com",
        "wood-database.com",
        "stavbadreva.ldf.mendelu.cz"
      ];
      
      const isAllowed = allowedHosts.some(host => 
        targetUrl.hostname === host || targetUrl.hostname.endsWith("." + host)
      );

      if (!isAllowed) {
        return res.status(403).send("Host not allowed");
      }

      // Add appropriate headers to satisfy hotlinking protections
      const headers: Record<string, string> = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      };

      if (targetUrl.hostname.includes("wikimedia.org")) {
        headers["Referer"] = "https://commons.wikimedia.org/";
      } else if (targetUrl.hostname.includes("wsl.ch")) {
        headers["Referer"] = "https://www.wsl.ch/";
      } else if (targetUrl.hostname.includes("wood-database.com")) {
        headers["Referer"] = "https://www.wood-database.com/";
      } else if (targetUrl.hostname.includes("mendelu.cz")) {
        headers["Referer"] = "https://stavbadreva.ldf.mendelu.cz/";
      }

      const response = await fetch(urlString, { headers });
      if (!response.ok) {
        return res.status(response.status).send(`Failed to fetch image: ${response.statusText}`);
      }

      const buffer = await response.arrayBuffer();
      const contentType = response.headers.get("content-type");
      if (contentType) {
        res.setHeader("content-type", contentType);
      }
      
      // Cache-control for better performance
      res.setHeader("cache-control", "public, max-age=86400");
      res.send(Buffer.from(buffer));
    } catch (error: any) {
      console.error("Proxy error:", error);
      res.status(500).send(`Proxy error: ${error.message}`);
    }
  });

  // API endpoint to search, crawl, and parse anatomical images from Wood Database by Latin name
  app.get("/api/wood-database-images", async (req, res) => {
    try {
      const latinName = req.query.latinName as string;
      if (!latinName) {
        return res.status(400).json({ error: "Parameter latinName is required" });
      }

      // 1. Fetch Wood Database search page
      const searchUrl = `https://www.wood-database.com/?s=${encodeURIComponent(latinName.trim())}`;
      const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
      
      const searchRes = await fetch(searchUrl, {
        headers: { "User-Agent": userAgent }
      });
      
      if (!searchRes.ok) {
        return res.status(500).json({ error: `Failed to fetch search page: ${searchRes.statusText}` });
      }

      const html = await searchRes.text();

      // 2. Parse search results to find the species page URL
      // Look for absolute URLs on wood-database.com that represent a species page.
      // Ignore main paths, pages, categories, search queries etc.
      const pageRegex = /href="(https:\/\/www\.wood-database\.com\/([^"\/]+)\/)"/gi;
      const matchedLinks = [...html.matchAll(pageRegex)];
      
      let speciesPageUrl = "";
      const ignoredPaths = ["category", "about", "contact", "wood-filter", "author", "tag", "page", "uncategorized", "wp-content", "wp-admin", "feed", "search", "articles"];
      
      for (const m of matchedLinks) {
        const fullUrl = m[1];
        const slug = m[2];
        const isIgnored = ignoredPaths.some(ignored => slug === ignored || fullUrl.includes(`/${ignored}/`));
        if (!isIgnored) {
          speciesPageUrl = fullUrl;
          break;
        }
      }

      if (!speciesPageUrl) {
        return res.json({ success: false, message: "No matching species page found on Wood Database" });
      }

      // 3. Fetch the matched species page
      const pageRes = await fetch(speciesPageUrl, {
        headers: { "User-Agent": userAgent }
      });

      if (!pageRes.ok) {
        return res.status(500).json({ error: `Failed to fetch species page: ${pageRes.statusText}` });
      }

      const pageHtml = await pageRes.text();

      // 4. Extract wp-content/uploads images from the page
      // Look for img src URLs or source srcset URLs
      const imgRegex = /(src|href|srcset)="([^"]+\/(?:wp-content\/uploads\/)[^"]+\.(?:jpg|jpeg|png))"/gi;
      const originalUrls = [...pageHtml.matchAll(imgRegex)];
      
      const uniqueImageUrls = new Set<string>();
      for (const m of originalUrls) {
        const urlPart = m[2].split(" ")[0].trim(); // Handle srcset which has content space width
        if (urlPart.startsWith("http")) {
          // Exclude icons, avatars, unrelated sidebars, banners, etc.
          const lowerUrl = urlPart.toLowerCase();
          if (!lowerUrl.includes("logo") && !lowerUrl.includes("avatar") && !lowerUrl.includes("banner") && !lowerUrl.includes("cropped") && !lowerUrl.includes("wds-") && !lowerUrl.includes("ads-") && !lowerUrl.includes("footer")) {
            uniqueImageUrls.add(urlPart);
          }
        }
      }

      const imageUrls = Array.from(uniqueImageUrls);

      // 5. Classify the images into types: Cross section (P), Radial (R), Tangential (T), and Tree/Leaves (tree)
      const classified = {
        P: [] as string[],
        R: [] as string[],
        T: [] as string[],
        tree: [] as string[]
      };

      for (const url of imageUrls) {
        const cleanUrl = url.toLowerCase();
        
        const isTreeOrPlant = cleanUrl.includes("tree") || cleanUrl.includes("leaves") || cleanUrl.includes("leaf") || cleanUrl.includes("fruit") || cleanUrl.includes("bark") || cleanUrl.includes("flower") || cleanUrl.includes("stand") || cleanUrl.includes("branch");
        
        if (isTreeOrPlant) {
          classified.tree.push(url);
        }
        // P (Příčný řez / Endgrain / cross-section)
        else if (cleanUrl.includes("endgrain") || cleanUrl.includes("10x") || cleanUrl.includes("cross") || cleanUrl.includes("transversal")) {
          classified.P.push(url);
        }
        // R (Radiální řez / Radial / Quarter / cleft / split)
        else if (cleanUrl.includes("radial") || cleanUrl.includes("quarter") || cleanUrl.includes("vertical") || cleanUrl.includes("rift")) {
          classified.R.push(url);
        }
        // T (Tangenciální řez / Tangential / Flat / Plain / sealed / wood board)
        else if (cleanUrl.includes("tangential") || cleanUrl.includes("flat") || cleanUrl.includes("plain") || cleanUrl.includes("sealed") || cleanUrl.includes("-face-") || cleanUrl.includes("unsealed") || cleanUrl.includes("-wood")) {
          classified.T.push(url);
        }
        // Generic fallback classification
        else {
          classified.T.push(url);
        }
      }

      return res.json({
        success: true,
        speciesPageUrl,
        images: classified
      });
    } catch (error: any) {
      console.error("Anatomy scraper error:", error);
      return res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
