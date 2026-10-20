'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Zap, Gauge, Compass, Sparkles } from 'lucide-react';
import { Button } from './Button';

interface SimulationProps {
  title?: string;
  topic?: string;
  initialU?: number; // initial velocity m/s
  initialA?: number; // acceleration m/s^2
  locale?: 'en' | 'hi';
}

export const Interactive3DSimulation: React.FC<SimulationProps> = ({
  title = '3D Motion & Acceleration Lab',
  topic = 'Class 10 Physics: v = u + at',
  initialU = 0,
  initialA = 3,
  locale = 'en',
}) => {
  const isHi = locale === 'hi';
  const [u, setU] = useState<number>(initialU);
  const [a, setA] = useState<number>(initialA);
  const [t, setT] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const reqRef = useRef<number | null>(null);
  const prevTimeRef = useRef<number | null>(null);

  // Computed values
  const currentV = Math.min(60, u + a * t); // velocity
  const currentS = u * t + 0.5 * a * t * t; // distance

  useEffect(() => {
    if (!isRunning) {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
      prevTimeRef.current = null;
      return;
    }

    const animate = (timestamp: number) => {
      if (prevTimeRef.current != null) {
        const delta = (timestamp - prevTimeRef.current) / 1000;
        setT((prevT) => {
          if (prevT >= 10) {
            setIsRunning(false);
            return 10;
          }
          return Math.min(10, prevT + delta);
        });
      }
      prevTimeRef.current = timestamp;
      reqRef.current = requestAnimationFrame(animate);
    };

    reqRef.current = requestAnimationFrame(animate);

    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, [isRunning]);

  const handleReset = () => {
    setIsRunning(false);
    setT(0);
    prevTimeRef.current = null;
  };

  // 3D perspective track position
  const normalizedPos = Math.min(1, currentS / 200);
  const carX = normalizedPos * 80 + 5; // 5% to 85%

  return (
    <div className="relative overflow-hidden rounded-4xl bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-7 border-2 border-indigo-500/40 shadow-2xl">
      {/* Background Glow Mesh */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
            <Zap className="w-5 h-5 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold tracking-wider text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {isHi ? 'इंटरैक्टिव 3D भौतिकी सिमुलेशन' : 'Interactive 3D Physics Simulator'}
              </span>
              <span className="text-[10px] bg-indigo-500/30 border border-indigo-400/40 text-indigo-200 px-2 py-0.5 rounded-full font-bold">
                {isHi ? 'लाइव लैब' : 'Live Lab'}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-white mt-0.5">
              {isHi ? 'गति और त्वरण प्रयोगशाला (v = u + at)' : title}
            </h3>
          </div>
        </div>

        {/* Real-time Digital HUD */}
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-white/15">
          <Gauge className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono font-bold text-emerald-300">
            {currentV.toFixed(1)} m/s ({(currentV * 3.6).toFixed(0)} km/h)
          </span>
        </div>
      </div>

      {/* 3D Simulated Perspective Track Canvas */}
      <div className="relative w-full h-48 sm:h-56 rounded-3xl bg-gradient-to-b from-indigo-950/80 via-slate-900 to-slate-950 border border-indigo-500/30 overflow-hidden shadow-inner flex flex-col justify-end p-4">
        {/* Horizon & Distant Sky Grid */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Animated Speed Lines when moving */}
        {isRunning && currentV > 0 && (
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ repeat: Infinity, duration: 0.6 }}
              className="w-full h-full bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"
            />
          </div>
        )}

        {/* 3D Road with Perspective */}
        <div
          className="relative w-full h-28 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 border-t-2 border-amber-400/60 shadow-2xl flex items-center"
          style={{
            transform: 'perspective(500px) rotateX(25deg)',
            transformOrigin: 'bottom center',
          }}
        >
          {/* Lane Markings */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-4 h-1.5 bg-amber-300/60 rounded-full" />
            ))}
          </div>

          {/* Simulated 3D Moving Vehicle (Auto-Rickshaw / Rocket-Bike) */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 -mt-4 transition-all"
            style={{ left: `${carX}%` }}
          >
            <div className="relative group">
              {/* Exhaust flame when accelerating */}
              {isRunning && a > 0 && (
                <motion.div
                  animate={{ scale: [0.8, 1.3, 0.9], opacity: [0.7, 1, 0.8] }}
                  transition={{ repeat: Infinity, duration: 0.15 }}
                  className="absolute -left-6 top-2 w-7 h-4 bg-gradient-to-l from-orange-500 via-amber-400 to-transparent rounded-full blur-[1px]"
                />
              )}

              {/* 3D Vehicle Body */}
              <div className="w-14 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-400 to-yellow-300 border-2 border-white/80 shadow-[0_8px_16px_rgba(245,158,11,0.5)] flex items-center justify-center text-xl select-none transform hover:scale-110 transition-transform">
                🛺
              </div>

              {/* Velocity Floating Tag */}
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-full border border-amber-400/50 text-amber-300 whitespace-nowrap shadow-md">
                v = {currentV.toFixed(1)} m/s
              </div>
            </div>
          </motion.div>
        </div>

        {/* Distance Markers along bottom */}
        <div className="relative z-10 flex justify-between text-[10px] font-mono font-bold text-slate-400 pt-2 px-2">
          <span>0m</span>
          <span>50m</span>
          <span>100m</span>
          <span>150m</span>
          <span>200m+</span>
        </div>
      </div>

      {/* Physics HUD & Interactive Sliders */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Metric 1: Velocity & Formula */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
          <div className="text-[11px] uppercase font-bold text-slate-400 flex items-center justify-between">
            <span>{isHi ? 'अंतिम वेग (v)' : 'Final Velocity (v)'}</span>
            <span className="text-amber-400 font-mono">v = u + at</span>
          </div>
          <div className="text-2xl font-black text-amber-300 mt-1 font-mono">
            {currentV.toFixed(2)} <span className="text-xs text-slate-300 font-normal">m/s</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {isHi ? 'समय (t):' : 'Elapsed Time (t):'} <span className="font-bold text-white">{t.toFixed(1)} s</span>
          </div>
        </div>

        {/* Metric 2: Distance Travelled */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
          <div className="text-[11px] uppercase font-bold text-slate-400 flex items-center justify-between">
            <span>{isHi ? 'तय की गई दूरी (s)' : 'Distance Travelled (s)'}</span>
            <span className="text-emerald-400 font-mono">s = ut + ½at²</span>
          </div>
          <div className="text-2xl font-black text-emerald-300 mt-1 font-mono">
            {currentS.toFixed(1)} <span className="text-xs text-slate-300 font-normal">meters</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {isHi ? 'आरंभिक वेग (u):' : 'Initial Speed (u):'} <span className="font-bold text-white">{u} m/s</span>
          </div>
        </div>

        {/* Metric 3: Live Acceleration Throttle */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="text-[11px] uppercase font-bold text-slate-400 flex items-center justify-between">
              <span>{isHi ? 'त्वरण थ्रॉटल (a)' : 'Throttle Acceleration (a)'}</span>
              <span className="text-cyan-400 font-mono">{a} m/s²</span>
            </div>
            <input
              type="range"
              min="0"
              max="8"
              step="0.5"
              value={a}
              onChange={(e) => setA(parseFloat(e.target.value))}
              className="w-full mt-2 accent-amber-400 cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 font-mono">
            <span>0 (Idle)</span>
            <span>4 (Bumrah Stride)</span>
            <span>8 (Rocket)</span>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
        <div className="flex items-center gap-2">
          <Button
            variant={isRunning ? 'secondary' : 'accent'}
            size="md"
            onClick={() => setIsRunning(!isRunning)}
            leftIcon={isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
          >
            {isRunning ? (isHi ? 'रोकें (Pause)' : 'Pause') : (isHi ? 'चलाएं (Start Run)' : 'Start Acceleration')}
          </Button>

          <Button
            variant="outline"
            size="md"
            onClick={handleReset}
            leftIcon={<RotateCcw className="w-4 h-4" />}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            {isHi ? 'पुनः आरंभ (Reset)' : 'Reset'}
          </Button>
        </div>

        <div className="text-xs text-indigo-200/90 font-medium hidden sm:flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span>{isHi ? 'थ्रॉटल स्लाइडर को बदलकर देखें गति कैसे बढ़ती है!' : 'Drag the throttle slider to feel the acceleration force!'}</span>
        </div>
      </div>
    </div>
  );
};
