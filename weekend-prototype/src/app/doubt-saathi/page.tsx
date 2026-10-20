'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { VoiceMicButton } from '@/components/ui/VoiceMicButton';
import { Send, Bot, CheckCircle2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'saathi';
  text: string;
  text_hi?: string;
  desiAnalogy?: string;
  desiAnalogy_hi?: string;
  checkQuestion?: {
    question: string;
    question_hi: string;
    options: string[];
    options_hi: string[];
    correctIndex: number;
  };
  selectedCheckOption?: number;
}

export default function DoubtSaathiPage() {
  const { activeChild, activeSyllabus, activeWeakTopics, t, locale } = useApp();
  const isHi = locale === 'hi';

  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const childDisplayName = isHi && activeChild?.name_hi ? activeChild.name_hi : activeChild?.name;
  const activeChapter = activeSyllabus.chapters[0];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'saathi',
      text: `Hello ${activeChild?.name}! I'm your Doubt Saathi for Class ${activeChild?.grade_level || 9} (${activeChild?.board || 'CBSE'}). Ask me any question from ${activeChapter?.title || 'your syllabus'} by typing or tapping the microphone!`,
      text_hi: `नमस्ते ${childDisplayName}! मैं कक्षा ${activeChild?.grade_level || 9} (${activeChild?.board || 'CBSE'}) के लिए आपका 'डाउट साथी' हूँ। ${activeChapter?.title_hi || 'अपने सिलेबस'} से जुड़ा कोई भी प्रश्न लिखकर या माइक दबाकर बोलकर पूछें!`,
    },
  ]);

  const buildPedagogicalReply = (query: string): ChatMessage => {
    const q = query.toLowerCase();
    if (q.includes('plant') || q.includes('photosynthesis') || q.includes('पौध') || q.includes('प्रकाश')) {
      return {
        id: 'reply_' + Date.now(),
        sender: 'saathi',
        text: 'Photosynthesis (प्रकाश संश्लेषण) is the process by which green leaves use sunlight, water (from roots), and carbon dioxide (from air) in the presence of Chlorophyll to prepare food (glucose) and release oxygen.',
        text_hi:
          'प्रकाश संश्लेषण (Photosynthesis) वह प्रक्रिया है जिसमें हरी पत्तियां क्लोरोफिल (Chlorophyll) की उपस्थिति में सूर्य के प्रकाश, जल और कार्बन डाइऑक्साइड की सहायता से अपना भोजन (ग्लूकोज) बनाती हैं।',
        desiAnalogy:
          'Think of a green leaf as your home kitchen: water and CO₂ are the raw rice & dal, Chlorophyll is the cooking pot, and sunlight is the stove flame!',
        desiAnalogy_hi:
          'हरी पत्ती को अपने घर की रसोई समझें: पानी और कार्बन डाइऑक्साइड कच्चे दाल-चावल हैं, क्लोरोफिल बर्तन है, और सूर्य की धूप गैस की आंच है!',
        checkQuestion: {
          question: 'Which gas do green plants release into the air during photosynthesis?',
          question_hi: 'प्रकाश संश्लेषण के दौरान हरे पौधे हवा में कौन सी गैस छोड़ते हैं?',
          options: ['Carbon Dioxide', 'Oxygen', 'Nitrogen', 'Hydrogen'],
          options_hi: ['कार्बन डाइऑक्साइड', 'ऑक्सीजन (Oxygen)', 'नाइट्रोजन', 'हाइड्रोजन'],
          correctIndex: 1,
        },
      };
    }

    if (q.includes('fraction') || q.includes('polynomial') || q.includes('भिन्न') || q.includes('बहुपद')) {
      return {
        id: 'reply_' + Date.now(),
        sender: 'saathi',
        text: 'To compare or add fractions with unlike denominators (or factor a polynomial), first bring them to a common base (LCM of denominators) or test the root using P(a) = 0.',
        text_hi:
          'असमान हर (Denominator) वाले भिन्नों को जोड़ने के लिए पहले हरों का लघुत्तम समापवर्त्य (LCM) निकालें ताकि दोनों समान आधार पर आ जाएं।',
        desiAnalogy:
          'Just like cutting two rotis into equal-sized quarters before counting total pieces shared at dinner!',
        desiAnalogy_hi:
          'जैसे खाने की मेज पर रोटियों के टुकड़े गिनने से पहले उन्हें बराबर चौथाई टुकड़ों में बांटा जाता है!',
        checkQuestion: {
          question: 'What is the sum of 1/4 + 2/4?',
          question_hi: '1/4 + 2/4 का योग क्या होगा?',
          options: ['3/8', '3/4', '2/8', '1/2'],
          options_hi: ['3/8', '3/4', '2/8', '1/2'],
          correctIndex: 1,
        },
      };
    }

    return {
      id: 'reply_' + Date.now(),
      sender: 'saathi',
      text: 'Acceleration (त्वरण) means how quickly velocity changes each second. In formula terms, a = (v - u) / t, where u is initial velocity (m/s), v is final velocity (m/s), and t is time (s).',
      text_hi:
        'त्वरण (Acceleration) का सीधा अर्थ है प्रति सेकंड वेग का बदलना। सूत्र के रूप में, a = (v - u) / t, जहाँ u आरंभिक वेग है और v अंतिम वेग है।',
      desiAnalogy:
        'Like Jasprit Bumrah building speed during his bowling run-up, or an auto-rickshaw accelerating ahead the moment a traffic signal turns green!',
      desiAnalogy_hi:
        'क्रिकेट में जसप्रीत बुमराह का बॉलिंग क्रीज की ओर दौड़ते हुए रफ्तार पकड़ना इसका सर्वश्रेष्ठ देसी उदाहरण है!',
      checkQuestion: {
        question: 'If a vehicle starts from rest (u = 0) and reaches 30 m/s in 10 seconds, what is its acceleration?',
        question_hi: 'यदि कोई गाड़ी स्थिर (u = 0) से 10 सेकंड में 30 m/s पहुंचती है, तो उसका त्वरण क्या होगा?',
        options: ['3 m/s²', '30 m/s²', '10 m/s²', '300 m/s²'],
        options_hi: ['3 m/s²', '30 m/s²', '10 m/s²', '300 m/s²'],
        correctIndex: 0,
      },
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text: query,
      text_hi: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);
      const reply = buildPedagogicalReply(query);
      setMessages((prev) => [...prev, reply]);
    }, 450);
  };

  const handleAnswerCheck = (msgId: string, optIdx: number) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, selectedCheckOption: optIdx } : m))
    );
  };

  const quickPrompts = isHi
    ? [
        'त्वरण का मात्रक m/s² क्यों होता है?',
        'प्रकाश संश्लेषण (Photosynthesis) को देसी उदाहरण से समझाएं',
        'असमान हर वाले भिन्न कैसे जोड़ें?',
      ]
    : [
        'Why is acceleration measured in m/s²?',
        'Explain Photosynthesis with a kitchen analogy',
        'How to add fractions with unlike denominators?',
      ];

  return (
    <div className="space-y-4 max-w-3xl mx-auto flex flex-col h-[80vh]">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <Badge variant="brand" size="sm">
            {childDisplayName} • {t('profile.grade')} {activeChild?.grade_level}
          </Badge>
          <Badge variant="purple" size="sm">
            {isHi ? activeChapter?.title_hi : activeChapter?.title}
          </Badge>
          {activeWeakTopics.length > 0 && (
            <Badge variant="warning" size="sm">
              {isHi ? `पुनः अभ्यास: ${activeWeakTopics[0]}` : `Focus: ${activeWeakTopics[0]}`}
            </Badge>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t('nav.doubt')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mt-0.5">
          {isHi
            ? 'लिखकर या माइक दबाकर कोई भी प्रश्न पूछें। हम देसी उदाहरण के साथ समझाते हैं और आपकी समझ भी जांचते हैं।'
            : 'Ask any concept question by text or voice mic. We explain with real-world examples and check your understanding.'}
        </p>
      </div>

      {/* Quick Prompt Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {quickPrompts.map((qp) => (
          <button
            key={qp}
            type="button"
            onClick={() => handleSend(qp)}
            className="text-[11px] font-semibold px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-brand-400 text-slate-700 shrink-0 transition-colors"
          >
            💬 {qp}
          </button>
        ))}
      </div>

      {/* Chat Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-white/80 backdrop-blur-sm rounded-4xl border border-slate-100 shadow-soft-sm">
        {messages.map((m) => {
          const isUser = m.sender === 'user';
          const checkOpts = isHi
            ? m.checkQuestion?.options_hi || m.checkQuestion?.options || []
            : m.checkQuestion?.options || [];

          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-3xl p-4 shadow-soft-sm ${
                  isUser
                    ? 'bg-brand-600 text-white rounded-tr-none'
                    : 'bg-slate-50 border border-slate-100 text-slate-800 rounded-tl-none'
                }`}
              >
                <p className="text-xs sm:text-sm leading-relaxed">
                  {isHi && m.text_hi ? m.text_hi : m.text}
                </p>

                {(m.desiAnalogy || m.desiAnalogy_hi) && (
                  <div className="mt-3 p-3 bg-amber-50 border border-amber-200/80 rounded-2xl text-xs text-amber-900 leading-snug">
                    <strong>🏏 {isHi ? 'देसी उदाहरण:' : 'Desi Analogy:'}</strong>{' '}
                    {isHi && m.desiAnalogy_hi ? m.desiAnalogy_hi : m.desiAnalogy}
                  </div>
                )}

                {m.checkQuestion && (
                  <div className="mt-3 p-3.5 bg-indigo-50/80 border border-indigo-100 rounded-2xl text-xs text-indigo-950">
                    <strong className="block mb-2 text-brand-700">
                      ⚡ {isHi ? 'अपनी समझ जांचें:' : 'Check Your Understanding:'}
                    </strong>
                    <div className="mb-2 font-semibold">
                      {isHi ? m.checkQuestion.question_hi : m.checkQuestion.question}
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {checkOpts.map((opt, oIdx) => {
                        const isPicked = m.selectedCheckOption === oIdx;
                        const isRight = oIdx === m.checkQuestion?.correctIndex;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleAnswerCheck(m.id, oIdx)}
                            className={`p-2 rounded-xl border text-[11px] font-semibold text-left transition-all flex items-center justify-between ${
                              isPicked
                                ? isRight
                                  ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                                  : 'bg-rose-100 border-rose-400 text-rose-900'
                                : 'bg-white border-indigo-100 text-slate-700 hover:border-brand-400'
                            }`}
                          >
                            <span>{opt}</span>
                            {isPicked && isRight && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                  {activeChild?.avatar || '👤'}
                </div>
              )}
            </motion.div>
          );
        })}

        {isThinking && (
          <div className="flex gap-3 items-center text-xs text-slate-500 p-2">
            <Bot className="w-4 h-4 animate-bounce text-brand-500" />
            <span>
              {isHi
                ? 'डाउट साथी देसी उदाहरण के साथ उत्तर तैयार कर रहा है...'
                : 'Doubt Saathi is preparing your pedagogical breakdown...'}
            </span>
          </div>
        )}
      </div>

      {/* Input Bar with Voice Mic */}
      <div className="p-2 bg-white rounded-3xl border border-slate-200/80 shadow-soft-md flex items-center gap-2">
        <VoiceMicButton
          language={isHi ? 'hi-IN' : 'en-IN'}
          onTranscript={(speechText) => {
            setInputText(speechText);
            handleSend(speechText);
          }}
        />

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
          placeholder={
            isHi
              ? 'अपना डाउट लिखें या माइक दबाकर बोलें...'
              : 'Ask a doubt or tap the mic (e.g. Why is acceleration m/s²?)'
          }
          className="flex-1 text-xs sm:text-sm px-3 py-2 bg-transparent focus:outline-none text-slate-800"
        />

        <Button
          size="sm"
          variant="primary"
          onClick={() => handleSend()}
          disabled={!inputText.trim()}
          leftIcon={<Send className="w-3.5 h-3.5" />}
        >
          {isHi ? 'पूछें' : 'Ask'}
        </Button>
      </div>
    </div>
  );
}
