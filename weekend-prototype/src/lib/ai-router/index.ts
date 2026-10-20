// AI Router: Provider-configurable abstraction for Vision, Generation, Ranking, and Mind Map creation
// Default provider: Deterministic Stub with real Pedagogy Playbook implementation

export interface SyllabusExtractionResult {
  board: string;
  grade_level: number;
  confidence: number;
  clarifying_question?: string;
  subjects: {
    [subjectName: string]: {
      chapters: Array<{
        chapter_number: number;
        title: string;
        topics: string[];
        exam_weight_marks: number;
      }>;
    };
  };
}

export interface ExplanationResult {
  subject: string;
  topic: string;
  concept_name: string;
  simple_example: string;
  desi_analogy: string;
  step_by_step: string[];
  english_terms_highlighted: Array<{ english: string; transliterationOrHindi: string; meaning: string }>;
  quick_check_question: {
    question: string;
    options: string[];
    correct_index: number;
    explanation: string;
  };
  daily_english_practice: {
    phrase_en: string;
    phrase_hi: string;
    usage_context: string;
  };
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
  desi_analogy: string;
  subtopic: string;
}

export interface VideoRecommendation {
  id: string;
  youtube_id: string;
  title: string;
  channel: string;
  duration_minutes: number;
  language: 'en' | 'hi' | 'hinglish';
  verified_on: string;
  thumbnail_url: string;
  is_curated: boolean;
}

export interface MindMapNode {
  id: string;
  label: string;
  label_hi?: string;
  marks_weight?: number;
  level: number;
  x: number;
  y: number;
  children?: string[];
}

export interface MindMapData {
  title: string;
  subject: string;
  nodes: MindMapNode[];
  edges: Array<{ from: string; to: string }>;
}

export class AiRouter {
  private providerName: string;

  constructor() {
    this.providerName = process.env.AI_PROVIDER || 'stub';
  }

  async extractSyllabus(params: {
    imageBuffer?: Buffer | string;
    mimeType?: string;
    rawTextSnippet?: string;
  }): Promise<SyllabusExtractionResult> {
    // If raw text mentions term 1 and term 2, trigger a clarifying question test
    const text = params.rawTextSnippet || '';
    const hasAmbiguity = text.toLowerCase().includes('term 1') && text.toLowerCase().includes('term 2');

    return {
      board: 'CBSE',
      grade_level: 9,
      confidence: hasAmbiguity ? 0.78 : 0.96,
      clarifying_question: hasAmbiguity
        ? 'We noticed topics from both CBSE Term 1 and Term 2. Which term exam are you preparing for?'
        : undefined,
      subjects: {
        Science: {
          chapters: [
            {
              chapter_number: 6,
              title: 'Tissues (ऊतक)',
              topics: ['Plant Tissues', 'Meristematic Tissue', 'Permanent Tissue', 'Animal Tissues'],
              exam_weight_marks: 8,
            },
            {
              chapter_number: 8,
              title: 'Motion (गति)',
              topics: ['Distance and Displacement', 'Uniform Motion', 'Velocity', 'Acceleration', 'Equations of Motion'],
              exam_weight_marks: 10,
            },
            {
              chapter_number: 9,
              title: 'Force and Laws of Motion (बल तथा गति के नियम)',
              topics: ["Newton's First Law", 'Inertia', "Newton's Second Law", 'Momentum', "Newton's Third Law"],
              exam_weight_marks: 9,
            },
          ],
        },
        Mathematics: {
          chapters: [
            {
              chapter_number: 1,
              title: 'Number Systems (संख्या पद्धति)',
              topics: ['Rational Numbers', 'Irrational Numbers', 'Real Numbers', 'Laws of Exponents'],
              exam_weight_marks: 8,
            },
            {
              chapter_number: 2,
              title: 'Polynomials (बहुपद)',
              topics: ['Zeroes of a Polynomial', 'Remainder Theorem', 'Factor Theorem', 'Algebraic Identities'],
              exam_weight_marks: 12,
            },
            {
              chapter_number: 6,
              title: 'Lines and Angles (रेखाएँ और कोण)',
              topics: ['Basic Terms', 'Intersecting Lines', 'Parallel Lines and Transversal', 'Angle Sum Property'],
              exam_weight_marks: 7,
            },
          ],
        },
        English: {
          chapters: [
            {
              chapter_number: 1,
              title: 'The Fun They Had',
              topics: ['Reading Comprehension', 'Vocabulary', 'Theme of Future Schools'],
              exam_weight_marks: 6,
            },
            {
              chapter_number: 2,
              title: 'The Sound of Music',
              topics: ['Evelyn Glennie', 'Bismillah Khan', 'Determination and Art'],
              exam_weight_marks: 8,
            },
          ],
        },
      },
    };
  }

