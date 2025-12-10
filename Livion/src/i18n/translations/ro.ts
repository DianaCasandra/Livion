/**
 * Romanian translations
 */

import type { TranslationKeys } from './en';

export const ro: TranslationKeys = {
  // Common
  common: {
    continue: 'Continuă',
    back: 'Înapoi',
    yes: 'Da',
    no: 'Nu',
    cancel: 'Anulează',
    save: 'Salvează',
    done: 'Gata',
    loading: 'Se încarcă...',
    error: 'Eroare',
    success: 'Succes',
    connected: 'Conectat',
    search: 'Caută',
  },

  // Welcome Screen
  welcome: {
    tagline: 'Povestea ta de sănătate. A ta de împărtășit.',
    privacyLink: 'Promisiunea Utilizatorului & Explicator Confidențialitate',
    getStarted: 'Începe',
  },

  // Register Screen
  register: {
    title: 'Înregistrare Pacient',
    subtitle: 'Creează-ți contul Livion. Datele tale sunt criptate și securizate.',
    emailPhone: 'Email / Telefon',
    setPassword: 'Setează o Parolă',
    confirmPassword: 'Confirmă Parola',
    bankId: 'Bank ID (opțional)',
    footer: 'Continuând, ești de acord cu politica de utilizare a datelor Livion.',
  },

  // Consent Screen
  consent: {
    title: 'Consimțământ & Preferințe',
    subtitle: 'Ajustează ce vrei ca Livion să folosească sau să acceseze. Poți modifica oricând.',
    dataSources: 'Surse de Date',
    wearables: 'Dispozitive Purtabile',
    ehr: 'Dosar Electronic de Sănătate',
    sharingScopesTitle: 'Domenii de Partajare',
    private: 'Privat',
    circle: 'Cerc',
    clinician: 'Clinician',
    researchOptIn: 'Participare la cercetare',
    purposeBinding: 'Legare de scop & minimizare date',
    disclaimer: 'Poți ajusta toate setările de consimțământ mai târziu din profilul tău.',
  },

  // Data Connections Screen
  dataConnections: {
    title: 'Conexiuni de Date',
    subtitle: 'Sincronizează dispozitivele purtabile și senzorii pentru a alimenta perspectivele tale de îngrijire.',
    connectDevices: 'Conectează-ți dispozitivele',
    devices: {
      appleHealth: {
        name: 'Apple Health',
        hint: 'Pași • Ritm Cardiac • Somn • Activitate',
      },
      googleFit: {
        name: 'Google Fit',
        hint: 'Pași • RC • Mobilitate',
      },
      glucoseMonitor: {
        name: 'Monitor de Glucoză',
        hint: 'Tendință CGM • Sincronizare rapidă',
      },
      otherBluetooth: {
        name: 'Alte dispozitive Bluetooth',
        hint: 'Vom căuta automat senzorii din apropiere',
      },
    },
    connect: 'Conectează',
  },

  // Risk Assessment Screen
  risk: {
    title: 'Evaluare Rapidă a Riscului',
    subtitle: 'Te rugăm să completezi următoarele întrebări de triaj privind simptomele tale actuale. Vom examina starea ta ca punct de plecare în călătoria ta spre sănătate.',
    questions: [
      'Ai dureri de cap severe zilnic?',
      'Ai avut episoade de amețeală sau leșin?',
      'Simți durere sau presiune în piept?',
      'Ai dificultăți de respirație persistente?',
      'Observi umflături neobișnuite la picioare sau glezne?',
    ],
    seekCare: 'Solicită Îngrijire',
    seekCareMessage: 'Pe baza răspunsurilor tale, se recomandă să contactezi imediat furnizorul tău de servicii medicale. Pentru urgențe, sună:',
    emergencyNumber: '- 112 (UE)',
    finishAssessment: 'Finalizează Evaluarea',
  },

  // User Promise Screen
  userPromise: {
    title: 'Manifestul "Promisiunea Utilizatorului" LIVION',
    manifesto: {
      item1Bold: '1. Nu ești doar un punct de date.',
      item1Text: ' Ești o poveste — plină de zile, pauze și reînceperi. Livion ascultă, nu doar măsoară.',
      item2Bold: '2. Protejăm ce este al tău.',
      item2Text: ' Datele tale sunt private implicit. Nu le vom vinde sau schimba niciodată. Tu alegi ce să împărtășești.',
      item3Bold: '3. Pașii mici contează.',
      item3Text: ' Sănătatea nu este o cursă. Momentele mici contează — Livion te ajută să le observi.',
      item4Bold: '4. Călătoria ta este unică.',
      item4Text: ' IA noastră se adaptează la tine, nu te judecă niciodată.',
      item5Bold: '5. Faci parte din ceva mai mare.',
      item5Text: ' Fiecare alegere contribuie la o misiune de comunități mai puternice și îngrijire onestă.',
      item6Bold: '6. Toată lumea aparține.',
      item6Text: ' Diversitatea este fundația noastră.',
      item7Bold: '7. Conexiunea înseamnă îngrijire.',
      item7Text: ' Vindecarea crește prin progres împărtășit.',
      item8Bold: '8. Conducem cu claritate.',
      item8Text: ' Transparența înseamnă îngrijire.',
      item9Bold: '9. Progresul se simte bine.',
      item9Text: ' Proiectăm pentru bucurie, nu pentru vinovăție.',
      item10Bold: '10. Odihna este și ea progres.',
      item10Text: ' A nu face nimic poate fi sănătos.',
      item11Bold: '11. Vocea ta modelează Livion.',
      item11Text: ' Construim asta împreună cu tine.',
      item12Bold: '12. Țintim spre schimbare durabilă.',
      item12Text: ' Dincolo de ecrane — bine real.',
      item13Bold: '13. Sănătatea este speranță.',
      item13Text: ' Fiecare atingere este spre bunăstare colectivă.',
    },
    privacyExplainer: 'Explicator Confidențialitate',
    privacyPlaceholder1: 'Acesta este text substitut pentru un viitor explicator de confidențialitate în limbaj simplu...',
    privacyPlaceholder2: 'Aici vom clarifica ce rămâne pe dispozitiv, cum funcționează criptarea...',
  },

  // Home Tab / Dashboard
  home: {
    greetings: {
      morning: 'Bună dimineața',
      afternoon: 'Bună ziua',
      evening: 'Bună seara',
    },
    healthStatus: 'Ești într-o formă bună',
    tapToSee: 'Atinge pentru a vedea detaliile',
    dayAtGlance: 'Ziua ta dintr-o privire',
    steps: 'pași',
    ofGoal: 'din obiectiv',
    bpm: 'bpm',
    resting: 'în repaus',
    goodSleep: 'somn bun',
    howFeeling: 'Cum te simți?',
    moodLogged: 'Dispoziție înregistrată!',
    tapToLog: 'Atinge pentru a înregistra dispoziția',
    moods: {
      great: 'Excelent',
      okay: 'Bine',
      low: 'Scăzut',
      rough: 'Dificil',
    },
    todaysPlan: 'Planul de azi',
    allDone: 'Totul gata!',
    ofDone: 'din',
    done: 'făcute',
    greatJob: 'Foarte bine!',
    completedAllTasks: 'Ai completat toate sarcinile pentru azi',
    completedAt: 'Completat la',
    insightsForYou: 'Perspective pentru tine',
    new: 'NOU',
    seeDetails: 'Vezi detalii',
    learnMore: 'Află mai mult',
    insights: {
      eveningReadings: 'Citirile de seară s-au îmbunătățit',
      eveningReadingsBody: 'Tensiunea arterială a avut tendință de scădere în ultimele 3 seri. Continuă tot așa!',
      breathingSteady: 'Respirația arată stabilă',
      breathingSteadyBody: 'Rata respiratorie a rămas în intervalul normal toată săptămâna.',
    },
    tasks: {
      morningBloodPressure: 'Tensiune arterială dimineața',
      beforeMorning: 'Înainte de 9:00',
      tenMinuteWalk: 'Plimbare de 10 minute',
      beforeAfternoon: 'Înainte de 15:00',
      eveningCheckIn: 'Verificare de seară',
      beforeEvening: 'Înainte de 22:00',
    },
  },

  // Side Menu
  menu: {
    myProfile: 'Profilul Meu',
    labResults: 'Rezultate Lab & Glosar',
    myDoctors: 'Doctorii Mei',
    settings: 'Setări',
    helpSupport: 'Ajutor & Asistență',
    language: 'Limbă',
    logOut: 'Deconectare',
  },

  // Language
  language: {
    title: 'Limbă',
    english: 'English',
    romanian: 'Română',
  },

  // Support Modal
  support: {
    title: 'Suntem aici pentru tine',
    subtitle: 'Este în regulă să ai zile dificile. Dorești să contactezi echipa ta de îngrijire?',
    callDoctor: 'Sună pe Dr. Diana',
    familyPhysician: 'Medic de Familie',
    sendMessage: 'Trimite un mesaj',
    responseTime: 'Primești răspuns în 24h',
    okayForNow: 'Sunt bine deocamdată',
  },

  // Lab Results Screen
  labs: {
    title: 'Rezultate Laborator',
    subtitle: 'Vezi analizele de sânge și rezultatele testelor recente',
    totalReports: 'Total Rapoarte',
    allNormal: 'Toate Normale',
    needReview: 'Necesită Revizuire',
    recentResults: 'Rezultate Recente',
    tests: 'teste',
    flagged: 'Semnalate',
    normal: 'Normal',
    testResults: 'Rezultate Teste',
    tapToSeeDetails: 'Apasă pe orice rezultat pentru detalii',
    normalRange: 'Interval Normal',
    referenceRange: 'Interval de Referință',
    disclaimer: 'Aceste rezultate ar trebui revizuite cu medicul dumneavoastră. Valorile semnalate pot necesita urmărire.',
    // Lab result sets
    resultSets: {
      cbc: 'Hemoleucogramă Completă',
      cbcSub: 'HLG cu Formulă Leucocitară',
      metabolic: 'Panou Metabolic',
      metabolicSub: 'Panou Metabolic Complet',
      lipid: 'Profil Lipidic',
      lipidSub: 'Colesterol și Trigliceride',
      thyroid: 'Panou Tiroidian',
      thyroidSub: 'TSH, T3, T4',
      vitamin: 'Panou Vitamine și Minerale',
      vitaminSub: 'Vitamina D, B12, Fier',
    },
    providers: {
      cityMedical: 'Laboratorul Medical Central',
      healthFirst: 'Laboratoare SănătatePrima',
    },
    // Test descriptions
    descriptions: {
      altElevated: 'Ușor crescut - poate indica stres hepatic',
      astElevated: 'Ușor crescut - monitorizare cu urmărire',
      cholesterolHigh: 'Considerați modificări dietetice',
      hdlGood: 'Colesterol bun - mai mare este mai bine',
      ldlOptimal: 'Optim: sub 100',
      vitDLow: 'Considerați suplimentare',
      b12Low: 'Sub intervalul optim',
      ironLow: 'Ușor sub normal',
    },
  },

  // Care Plan Tab
  carePlan: {
    title: 'Plan de Îngrijire',
    aiInsights: 'Perspective AI Sănătate',
    aiSubtitle: 'Sfaturi pentru prevenție și bunăstare',
    yourCareTeam: 'Echipa Ta de Îngrijire',
    all: 'Toate',
    allTasks: 'Toate Sarcinile',
    complete: 'completat',
    allDone: 'Totul gata!',
    noTasksFromDoctor: 'Nicio sarcină de la acest doctor',
    tasks: {
      bloodPressureCheck: 'Verificare tensiune arterială',
      takeHeartMedication: 'Ia medicamentele pentru inimă',
      morningWalk: 'Plimbare de 15 min dimineața',
      cognitiveExercises: 'Exerciții cognitive',
      stretchingRoutine: 'Rutină de stretching',
      eyeDrops: 'Picături pentru ochi',
      eveningBPReading: 'Măsurare tensiune seara',
      sleepMeditation: 'Meditație pentru somn',
    },
    doctors: {
      familyMedicine: 'Medicină de Familie',
      cardiology: 'Cardiologie',
      neurology: 'Neurologie',
      orthopedics: 'Ortopedie',
      ophthalmology: 'Oftalmologie',
    },
  },

  // AI Insights Modal
  aiInsights: {
    title: 'Perspective AI',
    personalizedForYou: 'Personalizat pentru tine',
    healthScore: 'Scor Sănătate',
    heartHealth: 'Sănătatea Inimii',
    lifestyle: 'Stil de Viață',
    good: 'Bun',
    active: 'Activ',
    aiBannerText: 'Pe baza datelor tale, concentrează-te pe sănătatea inimii și menținerea activă în această săptămână.',
    insights: 'perspective',
    disclaimer: 'Perspectivele sunt sugestii generate de AI, nu sfaturi medicale.',
    categories: {
      prevention: 'Prevenție',
      heart: 'Sănătatea Inimii',
      activity: 'Activitate',
      mental: 'Bunăstare Mentală',
      nutrition: 'Nutriție',
    },
    prevention: {
      stayActive: 'Rămâi Activ',
      stayActiveDesc: '30 min de mers zilnic reduce riscul cardiac cu 35%',
      sleepQuality: 'Calitatea Somnului',
      sleepQualityDesc: '7-8 ore îmbunătățesc funcția imunitară',
    },
    heart: {
      bloodPressure: 'Tensiune Arterială',
      bloodPressureDesc: 'Măsurătorile tale arată îmbunătățiri săptămâna aceasta',
      restingHeartRate: 'Puls în Repaus',
      restingHeartRateDesc: 'În scădere - progres excelent!',
    },
    activity: {
      stepGoal: 'Obiectiv de Pași',
      stepGoalDesc: 'Ai în medie 7.500 de pași zilnic',
      activeMinutes: 'Minute Active',
      activeMinutesDesc: '45 min mai mult decât săptămâna trecută',
    },
    mental: {
      stressLevels: 'Niveluri de Stres',
      stressLevelsDesc: 'Ia în considerare exerciții de respirație de 5 min',
      moodTracking: 'Urmărirea Dispoziției',
      moodTrackingDesc: 'Înregistrarea constantă ajută la identificarea tiparelor',
    },
    nutrition: {
      hydration: 'Hidratare',
      hydrationDesc: 'Țintește 8 pahare de apă zilnic',
      balancedDiet: 'Dietă Echilibrată',
      balancedDietDesc: 'Adaugă mai multe legume cu frunze verzi săptămâna aceasta',
    },
  },

  // Symptoms Tab
  symptoms: {
    title: 'Îngrijirea Mea',
    subtitle: 'Conectează-te cu medicul tău',
    familyPhysician: 'Medic de Familie',
    symptomsLog: 'Jurnal Simptome',
    logForDoctor: 'ÎNREGISTREAZĂ SIMPTOME PENTRU DOCTOR',
    describeSymptoms: 'Descrie-ți simptomele',
    symptomsPlaceholder: 'Ce simptome ai?',
    painLevel: 'Nivel de durere sau disconfort',
    noPain: 'Fără durere',
    severe: 'Severă',
    criticalLevel: 'Nivel critic - Ia în considerare îngrijire imediată',
    elevatedLevel: 'Nivel ridicat - Doctorul tău va fi notificat',
    additionalNotes: 'Note suplimentare pentru',
    notesPlaceholder: 'Alte detalii pe care doctorul ar trebui să le știe?',
    sendToDoctor: 'Trimite la Doctor',
    symptomsShared: 'Simptomele tale vor fi partajate în siguranță cu',
    forEmergencies: 'Pentru urgențe, sună 112.',
    recentEntries: 'Înregistrări Recente',
    seeAll: 'Vezi toate',
    loggedAt: 'Înregistrat la',
    thisWeek: 'Săptămâna Aceasta',
    entriesLogged: 'Înregistrări',
    avgPainLevel: 'Nivel mediu durere',
    improving: 'În îmbunătățire',
    officeHours: 'Program Cabinet',
    emergencyContact: 'Contact Urgență',
    emergencyText: 'Pentru urgențe în afara programului, vă rugăm să sunați la numărul principal. Pentru urgențe care pun viața în pericol, sunați 112.',
    quickTip: 'Sfat Rapid',
    quickTipText: 'Înregistrează-ți simptomele regulat pentru a ajuta pe',
    quickTipText2: 'să urmărească progresul sănătății tale și să ofere îngrijire mai bună în timpul consultațiilor.',
    logSymptomsNow: 'Înregistrează simptome acum',
    call: 'Sună',
    message: 'Mesaj',
    chat: 'Chat',
    schedule: 'Programare',
    next: 'Următorul',
    history: {
      today: 'Azi',
      yesterday: 'Ieri',
      entry1Symptoms: 'Oboseală ușoară, durere de cap ușoară',
      entry1Notes: 'Mai bine după odihnă',
      entry2Symptoms: 'Tensiune musculară în umeri',
      entry3Date: '5 Oct',
      entry3Symptoms: 'Oboseală generală',
      entry3Notes: 'Zi bună în general',
    },
  },

  // Peer Circles Tab
  peerCircles: {
    title: 'Cercuri de Colegi',
    subtitle: 'Conectează-te cu alții pe drumuri similare',
    yourCircles: 'Cercurile Tale',
    discoverCircles: 'Descoperă Cercuri',
    members: 'membri',
    activeNow: 'activi acum',
    join: 'Alătură-te',
    joined: 'Înscris',
    newPosts: 'postări noi',
    peerSupportCircle: 'Cerc de Suport între Colegi',
    moderatedSpace: 'Un spațiu moderat pentru a împărtăși experiențe. Aceasta nu înlocuiește sfatul medical.',
    postAnonymously: 'Postează anonim',
    identityHidden: 'Identitatea ta este ascunsă de colegi',
    sharePlaceholder: 'Împărtășește o noutate cu cercul tău...',
    post: 'Postează',
    recentPosts: 'Postări Recente',
    moderationNotice: 'Postările sunt revizuite pentru siguranță. Conținutul neadecvat va fi eliminat.',
    anonymous: 'Anonim',
    supportCircle: 'Cercul de Suport',
    posts: {
      post1: 'Astăzi am reușit în sfârșit să-mi ating obiectivul de pași trei zile la rând. Victoriile mici contează!',
      post1Meta: 'Activitate - acum 2h',
      post2: 'Am găsit un articol util despre gestionarea tensiunii arteriale de seară. Sunt bucuros să îl împărtășesc dacă cineva este interesat.',
      post2Meta: 'Educație - acum 5h',
      post3: 'Cum au decurs controalele voastre în această săptămână? Împărtășiți o actualizare rapidă ca alții să știe că nu sunt singuri.',
      post3Meta: 'Întrebare - azi',
      post4: 'Prima săptămână înapoi la mersul regulat după procedura mea. Merg încet dar mă simt optimist.',
      post4Meta: 'Recuperare - acum 1zi',
      post5: 'Altcineva găsește util să-și urmărească mesele? Am început un jurnal alimentar simplu și mi-a deschis ochii.',
      post5Meta: 'Nutriție - acum 2zile',
    },
    categories: {
      heartHealth: 'Sănătatea Inimii',
      diabetes: 'Suport Diabet',
      mentalWellness: 'Bunăstare Mentală',
      chronicPain: 'Durere Cronică',
      nutrition: 'Nutriție & Dietă',
      fitness: 'Călătorie Fitness',
    },
  },

  // Chat Popup Modal
  chat: {
    secureConversation: 'Conversație securizată cu echipa ta de îngrijire',
    typePlaceholder: 'Scrie mesajul tău...',
    justNow: 'Chiar acum',
    initialMessage: 'Bună! Sunt aici să te ajut. Ce ai vrea să discutăm despre simptomele tale?',
    responseMessage: 'Îți mulțumesc că ai împărtășit. Am notat simptomele tale. Ai vrea să programez un apel de urmărire pentru a discuta mai departe?',
  },

  // Urgent Contact Modal
  urgent: {
    urgentAttention: 'Atenție Urgentă Necesară',
    highSymptomAlert: 'Alertă Simptome Ridicate',
    criticalDescription: 'Simptomele tale indică faptul că ai putea avea nevoie de atenție medicală imediată. Te rugăm să contactezi doctorul sau serviciile de urgență.',
    highDescription: 'Nivelurile simptomelor tale sunt ridicate. Ia în considerare să contactezi echipa de îngrijire pentru îndrumări.',
    callDoctor: 'Sună pe',
    sendMessage: 'Trimite Mesaj',
    callEmergency: 'Sună Serviciile de Urgență (112)',
    dismissAlert: 'Sunt bine, închide această alertă',
  },

  // Insight Modal
  insight: {
    title: 'Perspectivă',
    ok: 'OK',
  },

  // Bottom Navigation
  navigation: {
    home: 'Acasă',
    carePlan: 'Plan Îngrijire',
    symptoms: 'Simptome',
    circles: 'Cercuri',
  },
};
