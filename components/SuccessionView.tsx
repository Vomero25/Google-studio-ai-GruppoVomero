
import React, { useState, useMemo } from 'react';
import { SUCCESSION_DATA } from '../constants';
import { 
  Scale, ShieldCheck, AlertTriangle, Coins, Info, 
  Calculator, Gavel, Lock, CheckCircle2, BookOpen, 
  ScrollText, ArrowRight, Zap, Clock, Sparkles, HelpCircle,
  TrendingUp, MessageCircle, AlertOctagon, HeartPulse,
  Gift, Wallet, Landmark, ArrowDownToLine, MousePointer2,
  Lightbulb, ShieldAlert, Ban, HandHelping, History, Globe,
  Settings2, ChevronRight, Siren, Timer, Briefcase, FileText,
  UserPlus, Table as TableIcon, Crown, Percent
} from 'lucide-react';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

const SuccessionView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'STRESS_TEST' | 'ALQUOTE' | 'TIMING' | 'LEGAL'>('STRESS_TEST');
  
  // Stato Simulatore
  const [estateValue, setEstateValue] = useState<number>(1500000);
  const [kinship, setKinship] = useState<keyof typeof SUCCESSION_DATA.TAX_RATES>('SPOUSE_CHILDREN');
  const [pensionPot, setPensionPot] = useState<number>(200000);
  const [multinvestPot, setMultinvestPot] = useState<number>(300000);
  const [gsPercentage, setGsPercentage] = useState<number>(90); // Default Campagna Multinvest

  const taxRules = SUCCESSION_DATA.TAX_RATES[kinship];
  
  const simulation = useMemo(() => {
    // 1. Scenario Bancario Standard (Massa Ereditaria + Fondo + Multinvest tutti tassati)
    // Nota: Nella realtà Fondo e Polizza sono esenti, qui mostriamo il "costo del non fare"
    const totalLegacyA = estateValue + pensionPot + multinvestPot;
    const taxableA = Math.max(0, totalLegacyA - taxRules.exemption);
    const taxA = taxableA * taxRules.rate;

    // 2. Scenario Ottimizzato (Fondo e Multinvest ESENTI da imposta successione)
    const taxableB = Math.max(0, estateValue - taxRules.exemption);
    const taxB = taxableB * taxRules.rate;

    // 3. Analisi Imposta di Bollo (0,20% annuo)
    // Fondo Pensione: 0€ bollo
    // Multinvest: Bollo dovuto solo sulla parte Unit Linked (100 - GS%)
    const unitLinkedPortion = multinvestPot * (1 - (gsPercentage / 100));
    const annualStampDutyMultinvest = unitLinkedPortion * 0.002;
    const annualStampDutyBank = (estateValue + multinvestPot) * 0.002; // Semplificato su asset mobiliari

    const savingTax = taxA - taxB;
    const efficiency = totalLegacyA > 0 ? (savingTax / totalLegacyA) * 100 : 0;

    return { 
      savingTax, 
      taxA, 
      taxB, 
      efficiency, 
      totalLegacyA, 
      pensionPot, 
      multinvestPot,
      annualStampDutyMultinvest,
      annualStampDutyBank,
      stampDutySaving: annualStampDutyBank - annualStampDutyMultinvest
    };
  }, [estateValue, kinship, pensionPot, multinvestPot, gsPercentage, taxRules]);

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-24">
      
      {/* 1. HERO EXECUTIVE SECTION */}
      <div className="bg-[#0f172a] rounded-[3rem] p-12 text-white shadow-2xl relative border-b-8 border-amber-500 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-500/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-amber-500 p-3 rounded-2xl shadow-xl shadow-amber-600/20"><Scale size={32} className="text-slate-900"/></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-amber-400 italic">Legacy Engineering Unit - Gruppo Vomero</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                Legacy <br/> <span className="text-amber-500">Protection Lab</span>
              </h1>
              <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
                Analisi comparativa tra <strong>Fondo Pensione</strong> e <strong>Polizza Multinvest</strong>. Come l'Art. 12 D.Lgs 346/90 azzera il prelievo fiscale sul tuo passaggio generazionale.
              </p>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center relative group">
              <p className="text-[10px] font-black uppercase text-amber-500 mb-2 tracking-widest">Capitale Salvo dalle Tasse</p>
              <p className="text-7xl font-black text-white tracking-tighter animate-pulse">{formatCurrency(simulation.savingTax)}</p>
              <div className="mt-8 flex justify-center gap-3">
                 <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-6 py-2 rounded-full border border-emerald-500/30 uppercase tracking-widest italic">Asset Shield: {simulation.efficiency.toFixed(1)}%</span>
              </div>
           </div>
        </div>
      </div>

      {/* 2. NAVIGATION SUB-TABS */}
      <div className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-2xl w-full md:w-fit mx-auto shadow-inner border border-slate-200">
         <button onClick={() => setActiveTab('STRESS_TEST')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'STRESS_TEST' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <Zap size={16} /> Stress Test Fiscale
         </button>
         <button onClick={() => setActiveTab('ALQUOTE')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'ALQUOTE' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <TableIcon size={16} /> Aliquote & Franchigie
         </button>
         <button onClick={() => setActiveTab('TIMING')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'TIMING' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <Timer size={16} /> Burocrazia vs Liquidità
         </button>
         <button onClick={() => setActiveTab('LEGAL')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'LEGAL' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <Gavel size={16} /> Nuovi Orientamenti
         </button>
      </div>

      {/* 3. CONTENT RENDERER */}
      <div className="min-h-[600px]">
        {/* --- TAB 1: STRESS TEST --- */}
        {activeTab === 'STRESS_TEST' && (
          <div className="grid lg:grid-cols-12 gap-8 animate-fade-in">
             <div className="lg:col-span-4 space-y-6">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Settings2 size={14} className="text-amber-500" /> Asset Configurator
                   </h4>
                   <div className="space-y-6">
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                         <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Patrimonio Ordinario (€)</label>
                         <input type="number" value={estateValue} onChange={(e) => setEstateValue(Number(e.target.value))} className="w-full bg-transparent font-black text-2xl outline-none text-slate-900" />
                      </div>
                      <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
                         <label className="text-[10px] font-black text-indigo-600 uppercase block mb-1">Capitale Fondo Pensione (€)</label>
                         <input type="number" value={pensionPot} onChange={(e) => setPensionPot(Number(e.target.value))} className="w-full bg-transparent font-black text-2xl outline-none text-indigo-800" />
                      </div>
                      <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
                         <label className="text-[10px] font-black text-amber-600 uppercase block mb-1">Capitale Polizza Multinvest (€)</label>
                         <input type="number" value={multinvestPot} onChange={(e) => setMultinvestPot(Number(e.target.value))} className="w-full bg-transparent font-black text-2xl outline-none text-amber-800" />
                         <div className="mt-4 pt-4 border-t border-amber-200">
                            <div className="flex justify-between items-center mb-1">
                               <span className="text-[9px] font-black text-amber-500 uppercase">Quota Gestione Separata</span>
                               <span className="text-xs font-black text-amber-700">{gsPercentage}%</span>
                            </div>
                            <input type="range" min="10" max="90" step="5" value={gsPercentage} onChange={(e) => setGsPercentage(Number(e.target.value))} className="w-full h-1 bg-amber-300 rounded-lg appearance-none accent-amber-600" />
                         </div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                         <label className="text-[10px] font-black text-slate-400 uppercase block mb-2">Grado di Parentela Eredi</label>
                         <select value={kinship} onChange={(e) => setKinship(e.target.value as any)} className="w-full bg-transparent font-bold text-slate-800 outline-none">
                            {Object.entries(SUCCESSION_DATA.TAX_RATES).map(([k, v]) => (
                               <option key={k} value={k}>{v.label}</option>
                            ))}
                         </select>
                      </div>
                   </div>
                </div>
             </div>

             <div className="lg:col-span-8 space-y-8">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                   <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 flex items-center gap-3">
                      <TrendingUp className="text-amber-500" /> Analisi Comparativa del Prelievo
                   </h3>
                   <div className="grid md:grid-cols-2 gap-8">
                      <div className="p-8 bg-rose-50 rounded-[2.5rem] border-2 border-rose-100 relative group overflow-hidden">
                         <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><AlertOctagon size={120} /></div>
                         <p className="text-[10px] font-black text-rose-400 uppercase mb-2 tracking-widest italic">Scenario "Asset Bancari"</p>
                         <p className="text-5xl font-black text-rose-700">{formatCurrency(simulation.taxA)}</p>
                         <p className="text-[10px] text-rose-500 mt-4 font-bold uppercase leading-relaxed">
                            Patrimonio interamente colpito da tassa di successione e imposta di bollo dello 0,20% annuo.
                         </p>
                      </div>
                      <div className="p-8 bg-emerald-50 rounded-[2.5rem] border-2 border-emerald-100 relative group overflow-hidden">
                         <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><ShieldCheck size={120} /></div>
                         <p className="text-[10px] font-black text-emerald-600 uppercase mb-2 tracking-widest italic">Vomero Legacy Strategy</p>
                         <p className="text-5xl font-black text-emerald-700">{formatCurrency(simulation.taxB)}</p>
                         <p className="text-[10px] text-emerald-500 mt-4 font-bold uppercase leading-relaxed">
                            Fondo e Multinvest ESCLUSI (Art. 12). La franchigia {formatCurrency(taxRules.exemption)} protegge il resto.
                         </p>
                      </div>
                   </div>
                   
                   <div className="mt-10 grid md:grid-cols-2 gap-6">
                      <div className="p-6 bg-slate-900 rounded-3xl text-white relative overflow-hidden group">
                         <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Percent size={100} /></div>
                         <h4 className="text-amber-400 text-[10px] font-black uppercase tracking-widest mb-4">Focus Bollo (0,20%)</h4>
                         <div className="space-y-3">
                            <div className="flex justify-between items-center text-xs">
                               <span className="text-slate-400 font-bold">Erosione Bancaria:</span>
                               <span className="text-rose-400 font-black">{formatCurrency(simulation.annualStampDutyBank)}/anno</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                               <span className="text-slate-400 font-bold">Erosione Multinvest:</span>
                               <span className="text-emerald-400 font-black">{formatCurrency(simulation.annualStampDutyMultinvest)}/anno</span>
                            </div>
                            <div className="pt-3 border-t border-white/10 flex justify-between items-center text-sm">
                               <span className="text-amber-500 font-black uppercase italic">Vantaggio Annunale:</span>
                               <span className="font-black text-white">+{formatCurrency(simulation.stampDutySaving)}</span>
                            </div>
                         </div>
                      </div>

                      <div className="p-6 bg-emerald-600 rounded-3xl text-white flex items-center gap-6 shadow-xl">
                         <div className="bg-white/20 p-4 rounded-2xl"><Gift size={32} /></div>
                         <div>
                            <h4 className="text-xl font-black uppercase tracking-tighter italic">Plus Ereditario</h4>
                            <p className="text-xs font-medium opacity-90 leading-relaxed">
                               "Dottore, il risparmio non è solo fiscale (0,20% annuo risparmiato), ma legale: Multinvest e Fondo sono inattaccabili dai creditori."
                            </p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* --- TAB 2: ALIQUOTE & FRANCHIGIE --- */}
        {activeTab === 'ALQUOTE' && (
          <div className="animate-fade-in space-y-8">
             <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm relative overflow-hidden">
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 flex items-center gap-4">
                   <TableIcon className="text-amber-500" /> Matrice Imposizione Fiscale 2025
                </h3>
                
                <div className="grid lg:grid-cols-12 gap-12">
                   <div className="lg:col-span-8 overflow-hidden rounded-3xl border border-slate-100">
                      <table className="w-full text-left border-collapse">
                        <thead className="bg-[#0f172a] text-white text-[10px] font-black uppercase tracking-widest">
                           <tr>
                              <th className="px-6 py-6">Beneficiario / Grado</th>
                              <th className="px-6 py-6 text-center">Aliquota %</th>
                              <th className="px-6 py-6 text-right">Franchigia €</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs font-bold">
                           {Object.entries(SUCCESSION_DATA.TAX_RATES).map(([key, val]) => (
                              <tr key={key} className="hover:bg-slate-50 transition-colors">
                                 <td className="px-6 py-5 text-slate-700">{val.label}</td>
                                 <td className="px-6 py-5 text-center text-rose-600 font-black">{val.rate * 100}%</td>
                                 <td className="px-6 py-5 text-right text-emerald-600">{formatCurrency(val.exemption)}</td>
                              </tr>
                           ))}
                        </tbody>
                      </table>
                   </div>
                   <div className="lg:col-span-4 space-y-6">
                      <div className="bg-indigo-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-4 opacity-10"><Crown size={100} /></div>
                         <h4 className="text-lg font-black uppercase tracking-tighter mb-4 text-amber-400">Multinvest Advantage</h4>
                         <p className="text-sm text-slate-300 leading-relaxed font-medium italic">
                            "A differenza del Fondo Pensione, la Multinvest permette di designare beneficiari **estranei all'asse ereditario** (es. nipoti, onlus, amici) mantenendo l'esenzione totale (0,00€ tasse) anche se l'aliquota ordinaria per 'Altri' sarebbe dell'8%."
                         </p>
                      </div>
                      <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                         <div className="flex items-center gap-3 mb-3 text-amber-600">
                            <AlertTriangle size={20} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Rischio Collazione</span>
                         </div>
                         <p className="text-[10px] text-slate-500 leading-relaxed font-bold">
                            Mentre i conti correnti e gli immobili entrano sempre in collazione, i premi versati in Multinvest e Fondo sono protetti dall'Art. 1923, rendendo più complessa (ma non impossibile per la legittima) l'aggressione da parte degli altri eredi.
                         </p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* --- TAB 3: TIMING & LIQUIDITÀ --- */}
        {activeTab === 'TIMING' && (
          <div className="animate-fade-in space-y-8">
             <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm">
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 flex items-center gap-4">
                   <Clock className="text-indigo-600" /> Analisi Tempi di Sblocco Patrimoniale
                </h3>
                
                <div className="grid lg:grid-cols-12 gap-12">
                   <div className="lg:col-span-8 space-y-4">
                      {SUCCESSION_DATA.TIMING_DATA.map((item, idx) => (
                         <div key={idx} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center gap-8 hover:bg-white hover:shadow-xl transition-all group">
                            <div className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center font-black text-xs ${item.asset.includes('Fondo') || item.asset.includes('Multinvest') ? 'bg-emerald-600 text-white shadow-emerald-200 shadow-lg' : 'bg-white text-slate-400 border border-slate-100'}`}>
                               <Timer size={20} className="mb-1" />
                               {item.time}
                            </div>
                            <div className="flex-1">
                               <div className="flex justify-between items-center mb-1">
                                  <h4 className="font-black text-slate-800 text-lg uppercase tracking-tight">{item.asset}</h4>
                                  <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase ${item.asset.includes('Fondo') || item.asset.includes('Multinvest') ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                     {item.liquidity}
                                  </span>
                               </div>
                               <p className="text-xs text-slate-500 font-bold mb-2">Collo di bottiglia: {item.bottleneck}</p>
                               <div className="flex items-center gap-2 text-[10px] font-black text-rose-500 uppercase italic opacity-0 group-hover:opacity-100 transition-opacity">
                                  <AlertTriangle size={12} /> {item.risk}
                               </div>
                            </div>
                         </div>
                      ))}
                   </div>
                   <div className="lg:col-span-4 flex flex-col justify-center">
                      <div className="bg-[#0a0f1d] p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-4 opacity-5"><History size={150} /></div>
                         <h4 className="text-2xl font-black italic uppercase tracking-tighter mb-6 leading-none">Rischio <br/> "Time-Lock"</h4>
                         <p className="text-sm text-slate-400 leading-relaxed font-medium italic mb-8">
                            "Signor Cliente, il 100% della Multinvest è liquidato ai beneficiari designati in meno di 3 settimane. Un conto corrente cointestato può restare bloccato dalla banca per mesi fino alla presentazione della dichiarazione di successione telematica."
                         </p>
                         <div className="pt-8 border-t border-white/10 flex items-center gap-3">
                            <div className="bg-emerald-500 p-2 rounded-xl text-slate-900"><CheckCircle2 size={24} /></div>
                            <p className="text-xs font-black uppercase text-emerald-400 tracking-widest">Liquidità Strategica</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* --- TAB 4: NUOVI ORIENTAMENTI --- */}
        {activeTab === 'LEGAL' && (
          <div className="animate-fade-in space-y-8">
             <div className="grid md:grid-cols-3 gap-8">
                {SUCCESSION_DATA.LEGAL_PILLARS.map((p, idx) => (
                   <div key={idx} className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group flex flex-col justify-between">
                      <div className="absolute -top-10 -right-10 opacity-5 group-hover:rotate-12 transition-transform"><BookOpen size={200} /></div>
                      <div>
                         <div className="flex justify-between items-start mb-8 relative z-10">
                            <div className="bg-amber-500 p-3 rounded-xl text-slate-900"><Gavel size={24} /></div>
                            <span className="text-[9px] font-black bg-white/10 px-3 py-1 rounded-full uppercase text-amber-400 border border-amber-500/30">{p.tag}</span>
                         </div>
                         <h4 className="text-xl font-black text-amber-500 mb-2 uppercase italic leading-tight relative z-10">{p.focus}</h4>
                         <p className="text-[10px] font-black text-slate-500 mb-4 tracking-widest">{p.ref}</p>
                         <p className="text-sm text-slate-400 font-medium leading-relaxed italic relative z-10">"{p.text}"</p>
                      </div>
                      <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-2 text-emerald-400 font-black text-[9px] uppercase tracking-widest">
                         <CheckCircle2 size={12} /> Orientamento Consolidato
                      </div>
                   </div>
                ))}
             </div>
             
             <div className="bg-white p-10 rounded-[40px] border-4 border-dashed border-slate-100 flex flex-col md:flex-row items-center gap-10">
                <div className="bg-indigo-50 p-8 rounded-full text-indigo-600 shrink-0"><Lightbulb size={48} /></div>
                <div className="space-y-4">
                   <h4 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">Killer Point: Esclusione dall'Attivo Ereditario</h4>
                   <p className="text-slate-600 font-medium leading-relaxed text-lg">
                      La forza combinata di **Multinvest** e **Fondo Pensione** risiede nell'Art. 12 del Testo Unico sulle Successioni. Le somme sono pagate dalla Compagnia al beneficiario **iure proprio**. Non devono essere indicate nella Dichiarazione di Successione e non erodono le franchigie degli eredi, lasciandole intatte per la protezione degli immobili.
                   </p>
                </div>
             </div>
          </div>
        )}
      </div>

      {/* 4. FOOTER EXECUTIVO */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="bg-[#0f172a] p-4 rounded-[1.5rem] text-white shadow-lg"><ScrollText size={32} /></div>
            <div>
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">Legacy Intelligence Certification</p>
               <p className="text-xs text-slate-500 font-bold italic">Rif. Tecnico: Art. 12 D.Lgs 346/90 | Art. 1923 c.c. | Appendice Multinvest M103F | Aggiornamento 2025</p>
            </div>
         </div>
         <div className="text-right">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">DOCUMENTO AD USO INTERNO RISERVATO - ADVISOR ACCESS ONLY</p>
         </div>
      </div>

    </div>
  );
};

export default SuccessionView;
