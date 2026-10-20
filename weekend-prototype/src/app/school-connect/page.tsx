'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Building2,
  ShieldCheck,
  CreditCard,
  Unlink,
  Bell,
  Award,
  BookOpen,
} from 'lucide-react';
import Link from 'next/link';

export default function SchoolConnectPage() {
  const {
    activeChild,
    activeSchool,
    connectChildSchool,
    disconnectChildSchool,
    addNotification,
    t,
    locale,
  } = useApp();

  const isHi = locale === 'hi';
  const [schoolCode, setSchoolCode] = useState('DPS45');
  const [otp, setOtp] = useState('123456');
  const [showFeeSection, setShowFeeSection] = useState(true);

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeChild) return;
    connectChildSchool(activeChild.id, schoolCode);
    addNotification({
      childId: activeChild.id,
      childName: activeChild.name,
      childAvatar: activeChild.avatar,
      title: 'School Connect Established',
      title_hi: 'स्कूल कनेक्ट स्थापित हुआ',
      body: 'Delhi Public School connection active. Attendance and notices synced.',
      body_hi: 'दिल्ली पब्लिक स्कूल कनेक्शन सक्रिय। उपस्थिति और सूचनाएं सिंक हो गईं।',
      type: 'school_update',
    });
  };

  const handleDisconnect = () => {
    if (!activeChild) return;
    disconnectChildSchool(activeChild.id);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Badge variant={activeSchool.isConnected ? 'success' : 'neutral'} size="sm">
            {activeSchool.isConnected
              ? isHi
                ? 'स्कूल संबद्ध (Connected)'
                : 'School Connected'
              : isHi
              ? 'स्वतंत्र मोड (Standalone)'
              : 'Standalone Mode'}
          </Badge>
          <span className="text-xs text-slate-400">
            {isHi ? 'ऐच्छिक शासित ERP ब्रिज' : 'Optional Governed ERP Link'}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t('school.title')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mt-0.5">
          {t('school.subtitle')}
        </p>
      </div>

      {activeSchool.isConnected ? (
        /* Connected State with Mirrored Modules in Native Consumer Design System */
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* School Header Banner */}
          <Card className="p-5 sm:p-6 bg-gradient-to-r from-emerald-800 to-slate-900 text-white rounded-3xl shadow-soft-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-emerald-400">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  {isHi ? activeSchool.schoolName_hi : activeSchool.schoolName}
                </h3>
                <div className="text-xs text-emerald-200 mt-0.5">
                  {isHi
                    ? `विद्यार्थी आईडी: ${activeSchool.studentSchoolId} • कक्षा ${activeChild?.grade_level || 9} अनुभाग ${activeSchool.section}`
                    : `Student ID: ${activeSchool.studentSchoolId} • Class ${activeChild?.grade_level || 9} Section ${activeSchool.section}`}
                </div>
              </div>
            </div>

            <Button
              size="sm"
              variant="danger"
              leftIcon={<Unlink className="w-3.5 h-3.5" />}
              onClick={handleDisconnect}
            >
              {t('school.disconnect_btn')}
            </Button>
          </Card>

          {/* Module 1: Attendance Grid */}
          <Card className="p-5 border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">{t('school.attendance')}</h3>
              <Badge variant="success" size="sm">
                {activeSchool.attendance.percentage}%{' '}
                {isHi ? 'कुल उपस्थिति' : 'Overall Presence'}
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-slate-50 rounded-2xl">
                <span className="text-xs text-slate-500 block">
                  {isHi ? 'कुल कार्यदिवस' : 'Total Days'}
                </span>
                <span className="text-lg font-bold text-slate-800">
                  {activeSchool.attendance.totalDays}
                </span>
              </div>
              <div className="p-3 bg-emerald-50 rounded-2xl">
                <span className="text-xs text-emerald-700 block">
                  {isHi ? 'उपस्थित' : 'Attended'}
                </span>
                <span className="text-lg font-bold text-emerald-900">
                  {activeSchool.attendance.presentDays}
                </span>
              </div>
              <div className="p-3 bg-rose-50 rounded-2xl">
                <span className="text-xs text-rose-700 block">
                  {isHi ? 'अनुपस्थित' : 'Absences'}
                </span>
                <span className="text-lg font-bold text-rose-900">
                  {activeSchool.attendance.absences}
                </span>
              </div>
            </div>
          </Card>

          {/* Module 2: Homework Mirror + 1-Tap Homework Helper Bridge */}
          <Card className="p-5 border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">{t('school.homework')}</h3>
              <Link
                href="/homework-helper"
                className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{isHi ? 'गृहकार्य सहायक में खोलें' : 'Open Homework Helper'}</span>
              </Link>
            </div>
            <div className="space-y-2">
              {activeSchool.homework.map((hw) => (
                <div
                  key={hw.id}
                  className="p-3.5 bg-slate-50 rounded-2xl flex items-center justify-between gap-2 text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-800 block">
                      {isHi ? hw.title_hi : hw.title}
                    </span>
                    <span className="text-slate-400">
                      {isHi ? hw.dueDate_hi : hw.dueDate}
                    </span>
                  </div>
                  <Badge
                    variant={hw.status === 'Pending' ? 'warning' : 'success'}
                    size="sm"
                  >
                    {hw.status === 'Pending'
                      ? isHi
                        ? 'लंबित'
                        : 'Pending'
                      : isHi
                      ? 'जमा किया गया'
                      : 'Submitted'}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Module 3: Official School Notices & Mirrored Report Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-5 border border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Bell className="w-4 h-4 text-brand-600" />
                <span>{t('school.notices')}</span>
              </h3>
              <div className="space-y-2.5">
                {activeSchool.notices.map((notice) => (
                  <div
                    key={notice.id}
                    className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-800">
                        {isHi ? notice.title_hi : notice.title}
                      </span>
                      <span className="text-[10px] text-slate-400">{notice.date}</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      {isHi ? notice.content_hi : notice.content}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5 border border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>
                  {isHi
                    ? 'मध्यावधि मूल्यांकन अंकपत्र (Report Card)'
                    : 'Mirrored Term Assessment Report Card'}
                </span>
              </h3>
              <div className="space-y-2 text-xs">
                {activeSchool.reportCard.map((rc) => (
                  <div
                    key={rc.subject}
                    className="p-2.5 bg-slate-50 rounded-xl flex items-center justify-between"
                  >
                    <span className="font-semibold text-slate-800">
                      {isHi ? rc.subject_hi : rc.subject}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-600 font-medium">
                        {rc.marks}/{rc.total}
                      </span>
                      <Badge variant="success" size="sm">
                        {rc.grade}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Module 4: Strictly Segregated & Skippable Fee Card */}
          <Card className="p-5 border-2 border-slate-200 bg-slate-50/50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-slate-500" />
                <h3 className="text-sm font-bold text-slate-800">{t('school.fee_title')}</h3>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="neutral" size="sm">
                  {isHi ? 'पूर्णतः पृथक' : 'Strictly Segregated'}
                </Badge>
                <button
                  type="button"
                  onClick={() => setShowFeeSection(!showFeeSection)}
                  className="text-[11px] font-bold text-brand-600 hover:underline"
                >
                  {showFeeSection
                    ? isHi
                      ? 'छुपाएं (Skip)'
                      : 'Skip / Hide'
                    : isHi
                    ? 'दिखाएं'
                    : 'Show'}
                </button>
              </div>
            </div>
            <p className="text-xs text-slate-500 mb-3 leading-relaxed">
              {isHi
                ? 'बाल गोपनीयता मानकों के अनुसार, शुल्क विवरण को शैक्षणिक प्रदर्शन और रिपोर्ट कार्ड से पूरी तरह अलग रखा गया है।'
                : 'In accordance with child privacy standards, fee standings are strictly separated from academic evaluations.'}
            </p>
            {showFeeSection && (
              <div className="p-3 bg-white rounded-2xl border border-slate-200 text-xs flex items-center justify-between">
                <div>
                  <span className="text-slate-500 block">
                    {isHi
                      ? activeSchool.feeStanding.termLabel_hi
                      : activeSchool.feeStanding.termLabel}
                  </span>
                  <span className="font-bold text-emerald-700">
                    {isHi
                      ? activeSchool.feeStanding.duesAmount_hi
                      : activeSchool.feeStanding.duesAmount}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400">
                  {isHi
                    ? activeSchool.feeStanding.nextDueDate_hi
                    : activeSchool.feeStanding.nextDueDate}
                </span>
              </div>
            )}
          </Card>
        </motion.div>
      ) : (
        /* Disconnected / Connect Flow */
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          {activeSchool.disconnectSummary && (
            <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-3xl text-xs text-emerald-900 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>
                  {isHi
                    ? 'डेटा सुरक्षा गारंटी लागू (Data Retention Guarantee)'
                    : 'Data Retention Guarantee Honored'}
                </span>
              </div>
              <p>
                {isHi
                  ? activeSchool.disconnectSummary.retention_guarantee_hi
                  : activeSchool.disconnectSummary.retention_guarantee}
              </p>
              <div className="flex flex-wrap gap-2 pt-1 font-semibold">
                <span className="bg-white px-2.5 py-1 rounded-full border border-emerald-200">
                  {activeSchool.disconnectSummary.learning_vault_records_kept}{' '}
                  {isHi ? 'वॉल्ट रिकॉर्ड सुरक्षित' : 'Vault Records Kept'}
                </span>
                <span className="bg-white px-2.5 py-1 rounded-full border border-emerald-200">
                  {activeSchool.disconnectSummary.quiz_history_kept}{' '}
                  {isHi ? 'क्विज़ रिकॉर्ड सुरक्षित' : 'Quiz Records Kept'}
                </span>
              </div>
            </div>
          )}

          <Card className="p-6 sm:p-8 bg-white border border-slate-100 max-w-md mx-auto">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              {t('school.connect_btn')}
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              {isHi
                ? 'स्कूल अपडेट प्राप्त करने के लिए अपना स्कूल कोड और एक-बारगी सत्यापन कोड दर्ज करें।'
                : 'Enter your school registration code and guardian verification code to mirror school updates.'}
            </p>

            <form onSubmit={handleConnect} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isHi ? 'स्कूल कोड (School Code)' : 'School Code'}
                </label>
                <input
                  type="text"
                  value={schoolCode}
                  onChange={(e) => setSchoolCode(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isHi
                    ? 'अभिभावक सत्यापन कोड (OTP)'
                    : 'Guardian One-Time Verification Code (OTP)'}
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono tracking-widest font-bold"
                />
              </div>

              <Button type="submit" fullWidth size="lg">
                {isHi ? 'स्कूल से जुड़ें' : 'Connect School'}
              </Button>
            </form>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
