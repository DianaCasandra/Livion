/**
 * English translations
 */

export const en = {
  // Common
  common: {
    continue: 'Continue',
    back: 'Back',
    yes: 'Yes',
    no: 'No',
    cancel: 'Cancel',
    save: 'Save',
    done: 'Done',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    connected: 'Connected',
    search: 'Search',
  },

  // Welcome Screen
  welcome: {
    tagline: 'Your health story. Yours to share.',
    privacyLink: 'User Promise & Privacy Explainer',
    getStarted: 'Get Started',
  },

  // Register Screen
  register: {
    title: 'Patient Register',
    subtitle: 'Create your Livion account. Your data is encrypted and secure.',
    emailPhone: 'Email / Phone',
    setPassword: 'Set a Password',
    confirmPassword: 'Confirm Password',
    bankId: 'Bank ID (optional)',
    footer: "By continuing, you agree to Livion's data use policy.",
  },

  // Consent Screen
  consent: {
    title: 'Consent & Preferences',
    subtitle: 'Adjust what you want Livion to use or access. You can modify these anytime.',
    dataSources: 'Data Sources',
    wearables: 'Wearables',
    ehr: 'EHR',
    sharingScopesTitle: 'Sharing Scopes',
    private: 'Private',
    circle: 'Circle',
    clinician: 'Clinician',
    researchOptIn: 'Research opt-in',
    purposeBinding: 'Purpose binding & data minimization',
    disclaimer: 'You can adjust all consent settings later from your profile.',
  },

  // Data Connections Screen
  dataConnections: {
    title: 'Data Connections',
    subtitle: 'Sync wearables and sensors to power your care insights.',
    connectDevices: 'Connect your devices',
    devices: {
      appleHealth: {
        name: 'Apple Health',
        hint: 'Steps • Heart Rate • Sleep • Activity',
      },
      googleFit: {
        name: 'Google Fit',
        hint: 'Steps • HR • Mobility',
      },
      glucoseMonitor: {
        name: 'Glucose Monitor',
        hint: 'CGM trend • Fast sync',
      },
      otherBluetooth: {
        name: 'Other Bluetooth devices',
        hint: "We'll search nearby sensors automatically",
      },
    },
    connect: 'Connect',
  },

  // Risk Assessment Screen
  risk: {
    title: 'Risk Snapshot',
    subtitle: 'Please complete the following triage questions regarding your current symptoms. We will examine your state as a starting point in your health journey.',
    questions: [
      'Do you experience severe headaches daily?',
      'Have you had episodes of dizziness or fainting?',
      'Are you experiencing chest pain or pressure?',
      'Do you have persistent shortness of breath?',
      'Do you notice unusual swelling in your legs or ankles?',
    ],
    seekCare: 'Seek Care',
    seekCareMessage: 'Based on your responses, it is recommended to contact your healthcare provider immediately. For emergencies, call:',
    emergencyNumber: '- 112 (EU)',
    finishAssessment: 'Finish Assessment',
  },

  // User Promise Screen
  userPromise: {
    title: 'LIVION "User Promise" Manifesto',
    manifesto: {
      item1Bold: '1. You are not a datapoint.',
      item1Text: " You're a story — full of days, pauses, and restarts. Livion listens, not just measures.",
      item2Bold: "2. We protect what's yours.",
      item2Text: " Your data is private by default. We'll never sell it or trade it. You choose what to share.",
      item3Bold: '3. Small steps count.',
      item3Text: " Health isn't a race. Small moments matter — Livion helps you notice them.",
      item4Bold: '4. Your journey is unique.',
      item4Text: ' Our AI adapts to you, never judges you.',
      item5Bold: "5. You're part of something bigger.",
      item5Text: ' Every choice contributes to a mission of stronger communities and honest care.',
      item6Bold: '6. Everyone belongs.',
      item6Text: ' Diversity is our foundation.',
      item7Bold: '7. Connection is care.',
      item7Text: ' Healing grows through shared progress.',
      item8Bold: '8. We lead with clarity.',
      item8Text: ' Transparency is care.',
      item9Bold: '9. Progress feels good.',
      item9Text: ' We design for joy, not guilt.',
      item10Bold: '10. Rest is also progress.',
      item10Text: ' Doing nothing can be healthy.',
      item11Bold: '11. Your voice shapes Livion.',
      item11Text: ' We build this with you.',
      item12Bold: '12. We aim for lasting change.',
      item12Text: ' Beyond screens — real-world good.',
      item13Bold: '13. Health is hope.',
      item13Text: ' Every tap is toward collective wellbeing.',
    },
    privacyExplainer: 'Privacy Explainer',
    privacyPlaceholder1: 'This is placeholder text for a future plain-language privacy explainer...',
    privacyPlaceholder2: "Here we'll clarify what stays on-device, how encryption works...",
  },

  // Home Tab / Dashboard
  home: {
    greetings: {
      morning: 'Good morning',
      afternoon: 'Good afternoon',
      evening: 'Good evening',
    },
    healthStatus: 'You are in healthy shape',
    tapToSee: 'Tap to see your details',
    dayAtGlance: 'Your day at a glance',
    steps: 'steps',
    ofGoal: 'of goal',
    bpm: 'bpm',
    resting: 'resting',
    goodSleep: 'good sleep',
    howFeeling: 'How are you feeling?',
    moodLogged: 'Mood logged!',
    tapToLog: 'Tap to log your mood',
    moods: {
      great: 'Great',
      okay: 'Okay',
      low: 'Low',
      rough: 'Rough',
    },
    todaysPlan: "Today's plan",
    allDone: 'All done!',
    ofDone: 'of',
    done: 'done',
    greatJob: 'Great job!',
    completedAllTasks: "You've completed all your tasks for today",
    completedAt: 'Completed at',
    insightsForYou: 'Insights for you',
    new: 'NEW',
    seeDetails: 'See details',
    learnMore: 'Learn more',
    insights: {
      eveningReadings: 'Your evening readings improved',
      eveningReadingsBody: 'Blood pressure has been trending down over the last 3 evenings. Keep up the good work!',
      breathingSteady: 'Breathing looks steady',
      breathingSteadyBody: 'Your respiratory rate has stayed within your normal range all week.',
    },
    tasks: {
      morningBloodPressure: 'Morning blood pressure',
      beforeMorning: 'Before 9:00 AM',
      tenMinuteWalk: '10 minute walk',
      beforeAfternoon: 'Before 3:00 PM',
      eveningCheckIn: 'Evening check-in',
      beforeEvening: 'Before 10:00 PM',
    },
  },

  // Side Menu
  menu: {
    myProfile: 'My Profile',
    labResults: 'Lab Results & Glossary',
    myDoctors: 'My Doctors',
    settings: 'Settings',
    helpSupport: 'Help & Support',
    language: 'Language',
    logOut: 'Log Out',
  },

  // Language
  language: {
    title: 'Language',
    english: 'English',
    romanian: 'Română',
  },

  // Support Modal
  support: {
    title: "We're here for you",
    subtitle: "It's okay to have rough days. Would you like to reach out to your care team?",
    callDoctor: 'Call Dr. Diana',
    familyPhysician: 'Family Physician',
    sendMessage: 'Send a message',
    responseTime: 'Get a response within 24h',
    okayForNow: "I'm okay for now",
  },

  // Lab Results Screen
  labs: {
    title: 'Lab Results',
    subtitle: 'View your recent blood work and test results',
    totalReports: 'Total Reports',
    allNormal: 'All Normal',
    needReview: 'Need Review',
    recentResults: 'Recent Results',
    tests: 'tests',
    flagged: 'Flagged',
    normal: 'Normal',
    testResults: 'Test Results',
    tapToSeeDetails: 'Tap any result to see details',
    normalRange: 'Normal Range',
    referenceRange: 'Reference Range',
    disclaimer: 'These results should be reviewed with your healthcare provider. Flagged values may require follow-up.',
    // Lab result sets
    resultSets: {
      cbc: 'Complete Blood Count',
      cbcSub: 'CBC with Differential',
      metabolic: 'Metabolic Panel',
      metabolicSub: 'Comprehensive Metabolic Panel',
      lipid: 'Lipid Panel',
      lipidSub: 'Cholesterol & Triglycerides',
      thyroid: 'Thyroid Panel',
      thyroidSub: 'TSH, T3, T4',
      vitamin: 'Vitamin & Mineral Panel',
      vitaminSub: 'Vitamin D, B12, Iron',
    },
    providers: {
      cityMedical: 'City Medical Lab',
      healthFirst: 'HealthFirst Labs',
    },
    // Test descriptions
    descriptions: {
      altElevated: 'Slightly elevated - may indicate liver stress',
      astElevated: 'Slightly elevated - monitor with follow-up',
      cholesterolHigh: 'Consider dietary changes',
      hdlGood: 'Good cholesterol - higher is better',
      ldlOptimal: 'Optimal: under 100',
      vitDLow: 'Consider supplementation',
      b12Low: 'Below optimal range',
      ironLow: 'Slightly below normal',
    },
  },

  // Care Plan Tab
  carePlan: {
    title: 'Care Plan',
    aiInsights: 'AI Health Insights',
    aiSubtitle: 'Prevention & wellness tips',
    yourCareTeam: 'Your Care Team',
    all: 'All',
    allTasks: 'All Tasks',
    complete: 'complete',
    allDone: 'All done!',
    noTasksFromDoctor: 'No tasks from this doctor',
    tasks: {
      bloodPressureCheck: 'Blood pressure check',
      takeHeartMedication: 'Take heart medication',
      morningWalk: '15 min morning walk',
      cognitiveExercises: 'Cognitive exercises',
      stretchingRoutine: 'Stretching routine',
      eyeDrops: 'Eye drops',
      eveningBPReading: 'Evening BP reading',
      sleepMeditation: 'Sleep meditation',
    },
    doctors: {
      familyMedicine: 'Family Medicine',
      cardiology: 'Cardiology',
      neurology: 'Neurology',
      orthopedics: 'Orthopedics',
      ophthalmology: 'Ophthalmology',
    },
  },

  // AI Insights Modal
  aiInsights: {
    title: 'AI Insights',
    personalizedForYou: 'Personalized for you',
    healthScore: 'Health Score',
    heartHealth: 'Heart Health',
    lifestyle: 'Lifestyle',
    good: 'Good',
    active: 'Active',
    aiBannerText: 'Based on your data, focus on heart health and staying active this week.',
    insights: 'insights',
    disclaimer: 'Insights are AI-generated suggestions, not medical advice.',
    categories: {
      prevention: 'Prevention',
      heart: 'Heart Health',
      activity: 'Activity',
      mental: 'Mental Wellness',
      nutrition: 'Nutrition',
    },
    prevention: {
      stayActive: 'Stay Active',
      stayActiveDesc: '30 min daily walking reduces heart risk by 35%',
      sleepQuality: 'Sleep Quality',
      sleepQualityDesc: '7-8 hours improves immune function',
    },
    heart: {
      bloodPressure: 'Blood Pressure',
      bloodPressureDesc: 'Your readings show improvement this week',
      restingHeartRate: 'Resting Heart Rate',
      restingHeartRateDesc: 'Trending down - great progress!',
    },
    activity: {
      stepGoal: 'Step Goal',
      stepGoalDesc: "You're averaging 7,500 steps daily",
      activeMinutes: 'Active Minutes',
      activeMinutesDesc: '45 min more than last week',
    },
    mental: {
      stressLevels: 'Stress Levels',
      stressLevelsDesc: 'Consider 5-min breathing exercises',
      moodTracking: 'Mood Tracking',
      moodTrackingDesc: 'Consistent logging helps identify patterns',
    },
    nutrition: {
      hydration: 'Hydration',
      hydrationDesc: 'Aim for 8 glasses of water daily',
      balancedDiet: 'Balanced Diet',
      balancedDietDesc: 'Add more leafy greens this week',
    },
  },

  // Symptoms Tab
  symptoms: {
    title: 'My Care',
    subtitle: 'Connect with your physician',
    familyPhysician: 'Family Physician',
    symptomsLog: 'Symptoms Log',
    logForDoctor: 'LOG SYMPTOMS FOR DOCTOR',
    describeSymptoms: 'Describe your symptoms',
    symptomsPlaceholder: 'What symptoms are you experiencing?',
    painLevel: 'Pain or discomfort level',
    noPain: 'No pain',
    severe: 'Severe',
    criticalLevel: 'Critical level - Consider seeking immediate care',
    elevatedLevel: 'Elevated level - Your doctor will be notified',
    additionalNotes: 'Additional notes for',
    notesPlaceholder: 'Any other details your doctor should know?',
    sendToDoctor: 'Send to Doctor',
    symptomsShared: 'Your symptoms will be shared securely with',
    forEmergencies: 'For emergencies, call 911.',
    recentEntries: 'Recent Entries',
    seeAll: 'See all',
    loggedAt: 'Logged at',
    thisWeek: 'This Week',
    entriesLogged: 'Entries logged',
    avgPainLevel: 'Avg. pain level',
    improving: 'Improving',
    officeHours: 'Office Hours',
    emergencyContact: 'Emergency Contact',
    emergencyText: 'For after-hours emergencies, please call the main office number. For life-threatening emergencies, call 911.',
    quickTip: 'Quick Tip',
    quickTipText: 'Log your symptoms regularly to help',
    quickTipText2: 'track your health progress and provide better care during your appointments.',
    logSymptomsNow: 'Log symptoms now',
    call: 'Call',
    message: 'Message',
    chat: 'Chat',
    schedule: 'Schedule',
    next: 'Next',
    history: {
      today: 'Today',
      yesterday: 'Yesterday',
      entry1Symptoms: 'Mild fatigue, slight headache',
      entry1Notes: 'Better after rest',
      entry2Symptoms: 'Muscle tension in shoulders',
      entry3Date: 'Oct 5',
      entry3Symptoms: 'General tiredness',
      entry3Notes: 'Good day overall',
    },
  },

  // Peer Circles Tab
  peerCircles: {
    title: 'Peer Circles',
    subtitle: 'Connect with others on similar journeys',
    yourCircles: 'Your Circles',
    discoverCircles: 'Discover Circles',
    members: 'members',
    activeNow: 'active now',
    join: 'Join',
    joined: 'Joined',
    newPosts: 'new posts',
    peerSupportCircle: 'Peer Support Circle',
    moderatedSpace: 'A moderated space to share experiences. This does not replace medical advice.',
    postAnonymously: 'Post anonymously',
    identityHidden: 'Your identity is hidden from peers',
    sharePlaceholder: 'Share an update with your circle...',
    post: 'Post',
    recentPosts: 'Recent Posts',
    moderationNotice: 'Posts are reviewed for safety. Inappropriate content will be removed.',
    anonymous: 'Anonymous',
    supportCircle: 'Support Circle',
    posts: {
      post1: 'Today I finally reached my step goal three days in a row. Small wins matter!',
      post1Meta: 'Activity - 2h ago',
      post2: 'Found a helpful article about managing evening blood pressure. Happy to share if anyone is interested.',
      post2Meta: 'Education - 5h ago',
      post3: "How did your check-ups go this week? Share a quick update so others know they're not alone.",
      post3Meta: 'Prompt - today',
      post4: 'First week back to regular walking after my procedure. Taking it slow but feeling optimistic.',
      post4Meta: 'Recovery - 1d ago',
      post5: "Anyone else find it helpful to track their meals? I started a simple food diary and it's been eye-opening.",
      post5Meta: 'Nutrition - 2d ago',
    },
    categories: {
      heartHealth: 'Heart Health',
      diabetes: 'Diabetes Support',
      mentalWellness: 'Mental Wellness',
      chronicPain: 'Chronic Pain',
      nutrition: 'Nutrition & Diet',
      fitness: 'Fitness Journey',
    },
  },

  // Chat Popup Modal
  chat: {
    secureConversation: 'Secure conversation with your care team',
    typePlaceholder: 'Type your message...',
    justNow: 'Just now',
    initialMessage: "Hi there! I'm here to help. What would you like to discuss about your symptoms?",
    responseMessage: "Thank you for sharing. I've noted your symptoms. Would you like me to schedule a follow-up call to discuss this further?",
  },

  // Urgent Contact Modal
  urgent: {
    urgentAttention: 'Urgent Attention Needed',
    highSymptomAlert: 'High Symptom Alert',
    criticalDescription: 'Your symptoms indicate you may need immediate medical attention. Please contact your doctor or emergency services.',
    highDescription: 'Your symptom levels are elevated. Consider reaching out to your care team for guidance.',
    callDoctor: 'Call',
    sendMessage: 'Send Message',
    callEmergency: 'Call Emergency Services (112)',
    dismissAlert: "I'm okay, dismiss this alert",
  },

  // Insight Modal
  insight: {
    title: 'Insight',
    ok: 'OK',
  },

  // Bottom Navigation
  navigation: {
    home: 'Home',
    carePlan: 'Care Plan',
    symptoms: 'Symptoms',
    circles: 'Circles',
  },
};

export type TranslationKeys = typeof en;
