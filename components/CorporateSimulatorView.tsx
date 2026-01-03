
import React, { useState, useMemo } from 'react';
import { COMPANY_BENCHMARKS, HISTORICAL_DATA_20Y } from '../constants';
import { fetchHistoricalReturns } from '../services/geminiService';
import { 
  Factory, TrendingDown, TrendingUp, Scale, 
  CheckCircle2, ShieldAlert, Landmark, History, 
  Table as TableIcon, Activity, 
  Settings2, Users, Wallet, Search, Loader2, Sparkles, AlertCircle,
  BarChart3, Globe, ShieldCheck, ArrowRight, ExternalLink, X, Info,
  Link as LinkIcon, CalendarDays, Percent, Microscope, ArrowUpRight, Signal,
  Eye, EyeOff, FileCheck, Globe2, Zap
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

const CorporateSimulatorView: React.FC = () => {
  // --- STATI INPUT STANDARD ---
  const [initialStock, setInitialStock] = useState<number>(100000);
  const [numEmployees, setNumEmployees] = useState<number>(10);
  const [avgSalary, setAvgSalary] = useState<number>(35000);
  const [salaryGrowth, setSalaryGrowth] = useState<number>(2.0); 
  const [selectedBenchmarkId, setSelectedBenchmarkId] = useState<string>('jpmGlobal');

  // --- STATI VISIBILITÀ GRAFICO ---
  const [visibleSeries, setVisibleSeries] = useState({
    asset: true,
    debt: true,
    nominal: true
  });

  // --- STATI PERIODO PERSONALIZZATO ---
  const availableYears = HISTORICAL_DATA_20Y.map(d => d.year);
  const [startYear, setStartYear] = useState<number>(2000);
  const [endYear, setEndYear] = useState<number>(2024);

  // --- STATI RICERCA PERSONALIZZATA ---
  const [customSearch, setCustomSearch] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [customReturns, setCustomReturns] = useState<Record<number, number> | null>(null);
  const [customSources, setCustomSources] = useState<Array<{title: string, uri: string}>>([]);
  const [customLabel, setCustomLabel] = useState<string>('');

  const selectedBenchmark = COMPANY_BENCHMARKS.find(b => b.id === selectedBenchmarkId) || COMPANY_BENCHMARKS[0];

  // --- FUNZIONE DI RICERCA AI ---
  const handleSearchCustomIndex = async () => {
    if (!customSearch.trim()) return;
    setIsSearching(true);
    setCustomSources([]);
    try {
      const response = await fetchHistoricalReturns(customSearch);
      setCustomReturns(response.data);
      setCustomSources(response.sources);
      setCustomLabel(customSearch.toUpperCase());
    } catch (err) {
      alert("Errore nel recupero dei dati. Riprova con un altro ISIN o Nome.");
    } finally {
      setIsSearching(false);
    }
  };

  // --- MOTORE DI ANALISI STORICA FILTRATA ---
  const historicalAnalysis = useMemo(() => {
    let currentDebt = initialStock;
    let currentAsset = initialStock;
    let currentNominal = initialStock;
    let currentSalary = avgSalary; 
    
    const filteredSource = HISTORICAL_DATA_20Y.filter(d => d.year >= startYear && d.year <= endYear);
    
    return filteredSource.map(point => {
      const yearlyAccrual = (numEmployees * currentSalary) / 13.5;
      
      // Calcolo TFR (L. 297/82)
      const tfrReval = currentDebt * (point.tfrRate / 100);
      currentDebt = currentDebt + tfrReval + yearlyAccrual;
      
      // Calcolo Mercato
      let mktPerf = point[selectedBenchmarkId as keyof typeof point] as number;
      if (customReturns) {
        mktPerf = customReturns[point.year] || mktPerf;
      }
      
      const assetReturn = currentAsset * (mktPerf / 100);
      currentAsset = currentAsset + assetReturn + yearlyAccrual;
      
      currentNominal = currentNominal + yearlyAccrual;

      const yearlyDelta = assetReturn - tfrReval;
      
      const currentResult = {
        ...point,
        currentSalary: Math.round(currentSalary),
        yearlyAccrual: Math.round(yearlyAccrual),
        mktPerf: mktPerf,
        debt: Math.round(currentDebt),
        asset: Math.round(currentAsset),
        nominal: Math.round(currentNominal),
        yearlyDelta: Math.round(yearlyDelta),
        opportunityCost: Math.round(currentAsset - currentDebt)
      };

      currentSalary = currentSalary * (1 + salaryGrowth / 100);
      return currentResult;
    });
  }, [initialStock, numEmployees, avgSalary, salaryGrowth, selectedBenchmarkId, startYear, endYear, customReturns]);

  const finalPoint = historicalAnalysis[historicalAnalysis.length - 1];

  const toggleVisibility = (key: keyof typeof visibleSeries) => {
    setVisibleSeries(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-20">
      
      {/* HEADER EXECUTIVE */}
      <div className="bg-[#0f172a] rounded-[3rem] p-10 text-white shadow-xl relative overflow-hidden border-b-8 border-indigo-600">
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg"><Factory size={28}/></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400">Corporate Wealth Analytics - Audit Strategico</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">
                Audit del <br/> <span className="text-indigo-500">Patrimonio Aziendale</span>
              </h1>
              <p className="text-slate-400 text-xl font-medium max-w-xl">
                Dottore, analizziamo l'impatto degli eventi macroeconomici degli ultimi 25 anni sul TFR rimasto in azienda.
              </p>
           </div>
           <div className="lg:col-span-5 bg-white/5 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/10 text-center relative overflow-hidden">
              <p className="text-[11px] font-black uppercase text-indigo-300 mb-2 tracking-widest">Efficienza Patrimoniale Mancata</p>
              <p className={`text-7xl font-black tracking-tighter ${finalPoint?.opportunityCost > 0 ? 'text-emerald-400' : 'text-rose-500'}`}>
                {formatCurrency(finalPoint?.opportunityCost || 0)}
              </p>
              <div className="mt-6 flex justify-center gap-3">
                 <span className="bg-indigo-500/20 text-indigo-400 text-[10px] font-black px-4 py-1.5 rounded-full border border-indigo-500/30 uppercase tracking-widest italic">Gap di Tesoreria Certificato</span>
              </div>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* SIDEBAR INPUTS */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm space-y-8">
             <div className="space-y-6">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <Settings2 size={14} className="text-indigo-600" /> Configurazione Audit
                </h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <p className="text-[9px] font-black text-slate-500 mb-1 uppercase flex items-center gap-1"><CalendarDays size={10}/> Dal</p>
                    <select value={startYear} onChange={(e) => setStartYear(Number(e.target.value))} className="w-full bg-transparent font-black text-sm outline-none text-slate-900">
                      {availableYears.filter(y => y <= endYear).map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <p className="text-[9px] font-black text-slate-500 mb-1 uppercase flex items-center gap-1"><CalendarDays size={10}/> Al</p>
                    <select value={endYear} onChange={(e) => setEndYear(Number(e.target.value))} className="w-full bg-transparent font-black text-sm outline-none text-slate-900">
                      {availableYears.filter(y => y >= startYear).map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                   <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-black text-slate-500 mb-1 uppercase">Stock TFR di Apertura (€)</p>
                      <input type="number" value={initialStock} onChange={(e) => setInitialStock(Number(e.target.value))} className="w-full bg-transparent font-black text-2xl outline-none text-slate-900" />
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <p className="text-[10px] font-black text-slate-500 mb-1 uppercase">N. Dipendenti</p>
                        <input type="number" value={numEmployees} onChange={(e) => setNumEmployees(Number(e.target.value))} className="w-full bg-transparent font-black text-xl outline-none text-slate-900" />
                      </div>
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <p className="text-[10px] font-black text-slate-500 mb-1 uppercase">RAL Media (€)</p>
                        <input type="number" value={avgSalary} onChange={(e) => setAvgSalary(Number(e.target.value))} className="w-full bg-transparent font-black text-xl outline-none text-slate-900" />
                      </div>
                   </div>

                   <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
                      <div className="flex justify-between items-center mb-2">
                         <p className="text-[10px] font-black text-indigo-600 uppercase flex items-center gap-1">
                            <TrendingUp size={12}/> Dinamica RAL (%)
                         </p>
                         <span className="text-sm font-black text-indigo-700">{salaryGrowth}%</span>
                      </div>
                      <input 
                        type="range" min="0" max="6" step="0.5" 
                        value={salaryGrowth} 
                        onChange={(e) => setSalaryGrowth(Number(e.target.value))} 
                        className="w-full h-1.5 bg-indigo-200 rounded-lg appearance-none accent-indigo-600" 
                      />
                   </div>
                </div>
             </div>

             {/* RICERCA ISIN CERTIFICATA AI */}
             <div className="pt-6 border-t border-slate-100 space-y-4">
                <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                   <Sparkles size={14} /> Intelligence Certificata (ISIN)
                </h4>
                <div className="relative">
                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                   <input 
                      type="text" 
                      placeholder="Compara con ISIN o Fondo..." 
                      value={customSearch}
                      onChange={(e) => setCustomSearch(e.target.value)}
                      className="w-full pl-11 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-indigo-500 transition-all font-bold text-sm"
                   />
                </div>
                <button 
                  onClick={handleSearchCustomIndex}
                  disabled={isSearching || !customSearch}
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-indigo-600 disabled:bg-slate-200 transition-all flex justify-center items-center gap-3"
                >
                  {isSearching ? <Loader2 className="animate-spin" size={18} /> : <Globe size={18} />}
                  Valida Dati Web
                </button>
             </div>
          </div>
        </div>

        {/* GRAFICO AUDIT POTENZIATO CON TOGGLE E EVENTI MACRO */}
        <div className="lg:col-span-8 space-y-6">
           <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm relative overflow-hidden flex flex-col h-full">
              
              {/* INTERFACCIA DI CONTROLLO SERIE GRAFICO */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                 <div>
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Analisi Patrimoniale Dinamica</h3>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">Visualizza l'impatto degli eventi storici</p>
                 </div>
                 
                 {/* CONTROLLER VISIBILITÀ */}
                 <div className="flex flex-wrap gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-100 shadow-inner">
                    <button 
                       onClick={() => toggleVisibility('asset')}
                       className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase transition-all ${visibleSeries.asset ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-400 border border-slate-200'}`}
                    >
                       {visibleSeries.asset ? <Eye size={12} /> : <EyeOff size={12} />} Patrimonio
                    </button>
                    <button 
                       onClick={() => toggleVisibility('debt')}
                       className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase transition-all ${visibleSeries.debt ? 'bg-rose-600 text-white shadow-md' : 'bg-white text-slate-400 border border-slate-200'}`}
                    >
                       {visibleSeries.debt ? <Eye size={12} /> : <EyeOff size={12} />} Debito TFR
                    </button>
                    <button 
                       onClick={() => toggleVisibility('nominal')}
                       className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase transition-all ${visibleSeries.nominal ? 'bg-slate-700 text-white shadow-md' : 'bg-white text-slate-400 border border-slate-200'}`}
                    >
                       {visibleSeries.nominal ? <Eye size={12} /> : <EyeOff size={12} />} Nominale
                    </button>
                 </div>
              </div>
              
              <div className="flex-1 h-[450px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={historicalAnalysis}>
                       <defs>
                          <linearGradient id="colorAsset" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                             <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorDebt" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1}/>
                             <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                       <YAxis tickFormatter={(v) => `€${(v/1000).toFixed(0)}k`} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                       <Tooltip 
                          contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} 
                          content={({ active, payload, label }) => {
                             if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                   <div className="bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 min-w-[240px]">
                                      <div className="flex justify-between items-center mb-4">
                                         <p className="text-xl font-black text-slate-900">{label}</p>
                                         <span className="bg-amber-100 text-amber-700 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">Market Intelligence</span>
                                      </div>
                                      <div className="bg-slate-50 p-3 rounded-2xl mb-4 border border-slate-100">
                                         <p className="text-[10px] font-black text-indigo-600 uppercase mb-1">Scenario Macro</p>
                                         <p className="text-xs font-bold text-slate-700 leading-tight italic">"{data.event}"</p>
                                      </div>
                                      <div className="space-y-2">
                                         {payload.map((entry: any, index: number) => (
                                            <div key={index} className="flex justify-between items-center">
                                               <div className="flex items-center gap-2">
                                                  <div className="w-2 h-2 rounded-full" style={{backgroundColor: entry.color}}></div>
                                                  <span className="text-[10px] font-bold text-slate-500 uppercase">{entry.name}</span>
                                               </div>
                                               <span className="text-xs font-black text-slate-900">{formatCurrency(entry.value)}</span>
                                            </div>
                                         ))}
                                      </div>
                                   </div>
                                );
                             }
                             return null;
                          }}
                       />
                       <Area 
                          type="monotone" 
                          dataKey="asset" 
                          stroke="#6366f1" 
                          strokeWidth={5} 
                          fill="url(#colorAsset)" 
                          name={customLabel || selectedBenchmark.name} 
                          hide={!visibleSeries.asset}
                       />
                       <Area 
                          type="monotone" 
                          dataKey="debt" 
                          stroke="#f43f5e" 
                          strokeWidth={3} 
                          fill="url(#colorDebt)" 
                          name="Passività TFR (L. 297)" 
                          strokeDasharray="10 5"
                          hide={!visibleSeries.debt}
                       />
                       <Area 
                          type="monotone" 
                          dataKey="nominal" 
                          stroke="#94a3b8" 
                          fill="none" 
                          strokeDasharray="4 4" 
                          strokeWidth={2} 
                          name="Versato Nominale" 
                          hide={!visibleSeries.nominal}
                       />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>

              {/* EVIDENCE PANEL FONT CERTIFICATE */}
              {customSources.length > 0 && (
                 <div className="mt-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 animate-fade-in">
                    <p className="text-[10px] font-black text-emerald-800 uppercase mb-3 flex items-center gap-2">
                       <FileCheck size={14} /> Fonti Certificate Grounding AI:
                    </p>
                    <div className="flex flex-wrap gap-2">
                       {customSources.map((s, i) => (
                          <a key={i} href={s.uri} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-[9px] font-bold text-indigo-700 bg-white px-3 py-1.5 rounded-full border border-indigo-100 hover:shadow-sm transition-all">
                             <LinkIcon size={10} /> {s.title.substring(0, 30)}... <ExternalLink size={10} />
                          </a>
                       ))}
                    </div>
                 </div>
              )}
           </div>
        </div>
      </div>

      {/* REGISTRO STORICO POTENZIATO CON INFO MACROECONOMETRICHE */}
      <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm relative overflow-hidden">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic flex items-center gap-3">
               <Globe2 className="text-indigo-600" /> Registro Macroeconomico & Audit TFR
            </h3>
            <div className="flex gap-3">
               <div className="bg-slate-100 px-4 py-2 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Serie Storica ISTAT / BCE
               </div>
            </div>
         </div>
         
         <div className="overflow-x-auto rounded-[2rem] border border-slate-100 shadow-inner">
            <table className="w-full text-left border-collapse min-w-[1100px]">
               <thead className="bg-[#0f172a] text-white text-[9px] font-black uppercase tracking-widest">
                  <tr>
                     <th className="px-4 py-6 sticky left-0 bg-[#0f172a] z-10 border-r border-white/10">Anno</th>
                     <th className="px-4 py-6">Scenario Macro</th>
                     <th className="px-4 py-6 text-center text-amber-300">Inf. ISTAT %</th>
                     <th className="px-4 py-6 text-center text-rose-300">Riv. TFR %</th>
                     <th className="px-4 py-6 text-center text-rose-400">Stock Debito (€)</th>
                     <th className="px-4 py-6 text-center text-indigo-300">Rend. Mkt %</th>
                     <th className="px-4 py-6 text-center text-indigo-400">Patrimonio (€)</th>
                     <th className="px-4 py-6 text-center bg-indigo-800 text-white">Delta (€)</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100 text-[10px] font-bold">
                  {historicalAnalysis.map((row) => (
                     <tr key={row.year} className="hover:bg-slate-50 group transition-colors">
                        <td className="px-4 py-4 font-black text-slate-900 sticky left-0 bg-white group-hover:bg-slate-50 z-10 border-r border-slate-100">{row.year}</td>
                        <td className="px-4 py-4">
                           <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter ${
                                 row.year === 2008 || row.year === 2011 || row.year === 2020 || row.year === 2022 ? 'bg-rose-100 text-rose-700' : 
                                 row.year === 2024 || row.year === 2021 || row.year === 2006 ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                              }`}>
                                 {row.event}
                              </span>
                           </div>
                        </td>
                        <td className="px-4 py-4 text-center text-slate-400">{row.inflation.toFixed(2)}%</td>
                        <td className={`px-4 py-4 text-center ${row.tfrRate > 3.5 ? 'text-rose-600' : 'text-slate-400'}`}>{row.tfrRate.toFixed(2)}%</td>
                        <td className="px-4 py-4 text-center text-rose-700 bg-rose-50/20 font-black">{formatCurrency(row.debt)}</td>
                        <td className={`px-4 py-4 text-center ${row.mktPerf >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>{row.mktPerf.toFixed(2)}%</td>
                        <td className="px-4 py-4 text-center text-indigo-700 bg-indigo-50/20 font-black">{formatCurrency(row.asset)}</td>
                        <td className={`px-4 py-4 text-center font-black ${row.opportunityCost >= 0 ? 'text-emerald-600' : 'text-rose-600'} bg-slate-50`}>{formatCurrency(row.opportunityCost)}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>

         <div className="mt-8 bg-indigo-900 p-8 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center gap-8 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><Landmark size={150} /></div>
            <div className="bg-indigo-500 p-5 rounded-3xl text-white shrink-0 shadow-lg animate-pulse"><Zap size={32} /></div>
            <div>
               <h4 className="text-xl font-black uppercase tracking-widest text-indigo-400 mb-2 italic">Correlazione Macroeconomica</h4>
               <p className="text-sm text-slate-300 leading-relaxed italic">
                  "Dottore, osservi il periodo 2022-2023: l'impennata dell'inflazione ISTAT ha forzato una rivalutazione del TFR in azienda del <strong>{HISTORICAL_DATA_20Y.find(d => d.year === 2022).tfrRate}%</strong>. In quegli anni, mantenere il debito internamente è stato estremamente oneroso. Esternalizzare permette di neutralizzare questo rischio macroeconomico, agganciando la crescita del patrimonio a mercati reali anziché all'indice dei prezzi al consumo."
               </p>
            </div>
         </div>
      </div>

    </div>
  );
};

export default CorporateSimulatorView;
