import { NextRequest, NextResponse } from 'next/server';
import { aiRouter } from '@/lib/ai-router';
import { generateHomeworkGuidance } from '@/lib/homework';
import { assembleDoubtSaathiContext } from '@/lib/pedagogy/doubt-saathi';
import { rankAndFilterVideos } from '@/lib/videos';
import {
  calculateExamCountdown,
  calculateBlueprintMarksSum,
  calculateSyllabusTimetable,
} from '@/lib/toolkit';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, payload } = body;

    switch (action) {
      case 'extract_syllabus': {
        const res = await aiRouter.extractSyllabus(payload || {});
        return NextResponse.json({ ok: true, data: res });
      }
      case 'generate_explanation': {
        const res = await aiRouter.generateExplanation(payload);
        return NextResponse.json({ ok: true, data: res });
      }
      case 'generate_mind_map': {
        const res = await aiRouter.generateMindMap(payload);
        return NextResponse.json({ ok: true, data: res });
      }
      case 'generate_quiz': {
        const res = await aiRouter.generateQuiz(payload);
        return NextResponse.json({ ok: true, data: res });
      }
      case 'rank_videos': {
        const res = rankAndFilterVideos(payload || {});
        return NextResponse.json({ ok: true, data: res });
      }
      case 'homework_guidance': {
        const res = generateHomeworkGuidance(payload);
        return NextResponse.json({ ok: true, data: res });
      }
      case 'doubt_context': {
        const res = assembleDoubtSaathiContext(payload);
        return NextResponse.json({ ok: true, data: res });
      }
      case 'exam_toolkit': {
        const countdown = calculateExamCountdown(payload.examDate);
        const blueprint = payload.sections ? calculateBlueprintMarksSum(payload.sections) : null;
        const timetable = payload.subjects ? calculateSyllabusTimetable({ subjects: payload.subjects }) : [];
        return NextResponse.json({ ok: true, data: { countdown, blueprint, timetable } });
      }
      default:
        return NextResponse.json({ ok: false, error: 'Unknown action' }, { status: 400 });
    }
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || 'Internal error' }, { status: 500 });
  }
}
