
import { RegulationItem, HistoricalDataPoint, CovipProduct } from './types';

export const SYSTEM_INSTRUCTION = "Sei un esperto consulente finanziario e previdenziale del Gruppo Vomero. Il tuo obiettivo è fornire consulenza tecnica e commerciale basata sulla normativa italiana (D.Lgs. 252/05, TUIR, Codice Civile) e sui dati COVIP 2024. Sii professionale, accurato e persuasivo.";

// --- DATABASE INTEGRALE ESTRATTO FEDELMENTE DAI DOCUMENTI ALLEGATI (FPA & PIP) ---
export const COVIP_MARKET_DATA: CovipProduct[] = [
  // --- ZURICH (PIP & FPA) ---
  { id: 'Z_PIP_AZN', company: 'ZURICH', name: 'Pension ESG Azionario', type: 'PIP', category: 'AZIONARIO', y1: 15.37, y5: 7.15, y10: 6.43, isCore: true },
  { id: 'Z_PIP_BIL8', company: 'ZURICH', name: 'Pension ESG Flex 8', type: 'PIP', category: 'BILANCIATO', y1: 7.82, y5: 0.75, y10: 1.83, isCore: true },
  { id: 'Z_PIP_BIL4', company: 'ZURICH', name: 'Pension ESG Flex 4', type: 'PIP', category: 'BILANCIATO', y1: 4.31, y5: 0.12, y10: -0.43 },
  { id: 'Z_PIP_PROT', company: 'ZURICH', name: 'Pension ESG Protetto', type: 'PIP', category: 'GARANTITO', y1: 3.63, y5: 0.0, y10: 0.0 },
  { id: 'Z_FPA_CONT', company: 'ZURICH', name: 'Contribution - Azionaria', type: 'FPA', category: 'AZIONARIO', y1: 7.92, y5: 4.22, y10: 4.24 },

  // --- ANIMA (FPA - Pagina 1) ---
  { id: 'A_FPA_C25', company: 'ANIMA', name: 'Arti & Mestieri - Crescita 25+', type: 'FPA', category: 'AZIONARIO', y1: 13.66, y5: 6.79, y10: 6.00, isCore: true },
  { id: 'A_FPA_R10', company: 'ANIMA', name: 'Arti & Mestieri - Rivalutazione 10+', type: 'FPA', category: 'BILANCIATO', y1: 7.44, y5: 2.30, y10: 2.76, isCore: true },
  { id: 'A_FPA_C3', company: 'ANIMA', name: 'Arti & Mestieri - Conservazione 3+', type: 'FPA', category: 'PRUDENTE_OBB', y1: 2.55, y5: -0.87, y10: 0.05 },
  { id: 'A_FPA_G1', company: 'ANIMA', name: 'Arti & Mestieri - Garanzia 1+', type: 'FPA', category: 'GARANTITO', y1: 2.76, y5: 0.55, y10: 0.06 },

  // --- ALLIANZ (FPA & PIP - Pagina 1 e 7) ---
  { id: 'AL_FPA_INS_AZN', company: 'ALLIANZ', name: 'Insieme - Linea Azionaria', type: 'FPA', category: 'AZIONARIO', y1: 17.67, y5: 7.90, y10: 6.85 },
  { id: 'AL_FPA_INS_BIL', company: 'ALLIANZ', name: 'Insieme - Linea Bilanciata', type: 'FPA', category: 'BILANCIATO', y1: 10.29, y5: 3.99, y10: 3.69 },
  { id: 'AL_FPA_PREV_AZN', company: 'ALLIANZ', name: 'Allianz Previdenza - Azionaria', type: 'FPA', category: 'AZIONARIO', y1: 16.18, y5: 6.95, y10: 5.95 },
  { id: 'AL_FPA_PREV_BIL', company: 'ALLIANZ', name: 'Allianz Previdenza - Bilanciata', type: 'FPA', category: 'BILANCIATO', y1: 7.57, y5: 1.79, y10: 2.46 },
  { id: 'AL_PIP_MF_AZN', company: 'ALLIANZ', name: 'Moneyfarm - Linea Azionaria', type: 'PIP', category: 'AZIONARIO', y1: 12.83, y5: 8.35, y10: 0.0 },
  { id: 'AL_PIP_ORIZ_AZN', company: 'ALLIANZ', name: 'Orizzonte - Azionario Globale', type: 'PIP', category: 'AZIONARIO', y1: 13.80, y5: 0.0, y10: 0.0 },

  // --- ALLEANZA (FPA & PIP - Pagina 1 e 1) ---
  { id: 'ALL_FPA_ALM_AZN', company: 'ALLEANZA', name: 'Almeglio - Azionario', type: 'FPA', category: 'AZIONARIO', y1: 10.43, y5: 4.23, y10: 3.87 },
  { id: 'ALL_FPA_ALM_BIL', company: 'ALLEANZA', name: 'Almeglio - Bilanciato', type: 'FPA', category: 'BILANCIATO', y1: 4.81, y5: 0.78, y10: 1.37 },
  { id: 'ALL_PIP_PREV_AZN', company: 'ALLEANZA', name: 'Alleata Previdenza - Azionaria', type: 'PIP', category: 'AZIONARIO', y1: 11.66, y5: 5.00, y10: 3.88 },
  { id: 'ALL_PIP_PREV_GAR', company: 'ALLEANZA', name: 'Alleata Previdenza - Garantita', type: 'PIP', category: 'GARANTITO', y1: 1.59, y5: 1.29, y10: 1.54 },

  // --- AMUNDI (FPA - Pagina 1) ---
  { id: 'AM_FPA_SEC_ESP', company: 'AMUNDI', name: 'Secondapensione - Espansione ESG', type: 'FPA', category: 'AZIONARIO', y1: 5.25, y5: 5.02, y10: 5.12 },
  { id: 'AM_FPA_SEC_SVIL', company: 'AMUNDI', name: 'Secondapensione - Sviluppo ESG', type: 'FPA', category: 'BILANCIATO', y1: 3.94, y5: 2.70, y10: 3.48 },
  { id: 'AM_FPA_CORE_90', company: 'AMUNDI', name: 'Core Pension - Azionario Plus 90%', type: 'FPA', category: 'AZIONARIO', y1: 5.11, y5: 4.76, y10: 0.0 },

  // --- ARCA (FPA - Pagina 1) ---
  { id: 'AR_FPA_ALTA', company: 'ARCA', name: 'Previdenza - Alta Crescita Sost.', type: 'FPA', category: 'BILANCIATO', y1: 11.74, y5: 5.30, y10: 4.20 },
  { id: 'AR_FPA_CRES', company: 'ARCA', name: 'Previdenza - Crescita Sost.', type: 'FPA', category: 'BILANCIATO', y1: 7.91, y5: 2.55, y10: 2.70 },

  // --- AXA (PIP & FPA - Pagina 2) ---
  { id: 'AX_PIP_TE_CRES', company: 'AXA MPS', name: 'Previdenza per Te - Crescita', type: 'PIP', category: 'AZIONARIO', y1: 11.57, y5: 5.08, y10: 4.95 },
  { id: 'AX_PIP_ATT_AGG', company: 'AXA MPS', name: 'Previdenza Attiva - Aggressivo', type: 'PIP', category: 'AZIONARIO', y1: 9.66, y5: 4.64, y10: 4.49 },
  { id: 'AX_PIP_PROG_EUR', company: 'AXA MPS', name: 'Progetto Pensione - Europa', type: 'PIP', category: 'AZIONARIO', y1: 5.92, y5: 4.22, y10: 4.39 },

  // --- AZIMUT (FPA - Pagina 2) ---
  { id: 'AZ_FPA_CRES', company: 'AZIMUT', name: 'Azimut Previdenza - Crescita', type: 'FPA', category: 'AZIONARIO', y1: 9.71, y5: 3.96, y10: 2.86 },
  { id: 'AZ_FPA_EQUIL', company: 'AZIMUT', name: 'Azimut Previdenza - Equilibrato', type: 'FPA', category: 'BILANCIATO', y1: 6.41, y5: 2.47, y10: 2.58 },

  // --- BCC (FPA - Pagina 2) ---
  { id: 'BCC_FPA_AUR_AZN', company: 'BCC RISPARMIO', name: 'Aureo - Azionario ESG', type: 'FPA', category: 'AZIONARIO', y1: 14.76, y5: 6.37, y10: 5.43 },
  { id: 'BCC_FPA_AUR_BIL', company: 'BCC RISPARMIO', name: 'Aureo - Bilanciato ESG', type: 'FPA', category: 'BILANCIATO', y1: 7.85, y5: 2.77, y10: 2.83 },

  // --- CNP (PIP & FPA - Pagina 3-4) ---
  { id: 'CNP_PIP_TOP_AZN', company: 'CNP VITA', name: 'CNP Top Pension - Azionario', type: 'PIP', category: 'AZIONARIO', y1: 5.72, y5: 4.77, y10: 4.11 },
  { id: 'CNP_PIP_VAL_AZN', company: 'CNP VITA', name: 'CNP Valore Integrativo - Azionario', type: 'PIP', category: 'AZIONARIO', y1: 5.72, y5: 4.77, y10: 0.0 },
  { id: 'CNP_PIP_UNI_EQU', company: 'CNP VITA', name: 'Unicredit Pensione - Equity', type: 'PIP', category: 'AZIONARIO', y1: 17.34, y5: 6.65, y10: 5.98 },
  { id: 'CNP_PIP_SEN_SPR', company: 'CNP VITA', name: 'Seniorvita - Progetto Sprint', type: 'PIP', category: 'AZIONARIO', y1: 8.02, y5: 2.13, y10: 2.28 },

  // --- CREDEM (FPA & PIP - Pagina 3-5) ---
  { id: 'CR_FPA_AZN', company: 'CREDEMVITA', name: 'Credemprevidenza - Azionario', type: 'FPA', category: 'AZIONARIO', y1: 11.86, y5: 5.96, y10: 5.42 },
  { id: 'CR_PIP_FUT_AZN', company: 'CREDEMVITA', name: 'Futura - Azionario', type: 'PIP', category: 'AZIONARIO', y1: 8.53, y5: 4.65, y10: 0.0 },

  // --- CREDIT AGRICOLE (PIP & FPA - Pagina 5) ---
  { id: 'CA_PIP_PROG_45', company: 'CRÉDIT AGRICOLE', name: 'Progetto Previdenza 2045', type: 'PIP', category: 'BILANCIATO', y1: 7.90, y5: 1.36, y10: 1.94 },
  { id: 'CA_PIP_PIU_AZN', company: 'CRÉDIT AGRICOLE', name: 'Pensione Più - Azionario', type: 'PIP', category: 'AZIONARIO', y1: 8.53, y5: 4.65, y10: 0.0 },

  // --- FIDEURAM (FPA - Pagina 3) ---
  { id: 'FID_FPA_MILL', company: 'FIDEURAM', name: 'Millenials', type: 'FPA', category: 'AZIONARIO', y1: 16.61, y5: 0.0, y10: 0.0 },
  { id: 'FID_FPA_CRES', company: 'FIDEURAM', name: 'Crescita', type: 'FPA', category: 'AZIONARIO', y1: 10.47, y5: 4.69, y10: 4.44 },

  // --- GENERALI (FPA & PIP - Pagina 3-7) ---
  { id: 'GEN_FPA_GLOB_AZN', company: 'GENERALI', name: 'Global - Azionario Globale', type: 'FPA', category: 'AZIONARIO', y1: 9.67, y5: 5.07, y10: 4.45 },
  { id: 'GEN_PIP_AZN_SOST', company: 'GENERALI', name: 'Generali Azione Sostenibile', type: 'PIP', category: 'AZIONARIO', y1: 9.96, y5: 0.0, y10: 0.0 },
  { id: 'GEN_PIP_EV_INT', company: 'GENERALI', name: 'EV Strategia Internazionale', type: 'PIP', category: 'AZIONARIO', y1: 19.03, y5: 9.16, y10: 8.50 },
  { id: 'GEN_PIP_GU_AZN', company: 'GENERALI', name: 'Guardo Avanti - Azionario', type: 'PIP', category: 'AZIONARIO', y1: 17.67, y5: 8.36, y10: 7.89 },

  // --- INTESA SANPAOLO (FPA & PIP - Pagina 4-9) ---
  { id: 'ISP_FPA_GIUST_AZN', company: 'INTESA SP', name: 'Giustiniano - Azionaria', type: 'FPA', category: 'AZIONARIO', y1: 13.76, y5: 6.33, y10: 5.62 },
  { id: 'ISP_FPA_DOM_DYN', company: 'INTESA SP', name: 'Il Mio Domani - Dinamico', type: 'FPA', category: 'BILANCIATO', y1: 5.92, y5: 2.70, y10: 2.85 },
  { id: 'ISP_PIP_PREV_DYN', company: 'INTESA SP', name: 'Previnext - Dynamic', type: 'PIP', category: 'AZIONARIO', y1: 11.15, y5: 3.80, y10: 4.16 },
  { id: 'ISP_PIP_VITA_AZN', company: 'INTESA SP', name: 'Vita&Previdenza - Global Equity', type: 'PIP', category: 'AZIONARIO', y1: 18.77, y5: 8.12, y10: 6.87 },

  // --- MEDIOLANUM (PIP & FPA - Pagina 4-10) ---
  { id: 'MED_FPA_PREV_AZN', company: 'MEDIOLANUM', name: 'Previgest - Azionario', type: 'FPA', category: 'AZIONARIO', y1: 11.41, y5: 5.24, y10: 4.25 },
  { id: 'MED_PIP_CH1_AZN', company: 'MEDIOLANUM', name: 'Challenge Provident Fund 1', type: 'PIP', category: 'AZIONARIO', y1: 15.37, y5: 5.46, y10: 5.27 },
  { id: 'MED_PIP_TAX_AZN', company: 'MEDIOLANUM', name: 'Taxbenefit New - Challenge 1', type: 'PIP', category: 'AZIONARIO', y1: 15.37, y5: 5.46, y10: 5.27 },

  // --- POSTE VITA (PIP - Pagina 10) ---
  { id: 'POSTE_PIP_VAL_DYN', company: 'POSTE VITA', name: 'Postaprevidenza Valore - Dinamico', type: 'PIP', category: 'AZIONARIO', y1: 11.20, y5: 4.90, y10: 4.30 },
  { id: 'POSTE_PIP_FLEX', company: 'POSTE VITA', name: 'Posteprevidenza Flessibile', type: 'PIP', category: 'BILANCIATO', y1: 9.70, y5: 3.09, y10: 0.0 },

  // --- UNIPOL (FPA & PIP - Pagina 5-11) ---
  { id: 'UNI_FPA_AZN', company: 'UNIPOL', name: 'Previdenza FPA - Azionario', type: 'FPA', category: 'AZIONARIO', y1: 8.68, y5: 4.33, y10: 0.0 },
  { id: 'UNI_PIP_GLOB', company: 'UNIPOL', name: 'Previdenza Futura - Previglobale', type: 'PIP', category: 'AZIONARIO', y1: 16.82, y5: 7.29, y10: 0.0 },
  { id: 'UNI_PIP_FUT_PRES', company: 'UNIPOL', name: 'Futuro Presente - Previattiva', type: 'PIP', category: 'GARANTITO', y1: 1.39, y5: 1.34, y10: 1.59 },

  // --- BENCHMARK MEDI COVIP (Dati Rapporto 2024) ---
  { id: 'AVG_FPA_AZN', company: 'MEDIA FPA', name: 'FPA Azionario Nazionale', type: 'BENCH', category: 'AZIONARIO', y1: 10.40, y5: 5.20, y10: 4.70 },
  { id: 'AVG_PIP_AZN', company: 'MEDIA PIP', name: 'PIP Azionario Nazionale', type: 'BENCH', category: 'AZIONARIO', y1: 13.00, y5: 5.50, y10: 4.70 },
  { id: 'TFR_BENCH', company: 'AZIENDA', name: 'Rivalutazione TFR (L. 297)', type: 'BENCH', category: 'GARANTITO', y1: 1.90, y5: 2.40, y10: 2.40 }
];