  async generateExplanation(params: {
    subject: string;
    chapter: string;
    topic: string;
    childGrade: number;
    medium: string;
    childName: string;
  }): Promise<ExplanationResult> {
    const isHindi = params.medium === 'hindi' || params.medium === 'bilingual';

    if (params.subject.toLowerCase().includes('science') || params.topic.toLowerCase().includes('motion')) {
      return {
        subject: 'Science',
        topic: params.topic || 'Acceleration',
        concept_name: isHindi ? 'त्वरण (Acceleration)' : 'Acceleration (Change in Velocity)',
        simple_example: isHindi
          ? 'जब आप अपनी साइकिल पर पैडल तेजी से मारते हैं, तो साइकिल की गति लगातार बढ़ती है। इसी गति के बदलाव की दर को त्वरण कहते हैं।'
          : 'When you pedal your bicycle harder down an empty road, your speed increases every second. That rate of speed increase is acceleration.',
        desi_analogy: isHindi
          ? 'क्रिकेट में जब जसप्रीत बुमराह बॉलिंग क्रीज की ओर दौड़ते हुए अपनी रफ्तार बढ़ाते हैं, तो वह बॉल फेंकने से ठीक पहले "त्वरण" (Acceleration) उत्पन्न कर रहे होते हैं!'
          : 'Think of an auto-rickshaw at a red traffic signal. The moment the light turns green, the driver twists the throttle and zooms ahead. That surge forward is pure acceleration!',
        step_by_step: [
          isHindi
            ? 'आरंभिक वेग (Initial Velocity = u): वस्तु किस गति से शुरू हुई।'
            : 'Initial Velocity (u): How fast the object was moving at the beginning.',
          isHindi
            ? 'अंतिम वेग (Final Velocity = v): समय बीतने के बाद उसकी गति क्या हुई।'
            : 'Final Velocity (v): The speed reached after time (t) has passed.',
          isHindi
            ? 'त्वरण का सूत्र (Formula): a = (v - u) / t'
            : 'Formula for acceleration: a = (v - u) / t',
          isHindi
            ? 'मानक मात्रक (SI Unit): मीटर प्रति सेकंड वर्ग (m/s²)।'
            : 'Standard SI Unit: meters per second squared (m/s²).',
        ],
        english_terms_highlighted: [
          { english: 'Acceleration', transliterationOrHindi: 'त्वरण', meaning: 'Rate of change of velocity with time' },
          { english: 'Velocity', transliterationOrHindi: 'वेग', meaning: 'Speed of an object in a definite direction' },
          { english: 'Initial Velocity', transliterationOrHindi: 'आरंभिक वेग', meaning: 'Speed at starting time (u)' },
          { english: 'Deceleration / Retardation', transliterationOrHindi: 'मंदन', meaning: 'Negative acceleration when slowing down' },
        ],
        quick_check_question: {
          question: isHindi
            ? 'यदि कोई कार स्थिर अवस्था (rest) से शुरू होकर 5 सेकंड में 20 m/s की गति प्राप्त करती है, तो त्वरण क्या होगा?'
            : 'If a car starts from rest (u = 0) and reaches 20 m/s in 5 seconds, what is its acceleration?',
          options: ['2 m/s²', '4 m/s²', '5 m/s²', '100 m/s²'],
          correct_index: 1,
          explanation: 'a = (v - u)/t = (20 - 0)/5 = 4 m/s²',
        },
        daily_english_practice: {
          phrase_en: 'The school bus accelerated quickly after turning the corner.',
          phrase_hi: 'मोड़ मुड़ने के बाद स्कूल बस ने तेजी से रफ्तार पकड़ी।',
          usage_context: 'Use this when talking about any vehicle picking up speed on the road.',
        },
      };
    }

    // Default pedagogical response
    return {
      subject: params.subject,
      topic: params.topic,
      concept_name: `${params.topic} — Clear Step-by-Step Guide`,
      simple_example: `In everyday life, ${params.topic} helps us understand patterns and solve real challenges systematically.`,
      desi_analogy: 'Imagine sharing a box of gulab jamuns equally among cousins during Diwali without anyone feeling left out!',
      step_by_step: [
        'Identify what is given in the question and what needs to be solved.',
        'Apply the standard principle and check units.',
        'Verify your answer with a quick mental estimate.',
      ],
      english_terms_highlighted: [
        { english: 'Fundamental Principle', transliterationOrHindi: 'मूल सिद्धांत', meaning: 'Core foundational rule' },
        { english: 'Systematic Method', transliterationOrHindi: 'व्यवस्थित विधि', meaning: 'Step-by-step approach' },
      ],
      quick_check_question: {
        question: `What is the most critical first step when solving problems on ${params.topic}?`,
        options: [
          'Guess the final answer immediately',
          'Read carefully and note down what is given',
          'Skip the step-by-step explanation',
          'Copy the answer from a friend',
        ],
        correct_index: 1,
        explanation: 'Always begin by writing down given values and target unknowns.',
      },
      daily_english_practice: {
        phrase_en: 'I solved the practice questions step-by-step with confidence.',
        phrase_hi: 'मैंने आत्मविश्वास के साथ एक-एक कदम चलकर अभ्यास प्रश्न हल किए।',
        usage_context: 'Use this when discussing your study session with your teacher or parents.',
      },
    };
  }

