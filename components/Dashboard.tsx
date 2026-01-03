
import React from 'react';
import { PageView } from '../types';
import { 
  Users, Briefcase, Bot, ArrowRight, Factory, 
  Calculator, ShieldCheck, Rocket, TrendingUp, 
  Target, Lightbulb, Handshake, Scale, Percent, 
  Lock, Repeat, BarChart3, FileText, Landmark,
  Info, ArrowRightLeft, AlertCircle, ShieldAlert,
  Flame, Globe, Zap, Banknote, Calendar,
  TrendingDown, FileSearch, ChevronRight, Crown,
  HeartPulse, ShieldPlus, BookOpen, Package, Star,
  PieChart, Map, Sparkles
} from 'lucide-react';

interface DashboardProps {
  onChangeView: (view: PageView) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onChangeView }) => {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* 1. HERO EXECUTIVE SECTION */}
      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden border-b-8 border-indigo-600">
        <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-500/20"><Landmark size={24} /></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 italic">Vomero Intelligence Unit - 2025</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-none uppercase">
              Advisor <span className="text-indigo-500">Cockpit</span>
            </h1>
            <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
              Piattaforma di analisi patrimoniale avanzata. Trasforma i dati <strong>COVIP 2024</strong> e le novità del <strong>Bilancio 2026</strong> in opportunità.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button onClick={() => onChangeView(PageView.BUDGET_2026)} className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-black py-4 px-8 rounded-2xl flex items-center gap-3 shadow-xl transition-all hover:scale-105 active:scale-95 uppercase text-xs tracking-widest">
                <Sparkles size={20} /> Legge Bilancio 2026
              </button>
              <button onClick={() => onChangeView(PageView.INTERVIEW)} className="bg-white text-slate-900 font-black py-4 px-8 rounded-2xl flex items-center gap-3 shadow-xl transition-all hover:scale-105 active:scale-95 uppercase text-xs tracking-widest border border-slate-200">
                <Target size={20} className="text-indigo-600" /> Avvia Diagnosi Clienti
              </button>
            </div>
          </div>
          <div className="lg:col-span-4 hidden lg:block">
            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 space-y-6">
               <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest">Market Pulse</span>
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
               </div>
               <div className="space-y-4">
                  <div className="flex justify-between items-center">
                     <span className="text-sm font-bold text-slate-300">Deducibilità 2026</span>
                     <span className="text-xl font-black text-emerald-400">5.300€</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-sm font-bold text-slate-300">Riv. TFR (L. 297)</span>
                     <span className="text-xl font-black text-amber-500">2.15%</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-sm font-bold text-slate-300">Tesoreria INPS</span>
                     <span className="text-xl font-black text-rose-500">60+ add.</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white opacity-5 transform skew-x-12 pointer-events-none"></div>
      </div>

      {/* 2. FOCUS NEWS 2026 (Widget dedicato) */}
      <div className="bg-amber-50 rounded-[2.5rem] border border-amber-200 shadow-sm overflow-hidden p-8 flex flex-col md:flex-row gap-10 items-center">
         <div className="md:w-1/2 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500 text-slate-900 rounded-full text-[10px] font-black uppercase">
               <Zap size={14} /> Novità Normative 2026
            </div>
            <h3 className="text-3xl font-black text-slate-900 leading-tight tracking-tighter uppercase italic">Silenzio-Assenso e Portabilità</h3>
            <p className="text-slate-600 font-medium text-sm">
               Dal 1° luglio 2026 i neoassunti aderiscono automaticamente alla previdenza. Inoltre, il contributo datoriale è finalmente portabile verso PIP e FPA di mercato.
            </p>
         </div>
         <div className="md:w-1/2 grid grid-cols-2 gap-4">
            <button onClick={() => onChangeView(PageView.BUDGET_2026)} className="bg-white p-6 rounded-3xl shadow-sm border border-amber-200 hover:shadow-md transition-all text-center">
               <p className="text-[10px] font-black text-slate-400 mb-1">DEDUCIBILITÀ</p>
               <p className="text-2xl font-black text-slate-900">5.300€</p>
               <p className="text-[9px] text-amber-600 font-bold uppercase mt-2">Nuovo Limite</p>
            </button>
            <button onClick={() => onChangeView(PageView.BUDGET_2026)} className="bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-800 hover:shadow-md transition-all text-center group">
               <p className="text-[10px] font-black text-slate-500 mb-1">PLAYBOOK</p>
               <p className="text-xl font-black text-white group-hover:text-amber-500 transition-colors">Script 2026</p>
               <p className="text-[9px] text-slate-400 font-bold uppercase mt-2">Pronti all'uso</p>
            </button>
         </div>
      </div>

      {/* 3. ANALISI GEOGRAFICA PENSIONI */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden p-8 flex flex-col md:flex-row gap-10 items-center">
         <div className="md:w-1/3 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 rounded-full border border-rose-100 text-rose-600 text-[10px] font-black uppercase">
               <AlertCircle size={14} /> Alert Distribuzione 2024
            </div>
            <h3 className="text-3xl font-black text-slate-900 leading-tight tracking-tighter uppercase italic">Geografia del <br/> Rischio Sociale</h3>
            <p className="text-slate-500 font-medium text-sm">
               L'analisi delle prestazioni INPS 2024 evidenzia un Mezzogiorno con oltre il <strong>56%</strong> di pensioni sotto i 1.500€. Un mercato enorme per l'integrazione privata.
            </p>
            <button 
              onClick={() => onChangeView(PageView.PENSION_GEOGRAPHY)}
              className="group flex items-center gap-2 text-indigo-600 font-black uppercase text-[10px] tracking-widest hover:underline"
            >
              Vedi Mappatura Integrale <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
         </div>
         <div className="md:w-2/3 grid grid-cols-3 gap-4">
            {[
              { label: "NORD", info: "16.4% > 3000€", color: "border-indigo-500", bg: "bg-indigo-50" },
              { label: "CENTRO", info: "17.1% < 1000€", color: "border-slate-400", bg: "bg-slate-50" },
              { label: "SUD", info: "56% < 1500€", color: "border-rose-500", bg: "bg-rose-50" },
            ].map((area, i) => (
              <div key={i} className={`p-6 rounded-3xl border-b-4 ${area.color} ${area.bg} text-center group hover:scale-105 transition-all`}>
                 <p className="text-[10px] font-black text-slate-400 mb-1">{area.label}</p>
                 <p className="text-lg font-black text-slate-900 uppercase tracking-tighter leading-none mb-2">{area.info}</p>
                 <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                    <div className={`h-full ${area.color.replace('border-', 'bg-')} w-2/3`}></div>
                 </div>
              </div>
            ))}
         </div>
      </div>

      {/* 4. MACRO INSIGHTS STRATEGICI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: "Debito TFR PMI", value: "234 Mld", trend: "Rischio Liquidità", color: "red", icon: ShieldAlert, view: PageView.VANTAGGI_AZIENDE },
           { label: "Gap Under 35", value: "19%", trend: "Opportunità Figli", color: "emerald", icon: Users, view: PageView.PAC_SIMULATOR },
           { label: "Erosione Inflazione", value: "-12.4%", trend: "Potere d'acquisto", color: "rose", icon: TrendingDown, view: PageView.SNOWBALL_EFFECT },
           { label: "Deducibilità Sfruttata", value: "8.7%", trend: "Upselling immediato", color: "amber", icon: Banknote, view: PageView.FISCAL_CALCULATOR },
         ].map((kpi, idx) => (
           <button 
            key={idx} 
            onClick={() => onChangeView(kpi.view)}
            className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all text-left group overflow-hidden relative"
           >
              <div className={`absolute top-0 right-0 w-2 h-full bg-${kpi.color}-500 opacity-20 group-hover:opacity-100 transition-all`}></div>
              <div className="flex items-center gap-3 mb-4">
                 <div className={`bg-${kpi.color}-50 p-2 rounded-xl text-${kpi.color}-600 group-hover:bg-${kpi.color}-600 group-hover:text-white transition-all`}>
                    <kpi.icon size={20} />
                 </div>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{kpi.label}</span>
              </div>
              <p className="text-3xl font-black text-slate-900 tracking-tighter mb-1">{kpi.value}</p>
              <p className={`text-xs font-bold text-${kpi.color}-600 italic`}>{kpi.trend}</p>
           </button>
         ))}
      </div>

      {/* 5. CORE SERVICE MODULES */}
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col group border-b-8 border-b-indigo-600 transition-all hover:-translate-y-1">
          <div className="bg-indigo-600 p-8 text-white">
            <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3"><Users size={24}/> Wealth B2C</h3>
            <p className="text-indigo-100 text-xs mt-2 font-medium">Massimizzazione del risparmio netto individuale.</p>
          </div>
          <div className="p-8 space-y-4 bg-gradient-to-b from-indigo-50/30 to-white">
            <div className="p-4 bg-white rounded-2xl border border-indigo-100 shadow-sm flex items-start gap-4">
               <Zap size={20} className="text-amber-500 mt-1 shrink-0 animate-pulse" />
               <p className="text-[11px] text-slate-600 font-bold leading-snug">
                  <strong>PUNTO FORZA 2026:</strong> Con il nuovo limite di 5.300€, recuperi ancora più IRPEF ogni anno.
               </p>
            </div>
            <div className="space-y-3 pt-4">
              <button onClick={() => onChangeView(PageView.VANTAGGI_LAVORATORI)} className="w-full p-5 bg-white hover:bg-indigo-600 hover:text-white rounded-2xl flex items-center justify-between group transition-all text-left border border-slate-100 shadow-sm">
                <span className="text-sm font-black uppercase tracking-tighter">Perché mi conviene?</span>
                <ArrowRight size={18} className="text-indigo-600 group-hover:text-white" />
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col group border-b-8 border-b-amber-600 transition-all hover:-translate-y-1">
          <div className="bg-amber-600 p-8 text-white">
            <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3"><Briefcase size={24}/> Wealth B2B</h3>
            <p className="text-amber-100 text-xs mt-2 font-medium">Ottimizzazione TFR, TFM e Rating Aziendale.</p>
          </div>
          <div className="p-8 space-y-4 bg-gradient-to-b from-amber-50/30 to-white">
            <div className="p-4 bg-white rounded-2xl border border-amber-100 shadow-sm flex items-start gap-4">
               <ShieldAlert size={20} className="text-amber-600 mt-1 shrink-0" />
               <p className="text-[11px] text-slate-600 font-bold leading-snug">
                  <strong>FOCUS PMI:</strong> Le nuove soglie Tesoreria INPS (60 add.) impattano sulla liquidità 2026.
               </p>
            </div>
            <div className="space-y-3 pt-4">
              <button onClick={() => onChangeView(PageView.CORPORATE_SIMULATOR)} className="w-full p-5 bg-white hover:bg-amber-600 hover:text-white rounded-2xl flex items-center justify-between group transition-all text-left border border-slate-100 shadow-sm">
                <span className="text-sm font-black uppercase tracking-tighter">Audit TFR Dinamico</span>
                <ArrowRight size={18} className="text-amber-600 group-hover:text-white" />
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col group border-b-8 border-b-slate-900 transition-all hover:-translate-y-1">
          <div className="bg-slate-900 p-8 text-white">
            <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3"><ShieldCheck size={24}/> Wealth Shield</h3>
            <p className="text-slate-400 text-xs mt-2 font-medium">Asset Protection e Successione a 0%.</p>
          </div>
          <div className="p-8 space-y-3 bg-gradient-to-b from-slate-50 to-white flex-1">
             {[
               { view: PageView.MULTINVEST_ANALYSIS, label: "MultInvest 90/10", icon: Crown },
               { view: PageView.ASSET_PROTECTION, label: "Scudo Patrimoniale", icon: Lock },
               { view: PageView.SUCCESSION_ANALYSIS, label: "Successione a 0€", icon: Scale },
               { view: PageView.LTC_ANALYSIS, label: "Rischio Longevità", icon: HeartPulse }
             ].map((btn, bidx) => (
                <button 
                  key={bidx} 
                  onClick={() => onChangeView(btn.view)}
                  className="w-full p-4 bg-white hover:bg-slate-900 hover:text-white rounded-2xl flex items-center gap-3 transition-all text-left border border-slate-100 shadow-sm group/btn"
                >
                   <btn.icon size={18} className="text-indigo-600 group-hover/btn:text-amber-400" />
                   <span className="text-xs font-black uppercase tracking-tighter">{btn.label}</span>
                </button>
             ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
