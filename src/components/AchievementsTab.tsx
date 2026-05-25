import React from 'react';
import { Award, CheckCircle2, Lock, Sparkles, Star, Flame, Percent } from 'lucide-react';
import { UserStats, Achievement } from '../types';
import { ACHIEVEMENTS, ALL_SPECIES } from '../data/woodData';
import { CertificateSection } from './CertificateSection';

interface AchievementsProps {
  stats: UserStats;
}

export const AchievementsTab: React.FC<AchievementsProps> = ({ stats }) => {
  const successRate = stats.totalAnswers > 0 
    ? Math.round((stats.correctAnswers / stats.totalAnswers) * 100) 
    : 0;

  return (
    <div className="space-y-8">
      {/* Visual Stat Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* XP Card */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-3xs flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <Sparkles className="w-5 h-5 fill-emerald-500" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono font-bold text-stone-400">Celkové XP</span>
            <p className="text-xl font-extrabold text-stone-900 font-mono tracking-tight">{stats.xp} XP</p>
          </div>
        </div>

        {/* Streak Card */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-3xs flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
            <Flame className="w-5 h-5 fill-orange-500" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono font-bold text-stone-400">Aktivní Série</span>
            <p className="text-xl font-extrabold text-stone-900 font-mono tracking-tight">{stats.streak} dní</p>
          </div>
        </div>

        {/* Correct Answers */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-3xs flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <CheckCircle2 className="w-5 h-5 fill-blue-500 text-white" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono font-bold text-stone-400">Správně Určeno</span>
            <p className="text-xl font-extrabold text-stone-900 font-mono tracking-tight">{stats.correctAnswers}x</p>
          </div>
        </div>

        {/* Success Rate */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-3xs flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
            <Percent className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono font-bold text-stone-400">Úspěšnost</span>
            <p className="text-xl font-extrabold text-stone-900 font-mono tracking-tight">{successRate}%</p>
          </div>
        </div>
      </div>

      <CertificateSection stats={stats} />

      {/* Main achievements split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Achievements list */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-sm font-extrabold uppercase font-mono text-stone-400 tracking-wider">Trofeje a odznaky</h3>

          <div className="space-y-3">
            {ACHIEVEMENTS.map((ach) => {
              const isUnlocked = stats.unlockedAchievements.includes(ach.id);
              
              return (
                <div
                  key={ach.id}
                  className={`border rounded-2xl p-4 bg-white transition-all flex items-center justify-between ${
                    isUnlocked 
                      ? 'border-emerald-300 shadow-3xs bg-emerald-50/5' 
                      : 'border-stone-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    {/* Badge circle */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border font-semibold ${
                      isUnlocked 
                        ? 'bg-emerald-100 border-emerald-300 text-emerald-800 shadow-sm' 
                        : 'bg-stone-100 border-stone-200 text-stone-400'
                    }`}>
                      {isUnlocked ? <Star className="w-6 h-6 fill-emerald-500 text-emerald-600" /> : <Lock className="w-5 h-5 text-stone-400" />}
                    </div>

                    <div>
                      <h4 className={`text-sm font-bold ${isUnlocked ? 'text-emerald-950' : 'text-stone-700'}`}>
                        {ach.title}
                      </h4>
                      <p className="text-xs text-stone-500 mt-0.5">{ach.description}</p>
                    </div>
                  </div>

                  {isUnlocked && (
                    <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-100/60 px-2.5 py-1 rounded-full border border-emerald-300">
                      Odemčeno
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mastered checklist side block */}
        <div className="lg:col-span-5 bg-white border border-stone-200 rounded-2xl p-5 shadow-3xs space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-stone-100">
            <h3 className="text-xs font-extrabold uppercase font-mono text-stone-400 tracking-wider">Botanická sbírka</h3>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 border border-emerald-200 rounded-full">
              {stats.completedSpeciesIds.length} / {ALL_SPECIES.length} dřevin
            </span>
          </div>

          <p className="text-xs text-stone-500 leading-relaxed">
            Seznam všech 33 druhů českých jehličnatých a listnatých dřevin z university. Klasifikuj druhy v botanickém určovacím klíči k získání sběratelských zelených fajfek!
          </p>

          {/* Quick list of species with checked indicators */}
          <div className="space-y-1 max-h-[300px] overflow-y-auto pr-1">
            {ALL_SPECIES.map((spec) => {
              const isMastered = stats.completedSpeciesIds.includes(spec.id);
              return (
                <div
                  key={spec.id}
                  className={`p-2 rounded-lg flex items-center justify-between text-xs transition-colors ${
                    isMastered 
                      ? 'bg-emerald-50/50 border border-emerald-150/40 text-stone-900' 
                      : 'text-stone-500'
                  }`}
                >
                  <div className="flex items-center space-x-2 truncate">
                    <span className={`w-1.5 h-1.5 rounded-full ${isMastered ? 'bg-emerald-600' : 'bg-stone-300'}`} />
                    <span className="font-semibold truncate">{spec.name}</span>
                    <span className="text-[10px] text-stone-400 italic truncate font-mono">({spec.latinName})</span>
                  </div>

                  {isMastered ? (
                    <CheckCircle2 className="w-4 h-4 fill-emerald-600 text-white shrink-0" />
                  ) : (
                    <span className="text-[9px] font-mono text-stone-400">Chybí</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
