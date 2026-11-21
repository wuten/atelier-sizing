import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import {
  BODY_PRESETS,
  MEASUREMENT_GUIDES,
  analyzeBodyProfile,
} from '../data/atelierEngine';
import { BodyMeasurements, MeasurementKey } from '../types/atelier';
import { AtelierFigureSVG } from './AtelierFigureSVG';

interface MeasurementStudioProps {
  measurements: BodyMeasurements;
  onChange: (next: BodyMeasurements) => void;
  onOpenSpecCard: () => void;
}

export const MeasurementStudio: React.FC<MeasurementStudioProps> = ({
  measurements,
  onChange,
  onOpenSpecCard,
}) => {
  const [activeKey, setActiveKey] = useState<MeasurementKey>('chest');
  const activeGuide =
    MEASUREMENT_GUIDES.find((g) => g.key === activeKey) ?? MEASUREMENT_GUIDES[2];
  const diagnostic = analyzeBodyProfile(measurements);

  const handleFieldChange = (key: MeasurementKey, rawValue: number) => {
    const guide = MEASUREMENT_GUIDES.find((g) => g.key === key);
    if (!guide || Number.isNaN(rawValue)) return;
    const clamped = Math.min(guide.max, Math.max(guide.min, rawValue));
    onChange({
      ...measurements,
      [key]: clamped,
    });
  };

  return (
    <section
      id="measurement-studio"
      className="py-16 lg:py-24 border-t border-[#E2E2DC]"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wider text-[#5C5C57] mb-2">
              01 · 净体量体与比例诊断
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-semibold tracking-tight text-[#141413] text-balance">
              像制版师一样，先建立你的身体数据档案
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#5C5C57]">
              服装设计师从不靠“S/M/L”做判断，而是以净体骨骼点为基准，计算每个部位的加放松量。输入或微调你的 8 项关键尺寸，系统将自动同步至全站风格推演与选款算法。
            </p>
          </div>

          {/* Preset switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#5C5C57] mr-1">快速代入参考身形：</span>
            {BODY_PRESETS.map((preset) => {
              const isSelected =
                preset.measurements.height === measurements.height &&
                preset.measurements.chest === measurements.chest &&
                preset.measurements.waist === measurements.waist &&
                preset.measurements.hip === measurements.hip;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onChange({ ...preset.measurements })}
                  className={`px-3 py-1.5 text-xs font-medium rounded-sm border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#141413] text-white border-[#141413]'
                      : 'bg-white text-[#141413] border-[#E2E2DC] hover:border-[#141413]'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Two-Zone Studio Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Zone: Interactive Anatomical Figure + Active Tape Guide */}
          <div className="lg:col-span-5 bg-white border border-[#E2E2DC] flex flex-col justify-between">
            <div className="p-6 lg:p-8 atelier-grid-bg flex-1 flex flex-col justify-center">
              <div className="flex items-center justify-between text-xs text-[#5C5C57] mb-4">
                <span>实时人体制版投影</span>
                <span className="font-mono tabular-nums text-[#141413]">
                  {measurements.height}cm · {diagnostic.code}型廓形
                </span>
              </div>
              <AtelierFigureSVG
                measurements={measurements}
                activeKey={activeKey}
                onSelectKey={setActiveKey}
              />
            </div>

            {/* Contextual Tailor Measuring Guide for Active Point */}
            <div className="p-6 border-t border-[#E2E2DC] bg-[#FAFAF8]">
              <div className="flex items-baseline justify-between gap-4 mb-3">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-base font-semibold text-[#141413]">
                    量体指导：{activeGuide.label}
                  </h3>
                  <span className="text-xs text-[#5C5C57] font-mono">
                    {activeGuide.enLabel}
                  </span>
                </div>
                <span className="font-mono text-sm font-semibold text-[#1D4ED8] tabular-nums">
                  {measurements[activeGuide.key]} {activeGuide.unit}
                </span>
              </div>

              <div className="space-y-2.5 text-sm leading-relaxed">
                <p className="text-[#141413]">
                  <span className="font-medium text-[#5C5C57]">准确量法：</span>
                  {activeGuide.howToMeasure}
                </p>
                <p className="text-[#141413]">
                  <span className="font-medium text-[#5C5C57]">制版意义：</span>
                  {activeGuide.designerNote}
                </p>
                <p className="text-xs text-[#5C5C57] pt-1 border-t border-[#E2E2DC]">
                  避坑提示：{activeGuide.commonMistake}
                </p>
              </div>
            </div>
          </div>

          {/* Right Zone: 8-Point Precision Measurement Controls */}
          <div className="lg:col-span-7 bg-white border border-[#E2E2DC] p-6 lg:p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b border-[#E2E2DC]">
                <div>
                  <h3 className="text-base font-semibold text-[#141413]">
                    身体 8 项核心净体尺寸（单位：cm）
                  </h3>
                  <p className="text-xs text-[#5C5C57] mt-1">
                    点击任意尺寸行可联动左侧人体图，数据将自动保存于本地浏览器
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="inline-flex bg-[#F1F1ED] p-0.5 rounded-sm border border-[#E2E2DC]">
                    {(
                      [
                        { id: 'womens', label: '女装基准' },
                        { id: 'mens', label: '男装基准' },
                        { id: 'unisex', label: '无性别' },
                      ] as const
                    ).map((sys) => (
                      <button
                        key={sys.id}
                        type="button"
                        onClick={() =>
                          onChange({ ...measurements, patternSystem: sys.id })
                        }
                        className={`px-2.5 py-1 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          measurements.patternSystem === sys.id
                            ? 'bg-white text-[#141413] shadow-2xs'
                            : 'text-[#5C5C57] hover:text-[#141413]'
                        }`}
                      >
                        {sys.label}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => onChange({ ...BODY_PRESETS[0].measurements })}
                    title="重置为默认尺寸"
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-[#5C5C57] hover:text-[#141413] border border-[#E2E2DC] rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    重置
                  </button>
                </div>
              </div>

              {/* 2-Column Measurement Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                {MEASUREMENT_GUIDES.map((item) => {
                  const isActive = activeKey === item.key;
                  const val = measurements[item.key];
                  return (
                    <div
                      key={item.key}
                      onClick={() => setActiveKey(item.key)}
                      className={`p-3.5 -mx-1 rounded-sm border transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#F8FAFF] border-[#1D4ED8]/40'
                          : 'bg-transparent border-transparent hover:bg-[#FAFAF8] hover:border-[#E2E2DC]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className="flex items-baseline gap-2 min-w-0">
                          <label
                            htmlFor={`measure-${item.key}`}
                            className={`text-sm font-medium cursor-pointer ${
                              isActive ? 'text-[#1D4ED8]' : 'text-[#141413]'
                            }`}
                          >
                            {item.label}
                          </label>
                          <span className="text-[11px] text-[#5C5C57] font-mono truncate">
                            {item.enLabel}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <input
                            id={`measure-${item.key}`}
                            type="number"
                            min={item.min}
                            max={item.max}
                            step={item.step}
                            value={val}
                            onFocus={() => setActiveKey(item.key)}
                            onChange={(e) =>
                              handleFieldChange(item.key, parseFloat(e.target.value))
                            }
                            className="w-16 px-2 py-1 text-right font-mono text-sm font-semibold tabular-nums text-[#141413] bg-white border border-[#D4D4CE] rounded-sm focus:outline-none focus:border-[#1D4ED8]"
                          />
                          <span className="text-xs font-mono text-[#5C5C57]">
                            {item.unit}
                          </span>
                        </div>
                      </div>

                      <input
                        type="range"
                        aria-label={item.label}
                        min={item.min}
                        max={item.max}
                        step={item.step}
                        value={val}
                        onFocus={() => setActiveKey(item.key)}
                        onChange={(e) =>
                          handleFieldChange(item.key, parseFloat(e.target.value))
                        }
                        className="atelier-slider"
                      />
                      <div className="flex justify-between mt-1.5 text-[10px] font-mono text-[#8A8A83] tabular-nums">
                        <span>{item.min}</span>
                        <span>{Math.round((item.min + item.max) / 2)}</span>
                        <span>{item.max} cm</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Summary Footer inside Input Panel */}
            <div className="mt-8 pt-5 border-t border-[#E2E2DC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-[#5C5C57] flex flex-wrap items-center gap-x-3 gap-y-1">
                <span>
                  三围差值：胸腰差{' '}
                  <strong className="font-mono text-[#141413] tabular-nums">
                    {diagnostic.chestWaistDiff}cm
                  </strong>
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  臀腰差{' '}
                  <strong className="font-mono text-[#141413] tabular-nums">
                    {diagnostic.hipWaistDiff}cm
                  </strong>
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  腿身比{' '}
                  <strong className="font-mono text-[#141413] tabular-nums">
                    {(diagnostic.legHeightRatio * 100).toFixed(1)}%
                  </strong>
                </span>
              </div>
              <button
                type="button"
                onClick={onOpenSpecCard}
                className="text-xs font-semibold text-[#1D4ED8] hover:underline whitespace-nowrap shrink-0 cursor-pointer text-left sm:text-right"
              >
                导出我的个人选衣尺寸卡 →
              </button>
            </div>
          </div>
        </div>

        {/* Designer Body Proportion Diagnostic Panel (Full-width structured readout) */}
        <div className="mt-8 bg-white border border-[#E2E2DC] p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Silhouette Overview */}
            <div className="lg:col-span-4 lg:pr-6 lg:border-r border-[#E2E2DC]">
              <p className="text-xs text-[#5C5C57] font-mono mb-1.5">
                {diagnostic.enName}
              </p>
              <h3 className="font-display text-2xl font-semibold text-[#141413]">
                {diagnostic.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#5C5C57]">
                {diagnostic.summary}
              </p>

              {/* Key Quantitative Proportions */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-5 border-t border-[#E2E2DC]">
                <div>
                  <p className="text-[11px] text-[#5C5C57]">肩胯视觉比</p>
                  <p className="font-mono text-lg font-semibold text-[#141413] tabular-nums mt-0.5">
                    {diagnostic.shoulderHipRatio.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-[#5C5C57]">腰臀比 WHR</p>
                  <p className="font-mono text-lg font-semibold text-[#141413] tabular-nums mt-0.5">
                    {diagnostic.waistHipRatio.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-[#5C5C57]">内腿占比</p>
                  <p className="font-mono text-lg font-semibold text-[#141413] tabular-nums mt-0.5">
                    {(diagnostic.legHeightRatio * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>

            {/* 4 Designer Tailoring Rules */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs font-semibold text-[#141413] mb-1.5">
                  01. 肩线构建法则
                </h4>
                <p className="text-sm leading-relaxed text-[#5C5C57]">
                  {diagnostic.tailoringStrategy.shoulderRule}
                </p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-[#141413] mb-1.5">
                  02. 衣长与腰节锚点
                </h4>
                <p className="text-sm leading-relaxed text-[#5C5C57]">
                  {diagnostic.tailoringStrategy.waistAndLengthRule}
                </p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-[#141413] mb-1.5">
                  03. 黄金松量基准
                </h4>
                <p className="text-sm leading-relaxed text-[#5C5C57]">
                  {diagnostic.tailoringStrategy.easeRecommendation}
                </p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-[#141413] mb-1.5">
                  04. 下装版型与裤内长
                </h4>
                <p className="text-sm leading-relaxed text-[#5C5C57]">
                  {diagnostic.tailoringStrategy.trouserRule}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
