/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Car, 
  Utensils, 
  Zap, 
  ShoppingBag, 
  Check, 
  RotateCcw, 
  Leaf, 
  Footprints,
  CloudRain,
  Trophy,
  Share2,
  ArrowRight
} from 'lucide-react';

type Category = '이동' | '음식' | '에너지' | '소비';
type Status = 'good' | 'neutral' | 'warning';

interface QuizItem {
  id: string;
  category: Category;
  text: string;
  status: Status;
}

const QUIZ_ITEMS: QuizItem[] = [
  // 이동
  { id: 't1', category: '이동', text: '자가용으로 등하교/출퇴근한다', status: 'warning' },
  { id: 't2', category: '이동', text: '대중교통(버스/지하철) 이용', status: 'neutral' },
  { id: 't3', category: '이동', text: '가까운 거리는 걷거나 자전거 이용', status: 'good' },
  { id: 't4', category: '이동', text: '엘리베이터 대신 계단 이용하기', status: 'good' },
  
  // 음식
  { id: 'f1', category: '음식', text: '매일 고기(육류)를 먹는다', status: 'warning' },
  { id: 'f2', category: '음식', text: '채소와 과일 중심의 식단', status: 'good' },
  { id: 'f3', category: '음식', text: '음식을 자주 남긴다', status: 'warning' },
  { id: 'f4', category: '음식', text: '음식물을 남기지 않고 다 먹기', status: 'good' },
  { id: 'f5', category: '음식', text: '제철 식재료 사용하기', status: 'good' },

  // 에너지
  { id: 'e1', category: '에너지', text: '사용하지 않는 전등 끄기', status: 'good' },
  { id: 'e2', category: '에너지', text: '에어컨/히터 3시간 이상 사용', status: 'warning' },
  { id: 'e3', category: '에너지', text: '안 쓰는 플러그 꽂아두기', status: 'warning' },
  { id: 'e4', category: '에너지', text: '안 쓰는 플러그 뽑아두기', status: 'good' },
  { id: 'e5', category: '에너지', text: '적정 실내 온도 유지하기', status: 'good' },

  // 소비
  { id: 's1', category: '소비', text: '일회용 컵/빨대 자주 사용', status: 'warning' },
  { id: 's2', category: '소비', text: '텀블러와 에코백 사용', status: 'good' },
  { id: 's3', category: '소비', text: '새 옷이나 물건 자주 사기', status: 'warning' },
  { id: 's4', category: '소비', text: '분리배출 철저히 하기', status: 'good' },
  { id: 's5', category: '소비', text: '이면지 활용하기', status: 'good' },
];

