
import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Zap, ShieldAlert, ArrowRight, CheckCircle2, 
  Users, Factory, Calculator, PhoneCall, Handshake, 
  BookOpen, AlertTriangle, FileText, TrendingUp, History,
  Info, Clock, Landmark, MessageSquare, ChevronRight,
  /* Add ClipboardCheck to imports */
  ClipboardCheck
} from 'lucide-react';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

const Budget2026View: React.FC = () => {
  const [income, setIncome] = useState<number>(45000);
  
  const fiscalComparison = useMemo(() => {
    // Aliquota IRPEF media ipotizzata 35%
    const rate = 0.35;
    const oldLimit = 5164.57;
    const newLimit = 5300;
    
    return {
      oldSaving: oldLimit * rate,
      newSaving: newLimit * rate,
      diff: (newLimit - oldLimit) * rate,
      newDeducibility: newLimit
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-24">
      
      {/* 1. HEADER EXECUTIVE BUDGET 2026 */}
      <div className="bg-[#0f172a] rounded-[3rem] p-12 text-white shadow-2xl relative border-b-8 border-indigo-600 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-600/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-indigo-600 p-3 rounded-2xl shadow-xl shadow-indigo-600/20"><Sparkles size={32} className="text-white"/></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-400 italic">Guida Operativa Consulenti - Gruppo Vomero</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                Legge di <br/> <span className="text-indigo-400">Bilancio 2026</span>
              </h1>
              <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
                Dal **1° Luglio 2026** cambia il paradigma della previdenza complementare. Silenzio-Assenso, Portabilità e Nuovi Limiti Fiscali: la tua guida per anticipare il mercato.
              </p>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center relative group">
              <p className="text-[10px] font-black uppercase text-amber-400 mb-2 tracking-widest italic">Nuovo Limite Deducibilità</p>
              <p className="text-6xl font-black text-white tracking-tighter">5.300€</p>
              <p className="text-[10px] font-black text-rose-300 uppercase mt-4 tracking-widest italic">Aggiornato al 02/01/2026</p>
           </div>
        </div>
      </div>

      {/* 2. COSA CAMBIA DAVVERO - GRID TECNICA */}
      <div className="grid lg:grid-cols-3 gap-8">
         {/* SILENZIO ASSENSO */}
         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative group hover:border-indigo-600 transition-all flex flex-col">
            <div className="bg-indigo-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
               <Clock size={24} />
            </div>
            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic mb-4">Silenzio-Assenso 2026</h4>
            <p className="text-sm text-slate-600 leading-relaxed font-medium mb-8 flex-1">
               Adesione **automatica** per i neoassunti del settore privato dal 1° luglio 2026. Finestra di rinuncia: **60 giorni**.
            </p>
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 italic text-[11px] text-amber-800 font-bold">
               "Leva Commerciale: La finestra dei 60gg è il trigger perfetto per il contatto consulenziale."
            </div>
         </div>

         {/* PORTABILITÀ CONTRIBUTO */}
         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative group hover:border-indigo-600 transition-all flex flex-col">
            <div className="bg-emerald-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
               <History size={24} />
            </div>
            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic mb-4">Portabilità Datoriale</h4>
            <p className="text-sm text-slate-600 leading-relaxed font-medium mb-8 flex-1">
               Eliminato il vincolo della contrattazione collettiva. Il contributo datoriale segue il lavoratore verso forme di mercato (PIP/FPA).
            </p>
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 italic text-[11px] text-amber-800 font-bold">
               "Focus: Altamente competitivo tra fondi negoziali e soluzioni Zurich/Anima."
            </div>
         </div>

         {/* TFR A INPS */}
         <div className="bg-[#0f172a] p-8 rounded-[2.5rem] text-white shadow-xl relative group overflow-hidden flex flex-col">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Landmark size={100} /></div>
            <div className="bg-white/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-indigo-400">
               <Factory size={24} />
            </div>
            <h4 className="text-xl font-black text-white uppercase tracking-tighter italic mb-4">TFR a INPS (PMI)</h4>
            <p className="text-sm text-slate-300 leading-relaxed font-medium mb-8 flex-1">
               Ampliamento della platea per il Fondo Tesoreria: soglia a **60 addetti** nel 2026, scende a **40** dal 2032.
            </p>
            <div className="p-4 bg-white/10 rounded-2xl border border-white/20 italic text-[11px] text-indigo-200 font-bold">
               "Leva B2B: Meno TFR in cassa = minore autofinanziamento per l'imprenditore."
            </div>
         </div>
      </div>

      {/* 3. SALES PLAYBOOK - GLI SCRIPT PRONTI ALL'USO */}
      <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
            <div>
               <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Playbook Consulenziale</h3>
               <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">Trasforma le norme in appuntamenti</p>
            </div>
            <div className="bg-indigo-600 px-6 py-3 rounded-2xl text-white flex items-center gap-3">
               <PhoneCall size={20} />
               <span className="text-xs font-black uppercase tracking-widest">Script Certificati 2026</span>
            </div>
         </div>

         <div className="grid lg:grid-cols-2 gap-8">
            {/* SCRIPT TELEFONATA */}
            <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-6">
               <h5 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                  <MessageSquare size={14} /> Apertura Telefonata (30 Sec)
               </h5>
               <div className="bg-white p-6 rounded-3xl shadow-inner border border-slate-100 italic text-slate-700 text-lg leading-relaxed">
                  "Ciao [Nome], ti chiamo per un aggiornamento pratico: dal 2026 cambiano alcune regole su TFR e previdenza complementare. Vorrei verificare in 10 minuti se stai perdendo **contributi del datore di lavoro** o **deduzioni fiscali** che potresti usare già quest'anno. Quando ti è più comodo?"
               </div>
            </div>

            {/* AGENDA APPUNTAMENTO */}
            <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white space-y-6">
               <h5 className="text-[10px] font-black text-amber-500 uppercase tracking-widest flex items-center gap-2">
                  <Handshake size={14} /> Agenda Appuntamento (20 Min)
               </h5>
               <ul className="space-y-4">
                  {[
                    "Dove sta il tuo TFR oggi? (Azienda/INPS/Fondo)",
                    "Hai contribuzione datoriale? Quanto vale in €/anno?",
                    "Stai usando tutto il nuovo plafond di 5.300€?",
                    "Erogazione: rendita a durata definita o prelievi?"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-sm font-bold">
                       <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-900 flex items-center justify-center text-[10px]">{i+1}</div>
                       {item}
                    </li>
                  ))}
               </ul>
            </div>
         </div>
      </div>

      {/* 4. FOCUS FISCALE: LA "METRICHETTA" 5.300€ */}
      <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm relative overflow-hidden">
         <div className="absolute top-0 right-0 p-10 opacity-5"><Calculator size={250} /></div>
         <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 flex items-center gap-3 leading-none">
            <TrendingUp className="text-emerald-600" /> Analisi Incrementale Deducibilità
         </h3>
         
         <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-8">
               <p className="text-slate-600 text-lg font-medium leading-relaxed">
                  Il limite annuo passa da 5.164,57€ a **5.300€**. <br/>
                  Un'opportunità per aumentare i versamenti ricorrenti (PAC) e ottimizzare il carico IRPEF del cliente.
               </p>
               <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100 flex items-center gap-6">
                  <div className="bg-emerald-600 p-4 rounded-2xl text-white shadow-lg shrink-0"><Zap size={24} /></div>
                  <div>
                     <p className="text-[10px] font-black uppercase text-emerald-800">Guadagno Extra Fiscale</p>
                     <p className="text-xl font-black text-emerald-900">+{formatCurrency(fiscalComparison.diff)} / anno</p>
                  </div>
               </div>
            </div>

            <div className="lg:col-span-7 bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
               <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-100 text-center">
                     <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Limite 2025</p>
                     <p className="text-3xl font-black text-slate-400">5.164 €</p>
                  </div>
                  <div className="p-6 bg-indigo-600 rounded-3xl shadow-xl text-center text-white ring-4 ring-indigo-100">
                     <p className="text-[10px] font-black uppercase mb-2 opacity-80">Limite 2026</p>
                     <p className="text-3xl font-black">5.300 €</p>
                  </div>
               </div>
               <div className="mt-8 p-6 bg-slate-900 rounded-3xl text-center">
                  <p className="text-[11px] font-black text-indigo-400 uppercase tracking-widest italic">Suggerimento Commerciale</p>
                  <p className="text-sm text-slate-300 mt-2">"Quanto risparmio IRPEF oggi e quanto accumulo per domani"</p>
               </div>
            </div>
         </div>
      </div>

      {/* 5. CHECKLIST COMPLIANCE 2026 */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
         <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic mb-8 flex items-center gap-3">
            <ShieldAlert className="text-rose-600" /> Compliance & Qualità Consulenziale
         </h3>
         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Neoassunti", desc: "Mappare i dipendenti di prima assunzione (esclusi domestici).", icon: Users },
              { title: "Adeguatezza", desc: "Verificare età, orizzonte e stabilità reddito prima dello switch.", icon: ClipboardCheck },
              { title: "Trasparenza", desc: "Confrontare costi ISC/TER tra negoziale e mercato.", icon: Info },
              { title: "Revisione", desc: "Piano di controllo annuale o post eventi vita.", icon: History },
            ].map((item, i) => (
               <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-indigo-600 transition-all">
                  <item.icon size={24} className="text-slate-400 mb-4 group-hover:text-indigo-600 transition-colors" />
                  <h5 className="font-black text-slate-800 text-xs uppercase mb-2">{item.title}</h5>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-bold">{item.desc}</p>
               </div>
            ))}
         </div>
      </div>

      {/* FOOTER METODOLOGICO */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="bg-[#0f172a] p-4 rounded-[1.5rem] text-white shadow-lg"><BookOpen size={32} /></div>
            <div>
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">Budget 2026 Operational Guide</p>
               <p className="text-xs text-slate-500 font-bold italic">Rif: Legge 199/2025 | D.Lgs 252/05 | Documento Supporto Gruppo Vomero</p>
            </div>
         </div>
         <div className="text-right">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">DOCUMENTO AD USO INTERNO RISERVATO</p>
         </div>
      </div>

    </div>
  );
};

export default Budget2026View;