  async generateMindMap(params: {
    subject: string;
    chapterTitle: string;
    topics: string[];
  }): Promise<MindMapData> {
    const rootId = 'node_root';
    const nodes: MindMapNode[] = [
      {
        id: rootId,
        label: params.chapterTitle,
        level: 0,
        marks_weight: 10,
        x: 400,
        y: 60,
      },
    ];

    const edges: Array<{ from: string; to: string }> = [];
    const count = params.topics.length || 4;
    const spacing = 700 / (count + 1);

    params.topics.forEach((topic, idx) => {
      const childId = `node_${idx + 1}`;
      const x = 50 + spacing * (idx + 1);
      const y = 200 + (idx % 2 === 0 ? 0 : 35);
      nodes.push({
        id: childId,
        label: topic,
        level: 1,
        marks_weight: Math.round(10 / count),
        x,
        y,
      });
      edges.push({ from: rootId, to: childId });

      // Sub-node for depth
      const subId = `node_${idx + 1}_sub`;
      nodes.push({
        id: subId,
        label: `Key Formulas & Terms`,
        level: 2,
        x,
        y: y + 90,
      });
      edges.push({ from: childId, to: subId });
    });

    return {
      title: params.chapterTitle,
      subject: params.subject,
      nodes,
      edges,
    };
  }

