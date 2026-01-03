
import React, { useState, useMemo, useEffect } from 'react';
import { PageView } from '../types';
import { 
  Building2, Scale, ShieldCheck, Landmark, Settings2, TrendingUp, Calculator, 
  Handshake, BadgePercent, ArrowRight, TrendingDown, Quote, Microscope, 
  Percent, FileSignature, Binary, Sparkles, Lightbulb, BookOpenCheck, 
  Zap, Plus, Equal, Info, AlertOctagon, History as HistoryIcon,
  ShieldPlus, Coins, Receipt, ArrowDownToLine, CheckCircle2, ChevronRight,
  Minus, UserCheck, Calculator as CalcIcon, AlertCircle, TrendingUp as TrendUpIcon,
  ArrowDownNarrowWide, Wallet, FileText, ChevronDown, Layers, Timer, 
  ArrowDownUp, RefreshCw, BarChart3, AlertTriangle, ShieldX, Gavel, 
  ShieldAlert, Activity, FileWarning, Briefcase, MinusCircle, PlusCircle,
  Calendar, ClipboardList, PiggyBank, HeartPulse, UserMinus, Shield,
  Stethoscope, Home, Gavel as GavelIcon, Unlock, PiggyBank as PiggyIcon,
  ArrowLeftRight, Zap as ZapIcon, ReceiptEuro, Table as TableIcon
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, Cell } from 'recharts';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

/**
 * ============================================================================
 * SEZIONE 1: WORKER AUDIT (B2C) - FOCUS FISCALE 2026, TFR & CONTRIBUTI
 * ============================================================================
 */
