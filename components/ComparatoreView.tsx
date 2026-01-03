
import React, { useState, useMemo } from 'react';
import { 
  BarChart3, Search, PlusCircle, MinusCircle, 
  Star, Award, List, ArrowRightLeft, FileText,
  Info, CheckCircle2, RefreshCw, Filter, TrendingUp,
  LayoutGrid, Landmark, ArrowUpRight, ShieldCheck,
  Zap, AlertTriangle, Building2, ChevronDown, 
  Layers
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { COVIP_MARKET_DATA } from '../constants';

const ComparatoreView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'TUTTI' | 'AZIONARIO' | 'BILANCIATO' | 'PRUDENTE_OBB' | 'GARANTITO'>('TUTTI');
  const [activeType, setActiveType] = useState<'TUTTI' | 'FPA' | 'PIP'>('TUTTI');
  const [activeCompany, setActiveCompany] = useState<string>('TUTTE');
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>(['Z_PIP_AZN', 'AL_FPA_AZN_INS', 'A_FPA_AZN', 'AVG_PIP_AZN']);
  const [searchTerm, setSearchTerm] = useState('');

  // Lista univoca delle società presenti nel database
  const companies = useMemo(() => {
    const list = Array.from(new Set(COVIP_MARKET_DATA.map(p => p.company)));
    return ['TUTTE', ...list.sort()];
  }, []);

  // Filtro dei prodotti basato su categoria, tipo, società e ricerca testuale
  const filteredProducts = useMemo(() => {
    return COVIP_MARKET_DATA.filter(p => {
      const matchesCategory = activeCategory === 'TUTTI' || p.category === activeCategory;
      const matchesType = activeType === 'TUTTI' || p.type === activeType;
      const matchesCompany = activeCompany === 'TUTTE' || p.company === activeCompany;
      const matchesSearch = p.company.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           p.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesType && matchesCompany && matchesSearch;
    }).sort((a, b) => b.y1 - a.y1);
  }, [activeCategory, activeType, activeCompany, searchTerm]);

  // Dati filtrati per il grafico (solo i selezionati)
  const chartData = useMemo(() => {
    return COVIP_MARKET_DATA.filter(p => selectedProductIds.includes(p.id));
  }, [selectedProductIds]);

  const toggleProduct = (id: string) => {
    setSelectedProductIds(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id].slice(0, 10)
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-20">
      
      {/* HEADER STRATEGICO CON FOCUS FEDELTÀ DATI */}
      <div className="bg-[#0a0f1d] rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden border-b-8 border-indigo-600">
         <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12"><Landmark size={200} /></div>
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
               <div className="flex items-center gap-3 mb-2">
                  <div className="bg-indigo-600 p-2 rounded-xl"><ArrowRightLeft size={24} /></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 italic">Database Certificato FPA & PIP 2024</span>
               </div>
               <h2 className="text-4xl font-black uppercase tracking-tighter italic">Market Asset <span className="text-indigo-500">Benchmark</span></h2>
               <p className="text-slate-400 mt-2 font-medium italic leading-relaxed max-w-xl">
                  Confronta i rendimenti dei documenti ufficiali. Zurich, Anima e i principali competitor italiani a confronto diretto.
               </p>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 text-center">
               <p className="text-[9px] font-black uppercase text-amber-500 mb-1 tracking-widest">Dati Estratti Da</p>
               <p className="text-xl font-black text-white">Relazione COVIP</p>
               <p className="text-[9px] font-bold text-slate-500 uppercase mt-1 italic tracking-widest">Aggiornamento 2024</p>
            </div>
         </div>
      </div>

      {/* BARRA FILTRI MULTI-LIVELLO */}
      <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-4">
         <div className="grid lg:grid-cols-12 gap-4 items-center">
            {/* Filtro Categoria */}
            <div className="lg:col-span-5">
               <label className="text-[9px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Asset Allocation</label>
               <div className="flex flex-wrap gap-1 bg-slate-50 p-1 rounded-xl border border-slate-100">
                  <button onClick={() => setActiveCategory('TUTTI')} className={`px-3 py-2 rounded-lg text-[9px] font-black uppercase transition-all ${activeCategory === 'TUTTI' ? 'bg-[#233D7B] text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>TUTTI</button>
                  {(['AZIONARIO', 'BILANCIATO', 'PRUDENTE_OBB', 'GARANTITO'] as const).map(cat => (
                     <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-3 py-2 rounded-lg text-[9px] font-black uppercase transition-all ${activeCategory === cat ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
                        {cat.replace('_OBB', '')}
                     </button>
                  ))}
               </div>
            </div>

            {/* Filtro Tipo (FPA/PIP) */}
            <div className="lg:col-span-3">
               <label className="text-[9px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Tipologia Strumento</label>
               <div className="flex gap-1 bg-slate-50 p-1 rounded-xl border border-slate-100">
                  <button onClick={() => setActiveType('TUTTI')} className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase transition-all ${activeType === 'TUTTI' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>TUTTI</button>
                  <button onClick={() => setActiveType('FPA')} className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase transition-all ${activeType === 'FPA' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>FPA</button>
                  <button onClick={() => setActiveType('PIP')} className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase transition-all ${activeType === 'PIP' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>PIP</button>
               </div>
            </div>

            {/* Ricerca Testuale */}
            <div className="lg:col-span-4 relative">
               <label className="text-[9px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Ricerca Rapida</label>
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                     type="text" 
                     placeholder="Cerca Società o Fondo (es. 'Axa')..." 
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-bold outline-none focus:ring-2 focus:ring-indigo-500"
                  />
               </div>
            </div>
         </div>

         {/* Filtro Società (Select) */}
         <div className="flex items-center gap-4 pt-2 border-t border-slate-50">
            <Building2 className="text-slate-400" size={16} />
            <div className="flex-1 flex flex-wrap gap-2 overflow-x-auto no-scrollbar py-1">
               {companies.map(c => (
                  <button 
                     key={c} 
                     onClick={() => setActiveCompany(c)}
                     className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border transition-all whitespace-nowrap ${activeCompany === c ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-white border-slate-200 text-slate-400 hover:border-slate-400'}`}
                  >
                     {c === 'TUTTE' ? 'Tutte le Società' : c}
                  </button>
               ))}
            </div>
         </div>
      </div>

      {/* GRAFICO COMPARATIVO - FOCUS RENDIMENTI REALI */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
         <div className="flex justify-between items-center mb-12">
            <div>
               <h3 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-2">
                  <TrendingUp size={16} className="text-indigo-600" /> Rendimenti Netti Multi-Periodo (%)
               </h3>
               <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase italic">Confronto attivo su {selectedProductIds.length} comparti scelti</p>
            </div>
            <div className="hidden md:flex gap-6 text-[9px] font-black text-slate-400 uppercase tracking-widest">
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-indigo-300"></div> Netto 2024</div>
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-indigo-600"></div> Media 5 Anni</div>
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-slate-900"></div> Media 10 Anni</div>
            </div>
         </div>
         
         <div className="h-[450px] w-full">
            {chartData.length > 0 ? (
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 60 }}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 8, fontWeight: '900', fill: '#475569'}} 
                        angle={-30} 
                        textAnchor="end" 
                        interval={0} 
                     />
                     <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} unit="%" />
                     <Tooltip 
                        cursor={{fill: '#f8fafc'}}
                        contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.2)'}} 
                        formatter={(val: number) => [`${val.toFixed(2)}%`, '']}
                     />
                     <Bar dataKey="y1" name="Netto 2024" fill="#818cf8" radius={[8, 8, 0, 0]} barSize={22} />
                     <Bar dataKey="y5" name="Media 5Y" fill="#4f46e5" radius={[8, 8, 0, 0]} barSize={22} />
                     <Bar dataKey="y10" name="Media 10Y" fill="#0f172a" radius={[8, 8, 0, 0]} barSize={22} />
                  </BarChart>
               </ResponsiveContainer>
            ) : (
               <div className="h-full flex flex-col items-center justify-center text-slate-300 border-4 border-dashed border-slate-50 rounded-[4rem]">
                  <BarChart3 size={80} className="mb-4 opacity-5" />
                  <p className="text-sm font-black uppercase tracking-widest text-slate-400 text-center px-12 leading-relaxed">
                     Seleziona i comparti dal database integrale qui sotto <br/> per generare il benchmark competitivo.
                  </p>
               </div>
            )}
         </div>
      </div>

      {/* DATABASE INTEGRALE - TABELLA FEDELE AI PDF */}
      <div className="bg-white rounded-[3rem] border border-slate-200 shadow-2xl overflow-hidden">
         <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50/50">
            <div className="flex items-center gap-6">
               <div className="text-center">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Totale Database</p>
                  <p className="text-2xl font-black text-slate-900 leading-none">{filteredProducts.length}</p>
               </div>
               <div className="h-12 w-px bg-slate-200"></div>
               <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Case Mandanti</p>
                  <p className="text-sm font-black text-indigo-600 uppercase italic tracking-tighter">
                     {activeCompany === 'TUTTE' ? 'Copertura Integrale' : activeCompany}
                  </p>
               </div>
            </div>
            <div className="flex items-center gap-4">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Selezione: {selectedProductIds.length}/10</span>
               <button onClick={() => setSelectedProductIds([])} className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-rose-600 hover:border-rose-200 transition-all shadow-sm">
                  <RefreshCw size={20} />
               </button>
            </div>
         </div>

         <div className="overflow-x-auto max-h-[700px] overflow-y-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
               <thead className="sticky top-0 z-20">
                  <tr className="bg-[#0f172a] text-white text-[9px] font-black uppercase tracking-[0.2em]">
                     <th className="px-8 py-6">Fondo / Gestore / Comparto</th>
                     <th className="px-4 py-6 text-center">Tipo</th>
                     <th className="px-4 py-6 text-center">Settore</th>
                     <th className="px-6 py-6 text-center text-emerald-400">Netto 2024</th>
                     <th className="px-6 py-6 text-center">Media 5Y</th>
                     <th className="px-6 py-6 text-center">Media 10Y</th>
                     <th className="px-8 py-6 text-right">Benchmark</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((p) => {
                     const isSelected = selectedProductIds.includes(p.id);
                     const isBenchmark = p.company.includes('MEDIA') || p.company === 'AZIENDA';
                     const isZurichOrAnima = p.company === 'ZURICH' || p.company === 'ANIMA';
                     
                     return (
                        <tr key={p.id} className={`hover:bg-slate-50 transition-colors group ${isSelected ? 'bg-indigo-50/50' : ''} ${isBenchmark ? 'bg-slate-50/40' : ''}`}>
                           <td className="px-8 py-5">
                              <div className="flex items-center gap-4">
                                 <div className={`w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm ${isSelected ? 'bg-indigo-600 animate-pulse' : 'bg-slate-200'} ${isZurichOrAnima ? 'ring-4 ring-indigo-500/10' : ''}`}></div>
                                 <div>
                                    <div className="flex items-center gap-2">
                                       <p className={`text-[10px] font-black uppercase leading-none ${isZurichOrAnima ? 'text-indigo-600' : 'text-slate-400'}`}>
                                          {p.company}
                                       </p>
                                       {p.isCore && <Star size={10} className="text-amber-500 fill-current" />}
                                       {isBenchmark && <Landmark size={10} className="text-slate-400" />}
                                    </div>
                                    <p className={`text-base font-black uppercase tracking-tighter mt-1.5 ${isZurichOrAnima ? 'text-slate-900' : 'text-slate-800'}`}>
                                       {p.name}
                                    </p>
                                 </div>
                              </div>
                           </td>
                           <td className="px-4 py-5 text-center">
                              <span className={`text-[9px] font-black px-2.5 py-1 rounded-md border ${
                                 p.type === 'PIP' ? 'bg-indigo-900 text-white border-indigo-800' : 
                                 p.type === 'FPA' ? 'bg-white text-indigo-900 border-indigo-200 shadow-sm' : 
                                 'bg-slate-200 text-slate-500 border-slate-300'
                              }`}>
                                 {p.type}
                              </span>
                           </td>
                           <td className="px-4 py-5 text-center">
                              <span className={`text-[8px] font-black px-2 py-1 rounded-md uppercase border ${
                                 p.category === 'AZIONARIO' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                 p.category === 'BILANCIATO' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                                 p.category === 'PRUDENTE_OBB' ? 'bg-slate-100 text-slate-700 border-slate-200' :
                                 'bg-emerald-50 text-emerald-700 border-emerald-100'
                              }`}>
                                 {p.category.replace('_OBB', '')}
                              </span>
                           </td>
                           <td className={`px-6 py-5 text-center text-xl font-black ${p.y1 > 12 ? 'text-emerald-600' : p.y1 > 8 ? 'text-indigo-600' : 'text-slate-900'}`}>
                              {p.y1 === 0 ? '-' : `+${p.y1.toFixed(2)}%`}
                           </td>
                           <td className="px-6 py-5 text-center font-bold text-slate-500 text-sm">
                              {p.y5 === 0 ? '-' : `${p.y5.toFixed(2)}%`}
                           </td>
                           <td className="px-6 py-5 text-center font-bold text-slate-900 text-sm">
                              {p.y10 === 0 ? '-' : `${p.y10.toFixed(2)}%`}
                           </td>
                           <td className="px-8 py-5 text-right">
                              <button 
                                 onClick={() => toggleProduct(p.id)}
                                 className={`p-3 rounded-2xl transition-all shadow-sm ${isSelected ? 'bg-indigo-600 text-white shadow-xl rotate-180 scale-110' : 'bg-slate-100 text-slate-400 hover:bg-indigo-600 hover:text-white hover:shadow-lg'}`}
                              >
                                 {isSelected ? <MinusCircle size={24} /> : <PlusCircle size={24} />}
                              </button>
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         </div>
      </div>

      {/* FOOTER INFORMATIVO & LEGENDA DOCUMENTALE */}
      <div className="grid lg:grid-cols-12 gap-8">
         <div className="lg:col-span-8 bg-indigo-950 p-12 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden flex items-center gap-12 border-l-8 border-amber-500">
            <div className="absolute top-0 right-0 p-10 opacity-5"><FileText size={250} /></div>
            <div className="bg-amber-500 p-7 rounded-full text-slate-900 shadow-2xl animate-pulse shrink-0"><Award size={40} /></div>
            <div>
               <h4 className="text-2xl font-black uppercase italic tracking-tighter text-amber-400 mb-3">Vomero Battle-View Certificata</h4>
               <p className="text-sm text-indigo-100 leading-relaxed font-medium italic">
                  "Dottore, il confronto numerico non lascia spazio ai dubbi. Mostrare al cliente che il suo comparto bancario (Poste, Generali o Alleanza) ha reso meno della metà rispetto alle eccellenze **Zurich o Anima** è la base per una consulenza etica e profittevole."
               </p>
               <div className="mt-6 flex gap-4">
                  <span className="text-[10px] font-black bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 text-indigo-300 uppercase">Rif: Doc PDF FPA/PIP Pag. 1-11</span>
                  <span className="text-[10px] font-black bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 text-indigo-300 uppercase">Valutazione Netta 2024</span>
               </div>
            </div>
         </div>
         
         <div className="lg:col-span-4 bg-white p-10 rounded-[3.5rem] border-2 border-slate-100 flex flex-col justify-center shadow-lg">
            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
               <AlertTriangle size={14} className="text-amber-500" /> Legenda Database
            </h5>
            <div className="space-y-5">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-900 flex items-center justify-center text-white font-black text-[10px] shadow-md">PIP</div>
                  <div>
                     <p className="text-xs font-black text-slate-800">Piano Individuale</p>
                     <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">Emissione Assicurativa</p>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-indigo-200 flex items-center justify-center text-indigo-900 font-black text-[10px] shadow-sm">FPA</div>
                  <div>
                     <p className="text-xs font-black text-slate-800">Fondo Aperto</p>
                     <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">Emissione SGR / Istituzionale</p>
                  </div>
               </div>
               <div className="pt-6 border-t border-slate-100">
                  <p className="text-[9px] text-slate-400 leading-tight italic">Rendimenti storici calcolati su base annua composta. Fonte: Database Advisor Gruppo Vomero.</p>
               </div>
            </div>
         </div>
      </div>

    </div>
  );
};

export default ComparatoreView;