const CATEGORIES: { name: Category; icon: React.ReactNode; color: string }[] = [
  { name: '이동', icon: <Car className="w-5 h-5" />, color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  { name: '음식', icon: <Utensils className="w-5 h-5" />, color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
  { name: '에너지', icon: <Zap className="w-5 h-5" />, color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  { name: '소비', icon: <ShoppingBag className="w-5 h-5" />, color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
];

export default function App() {
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
  const [showResult, setShowResult] = useState(false);

  const toggleCheck = (id: string) => {
    const newSet = new Set(checkedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setCheckedIds(newSet);
  };

  const greenCount = useMemo(() => {
    return Array.from(checkedIds).filter(id => {
      const item = QUIZ_ITEMS.find(i => i.id === id);
      return item?.status === 'good';
    }).length;
  }, [checkedIds]);

  const resultData = useMemo(() => {
    if (greenCount >= 7) {
      return {
        title: '에코 히어로',
        description: '와우! 당신은 지구를 지키는 진정한 환경 지킴이예요! 친구들에게도 노하우를 알려주세요.',
        mission: '친구들에게 전파하기! 📢',
        icon: <Leaf className="w-20 h-20 text-emerald-400" />,
        color: 'border-emerald-500/50 shadow-emerald-500/20',
        badge: '7 ~ 10개',
        badgeColor: 'bg-emerald-500/20 text-emerald-400'
      };
    } else if (greenCount >= 4) {
      return {
        title: '그린 워커',
        description: '잘하고 있어요! 조금만 더 노력하면 지구가 훨씬 건강해질 거예요.',
        mission: '습관 하나 더 만들기! ✨',
        icon: <Footprints className="w-20 h-20 text-yellow-400" />,
        color: 'border-yellow-500/50 shadow-yellow-500/20',
        badge: '4 ~ 6개',
        badgeColor: 'bg-yellow-500/20 text-yellow-400'
      };
    } else {
      return {
        title: '탄소 빌런',
        description: '앗! 지구가 아파하고 있어요. 오늘부터 하나씩 바꾸면 충분히 영웅이 될 수 있어요!',
        mission: '지금 바로 하나 실천하기! 🔥',
        icon: <CloudRain className="w-20 h-20 text-red-400" />,
        color: 'border-red-500/50 shadow-red-500/20',
        badge: '0 ~ 3개',
        badgeColor: 'bg-red-500/20 text-red-400'
      };
    }
  }, [greenCount]);

  const resetQuiz = () => {
    setCheckedIds(new Set());
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-[#0f1117] text-gray-100 font-sans selection:bg-emerald-500/30">
      {/* Grid Background */}
      <div className="fixed inset-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <main className="relative z-10 max-w-5xl mx-auto px-4 py-12 md:py-20">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <header className="text-center space-y-4">
                <motion.div 
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium tracking-wide uppercase"
                >
                  05
                </motion.div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                  체크리스트: <span className="text-emerald-400">오늘의 탄소 발자국</span> 👣
                </h1>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {CATEGORIES.map((cat) => (
                  <div key={cat.name} className="space-y-4">
                    <div className={`flex items-center gap-3 p-3 rounded-xl border ${cat.color} font-bold justify-center`}>
                      {cat.icon}
                      <span>{cat.name}</span>
                    </div>
                    <div className="space-y-3">
                      {QUIZ_ITEMS.filter(item => item.category === cat.name).map((item) => (
                        <button
                          key={item.id}
                          onClick={() => toggleCheck(item.id)}
                          className={`w-full group relative flex items-start gap-3 p-4 rounded-xl border transition-all duration-200 text-left
                            ${checkedIds.has(item.id) 
                              ? 'bg-white/10 border-white/30 shadow-lg' 
                              : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'}`}
                        >
                          <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-colors
                            ${checkedIds.has(item.id) ? 'bg-emerald-500 border-emerald-500' : 'border-white/20'}`}>
                            {checkedIds.has(item.id) && <Check className="w-3.5 h-3.5 text-white" />}
                          </div>
                          <span className="text-sm leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                            {item.text}
                          </span>
                          <div className={`absolute top-4 right-4 w-2 h-2 rounded-full shadow-sm
                            ${item.status === 'good' ? 'bg-emerald-500 shadow-emerald-500/50' : 
                              item.status === 'neutral' ? 'bg-yellow-500 shadow-yellow-500/50' : 
                              'bg-red-500 shadow-red-500/50'}`} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <footer className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10">
                <div className="flex items-center gap-6 text-xs font-medium opacity-60">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span>탄소 적게 배출 (Good!)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <span>보통</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span>탄소 많이 배출 (Warning!)</span>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowResult(true)}
                  className="group relative px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-xl shadow-emerald-500/20"
                >
                  결과 확인하기
                  <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </footer>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="max-w-2xl mx-auto space-y-8"
            >
              <div className={`relative overflow-hidden rounded-[2.5rem] border-2 p-8 md:p-12 text-center space-y-8 bg-white/5 backdrop-blur-xl ${resultData.color}`}>
                {/* Decorative background circle */}
                <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[100px] opacity-20 ${resultData.badgeColor.split(' ')[0]}`} />
                
                <div className="space-y-6">
                  <div className={`inline-block px-6 py-2 rounded-full font-bold text-lg ${resultData.badgeColor}`}>
                    🟢 {resultData.badge}
                  </div>
                  
                  <div className="flex justify-center">
                    <motion.div
                      initial={{ rotate: -10, scale: 0.5 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ type: 'spring', damping: 12 }}
                      className="relative"
                    >
                      <div className="absolute inset-0 blur-2xl opacity-40 bg-current" />
                      {resultData.icon}
                      {greenCount >= 7 && <Trophy className="absolute -top-2 -right-2 w-8 h-8 text-yellow-500 drop-shadow-lg" />}
                    </motion.div>
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-5xl font-black tracking-tight">{resultData.title}</h2>
                    <p className="text-lg text-gray-400 leading-relaxed max-w-md mx-auto">
                      {resultData.description}
                    </p>
                  </div>
                </div>

                <div className="pt-8 space-y-6">
                  <div className="bg-black/40 rounded-3xl p-6 border border-white/5">
                    <p className="text-xs uppercase tracking-[0.2em] font-bold text-gray-500 mb-2">Mission</p>
                    <p className="text-xl font-bold">{resultData.mission}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => {
                        const text = `[오늘 나의 탄소 발자국]\n결과: ${resultData.title}\n점수: ${greenCount}개\n미션: ${resultData.mission}`;
                        navigator.clipboard.writeText(text);
                        alert('결과가 클립보드에 복사되었습니다! 친구들에게 공유해보세요.');
                      }}
                      className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 font-bold transition-all"
                    >
                      <Share2 className="w-5 h-5" />
                      결과 복사
                    </button>
                    <button
                      onClick={resetQuiz}
                      className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-emerald-500 text-black font-bold transition-all hover:bg-emerald-400"
                    >
                      <RotateCcw className="w-5 h-5" />
                      다시 하기
                    </button>
                  </div>
                </div>
              </div>
              
              <p className="text-center text-sm text-gray-500">
                해당하는 항목을 체크하고 초록색(🟢) 개수를 세어보세요!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
