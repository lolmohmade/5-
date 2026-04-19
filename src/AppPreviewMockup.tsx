import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, BookOpen, Clock, Settings, User, Bell, Menu, Moon, Home, Sunrise, Sun, CloudSun, Heart, ArrowLeft, ArrowRight, Battery, Wifi, Signal, Volume2, Compass, ShieldCheck, LogIn, LayoutDashboard } from 'lucide-react';

export function AppPreviewMockup() {
  const [currentScreen, setCurrentScreen] = useState<'splash' | 'home' | 'tasbih' | 'settings' | 'quran' | 'prayer' | 'qibla' | 'admin'>('splash');
  const [selectedSurah, setSelectedSurah] = useState<{ id: number, name: string, type: string, ayats: number, number: string } | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [tasbihCount, setTasbihCount] = useState(99);
  const [adhanSound, setAdhanSound] = useState<string | null>(null);
  const [remindSound, setRemindSound] = useState<string | null>(null);
  const [adhanSoundName, setAdhanSoundName] = useState<string>("الافتراضي");
  const [remindSoundName, setRemindSoundName] = useState<string>("الافتراضي");
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [adhanCountdown, setAdhanCountdown] = useState<number>(0);

  const showToast = (msg: string) => {
      setToastMsg(msg);
      setTimeout(() => setToastMsg(null), 2000);
  };

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (adhanCountdown > 0) {
      interval = setInterval(() => {
        setAdhanCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [adhanCountdown]);

  const handleTasbihClick = () => {
      setTasbihCount(prev => prev + 1);
  };

  const playSound = (type: 'adhan' | 'remind') => {
      if (type === 'adhan' && adhanCountdown > 0) return; // Prevent overlapping adhan

      const url = type === 'adhan' 
        ? adhanSound || 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3' 
        : remindSound || 'https://assets.mixkit.co/active_storage/sfx/1114/1114-preview.mp3';
      
      if (type === 'adhan') {
          setAdhanCountdown(30);
          showToast('بدأ صوت الآذان...');
      }

      const audio = new Audio(url);
      audio.play().catch(console.error);
  };

  const handleSoundUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'adhan' | 'remind') => {
      const file = e.target.files?.[0];
      if (file) {
          const url = URL.createObjectURL(file);
          if (type === 'adhan') {
              setAdhanSound(url);
              setAdhanSoundName(file.name);
          } else {
              setRemindSound(url);
              setRemindSoundName(file.name);
          }
      }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="bg-[#0B1321] rounded-3xl shadow-xl overflow-hidden border border-slate-800 flex flex-col items-center p-8 relative"
    >
        <div className="w-full flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-500/10 rounded-lg">
                <Smartphone className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h2 className="font-bold text-white text-lg">معاينة تفاعلية للتطبيق</h2>
                <p className="text-sm text-slate-400 font-medium">الواجهة الرئيسية الجديدة لتطبيق "المذكر"</p>
              </div>
            </div>
        </div>

        {/* 3D Phone Frame */}
        <div className="relative group perspective-1000 mt-6 mb-4">
            {/* Phone Physical Volume/Power Buttons */}
            <div className="absolute -left-[14px] top-24 w-[14px] h-12 bg-slate-900 rounded-l-md shadow-inner border-l border-y border-slate-800 z-0"></div>
            <div className="absolute -left-[14px] top-40 w-[14px] h-20 bg-slate-900 rounded-l-md shadow-inner border-l border-y border-slate-800 z-0"></div>
            <div className="absolute -right-[14px] top-32 w-[14px] h-16 bg-slate-900 rounded-r-md shadow-inner border-r border-y border-slate-800 z-0"></div>

            <div className={`w-[340px] h-[720px] bg-[#09101E] rounded-[3.5rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.8),_inset_0_4px_15px_rgba(255,255,255,0.1),_inset_0_-4px_20px_rgba(0,0,0,0.8)] border-[12px] border-[#050914] relative overflow-hidden flex flex-col transition-all duration-500 transform group-hover:rotate-y-1 group-hover:-rotate-x-1 z-10 font-sans`} dir="rtl">
              
              {/* Top Notch */}
              <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-50">
                 <div className="w-32 h-7 bg-[#050914] rounded-b-3xl"></div>
              </div>

              {/* Status Bar (Fake) */}
              <div className="absolute top-0 inset-x-0 h-10 px-6 flex justify-between items-center text-white text-[11px] font-medium z-40" dir="ltr">
                  <span>9:41</span>
                  <div className="flex gap-1.5 items-center">
                      <Signal className="w-3.5 h-3.5" />
                      <Wifi className="w-3.5 h-3.5" />
                      <Battery className="w-4 h-4" />
                  </div>
              </div>

              {/* Screens */}
              <AnimatePresence mode="wait">
                  {/* Notification Center */}
                  <AnimatePresence>
                      {adhanCountdown > 0 && (
                          <motion.div 
                              initial={{ y: -50, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: -50, opacity: 0 }}
                              className="absolute top-12 inset-x-6 z-50 pointer-events-none"
                          >
                              <div className="bg-amber-500/90 backdrop-blur-md rounded-2xl p-4 border border-amber-400/30 shadow-2xl flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                                          <Volume2 className="w-5 h-5 text-white" />
                                      </div>
                                      <div>
                                          <h4 className="text-white text-xs font-bold">يرفع الآن أذان الصلاة</h4>
                                          <p className="text-white/80 text-[10px]">متبقي {adhanCountdown} ثانية</p>
                                      </div>
                                  </div>
                                  <div className="w-8 h-8 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                              </div>
                          </motion.div>
                      )}
                  </AnimatePresence>

                  {currentScreen === 'splash' && (
                      <motion.div key="splash" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 bg-[#09101E] flex flex-col items-center text-center px-8 pb-12 pt-24 z-20">
                           {/* Decorative Lanterns - Fake with CSS */}
                           <div className="flex-1 flex flex-col items-center justify-center w-full relative">
                                <div className="absolute top-10 font-extrabold text-9xl text-amber-500/20 blur-sm">🌙</div>
                                <div className="relative w-32 h-32 flex items-center justify-center transform hover:scale-105 transition-transform duration-700">
                                   <div className="absolute inset-0 bg-amber-500/10 blur-2xl rounded-full"></div>
                                   <BookOpen className="w-16 h-16 text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]" />
                                </div>
                           </div>

                           <div className="mb-12">
                               <h1 className="text-3xl font-extrabold text-white mb-4 tracking-tight drop-shadow-md">تواصل مع<br/>القرآن</h1>
                               <p className="text-slate-400 text-sm leading-relaxed px-4">
                                   قم ببناء صلة أعمق مع القرآن من خلال التلاوة اليومية والتأمل.
                               </p>
                           </div>
                           
                           <div className="flex gap-2 mb-10">
                               <div className="w-6 h-1.5 bg-cyan-500 rounded-full"></div>
                               <div className="w-1.5 h-1.5 bg-slate-600 rounded-full"></div>
                               <div className="w-1.5 h-1.5 bg-slate-600 rounded-full"></div>
                           </div>

                           <button onClick={() => setCurrentScreen('home')} className="w-16 h-16 bg-[#162738] border border-cyan-700/50 rounded-full flex items-center justify-center text-cyan-400 shadow-[0_10px_20px_rgba(0,0,0,0.5)] hover:scale-105 transition-transform">
                              <ArrowLeft className="w-6 h-6" /> 
                           </button>
                      </motion.div>
                  )}
                  {/* HOME SCREEN */}
                  {currentScreen === 'home' && (
                     <motion.div key="home" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 bg-[#09101E] flex flex-col z-20 overflow-hidden">
                          {/* Top Bar */}
                          <div className="px-6 top-12 absolute inset-x-0 flex justify-between items-center z-30">
                              <button onClick={() => setCurrentScreen('settings')} className="w-10 h-10 rounded-[14px] border border-white/10 flex items-center justify-center text-white bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors">
                                  <Settings className="w-5 h-5" />
                              </button>
                              <div className="flex items-center gap-3">
                                  <button onClick={() => playSound('remind')} className="w-10 h-10 rounded-[14px] border border-white/10 flex items-center justify-center text-white bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors">
                                      <Bell className="w-5 h-5" />
                                  </button>
                                  <button onClick={() => playSound('adhan')} className="w-10 h-10 rounded-[14px] overflow-hidden border border-white/10 bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors">
                                      <Volume2 className="w-5 h-5 text-emerald-400" />
                                  </button>
                              </div>
                          </div>

                          <div className="flex-1 overflow-y-auto px-6 pb-32 pt-28 no-scrollbar relative">
                              {/* Background mosque silhouette effect */}
                              <div className="absolute inset-x-0 bottom-0 top-32 bg-gradient-to-b from-transparent to-[#050A15] pointer-events-none z-0"></div>

                              {/* Hero Banner */}
                              <div className="w-full rounded-3xl bg-gradient-to-br from-[#122340] to-[#0A1325] border border-white/10 p-6 relative overflow-hidden mb-8 shadow-2xl z-10">
                                  <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-center opacity-40">
                                      <Moon className="w-24 h-24 text-amber-400 translate-x-6 drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]" />
                                  </div>
                                  <div className="relative z-10 w-2/3">
                                      <h3 className="text-xl font-bold text-white mb-1.5 leading-tight text-right">ابدأ في سبحة<br/>الأذكار</h3>
                                      <p className="text-[10px] text-slate-400 mb-4 tracking-wide text-right">اذكر الله في كل يوم</p>
                                      <div className="flex justify-start">
                                          <button onClick={() => setCurrentScreen('tasbih')} className="text-xs text-white border border-white/20 rounded-full px-4 py-1.5 font-medium hover:bg-white/10 transition-colors">
                                              ابدأ الآن
                                          </button>
                                      </div>
                                  </div>
                                  <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
                                     <div className="w-4 h-1 bg-cyan-500 rounded-full"></div>
                                     <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
                                     <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
                                  </div>
                              </div>

                              {/* Features */}
                              <div className="mb-6 z-10 relative">
                                  <div className="flex justify-between items-end mb-4">
                                      <h4 className="text-white font-bold tracking-wide text-right">المميزات</h4>
                                      <span className="text-[11px] text-slate-400 font-medium text-right">عرض الكل</span>
                                  </div>
                                  <div className="grid grid-cols-3 gap-3">
                                      {[
                                        {icon:BookOpen, title:'القرآن', color:'text-cyan-400', action: () => setCurrentScreen('quran')},
                                        {icon:Heart, title:'الدعاء', color:'text-blue-400', action: () => showToast('جاري فتح الأدعية...')},
                                        {icon:Settings, title:'تبرع', color:'text-rose-400', action: () => showToast('ميزة التبرع ستتوفر لاحقاً')},
                                      ].map((f, i) => (
                                          <div key={i} onClick={f.action} className="flex flex-col items-center justify-center bg-[#131E32]/60 border border-white/5 rounded-2xl aspect-[4/4.5] hover:bg-[#1A263D] transition-colors cursor-pointer shadow-lg backdrop-blur-sm">
                                              <f.icon className={`w-6 h-6 mb-2 ${f.color}`} strokeWidth={2} />
                                              <span className="text-[11px] text-white font-medium">{f.title}</span>
                                          </div>
                                      ))}
                                  </div>
                              </div>

                              {/* Prayer Alerts */}
                              <div className="mb-8 z-10 relative">
                                  <div className="flex justify-between items-end mb-4">
                                      <h4 className="text-white font-bold tracking-wide text-right">منبه الصلوات</h4>
                                      <span className="text-[11px] text-slate-400 font-medium text-right">عرض الكل</span>
                                  </div>
                                  <div className="space-y-3">
                                      {[
                                        {name:'الفجر', time:'04:50', icon:Sunrise, active:true, action: () => showToast('تم تفعيل/إلغاء منبه الفجر')},
                                        {name:'الظهر', time:'13:30', icon:Sun, active:false, action: () => showToast('تم تفعيل/إلغاء منبه الظهر')},
                                        {name:'العصر', time:'16:45', icon:CloudSun, active:false, action: () => showToast('تم تفعيل/إلغاء منبه العصر')},
                                      ].map((p, i) => (
                                          <div key={i} onClick={p.action} className="flex items-center justify-between p-4 bg-[#131E32]/60 backdrop-blur-sm border border-white/5 rounded-2xl shadow-lg mt-0 cursor-pointer hover:bg-white/5 transition-colors">
                                              <div className="flex items-center gap-4">
                                                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                                                      <p.icon className="w-5 h-5 text-slate-300" strokeWidth={1.5} />
                                                  </div>
                                                  <div className="text-right">
                                                      <h5 className="text-white font-medium text-sm mb-0.5">{p.name}</h5>
                                                      <p className="text-[11px] text-slate-400 font-mono">{p.time}</p>
                                                  </div>
                                              </div>
                                              <div className={`w-11 h-6 rounded-full flex items-center p-0.5 transition-colors ${p.active ? 'bg-cyan-500' : 'bg-[#1A263D]'}`}>
                                                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ${p.active ? 'translate-x-0' : '-translate-x-5'}`}></div>
                                              </div>
                                          </div>
                                      ))}
                                  </div>
                              </div>
                          </div>

                          {/* Floating Bottom Nav */}
                          <div className="absolute bottom-6 inset-x-6 h-16 bg-[#182336]/90 border border-white/10 rounded-full px-2 flex justify-between items-center shadow-2xl z-40 backdrop-blur-xl" dir="ltr">
                              <button onClick={() => setCurrentScreen('home')} className="w-12 h-12 rounded-full bg-[#050914] text-white flex items-center justify-center shadow-inner">
                                  <Home className="w-5 h-5" />
                              </button>
                              <button onClick={() => setCurrentScreen('quran')} className="w-12 h-12 rounded-full text-slate-400 hover:text-white flex items-center justify-center transition-colors">
                                  <BookOpen className="w-5 h-5" />
                              </button>
                              <button onClick={() => setCurrentScreen('prayer')} className="w-12 h-12 rounded-full text-slate-400 hover:text-white flex items-center justify-center transition-colors">
                                  <Clock className="w-5 h-5" />
                              </button>
                              <button onClick={() => setCurrentScreen('qibla')} className="w-12 h-12 rounded-full text-slate-400 hover:text-white flex items-center justify-center transition-colors">
                                  <Compass className="w-5 h-5" />
                              </button>
                              <button onClick={() => setCurrentScreen('settings')} className="w-12 h-12 rounded-full text-slate-400 hover:text-white flex items-center justify-center transition-colors">
                                  <Settings className="w-5 h-5" />
                              </button>
                          </div>
                     </motion.div>
                  )}
                  {/* TASBIH SCREEN */}
                  {currentScreen === 'tasbih' && (
                      <motion.div key="tasbih" initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} exit={{opacity:0}} className="absolute inset-0 bg-[#09101E] flex flex-col z-20">
                          {/* Background Glow */}
                          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-900/10 blur-[100px] rounded-full z-0 pointer-events-none"></div>
                          
                          {/* Top Bar */}
                          <div className="px-6 top-12 absolute inset-x-0 flex justify-between items-center z-30">
                              <button onClick={() => setCurrentScreen('home')} className="w-10 h-10 rounded-[14px] border border-white/10 flex items-center justify-center text-white bg-white/5 backdrop-blur-md">
                                  <ArrowRight className="w-5 h-5" />
                              </button>
                              <span className="text-white font-bold tracking-wide">المسبحة الإلكترونية</span>
                              <button className="w-10 h-10 rounded-[14px] border border-white/10 flex items-center justify-center text-white bg-white/5 backdrop-blur-md">
                                  <Bell className="w-5 h-5" />
                              </button>
                          </div>

                          <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20 relative z-10 pt-24">
                              <div className="w-full flex justify-between text-sm text-slate-300 font-medium mb-12">
                                  <span className="tracking-wide">الهدف: 100</span>
                                  <span className="tracking-wide">المجموعة: 1</span>
                              </div>

                              <div className="flex-1 flex flex-col items-center justify-center w-full">
                                  <h2 className="text-6xl font-black text-white mb-10 tracking-widest drop-shadow-2xl text-center" dir="rtl" style={{ textShadow: "0 4px 20px rgba(255,255,255,0.1)" }}>
                                      (اللَّهُ أَكْبَرُ)
                                  </h2>
                                  
                                  <div className="bg-white/5 border border-white/10 rounded-full px-5 py-1.5 mb-10">
                                      <span className="text-slate-300 text-sm font-mono tracking-wider" dir="ltr">0:00:36</span>
                                  </div>

                                  <div className="text-sm text-slate-300 mb-4 font-medium tracking-wide">عداد المسبحة</div>
                                  
                                  <div className="text-8xl font-sans font-bold text-[#0D94A6] drop-shadow-[0_0_25px_rgba(13,148,166,0.5)] mb-16 tracking-widest leading-none">
                                      {tasbihCount.toString().padStart(3, '0')}
                                  </div>

                                  <div className="bg-[#101A2B]/80 backdrop-blur-2xl border border-white/5 rounded-full p-2 flex items-center gap-2 justify-center shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                                      <button className="w-16 h-16 rounded-full bg-gradient-to-b from-[#182840] to-[#0D1524] shadow-inner flex-shrink-0 transition-transform active:scale-95 border border-white/5"></button>
                                      <button onClick={handleTasbihClick} className="w-20 h-20 rounded-full bg-gradient-to-b from-[#1FA2B6] to-[#0A6B7A] shadow-[0_0_30px_rgba(31,162,182,0.4),inset_0_2px_10px_rgba(255,255,255,0.3)] flex items-center justify-center text-white flex-shrink-0 transition-transform active:scale-95 hover:scale-105 border border-[#40C5D6]/30">
                                      </button>
                                      <button className="w-16 h-16 rounded-full bg-gradient-to-b from-[#182840] to-[#0D1524] shadow-inner flex-shrink-0 transition-transform active:scale-95 border border-white/5"></button>
                                  </div>
                              </div>
                          </div>
                      </motion.div>
                  )}
                  {/* QURAN SCREEN */}
                  {currentScreen === 'quran' && (
                      <motion.div key="quran" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} className="absolute inset-0 bg-[#09101E] flex flex-col z-20">
                          {/* Top Bar */}
                          <div className="px-6 top-12 absolute inset-x-0 flex justify-between items-center z-30">
                              <button onClick={() => setCurrentScreen('home')} className="w-10 h-10 rounded-[14px] border border-white/10 flex items-center justify-center text-white bg-white/5 backdrop-blur-md">
                                  <ArrowRight className="w-5 h-5" />
                              </button>
                              <span className="text-white font-bold tracking-wide">القرآن الكريم</span>
                              <div className="w-10"></div>
                          </div>

                          <div className="flex-1 overflow-hidden flex flex-col pt-28">
                              {/* Search Bar Mockup */}
                              <div className="px-6 mb-6">
                                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
                                      <Menu className="w-5 h-5 text-slate-500" />
                                      <span className="text-slate-500 text-sm">ابحث عن السورة...</span>
                                  </div>
                              </div>

                              {/* Surah List */}
                              <div className="flex-1 overflow-y-auto px-6 pb-24 space-y-3 no-scrollbar">
                                  {[
                                    { id: 1, name: 'سورة الفاتحة', type: 'مكية', ayats: 7, number: '١' },
                                    { id: 2, name: 'سورة البقرة', type: 'مدنية', ayats: 286, number: '٢' },
                                    { id: 3, name: 'سورة آل عمران', type: 'مدنية', ayats: 200, number: '٣' },
                                    { id: 4, name: 'سورة النساء', type: 'مدنية', ayats: 176, number: '٤' },
                                    { id: 5, name: 'سورة المائدة', type: 'مدنية', ayats: 120, number: '٥' },
                                    { id: 6, name: 'سورة الأنعام', type: 'مكية', ayats: 165, number: '٦' },
                                    { id: 7, name: 'سورة الأعراف', type: 'مكية', ayats: 206, number: '٧' },
                                    { id: 112, name: 'سورة الإخلاص', type: 'مكية', ayats: 4, number: '١١٢' },
                                    { id: 113, name: 'سورة الفلق', type: 'مكية', ayats: 5, number: '١١٣' },
                                    { id: 114, name: 'سورة الناس', type: 'مكية', ayats: 6, number: '١١٤' },
                                  ].map((surah) => (
                                      <div key={surah.id} onClick={() => setSelectedSurah(surah)} className="bg-[#131E32]/60 hover:bg-[#1A263D] transition-all cursor-pointer border border-white/5 rounded-2xl p-4 flex items-center justify-between shadow-lg">
                                          <div className="flex items-center gap-4">
                                              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">
                                                  {surah.id}
                                              </div>
                                              <div>
                                                  <h4 className="text-white font-bold text-base">{surah.name}</h4>
                                                  <p className="text-[10px] text-slate-400 font-medium">عدد الآيات: {surah.ayats} | {surah.type}</p>
                                              </div>
                                          </div>
                                          <span className="text-2xl font-serif text-amber-500/80">{surah.number}</span>
                                      </div>
                                  ))}
                              </div>
                          </div>

                          {/* Surah Detail Modal/Layer */}
                          <AnimatePresence>
                              {selectedSurah && (
                                  <motion.div 
                                      initial={{ y: '100%' }}
                                      animate={{ y: 0 }}
                                      exit={{ y: '100%' }}
                                      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                      className="absolute inset-0 bg-[#09101E] z-50 flex flex-col"
                                  >
                                      <div className="px-6 top-12 absolute inset-x-0 flex justify-between items-center z-30">
                                          <button onClick={() => setSelectedSurah(null)} className="w-10 h-10 rounded-[14px] border border-white/10 flex items-center justify-center text-white bg-white/5 backdrop-blur-md">
                                              <ArrowRight className="w-5 h-5" />
                                          </button>
                                          <span className="text-white font-bold tracking-wide">{selectedSurah.name}</span>
                                          <div className="w-10"></div>
                                      </div>

                                      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center pt-20">
                                          <div className="w-48 h-48 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mb-8 relative">
                                              <div className="absolute inset-0 border-2 border-dashed border-cyan-500/30 rounded-full animate-[spin_20s_linear_infinite]"></div>
                                              <span className="text-6xl font-serif text-amber-500">{selectedSurah.number}</span>
                                          </div>

                                          <h2 className="text-3xl font-black text-white mb-4">{selectedSurah.name}</h2>
                                          
                                          <div className="flex gap-4 mb-10">
                                              <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2">
                                                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">النوع</p>
                                                  <p className="text-cyan-400 font-bold">{selectedSurah.type}</p>
                                              </div>
                                              <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2">
                                                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">الآيات</p>
                                                  <p className="text-emerald-400 font-bold">{selectedSurah.ayats}</p>
                                              </div>
                                              <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2">
                                                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">الترتيب</p>
                                                  <p className="text-amber-500 font-bold">{selectedSurah.id}</p>
                                              </div>
                                          </div>

                                          <div className="w-full space-y-4">
                                              <button onClick={() => showToast('جاري تحميل التلاوة...')} className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-2xl transition-colors shadow-lg shadow-cyan-900/20 flex items-center justify-center gap-3">
                                                  <Volume2 className="w-5 h-5" />
                                                  استماع للسورة
                                              </button>
                                              <button onClick={() => showToast('جاري فتح المصحف...')} className="w-full py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-colors">
                                                  قراءة الآيات
                                              </button>
                                          </div>
                                      </div>
                                  </motion.div>
                              )}
                          </AnimatePresence>
                      </motion.div>
                  )}
                  {/* PRAYER SCREEN */}
                  {currentScreen === 'prayer' && (
                      <motion.div key="prayer" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} className="absolute inset-0 bg-[#09101E] flex flex-col z-20">
                          {/* Top Bar */}
                          <div className="px-6 top-12 absolute inset-x-0 flex justify-between items-center z-30">
                              <button onClick={() => setCurrentScreen('home')} className="w-10 h-10 rounded-[14px] border border-white/10 flex items-center justify-center text-white bg-white/5 backdrop-blur-md">
                                  <ArrowRight className="w-5 h-5" />
                              </button>
                              <span className="text-white font-bold tracking-wide">مواقيت الصلاة</span>
                              <div className="w-10"></div>
                          </div>

                          <div className="flex-1 overflow-y-auto px-6 pb-20 pt-28 space-y-3">
                              <div className="w-full flex items-center justify-center mb-6">
                                  <h2 className="text-xl font-bold text-[#40C5D6] bg-cyan-900/20 px-6 py-2 rounded-full border border-cyan-800/30">الإمساكية اليومية</h2>
                              </div>

                              {[
                                {name:'الفجر', time:'04:25 ص', active: false},
                                {name:'الظهر', time:'12:15 م', active: true},
                                {name:'العصر', time:'03:45 م', active: false},
                                {name:'المغرب', time:'06:30 م', active: false},
                                {name:'العشاء', time:'08:00 م', active: false},
                              ].map((p, i) => (
                                  <div key={i} className={`flex items-center justify-between p-5 rounded-2xl shadow-lg border transition-all ${p.active ? 'bg-gradient-to-r from-emerald-900/40 to-cyan-900/40 border-cyan-500/50 scale-100' : 'bg-[#131E32]/60 border-white/5 opacity-80'}`}>
                                      <h5 className={`font-bold text-lg ${p.active ? 'text-white' : 'text-slate-300'}`}>{p.name}</h5>
                                      <p className={`font-mono text-xl ${p.active ? 'text-emerald-400 font-bold' : 'text-amber-400 font-medium'}`}>{p.time}</p>
                                  </div>
                              ))}
                          </div>
                      </motion.div>
                  )}
                  {/* QIBLA SCREEN */}
                  {currentScreen === 'qibla' && (
                      <motion.div key="qibla" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} className="absolute inset-0 bg-[#09101E] flex flex-col z-20">
                          {/* Top Bar */}
                          <div className="px-6 top-12 absolute inset-x-0 flex justify-between items-center z-30">
                              <button onClick={() => setCurrentScreen('home')} className="w-10 h-10 rounded-[14px] border border-white/10 flex items-center justify-center text-white bg-white/5 backdrop-blur-md">
                                  <ArrowRight className="w-5 h-5" />
                              </button>
                              <span className="text-white font-bold tracking-wide">اتجاه القبلة</span>
                              <div className="w-10"></div>
                          </div>

                          <div className="flex-1 flex flex-col items-center justify-center px-6 pt-20">
                              <h2 className="text-2xl font-bold text-white mb-2">اتصل بالكعبة</h2>
                              <p className="text-slate-400 text-sm mb-12">قم بتدوير الهاتف لتحديد الاتجاه</p>

                              <div className="relative w-64 h-64 flex items-center justify-center">
                                  {/* Compass Ring */}
                                  <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
                                  
                                  {/* Degrees marks (simulated) */}
                                  {[...Array(12)].map((_, i) => (
                                      <div key={i} className="absolute w-1 h-3 bg-slate-700" style={{ transform: `rotate(${i * 30}deg) translateY(-120px)` }}></div>
                                  ))}

                                  {/* Compass Body */}
                                  <motion.div 
                                      animate={{ rotate: 45 }} // Static rotation for mockup
                                      className="relative w-full h-full flex items-center justify-center"
                                  >
                                      {/* Main Compass Image Placeholder */}
                                      <div className="w-56 h-56 rounded-full border-2 border-cyan-500/30 flex items-center justify-center bg-gradient-to-b from-slate-800 to-slate-900 shadow-2xl">
                                          <div className="text-white font-bold text-xl">N</div>
                                          <div className="absolute top-4 text-emerald-400">
                                              <Compass className="w-8 h-8" />
                                          </div>
                                      </div>
                                      
                                      {/* Qibla Needle */}
                                      <div className="absolute top-0 bottom-0 flex flex-col items-center justify-start pt-4" style={{ transform: 'rotate(135deg)' }}>
                                          <div className="w-1 h-24 bg-gradient-to-t from-transparent via-amber-500 to-amber-500 rounded-full"></div>
                                          <div className="w-6 h-6 bg-amber-500 rounded-full border-4 border-slate-900 flex items-center justify-center">
                                              <div className="w-2 h-2 bg-white rounded-full"></div>
                                          </div>
                                      </div>
                                  </motion.div>
                              </div>
                              
                              <div className="mt-16 text-center">
                                  <div className="text-4xl font-black text-amber-500 mb-2">135°</div>
                                  <p className="text-cyan-400 font-bold">بانتظار ثبات البوصلة...</p>
                              </div>
                          </div>
                      </motion.div>
                  )}
                  {/* SETTINGS SCREEN */}
                  {currentScreen === 'settings' && (
                      <motion.div key="settings" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} className="absolute inset-0 bg-[#09101E] flex flex-col z-20">
                          {/* Top Bar */}
                          <div className="px-6 top-12 absolute inset-x-0 flex justify-between items-center z-30">
                              <button onClick={() => setCurrentScreen('home')} className="w-10 h-10 rounded-[14px] border border-white/10 flex items-center justify-center text-white bg-white/5 backdrop-blur-md">
                                  <ArrowRight className="w-5 h-5" />
                              </button>
                              <span className="text-white font-bold tracking-wide">الإعدادات</span>
                              <div className="w-10"></div> {/* Spacer for perfect center */}
                          </div>

                          <div className="flex-1 overflow-y-auto px-6 pb-20 pt-28 space-y-8">
                               <div className="bg-[#131E32]/80 backdrop-blur-sm border border-white/5 rounded-3xl p-5 shadow-lg">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="p-3 bg-cyan-500/10 rounded-2xl">
                                            <Bell className="w-6 h-6 text-cyan-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold text-lg mb-1">أصوات التنبيهات</h3>
                                            <p className="text-xs text-slate-400 font-medium">تخصيص الآذان وأصوات الأذكار</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Adhan Upload */}
                                        <div className="border-t border-white/5 pt-4">
                                            <div className="flex justify-between items-center mb-3">
                                                <div>
                                                    <h4 className="text-white font-semibold mb-0.5 text-sm">صوت الآذان</h4>
                                                    <p className="text-[10px] text-slate-400">{adhanSoundName}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={() => playSound('adhan')} className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 transition-colors shadow-lg">
                                                        <Volume2 className="w-4 h-4" />
                                                    </button>
                                                    <label className="w-8 h-8 rounded-full bg-cyan-600 text-white flex items-center justify-center hover:bg-cyan-500 transition-colors shadow-lg cursor-pointer">
                                                        <Settings className="w-4 h-4" />
                                                        <input type="file" accept="audio/*" className="hidden" onChange={(e) => handleSoundUpload(e, 'adhan')} />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Reminder Upload */}
                                        <div className="border-t border-white/5 pt-4">
                                            <div className="flex justify-between items-center mb-3">
                                                <div>
                                                    <h4 className="text-white font-semibold mb-0.5 text-sm">صوت التذكير بالاستغفار</h4>
                                                    <p className="text-[10px] text-slate-400">{remindSoundName}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={() => playSound('remind')} className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 transition-colors shadow-lg">
                                                        <Volume2 className="w-4 h-4" />
                                                    </button>
                                                    <label className="w-8 h-8 rounded-full bg-cyan-600 text-white flex items-center justify-center hover:bg-cyan-500 transition-colors shadow-lg cursor-pointer">
                                                        <Settings className="w-4 h-4" />
                                                        <input type="file" accept="audio/*" className="hidden" onChange={(e) => handleSoundUpload(e, 'remind')} />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                               </div>

                               <div className="bg-[#131E32]/80 backdrop-blur-sm border border-white/5 rounded-3xl p-5 shadow-lg">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="p-3 bg-emerald-500/10 rounded-2xl">
                                            <User className="w-6 h-6 text-emerald-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold text-lg mb-1">حسابي</h3>
                                            <p className="text-xs text-slate-400 font-medium">سجل دخولك لمزامنة الأذكار والبيانات</p>
                                        </div>
                                    </div>

                                    {!isUserLoggedIn ? (
                                        <div className="space-y-4">
                                            <div className="space-y-1">
                                                <input 
                                                    type="email" 
                                                    placeholder="البريد الإلكتروني" 
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                                                    value={userEmail}
                                                    onChange={(e) => setUserEmail(e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <input 
                                                    type="password" 
                                                    placeholder="كلمة المرور" 
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                                                    value={userPassword}
                                                    onChange={(e) => setUserPassword(e.target.value)}
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-3 pt-2">
                                                <button 
                                                    onClick={() => {
                                                        if (userEmail && userPassword) {
                                                            setIsUserLoggedIn(true);
                                                            showToast('مرحباً بك مجدداً');
                                                        } else {
                                                            showToast('أكمل البيانات أولاً');
                                                        }
                                                    }}
                                                    className="py-3 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-bold rounded-2xl transition-colors"
                                                >
                                                    دخول
                                                </button>
                                                <button 
                                                    onClick={() => {
                                                        if (userEmail && userPassword) {
                                                            setIsUserLoggedIn(true);
                                                            showToast('تم إنشاء الحساب');
                                                        } else {
                                                            showToast('أكمل البيانات أولاً');
                                                        }
                                                    }}
                                                    className="py-3 bg-white/5 hover:bg-white/10 text-white text-sm font-bold rounded-2xl border border-white/10 transition-colors"
                                                >
                                                    تسجيل جديد
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                                                    {userEmail.charAt(0).toUpperCase() || 'U'}
                                                </div>
                                                <span className="text-white text-sm font-medium">{userEmail}</span>
                                            </div>
                                            <button 
                                                onClick={() => {
                                                    setIsUserLoggedIn(false);
                                                    showToast('تم تسجيل الخروج');
                                                }}
                                                className="text-rose-400 text-sm font-bold hover:underline"
                                            >
                                                خروج
                                            </button>
                                        </div>
                                    )}
                               </div>

                               {/* Admin Access Button */}
                               <div className="bg-[#131E32]/80 backdrop-blur-sm border border-white/5 rounded-3xl p-5 shadow-lg mt-4">
                                   <button 
                                       onClick={() => setCurrentScreen('admin')}
                                       className="w-full flex items-center justify-between text-white hover:text-cyan-400 transition-colors"
                                   >
                                       <div className="flex items-center gap-4">
                                           <div className="p-3 bg-rose-500/10 rounded-2xl">
                                               <ShieldCheck className="w-6 h-6 text-rose-400" />
                                           </div>
                                           <div className="text-right">
                                               <h3 className="font-bold text-lg mb-0.5">لوحة التحكم</h3>
                                               <p className="text-xs text-slate-400 font-medium">إدارة بيانات التطبيق والمستخدمين</p>
                                           </div>
                                       </div>
                                       <ArrowLeft className="w-5 h-5 opacity-40" />
                                   </button>
                               </div>
                          </div>
                      </motion.div>
                  )}
                  {/* ADMIN SCREEN */}
                  {currentScreen === 'admin' && (
                      <motion.div key="admin" initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} exit={{opacity:0}} className="absolute inset-0 bg-[#060D1A] flex flex-col z-50">
                          {/* Top Bar */}
                          <div className="px-6 top-12 absolute inset-x-0 flex justify-between items-center z-30">
                              <button onClick={() => setCurrentScreen('settings')} className="w-10 h-10 rounded-[14px] border border-white/10 flex items-center justify-center text-white bg-white/5 backdrop-blur-md">
                                  <ArrowRight className="w-5 h-5" />
                              </button>
                              <span className="text-white font-bold tracking-wide">لوحة التحكم</span>
                              <div className="w-10"></div>
                          </div>

                          {!isAdminLoggedIn ? (
                              <div className="flex-1 flex flex-col items-center justify-center px-8 pt-20">
                                  <div className="w-20 h-20 bg-cyan-500/20 rounded-3xl flex items-center justify-center mb-8 border border-cyan-500/30">
                                      <LogIn className="w-10 h-10 text-cyan-400" />
                                  </div>
                                  <h2 className="text-2xl font-bold text-white mb-2 text-center">دخول المسئول</h2>
                                  <p className="text-slate-400 text-sm mb-8 text-center leading-relaxed font-medium">الرجاء إدخال بيانات الاعتماد للوصول<br/>إلى إعدادات النظام المتقدمة</p>
                                  
                                  <div className="w-full space-y-4">
                                      <div className="space-y-1.5">
                                          <label className="text-[10px] text-slate-500 uppercase font-bold tracking-widest px-1">البريد الإلكتروني</label>
                                          <input 
                                              type="email" 
                                              placeholder="admin@example.com" 
                                              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                                              value={adminEmail}
                                              onChange={(e) => setAdminEmail(e.target.value)}
                                          />
                                      </div>
                                      <div className="space-y-1.5">
                                          <label className="text-[10px] text-slate-500 uppercase font-bold tracking-widest px-1">كلمة المرور</label>
                                          <input 
                                              type="password" 
                                              placeholder="••••••••" 
                                              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                                              value={adminPassword}
                                              onChange={(e) => setAdminPassword(e.target.value)}
                                          />
                                      </div>
                                      <button 
                                          onClick={() => {
                                              if (adminEmail && adminPassword) {
                                                  setIsAdminLoggedIn(true);
                                                  showToast('تم تسجيل الدخول بنجاح');
                                              } else {
                                                  showToast('يرجى إدخال كافة البيانات');
                                              }
                                          }}
                                          className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-2xl transition-all shadow-lg active:scale-95"
                                      >
                                          تسجيل الدخول
                                      </button>
                                  </div>
                              </div>
                          ) : (
                              <div className="flex-1 flex flex-col pt-28 px-6 pb-20 overflow-y-auto no-scrollbar">
                                  <div className="flex items-center gap-4 mb-8 bg-cyan-500/10 p-5 rounded-3xl border border-cyan-500/20">
                                      <div className="w-14 h-14 bg-cyan-500/20 rounded-2xl flex items-center justify-center">
                                          <LayoutDashboard className="w-8 h-8 text-cyan-400" />
                                      </div>
                                      <div>
                                          <h3 className="text-white font-bold text-lg mb-0.5">مرحباً بك يا مدير</h3>
                                          <p className="text-xs text-cyan-400 font-bold">متصل الآن بنظام Firebase</p>
                                      </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-4 mb-8">
                                      <div className="bg-white/5 border border-white/10 p-5 rounded-3xl">
                                          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">إجمالي المستخدمين</span>
                                          <p className="text-3xl font-black text-white mt-1">1,284</p>
                                      </div>
                                      <div className="bg-white/5 border border-white/10 p-5 rounded-3xl">
                                          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">نشط اليوم</span>
                                          <p className="text-3xl font-black text-emerald-400 mt-1">432</p>
                                      </div>
                                  </div>

                                  <h4 className="text-white font-bold mb-4 tracking-wide text-right">إجراءات سريعة</h4>
                                  <div className="space-y-3">
                                      {[
                                          {title: 'إرسال تنبيه جماعي', icon: Bell, color: 'text-amber-400'},
                                          {title: 'تعديل قاعدة البيانات', icon: Settings, color: 'text-blue-400'},
                                          {title: 'إدارة المسئولين', icon: ShieldCheck, color: 'text-rose-400'},
                                      ].map((item, i) => (
                                          <button key={i} onClick={() => showToast(`تم تفعيل ${item.title}`)} className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-colors">
                                              <div className="flex items-center gap-3">
                                                  <item.icon className={`w-5 h-5 ${item.color}`} />
                                                  <span className="text-white text-sm font-bold">{item.title}</span>
                                              </div>
                                              <ArrowLeft className="w-4 h-4 opacity-30" />
                                          </button>
                                      ))}
                                  </div>

                                  <button 
                                      onClick={() => {
                                          setIsAdminLoggedIn(false);
                                          showToast('تم تسجيل الخروج');
                                      }}
                                      className="mt-12 w-full py-4 text-rose-400 font-bold text-sm hover:bg-rose-500/10 rounded-2xl transition-colors"
                                  >
                                      تسجيل الخروج
                                  </button>
                              </div>
                          )}
                      </motion.div>
                  )}
              </AnimatePresence>
              
              {/* Toast Notification */}
              <AnimatePresence>
                  {toastMsg && (
                      <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          className="absolute bottom-28 inset-x-0 flex justify-center z-50 pointer-events-none"
                      >
                          <div className="bg-emerald-600 font-bold text-white text-xs px-5 py-2.5 rounded-full shadow-lg border border-emerald-500">
                              {toastMsg}
                          </div>
                      </motion.div>
                  )}
              </AnimatePresence>
          </div>
        </div>
    </motion.div>
  );
}