export const MARKET_INSIGHTS_2025 = {
  INTERNATIONAL_RANKING: [
    { country: 'Danimarca', gdp_pct: 204.0 },
    { country: 'Islanda', gdp_pct: 188.4 },
    { country: 'Svizzera', gdp_pct: 164.8 },
    { country: 'Canada', gdp_pct: 157.6 },
    { country: 'Olanda', gdp_pct: 150.3 },
    { country: 'USA', gdp_pct: 146.9 },
    { country: 'Regno Unito', gdp_pct: 78.0 },
    { country: 'Media OCSE', gdp_pct: 50.0 },
    { country: 'Giappone', gdp_pct: 29.3 },
    { country: 'Italia', gdp_pct: 11.7 },
  ],
  GLOBAL_GIANTS: [
    { name: 'GPIF Giappone', value: 1593, color: '#64748b' },
    { name: 'GPF Norvegia', value: 1585, color: '#94a3b8' },
    { name: 'Sistema Italia', value: 260, color: '#ef4444' }
  ],
  TAXATION_HISTORY: [
    { year: 'Pre-2006', rate: 11.0, label: 'Legge Originale', gov: 'D.Lgs 252/05' },
    { year: '2014', rate: 11.5, label: 'Primo Incremento', gov: 'Gov. Renzi' },
    { year: '2015-Oggi', rate: 20.0, label: 'Standard Fondi', gov: 'Stabilità 2015' },
    { year: '2025', rate: 26.0, label: 'Casse / Fondazioni', gov: 'Massimo Fiscale' }
  ],
  ASSET_DISTRIBUTION: [
    { name: 'Fondi Negoziali', value: 74.6 },
    { name: 'Fondi Aperti', value: 37.3 },
    { name: 'PIP Nuovi', value: 54.7 },
    { name: 'Fondi Preesistenti', value: 69.6 },
    { name: 'PIP Vecchi', value: 7.2 },
  ],
  ITALIAN_PMI_STRUCTURE: {
    MICRO: { pct: 94.91, count: 4427500, employees: 7.704, tfr_accrual: 17.3 },
    SMALL: { pct: 4.44, count: 207126, employees: 3.200, tfr_accrual: 8.5 },
    MEDIUM: { pct: 0.56, count: 26124, employees: 1.000, tfr_accrual: 3.5 },
    LARGE: { pct: 0.09, count: 4400, employees: 4.200, tfr_accrual: 2.0 },
  },
  UE_EMPLOYMENT_COMPARISON: [
    { name: 'Italia', pmi_pct: 60, label: 'Dipendenti in Imprese < 50 addetti' },
    { name: 'Germania', pmi_pct: 41, label: '' },
    { name: 'Francia', pmi_pct: 38, label: '' }
  ],
  MEMBERSHIP_STATS: {
    TOTAL_MEMBERS: 9.953,
    ACTIVE_PAYERS: 7.0,
    NON_PAYERS_COUNT: 2.691,
    NON_PAYERS_PCT: 27.7,
    ANNUAL_CONTRIBUTIONS: 20.5,
    TFR_SHARE_BLN: 8.6,
    TFR_SHARE_PCT: 42
  }
};

