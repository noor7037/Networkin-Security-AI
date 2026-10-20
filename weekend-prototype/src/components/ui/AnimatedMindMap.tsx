'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MindMapData } from '@/lib/ai-router';
import { useApp } from '@/context/AppContext';

interface AnimatedMindMapProps {
  data: MindMapData;
  className?: string;
  onNodeSelect?: (nodeLabel: string) => void;
}

export const AnimatedMindMap: React.FC<AnimatedMindMapProps> = ({
  data,
  className = '',
  onNodeSelect,
}) => {
  const { locale } = useApp();
  const isHi = locale === 'hi';
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const rootNode = data.nodes.find((n) => n.level === 0) || data.nodes[0];
  const level1Nodes = data.nodes.filter((n) => n.level === 1);
  const level2Nodes = data.nodes.filter((n) => n.level === 2);

  return (
    <div className={`w-full overflow-x-auto bg-slate-900 rounded-3xl p-4 sm:p-6 shadow-xl text-white ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b border-slate-800 pb-3">
        <div>
          <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">
            {isHi ? `${data.subject} अवधारणा मानचित्र (SVG)` : `${data.subject} Concept Map (Animated SVG)`}
          </span>
          <h3 className="text-lg font-bold text-white">{data.title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-brand-900/60 text-brand-300 border border-brand-700/50 px-2.5 py-1 rounded-full font-medium">
            {isHi ? `परीक्षा भार: ${rootNode?.marks_weight || 10} अंक` : `Exam Weight: ${rootNode?.marks_weight || 10} Marks`}
          </span>
        </div>
      </div>

      <div className="min-w-[680px] h-[340px] relative flex flex-col justify-between items-center py-2">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          {data.edges.map((edge, idx) => {
            const fromNode = data.nodes.find((n) => n.id === edge.from);
            const toNode = data.nodes.find((n) => n.id === edge.to);
            if (!fromNode || !toNode) return null;

            return (
              <motion.line
                key={`edge-${idx}`}
                x1={fromNode.x}
                y1={fromNode.y + 20}
                x2={toNode.x}
                y2={toNode.y - 10}
                stroke="#6366F1"
                strokeWidth={fromNode.level === 0 ? '3' : '1.5'}
                strokeDasharray={fromNode.level === 0 ? 'none' : '4 4'}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                transition={{ duration: 0.8, delay: idx * 0.12, ease: 'easeOut' }}
              />
            );
          })}
        </svg>

        {/* Root Node */}
        {rootNode && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="z-10 bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-bold px-6 py-3 rounded-2xl shadow-colored-science border-2 border-indigo-300 text-center cursor-default max-w-[280px]"
            style={{ position: 'absolute', left: `${rootNode.x - 140}px`, top: `${rootNode.y - 20}px` }}
          >
            <div className="text-sm">{isHi && rootNode.label_hi ? rootNode.label_hi : rootNode.label}</div>
            <div className="text-[10px] text-indigo-200 mt-0.5">
              {isHi ? 'मूल आधार इकाई' : 'Core Foundation Unit'}
            </div>
          </motion.div>
        )}

        {/* Level 1 Topic Nodes */}
        {level1Nodes.map((node, idx) => {
          const isSelected = selectedNodeId === node.id;
          return (
            <motion.div
              key={node.id}
              initial={{ scale: 0, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.25 + idx * 0.08 }}
              onClick={() => {
                setSelectedNodeId(node.id);
                onNodeSelect?.(isHi && node.label_hi ? node.label_hi : node.label);
              }}
              className={`z-10 rounded-2xl p-3 border text-center shadow-lg transition-all hover:scale-105 cursor-pointer max-w-[155px] ${
                isSelected
                  ? 'bg-brand-600 text-white border-amber-300 ring-2 ring-amber-300'
                  : 'bg-slate-800/90 hover:bg-slate-700/90 text-slate-100 border-indigo-500/30'
              }`}
              style={{ position: 'absolute', left: `${node.x - 75}px`, top: `${node.y - 15}px` }}
            >
              <div className="text-xs font-semibold text-white">
                {isHi && node.label_hi ? node.label_hi : node.label}
              </div>
              {node.marks_weight && (
                <span className="inline-block mt-1 text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded-full font-medium border border-emerald-800/40">
                  ~{node.marks_weight} {isHi ? 'अंक' : 'Marks'}
                </span>
              )}
            </motion.div>
          );
        })}

        {/* Level 2 Sub-nodes */}
        {level2Nodes.map((node, idx) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + idx * 0.08 }}
            className="z-10 bg-slate-900/80 text-slate-300 text-[11px] px-3 py-1.5 rounded-xl border border-slate-700/60 text-center max-w-[145px]"
            style={{ position: 'absolute', left: `${node.x - 70}px`, top: `${node.y}px` }}
          >
            {isHi && node.label_hi ? node.label_hi : node.label}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
