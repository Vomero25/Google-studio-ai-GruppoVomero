
import React, { useState, useMemo } from 'react';
import { PENSION_COEFFICIENTS } from '../constants';
import { 
  Calculator, Scale, ShieldCheck, Info, 
  Settings2, TrendingUp, Coins, Percent, 
  ArrowDownToLine, CheckCircle2, Gavel, 
  Wallet, Sparkles, Timer, ArrowDown, 
  Receipt, TrendingUp as TrendingUpIcon, 
  FileSignature, Lightbulb, Microscope, 
  LineChart as LineChartIcon, Layers, 
  ArrowDownUp, Calculator as CalcIcon,
  Plus, Minus, ArrowRight, Table as TableIcon,
  ShieldPlus, AlertCircle
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar } from 'recharts';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

const FiscalCalculatorView: React.FC = () => {
  // --- STATI INPUT ANALITICI ---
  const [totalInvested, setTotalInvested] = useState<number>(200000); // Totale versato (Capitale)
  const [estimatedReturns, setEstimatedReturns] = useState<number>(80000); // Rivalutazione maturata
  const [nonDeducted, setNonDeducted] = useState<number>(10000); // Quote non dedotte (es. forfettari o extra-soglia)
  const [ageAtExit, setAgeAtExit] = useState<number>(67);
  const [seniorityInFund, setSeniorityInFund] = useState<number>(35); 

  // --- MOTORE DI CALCOLO INGEGNERISTICO ---
  const results = useMemo(() => {
    const totalMontante = totalInvested + estimatedReturns;
    
    // 1. COEFFICIENTE DI TRASFORMAZIONE (D.M. 19/12/2022)
    const coeffData = PENSION_COEFFICIENTS.FULL_DM_TABLE_2025.find(c => c.age === ageAtExit) || PENSION_COEFFICIENTS.FULL_DM_TABLE_2025[10];
    const transformationCoeff = coeffData.coeff;

    // 2. RENDITA LORDA ANNUALE (13 MENSILITÀ)
    const grossAnnuityAnnual = totalMontante * (transformationCoeff / 100);
    const grossMonthly = grossAnnuityAnnual / 13;

    // 3. DETERMINAZIONE BASE IMPONIBILE (Art. 11 D.Lgs 252/05)
    // Non si tassano i RENDIMENTI (già tassati al 20%) e i NON DEDOTTI (già tassati IRPEF)
    const totalExemptPortion = estimatedReturns + nonDeducted;
    const taxableAmountTotal = Math.max(0, totalMontante - totalExemptPortion);
    const taxableRatio = taxableAmountTotal / totalMontante;

    // 4. ALIQUOTA AGEVOLATA
    const extraYears = Math.max(0, seniorityInFund - 15);
    const exitTaxRate = Math.max(9, 15 - (extraYears * 0.3));

    // 5. CALCOLO TASSAZIONE SU RENDITA MENSILE
    const monthlyTaxableBase = grossMonthly * taxableRatio;
    const monthlyTax = monthlyTaxableBase * (exitTaxRate / 100);
    const netMonthly = grossMonthly - monthlyTax;

    // 6. ANALISI SENSIBILITÀ (Età 57-71)
    const sensitivityData = PENSION_COEFFICIENTS.FULL_DM_TABLE_2025.map(c => {
        const gAnnual = totalMontante * (c.coeff / 100);
        const gMonthly = gAnnual / 13;
        const mTax = (gMonthly * taxableRatio) * (exitTaxRate / 100);
        return {
            eta: c.age,
            lordo: Math.round(gMonthly),
            netto: Math.round(gMonthly - mTax),
            gain: Math.round((gMonthly - mTax) - netMonthly)
        };
    });

    return {
      totalMontante,
      taxableRatio,
      exemptRatio: 1 - taxableRatio,
      exitTaxRate,
      grossMonthly,
      netMonthly,
      monthlyTax,
      totalExemptPortion,
      transformationCoeff,
      sensitivityData
    };
  }, [totalInvested, estimatedReturns, nonDeducted, ageAtExit, seniorityInFund]);

  const compositionData = [
    { name: 'Base Imponibile (Contributi Dedotti)', value: results.taxableRatio, color: '#4f46e5' },
    { name: 'Quota Esente (Rendimenti + Non Dedotti)', value: results.exemptRatio, color: '#10b981' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-24">
      
      {/* HEADER EXECUTIVE */}
      <div className="bg-[#0a0f1d] rounded-[3.5rem] p-12 text-white shadow-2xl relative border-b-8 border-indigo-600 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-600/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-indigo-600 p-3 rounded-2xl shadow-xl shadow-indigo-600/20"><Microscope size={32} /></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-400 italic">Financial Engineering Audit - Gruppo Vomero</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                Ingegneria della <br/> <span className="text-emerald-400">Rendita Netta</span>
              </h1>
              <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
                "Dottore, il suo fondo pensione è una **fabbrica di reddito efficiente**. Non tassiamo tutto il montante, ma solo ciò su cui non ha ancora pagato le tasse."
              </p>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center relative group">
              <p className="text-[10px] font-black uppercase text-amber-400 mb-2 tracking-widest italic">Netto Mensile Stimato</p>
              <p className="text-6xl font-black text-white tracking-tighter">{formatCurrency(results.netMonthly)}</p>
              <div className="mt-4 flex justify-center gap-3">
                 <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-6 py-2 rounded-full border border-emerald-500/30 uppercase tracking-widest italic">Aliquota: {results.exitTaxRate.toFixed(1)}%</span>
              </div>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* SIDEBAR CONFIGURATORE - CHIARO E ANALITICO */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm space-y-8">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Settings2 size={14} className="text-indigo-600" /> Asset & Timing Setup
             </h4>
             <div className="space-y-6">
                <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                   <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Capitale Versato (€)</label>
                   <input type="number" value={totalInvested} onChange={(e) => setTotalInvested(Number(e.target.value))} className="w-full bg-transparent font-black text-2xl outline-none text-slate-900" />
                   <p className="text-[9px] text-slate-400 mt-1 font-bold italic uppercase tracking-tighter">Somma flussi: TFR + Individuale + Aziendale</p>
                </div>

                <div className="bg-emerald-50 p-5 rounded-3xl border border-emerald-100">
                   <label className="text-[10px] font-black text-emerald-700 uppercase block mb-1">Rivalutazione / Rendimenti (€)</label>
                   <input type="number" value={estimatedReturns} onChange={(e) => setEstimatedReturns(Number(e.target.value))} className="w-full bg-transparent font-black text-2xl outline-none text-emerald-900" />
                   <p className="text-[9px] text-emerald-600 mt-1 font-bold italic uppercase tracking-tighter">Quota ESENTE da tassazione finale</p>
                </div>

                <div className="bg-amber-50 p-5 rounded-3xl border border-amber-100">
                   <label className="text-[10px] font-black text-amber-700 uppercase block mb-1">Di cui NON DEDOTTI (€)</label>
                   <input type="number" value={nonDeducted} onChange={(e) => setNonDeducted(Number(e.target.value))} className="w-full bg-transparent font-black text-2xl outline-none text-amber-900" />
                   <p className="text-[9px] text-amber-600 mt-1 font-bold italic uppercase tracking-tighter">Versamenti su cui ha già pagato IRPEF</p>
                </div>

                <div className="bg-indigo-50 p-5 rounded-3xl border border-indigo-100">
                   <div className="flex justify-between items-center mb-1">
                      <label className="text-[10px] font-black text-indigo-700 uppercase">Età Pensionamento</label>
                      <span className="text-lg font-black text-indigo-900">{ageAtExit} Anni</span>
                   </div>
                   <input type="range" min="57" max="71" value={ageAtExit} onChange={(e) => setAgeAtExit(Number(e.target.value))} className="w-full h-2 bg-indigo-200 rounded-lg appearance-none accent-indigo-600" />
                   <p className="text-[9px] text-indigo-500 font-bold mt-2 uppercase italic flex justify-between">
                     <span>Coefficiente INPS:</span>
                     <span>{results.transformationCoeff.toFixed(3)}%</span>
                   </p>
                </div>

                <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                   <div className="flex justify-between items-center mb-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase">Anzianità nel Fondo</label>
                      <span className="text-sm font-black text-slate-900">{seniorityInFund} Anni</span>
                   </div>
                   <input type="range" min="1" max="50" value={seniorityInFund} onChange={(e) => setSeniorityInFund(Number(e.target.value))} className="w-full h-1.5 bg-indigo-200 rounded-lg appearance-none accent-indigo-600" />
                </div>
             </div>
          </div>
        </div>

        {/* CONTENUTO ANALITICO - IL "REPORT" PER L'ADERENTE */}
        <div className="lg:col-span-8 space-y-8">
           
           {/* BOX 1: ESITO RENDITA & BASE IMPONIBILE */}
           <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm relative overflow-hidden">
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 flex items-center gap-3">
                 <ArrowDownToLine className="text-indigo-600" /> Diagnosi della Rendita Netta
              </h3>
              
              <div className="grid md:grid-cols-2 gap-10 items-center">
                 <div className="space-y-6">
                    <div className="p-6 bg-slate-900 rounded-[2.5rem] text-white">
                       <p className="text-[10px] font-black text-amber-500 uppercase mb-2 tracking-widest">Montante Lordo Accumulato</p>
                       <p className="text-5xl font-black tracking-tighter">{formatCurrency(results.totalMontante)}</p>
                       <div className="mt-4 pt-4 border-t border-white/10 flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                          <span>Versato: {formatCurrency(totalInvested)}</span>
                          <span>Rend.: {formatCurrency(estimatedReturns)}</span>
                       </div>
                    </div>
                    
                    <div className="p-6 bg-emerald-50 rounded-[2.5rem] border-2 border-emerald-500 flex justify-between items-center shadow-lg">
                       <div>
                          <p className="text-[10px] font-black text-emerald-600 uppercase mb-1">Netto Reale Mensile</p>
                          <p className="text-4xl font-black text-emerald-700">{formatCurrency(results.netMonthly)}</p>
                       </div>
                       <div className="text-right">
                          <p className="text-[10px] font-black text-rose-500 uppercase">Impatto Fiscale</p>
                          <p className="text-lg font-black text-rose-600">-{formatCurrency(results.monthlyTax)}</p>
                       </div>
                    </div>
                 </div>

                 <div className="flex flex-col items-center">
                    <div className="h-64 w-full">
                       <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                             <Pie data={compositionData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value" strokeWidth={0}>
                                {compositionData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                             </Pie>
                             <Tooltip contentStyle={{borderRadius: '20px', border: 'none'}} formatter={(val: number) => `${(val*100).toFixed(1)}%`} />
                          </PieChart>
                       </ResponsiveContainer>
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Struttura della Rendita</p>
                 </div>
              </div>
           </div>

           {/* BOX 2: ANALISI SENSIBILITÀ ETÀ (NUOVO) */}
           <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm relative overflow-hidden">
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 flex items-center gap-3 leading-none">
                 <LineChartIcon className="text-indigo-600" /> Sensibilità Rendita: <br/> <span className="text-sm font-bold text-slate-400">Quanto guadagno aspettando?</span>
              </h3>
              
              <div className="h-[350px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={results.sensitivityData}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis dataKey="eta" tick={{fontSize: 10, fontWeight: '900'}} axisLine={false} tickLine={false} />
                       <YAxis tickFormatter={(v) => `€${v}`} tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                       <Tooltip contentStyle={{borderRadius: '24px', border: 'none'}} />
                       <Line type="monotone" dataKey="netto" stroke="#10b981" strokeWidth={5} dot={{ r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} name="Netto Mensile" />
                       <Line type="monotone" dataKey="lordo" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Lordo Mensile" />
                    </LineChart>
                 </ResponsiveContainer>
              </div>

              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                 {results.sensitivityData.filter(d => [60, 64, 67, 70].includes(d.eta)).map(d => (
                    <div key={d.eta} className={`p-4 rounded-3xl border ${d.eta === ageAtExit ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-slate-50 border-slate-100'}`}>
                       <p className="text-[10px] font-black uppercase opacity-70">Età {d.eta}</p>
                       <p className="text-lg font-black">{formatCurrency(d.netto)}</p>
                       <p className="text-[9px] font-bold italic mt-1">{d.gain > 0 ? `+${formatCurrency(d.gain)}` : d.gain < 0 ? `${formatCurrency(d.gain)}` : 'Target'}</p>
                    </div>
                 ))}
              </div>
           </div>

           {/* BOX 3: IL PRINCIPIO DI DEPURAZIONE (ART. 11) */}
           <div className="bg-[#0f172a] p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden border-t-8 border-emerald-500">
              <div className="absolute top-0 right-0 p-10 opacity-5"><Gavel size={250} /></div>
              <h3 className="text-xl font-black italic uppercase tracking-tighter text-indigo-400 mb-8 flex items-center gap-3">
                 <ShieldCheck className="text-emerald-400" /> Il Principio di Depurazione Fiscale
              </h3>
              
              <div className="grid md:grid-cols-2 gap-10 relative z-10">
                 <div className="space-y-6">
                    <p className="text-sm text-slate-400 leading-relaxed font-medium italic">
                       "Dottore, il vantaggio competitivo del fondo pensione è che lo Stato riconosce che una parte della rendita è **già stata tassata**. Pertanto, la base imponibile viene depurata."
                    </p>
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                       <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-400">Rendimenti Esenti:</span>
                          <span className="text-emerald-400 font-black">{formatCurrency(estimatedReturns)}</span>
                       </div>
                       <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-400">Contributi Non Dedotti:</span>
                          <span className="text-emerald-400 font-black">{formatCurrency(nonDeducted)}</span>
                       </div>
                       <div className="pt-3 border-t border-white/10 flex justify-between items-center text-sm font-black text-amber-500">
                          <span>Totale DEPURATO:</span>
                          <span>{formatCurrency(results.totalExemptPortion)}</span>
                       </div>
                    </div>
                 </div>

                 <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 text-center flex flex-col justify-center">
                    <p className="text-[10px] font-black uppercase text-indigo-300 mb-2 tracking-widest italic">Base Imponibile Reale</p>
                    <p className="text-6xl font-black text-white tracking-tighter">{(results.taxableRatio * 100).toFixed(1)}%</p>
                    <p className="text-sm text-slate-400 mt-4 italic">Solo su questa quota lei paga le tasse. Sulla pensione pubblica pagherebbe il 100%.</p>
                 </div>
              </div>
           </div>

        </div>
      </div>

      {/* FOOTER METODOLOGICO */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="bg-[#0f172a] p-4 rounded-[1.5rem] text-white shadow-lg"><FileSignature size={32} /></div>
            <div>
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">Fiscal Intelligence Audit 2026</p>
               <p className="text-[10px] text-slate-500 font-bold italic">Rif. Tecnico: Art. 11 D.Lgs 252/05 | D.M. 01/12/2022 (Coeff. Stato). <br/> Simulazione basata su scomposizione analitica del montante.</p>
            </div>
         </div>
         <div className="text-right">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">RELAZIONE AD USO ESCLUSIVO CONSULENTI GRUPPO VOMERO</p>
         </div>
      </div>

    </div>
  );
};

export default FiscalCalculatorView;
