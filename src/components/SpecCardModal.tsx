import React, { useState } from 'react';
import { Check, Copy, Printer, X } from 'lucide-react';
import {
  analyzeBodyProfile,
  buildPersonalBuyingMatrix,
} from '../data/atelierEngine';
import { BodyMeasurements } from '../types/atelier';

interface SpecCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  measurements: BodyMeasurements;
}

export const SpecCardModal: React.FC<SpecCardModalProps> = ({
  isOpen,
  onClose,
  measurements,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const diagnostic = analyzeBodyProfile(measurements);
  const buyingMatrix = buildPersonalBuyingMatrix(measurements);

  const handleCopyText = async () => {
    const lines = [
      `【裁度 Atelier · 个人选衣尺寸卡】`,
      `身形判断：${diagnostic.name}（肩胯比 ${diagnostic.shoulderHipRatio.toFixed(2)} / 腰臀比 ${diagnostic.waistHipRatio.toFixed(2)}）`,
      `净体数据：身高 ${measurements.height}cm · 肩宽 ${measurements.shoulder}cm · 胸围 ${measurements.chest}cm · 腰围 ${measurements.waist}cm · 臀围 ${measurements.hip}cm · 背长 ${measurements.torsoLength}cm · 臂长 ${measurements.armLength}cm · 裤内长 ${measurements.inseam}cm`,
      ``,
      `【各品类黄金成衣选购数据】`,
      ...buyingMatrix.map(
        (row) =>
          `- ${row.category}：合体通勤(${row.tailoredRange}) | 松弛廓形(${row.relaxedRange}) | ${row.keyTip}`
      ),
    ];

    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="个人选衣尺寸卡"
      className="fixed inset-0 z-50 bg-[#141413]/55 backdrop-blur-[2px] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="printable-spec-card"
        className="bg-white border border-[#E2E2DC] w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E2E2DC] flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-mono text-[#5C5C57]">
              PERSONAL PATTERN SPECIFICATION CARD
            </p>
            <h3 className="font-display text-2xl font-semibold text-[#141413] mt-0.5">
              个人数据选衣尺寸卡
            </h3>
          </div>
          <div className="flex items-center gap-2 print:hidden">
            <button
              type="button"
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#141413] hover:bg-[#2A2A28] rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  已复制文本
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  复制备忘录
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#141413] bg-white border border-[#E2E2DC] hover:border-[#141413] rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              打印 / PDF
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="关闭尺寸卡"
              className="p-1.5 text-[#5C5C57] hover:text-[#141413] border border-[#E2E2DC] rounded-sm cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-6 lg:p-8 space-y-6">
          {/* Net Body Readout Strip */}
          <div className="p-5 bg-[#FAFAF8] border border-[#E2E2DC]">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
              <span className="text-sm font-semibold text-[#141413]">
                {diagnostic.name}
              </span>
              <span className="text-xs font-mono text-[#5C5C57] tabular-nums">
                肩胯比 {diagnostic.shoulderHipRatio.toFixed(2)} · 腰臀比{' '}
                {diagnostic.waistHipRatio.toFixed(2)} · 腿身比{' '}
                {(diagnostic.legHeightRatio * 100).toFixed(1)}%
              </span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 text-center">
              {[
                { k: '身高', v: measurements.height },
                { k: '肩宽', v: measurements.shoulder },
                { k: '胸围', v: measurements.chest },
                { k: '腰围', v: measurements.waist },
                { k: '臀围', v: measurements.hip },
                { k: '背长', v: measurements.torsoLength },
                { k: '臂长', v: measurements.armLength },
                { k: '内长', v: measurements.inseam },
              ].map((item) => (
                <div key={item.k} className="bg-white border border-[#E2E2DC] py-2 px-1">
                  <span className="block text-[10px] text-[#5C5C57]">{item.k}</span>
                  <span className="block font-mono text-sm font-semibold text-[#141413] tabular-nums mt-0.5">
                    {item.v}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 5-Category Buying Matrix */}
          <div>
            <h4 className="text-sm font-semibold text-[#141413] mb-3">
              网购与试衣对照：各品类目标成衣尺寸区间（cm）
            </h4>
            <div className="overflow-x-auto border border-[#E2E2DC]">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#FAFAF8] border-b border-[#E2E2DC] text-[#5C5C57]">
                    <th className="py-3 px-3.5 font-medium">服装品类</th>
                    <th className="py-3 px-3.5 font-medium">精裁合体区间</th>
                    <th className="py-3 px-3.5 font-medium">松弛廓形区间</th>
                    <th className="py-3 px-3.5 font-medium">纵向/比例锚点</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E2DC]">
                  {buyingMatrix.map((row) => (
                    <tr key={row.category}>
                      <td className="py-3 px-3.5 font-semibold text-[#141413] whitespace-nowrap">
                        {row.category}
                      </td>
                      <td className="py-3 px-3.5 font-mono text-[#141413] tabular-nums">
                        {row.tailoredRange}
                      </td>
                      <td className="py-3 px-3.5 font-mono text-[#1D4ED8] tabular-nums">
                        {row.relaxedRange}
                      </td>
                      <td className="py-3 px-3.5 text-[#5C5C57]">{row.keyTip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Core Patternmaker Rules */}
          <div className="pt-4 border-t border-[#E2E2DC] text-xs text-[#5C5C57] leading-relaxed space-y-1.5">
            <p className="font-semibold text-[#141413]">黄金选购备忘：</p>
            <p>1. {diagnostic.tailoringStrategy.shoulderRule}</p>
            <p>2. {diagnostic.tailoringStrategy.waistAndLengthRule}</p>
            <p>3. {diagnostic.tailoringStrategy.trouserRule}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