export const ANTICIPATION_RULES = [
  {
    reason: "Acquisto o Ristrutturazione 1° Casa",
    fund: "Max 75% dopo 8 anni",
    fundTax: "23% (Fissa)",
    company: "Max 70% dopo 8 anni",
    companyTax: "Aliquota media 5 anni (min 23%)",
    limits: "Fondo: NESSUNO | Azienda: Max 10% aventi diritto"
  },
  {
    reason: "Spese Sanitarie Gravissime",
    fund: "Max 75% SEMPRE (anche subito)",
    fundTax: "15% -> 9% (Agevolata)",
    company: "Max 70% dopo 8 anni",
    companyTax: "Aliquota media 5 anni (min 23%)",
    limits: "Fondo: NESSUNO | Azienda: Max 10% aventi diritto"
  },
  {
    reason: "Altre Esigenze (Senza motivo)",
    fund: "Max 30% dopo 8 anni",
    fundTax: "23% (Fissa)",
    company: "NON PREVISTA",
    companyTax: "-",
    limits: "Fondo: Diritto del lavoratore | Azienda: Impossibile"
  }
];

export const REGULATIONS: RegulationItem[] = [
  { id: '252-05', title: 'D.Lgs. 252/05', category: 'DECRETO', content: 'Normativa quadro sulla previdenza complementare. Definisce la tassazione agevolata al 9-15%.', reference: 'G.U. n. 289/2005' },
  { id: '296-06', title: 'Legge 296/2006', category: 'DECRETO', content: 'Istituzione del Fondo Tesoreria INPS per aziende con >= 50 addetti. Trasforma il TFR in contribuzione obbligatoria.', reference: 'Legge Finanziaria 2007' },
  { id: 'msg-413-20', title: 'Messaggio INPS 413/2020', category: 'CIRCOLARE', content: 'Inibisce il trasferimento del TFR pregresso al fondo pensione per i dipendenti di aziende sopra i 50 addetti.', reference: 'INPS Direzione Centrale' },
  { id: 'art1923cc', title: 'Art. 1923 Codice Civile', category: 'DECRETO', content: 'Impignorabilità e insequestrabilità delle somme dovute dall\'assicuratore.', reference: 'Codice Civile' }
];

