
import React, { useState, useMemo } from 'react';
import { ASSET_PROTECTION_DATA, LTC_DATA } from '../constants';
import { 
  ShieldCheck, ShieldAlert, Lock, Gavel, AlertTriangle, 
  Search, Info, Scale, Landmark, History, 
  Zap, AlertOctagon, Siren, CheckCircle2, 
  ArrowRight, ShieldPlus, BookOpen, UserCheck,
  HeartPulse, Activity, Thermometer, UserPlus,
  Book, Quote, Lightbulb, GraduationCap
} from 'lucide-react';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

const AssetProtectionView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'STRESS_TEST' | 'MATRICE' | 'GIURISPRUDENZA'>('STRESS_TEST');
  const [selectedScenario, setSelectedScenario] = useState<keyof typeof ASSET_PROTECTION_DATA.STRESS_TEST_SCENARIOS>('CIVILE');
  const [patrimonioInput, setPatrimonioInput] = useState<number>(500000);

  const scenario = ASSET_PROTECTION_DATA.STRESS_TEST_SCENARIOS[selectedScenario];

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-24">
      
      {/* 1. HEADER EXECUTIVE */}
      <div className="bg-[#0a0f1d] rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden border-b-8 border-emerald-500">
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-emerald-500 p-3 rounded-2xl shadow-xl shadow-emerald-600/20"><ShieldCheck size={32} className="text-slate-900"/></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-emerald-400">Wealth Shield Diagnostics - Gruppo Vomero</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                Asset <br/> <span className="text-emerald-500 text-6xl">Protection Lab</span>
              </h1>
              <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
                Analisi della resilienza patrimoniale sotto stress. Valutiamo l'efficacia legale degli strumenti contro aggressioni civili, tributarie e fallimentari.
              </p>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center relative overflow-hidden group">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl"></div>
              <p className="text-[10px] font-black uppercase text-emerald-500 mb-2 tracking-widest">Patrimonio Analizzato</p>
              <p className="text-6xl font-black text-white tracking-tighter">{formatCurrency(patrimonioInput)}</p>
              <input 
                type="range" min="100000" max="5000000" step="100000" 
                value={patrimonioInput} 
                onChange={(e) => setPatrimonioInput(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none accent-emerald-500 mt-6" 
              />
           </div>
        </div>
      </div>

      {/* 2. NAVIGATION TABS */}
      <div className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-2xl w-full md:w-fit mx-auto shadow-inner border border-slate-200">
         <button onClick={() => setActiveTab('STRESS_TEST')} className={`px-10 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'STRESS_TEST' ? 'bg-white text-[#0a0f1d] shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <Zap size={16} /> Stress Test Scenari
         </button>
         <button onClick={() => setActiveTab('MATRICE')} className={`px-10 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'MATRICE' ? 'bg-white text-[#0a0f1d] shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <Scale size={16} /> Matrice Comparativa
         </button>
         <button onClick={() => setActiveTab('GIURISPRUDENZA')} className={`px-10 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'GIURISPRUDENZA' ? 'bg-white text-[#0a0f1d] shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <History size={16} /> Focus Giurisprudenziale
         </button>
      </div>

      {/* 3. CONTENT: STRESS TEST SCENARI + DETTAGLI ESAUSTIVI */}
      {activeTab === 'STRESS_TEST' && (
        <div className="space-y-10 animate-fade-in">
          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* SIDEBAR CONFIGURA MINACCIA */}
            <div className="lg:col-span-4 space-y-6">
                <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm space-y-8 h-[800px] flex flex-col">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Siren size={14} className="text-red-600" /> Configura Minaccia
                  </h4>
                  <div className="space-y-2 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                      {(Object.entries(ASSET_PROTECTION_DATA.STRESS_TEST_SCENARIOS) as [string, any][]).map(([key, val]) => (
                        <button 
                          key={key} 
                          onClick={() => setSelectedScenario(key as any)}
                          className={`w-full text-left p-5 rounded-2xl border-2 transition-all group ${selectedScenario === key ? 'border-emerald-500 bg-emerald-50 shadow-md' : 'border-slate-100 hover:bg-slate-50'}`}
                        >
                            <div className="flex justify-between items-center mb-1">
                              <h5 className="font-black text-[11px] uppercase tracking-tight text-slate-800 group-hover:text-emerald-700 leading-tight">{val.title}</h5>
                              {selectedScenario === key && <CheckCircle2 size={16} className="text-emerald-600" />}
                            </div>
                            <p className="text-[9px] text-slate-500 font-bold leading-snug uppercase mt-1 italic opacity-60">{val.legal_ref}</p>
                        </button>
                      ))}
                  </div>
                  <div className="p-6 bg-slate-900 rounded-3xl text-white">
                     <p className="text-[10px] font-black text-emerald-400 uppercase mb-2 tracking-widest italic flex items-center gap-2"><Lightbulb size={12}/> Advisor Tip</p>
                     <p className="text-[11px] text-slate-400 leading-relaxed font-medium italic">"Dottore, il segreto è spostare il capitale dal conto corrente allo 'scudo' quando il mare è calmo."</p>
                  </div>
                </div>
            </div>

            {/* AREA RISULTATI ANALISI ESAUSTIVA */}
            <div className="lg:col-span-8 space-y-6">
                
                {/* MATRICE RESILIENZA DINAMICA */}
                <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm relative overflow-hidden">
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 flex items-center gap-4 leading-none">
                      <ShieldAlert className="text-emerald-500" /> Resilienza Strumenti: <br/><span className="text-indigo-600 text-3xl">{scenario.title}</span>
                  </h3>
                  
                  <div className="space-y-8 mb-12">
                      {[
                        { label: "Conto Corrente / Titoli", score: scenario.bank, icon: Landmark, color: "bg-red-500", detail: "Aggredibile immediatamente tramite pignoramento presso terzi (Art. 543 c.p.c.)." },
                        { label: "Polizza Unit-Linked Standard", score: scenario.policy_standard, icon: ShieldPlus, color: "bg-amber-500", detail: "Rischio di riqualificazione finanziaria se non prevale la componente demografica." },
                        { label: "MultInvest 90/10 (GS)", score: scenario.policy_90gs, icon: Lock, color: "bg-indigo-600", detail: "Elevato scudo sulla quota in Gestione Separata protetta dal vincolo assicurativo." },
                        { label: "Fondo Pensione (PIP)", score: scenario.pip, icon: ShieldCheck, color: "bg-emerald-600", detail: "Protezione massima garantita da leggi speciali (Art. 1923 c.c. e Art. 2117 c.c.)." }
                      ].map((item, idx) => (
                        <div key={idx} className="space-y-2 group">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                  <item.icon size={16} className="text-slate-400 group-hover:text-indigo-600 transition-colors" />
                                  <span className="text-xs font-black text-slate-700 uppercase">{item.label}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                 <span className="text-[10px] font-black text-slate-400 uppercase italic opacity-0 group-hover:opacity-100 transition-opacity">Efficiency Index</span>
                                 <span className="text-xs font-black text-slate-900">{item.score}%</span>
                              </div>
                            </div>
                            <div className="h-4 bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
                              <div 
                                  className={`h-full ${item.color} transition-all duration-1000 ease-out flex items-center justify-end px-4`}
                                  style={{ width: `${item.score}%` }}
                              >
                                  <span className="text-[8px] text-white font-black">{item.score === 0 ? 'VULNERABILE' : ''}</span>
                              </div>
                            </div>
                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">{item.detail}</p>
                        </div>
                      ))}
                  </div>

                  {/* NUOVO PANNELLO: FONDAMENTI GIURIDICI ESAUSTIVI */}
                  <div className="grid md:grid-cols-2 gap-6 pt-10 border-t border-slate-100">
                     <div className="bg-indigo-50 p-8 rounded-[2.5rem] border-2 border-indigo-100 relative overflow-hidden flex flex-col justify-between group">
                        <div className="absolute -top-10 -right-10 opacity-5 group-hover:rotate-12 transition-transform"><Book size={180} /></div>
                        <div>
                           <h4 className="text-[10px] font-black text-indigo-700 uppercase mb-4 tracking-widest flex items-center gap-2 italic">
                              <GraduationCap size={14}/> Analisi Giuridica Avanzata
                           </h4>
                           <p className="text-[10px] font-black text-indigo-600 mb-2">{scenario.legal_ref}</p>
                           <p className="text-[11px] text-indigo-900 leading-relaxed font-bold italic">
                              {/* Fix: cast scenario to any to access optional properties legal_deep and case_history */}
                              "{(scenario as any).legal_deep || 'Riferimento consolidato alla protezione del risparmio previdenziale.'}"
                           </p>
                        </div>
                        <div className="mt-6 flex items-center gap-2 text-[9px] font-black text-indigo-400 uppercase tracking-widest border-t border-indigo-200 pt-4">
                           <History size={12}/> Orientamento: Consolidato 2025
                        </div>
                     </div>

                     <div className="bg-emerald-50 p-8 rounded-[2.5rem] border-2 border-emerald-100 relative overflow-hidden flex flex-col justify-between group">
                        <div className="absolute -top-10 -right-10 opacity-5 group-hover:rotate-12 transition-transform"><CheckCircle2 size={180} /></div>
                        <div>
                           <h4 className="text-[10px] font-black text-emerald-700 uppercase mb-4 tracking-widest flex items-center gap-2 italic">
                              <Quote size={14}/> Real Case History
                           </h4>
                           <p className="text-[11px] text-emerald-900 leading-relaxed font-bold">
                              {/* Fix: cast scenario to any to access optional properties legal_deep and case_history */}
                              {(scenario as any).case_history || 'In uno scenario reale di aggressione, lo strumento ha dimostrato la capacità di segregazione patrimoniale impedendo l\'escussione immediata.'}
                           </p>
                        </div>
                        <div className="mt-6 flex items-center gap-2 text-[9px] font-black text-emerald-500 uppercase tracking-widest border-t border-emerald-200 pt-4">
                           <Activity size={12}/> Verifica: Certificata Vomero Unit
                        </div>
                     </div>
                  </div>
                </div>

                {/* CALL TO ACTION: ZURICH OPTION F */}
                <div className="bg-[#233D7B] p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden border-l-8 border-amber-500 group">
                   <div className="absolute -top-10 -right-10 opacity-5 group-hover:scale-110 transition-transform"><ShieldCheck size={300} /></div>
                   <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                      <div className="bg-amber-500 p-6 rounded-full text-slate-900 shadow-xl animate-pulse"><Zap size={32} /></div>
                      <div className="space-y-4">
                         <h4 className="text-2xl font-black italic uppercase tracking-tighter text-amber-400 leading-tight">Soluzione "Asset & Care": <br/> Option F Zurich</h4>
                         <p className="text-sm text-blue-100 leading-relaxed font-medium italic">
                            "Dottore, non proteggiamo solo il patrimonio dagli altri. Proteggiamolo da se stesso. L'Opzione F garantisce il raddoppio della rendita in caso di LTC, impedendo che i costi di cura erodano l'eredità che ha costruito per i suoi figli. È l'unica protezione 360° oggi sul mercato."
                         </p>
                         <div className="flex gap-3">
                            <span className="px-3 py-1 bg-white/10 rounded-lg text-[9px] font-black uppercase border border-white/20">Art. 1923 c.c. Compliance</span>
                            <span className="px-3 py-1 bg-white/10 rounded-lg text-[9px] font-black uppercase border border-white/20">Protocollo ADL Protetto</span>
                         </div>
                      </div>
                   </div>
                </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. CONTENT: MATRICE COMPARATIVA (INVARIATA) */}
      {activeTab === 'MATRICE' && (
        <div className="animate-fade-in space-y-8">
           <div className="bg-white rounded-[3rem] border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                 <thead className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest">
                    <tr>
                       <th className="px-8 py-8">Asset / Strumento</th>
                       <th className="px-6 py-8 text-center border-l border-white/10">Grado di Protezione</th>
                       <th className="px-6 py-8 text-center border-l border-white/10">Rischio Aggressione</th>
                       <th className="px-6 py-8 border-l border-white/10">Analisi Tecnica</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100 font-bold text-xs">
                    {ASSET_PROTECTION_DATA.COMPARISON_MATRIX.map((row, idx) => (
                       <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                          <td className="px-8 py-6 font-black text-slate-800 text-sm uppercase italic">{row.asset}</td>
                          <td className="px-6 py-6 text-center">
                             <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${
                                row.shield === 'MASSIMO' ? 'bg-emerald-100 text-emerald-700' :
                                row.shield === 'ALTO' ? 'bg-indigo-100 text-indigo-700' :
                                row.shield === 'NULLO' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
                             }`}>
                                {row.shield}
                             </span>
                          </td>
                          <td className="px-6 py-6 text-center text-rose-600 font-black text-lg tracking-tighter">{row.risk}</td>
                          <td className="px-6 py-6 text-slate-500 font-medium text-xs leading-relaxed italic">{row.detail}</td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
           
           <div className="p-8 bg-amber-50 rounded-[2.5rem] border border-amber-200 flex gap-6 items-start shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10"><AlertOctagon size={100} /></div>
              <AlertTriangle size={32} className="text-amber-600 shrink-0 mt-1" />
              <div className="space-y-2 relative z-10">
                 <h4 className="font-black text-amber-900 text-sm uppercase tracking-widest">Alert Revocatoria (Art. 2901 c.c.)</h4>
                 <p className="text-xs text-amber-800 leading-relaxed font-medium">
                    "Signor Cliente, lo scudo patrimoniale deve essere costruito in tempi di pace. Qualsiasi versamento effettuato con l'intento di frodare i creditori (consilium fraudis) può essere reso inefficace entro 5 anni tramite Azione Revocatoria. La tempestività della consulenza è l'unico vero scudo."
                 </p>
              </div>
           </div>
        </div>
      )}

      {/* 5. CONTENT: FOCUS GIURISPRUDENZIALE (INVARIATA) */}
      {activeTab === 'GIURISPRUDENZA' && (
        <div className="grid md:grid-cols-3 gap-8 animate-fade-in">
           {ASSET_PROTECTION_DATA.JURISPRUDENCE_CORNER.map((item) => (
              <div key={item.id} className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-xl relative overflow-hidden group flex flex-col justify-between">
                 <div className="absolute -top-10 -right-10 opacity-5 group-hover:rotate-12 transition-transform"><BookOpen size={200} /></div>
                 <div>
                    <div className="flex justify-between items-start mb-6">
                       <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-500/30">Case History</span>
                       <Gavel size={24} className="text-slate-600" />
                    </div>
                    <h4 className="text-xl font-black text-amber-500 mb-2 uppercase italic leading-tight">{item.title}</h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">{item.focus}</p>
                    <p className="text-sm italic text-slate-300 leading-relaxed mb-10">"{item.text}"</p>
                 </div>
                 <div className="bg-white/5 p-5 rounded-2xl border border-white/10 text-xs font-bold text-emerald-400 shadow-inner">
                    IMPATTO: {item.impact}
                 </div>
              </div>
           ))}
        </div>
      )}

      {/* FOOTER EXECUTIVO */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="bg-[#0a0f1d] p-4 rounded-[1.5rem] text-white shadow-lg"><ShieldPlus size={32} /></div>
            <div>
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">Asset Protection Certificate - Gruppo Vomero</p>
               <p className="text-xs text-slate-500 font-bold italic">Rif. Tecnico: Art. 1923 c.c. | Art. 11 D.Lgs 252/05 | Revisione Cassazione 2024</p>
            </div>
         </div>
         <div className="text-right">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">DOCUMENTO AD USO INTERNO RISERVATO - PRIVATE ADVISOR ONLY</p>
         </div>
      </div>

    </div>
  );
};

export default AssetProtectionView;
