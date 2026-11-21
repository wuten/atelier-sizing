import React, { useState } from 'react';
import {
  CustomBottomSpecInput,
  CustomTopSpecInput,
  verifyCustomBottomSpec,
  verifyCustomTopSpec,
} from '../data/atelierEngine';
import { BodyMeasurements, EaseStatus } from '../types/atelier';

interface GarmentSpecVerifierProps {
  measurements: BodyMeasurements;
}

function getSpectrumPosition(status: EaseStatus): number {
  switch (status) {
    case 'tight':
      return 12;
    case 'tailored':
      return 34;
    case 'balanced':
      return 56;
    case 'relaxed':
      return 78;
    case 'oversized':
      return 93;
  }
}

function getStatusColor(status: EaseStatus): string {
  switch (status) {
    case 'tight':
      return 'text-[#BE123C]';
    case 'tailored':
      return 'text-[#1D4ED8]';
    case 'balanced':
      return 'text-[#047857]';
    case 'relaxed':
      return 'text-[#B45309]';
    case 'oversized':
      return 'text-[#52524E]';
  }
}

export const GarmentSpecVerifier: React.FC<GarmentSpecVerifierProps> = ({
  measurements,
}) => {
  const [mode, setMode] = useState<'top' | 'bottom'>('top');

  const [topInput, setTopInput] = useState<CustomTopSpecInput>({
    garmentType: 'shirt',
    isHalfMeasurement: false,
    shoulder: Math.round((measurements.shoulder + 3.5) * 2) / 2,
    chestInput: measurements.chest + 16,
    length: Math.round(measurements.torsoLength + 26),
    sleeve: Math.round(measurements.armLength - 1),
  });

  const [bottomInput, setBottomInput] = useState<CustomBottomSpecInput>({
    isHalfMeasurement: false,
    waistInput: measurements.waist + 3,
    hipInput: measurements.hip + 12,
    outseam: Math.round(measurements.inseam + measurements.height * 0.175),
    frontRise: Math.round(measurements.height * 0.172),
    hemWidth: 23,
  });

  const evaluation =
    mode === 'top'
      ? verifyCustomTopSpec(measurements, topInput)
      : verifyCustomBottomSpec(measurements, bottomInput);

  const loadSample = (sample: 'tight-blazer' | 'clean-shirt' | 'wide-trousers') => {
    if (sample === 'tight-blazer') {
      setMode('top');
      setTopInput({
        garmentType: 'blazer',
        isHalfMeasurement: false,
        shoulder: Number((measurements.shoulder - 1).toFixed(1)),
        chestInput: measurements.chest + 6,
        length: Math.round(measurements.torsoLength + 23),
        sleeve: Math.round(measurements.armLength - 3),
      });
    } else if (sample === 'clean-shirt') {
      setMode('top');
      setTopInput({
        garmentType: 'shirt',
        isHalfMeasurement: true,
        shoulder: Number((measurements.shoulder + 4).toFixed(1)),
        chestInput: Math.round((measurements.chest + 18) / 2),
        length: Math.round(measurements.torsoLength + 27),
        sleeve: Math.round(measurements.armLength - 1),
      });
    } else {
      setMode('bottom');
      setBottomInput({
        isHalfMeasurement: false,
        waistInput: measurements.waist + 3,
        hipInput: measurements.hip + 14,
        outseam: Math.round(measurements.inseam + 29),
        frontRise: 30,
        hemWidth: 24.5,
      });
    }
  };

  return (
    <section
      id="spec-verifier"
      className="py-16 lg:py-24 border-t border-[#E2E2DC]"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wider text-[#5C5C57] mb-2">
              04 · 网购尺码表反推验算器
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-semibold tracking-tight text-[#141413] text-balance">
              下单前 10 秒，用商家详情页数据验算真实上身效果
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#5C5C57]">
              网购踩雷的核心原因是只看“体重建议表”。把详情页里的平铺或整圈尺寸填入左侧，系统立即按你的净体尺寸计算每个部位松量，提前预警紧绷、溜肩或卡胯风险。
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#5C5C57]">代入典型网购案例：</span>
            <button
              type="button"
              onClick={() => loadSample('tight-blazer')}
              className="px-3 py-1.5 text-xs font-medium bg-white border border-[#E2E2DC] hover:border-[#141413] rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              踩雷：偏窄肩西装
            </button>
            <button
              type="button"
              onClick={() => loadSample('clean-shirt')}
              className="px-3 py-1.5 text-xs font-medium bg-white border border-[#E2E2DC] hover:border-[#141413] rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              单面平铺：松弛衬衫
            </button>
            <button
              type="button"
              onClick={() => loadSample('wide-trousers')}
              className="px-3 py-1.5 text-xs font-medium bg-white border border-[#E2E2DC] hover:border-[#141413] rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              高腰垂感宽西裤
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Merchant Spec Input Panel */}
          <div className="lg:col-span-5 bg-white border border-[#E2E2DC] p-6 lg:p-8 flex flex-col justify-between">
            <div>
              {/* Top / Bottom Mode Switch */}
              <div className="flex items-center justify-between gap-3 pb-5 mb-6 border-b border-[#E2E2DC]">
                <div className="inline-flex bg-[#EFEFEB] p-0.5 border border-[#E2E2DC] rounded-sm">
                  <button
                    type="button"
                    onClick={() => setMode('top')}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      mode === 'top'
                        ? 'bg-[#141413] text-white'
                        : 'text-[#5C5C57] hover:text-[#141413]'
                    }`}
                  >
                    上装 / 外套
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('bottom')}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      mode === 'bottom'
                        ? 'bg-[#141413] text-white'
                        : 'text-[#5C5C57] hover:text-[#141413]'
                    }`}
                  >
                    裤装验算
                  </button>
                </div>

                {/* Half-width vs Full Circumference Helper Toggle */}
                <button
                  type="button"
                  onClick={() =>
                    mode === 'top'
                      ? setTopInput((prev) => ({
                          ...prev,
                          isHalfMeasurement: !prev.isHalfMeasurement,
                          chestInput: prev.isHalfMeasurement
                            ? Math.round(prev.chestInput * 2)
                            : Math.round(prev.chestInput / 2),
                        }))
                      : setBottomInput((prev) => ({
                          ...prev,
                          isHalfMeasurement: !prev.isHalfMeasurement,
                          waistInput: prev.isHalfMeasurement
                            ? Math.round(prev.waistInput * 2)
                            : Math.round(prev.waistInput / 2),
                          hipInput: prev.isHalfMeasurement
                            ? Math.round(prev.hipInput * 2)
                            : Math.round(prev.hipInput / 2),
                        }))
                  }
                  className="text-xs font-medium text-[#1D4ED8] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {(mode === 'top' ? topInput.isHalfMeasurement : bottomInput.isHalfMeasurement)
                    ? '当前：平铺单面 (自动×2)'
                    : '当前：整圈围度 (切至单面)'}
                </button>
              </div>

              {mode === 'top' ? (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-medium text-[#5C5C57] mb-2">
                      待验算上装类型
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {(
                        [
                          { id: 'shirt', label: '衬衫' },
                          { id: 'blazer', label: '西装' },
                          { id: 'tshirt', label: 'T恤' },
                          { id: 'coat', label: '大衣' },
                        ] as const
                      ).map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() =>
                            setTopInput((prev) => ({ ...prev, garmentType: t.id }))
                          }
                          className={`py-2 text-xs font-medium border rounded-sm transition-colors cursor-pointer ${
                            topInput.garmentType === t.id
                              ? 'bg-[#141413] text-white border-[#141413]'
                              : 'bg-white text-[#141413] border-[#E2E2DC] hover:border-[#141413]'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="verify-shoulder"
                        className="block text-xs font-medium text-[#141413] mb-1.5"
                      >
                        商家标称肩宽 (cm)
                      </label>
                      <input
                        id="verify-shoulder"
                        type="number"
                        step="0.5"
                        value={topInput.shoulder}
                        onChange={(e) =>
                          setTopInput((prev) => ({
                            ...prev,
                            shoulder: parseFloat(e.target.value) || 0,
                          }))
                        }
                        className="w-full px-3 py-2 font-mono text-sm font-semibold tabular-nums bg-[#FAFAF8] border border-[#D4D4CE] rounded-sm focus:outline-none focus:border-[#1D4ED8] focus:bg-white"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="verify-chest"
                        className="block text-xs font-medium text-[#141413] mb-1.5"
                      >
                        {topInput.isHalfMeasurement
                          ? '平铺单面胸宽 (cm)'
                          : '成衣整圈胸围 (cm)'}
                      </label>
                      <input
                        id="verify-chest"
                        type="number"
                        step="1"
                        value={topInput.chestInput}
                        onChange={(e) =>
                          setTopInput((prev) => ({
                            ...prev,
                            chestInput: parseFloat(e.target.value) || 0,
                          }))
                        }
                        className="w-full px-3 py-2 font-mono text-sm font-semibold tabular-nums bg-[#FAFAF8] border border-[#D4D4CE] rounded-sm focus:outline-none focus:border-[#1D4ED8] focus:bg-white"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="verify-length"
                        className="block text-xs font-medium text-[#141413] mb-1.5"
                      >
                        商家标称衣长 (cm)
                      </label>
                      <input
                        id="verify-length"
                        type="number"
                        step="1"
                        value={topInput.length}
                        onChange={(e) =>
                          setTopInput((prev) => ({
                            ...prev,
                            length: parseFloat(e.target.value) || 0,
                          }))
                        }
                        className="w-full px-3 py-2 font-mono text-sm font-semibold tabular-nums bg-[#FAFAF8] border border-[#D4D4CE] rounded-sm focus:outline-none focus:border-[#1D4ED8] focus:bg-white"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="verify-sleeve"
                        className="block text-xs font-medium text-[#141413] mb-1.5"
                      >
                        商家标称袖长 (cm)
                      </label>
                      <input
                        id="verify-sleeve"
                        type="number"
                        step="0.5"
                        value={topInput.sleeve}
                        onChange={(e) =>
                          setTopInput((prev) => ({
                            ...prev,
                            sleeve: parseFloat(e.target.value) || 0,
                          }))
                        }
                        className="w-full px-3 py-2 font-mono text-sm font-semibold tabular-nums bg-[#FAFAF8] border border-[#D4D4CE] rounded-sm focus:outline-none focus:border-[#1D4ED8] focus:bg-white"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="verify-waist"
                      className="block text-xs font-medium text-[#141413] mb-1.5"
                    >
                      {bottomInput.isHalfMeasurement
                        ? '平铺单面腰宽 (cm)'
                        : '成衣整圈腰围 (cm)'}
                    </label>
                    <input
                      id="verify-waist"
                      type="number"
                      step="1"
                      value={bottomInput.waistInput}
                      onChange={(e) =>
                        setBottomInput((prev) => ({
                          ...prev,
                          waistInput: parseFloat(e.target.value) || 0,
                        }))
                      }
                      className="w-full px-3 py-2 font-mono text-sm font-semibold tabular-nums bg-[#FAFAF8] border border-[#D4D4CE] rounded-sm focus:outline-none focus:border-[#1D4ED8] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="verify-hip"
                      className="block text-xs font-medium text-[#141413] mb-1.5"
                    >
                      {bottomInput.isHalfMeasurement
                        ? '平铺单面臀宽 (cm)'
                        : '成衣整圈臀围 (cm)'}
                    </label>
                    <input
                      id="verify-hip"
                      type="number"
                      step="1"
                      value={bottomInput.hipInput}
                      onChange={(e) =>
                        setBottomInput((prev) => ({
                          ...prev,
                          hipInput: parseFloat(e.target.value) || 0,
                        }))
                      }
                      className="w-full px-3 py-2 font-mono text-sm font-semibold tabular-nums bg-[#FAFAF8] border border-[#D4D4CE] rounded-sm focus:outline-none focus:border-[#1D4ED8] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="verify-outseam"
                      className="block text-xs font-medium text-[#141413] mb-1.5"
                    >
                      标称外裤长 (cm)
                    </label>
                    <input
                      id="verify-outseam"
                      type="number"
                      step="1"
                      value={bottomInput.outseam}
                      onChange={(e) =>
                        setBottomInput((prev) => ({
                          ...prev,
                          outseam: parseFloat(e.target.value) || 0,
                        }))
                      }
                      className="w-full px-3 py-2 font-mono text-sm font-semibold tabular-nums bg-[#FAFAF8] border border-[#D4D4CE] rounded-sm focus:outline-none focus:border-[#1D4ED8] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="verify-rise"
                      className="block text-xs font-medium text-[#141413] mb-1.5"
                    >
                      前裆深度 (cm)
                    </label>
                    <input
                      id="verify-rise"
                      type="number"
                      step="0.5"
                      value={bottomInput.frontRise}
                      onChange={(e) =>
                        setBottomInput((prev) => ({
                          ...prev,
                          frontRise: parseFloat(e.target.value) || 0,
                        }))
                      }
                      className="w-full px-3 py-2 font-mono text-sm font-semibold tabular-nums bg-[#FAFAF8] border border-[#D4D4CE] rounded-sm focus:outline-none focus:border-[#1D4ED8] focus:bg-white"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-5 border-t border-[#E2E2DC] text-xs leading-relaxed text-[#5C5C57]">
              对比基准：你的净体数据（肩宽{' '}
              <span className="font-mono text-[#141413] tabular-nums">
                {measurements.shoulder}
              </span>{' '}
              · 胸围{' '}
              <span className="font-mono text-[#141413] tabular-nums">
                {measurements.chest}
              </span>{' '}
              · 腰围{' '}
              <span className="font-mono text-[#141413] tabular-nums">
                {measurements.waist}
              </span>{' '}
              · 臀围{' '}
              <span className="font-mono text-[#141413] tabular-nums">
                {measurements.hip}
              </span>{' '}
              cm）
            </div>
          </div>

          {/* Right: Live Verification Diagnostic Output */}
          <div className="lg:col-span-7 bg-white border border-[#E2E2DC] p-6 lg:p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-4 pb-5 mb-6 border-b border-[#E2E2DC]">
                <div>
                  <p className="text-xs text-[#5C5C57]">上身风格与版型预测</p>
                  <h3 className="font-display text-2xl font-semibold text-[#141413] mt-1">
                    {evaluation.wearingStyleTitle}
                  </h3>
                </div>
                <span className="text-xs font-mono font-semibold text-[#1D4ED8]">
                  {evaluation.recommendedLabel}
                </span>
              </div>

              <p className="text-sm leading-relaxed text-[#5C5C57] mb-7">
                {evaluation.wearingStyleSummary}
              </p>

              {/* Spectrum Gauges for Each Dimension */}
              <div className="space-y-6">
                {evaluation.metrics.map((metric) => {
                  const pos = getSpectrumPosition(metric.status);
                  return (
                    <div key={metric.label}>
                      <div className="flex items-baseline justify-between gap-3 mb-2">
                        <div className="flex items-baseline gap-2.5">
                          <span className="text-sm font-semibold text-[#141413]">
                            {metric.label}
                          </span>
                          <span className="text-xs font-mono text-[#5C5C57] tabular-nums">
                            净体 {metric.bodyValue} → 成衣 {metric.garmentValue} cm
                          </span>
                        </div>
                        <div className="flex items-baseline gap-2 shrink-0">
                          <span className="font-mono text-sm font-semibold text-[#141413] tabular-nums">
                            {metric.delta >= 0 ? '+' : ''}
                            {metric.delta} cm
                          </span>
                          <span
                            className={`text-xs font-semibold ${getStatusColor(
                              metric.status
                            )}`}
                          >
                            {metric.statusLabel}
                          </span>
                        </div>
                      </div>

                      {/* 5-Zone Architectural Spectrum Bar */}
                      <div className="relative h-2 bg-[#EFEFEB] border border-[#E2E2DC] overflow-visible">
                        <div className="absolute inset-0 grid grid-cols-5 divide-x divide-white/80">
                          <div className="bg-[#FECDD3]/60" />
                          <div className="bg-[#DBEAFE]/80" />
                          <div className="bg-[#D1FAE5]/85" />
                          <div className="bg-[#FEF3C7]/85" />
                          <div className="bg-[#E4E4E0]/85" />
                        </div>
                        <div
                          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-4 bg-[#141413] border border-white transition-all duration-200"
                          style={{ left: `${pos}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between mt-1.5 text-[11px] text-[#7A7A74]">
                        <span>偏紧</span>
                        <span>修身</span>
                        <span>黄金余量</span>
                        <span>松弛</span>
                        <span>大廓形</span>
                      </div>
                      <p className="mt-1.5 text-xs text-[#5C5C57]">{metric.note}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Warnings or Safe Clearance */}
            <div className="mt-7 pt-5 border-t border-[#E2E2DC]">
              {evaluation.warnings.length > 0 ? (
                <div className="p-4 bg-[#FFF1F2] border border-[#FECDD3] space-y-1.5">
                  <p className="text-xs font-semibold text-[#9F1239]">
                    尺码验算风险提示（建议换码或核对版型）
                  </p>
                  {evaluation.warnings.map((w, i) => (
                    <p key={i} className="text-xs leading-relaxed text-[#9F1239]">
                      · {w}
                    </p>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-[#ECFDF5] border border-[#A7F3D0]">
                  <p className="text-xs font-semibold text-[#065F46]">
                    全维度通过：无结构紧绷或比例失衡风险
                  </p>
                  <p className="text-xs text-[#047857] mt-1">
                    该成衣关键围度与骨骼落点均处于你的合理活动区间，可放心按目标风格下单。
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