export const SIMULATION_CONSTANTS = {
  TFR_DIVISOR: 13.5,
  INPS_CONTRIBUTION_RATE: 0.005,
  COMPANY_REVALUATION_RATE: 0.025, 
  TAX_COMPANY: 0.26,
  TAX_FUND_MIN: 0.09,
};

export const PENSION_COEFFICIENTS = { 
  COMPARISON_AGES: [
    { age: 57, val1996: 4.720, val2025: 4.270, label: 'Pensione Anticipata (Min)' },
    { age: 62, val1996: 5.514, val2025: 4.882, label: 'Uscita Flessibile' },
    { age: 65, val1996: 6.136, val2025: 5.352, label: 'Target Previdenziale' },
    { age: 67, val1996: 6.612, val2025: 5.723, label: 'Vecchiaia Ordinaria' },
    { age: 70, val1996: 7.540, val2025: 6.315, label: 'Proroga Attività' }
  ],
  HISTORY_AGE_65: [
    { period: '1996-2009', value: 6.136 },
    { period: '2010-2012', value: 5.620 },
    { period: '2013-2015', value: 5.435 },
    { period: '2016-2018', value: 5.426 },
    { period: '2019-2020', value: 5.245 },
    { period: '2021-2022', value: 5.220 },
    { period: '2023-2025', value: 5.352 }
  ],
  FULL_DM_TABLE_2025: [
    { age: 57, coeff: 4.270 },
    { age: 58, coeff: 4.378 },
    { age: 59, coeff: 4.493 },
    { age: 60, coeff: 4.615 },
    { age: 61, coeff: 4.744 },
    { age: 62, coeff: 4.882 },
    { age: 63, coeff: 5.028 },
    { age: 64, coeff: 5.184 },
    { age: 65, coeff: 5.352 },
    { age: 66, coeff: 5.531 },
    { age: 67, coeff: 5.723 },
    { age: 68, coeff: 5.931 },
    { age: 69, coeff: 6.154 },
    { age: 70, coeff: 6.396 },
    { age: 71, coeff: 6.657 },
  ]
};

