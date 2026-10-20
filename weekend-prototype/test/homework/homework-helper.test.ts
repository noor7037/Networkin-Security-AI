import { describe, it, expect } from 'vitest';
import { generateHomeworkGuidance } from '../../src/lib/homework';

describe('A11: Homework Helper Socratic Method Guidance', () => {
  const sampleQuestion =
    'A train starting from railway station attains a speed of 40 km/h in 10 minutes. Find its acceleration.';

  it('structures guidance into 3 rigorous pedagogical method steps', () => {
    const guidance = generateHomeworkGuidance({
      questionText: sampleQuestion,
      subject: 'Science',
      gradeLevel: 9,
    });

    expect(guidance.steps.length).toBe(3);
    expect(guidance.steps[0].title).toContain('Step 1');
    expect(guidance.steps[0].title).toContain('Extract Given Quantities');
    expect(guidance.steps[1].title).toContain('Step 2');
    expect(guidance.steps[1].title).toContain('Convert to Standard SI Units');
    expect(guidance.steps[2].title).toContain('Step 3');
    expect(guidance.steps[2].title).toContain('Apply the Core Formula');
  });

  it('enforces bareFinalAnswerSuppressed = true to prevent cheating and encourage thinking', () => {
    const guidance = generateHomeworkGuidance({
      questionText: sampleQuestion,
      subject: 'Science',
      gradeLevel: 9,
    });

    // The platform must explicitly certify that bare answer was suppressed
    expect(guidance.bareFinalAnswerSuppressed).toBe(true);
    expect(guidance.pedagogicalNotice).toContain('teach how to think, not what to copy');

    // Verify step 3 instructs the student to perform the final division themselves
    const step3Text = guidance.steps[2].keyPoints.join(' ');
    expect(step3Text).toContain('perform the final division in your notebook');

    // Ensure it does not present a bare final number like "0.0185" as a copy-paste solution
    const allText = JSON.stringify(guidance);
    expect(allText).not.toContain('0.0185185');
  });

  it('includes mandatory SI unit conversion instructions and guidance', () => {
    const guidance = generateHomeworkGuidance({
      questionText: sampleQuestion,
      subject: 'Science',
      gradeLevel: 9,
    });

    const step2Text = guidance.steps[1].keyPoints.join(' ');
    expect(step2Text).toContain('5/18'); // km/h to m/s conversion factor
    expect(step2Text).toContain('60 s'); // minutes to seconds conversion
    expect(guidance.siUnitGuidance).toContain('m/s²');
  });

  it('renders Devanagari Hindi method structure when language is hi', () => {
    const guidanceHi = generateHomeworkGuidance({
      questionText: 'एक रेलगाड़ी स्टेशन से 40 किमी/घंटा की गति 10 मिनट में प्राप्त करती है। त्वरण ज्ञात कीजिए।',
      language: 'hi',
    });

    expect(guidanceHi.steps[0].title).toContain('चरण 1');
    expect(guidanceHi.steps[1].title).toContain('चरण 2');
    expect(guidanceHi.steps[2].title).toContain('चरण 3');
    expect(guidanceHi.steps[1].description).toContain('मानक SI मात्रकों');
  });
});
