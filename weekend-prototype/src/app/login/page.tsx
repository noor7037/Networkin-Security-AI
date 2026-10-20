'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { Phone, Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { t, setParentPhone, locale } = useApp();
  const isHi = locale === 'hi';

  const [phone, setPhone] = useState('919876543210');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [consentChecked, setConsentChecked] = useState(true);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);
      setOtpCode('123456');
      setStatusMessage(
        isHi
          ? 'व्हाट्सएप सत्यापन कोड भेजा गया (कोड: 123456)'
          : 'WhatsApp verification code dispatched (Code: 123456)'
      );
    }, 400);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setParentPhone(phone);
      router.push('/');
    }, 400);
  };

  const handleQuickDemo = () => {
    setParentPhone('919876543210');
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 py-8">
      <div className="w-full max-w-md">
        <div className="flex justify-end mb-4">
          <LanguageSwitcher />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div className="w-14 h-14 mx-auto mb-3 rounded-3xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white text-2xl font-black shadow-soft-md shadow-brand-500/25">
            N
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1">
            {t('login.title')}
          </h1>
          <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
            {t('login.subtitle')}
          </p>
        </motion.div>

        <Card className="p-6 sm:p-8 bg-white border border-slate-100 shadow-xl rounded-4xl">
          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t('login.phone_placeholder')}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Phone className="w-4 h-4" />
                  </span>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="919876543210"
                    className="w-full pl-11 pr-4 py-3 text-sm rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
                  />
                </div>
              </div>

              {/* DPDP Consent Notice */}
              <label className="flex items-start gap-2.5 p-3 bg-emerald-50/70 border border-emerald-200/70 rounded-2xl text-[11px] text-emerald-900 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentChecked}
                  onChange={(e) => setConsentChecked(e.target.checked)}
                  required
                  className="mt-0.5 rounded border-emerald-300 text-brand-600 focus:ring-brand-500"
                />
                <span>
                  <strong className="font-bold block mb-0.5 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline" />
                    {isHi ? 'DPDP गोपनीयता सहमति' : 'DPDP Privacy & Data Minimization Guarantee'}
                  </strong>
                  {isHi
                    ? 'हम कभी भी आधार या सरकारी पहचान पत्र नहीं मांगते। केवल कक्षा, बोर्ड और अध्ययन प्रगति आपके परिवार के लिए सहेजी जाती है।'
                    : 'Zero Aadhaar or government IDs collected. Only class, board, and learning milestones are stored for your family.'}
                </span>
              </label>

              <Button type="submit" fullWidth size="lg" disabled={loading || !consentChecked}>
                {loading ? (isHi ? 'कोड भेजा जा रहा है...' : 'Sending Code...') : t('login.get_otp')}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t('login.otp_placeholder')}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="123456"
                    className="w-full pl-11 pr-4 py-3 text-sm rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 tracking-widest font-mono font-bold text-center"
                  />
                </div>
              </div>

              {statusMessage && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-[11px] text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}

              <Button type="submit" fullWidth size="lg" disabled={loading}>
                {loading ? (isHi ? 'सत्यापित हो रहा है...' : 'Verifying...') : t('login.verify_btn')}
              </Button>
            </form>
          )}

          <div className="mt-5 pt-4 border-t border-slate-100 text-center">
            <button
              type="button"
              aria-label="Quick Demo Sign-In"
              onClick={handleQuickDemo}
              className="text-xs font-bold text-brand-600 hover:text-brand-700 hover:underline min-h-[36px] px-3"
            >
              ⚡ {t('login.dev_quick')}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