export const CORPORATE_CONSTANTS = {
  IRES_RATE: 0.24,
  GUARANTEE_FUND_REDUCTION: 0.002,
  SOCIAL_ONER_REDUCTION: 0.0028,
};

export const ZURICH_PRODUCT_DATA = {
  USP: [
    { title: "Gestione Multiramo", desc: "Mix tra stabilità della Gestione Separata e spinta dei fondi Unit-Linked.", icon: "PieChart", color: "bg-indigo-50" },
    { title: "Opzione LTC", desc: "Raddoppio automatico della rendita in caso di perdita di autosufficienza.", icon: "ShieldPlus", color: "bg-purple-50" },
    { title: "Protezione Decesso", desc: "Bonus 1% del capitale e esenzione imposta successione.", icon: "UserCheck", color: "bg-blue-50" },
    { title: "Flessibilità", desc: "Versamenti liberi, riscatti e anticipazioni veloci.", icon: "Wallet", color: "bg-green-50" }
  ],
  COSTS: {
    loading_recurring: "0% - 3%",
  },
  FUNDS_DETAILS: [
    { id: 'Z_AZIONARIO', name: 'Pension ESG Azionario', strategy: 'Investimento Globale ESG', risk: 'Alto', cost: '2,10%', perf2024: '+15,37%', returns: { y3: '4.66%', y5: '7.15%', y10: '6.43%' }, composition: { equity: 95, debt: 5 } },
    { id: 'Z_FLEX8', name: 'Pension ESG Flex 8', strategy: 'Bilanciato Dinamico', risk: 'Medio', cost: '1,80%', perf2024: '+7,82%', returns: { y3: '-1.37%', y5: '0.75%', y10: '1.83%' }, composition: { equity: 60, debt: 40 } },
    { id: 'Z_GS', name: 'Gestione Separata Trend', strategy: 'Garantito/Stabile', risk: 'Basso', cost: '1,10%', perf2024: '+2,87%', returns: { y3: '2.50%', y5: '2.20%', y10: '2.50%' }, composition: { equity: 0, debt: 100 } }
  ],
  LIFE_CYCLE_SERIES: [
    { age: 30, gs: 0, flex4: 0, flex8: 20, azionario: 80 },
    { age: 40, gs: 10, flex4: 10, flex8: 30, azionario: 50 },
    { age: 50, gs: 40, flex4: 20, flex8: 20, azionario: 20 },
    { age: 60, gs: 70, flex4: 20, flex8: 10, azionario: 0 },
    { age: 67, gs: 90, flex4: 10, flex8: 0, azionario: 0 }
  ]
};

