
import React, { useState, useMemo } from 'react';
import { LTC_DATA, LTC_MARKET_INSIGHTS } from '../constants';
import { 
  ShieldAlert, Users, Coins, CheckCircle2, Globe, AlertTriangle, 
  Landmark, TrendingDown, Stethoscope, HeartPulse, Scale, Info, 
  Briefcase, Zap, Calculator, ShieldCheck, Heart, ArrowRight,
  UserCheck, Timer, Percent, Sparkles, BookOpen, Quote, Microscope
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

const LtcAnalysisView: React.FC = () => {
  // Input Utente
  const [savings, setSavings] = useState<number>(300000);
  const [careExpense, setCareExpense] = useState<number>(LTC_MARKET_INSIGHTS.AVG_MONTHLY_FAMILY_EXPENSE);
  const [pensionAnnuity, setPensionAnnuity] = useState<number>(1500);

  // --- MOTORE DI CALCOLO LONGEVITÀ ---
  const calculation = useMemo(() => {
    const aid = LTC_DATA.INDENNITA_ACCOMPAGNAMENTO_2025;
    const monthlyDeficit = Math.max(0, careExpense - aid);
    const annualDeficit = monthlyDeficit * 12;
    
    // Simulazione esaurimento risparmi
    const depletionData = [];
    let currentSavings = savings;
    for (let i = 0; i <= 20; i++) {
        depletionData.push({ year: `Anno ${i}`, value: Math.max(0, currentSavings) });
        currentSavings -= annualDeficit;
    }
    const yearsToZero = Math.floor(savings / annualDeficit);

    // Zurich Option F (Raddoppio Rendita)
    const zurichOptionFAnnuity = pensionAnnuity * LTC_DATA.ZURICH_OPTION_F_MULTIPLIER;
    const zurichGapAfterOptionF = Math.max(0, careExpense - (zurichOptionFAnnuity + aid));

    return { aid, monthlyDeficit, annualDeficit, depletionData, yearsToZero, zurichOptionFAnnuity, zurichGapAfterOptionF };
  }, [savings, careExpense, pensionAnnuity]);

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-24">
      
      {/* 1. HERO - IL RISCHIO SILENZIOSO */}
      <div className="bg-[#0f172a] rounded-[3rem] p-12 text-white shadow-2xl relative border-b-8 border-rose-600 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-rose-600/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-rose-600 p-3 rounded-2xl shadow-xl shadow-rose-600/20"><HeartPulse size={32} className="text-white"/></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-rose-400 italic">Longevity Risk Unit - Gruppo Vomero</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                Longevity <br/> <span className="text-rose-500">Asset Erosion</span>
              </h1>
              <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
                Il rischio longevità non è vivere troppo a lungo, ma <strong>sopravvivere al proprio patrimonio</strong> a causa di spese sanitarie non preventivate.
              </p>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center relative group">
              <p className="text-[10px] font-black uppercase text-rose-400 mb-2 tracking-widest italic">Fonte Dati: ISTAT / AIMA 2025</p>
              <p className="text-7xl font-black text-white tracking-tighter">{calculation.yearsToZero} <span className="text-xl">Anni</span></p>
              <p className="text-[10px] font-black text-rose-300 uppercase mt-4 tracking-widest">Autonomia Finanziaria Residua</p>
           </div>
        </div>
      </div>

      {/* 2. ANALIZZATORE DI DEFICIT ASSISTENZIALE */}
      <div className="grid lg:grid-cols-12 gap-8">
         <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm space-y-8">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Calculator size={14} className="text-rose-600" /> Stress Test Patrimoniale
               </h4>
               <div className="space-y-6">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                     <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Patrimonio Liquido (€)</label>
                     <input type="number" value={savings} onChange={(e) => setSavings(Number(e.target.value))} className="w-full bg-transparent font-black text-2xl outline-none text-slate-900" />
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                     <div className="flex justify-between items-center mb-1">
                        <label className="text-[10px] font-black text-slate-500 uppercase">Costo Assistenza (Market Avg)</label>
                        <span className="text-xs font-black text-rose-600">{formatCurrency(careExpense)}/m</span>
                     </div>
                     <input type="range" min="1500" max="5000" step="100" value={careExpense} onChange={(e) => setCareExpense(Number(e.target.value))} className="w-full h-1.5 bg-rose-200 rounded-lg appearance-none accent-rose-600" />
                  </div>
                  <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
                     <label className="text-[10px] font-black text-indigo-500 uppercase block mb-1">Rendita Pensionistica Base (€)</label>
                     <input type="number" value={pensionAnnuity} onChange={(e) => setPensionAnnuity(Number(e.target.value))} className="w-full bg-transparent font-black text-2xl outline-none text-indigo-800" />
                  </div>
               </div>
            </div>

            <div className="bg-rose-50 p-8 rounded-[2.5rem] border-2 border-rose-100 relative group overflow-hidden shadow-xl shadow-rose-200/20">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><TrendingDown size={100} /></div>
               <h4 className="text-[10px] font-black text-rose-400 uppercase mb-4 tracking-widest italic">Deficit Annuale Reale</h4>
               <p className="text-4xl font-black text-rose-700">{formatCurrency(calculation.annualDeficit)}</p>
               <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-[10px] font-bold text-rose-500/60 uppercase">
                     <span>Costo Assistenza:</span>
                     <span>{formatCurrency(careExpense * 12)}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-emerald-600 uppercase">
                     <span>Accompagnamento INPS 2025:</span>
                     <span>-{formatCurrency(calculation.aid * 12)}</span>
                  </div>
               </div>
            </div>
         </div>

         <div className="lg:col-span-8 bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm flex flex-col relative overflow-hidden">
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 flex items-center gap-3 leading-none">
               <Timer className="text-rose-600" /> Curva di Erosione Ereditaria <br/> <span className="text-sm font-bold text-slate-400 mt-2 block">(Ipotesi di costo costante - Prezzi 2025)</span>
            </h3>
            <div className="flex-1 h-[400px]">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={calculation.depletionData}>
                     <defs>
                        <linearGradient id="gradRed" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2}/><stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/></linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 'bold'}} />
                     <YAxis tickFormatter={(v) => `€${(v/1000).toFixed(0)}k`} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                     <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} />
                     <Area type="monotone" dataKey="value" stroke="#f43f5e" strokeWidth={5} fill="url(#gradRed)" name="Patrimonio Residuo" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
            <div className="mt-8 p-6 bg-slate-900 rounded-3xl text-white flex items-center gap-6">
               <div className="bg-amber-500 p-3 rounded-2xl text-slate-900 shadow-lg animate-pulse"><AlertTriangle size={24} /></div>
               <p className="text-sm italic font-medium text-slate-300">
                  "Dottore, senza protezione, in meno di {calculation.yearsToZero} anni lo stato di non autosufficienza azzera completamente {formatCurrency(savings)} di risparmi, trasformando l'eredità dei figli in un onere di cura."
               </p>
            </div>
         </div>
      </div>

      {/* 3. LOGICA COSTRUTTIVA ZURICH: OPTION F */}
      <div className="grid lg:grid-cols-12 gap-8">
         <div className="lg:col-span-7 bg-[#233D7B] rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 opacity-5 rotate-12"><ShieldCheck size={400} /></div>
            <div className="relative z-10">
               <div className="flex items-center gap-3 mb-8">
                  <div className="bg-amber-500 p-3 rounded-2xl text-slate-900"><Sparkles size={28} /></div>
                  <h3 className="text-3xl font-black italic uppercase tracking-tighter">Zurich "Option F" Engineering</h3>
               </div>
               
               <div className="grid md:grid-cols-2 gap-10 items-center">
                  <div className="space-y-8">
                     <p className="text-blue-100 text-lg leading-relaxed font-medium">
                        La soluzione **Zurich Spazio Previdenza** è costruita su un automatismo di raddoppio. Non è una polizza danni, è una **protezione della rendita vitalizia**.
                     </p>
                     <ul className="space-y-4">
                        <li className="flex gap-4 items-center">
                           <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                           <span className="text-xs font-black uppercase tracking-widest">Raddoppio x2 Automatico</span>
                        </li>
                        <li className="flex gap-4 items-center">
                           <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                           <span className="text-xs font-black uppercase tracking-widest">Protocollo ADL (4 su 6)</span>
                        </li>
                        <li className="flex gap-4 items-center">
                           <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                           <span className="text-xs font-black uppercase tracking-widest">Fiscalità ZERO (Esente IRPEF)</span>
                        </li>
                     </ul>
                  </div>

                  <div className="bg-white/10 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/20 text-center">
                     <p className="text-[10px] font-black uppercase text-amber-400 mb-4 tracking-widest italic">Impatto Option F Zurich</p>
                     <div className="space-y-4">
                        <div>
                           <p className="text-[9px] text-blue-200 uppercase font-bold">Rendita Raddoppiata</p>
                           <p className="text-5xl font-black text-white">{formatCurrency(calculation.zurichOptionFAnnuity)}</p>
                        </div>
                        <div className="pt-4 border-t border-white/10">
                           <p className="text-[9px] text-blue-200 uppercase font-bold">Gap Residuo Protetto</p>
                           <p className={`text-2xl font-black ${calculation.zurichGapAfterOptionF > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                              {formatCurrency(calculation.zurichGapAfterOptionF)}/m
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm relative overflow-hidden">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-6">
                  <Stethoscope size={14} className="text-indigo-600" /> Protocollo ADL (Fonte: Zurich)
               </h4>
               <p className="text-xs text-slate-500 leading-relaxed font-medium mb-6">
                  La prestazione si attiva con l'incapacità certificata di svolgere almeno <strong>4 delle 6</strong> ADL fondamentali:
               </p>
               <div className="grid grid-cols-2 gap-3">
                  {['Lavarsi', 'Vestirsi', 'Alimentarsi', 'Igiene Personale', 'Spostarsi', 'Continenza'].map((adl, i) => (
                     <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                        <CheckCircle2 size={12} className="text-emerald-500" />
                        <span className="text-[10px] font-black text-slate-700 uppercase">{adl}</span>
                     </div>
                  ))}
               </div>
            </div>

            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl border-t-8 border-amber-500">
               <div className="absolute -bottom-10 -right-10 opacity-5"><Microscope size={200} /></div>
               <h4 className="text-xl font-black italic uppercase tracking-tighter text-amber-500 mb-4">Focus Fiscale Art. 15 TUIR</h4>
               <p className="text-sm text-slate-400 leading-relaxed font-medium">
                  Premi **detraibili al 19%** (max €1.291,14). La rendita erogata in caso di LTC è **100% esente da IRPEF**, ottimizzando ulteriormente il potere d'acquisto per la cura.
               </p>
            </div>
         </div>
      </div>

      {/* FOOTER EXECUTIVO CON FONTI */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="bg-[#0f172a] p-4 rounded-[1.5rem] text-white shadow-lg"><BookOpen size={32} /></div>
            <div>
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">Longevity Intelligence Certificate</p>
               <p className="text-xs text-slate-500 font-bold italic">Rif: Art. 15 TUIR | ISTAT Disabilità 2025 | Zurich Spazio Previdenza (Cond. Polizza M103P)</p>
            </div>
         </div>
         <div className="text-right">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">DOCUMENTO AD USO INTERNO - ADVISOR TRAINING UNIT</p>
         </div>
      </div>

    </div>
  );
};

export default LtcAnalysisView;
