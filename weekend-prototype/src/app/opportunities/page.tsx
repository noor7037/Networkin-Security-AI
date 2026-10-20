'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { VoiceMicButton } from '@/components/ui/VoiceMicButton';
import {
  ShieldCheck,
  ExternalLink,
  CheckCircle2,
  Search,
  Archive,
} from 'lucide-react';
import { SEEDED_OPPORTUNITIES, OpportunityItem } from '@/lib/opportunities/data';

export default function OpportunitiesPage() {
  const { activeChild, addNotification, t, locale } = useApp();
  const isHi = locale === 'hi';

  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAllGrades, setShowAllGrades] = useState<boolean>(false);
  const [showFounderQueue, setShowFounderQueue] = useState(false);

  // Stateful opportunities list so approving a candidate moves it live into the parent view!
  const [allOpportunities, setAllOpportunities] = useState<OpportunityItem[]>(SEEDED_OPPORTUNITIES);
  const [reviewedSuccessMsg, setReviewedSuccessMsg] = useState('');

  const childGrade = activeChild?.grade_level || 9;

  const candidateList = allOpportunities.filter(
    (o) => o.founder_review_status === 'pending_review'
  );

  // Parent visible: ONLY verified and approved opportunities matching child's grade (or all grades if toggled)
  const verifiedList = allOpportunities.filter((opp) => {
    const isApproved = opp.status === 'verified' && opp.founder_review_status === 'approved';
    const gradeMatch = showAllGrades || opp.eligible_grades.includes(childGrade);
    const typeMatch = filterType === 'all' || opp.type === filterType;
    const queryMatch =
      !searchQuery.trim() ||
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.benefit_summary.toLowerCase().includes(searchQuery.toLowerCase());
    return isApproved && gradeMatch && typeMatch && queryMatch;
  });

  const handleApproveCandidate = (id: string) => {
    const target = allOpportunities.find((o) => o.id === id);
    setAllOpportunities((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
              ...o,
              status: 'verified',
              founder_review_status: 'approved',
              last_verified_on: '2026-10-18',
            }
          : o
      )
    );
    setReviewedSuccessMsg(
      isHi
        ? 'उम्मीदवार योजना सत्यापित और अभिभावकों के लिए स्वीकृत की गई!'
        : 'Candidate scheme verified and approved for parents!'
    );
    if (target && activeChild) {
      addNotification({
        childId: activeChild.id,
        childName: activeChild.name,
        childAvatar: activeChild.avatar,
        title: `New Verified Scheme: ${target.title}`,
        title_hi: `नई सत्यापित योजना: ${target.title}`,
        body: target.benefit_summary,
        body_hi: target.benefit_summary,
        type: 'scheme_match',
      });
    }
    setTimeout(() => setReviewedSuccessMsg(''), 4000);
  };

  const handleRejectCandidate = (id: string) => {
    setAllOpportunities((prev) =>
      prev.map((o) => (o.id === id ? { ...o, founder_review_status: 'rejected' } : o))
    );
    setReviewedSuccessMsg(
      isHi
        ? 'उम्मीदवार योजना अस्वीकृत कर संग्रह (Archive) में भेजी गई।'
        : 'Candidate scheme rejected and archived.'
    );
    setTimeout(() => setReviewedSuccessMsg(''), 4000);
  };

  const typeLabel = (type: string) => {
    if (!isHi) return type.replace('_', ' ').toUpperCase();
    if (type === 'scholarship') return 'छात्रवृत्ति (SCHOLARSHIP)';
    if (type === 'competitive_exam') return 'प्रतियोगी परीक्षा (EXAM)';
    if (type === 'olympiad') return 'ओलंपियाड (OLYMPIAD)';
    return 'सरकारी योजना (SCHEME)';
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <Badge variant="brand" size="sm">
              {isHi
                ? `कक्षा ${childGrade} से मेल खाती योजनाएं`
                : `Matched to Class ${childGrade}`}
            </Badge>
            <span className="text-xs text-slate-400">
              {isHi
                ? '100% सत्यापित सरकारी व राष्ट्रीय पोर्टल'
                : '100% Verified Government & National Portals'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('opp.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mt-0.5">
            {t('opp.subtitle')}
          </p>
        </div>

        {/* Founder Queue Toggle */}
        <Button
          variant={showFounderQueue ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setShowFounderQueue(!showFounderQueue)}
        >
          {showFounderQueue
            ? isHi
              ? 'अभिभावक योजनाएं देखें'
              : 'View Parent Matches'
            : t('opp.founder_queue_btn')}
        </Button>
      </div>

      {reviewedSuccessMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{reviewedSuccessMsg}</span>
        </div>
      )}

      {showFounderQueue ? (
        /* Founder Review Queue UI */
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="p-4 bg-amber-50/80 border border-amber-200/80 rounded-3xl text-xs text-amber-900">
            <strong>
              {isHi ? 'फाउंडर समीक्षा मानक (Trust Rule):' : 'Founder Review Standard:'}
            </strong>{' '}
            {isHi
              ? 'आधिकारिक राजपत्र या पोर्टल से स्वतंत्र सत्यापन के बिना कोई भी योजना अभिभावकों को नहीं दिखाई जाती।'
              : 'No scheme or exam is shown to parents until independently verified against the official gazette or portal. Candidate items require human approval.'}
          </div>

          <h2 className="text-base font-bold text-slate-800">
            {isHi
              ? `लंबित उम्मीदवार कतार (${candidateList.length})`
              : `Pending Candidate Queue (${candidateList.length})`}
          </h2>

          {candidateList.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-100">
              <span className="text-2xl block mb-2">🎉</span>
              <div className="text-sm font-bold text-slate-800">
                {isHi ? 'समीक्षा कतार खाली है' : 'Queue is Clear'}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {isHi
                  ? 'सभी स्कैन किए गए अवसरों की समीक्षा पूरी हो चुकी है।'
                  : 'All scanned opportunities have been reviewed.'}
              </div>
            </div>
          ) : (
            candidateList.map((cand) => (
              <Card key={cand.id} className="p-5 border-l-4 border-l-amber-500">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <Badge variant="warning" size="sm">
                    {isHi ? 'उम्मीदवार (असत्यापित)' : 'Candidate (Unverified)'}
                  </Badge>
                  <span className="text-xs text-slate-400">
                    {isHi
                      ? `स्कैन तिथि: ${cand.last_verified_on}`
                      : `Scanned on ${cand.last_verified_on}`}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1">{cand.title}</h3>
                <p className="text-xs text-slate-500 mb-3">{cand.benefit_summary}</p>

                <div className="text-xs text-slate-600 mb-4 flex items-center gap-2">
                  <span className="font-semibold">
                    {isHi ? 'प्रस्तावित आधिकारिक स्रोत:' : 'Proposed Source:'}
                  </span>
                  <a
                    href={cand.official_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-600 hover:underline flex items-center gap-1"
                  >
                    <span>{cand.official_url}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => handleApproveCandidate(cand.id)}
                  >
                    {isHi
                      ? 'सत्यापित करें और अभिभावकों के लिए खोलें'
                      : 'Approve & Verify for Parents'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRejectCandidate(cand.id)}
                  >
                    {isHi ? 'अस्वीकार करें' : 'Reject Candidate'}
                  </Button>
                </div>
              </Card>
            ))
          )}
        </motion.div>
      ) : (
        /* Parent Matched Opportunities View */
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {/* Search Bar with Voice Mic & Class Toggle */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-3xl border border-slate-100 shadow-soft-sm">
            <div className="flex items-center gap-2 flex-1">
              <Search className="w-4 h-4 text-slate-400 ml-1 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isHi
                    ? 'योजना या परीक्षा खोजें (उदा. NMMSS, Navodaya, Olympiad)...'
                    : 'Search verified schemes or exams (e.g. NMMSS, Navodaya, Olympiad)...'
                }
                className="flex-1 text-xs sm:text-sm bg-transparent focus:outline-none text-slate-800"
              />
              <VoiceMicButton
                size="sm"
                language={isHi ? 'hi-IN' : 'en-IN'}
                onTranscript={(spoken) => setSearchQuery(spoken)}
              />
            </div>

            <button
              type="button"
              onClick={() => setShowAllGrades(!showAllGrades)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 border ${
                showAllGrades
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {showAllGrades
                ? isHi
                  ? 'सभी कक्षाएं (1–12) दिख रही हैं'
                  : 'Showing All Classes (1–12)'
                : isHi
                ? `केवल कक्षा ${childGrade} (${verifiedList.length})`
                : `Class ${childGrade} Matches (${verifiedList.length})`}
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pb-1">
            {[
              { id: 'all', label: isHi ? 'सभी अवसर' : 'All Opportunities' },
              { id: 'scholarship', label: isHi ? 'छात्रवृत्तियां' : 'Scholarships' },
              { id: 'competitive_exam', label: isHi ? 'प्रतियोगी परीक्षाएं' : 'Competitive Exams' },
              { id: 'olympiad', label: isHi ? 'ओलंपियाड' : 'Olympiads' },
              { id: 'scheme', label: isHi ? 'सरकारी योजनाएं' : 'Govt Schemes' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilterType(f.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  filterType === f.id
                    ? 'bg-brand-600 text-white shadow-soft-sm'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/80'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Opportunities List */}
          <div className="space-y-3.5">
            {verifiedList.map((opp) => (
              <Card
                key={opp.id}
                hoverEffect
                className="p-5 sm:p-6 border border-slate-100 bg-white"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="brand" size="sm">
                      {typeLabel(opp.type)}
                    </Badge>
                    <span className="text-xs font-bold text-slate-500">{opp.organization}</span>
                  </div>

                  <span className="text-xs text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full font-semibold border border-amber-200">
                    {isHi ? `अंतिम तिथि: ${opp.deadline}` : `Deadline: ${opp.deadline}`}
                  </span>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">
                  {opp.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {opp.benefit_summary}
                </p>

                {/* Provenance & Action Footer */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-2 text-emerald-700 font-medium">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      {isHi
                        ? `सत्यापित तिथि: ${opp.last_verified_on} • पात्र कक्षा: ${opp.eligible_grades.join(', ')}`
                        : `Verified on ${opp.last_verified_on} • Eligible for Class ${opp.eligible_grades.join(', ')}`}
                    </span>
                  </div>

                  <a
                    href={opp.official_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-brand-700 font-bold rounded-full transition-colors self-start sm:self-auto"
                  >
                    <span>{t('opp.official_portal')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </Card>
            ))}
          </div>

          {/* Visible Expiry Archiving Note */}
          <div className="p-4 bg-slate-100/80 border border-slate-200/80 rounded-2xl text-xs text-slate-600 flex items-center gap-2.5">
            <Archive className="w-4 h-4 text-slate-500 shrink-0" />
            <span>
              {isHi
                ? 'बीती हुई अंतिम तिथि वाली योजनाएं स्वचालित रूप से संग्रहित (Archived) हो जाती हैं ताकि अभिभावकों को केवल सक्रिय अवसर ही दिखें।'
                : 'Past-deadline schemes are automatically archived by the Freshness Agent so families only see active, actionable opportunities.'}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