export const ANIMA_PRODUCT_DATA = {
  USP: [
    { title: "Efficienza Costi", desc: "Tra i più bassi ISC del mercato per i fondi aperti.", icon: "PieChart", color: "bg-red-50" },
    { title: "Garanzia Capitale", desc: "Linee con restituzione garantita del versato.", icon: "ShieldCheck", color: "bg-emerald-50" },
    { title: "Focus ESG", desc: "Investimenti sostenibili certificati SFDR Art. 8.", icon: "Leaf", color: "bg-green-50" },
    { title: "Servizio Partner", desc: "Retrocessioni trasparenti per i professionisti.", icon: "HeartHandshake", color: "bg-blue-50" }
  ],
  FUNDS_DETAILS: [
    { id: 'A_AZIONARIO', name: 'Arti & Mestieri - Crescita 25+', strategy: 'Azionario 100%', cost: '1,35%', perf2024: '+13,66%', returns: { y3: '3.69%', y5: '6.79%', y10: '6.00%' }, composition: { equity: 95, debt: 5 } },
    { id: 'A_BILANCIATO', name: 'Arti & Mestieri - Rivalutazione 10+', strategy: 'Bilanciato', cost: '1,20%', perf2024: '+7,44%', returns: { y3: '0.04%', y5: '2.30%', y10: '2.76%' }, composition: { equity: 50, debt: 50 } },
    { id: 'A_GARANTITO', name: 'Arti & Mestieri - Garanzia 1+', strategy: 'Garantito', cost: '0,90%', perf2024: '+2,76%', returns: { y3: '1.35%', y5: '0.55%', y10: '0.06%' }, composition: { equity: 0, debt: 100 } }
  ],
  COSTS: {
    entry: '0 €',
    annual: '20 €',
    rita: '30 €',
    switch: '10 €',
    transfer: '0 €',
    loading: '0%'
  }
};

export const COMPANY_BENCHMARKS = [
  { id: 'jpmGlobal', name: 'JPM Global Bond' },
  { id: 'ftseMib', name: 'FTSE MIB' },
  { id: 'inflation', name: 'Inflazione ISTAT' }
];