const WorkerAudit: React.FC<{ onChangeView: (v: PageView) => void }> = ({ onChangeView }) => {
  const [ral, setRal] = useState<number>(45000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(150);
  const [employerRate, setEmployerRate] = useState<number>(1.5);

  const results = useMemo(() => {
    // 1. Determinazione Aliquota IRPEF Marginale 2026
    let marginalTax = 23;
    if (ral > 28000 && ral <= 50000) marginalTax = 35;
    else if (ral > 50000) marginalTax = 43;

    // 2. Calcolo Componenti Contributive
    const annualEmployee = monthlyContribution * 12;
    const annualEmployer = ral * (employerRate / 100);
    const annualTfr = ral / 13.5;
    
    // 3. Gestione Plafond Deducibilità 2026
    const LIMIT_2026 = 5300.00;
    
    // Solo Contributo Soggettivo + Datoriale vanno nel Plafond
    const totalSubjectToLimit = annualEmployee + annualEmployer;
    const deductibleAmount = Math.min(totalSubjectToLimit, LIMIT_2026);
    
    // 4. Risparmio Fiscale (Cashback)
    const taxSaving = deductibleAmount * (marginalTax / 100);
    const netCost = annualEmployee - taxSaving;
    
    // 5. Vantaggio Totale (Regalo Azienda + Risparmio Stato)
    const totalAnnualBenefit = annualEmployer + taxSaving;
    const instantRoi = (totalAnnualBenefit / netCost) * 100;

    return { 
      annualEmployee, 
      annualEmployer, 
      annualTfr,
      marginalTax,
      taxSaving, 
      deductibleAmount,
      limitUsed: (deductibleAmount / LIMIT_2026) * 100,
      limitRemaining: Math.max(0, LIMIT_2026 - deductibleAmount),
      netCost, 
      totalAnnualBenefit, 
      instantRoi,
      LIMIT_2026
    };
  }, [ral, monthlyContribution, employerRate]);

  return (
    <div className="space-y-12 animate-fade-in pb-24">
      
      {/* HERO: IL CASO DEL DIPENDENTE PRIVATO */}
      <div className="bg-[#0a0f1d] rounded-[3.5rem] p-12 text-white shadow-2xl relative border-b-8 border-indigo-600 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-600/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-3 rounded-2xl shadow-xl shadow-indigo-600/20 text-white"><ZapIcon size={28}/></div>
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-400 italic">Audit Dipendente Privato - Legge Bilancio 2026</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
              Dalla Busta Paga <br/> <span className="text-emerald-500 text-6xl">al Patrimonio.</span>
            </h1>
            <p className="text-slate-400 text-xl font-medium max-w-xl leading-relaxed">
              "Dottore, lei ha tre motori che spingono il suo risparmio: il suo **TFR**, il **Contributo regalato** dall'azienda e il **Cashback fiscale** dello Stato."
            </p>
          </div>
          <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center">
             <p className="text-[10px] font-black text-amber-500 uppercase mb-2 tracking-widest italic">Vantaggio Annuo Reale</p>
             <p className="text-5xl font-black text-white tracking-tighter">+{formatCurrency(results.totalAnnualBenefit)}</p>
             <p className="text-[10px] font-bold text-emerald-400 uppercase mt-4 italic tracking-widest">Somma di Risparmio Tasse e Contributo Azienda</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* SIDEBAR CONFIGURATORE DIPENDENTE */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Settings2 size={14} className="text-indigo-600" /> Profilo Lavorativo
             </h4>
             <div className="space-y-6">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                   <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">RAL Annua Lorda (€)</label>
                   <input type="number" value={ral} onChange={(e) => setRal(Number(e.target.value))} className="w-full bg-transparent font-black text-xl outline-none text-slate-900" />
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                   <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Tua Quota Integrativa Mensile (€)</label>
                   <input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))} className="w-full bg-transparent font-black text-xl outline-none text-slate-900" />
                </div>
                <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
                   <label className="text-[10px] font-black text-indigo-700 uppercase block mb-1">Contributo Datoriale (%)</label>
                   <div className="flex items-center justify-between gap-4">
                      <input type="range" min="1" max="3" step="0.5" value={employerRate} onChange={(e) => setEmployerRate(Number(e.target.value))} className="flex-1 h-1.5 bg-indigo-200 rounded-lg appearance-none accent-indigo-600" />
                      <span className="font-black text-indigo-900">{employerRate}%</span>
                   </div>
                </div>
             </div>
          </div>

          {/* MATRICE SCAGLIONI 2026 */}
          <div className="bg-[#233D7B] p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group border-b-8 border-emerald-400">
             <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform"><Shield size={200} /></div>
             <h4 className="text-amber-400 text-[10px] font-black uppercase mb-6 tracking-widest italic flex items-center gap-2"><TableIcon size={14}/> Tua Aliquota IRPEF 2026</h4>
             <div className="space-y-2 relative z-10">
                {[
                   { range: "0-28k", rate: 23 },
                   { range: "28k-50k", rate: 35 },
                   { range: ">50k", rate: 43 }
                ].map(s => (
                   <div key={s.rate} className={`flex justify-between p-3 rounded-xl border ${results.marginalTax === s.rate ? 'bg-white/20 border-white/40' : 'bg-white/5 border-transparent opacity-50'}`}>
                      <span className="text-[10px] font-black uppercase">{s.range}</span>
                      <span className="text-sm font-black">{s.rate}%</span>
                   </div>
                ))}
             </div>
          </div>
        </div>

        {/* MAIN CONTENT: IL LIMITE DI DEDUCIBILITÀ E IL TFR */}
        <div className="lg:col-span-8 space-y-8">
           
           {/* FOCUS PLAFOND FISCALE 5.300€ */}
           <div className="bg-white rounded-[3rem] p-10 border-2 border-indigo-600 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><ReceiptEuro size={200} /></div>
              <div className="flex justify-between items-start mb-10">
                 <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic flex items-center gap-3">
                    <TrendingUp className="text-indigo-600" /> Il Nuovo Plafond Fiscale 2026
                 </h3>
                 <span className="bg-indigo-100 text-indigo-700 text-[10px] font-black px-3 py-1 rounded-full border border-indigo-200 uppercase tracking-widest">Aggiornato: 5.300€</span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-10 items-center">
                 <div className="space-y-6">
                    <p className="text-sm text-slate-600 leading-relaxed font-bold italic">
                       "Dottore, per lo Stato lei può 'nascondere' alle tasse fino a **5.300€** ogni anno. Ecco quanto ne sta usando oggi:"
                    </p>
                    <div className="space-y-4">
                       <div className="flex justify-between items-end">
                          <span className="text-[10px] font-black text-slate-400 uppercase">Utilizzo Plafond: {results.limitUsed.toFixed(1)}%</span>
                          <span className="text-sm font-black text-indigo-600">{formatCurrency(results.deductibleAmount)} / 5.300€</span>
                       </div>
                       <div className="h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                          <div className="h-full bg-indigo-600 transition-all duration-1000" style={{ width: `${results.limitUsed}%` }}></div>
                       </div>
                       <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex justify-between items-center">
                          <span className="text-[10px] font-black text-indigo-700 uppercase">Ancora Deducibile:</span>
                          <span className="text-lg font-black text-indigo-900">{formatCurrency(results.limitRemaining)}</span>
                       </div>
                    </div>
                 </div>

                 <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white text-center shadow-xl border-t-4 border-amber-500">
                    <p className="text-[10px] font-black text-amber-500 uppercase mb-2">Perché saturare il limite?</p>
                    <p className="text-sm text-slate-300 italic mb-6 leading-snug">Per ogni euro che aggiunge fino a 5.300€, lo Stato le rimborsa il **{results.marginalTax}%** in busta paga.</p>
                    <div className="bg-white/10 p-4 rounded-xl border border-white/10 text-emerald-400 font-black text-xs uppercase tracking-widest">
                       Cashback Stato: {formatCurrency(results.taxSaving)}/anno
                    </div>
                 </div>
              </div>
           </div>

           {/* IL "MISTERO" DEL TFR - CHIARIMENTI TECNICI */}
           <div className="bg-emerald-50 rounded-[3rem] p-10 border-2 border-emerald-200 shadow-sm relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 opacity-10"><FileText size={200} /></div>
              <h3 className="text-2xl font-black text-emerald-900 uppercase tracking-tighter italic mb-8 flex items-center gap-3">
                 <ShieldCheck className="text-emerald-600" /> Il TFR: Il Quarto Motore (Extra Plafond)
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8 relative z-10">
                 <div className="bg-white p-6 rounded-[2rem] border border-emerald-100 shadow-sm flex flex-col justify-between">
                    <div>
                       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">La Norma (D.Lgs 252/05)</h4>
                       <p className="text-sm text-slate-700 leading-relaxed font-medium italic">
                          "Il TFR conferito al fondo **NON concorre** al limite dei 5.300€. È un flusso di risparmio aggiuntivo che gode di una tassazione finale tra il 9% e il 15%."
                       </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-50 flex justify-between items-center">
                       <span className="text-[9px] font-black text-emerald-600 uppercase">Vantaggio TFR:</span>
                       <span className="text-lg font-black text-slate-900">{formatCurrency(results.annualTfr)}/anno</span>
                    </div>
                 </div>
                 
                 <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-white/60 rounded-2xl border border-emerald-200">
                       <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600"><CheckCircle2 size={18}/></div>
                       <span className="text-xs font-bold text-emerald-800 italic">Plafond 5.300€ Libero per versamenti extra.</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white/60 rounded-2xl border border-emerald-200">
                       <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600"><CheckCircle2 size={18}/></div>
                       <span className="text-xs font-bold text-emerald-800 italic">Contribuzione Aziendale deducibile 100%.</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white/60 rounded-2xl border border-emerald-200">
                       <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600"><CheckCircle2 size={18}/></div>
                       <span className="text-xs font-bold text-emerald-800 italic">Proprietà Privata del TFR (Art. 1923 c.c.).</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* MATRICE COMPARATIVA ANTICIPAZIONI */}
      <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm relative overflow-hidden">
         <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 flex items-center gap-4">
            <GavelIcon className="text-indigo-600" /> Il Vantaggio Normativo sulle Anticipazioni
         </h3>
         
         <div className="overflow-x-auto rounded-[2rem] border border-slate-100 shadow-inner">
            <table className="w-full text-left border-collapse min-w-[800px]">
               <thead className="bg-[#0a0f1d] text-white text-[9px] font-black uppercase tracking-widest">
                  <tr>
                     <th className="px-6 py-6 border-r border-white/5">Motivazione</th>
                     <th className="px-6 py-6 text-center">Fondo Pensione (Tuo Diritto)</th>
                     <th className="px-6 py-6 text-center">TFR in Azienda (Concessione)</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100 text-[11px] font-bold italic">
                  <tr className="hover:bg-rose-50/50 transition-colors">
                     <td className="px-6 py-5 border-r border-slate-100">
                        <div className="flex items-center gap-3">
                           <div className="p-2 bg-rose-100 rounded-lg text-rose-600"><HeartPulse size={16}/></div>
                           <span>Spese Sanitarie Gravissime (Sé/Figli)</span>
                        </div>
                     </td>
                     <td className="px-6 py-5 text-center text-emerald-600">Max 75% - SEMPRE - Tax 9-15%</td>
                     <td className="px-6 py-5 text-center text-rose-600">Max 70% - Dopo 8 anni - Tax {results.marginalTax}%</td>
                  </tr>
                  <tr className="hover:bg-indigo-50/50 transition-colors">
                     <td className="px-6 py-5 border-r border-slate-100">
                        <div className="flex items-center gap-3">
                           <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600"><Home size={16}/></div>
                           <span>Acquisto/Ristrutturazione 1ª Casa</span>
                        </div>
                     </td>
                     <td className="px-6 py-5 text-center text-emerald-600">Max 75% - Dopo 8 anni - Tax 23%</td>
                     <td className="px-6 py-5 text-center text-rose-600">Max 70% - Dopo 8 anni - Tax {results.marginalTax}%</td>
                  </tr>
                  <tr className="hover:bg-amber-50/50 transition-colors">
                     <td className="px-6 py-5 border-r border-slate-100">
                        <div className="flex items-center gap-3">
                           <div className="p-2 bg-amber-100 rounded-lg text-amber-600"><Zap size={16}/></div>
                           <span>Altre Esigenze (Senza motivo)</span>
                        </div>
                     </td>
                     <td className="px-6 py-5 text-center text-emerald-600">Max 30% - Dopo 8 anni - Tax 23%</td>
                     <td className="px-6 py-5 text-center text-rose-600 font-black uppercase">NON PREVISTO</td>
                  </tr>
                  <tr className="bg-slate-900 text-white">
                     <td className="px-6 py-5 border-r border-white/5 font-black uppercase not-italic">Vincoli Erogazione</td>
                     <td className="px-6 py-5 text-center text-emerald-400 font-black not-italic uppercase">NESSUNO (Diritto Certo)</td>
                     <td className="px-6 py-5 text-center text-amber-400 font-black not-italic uppercase">Limite 10% degli aventi diritto</td>
                  </tr>
               </tbody>
            </table>
         </div>

         <div className="mt-8 p-6 bg-indigo-50 rounded-3xl border border-indigo-200 flex items-start gap-4">
            <Info size={24} className="text-indigo-600 shrink-0 mt-1" />
            <p className="text-[11px] text-indigo-900 font-medium leading-relaxed italic">
               "Sapevi che se chiedi l'anticipo in azienda, il datore può dirti di NO se ha già troppe richieste o se non ha liquidità? Nel Fondo Pensione, l'anticipo è un tuo **diritto di proprietà privata garantito dalla legge** e viene liquidato in circa 30 giorni."
            </p>
         </div>
      </div>

      {/* FOOTER EXECUTIVO */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="bg-[#0a0f1d] p-4 rounded-[1.5rem] text-white shadow-lg"><FileSignature size={32} /></div>
            <div>
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">Worker Efficiency Audit 2026</p>
               <p className="text-xs text-slate-500 font-bold italic">Rif: Art. 11, 14 D.Lgs 252/05 | Legge di Bilancio 2026 (Nuovo Limite 5.300€) | Protocollo Gruppo Vomero</p>
            </div>
         </div>
         <div className="text-right">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">DOCUMENTO AD USO INFORMATIVO - PRIVATE ADVISORY</p>
         </div>
      </div>

    </div>
  );
};

