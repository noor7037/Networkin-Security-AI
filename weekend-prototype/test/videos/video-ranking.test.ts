import { describe, it, expect } from 'vitest';
import { rankAndFilterVideos, CURATED_VIDEO_LIBRARY } from '../../src/lib/videos';

describe('A5: Video Ranking Logic & Safety Guardrails', () => {
  it('applies library-first ranking: verified curated items ordered by bite-sized duration', () => {
    const videos = rankAndFilterVideos({
      subject: 'Science',
      topic: 'Motion',
    });

    expect(videos.length).toBeGreaterThanOrEqual(2);
    // Every result must be from the curated library
    expect(videos.every((v) => v.is_curated)).toBe(true);
    // Ordered by bite-sized duration ascending
    for (let i = 0; i < videos.length - 1; i++) {
      expect(videos[i].duration_minutes).toBeLessThanOrEqual(videos[i + 1].duration_minutes);
    }
  });

  it('filters videos by maximum duration (e.g. bite-sized under 15 minutes)', () => {
    const shortVideos = rankAndFilterVideos({
      subject: 'Science',
      topic: 'Motion',
      maxDurationMinutes: 15,
    });

    expect(shortVideos.length).toBeGreaterThanOrEqual(1);
    for (const v of shortVideos) {
      expect(v.duration_minutes).toBeLessThanOrEqual(15);
    }

    // Video with 18 minutes duration should be filtered out
    const hasLongVideo = shortVideos.some((v) => v.duration_minutes > 15);
    expect(hasLongVideo).toBe(false);
  });

  it('filters videos by preferred language (Hindi, English, Hinglish)', () => {
    const hindiVideos = rankAndFilterVideos({
      subject: 'Science',
      topic: 'Motion',
      language: 'hi',
    });

    expect(hindiVideos.length).toBeGreaterThanOrEqual(1);
    for (const v of hindiVideos) {
      expect(v.language).toBe('hi');
    }

    const englishVideos = rankAndFilterVideos({
      subject: 'Science',
      topic: 'Motion',
      language: 'en',
    });

    expect(englishVideos.length).toBeGreaterThanOrEqual(1);
    for (const v of englishVideos) {
      expect(v.language).toBe('en');
    }
  });

  it('provides safe fallback flagged as pending curation when no curated match exists', () => {
    // Non-existent obscure topic
    const uncuratedResults = rankAndFilterVideos({
      subject: 'Advanced Rocket Science',
      topic: 'Ion Propulsion Warp Drive Calculations',
      gradeLevel: 9,
    });

    expect(uncuratedResults.length).toBe(1);
    const fallback = uncuratedResults[0];
    expect(fallback.is_curated).toBe(false);
    expect(fallback.pending_curation).toBe(true);
    // Safe guardrail: Never inject unvetted random YouTube video URLs to students
    expect(fallback.youtube_id).toBe('');
    expect(fallback.channel).toContain('NetCyberAI Pedagogy Review Team');
  });
});
