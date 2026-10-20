export interface HomeworkMethodStep {
  stepNumber: number;
  title: string;
  description: string;
  keyPoints: string[];
}

export interface HomeworkGuidanceResult {
  questionSummary: string;
  subject: string;
  gradeLevel: number;
  steps: HomeworkMethodStep[];
  bareFinalAnswerSuppressed: boolean;
  siUnitGuidance: string;
  pedagogicalNotice: string;
  desiAnalogy: string;
}

/**
 * Homework Helper: Guided Method Solving Engine
 * Strict Pedagogical Rule: Never dump bare answers or complete the calculation for the student.
 * Always structure into 3 rigorous methodology steps:
 * 1. Extract Given Quantities & Unknowns
 * 2. Convert to Standard SI Units
 * 3. State Core Formula, Substitute Knowns, and Prompt Student to Compute
 */
export function generateHomeworkGuidance(params: {
  questionText: string;
  subject?: string;
  gradeLevel?: number;
  language?: 'en' | 'hi' | 'hinglish';
}): HomeworkGuidanceResult {
  const isHindi = params.language === 'hi';
  const grade = params.gradeLevel || 9;
  const subject = params.subject || 'Science';
  const qLower = params.questionText.toLowerCase();

  // Check if it's a Math / Fraction / Polynomial question vs Science / Motion
  const isFractionOrMath =
    qLower.includes('fraction') ||
    qLower.includes('roti') ||
    qLower.includes('polynomial') ||
    qLower.includes('भिन्न') ||
    qLower.includes('बहुपद') ||
    subject.toLowerCase().includes('math');

  if (isFractionOrMath && !qLower.includes('train') && !qLower.includes(' रेलगाड़ी')) {
    const steps: HomeworkMethodStep[] = [
      {
        stepNumber: 1,
        title: isHindi ? 'चरण 1: दी गई राशियाँ पहचानें और लिखें' : 'Step 1: Extract Given Quantities & Identify the Unknown',
        description: isHindi
          ? 'प्रश्न में दिए गए संख्यात्मक मानों, अंश (Numerator) और हर (Denominator) या बहुपद पदों को सूचीबद्ध करें।'
          : 'Read the problem carefully and write down the given numbers, fractions, or algebraic terms.',
        keyPoints: isHindi
          ? [
              'दिए गए भिन्न या व्यंजक को अपनी कॉपी में साफ-साफ लिखें।',
              'अंश (ऊपर की संख्या) और हर (नीचे की संख्या) की पहचान करें।',
              'पता लगाएं कि हमें योग, अंतर या गुणनखंड में से क्या ज्ञात करना है।',
            ]
          : [
              'Write down each given term or fraction clearly from the word problem.',
              'Identify the Numerator (top part) and Denominator (bottom part) or polynomial degree.',
              'Identify the target unknown: What exact quantity are we asked to find?',
            ],
      },
      {
        stepNumber: 2,
        title: isHindi ? 'चरण 2: मानक SI मात्रकों व समान हर (LCM) में रूपांतरण' : 'Step 2: Convert to Standard SI Units & Common Denominator Form',
        description: isHindi
          ? 'गणना करने से पहले सभी मानों को मानक रूप और समान हर (LCM) या मानक SI मात्रकों में बदलें।'
          : 'Before computing, convert mixed numbers or unlike denominators into a common standard form (and ensure standard SI units like meters/seconds if physical quantities are involved).',
        keyPoints: isHindi
          ? [
              'यदि हर अलग-अलग हैं, तो उनका लघुत्तम समापवर्त्य (LCM) निकालें।',
              'यदि कोई भौतिक इकाई (जैसे किमी/घंटा या मिनट) है, तो 5/18 या 60 s से गुणा करके मानक रूप में बदलें।',
              'दोनों पदों को समान आधार पर लाएं ताकि तुलना या जोड़ आसान हो सके।',
            ]
          : [
              'Find the Least Common Multiple (LCM) of denominators so fractions share the same base.',
              'If speed or time units appear, convert km/h to m/s by multiplying by (5/18) and minutes to seconds (1 min = 60 s).',
              'Rewrite each term in standard simplified form before applying the formula.',
            ],
      },
      {
        stepNumber: 3,
        title: isHindi ? 'चरण 3: मूल सूत्र लागू करें और स्वयं हल करें' : 'Step 3: Apply the Core Formula & Complete the Calculation',
        description: isHindi
          ? 'उपयुक्त गणितीय सूत्र लिखें, मान रखें और अंतिम गणना स्वयं अपनी कॉपी में पूरी करें।'
          : 'Write the governing formula, substitute your converted values from Step 2, and perform the final division or simplification in your notebook.',
        keyPoints: isHindi
          ? [
              'समान हर होने पर अंशों को जोड़ें या घटाएं: (a/c) + (b/c) = (a + b)/c।',
              'चरण 2 से प्राप्त संख्याओं को सूत्र में रखें।',
              'अंतिम भाग या सरलीकरण स्वयं अपनी नोटबुक में हल करें!',
            ]
          : [
              'Apply the core rule: combine numerators over the common denominator or substitute x into P(x).',
              'Set up the final expression with your numbers from Step 2.',
              'Now perform the final division in your notebook paper to arrive at the simplified answer!',
            ],
      },
    ];

    return {
      questionSummary: params.questionText.trim(),
      subject,
      gradeLevel: grade,
      steps,
      bareFinalAnswerSuppressed: true,
      siUnitGuidance: isHindi
        ? 'हमेशा उत्तर को उसके सरलतम मानक रूप और सही मात्रक (जैसे m/s² या सरल भिन्न) में लिखें।'
        : 'Always express physical acceleration in m/s² and fractions in their simplest reduced form.',
      pedagogicalNotice: isHindi
        ? 'NetCyberAI सुकराती मानक: हम सोचना सिखाते हैं, नकल करना नहीं। अंतिम गणना छात्र के स्वयं के अभ्यास के लिए छोड़ी गई है।'
        : 'NetCyberAI Socratic Standard: We teach how to think, not what to copy. The final calculation is intentionally reserved for student execution.',
      desiAnalogy: isHindi
        ? 'जैसे घर पर दो रोटियों को बराबर टुकड़ों में बांटते समय पहले दोनों के टुकड़ों का आकार एक बराबर किया जाता है, वैसे ही भिन्न जोड़ने से पहले हर (Denominator) समान किया जाता है!'
        : 'Think of cutting two rotis into equal-sized slices before counting how many pieces the family ate altogether!',
    };
  }

  const steps: HomeworkMethodStep[] = [
    {
      stepNumber: 1,
      title: isHindi ? 'चरण 1: दी गई राशियाँ पहचानें और लिखें' : 'Step 1: Extract Given Quantities & Identify the Unknown',
      description: isHindi
        ? 'प्रश्न को ध्यान से पढ़कर ज्ञात मानों को उनके मानक संकेतों के साथ सूचीबद्ध करें।'
        : 'Read the problem carefully and list all known values with their standard symbols.',
      keyPoints: isHindi
        ? [
            'आरंभिक स्थिति पहचानें: यदि वस्तु या रेलगाड़ी स्टेशन/विराम अवस्था से चलती है, तो आरंभिक वेग (u) = 0 m/s।',
            'अंतिम स्थिति पहचानें: प्राप्त किया गया अंतिम वेग (v) नोट करें।',
            'समय अंतराल पहचानें: लिया गया कुल समय (t) लिखें।',
            'लक्ष्य पहचानें: हमें कौन सी भौतिक राशि (जैसे त्वरण a) ज्ञात करनी है?',
          ]
        : [
            'Identify starting state: If an object starts from rest or a station, initial velocity (u) = 0.',
            'Identify target state: Final velocity (v) reached.',
            'Identify time duration: Elapsed time (t).',
            'Identify the target unknown: What physical quantity are we asked to find?',
          ],
    },
    {
      stepNumber: 2,
      title: isHindi ? 'चरण 2: मानक SI मात्रकों में रूपांतरण' : 'Step 2: Convert to Standard SI Units',
      description: isHindi
        ? 'गणना करने से पहले सभी मानों को मानक SI मात्रकों (मीटर, सेकंड) में बदलें।'
        : 'Before substituting into equations, ensure all units match the standard SI framework.',
      keyPoints: isHindi
        ? [
            'चाल / वेग: किमी/घंटा (km/h) को मीटर/सेकंड (m/s) में बदलने के लिए (5/18) से गुणा करें।',
            'समय: मिनट या घंटों को सेकंड में बदलें (1 min = 60 s)।',
            'समीकरण लिखने से पहले जांच लें कि सभी राशियाँ समान SI प्रणाली में हैं।',
          ]
        : [
            'Speed / Velocity: Convert km/h to m/s by multiplying by (5/18).',
            'Time: Convert minutes or hours into seconds (1 min = 60 s).',
            'Check for consistency across all terms before writing down equations.',
          ],
    },
    {
      stepNumber: 3,
      title: isHindi ? 'चरण 3: मूल सूत्र लागू करें और स्वयं हल करें' : 'Step 3: Apply the Core Formula & Complete the Calculation',
      description: isHindi
        ? 'उपयुक्त सूत्र लिखें, ज्ञात मान रखें और अंतिम भाग स्वयं अपनी कॉपी में हल करें।'
        : 'Write the governing equation of motion, plug in the converted values, and compute the division on your notebook.',
      keyPoints: isHindi
        ? [
            'सूत्र याद करें: त्वरण (a) = (अंतिम वेग - आरंभिक वेग) / समय = (v - u) / t।',
            'चरण 2 से प्राप्त परिवर्तित मानों को समीकरण में रखें।',
            'अब अपनी कॉपी में अंतिम भाग (division) स्वयं हल करें! आपके उत्तर का SI मात्रक m/s² होगा।',
          ]
        : [
            'Recall definition: Acceleration (a) = (Final Velocity - Initial Velocity) / Time = (v - u) / t.',
            'Set up equation with your converted numbers from Step 2.',
            'Now perform the final division in your notebook paper. Your answer will have the SI unit m/s².',
          ],
    },
  ];

  return {
    questionSummary: params.questionText.trim(),
    subject,
    gradeLevel: grade,
    steps,
    bareFinalAnswerSuppressed: true,
    siUnitGuidance: isHindi
      ? 'त्वरण को हमेशा मीटर प्रति सेकंड वर्ग (m/s²) में व्यक्त करें।'
      : 'Always express acceleration in meters per second squared (m/s²).',
    pedagogicalNotice: isHindi
      ? 'NetCyberAI सुकराती मानक: हम सोचना सिखाते हैं, नकल करना नहीं। अंतिम संख्यात्मक भाग छात्र के स्वयं करने के लिए रखा गया है।'
      : 'NetCyberAI Socratic Standard: We teach how to think, not what to copy. The final numerical division is intentionally reserved for student execution.',
    desiAnalogy: isHindi
      ? 'बिरयानी पकाने के बारे में सोचें: एक शेफ आपको विधि, मसाले और सही आंच का समय बताता है, लेकिन स्वाद पाने के लिए हांडी आपको स्वयं चलानी होती है!'
      : 'Think of cooking biryani: a chef gives you the recipe, spices, and exact flame timing (method), but you have to stir the pot yourself to enjoy the dish!',
  };
}