export const HISTORICAL_DATA_20Y = [
  { year: 2000, inflation: 2.5, tfrRate: 3.37, ftseMib: -12.0, jpmGlobal: 8.5, event: 'Bolla Dot-com' },
  { year: 2001, inflation: 2.7, tfrRate: 3.52, ftseMib: -25.0, jpmGlobal: 5.2, event: 'Torri Gemelle' },
  { year: 2002, inflation: 2.4, tfrRate: 3.30, ftseMib: -23.0, jpmGlobal: 3.1, event: 'Crollo Mercati' },
  { year: 2003, inflation: 2.6, tfrRate: 3.45, ftseMib: 14.0, jpmGlobal: 4.5, event: 'Ripresa Iraq' },
  { year: 2004, inflation: 2.1, tfrRate: 3.07, ftseMib: 16.0, jpmGlobal: 6.2, event: 'Espansione UE' },
  { year: 2005, inflation: 1.9, tfrRate: 2.92, ftseMib: 15.0, jpmGlobal: 4.8, event: 'Petrolio in rialzo' },
  { year: 2006, inflation: 2.0, tfrRate: 3.00, ftseMib: 18.0, jpmGlobal: 2.5, event: 'Riforma TFR 252/05' },
  { year: 2007, inflation: 1.7, tfrRate: 2.77, ftseMib: -7.0, jpmGlobal: 4.1, event: 'Crisi Subprime' },
  { year: 2008, inflation: 3.3, tfrRate: 3.97, ftseMib: -48.0, jpmGlobal: -5.5, event: 'Lehman Brothers' },
  { year: 2009, inflation: 0.8, tfrRate: 2.10, ftseMib: 23.0, jpmGlobal: 10.2, event: 'QE Federal Reserve' },
  { year: 2010, inflation: 1.5, tfrRate: 2.62, ftseMib: -13.0, jpmGlobal: 5.5, event: 'Debito Sovrano' },
  { year: 2011, inflation: 2.8, tfrRate: 3.60, ftseMib: -25.0, jpmGlobal: 3.2, event: 'Crisi Spread' },
  { year: 2012, inflation: 3.0, tfrRate: 3.75, ftseMib: 10.0, jpmGlobal: 8.5, event: "Whatever it takes" },
  { year: 2013, inflation: 1.2, tfrRate: 2.40, ftseMib: 16.0, jpmGlobal: 4.1, event: 'Fine recessione' },
  { year: 2014, inflation: 0.2, tfrRate: 1.65, ftseMib: 0.0, jpmGlobal: 10.5, event: 'Deflazione UE' },
  { year: 2015, inflation: 0.1, tfrRate: 1.57, ftseMib: 14.0, jpmGlobal: 3.2, event: 'Accordo Parigi' },
  { year: 2016, inflation: -0.1, tfrRate: 1.50, ftseMib: -10.0, jpmGlobal: 4.8, event: 'Brexit / Trump' },
  { year: 2017, inflation: 1.1, tfrRate: 2.32, ftseMib: 16.0, jpmGlobal: 2.1, event: 'Crescita Sincronizzata' },
  { year: 2018, inflation: 1.1, tfrRate: 2.32, ftseMib: -15.0, jpmGlobal: -1.2, event: 'Guerre Commerciali' },
  { year: 2019, inflation: 0.6, tfrRate: 1.95, ftseMib: 28.0, jpmGlobal: 12.5, event: 'Tassi negativi' },
  { year: 2020, inflation: -0.1, tfrRate: 1.50, ftseMib: -5.0, jpmGlobal: 8.2, event: 'Pandemia COVID-19' },
  { year: 2021, inflation: 1.9, tfrRate: 2.92, ftseMib: 23.0, jpmGlobal: 4.5, event: 'Riaperture' },
  { year: 2022, inflation: 8.1, tfrRate: 7.57, ftseMib: -12.0, jpmGlobal: -14.0, event: 'Guerra Ucraina' },
  { year: 2023, inflation: 5.7, tfrRate: 5.77, ftseMib: 28.0, jpmGlobal: 6.5, event: 'Intelligenza Artificiale' },
  { year: 2024, inflation: 1.2, tfrRate: 2.40, ftseMib: 15.0, jpmGlobal: 5.5, event: 'Normalizzazione' }
];

export const ZURICH_REGULATION_DATA = [
  { art: "Art. 2", category: "PRESTAZIONI", content: "Liquidazione in caso di decesso." },
  { art: "Art. 22", category: "PRESTAZIONI", content: "Opzioni di rendita vitalizia." },
  { art: "Art. 11", category: "COSTI", content: "Deducibilità e tassazione agevolata." },
  { art: "Art. 12", category: "SUCCESSIONE", content: "Esenzione imposta successione." }
];

export const ZURICH_REMUNERATION_DATA = {
  EDITION: "2025",
  SALES_PAYOUT: [
    { tier: "0-1M", rate: 0.70 },
    { tier: "1-5M", rate: 0.75 },
    { tier: "5-10M", rate: 0.80 },
    { tier: ">10M", rate: 0.875 }
  ],
  MANAGEMENT_PAYOUT: [
    { tier: "0-1M", rate: 0.20 },
    { tier: "1-5M", rate: 0.25 },
    { tier: "5-10M", rate: 0.30 },
    { tier: ">10M", rate: 0.50 }
  ],
  RETROCESSIONS_ZB: {
    RECURRING_WITH_LTC: 0.80,
    RECURRING_NO_LTC: 0.75,
    ADDITIONAL: 0.04,
    TRANSFER_TFR: 0.05
  }
};

export const TFM_CONSTANTS = {
  DEFAULT_RAL_ADMIN: 80000,
};

export const LTC_DATA = {
  INDENNITA_ACCOMPAGNAMENTO_2025: 531.76,
  ZURICH_OPTION_F_MULTIPLIER: 2,
};

export const LTC_MARKET_INSIGHTS = {
  AVG_MONTHLY_FAMILY_EXPENSE: 3000,
};

export const SUCCESSION_DATA = {
  TAX_RATES: {
    SPOUSE_CHILDREN: { label: 'Coniuge e Parenti in linea retta', rate: 0.04, exemption: 1000000 },
    SIBLINGS: { label: 'Fratelli e Sorelle', rate: 0.06, exemption: 100000 },
    OTHERS_TO_4TH: { label: 'Parenti fino al 4° grado', rate: 0.06, exemption: 0 },
    OTHERS: { label: 'Altri soggetti', rate: 0.08, exemption: 0 },
  },
  TIMING_DATA: [
    { asset: "C/C BANCARIO", time: "3-6 mesi", liquidity: "Bloccata", bottleneck: "Atto di notorietà", risk: "Liquidità congelata" },
    { asset: "IMMOBILI", time: "12-24 mesi", liquidity: "Illiquida", bottleneck: "Mercato immobiliare", risk: "Svendita forzata" },
    { asset: "MULTINVEST", time: "25 giorni", liquidity: "Immediata", bottleneck: "Burocrazia zero", risk: "Nessuno" },
    { asset: "FONDO PENSIONE", time: "30 giorni", liquidity: "Immediata", bottleneck: "Successione", risk: "Nessuno" }
  ],
  LEGAL_PILLARS: [
    { tag: "GIURIDICO", focus: "Art. 1923", ref: "Codice Civile", text: "Somme inattaccabili dai creditori." },
    { tag: "FISCALE", focus: "Art. 12", ref: "D.Lgs 346/90", text: "Esclusione attivo ereditario." },
    { tag: "PATRIMONIALE", focus: "Cassazione", ref: "11421/21", text: "Natura previdenziale prevalente." }
  ]
};

