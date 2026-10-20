import { describe, it, expect } from 'vitest';
import { aiRouter } from '../../src/lib/ai-router';

describe('A3: Pedagogy Playbook & SVG Mind Maps', () => {
  it('implements the 4-step Pedagogy Playbook with mother-tongue scaffolding', async () => {
    const explanation = await aiRouter.generateExplanation({
      subject: 'Science',
      chapter: 'Motion',
      topic: 'Acceleration',
      childGrade: 9,
      medium: 'hindi',
      childName: 'Aarav',
    });

    // Step 1: Simple Real-World Example
    expect(explanation.simple_example).toBeDefined();
    expect(explanation.simple_example.length).toBeGreaterThan(15);

    // Step 2: Desi-Life Analogy
    expect(explanation.desi_analogy).toBeDefined();
    expect(explanation.desi_analogy).toMatch(/बुमराह|साइकिल|ऑटो-रिक्शा|cricket/i);

    // Step 3: Step-by-Step with English Technical Terms Highlighted
    expect(explanation.step_by_step.length).toBeGreaterThanOrEqual(3);
    expect(explanation.english_terms_highlighted.length).toBeGreaterThanOrEqual(2);
    expect(explanation.english_terms_highlighted[0]).toHaveProperty('english');
    expect(explanation.english_terms_highlighted[0]).toHaveProperty('transliterationOrHindi');

    // Step 4: Rapid Check Question
    expect(explanation.quick_check_question).toBeDefined();
    expect(explanation.quick_check_question.options.length).toBe(4);
    expect(explanation.quick_check_question.correct_index).toBeGreaterThanOrEqual(0);

    // Step 5: Embedded English Practice Piece (2-3 lines)
    expect(explanation.daily_english_practice).toBeDefined();
    expect(explanation.daily_english_practice.phrase_en).toBeDefined();
    expect(explanation.daily_english_practice.phrase_hi).toBeDefined();
  });

  it('generates an animated SVG Mind Map data structure with marks weight', async () => {
    const mindMap = await aiRouter.generateMindMap({
      subject: 'Science',
      chapterTitle: 'Motion (गति)',
      topics: ['Distance vs Displacement', 'Velocity', 'Acceleration', 'Equations of Motion'],
    });

    expect(mindMap.title).toBe('Motion (गति)');
    expect(mindMap.nodes.length).toBeGreaterThanOrEqual(5);
    expect(mindMap.edges.length).toBeGreaterThanOrEqual(4);

    const rootNode = mindMap.nodes.find((n) => n.id === 'node_root');
    expect(rootNode).toBeDefined();
    expect(rootNode?.level).toBe(0);

    // Child nodes have marks weight
    const childNodes = mindMap.nodes.filter((n) => n.level === 1);
    expect(childNodes.length).toBe(4);
    expect(childNodes[0].marks_weight).toBeGreaterThan(0);
  });
});
