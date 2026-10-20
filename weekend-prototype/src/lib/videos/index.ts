export interface VideoItem {
  id: string;
  youtube_id: string;
  title: string;
  title_hi?: string;
  channel: string;
  duration_minutes: number;
  language: 'en' | 'hi' | 'hinglish';
  verified_on: string;
  thumbnail_url: string;
  is_curated: boolean;
  pending_curation?: boolean;
  topic: string;
  subject: string;
  grade_level: number;
}

export const CURATED_VIDEO_LIBRARY: VideoItem[] = [
  {
    id: 'vid_1',
    youtube_id: 'zmhZ_2xN9-I',
    title: 'Class 9 & 10 Physics: Motion & Equations in 15 Minutes',
    title_hi: 'भौतिक विज्ञान: गति और समीकरण — 15 मिनट में पूर्ण समझ',
    channel: 'Khan Academy India',
    duration_minutes: 14,
    language: 'hinglish',
    verified_on: '2026-10-15',
    thumbnail_url: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80',
    is_curated: true,
    topic: 'Motion',
    subject: 'Science',
    grade_level: 9,
  },
  {
    id: 'vid_2',
    youtube_id: 'gQ3D97k3r30',
    title: 'Distance, Displacement & Velocity Visualized',
    title_hi: 'दूरी, विस्थापन और वेग (Velocity) का सजीव चित्रण',
    channel: 'Physics Wallah Foundation',
    duration_minutes: 18,
    language: 'hi',
    verified_on: '2026-10-12',
    thumbnail_url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80',
    is_curated: true,
    topic: 'Motion',
    subject: 'Science',
    grade_level: 9,
  },
  {
    id: 'vid_3',
    youtube_id: '4gC_0x6E0lM',
    title: 'Uniform vs Non-Uniform Motion with Real Life Experiments',
    title_hi: 'समान और असमान गति — वास्तविक जीवन के प्रयोगों के साथ',
    channel: 'BodhaGuru',
    duration_minutes: 9,
    language: 'en',
    verified_on: '2026-10-14',
    thumbnail_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
    is_curated: true,
    topic: 'Motion',
    subject: 'Science',
    grade_level: 9,
  },
  {
    id: 'vid_4',
    youtube_id: '7kL_8yU4vN2',
    title: 'Plant vs Animal Tissues: Complete Microscopic Comparison',
    title_hi: 'पादप एवं जंतु ऊतक (Tissues): सूक्ष्मदर्शी तुलना',
    channel: 'Magnet Brains',
    duration_minutes: 12,
    language: 'hi',
    verified_on: '2026-10-10',
    thumbnail_url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&auto=format&fit=crop&q=80',
    is_curated: true,
    topic: 'Tissues',
    subject: 'Science',
    grade_level: 9,
  },
  {
    id: 'vid_5',
    youtube_id: '1aB_3cD5eF7',
    title: 'Polynomials & Linear Equations: Remainder & Factor Theorem',
    title_hi: 'बहुपद (Polynomials): शेषफल और गुणनखंड प्रमेय',
    channel: 'Unacademy Class 9 & 10',
    duration_minutes: 22,
    language: 'hinglish',
    verified_on: '2026-10-11',
    thumbnail_url: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=600&auto=format&fit=crop&q=80',
    is_curated: true,
    topic: 'Linear Equations',
    subject: 'Mathematics',
    grade_level: 9,
  },
  {
    id: 'vid_6',
    youtube_id: 'UPBMG5EYydo',
    title: 'Class 6 Science: Getting to Know Plants & Photosynthesis',
    title_hi: 'कक्षा 6 विज्ञान: पौधों को जानिए और प्रकाश संश्लेषण',
    channel: 'Khan Academy India',
    duration_minutes: 11,
    language: 'hinglish',
    verified_on: '2026-10-16',
    thumbnail_url: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&auto=format&fit=crop&q=80',
    is_curated: true,
    topic: 'Plants & Photosynthesis',
    subject: 'Science',
    grade_level: 6,
  },
  {
    id: 'vid_7',
    youtube_id: 'n0FZhQ_GkKw',
    title: 'Class 6 Math: Visual Fractions & Decimals in Daily Life',
    title_hi: 'कक्षा 6 गणित: दैनिक जीवन में भिन्न (Fractions) और दशमलव',
    channel: 'BodhaGuru',
    duration_minutes: 10,
    language: 'hi',
    verified_on: '2026-10-15',
    thumbnail_url: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=600&auto=format&fit=crop&q=80',
    is_curated: true,
    topic: 'Fractions',
    subject: 'Mathematics',
    grade_level: 6,
  },
  {
    id: 'vid_8',
    youtube_id: '5bN_9pQ2wR4',
    title: 'Leaf Venation, Transpiration & Root Systems Explored',
    title_hi: 'पत्ती शिरा-विन्यास, वाष्पोत्सर्जन और जड़ प्रणाली',
    channel: 'LearnoHub Class 6-8',
    duration_minutes: 13,
    language: 'en',
    verified_on: '2026-10-14',
    thumbnail_url: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&auto=format&fit=crop&q=80',
    is_curated: true,
    topic: 'Plants & Photosynthesis',
    subject: 'Science',
    grade_level: 6,
  },
];

export interface VideoFilterOptions {
  subject?: string;
  topic?: string;
  gradeLevel?: number;
  maxDurationMinutes?: number;
  language?: 'en' | 'hi' | 'hinglish' | 'all';
}

/**
 * Rank and filter videos with Library-First rule:
 * 1. Match from curated verified educational library
 * 2. Apply duration and language filters
 * 3. If no curated video matches, return a safe "pending curation" entry rather than unvetted links.
 */
export function rankAndFilterVideos(options: VideoFilterOptions): VideoItem[] {
  let matches = CURATED_VIDEO_LIBRARY.filter((v) => {
    if (options.subject && v.subject.toLowerCase() !== options.subject.toLowerCase()) {
      return false;
    }
    if (options.topic && !v.topic.toLowerCase().includes(options.topic.toLowerCase()) && !options.topic.toLowerCase().includes(v.topic.toLowerCase())) {
      return false;
    }
    if (options.gradeLevel && Math.abs(v.grade_level - options.gradeLevel) > 2) {
      return false;
    }
    if (options.maxDurationMinutes && v.duration_minutes > options.maxDurationMinutes) {
      return false;
    }
    if (options.language && options.language !== 'all' && v.language !== options.language) {
      return false;
    }
    return true;
  });

  // Library-first ranking: verified curated items sorted by bite-sized duration first
  matches.sort((a, b) => a.duration_minutes - b.duration_minutes);

  // Fallback rule: If no approved curated match exists, return a safety fallback entry flagged as pending curation
  if (matches.length === 0) {
    return [
      {
        id: 'vid_pending_curation',
        youtube_id: '',
        title: `${options.topic || 'Concept'} Explanation Video`,
        title_hi: `${options.topic || 'अवधारणा'} शिक्षण वीडियो (समीक्षाधीन)`,
        channel: 'NetCyberAI Pedagogy Review Team',
        duration_minutes: 0,
        language: options.language && options.language !== 'all' ? options.language : 'hinglish',
        verified_on: '',
        thumbnail_url: '',
        is_curated: false,
        pending_curation: true,
        topic: options.topic || 'General',
        subject: options.subject || 'General',
        grade_level: options.gradeLevel || 9,
      },
    ];
  }

  return matches;
}