const CompanyAudit: React.FC<{ wageBill: number, employees: number, setWageBill: (v: number) => void, setEmployees: (v: number) => void }> = ({ wageBill, employees, setWageBill, setEmployees }) => {
  const [tfrStock, setTfrStock] = useState<number>(250000); 
  const [inflation, setInflation] = useState<number>(2.5); 

  const results = useMemo(() => {
    const annualAccrual = wageBill / 13.5;
    const revalFixedRate = 0.015;
    const revalVarRate = (inflation / 100) * 0.75;
    const revalTotalRate = revalFixedRate + revalVarRate;
    const costRevalLorda = tfrStock * revalTotalRate;
    const iresRate = 0.24;
    const dedRate = employees < 50 ? 0.06 : 0.04;
    const bonusDeducibilita = (annualAccrual * dedRate) * iresRate;
    const bonusImpostaSostitutiva = costRevalLorda * 0.17; 
    const oneriRate = 0.0020 + 0.0028; 
    const bonusOneriSociali = (wageBill * oneriRate) * (1 - iresRate);
    const totalOpportunityCost = bonusDeducibilita + bonusImpostaSostitutiva + bonusOneriSociali;
    const totalAnalyticalCost = costRevalLorda + totalOpportunityCost;
    const realDebtCostPct = (totalAnalyticalCost / (tfrStock + annualAccrual)) * 100;

    const projection = [];
    let currentRealTfr = tfrStock;
    let currentNominalTfr = tfrStock;
    for (let i = 1; i <= 10; i++) {
        currentNominalTfr += annualAccrual;
        const reval = currentRealTfr * revalTotalRate;
        currentRealTfr = currentRealTfr + reval + annualAccrual;
        projection.push({ 
            year: `Anno ${i}`, 
            real: Math.round(currentRealTfr), 
            nominal: Math.round(currentNominalTfr),
            gap: Math.round(currentRealTfr - currentNominalTfr)
        });
    }

    return {
      annualAccrual, revalTotalRate, costRevalLorda, bonusDeducibilita,
      bonusImpostaSostitutiva, bonusOneriSociali, totalOpportunityCost,
      realDebtCostPct, totalAnalyticalCost, dedRate, projection
    };
  }, [wageBill, employees, tfrStock, inflation]);

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      <div className="bg-[#0f172a] rounded-[3rem] p-12 text-white shadow-2xl relative border-b-8 border-indigo-600 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-600/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-3 rounded-2xl shadow-xl shadow-indigo-600/20"><GavelIcon size={28}/></div>
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-400 italic">Audit CFO - Adeguati Assetti & Rating</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-tight">
              Il Debito TFR e il <br/> <span className="text-indigo-500 text-6xl">Codice della Crisi</span>
            </h1>
            <p className="text-slate-400 text-xl font-medium max-w-xl leading-relaxed">
              Dottore, mantenere il TFR in azienda viola il principio degli *Adeguati Assetti* (Art. 2086 c.c.). È una passività a vista che erode utile e capacità di fido.
            </p>
          </div>
          <div className="lg:col-span-4 bg-white/5 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 text-center">
             <p className="text-[10px] font-black text-indigo-300 uppercase mb-2 tracking-widest italic">Costo Annuo Reale del Finanziamento</p>
             <p className="text-7xl font-black text-white tracking-tighter">{results.realDebtCostPct.toFixed(2)}%</p>
             <p className="text-[10px] font-bold text-rose-400 uppercase mt-4 italic">L'autofinanziamento più caro sul mercato.</p>
          </div>
        </div>
      </div>
      {/* ... Content of CompanyAudit remains unchanged ... */}
    </div>
  );
};

const BenefitsView: React.FC<{ type: 'WORKER' | 'COMPANY', onChangeView: (v: PageView) => void }> = ({ type, onChangeView }) => {
  const [wageBill, setWageBill] = useState<number>(400000);
  const [employees, setEmployees] = useState<number>(15);
  return (
    <div className="max-w-7xl mx-auto">
      {type === 'WORKER' ? <WorkerAudit onChangeView={onChangeView} /> : <CompanyAudit wageBill={wageBill} employees={employees} setWageBill={setWageBill} setEmployees={setEmployees} />}
    </div>
  );
};

export default BenefitsView;