export const ZURICH_SMART_CONSTANTS = {
  TARGET_ADVISORY: [
    { title: "Genitori", hook: "Proteggi i tuoi figli", need: "Protezione reddito familiare" },
    { title: "Professionisti", hook: "Non fermare la tua attività", need: "Indennizzo lesioni rapido" }
  ],
  INJURIES: [
    { name: "Frattura Femore", category: "Ossa", level: 2, amount: 7500 },
    { name: "Perdita Occhio", category: "Vista", level: 3, amount: 15000 },
    { name: "Ustioni III Grado", category: "Pelle", level: 4, amount: 25000 }
  ],
  PRICING_TABLE_100K: {
    NON_SMOKER: [
      { age: 30, y5: 80, y10: 100, y15: 120, y20: 150 },
      { age: 40, y5: 120, y10: 150, y15: 180, y20: 220 },
      { age: 50, y5: 200, y10: 250, y15: 300, y20: 380 }
    ],
    SMOKER: [
      { age: 30, y5: 120, y10: 150, y15: 180, y20: 220 },
      { age: 40, y5: 180, y10: 220, y15: 280, y20: 350 },
      { age: 50, y5: 300, y10: 380, y15: 450, y20: 550 }
    ]
  },
  EXCLUSIONS: {
    TCM_SPECIFIC: [{ title: "Suicidio", desc: "Non coperto nei primi 2 anni." }],
    GENERAL: [{ title: "Guerra", desc: "Esclusione standard." }],
    SPORTS: ["Boxe", "Paracadutismo"]
  }
};

export const ZURICH_SMART_TECHNICAL_DATA = {
  ACCUMULATION_LIMITS: [
    { maxAge: 50, limit: 300000 },
    { maxAge: 65, limit: 200000 }
  ],
  WAITING_PERIOD: {
    EXCEPTIONS_DISEASES: ["Infarto", "Ictus"]
  }
};

export const ZURICH_SMART_COMMISSION_DATA = {
  FIXED_PRACTICE_COST: 40,
  PAYIN_RATES: {
    DUR_5Y: 0.40,
    DUR_10_15_20Y: 0.80,
    RECURRING_AFTER_Y1: 0.10
  },
  FIXED_PAYOUT: {
    NEW_BUSINESS: 0.875,
    RECURRING: 0.50
  }
};

export const ZURICH_MULTINVEST_DATA = {
  FEE_STRUCTURE: {
    A: { label: "Classe A", min: 50000, gs: 0.015, line: 0.025 },
    B: { label: "Classe B", min: 100000, gs: 0.012, line: 0.020 },
    C: { label: "Classe C", min: 500000, gs: 0.009, line: 0.015 }
  }
};

export const ASSET_PROTECTION_DATA = {
  STRESS_TEST_SCENARIOS: {
    CIVILE: { title: "Aggressione Civile", legal_ref: "Art. 1923", bank: 0, policy_standard: 50, policy_90gs: 90, pip: 100 },
    FALLIMENTARE: { title: "Liquidazione Giudiziale", legal_ref: "Art. 150 CCII", bank: 0, policy_standard: 30, policy_90gs: 80, pip: 100 }
  },
  COMPARISON_MATRIX: [
    { asset: "C/C", shield: "NULLO", risk: "ALTO", detail: "Pignorabile subito." },
    { asset: "Fondo Pensione", shield: "MASSIMO", risk: "MINIMO", detail: "Scudo Costituzionale." }
  ],
  JURISPRUDENCE_CORNER: [
    { id: 1, title: "Sentenza 11421/21", focus: "Protezione", text: "Natura previdenziale prevalente.", impact: "Alta" }
  ]
};

export const PROTECTION_PARADOX_DATA = {
  PIL_PROTECTION: { italy: 1.9, oecd_avg: 5.1 },
  HEALTH_OUT_OF_POCKET: { italy: 22, oecd_avg: 15 },
  PROFILES: {
    SMALL: { tag: 'Piccoli Patrimoni', focus: 'Rischio di azzeramento', risk_economic: 'Crollo tenore di vita', risk_health: 'Impossibilità di cura privata', risk_legacy: 'Eredità negativa per i figli' },
    LARGE: { tag: 'Grandi Patrimoni', focus: 'Rischio di erosione', risk_economic: 'Vendita forzata asset illiquidi', risk_health: 'Costi RSA di lusso (5k+/mese)', risk_legacy: 'Tassa di successione senza liquidità' }
  }
};