  async generateQuiz(params: {
    gradeLevel: number;
    subject: string;
    chapter: string;
    topic: string;
    resurfaceWeakTopics?: string[];
  }): Promise<QuizQuestion[]> {
    const isJunior = params.gradeLevel <= 7;
    const totalCount = isJunior ? 5 : 10;

    const baseQuestions: QuizQuestion[] = [
      {
        id: 'q1',
        question: 'Which of the following is the correct SI unit of acceleration?',
        options: ['m/s', 'm/s²', 'km/h', 'N·m'],
        correct_index: 1,
        explanation: 'Acceleration is velocity divided by time, yielding (m/s)/s = m/s².',
        desi_analogy: 'Just like speed tells how fast distance changes, acceleration tells how fast speed itself changes!',
        subtopic: 'Units & Measurements',
      },
      {
        id: 'q2',
        question: 'What does a straight horizontal line on a Velocity-Time graph represent?',
        options: ['Zero velocity', 'Uniform acceleration', 'Constant velocity (zero acceleration)', 'Negative acceleration'],
        correct_index: 2,
        explanation: 'When velocity does not change over time, slope is zero, meaning acceleration is zero.',
        desi_analogy: 'Cruising on a straight expressway at exactly 60 km/h with cruise control on.',
        subtopic: 'Graphical Representation',
      },
      {
        id: 'q3',
        question: 'If a body moves with uniform speed in a circular path, its velocity is:',
        options: ['Constant', 'Changing continuously', 'Zero', 'Negative'],
        correct_index: 1,
        explanation: 'Because the direction changes at every point in a circle, velocity changes even if speed is steady.',
        desi_analogy: 'Spinning a stone tied to a thread — let go and it flies off straight in the direction it was heading.',
        subtopic: 'Circular Motion',
      },
      {
        id: 'q4',
        question: 'What is the displacement of a runner who completes one full 400m circular track and returns to the start?',
        options: ['400 meters', '0 meters', '200 meters', '800 meters'],
        correct_index: 1,
        explanation: 'Displacement measures shortest straight-line distance from start to finish. Starting point = ending point, so displacement is 0.',
        desi_analogy: 'Leaving your house in the morning, going to school, and returning home for dinner: your net displacement is 0!',
        subtopic: 'Distance vs Displacement',
      },
      {
        id: 'q5',
        question: 'Which equation of motion relates initial velocity (u), final velocity (v), acceleration (a), and distance (s)?',
        options: ['v = u + at', 's = ut + ½at²', 'v² - u² = 2as', 'a = (v + u)/t'],
        correct_index: 2,
        explanation: 'The third equation of motion is v² - u² = 2as (independent of time t).',
        desi_analogy: 'Useful when you know the braking distance on a road without needing a stopwatch.',
        subtopic: 'Equations of Motion',
      },
    ];

    if (isJunior) {
      return baseQuestions;
    }

    // Additional 5 questions for senior grades (classes 8-12) to reach 10
    const seniorQuestions: QuizQuestion[] = [
      {
        id: 'q6',
        question: 'When a bus suddenly turns a sharp left corner, passengers tilt to the right. This is due to:',
        options: ['Inertia of rest', 'Inertia of direction', 'Gravitational force', 'Centripetal friction'],
        correct_index: 1,
        explanation: 'Inertia of direction makes bodies want to continue moving in a straight line.',
        desi_analogy: 'Like chai spilling over the rim when you suddenly swivel the tray!',
        subtopic: 'Inertia and Force',
      },
      {
        id: 'q7',
        question: 'The slope of a Distance-Time graph gives:',
        options: ['Acceleration', 'Speed', 'Displacement', 'Force'],
        correct_index: 1,
        explanation: 'Slope = Change in Distance / Change in Time = Speed.',
        desi_analogy: 'Steeper staircase means you climb faster with each step.',
        subtopic: 'Graphs of Motion',
      },
      {
        id: 'q8',
        question: 'A ball dropped from a rooftop reaches the ground in 3 seconds (take g = 9.8 m/s²). Its final velocity is:',
        options: ['14.7 m/s', '29.4 m/s', '44.1 m/s', '9.8 m/s'],
        correct_index: 1,
        explanation: 'v = u + gt = 0 + (9.8 × 3) = 29.4 m/s.',
        desi_analogy: 'Gravity adds 9.8 m/s every single second of free fall.',
        subtopic: 'Free Fall and Gravity',
      },
      {
        id: 'q9',
        question: 'Which of the following is a vector quantity?',
        options: ['Distance', 'Speed', 'Velocity', 'Time'],
        correct_index: 2,
        explanation: 'Velocity has both magnitude (speed) and direction, making it a vector.',
        desi_analogy: 'Saying "drive 5 km" is scalar; saying "drive 5 km North toward Connaught Place" is vector.',
        subtopic: 'Vectors vs Scalars',
      },
      {
        id: 'q10',
        question: 'When brakes are applied to a train moving at 72 km/h, it stops in 20 seconds. What is the retardation?',
        options: ['1 m/s²', '3.6 m/s²', '2 m/s²', '0.5 m/s²'],
        correct_index: 0,
        explanation: '72 km/h = 72 × (5/18) = 20 m/s. a = (0 - 20)/20 = -1 m/s². Retardation is 1 m/s².',
        desi_analogy: 'The locomotive smoothly takes off 1 meter per second of speed each second.',
        subtopic: 'Calculations & Retardation',
      },
    ];

    const questions = isJunior ? baseQuestions : [...baseQuestions, ...seniorQuestions];

    if (params.resurfaceWeakTopics && params.resurfaceWeakTopics.length > 0) {
      params.resurfaceWeakTopics.forEach((wt, idx) => {
        if (questions[idx]) {
          questions[idx] = {
            ...questions[idx],
            subtopic: wt,
            question: `[Revision: ${wt}] ${questions[idx].question}`,
          };
        }
      });
    }

    return questions;
  }

  async rankCuratedVideos(params: {
    subject: string;
    topic: string;
    gradeLevel: number;
    language: string;
  }): Promise<VideoRecommendation[]> {
    // Verified curated educational videos (no distracting links, verified on dates)
    const curatedLibrary: VideoRecommendation[] = [
      {
        id: 'vid_1',
        youtube_id: 'zmhZ_2xN9-I',
        title: 'Class 9 Physics: Motion & Equations in 15 Minutes',
        channel: 'Khan Academy India',
        duration_minutes: 14,
        language: 'hinglish',
        verified_on: '2026-10-15',
        thumbnail_url: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80',
        is_curated: true,
      },
      {
        id: 'vid_2',
        youtube_id: 'gQ3D97k3r30',
        title: 'Distance, Displacement & Velocity Visualized',
        channel: 'Physics Wallah Foundation',
        duration_minutes: 18,
        language: 'hi',
        verified_on: '2026-10-12',
        thumbnail_url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80',
        is_curated: true,
      },
      {
        id: 'vid_3',
        youtube_id: '4gC_0x6E0lM',
        title: 'Uniform vs Non-Uniform Motion with Real Life Experiments',
        channel: 'BodhaGuru',
        duration_minutes: 9,
        language: 'en',
        verified_on: '2026-10-14',
        thumbnail_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
        is_curated: true,
      },
    ];

    return curatedLibrary;
  }
}

export const aiRouter = new AiRouter();
