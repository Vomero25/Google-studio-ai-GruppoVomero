
import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, Scale, ShieldCheck, Zap, ArrowRight, 
  Calculator, Gavel, Landmark, History, Lock, 
  Settings2, Award, Info, FileText, CheckCircle2,
  AlertTriangle, ShieldAlert, Briefcase, Sparkles, 
  Quote, ChevronRight, FileSignature, Coins, 
  BookOpen, Building2, UserCheck, Handshake,
  Receipt, Landmark as Bank, ShieldPlus, AlertCircle, Siren,
  ArrowDownNarrowWide, MinusCircle, PlusCircle, Percent,
  ClipboardCheck, BarChart3, Database, Wallet, UserMinus,
  Timer, ArrowDownToLine, Gem
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

const TfmSimulatorView: React.FC = () => {
  // --- STATI DI INPUT ---
  const [compensoAnnuo, setCompensoAnnuo] = useState<number>(50000);
  const [aliquotaMediaSocio, setAliquotaMediaSocio] = useState<number>(27); // Per tassazione separata
  const [isGestioneSeparataInps, setIsGestioneSeparataInps] = useState<boolean>(true);

  // --- MOTORE DI AUDIT (LOGICA FISCALE & PREVIDENZIALE) ---
  const audit = useMemo(() => {
    // 1. SCENARIO A: COMPENSO ORDINARIO (Tutto subito)
    // Tassazione IRPEF (assumiamo aliquota marginale alta 43% + addizionali = 45%)
    const irpefRate = 0.45;
    const inpsRate = isGestioneSeparataInps ? 0.26 : 0; // Semplificato
    
    const tasseIrpef = compensoAnnuo * irpefRate;
    const contributiInps = compensoAnnuo * inpsRate;
    const nettoInTascaSubito = compensoAnnuo - tasseIrpef - contributiInps;
    const pressioneTotaleSubito = ((compensoAnnuo - nettoInTascaSubito) / compensoAnnuo) * 100;

    // 2. SCENARIO B: TFM (Accantonamento Differito)
    // Deducibilità IRES per Azienda (Art. 105)
    const risparmioIresAzienda = compensoAnnuo * 0.24;
    // Tassazione Separata al Socio (Art. 17) - NO INPS su TFM
    const taxSeparataSocio = compensoAnnuo * (aliquotaMediaSocio / 100);
    const nettoInTascaTfm = compensoAnnuo - taxSeparataSocio;
    
    // Delta di Efficienza
    const guadagnoExtraNetto = nettoInTascaTfm - nettoInTascaSubito;
    const incrementoPercentuale = (guadagnoExtraNetto / nettoInTascaSubito) * 100;

    const chartData = [
      { name: 'Compenso Subito', valore: nettoInTascaSubito, tasse: tasseIrpef + contributiInps, fill: '#ef4444' },
      { name: 'Compenso TFM', valore: nettoInTascaTfm, tasse: taxSeparataSocio, fill: '#10b981' }
    ];

    return {
      nettoInTascaSubito,
      tasseIrpef,
      contributiInps,
      nettoInTascaTfm,
      taxSeparataSocio,
      risparmioIresAzienda,
      guadagnoExtraNetto,
      incrementoPercentuale,
      pressioneTotaleSubito,
      chartData
    };
  }, [compensoAnnuo, aliquotaMediaSocio, isGestioneSeparataInps]);

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-fade-in pb-24">
      
      {/* 1. HERO: IL POSIZIONAMENTO (RICCHEZZA DIFFERITA) */}
      <div className="bg-[#0a0f1d] rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden border-b-8 border-amber-500">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-500/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-amber-500 p-3 rounded-2xl shadow-xl shadow-amber-600/20"><Briefcase size={32} className="text-slate-900"/></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-amber-400 italic">Financial Engineering per Amministratori</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                TFM: Estrarre <br/> <span className="text-amber-500 text-6xl">Valore Pulito</span>
              </h1>
              <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
                "Dottore, lei sta pagando il **{audit.pressioneTotaleSubito.toFixed(0)}%** di tasse sui suoi compensi attuali. Il TFM le permette di accantonare la stessa cifra pagando quasi la metà delle tasse e zero contributi INPS."
              </p>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center">
              <p className="text-[10px] font-black uppercase text-amber-400 mb-2 tracking-widest italic">Efficienza Guadagnata</p>
              <p className="text-7xl font-black text-white tracking-tighter">+{audit.incrementoPercentuale.toFixed(0)}%</p>
              <p className="text-[10px] font-bold text-emerald-400 uppercase mt-4 italic tracking-widest">Rispetto al prelievo ordinario</p>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* 2. SIDEBAR TECNICA: PARAMETRI DI AUDIT */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm space-y-8">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 italic">
                <Settings2 size={14} className="text-[#233D7B]" /> Analisi Flussi Correnti
             </h4>
             <div className="space-y-6">
                <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                   <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Quota Annuo da "Spostare" (€)</label>
                   <input type="number" value={compensoAnnuo} onChange={(e) => setCompensoAnnuo(Number(e.target.value))} className="w-full bg-transparent font-black text-3xl outline-none text-slate-900" />
                   <p className="text-[9px] text-slate-400 mt-1 uppercase italic font-bold">Base calcolo: compenso amministratore lordo</p>
                </div>

                <div className="bg-amber-50 p-5 rounded-3xl border border-amber-200">
                   <div className="flex justify-between items-center mb-1">
                      <label className="text-[10px] font-black text-amber-700 uppercase">Aliquota Media Socio (%)</label>
                      <span className="text-sm font-black text-amber-900">{aliquotaMediaSocio}%</span>
                   </div>
                   <input type="range" min="23" max="43" step="1" value={aliquotaMediaSocio} onChange={(e) => setAliquotaMediaSocio(Number(e.target.value))} className="w-full h-1.5 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600" />
                   <p className="text-[9px] text-amber-600 font-bold uppercase mt-2 italic leading-tight">
                      Base Tassazione Separata (Art. 17 TUIR)
                   </p>
                </div>

                <div className="flex items-center justify-between bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
                   <label className="text-[10px] font-black text-indigo-700 uppercase">Soggetto a INPS G.S.?</label>
                   <button onClick={() => setIsGestioneSeparataInps(!isGestioneSeparataInps)} className={`px-4 py-1.5 rounded-xl text-[10px] font-black transition-all ${isGestioneSeparataInps ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-indigo-400'}`}>
                      {isGestioneSeparataInps ? 'SÌ (26.07%)' : 'NO'}
                   </button>
                </div>
             </div>
          </div>

          <div className="bg-[#233D7B] p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group border-b-8 border-emerald-400">
             <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform"><Lock size={200} /></div>
             <h4 className="text-amber-400 text-[10px] font-black uppercase mb-4 tracking-widest italic flex items-center gap-2"><ShieldCheck size={14}/> Scudo Patrimoniale Art. 1923</h4>
             <p className="text-sm text-blue-100 leading-relaxed font-medium italic">
                "Dottore, il TFM accantonato in polizza Zurich non è solo un vantaggio fiscale. Diventa **impignorabile e insequestrabile**. In caso di problemi aziendali, questi soldi sono legalmente fuori dalla portata dei creditori."
             </p>
          </div>
        </div>

        {/* 3. MAIN CONTENT: THE WEALTH BATTLE */}
        <div className="lg:col-span-8 space-y-8">
           
           <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm relative overflow-hidden">
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 flex items-center gap-3 leading-none">
                 <TrendingUp className="text-indigo-600" /> Analisi Matematica del Netto in Tasca
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                 {/* SCENARIO ORDINARIO */}
                 <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col justify-between group hover:bg-white hover:shadow-xl transition-all">
                    <div>
                       <div className="flex justify-between items-start mb-4">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">A) Prelievo Stipendio</p>
                          <UserMinus size={18} className="text-rose-500" />
                       </div>
                       <p className="text-4xl font-black text-slate-900">{formatCurrency(audit.nettoInTascaSubito)}</p>
                       <p className="text-[9px] text-slate-500 font-bold uppercase mt-2">Netto Reale in tasca oggi</p>
                    </div>
                    <div className="mt-8 pt-4 border-t border-slate-200">
                       <p className="text-[10px] font-black text-rose-500 uppercase italic">Erosione Totale: {audit.pressioneTotaleSubito.toFixed(1)}%</p>
                       <p className="text-[9px] text-slate-400 leading-tight mt-1 italic">IRPEF (45%) + INPS (26%) = Più tasse che stipendio.</p>
                    </div>
                 </div>

                 {/* SCENARIO TFM */}
                 <div className="p-8 bg-emerald-50 rounded-[2.5rem] border-2 border-emerald-500 flex flex-col justify-between relative shadow-xl shadow-emerald-200/20 scale-105">
                    <div className="absolute top-2 right-2"><Sparkles className="text-emerald-500 animate-pulse" size={24}/></div>
                    <div>
                       <div className="flex justify-between items-start mb-4">
                          <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest italic">B) Strategia TFM Zurich</p>
                          <Award size={18} className="text-emerald-600" />
                       </div>
                       <p className="text-5xl font-black text-emerald-700">{formatCurrency(audit.nettoInTascaTfm)}</p>
                       <p className="text-[9px] text-emerald-500 font-black uppercase mt-2">Netto Reale Differito</p>
                    </div>
                    <div className="mt-8 pt-4 border-t border-emerald-200">
                       <p className="text-[10px] font-black text-indigo-600 uppercase italic">Vantaggio Netto: +{formatCurrency(audit.guadagnoExtraNetto)}</p>
                       <p className="text-[9px] text-slate-500 leading-tight mt-1 italic">Tassazione Separata {aliquotaMediaSocio}% + 0 Contributi INPS.</p>
                    </div>
                 </div>
              </div>

              <div className="p-6 bg-slate-900 rounded-3xl text-white flex items-center gap-6 border-l-8 border-amber-500">
                 <div className="bg-amber-500 p-4 rounded-2xl text-slate-900 shadow-lg shrink-0"><Handshake size={24} /></div>
                 <p className="text-sm italic font-medium text-slate-300 leading-relaxed">
                    "Dottore, accantonare il compenso significa **non regalare il 45% allo Stato** subito. Lei crea un fondo di riserva personale che cresce esentasse e che incasserà con una fiscalità agevolata."
                 </p>
              </div>
           </div>

           {/* 4. PROTOCOLLO OPERATIVO: COME E QUANDO INCASSARE */}
           <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm relative overflow-hidden">
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 flex items-center gap-4">
                 <Timer className="text-indigo-600" /> Il Protocollo d'Incasso: Regole & Tempi
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8 relative z-10">
                 <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-[#233D7B] text-white flex items-center justify-center font-black text-sm mb-4">1</div>
                    <h5 className="font-black text-slate-800 uppercase text-[10px] mb-3 tracking-widest">Quando Incassa?</h5>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-bold italic">
                       "Il capitale viene liquidato alla **Cessazione del Mandato**. Può essere per scadenza naturale dell'incarico o per le sue dimissioni volontarie."
                    </p>
                 </div>
                 <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-[#233D7B] text-white flex items-center justify-center font-black text-sm mb-4">2</div>
                    <h5 className="font-black text-slate-800 uppercase text-[10px] mb-3 tracking-widest">A che condizioni?</h5>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-bold italic">
                       "Fondamentale la **Data Certa Anteriore** alla nomina. Altrimenti AdE potrebbe tassare tutto al 43%. Noi ci occupiamo della blindatura legale tramite PEC/Notaio."
                    </p>
                 </div>
                 <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-[#233D7B] text-white flex items-center justify-center font-black text-sm mb-4">3</div>
                    <h5 className="font-black text-slate-800 uppercase text-[10px] mb-3 tracking-widest">Flessibilità</h5>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-bold italic">
                       "Può variare l'accantonamento ogni anno in base agli utili dell'azienda. Non è un vincolo rigido, ma un serbatoio dinamico di ricchezza."
                    </p>
                 </div>
              </div>

              <div className="mt-10 p-8 bg-indigo-900 rounded-[2.5rem] text-white relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-5 rotate-12"><Landmark size={150} /></div>
                 <h4 className="text-xl font-black uppercase text-amber-400 mb-4 flex items-center gap-2 italic">
                    <ArrowDownToLine size={20} /> L'Incasso Reale
                 </h4>
                 <div className="space-y-4 text-sm font-medium leading-relaxed italic">
                    <p>"Al momento dell'incasso, la Zurich liquida il capitale rivalutato direttamente sul suo conto corrente personale."</p>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                          <p className="text-[10px] font-black uppercase text-amber-500 mb-1">Ritrasformazione:</p>
                          <p className="text-xs">Se lo desidera, può convertire il capitale in una **Rendita Vitalizia** protetta.</p>
                       </div>
                       <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                          <p className="text-[10px] font-black uppercase text-amber-500 mb-1">Rinvestimento:</p>
                          <p className="text-xs">Il netto incassato può alimentare una polizza **Multinvest** per la protezione ereditaria.</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* 5. AREA NORMATIVA TUIR */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
         <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic mb-8 flex items-center gap-3">
            <BookOpen className="text-indigo-600" /> Fondamenti del Testo Unico Imposte sui Redditi (TUIR)
         </h3>
         <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
               <h4 className="font-black text-indigo-700 text-xs uppercase mb-2">Art. 17 comma 1, lett. C</h4>
               <p className="text-[10px] text-slate-600 leading-relaxed italic">Sancisce il regime di **Tassazione Separata** per il TFM, evitando il cumulo con gli altri redditi IRPEF.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
               <h4 className="font-black text-indigo-700 text-xs uppercase mb-2">Art. 105 commi 1 e 4</h4>
               <p className="text-[10px] text-slate-600 leading-relaxed italic">Conferma la **Deducibilità Totale** degli accantonamenti TFM per l'azienda nell'esercizio di competenza.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
               <h4 className="font-black text-indigo-700 text-xs uppercase mb-2">Art. 2120 Codice Civile</h4>
               <p className="text-[10px] text-slate-600 leading-relaxed italic">Definisce la struttura dell'indennità per analogia al TFR, garantendo una cornice giuridica solida.</p>
            </div>
         </div>
      </div>

      {/* FOOTER METODOLOGICO */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="bg-[#0a0f1d] p-4 rounded-[1.5rem] text-white shadow-lg"><FileSignature size={32} /></div>
            <div>
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">Fiscal TFM Intelligence 2026</p>
               <p className="text-[10px] text-slate-500 font-bold italic">Rif: Newsletter Private Advisory LAB | Art. 17, 105 TUIR | Protocollo Consulenza Gruppo Vomero</p>
            </div>
         </div>
         <div className="text-right">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">DOCUMENTO AD USO INTERNO RISERVATO - PRIVATE BANKING UNIT</p>
         </div>
      </div>

    </div>
  );
};

export default TfmSimulatorView;
