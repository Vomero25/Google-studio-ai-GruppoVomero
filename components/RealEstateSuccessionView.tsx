import React, { useState, useMemo } from 'react';
import { SUCCESSION_DATA } from '../constants';
import { 
  Home, Scale, Calculator, AlertTriangle, CheckCircle2, 
  Info, Landmark, History, ChevronRight, Gavel, 
  Briefcase, FileText, UserPlus, Table as TableIcon, 
  Crown, Percent, ArrowDownToLine, Zap, ScrollText
} from 'lucide-react';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

const RealEstateSuccessionView: React.FC = () => {
  // Input States
  const [marketValue, setMarketValue] = useState<number>(500000);
  const [renditaCatastale, setRenditaCatastale] = useState<number>(1200);
  const [kinship, setKinship] = useState<keyof typeof SUCCESSION_DATA.TAX_RATES>('SPOUSE_CHILDREN');
  const [isPrimaCasa, setIsPrimaCasa] = useState<boolean>(false);
  const [numHeirs, setNumHeirs] = useState<number>(1);

  const taxRules = SUCCESSION_DATA.TAX_RATES[kinship];

  const analysis = useMemo(() => {
    // 1. Calcolo Valore Catastale (Base Imponibile Successione)
    // Rendita * 1.05 * 110 (Prima Casa) o 120 (Altro)
    const multiplier = isPrimaCasa ? 110 : 120;
    const cadastralValue = renditaCatastale * 1.05 * multiplier;

    // 2. Imposta di Successione
    // Si applica sul valore catastale totale meno la franchigia totale degli eredi
    const totalExemption = taxRules.exemption * numHeirs;
    const taxableAmount = Math.max(0, cadastralValue - totalExemption);
    const inheritanceTax = taxableAmount * taxRules.rate;

    // 3. Imposte Ipo-Catastali
    // Se agevolazione Prima Casa: fisso 200 + 200
    // Altrimenti: 2% + 1% del valore catastale
    let ipotecaria = isPrimaCasa ? 200 : cadastralValue * 0.02;
    let catastale = isPrimaCasa ? 200 : cadastralValue * 0.01;

    // Nota: Minimo imposte proporzionali non specificato in successione come in compravendita, 
    // ma solitamente ci sono dei minimi di 168/200 euro.
    
    const totalCosts = inheritanceTax + ipotecaria + catastale;
    const impactOnMarket = (totalCosts / marketValue) * 100;

    return {
      cadastralValue,
      totalExemption,
      taxableAmount,
      inheritanceTax,
      ipotecaria,
      catastale,
      totalCosts,
      impactOnMarket
    };
  }, [renditaCatastale, kinship, isPrimaCasa, numHeirs, marketValue, taxRules]);

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-24">
      
      {/* 1. HERO SECTION */}
      <div className="bg-[#0a0f1d] rounded-[3rem] p-12 text-white shadow-2xl relative border-b-8 border-amber-500 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-500/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-amber-500 p-3 rounded-2xl shadow-xl shadow-amber-600/20"><Home size={32} className="text-slate-900"/></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-amber-500 italic">Estate Legacy Unit - Gruppo Vomero</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                Real Estate <br/> <span className="text-amber-500">Succession</span>
              </h1>
              <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
                Analisi del carico fiscale sul passaggio generazionale degli immobili. Calcola le imposte di successione, ipotecarie e catastali.
              </p>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center">
              <p className="text-[10px] font-black uppercase text-amber-500 mb-2 tracking-widest italic">Esborso Fiscale Stimato</p>
              <p className="text-7xl font-black text-white tracking-tighter">{formatCurrency(analysis.totalCosts)}</p>
              <div className="mt-8 flex justify-center gap-3">
                 <span className="bg-rose-500/20 text-rose-400 text-[10px] font-black px-6 py-2 rounded-full border border-rose-500/30 uppercase tracking-widest italic">Impatto sul Patrimonio: {analysis.impactOnMarket.toFixed(1)}%</span>
              </div>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* 2. CONFIGURATORE ASSET */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm space-y-8">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                 <Calculator size={14} className="text-amber-500" /> Parametri Immobile
              </h4>
              
              <div className="space-y-6">
                 <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Rendita Catastale (€)</label>
                    <input 
                      type="number" value={renditaCatastale} 
                      onChange={(e) => setRenditaCatastale(Number(e.target.value))}
                      className="w-full bg-transparent font-black text-2xl outline-none text-slate-900" 
                    />
                 </div>

                 <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Valore di Mercato Stimato (€)</label>
                    <input 
                      type="number" value={marketValue} 
                      onChange={(e) => setMarketValue(Number(e.target.value))}
                      className="w-full bg-transparent font-black text-2xl outline-none text-slate-900" 
                    />
                 </div>

                 <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <label className="text-[10px] font-black text-slate-400 uppercase block mb-2">Grado di Parentela</label>
                    <select 
                       value={kinship} 
                       onChange={(e) => setKinship(e.target.value as any)}
                       className="w-full bg-transparent font-bold text-slate-800 outline-none"
                    >
                       {Object.entries(SUCCESSION_DATA.TAX_RATES).map(([k, v]) => (
                          <option key={k} value={k}>{v.label}</option>
                       ))}
                    </select>
                 </div>

                 <div className="bg-indigo-50 p-6 rounded-3xl border-2 border-indigo-100 space-y-4">
                    <div className="flex justify-between items-center">
                       <label className="text-[10px] font-black text-indigo-700 uppercase flex items-center gap-2">
                          <UserPlus size={14} /> Numero Eredi
                       </label>
                       <span className="text-sm font-black text-indigo-700">{numHeirs}</span>
                    </div>
                    <input 
                       type="range" min="1" max="5" step="1" 
                       value={numHeirs} 
                       onChange={(e) => setNumHeirs(Number(e.target.value))}
                       className="w-full h-1.5 bg-indigo-200 rounded-lg appearance-none accent-indigo-600" 
                    />
                    <p className="text-[9px] text-indigo-500 font-bold italic text-center">Ogni erede porta con sé la propria franchigia.</p>
                 </div>

                 <div className="flex items-center justify-between bg-amber-50 p-4 rounded-2xl border-2 border-amber-200">
                    <div className="flex items-center gap-2">
                       <Zap size={18} className="text-amber-600" />
                       <span className="text-sm font-black text-amber-900 uppercase">Agevolazione 1° Casa</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                       <input type="checkbox" checked={isPrimaCasa} onChange={(e) => setIsPrimaCasa(e.target.checked)} className="sr-only peer" />
                       <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                    </label>
                 </div>
              </div>
           </div>
        </div>

        {/* 3. REPORT DETTAGLIATO */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 flex items-center gap-4">
                 <ArrowDownToLine className="text-amber-500" /> Anatomia delle Imposte Successorie
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                 <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col justify-between group hover:bg-white hover:shadow-xl transition-all">
                    <div>
                       <p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Base Imponibile (Valore Catastale)</p>
                       <p className="text-3xl font-black text-slate-900">{formatCurrency(analysis.cadastralValue)}</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-200">
                       <p className="text-[9px] text-slate-500 font-bold leading-relaxed italic">
                         Rivalutata 5% × Moltiplicatore {isPrimaCasa ? '110' : '120'}
                       </p>
                    </div>
                 </div>

                 <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100 flex flex-col justify-between group hover:bg-white hover:shadow-xl transition-all">
                    <div>
                       <p className="text-[10px] font-black text-emerald-600 uppercase mb-1 tracking-widest">Franchigia Totale Applicata</p>
                       <p className="text-3xl font-black text-emerald-700">{formatCurrency(analysis.totalExemption)}</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-emerald-200">
                       <p className="text-[9px] text-emerald-600 font-bold uppercase">
                         Quota Esente Totale (Art. 2, Comma 48)
                       </p>
                    </div>
                 </div>
              </div>

              <div className="space-y-4">
                 <div className="p-5 bg-white border border-slate-100 rounded-3xl flex justify-between items-center shadow-sm">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-black text-xs">A</div>
                       <span className="text-sm font-black text-slate-700 uppercase">Imposta di Successione ({taxRules.rate * 100}%)</span>
                    </div>
                    <span className="font-black text-rose-600 text-lg">{formatCurrency(analysis.inheritanceTax)}</span>
                 </div>

                 <div className="p-5 bg-white border border-slate-100 rounded-3xl flex justify-between items-center shadow-sm">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-black text-xs">B</div>
                       <span className="text-sm font-black text-slate-700 uppercase">Imposta Ipotecaria {isPrimaCasa ? '(Fissa)' : '(2%)'}</span>
                    </div>
                    <span className="font-black text-indigo-600 text-lg">{formatCurrency(analysis.ipotecaria)}</span>
                 </div>

                 <div className="p-5 bg-white border border-slate-100 rounded-3xl flex justify-between items-center shadow-sm">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-black text-xs">C</div>
                       <span className="text-sm font-black text-slate-700 uppercase">Imposta Catastale {isPrimaCasa ? '(Fissa)' : '(1%)'}</span>
                    </div>
                    <span className="font-black text-indigo-600 text-lg">{formatCurrency(analysis.catastale)}</span>
                 </div>

                 <div className="p-8 bg-[#0a0f1d] rounded-[2.5rem] text-white flex justify-between items-center shadow-2xl mt-8">
                    <div>
                       <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">Totale Costo di Passaggio</p>
                       <p className="text-sm font-bold text-slate-400">Somma delle imposte dovute allo Stato</p>
                    </div>
                    <p className="text-4xl font-black text-white">{formatCurrency(analysis.totalCosts)}</p>
                 </div>
              </div>
           </div>

           <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center gap-10 border-t-8 border-amber-500">
              <div className="absolute -bottom-10 -right-10 opacity-5 rotate-12"><Landmark size={200} /></div>
              <div className="bg-amber-500 p-6 rounded-full text-slate-900 shrink-0 shadow-lg animate-pulse"><Zap size={32} /></div>
              <div className="space-y-4">
                 <h4 className="text-2xl font-black italic uppercase tracking-tighter text-amber-400 leading-tight">Advisor Strategy: <br/> Gestione del Rischio Liquidità</h4>
                 <p className="text-sm text-slate-300 leading-relaxed font-medium italic">
                    "Dottore, il problema degli immobili in successione non è solo la tassa (4%), ma le imposte Ipo-Catastali (3%) che sono **senza franchigia** e vanno pagate cash entro pochi mesi. Se gli eredi non hanno liquidità, sono costretti a svendere l'immobile o attingere a prestiti. Usiamo il Fondo Pensione per creare quella riserva di liquidità esentasse necessaria a liberare il suo patrimonio immobiliare per i figli."
                 </p>
              </div>
           </div>
        </div>
      </div>

      {/* 4. FOOTER EXECUTIVO */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="bg-[#0a0f1d] p-4 rounded-[1.5rem] text-white shadow-lg"><ScrollText size={32} /></div>
            <div>
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">Real Estate Legacy Certificate</p>
               <p className="text-xs text-slate-500 font-bold italic">Rif. Tecnico: Art. 12 D.Lgs 346/90 | Testo Unico Successioni | Aggiornamento Circolare 19/E 2024</p>
            </div>
         </div>
         <div className="text-right">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">DOCUMENTO AD USO ESCLUSIVO CONSULENTI GRUPPO VOMERO</p>
         </div>
      </div>

    </div>
  );
};

export default RealEstateSuccessionView;