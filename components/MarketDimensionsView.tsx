import React from 'react';
import { MARKET_INSIGHTS_2025 } from '../constants';
import { 
  Globe2, BarChart3, TrendingUp, Users, Factory, 
  Landmark, AlertCircle, CheckCircle2, ArrowRight,
  PieChart as PieChartIcon, Target, Info, ShieldAlert,
  ArrowUpRight, ExternalLink, FileText, History,
  TrendingDown, Ghost, MousePointer2, AlertOctagon,
  Microscope, Siren, Zap, Sparkles
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Cell, PieChart, Pie, Legend, LineChart, Line, ComposedChart
} from 'recharts';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

const MarketDimensionsView: React.FC = () => {
  const { 
    INTERNATIONAL_RANKING, 
    ASSET_DISTRIBUTION, 
    ITALIAN_PMI_STRUCTURE, 
    MEMBERSHIP_STATS,
    GLOBAL_GIANTS,
    TAXATION_HISTORY,
    UE_EMPLOYMENT_COMPARISON
  } = MARKET_INSIGHTS_2025;

  const COLORS = ['#4f46e5', '#ef4444', '#f59e0b', '#10b981', '#6366f1', '#64748b'];

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-fade-in pb-24">
      
      {/* 1. HEADER EXECUTIVE */}
      <div className="bg-[#0a0f1d] rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden border-b-8 border-indigo-500">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-600/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-indigo-500 p-3 rounded-2xl shadow-xl"><Globe2 size={32} className="text-white"/></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-400 italic">Market Intelligence Unit - Report OCSE/COVIP 2025</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                Market <br/> <span className="text-indigo-400 text-6xl">Intelligence</span>
              </h1>
              <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
                Analisi granulare del posizionamento italiano. Dalla cronistoria dei peggioramenti fiscali alla fragilità delle microimprese italiane.
              </p>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center relative overflow-hidden group">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl"></div>
              <p className="text-[10px] font-black uppercase text-indigo-400 mb-2 tracking-widest italic">Patrimonio Complessivo</p>
              <p className="text-6xl font-black text-white tracking-tighter">267 <span className="text-xl">Mld $</span></p>
              <p className="text-[10px] font-black text-emerald-400 uppercase mt-4 tracking-widest">+8,5% Trend Crescita</p>
           </div>
        </div>
      </div>

      {/* 2. KPI MACRO - FOCUS INATTIVITÀ & TFR */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
            <div className="bg-rose-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-rose-600">
               <Ghost size={24} />
            </div>
            <p className="text-3xl font-black text-slate-900 tracking-tighter">{MEMBERSHIP_STATS.NON_PAYERS_PCT}%</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Iscritti non versanti</p>
            <p className="text-[10px] font-bold text-rose-600 italic mt-3">2,69 Milioni di soggetti "silenti"</p>
         </div>
         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
            <div className="bg-amber-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-amber-600">
               <Factory size={24} />
            </div>
            <p className="text-3xl font-black text-slate-900 tracking-tighter">{MEMBERSHIP_STATS.TFR_SHARE_PCT}%</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Quota TFR su contribuzione</p>
            <p className="text-[10px] font-bold text-amber-600 italic mt-3">8,6 Mld € di flussi annui</p>
         </div>
         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
            <div className="bg-indigo-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-indigo-600">
               <Users size={24} />
            </div>
            <p className="text-3xl font-black text-slate-900 tracking-tighter">7 Mln</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Aderenti Attivi</p>
            <p className="text-[10px] font-bold text-indigo-500 italic mt-3">Prevalentemente in medie-grandi imprese</p>
         </div>
         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
            <div className="bg-emerald-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-emerald-600">
               <TrendingUp size={24} />
            </div>
            <p className="text-3xl font-black text-slate-900 tracking-tighter">20,5 Mld</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Raccolta annua totale</p>
            <p className="text-[10px] font-bold text-emerald-500 italic mt-3">Quasi un punto di PIL nazionale</p>
         </div>
      </div>

      {/* 3. CRONISTORIA PEGGIORAMENTI FISCALI & RANKING OCSE */}
      <div className="grid lg:grid-cols-12 gap-8">
         <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
               <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 flex items-center gap-4">
                  <History className="text-rose-600" /> Timeline del Prelievo Fiscale sui Rendimenti
               </h3>
               <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <ComposedChart data={TAXATION_HISTORY}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="year" tick={{fontSize: 10, fontWeight: 'bold'}} axisLine={false} tickLine={false} />
                        <YAxis unit="%" hide />
                        <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}} />
                        <Bar dataKey="rate" name="Aliquota Rendimenti %" radius={[12, 12, 0, 0]} barSize={40}>
                           {TAXATION_HISTORY.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : '#ef4444'} fillOpacity={0.8} />
                           ))}
                        </Bar>
                        <Line type="monotone" dataKey="rate" stroke="#ef4444" strokeWidth={3} dot={{ r: 6 }} />
                     </ComposedChart>
                  </ResponsiveContainer>
               </div>
               <div className="mt-8 p-6 bg-rose-50 rounded-3xl border border-rose-100 flex items-start gap-4">
                  <AlertCircle size={24} className="text-rose-600 shrink-0 mt-1" />
                  <p className="text-xs text-rose-900 leading-relaxed font-medium">
                    "Dottore, l'Italia è l'unico Paese europeo con tassazione **annuale** (non al riscatto). Dal 2015 l'aliquota è raddoppiata quasi ovunque (dall'11% al 20-26%), indicando un disinteresse della politica verso questi strumenti strategici."
                  </p>
               </div>
            </div>

            {/* OCSE RANKING DETAIL */}
            <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
               <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 flex items-center gap-4">
                  <BarChart3 className="text-indigo-600" /> Posizionamento OCSE: Patrimonio / PIL (%)
               </h3>
               <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={INTERNATIONAL_RANKING} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="country" tick={{fontSize: 9, fontWeight: 'black'}} axisLine={false} tickLine={false} />
                        <YAxis unit="%" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                        <Tooltip cursor={{fill: 'transparent'}} />
                        <Bar dataKey="gdp_pct" radius={[8, 8, 0, 0]} barSize={35}>
                           {INTERNATIONAL_RANKING.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.country === 'Italia' ? '#ef4444' : entry.country === 'Media OCSE' ? '#94a3b8' : '#4f46e5'} />
                           ))}
                        </Bar>
                     </BarChart>
                  </ResponsiveContainer>
               </div>
            </div>
         </div>

         {/* SIDEBAR: GLOBAL GIANTS & UE COMPARISON */}
         <div className="lg:col-span-4 space-y-8">
            <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Landmark size={150} /></div>
               <h4 className="text-xl font-black italic uppercase tracking-tighter mb-8 leading-tight">Il Gap con i <br/> <span className="text-amber-500 text-2xl">Giganti Globali</span></h4>
               <div className="space-y-6 relative z-10">
                  {GLOBAL_GIANTS.map((g, i) => (
                    <div key={i} className="space-y-2">
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                          <span className="text-slate-400">{g.name}</span>
                          <span>{g.value} Mld $</span>
                       </div>
                       <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full" style={{ width: `${(g.value / 1600) * 100}%`, backgroundColor: g.color }}></div>
                       </div>
                    </div>
                  ))}
               </div>
               <p className="mt-8 text-[11px] text-slate-400 italic leading-relaxed">
                  L'Italia (260 Mld) è lontana dai trilioni di Giappone e Norvegia, ma resta il 15° mercato OCSE per patrimonio assoluto.
               </p>
            </div>

            <div className="bg-indigo-50 p-10 rounded-[3rem] border border-indigo-100 shadow-sm relative overflow-hidden">
               {/* Fix: Changed 'Globe' to 'Globe2' to match imported icon name */}
               <div className="absolute top-0 right-0 p-4 opacity-10"><Globe2 size={100} /></div>
               <h4 className="text-xl font-black text-indigo-900 uppercase tracking-tighter mb-8 italic">Il "Caso Italia": <br/> Struttura Occupazionale</h4>
               <div className="space-y-6">
                  {UE_EMPLOYMENT_COMPARISON.map((c, i) => (
                    <div key={i} className="flex justify-between items-end border-b border-indigo-200 pb-4">
                       <div>
                          <p className="text-sm font-black text-indigo-800 uppercase tracking-tight">{c.name}</p>
                          <p className="text-[9px] text-indigo-500 font-bold uppercase">{c.label}</p>
                       </div>
                       <p className="text-3xl font-black text-indigo-700 tracking-tighter">{c.pmi_pct}%</p>
                    </div>
                  ))}
               </div>
               <p className="mt-6 text-[10px] text-indigo-600 leading-relaxed font-bold italic">
                  *Media UE inferiore al 50%. L'Italia è il Paese con la più alta dipendenza da micro-imprese per il TFR.
               </p>
            </div>

            <div className="p-8 bg-amber-50 rounded-[2.5rem] border border-amber-200 flex gap-4 items-start shadow-sm relative overflow-hidden group">
               <div className="absolute -bottom-6 -right-6 opacity-10 group-hover:rotate-12 transition-transform"><Sparkles size={100} /></div>
               <Zap size={24} className="text-amber-600 shrink-0" />
               <div>
                  <h4 className="text-[10px] font-black text-amber-900 uppercase mb-2">Advisor Insight</h4>
                  <p className="text-[11px] text-amber-800 leading-relaxed font-medium italic">
                    "Dottore, il 27,7% di iscritti non versanti è un potenziale di vendita immediato. Molti hanno aderito per vincoli contrattuali ma non stanno capitalizzando."
                  </p>
               </div>
            </div>
         </div>
      </div>

      {/* 4. ANATOMIA PMI ITALIANE: DETTAGLIO GRANULARE */}
      <div className="bg-white p-10 rounded-[4rem] border border-slate-200 shadow-sm relative overflow-hidden">
         <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <div>
               <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic flex items-center gap-4 leading-none">
                  <Factory className="text-rose-600" /> Anatomia delle Imprese e del TFR
               </h3>
               <p className="text-slate-500 text-sm font-medium mt-2">Dati ISTAT/Confartigianato su 4,66 Milioni di imprese italiane</p>
            </div>
            <div className="bg-rose-600 px-8 py-4 rounded-[2rem] text-white shadow-xl">
               <p className="text-[10px] font-black uppercase opacity-70 mb-1 tracking-widest">TFR Esternalizzabile (PMI)</p>
               <p className="text-3xl font-black">25,8 <span className="text-sm opacity-50 uppercase">Mld € / anno</span></p>
            </div>
         </div>

         <div className="overflow-x-auto rounded-[2.5rem] border border-slate-100 shadow-inner">
            <table className="w-full text-left border-collapse">
               <thead className="bg-[#0f172a] text-white text-[10px] font-black uppercase tracking-[0.2em]">
                  <tr>
                     <th className="px-8 py-8">Classe Dimensione (Addetti)</th>
                     <th className="px-6 py-8 text-center">% sul Totale</th>
                     <th className="px-6 py-8 text-center border-l border-white/5">N. Addetti (Mln)</th>
                     <th className="px-6 py-8 text-right bg-rose-900/50">TFR Accantonato (Mld€)</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100 text-xs font-bold">
                  <tr className="bg-rose-50/50">
                     <td className="px-8 py-6 text-slate-900">
                        <div className="flex flex-col">
                           <span className="font-black text-lg">Microimprese (0-9)</span>
                           <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Tessuto prevalente del Paese</span>
                        </div>
                     </td>
                     <td className="px-6 py-6 text-center text-rose-600 font-black text-xl">{ITALIAN_PMI_STRUCTURE.MICRO.pct}%</td>
                     <td className="px-6 py-6 text-center text-slate-700">{ITALIAN_PMI_STRUCTURE.MICRO.employees.toFixed(3)}</td>
                     <td className="px-8 py-6 text-right font-black text-rose-700 text-lg">17,3 Mld</td>
                  </tr>
                  <tr>
                     <td className="px-8 py-6 text-slate-700 font-black">Piccole Imprese (10-49)</td>
                     <td className="px-6 py-6 text-center">{ITALIAN_PMI_STRUCTURE.SMALL.pct}%</td>
                     <td className="px-6 py-6 text-center">{ITALIAN_PMI_STRUCTURE.SMALL.employees.toFixed(3)}</td>
                     <td className="px-8 py-6 text-right font-black">8,5 Mld</td>
                  </tr>
                  <tr className="bg-slate-50">
                     <td className="px-8 py-6 text-slate-700 font-black">Medie Imprese (50-249)</td>
                     <td className="px-6 py-6 text-center">{ITALIAN_PMI_STRUCTURE.MEDIUM.pct}%</td>
                     <td className="px-6 py-6 text-center">{ITALIAN_PMI_STRUCTURE.MEDIUM.employees.toFixed(3)}</td>
                     <td className="px-8 py-6 text-right font-black">3,5 Mld</td>
                  </tr>
                  <tr className="bg-indigo-50/20">
                     <td className="px-8 py-6 text-slate-700">Grandi Imprese (250+)</td>
                     <td className="px-6 py-6 text-center font-black">{ITALIAN_PMI_STRUCTURE.LARGE.pct}%</td>
                     <td className="px-6 py-6 text-center">{ITALIAN_PMI_STRUCTURE.LARGE.employees.toFixed(3)}</td>
                     <td className="px-8 py-6 text-right font-black text-indigo-700">2,0 Mld</td>
                  </tr>
               </tbody>
            </table>
         </div>
         
         <div className="mt-8 grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-slate-900 rounded-[3rem] text-white flex items-center gap-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5"><Target size={150} /></div>
               <div className="bg-amber-500 p-4 rounded-3xl text-slate-900 shrink-0 animate-pulse"><Zap size={28} /></div>
               <div>
                  <h4 className="text-xl font-black uppercase text-amber-400 mb-2 italic">Il Punto di Rottura</h4>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">
                    Le microimprese (95% del totale) si finanziano con **17,3 Mld** di debito a vista (TFR). È un rischio sistemico che offre al consulente un'argomentazione d'urto imbattibile per l'audit B2B.
                  </p>
               </div>
            </div>
            <div className="p-8 bg-indigo-900 rounded-[3rem] text-white flex items-center gap-8 relative overflow-hidden border-t-8 border-indigo-500">
               <div className="absolute top-0 right-0 p-4 opacity-5"><Microscope size={150} /></div>
               <div className="bg-indigo-500 p-4 rounded-3xl text-white shrink-0"><Siren size={28} /></div>
               <div>
                  <h4 className="text-xl font-black uppercase text-indigo-300 mb-2 italic">Occupazione MPI</h4>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">
                    Ben 11 milioni di lavoratori italiani (60% del privato) operano in imprese sotto i 50 addetti. Questo è il target primario per i piani di previdenza collettiva.
                  </p>
               </div>
            </div>
         </div>
      </div>

      {/* 5. FOOTER EXECUTIVO CON FONTI */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="bg-[#0a0f1d] p-4 rounded-[1.5rem] text-white shadow-lg"><FileText size={32} /></div>
            <div>
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">Market Dimensions & intelligence Report</p>
               <p className="text-xs text-slate-500 font-bold italic">Rif. Tecnico: Report OCSE "Pension Markets in Focus 2025" | Nota ISTAT Gennaio 2025 | Relazione Annuale COVIP 2024</p>
            </div>
         </div>
         <div className="text-right">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">DOCUMENTO AD USO INTERNO - MARKET INTELLIGENCE UNIT GRUPPO VOMERO</p>
         </div>
      </div>

    </div>
  );
};

export default MarketDimensionsView;