import React, { useState } from 'react';
import { ArrowUpRight, Check, Ruler, X } from 'lucide-react';
import {
  CATALOG_GARMENTS,
  evaluateGarmentSizeFit,
  getBestGarmentSize,
} from '../data/atelierEngine';
import {
  BodyMeasurements,
  CatalogGarment,
  EaseStatus,
  GarmentCategory,
  SizeCode,
} from '../types/atelier';

interface GarmentCatalogMatchProps {
  measurements: BodyMeasurements;
}

function getStatusTextClass(status: EaseStatus): string {
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

export const GarmentCatalogMatch: React.FC<GarmentCatalogMatchProps> = ({
  measurements,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<'all' | GarmentCategory>('all');
  const [selectedGarment, setSelectedGarment] = useState<CatalogGarment | null>(null);
  const [inspectedSize, setInspectedSize] = useState<SizeCode>('M');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const filteredGarments =
    categoryFilter === 'all'
      ? CATALOG_GARMENTS
      : CATALOG_GARMENTS.filter((g) => g.category === categoryFilter);

  const openInspector = (garment: CatalogGarment) => {
    const best = getBestGarmentSize(measurements, garment);
    setSelectedGarment(garment);
    setInspectedSize(best.size);
  };

  const activeSizeSpec = selectedGarment
    ? selectedGarment.sizes.find((s) => s.size === inspectedSize) ??
      selectedGarment.sizes[2]
    : null;

  const activeEvaluation =
    selectedGarment && activeSizeSpec
      ? evaluateGarmentSizeFit(measurements, selectedGarment, activeSizeSpec)
      : null;

  const bestForSelected = selectedGarment
    ? getBestGarmentSize(measurements, selectedGarment)
    : null;

  return (
    <section
      id="garment-catalog"
      className="py-16 lg:py-24 border-t border-[#E2E2DC]"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Section Heading & Category Filter */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wider text-[#5C5C57] mb-2">
              03 · 数据化选款与跨码风格对照
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-semibold tracking-tight text-[#141413] text-balance">
              同一件衣服，选不同尺码会穿出什么风格？
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#5C5C57]">
              下方 5 款经典基础版型已自动对接你的净体数据。每张卡片直接给出数据最优码与关键部位松量；点击任意单品，可自由切换 XS–XL 对比跨码穿着效果。
            </p>
          </div>

          <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#EFEFEB] border border-[#E2E2DC] rounded-sm">
            {(
              [
                { id: 'all', label: '全部版型' },
                { id: 'blazer', label: '西装' },
                { id: 'shirt', label: '衬衫' },
                { id: 'tshirt', label: '重磅T恤' },
                { id: 'coat', label: '长款大衣' },
                { id: 'trousers', label: '精裁长裤' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCategoryFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  categoryFilter === tab.id
                    ? 'bg-[#141413] text-white'
                    : 'text-[#5C5C57] hover:text-[#141413]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Editorial Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredGarments.map((garment) => {
            const best = getBestGarmentSize(measurements, garment);
            const primaryMetric = best.metrics[0];
            const secondaryMetric = best.metrics[1];
            const imgBroken = failedImages[garment.id];

            return (
              <article
                key={garment.id}
                onClick={() => openInspector(garment)}
                className="group bg-white border border-[#E2E2DC] hover:border-[#141413] transition-all duration-200 hover:-translate-y-0.5 flex flex-col cursor-pointer"
              >
                {/* Uniform 3:4 Studio Image Container with Resilient Fallback */}
                <div className="relative aspect-[3/4] w-full bg-[#EFEFEC] overflow-hidden border-b border-[#E2E2DC]">
                  {!imgBroken ? (
                    <img
                      src={garment.image}
                      alt={`${garment.name} 影棚廓形实拍`}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [garment.id]: true }))
                      }
                      className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center atelier-grid-bg">
                      <Ruler className="w-8 h-8 text-[#8A8A83] mb-3" />
                      <p className="text-sm font-medium text-[#141413]">{garment.name}</p>
                      <p className="text-xs font-mono text-[#5C5C57] mt-1">{garment.enName}</p>
                    </div>
                  )}
                </div>

                {/* Clean Zero-Pill Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Quiet unboxed metadata line */}
                    <div className="flex items-center gap-2 text-xs text-[#5C5C57] font-mono">
                      <span>{garment.code}</span>
                      <span aria-hidden="true">·</span>
                      <span>{garment.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{garment.weightGsm}gsm</span>
                    </div>

                    <h3 className="mt-2 text-lg font-semibold text-[#141413] group-hover:text-[#1D4ED8] transition-colors">
                      {garment.name}
                    </h3>
                    <p className="text-xs text-[#5C5C57] mt-1">
                      {garment.fabricSpec} · {garment.structureLevel}
                    </p>
                  </div>

                  {/* Computed Data Recommendation Block (Separated by Hairline) */}
                  <div className="mt-5 pt-4 border-t border-[#E2E2DC]">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-xs text-[#5C5C57]">按你身材推荐</span>
                      <span className="font-mono text-sm font-semibold text-[#1D4ED8] tabular-nums">
                        {best.size} 码 · {best.wearingStyleTitle}
                      </span>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                      {primaryMetric && (
                        <div>
                          <span className="text-[#5C5C57] block">
                            {primaryMetric.label}
                          </span>
                          <span className="font-mono font-semibold text-[#141413] tabular-nums">
                            {primaryMetric.delta >= 0 ? '+' : ''}
                            {primaryMetric.delta} cm
                          </span>
                          <span
                            className={`ml-1.5 font-medium ${getStatusTextClass(
                              primaryMetric.status
                            )}`}
                          >
                            {primaryMetric.statusLabel}
                          </span>
                        </div>
                      )}
                      {secondaryMetric && (
                        <div>
                          <span className="text-[#5C5C57] block">
                            {secondaryMetric.label}
                          </span>
                          <span className="font-mono font-semibold text-[#141413] tabular-nums">
                            {secondaryMetric.delta >= 0 ? '+' : ''}
                            {secondaryMetric.delta} cm
                          </span>
                          <span
                            className={`ml-1.5 font-medium ${getStatusTextClass(
                              secondaryMetric.status
                            )}`}
                          >
                            {secondaryMetric.statusLabel}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#F0F0EC] flex items-center justify-between text-xs font-medium text-[#141413]">
                      <span>拆解 XS–XL 跨码松量数据</span>
                      <ArrowUpRight className="w-4 h-4 text-[#5C5C57] group-hover:text-[#1D4ED8] transition-colors" />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Contiguous Garment Size & Style Inspector Modal */}
        {selectedGarment && activeSizeSpec && activeEvaluation && bestForSelected && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedGarment.name} 尺码数据拆解`}
            className="fixed inset-0 z-50 bg-[#141413]/55 backdrop-blur-[2px] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            onClick={() => setSelectedGarment(null)}
          >
            <div
              className="bg-white border border-[#E2E2DC] w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="sticky top-0 z-10 bg-white border-b border-[#E2E2DC] px-6 py-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-mono text-[#5C5C57]">
                    {selectedGarment.code} · {selectedGarment.categoryLabel} ·{' '}
                    {selectedGarment.weightGsm}gsm {selectedGarment.structureLevel}
                  </p>
                  <h3 className="text-lg font-semibold text-[#141413] truncate">
                    {selectedGarment.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedGarment(null)}
                  aria-label="关闭窗口"
                  className="p-2 text-[#5C5C57] hover:text-[#141413] border border-[#E2E2DC] rounded-sm cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Left Image + Patternmaker Note */}
                <div className="md:col-span-5 bg-[#FAFAF8] border-b md:border-b-0 md:border-r border-[#E2E2DC] p-6 flex flex-col justify-between">
                  <div className="aspect-[3/4] w-full bg-[#EFEFEC] border border-[#E2E2DC] overflow-hidden">
                    {!failedImages[selectedGarment.id] ? (
                      <img
                        src={selectedGarment.image}
                        alt={selectedGarment.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-[#5C5C57]">
                        {selectedGarment.enName}
                      </div>
                    )}
                  </div>
                  <div className="mt-5">
                    <p className="text-xs font-semibold text-[#141413] mb-1.5">
                      制版师结构说明
                    </p>
                    <p className="text-xs leading-relaxed text-[#5C5C57]">
                      {selectedGarment.patternNote}
                    </p>
                  </div>
                </div>

                {/* Right Contiguous Size Switcher & Ease Data Breakdown */}
                <div className="md:col-span-7 p-6 lg:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-medium text-[#5C5C57]">
                        点击切换尺码，实时观察同一件衣服在你身上的风格变化
                      </span>
                      <span className="text-xs font-mono text-[#047857] font-semibold">
                        最优建议：{bestForSelected.size} 码
                      </span>
                    </div>

                    {/* Interactive Size Selector */}
                    <div className="grid grid-cols-5 gap-2 mb-6">
                      {selectedGarment.sizes.map((s) => {
                        const isCurrent = s.size === inspectedSize;
                        const isBest = s.size === bestForSelected.size;
                        return (
                          <button
                            key={s.size}
                            type="button"
                            onClick={() => setInspectedSize(s.size)}
                            className={`relative py-2.5 text-center border rounded-sm transition-colors cursor-pointer ${
                              isCurrent
                                ? 'bg-[#141413] text-white border-[#141413]'
                                : 'bg-white text-[#141413] border-[#E2E2DC] hover:border-[#141413]'
                            }`}
                          >
                            <span className="font-mono text-sm font-semibold block">
                              {s.size}
                            </span>
                            <span
                              className={`text-[10px] block mt-0.5 ${
                                isCurrent
                                  ? 'text-white/80'
                                  : isBest
                                  ? 'text-[#047857] font-medium'
                                  : 'text-[#8A8A83]'
                              }`}
                            >
                              {isBest ? '推荐' : '对比'}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Resulting Style Readout for Selected Size */}
                    <div className="p-4 bg-[#F8FAFF] border border-[#1D4ED8]/25 mb-6">
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="text-base font-semibold text-[#141413]">
                          选择 {inspectedSize} 码上身效果：{activeEvaluation.wearingStyleTitle}
                        </h4>
                        <span className="font-mono text-xs text-[#1D4ED8] font-semibold whitespace-nowrap">
                          {activeEvaluation.recommendedLabel}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-[#5C5C57]">
                        {activeEvaluation.wearingStyleSummary}
                      </p>
                    </div>

                    {/* Exact Joint-by-Joint Ease Table */}
                    <div className="border-t border-[#E2E2DC]">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-[#E2E2DC] text-[11px] text-[#5C5C57]">
                            <th className="py-2.5 font-medium">关键部位</th>
                            <th className="py-2.5 font-medium text-right">你的净体</th>
                            <th className="py-2.5 font-medium text-right">成衣 {inspectedSize} 码</th>
                            <th className="py-2.5 font-medium text-right">实际松量</th>
                            <th className="py-2.5 font-medium text-right">判定</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F0F0EC] text-sm">
                          {activeEvaluation.metrics.map((m) => (
                            <tr key={m.label}>
                              <td className="py-3 pr-2">
                                <span className="font-medium text-[#141413] block">
                                  {m.label}
                                </span>
                                <span className="text-[11px] text-[#5C5C57]">
                                  {m.note}
                                </span>
                              </td>
                              <td className="py-3 text-right font-mono tabular-nums text-[#5C5C57]">
                                {m.bodyValue}
                              </td>
                              <td className="py-3 text-right font-mono tabular-nums font-medium text-[#141413]">
                                {m.garmentValue}
                              </td>
                              <td className="py-3 text-right font-mono tabular-nums font-semibold text-[#141413]">
                                {m.delta >= 0 ? '+' : ''}
                                {m.delta} cm
                              </td>
                              <td
                                className={`py-3 text-right text-xs font-semibold whitespace-nowrap ${getStatusTextClass(
                                  m.status
                                )}`}
                              >
                                {m.statusLabel}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Warnings if any */}
                    {activeEvaluation.warnings.length > 0 && (
                      <div className="mt-4 p-3.5 bg-[#FFF1F2] border border-[#FECDD3] text-xs text-[#9F1239] space-y-1">
                        {activeEvaluation.warnings.map((w, idx) => (
                          <p key={idx}>风险提示：{w}</p>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Full Raw Garment Flat-Lay Size Chart */}
                  <div className="mt-6 pt-5 border-t border-[#E2E2DC]">
                    <p className="text-xs font-medium text-[#5C5C57] mb-2.5">
                      该单品全码平铺/整圈尺码表（cm）
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs font-mono tabular-nums text-right border-collapse">
                        <thead>
                          <tr className="border-b border-[#E2E2DC] text-[#5C5C57]">
                            <th className="py-1.5 text-left font-sans font-medium">尺码</th>
                            {selectedGarment.category !== 'trousers' ? (
                              <>
                                <th className="py-1.5 font-sans font-medium">肩宽</th>
                                <th className="py-1.5 font-sans font-medium">胸围</th>
                                <th className="py-1.5 font-sans font-medium">衣长</th>
                                <th className="py-1.5 font-sans font-medium">袖长</th>
                              </>
                            ) : (
                              <>
                                <th className="py-1.5 font-sans font-medium">腰围</th>
                                <th className="py-1.5 font-sans font-medium">臀围</th>
                                <th className="py-1.5 font-sans font-medium">外裤长</th>
                                <th className="py-1.5 font-sans font-medium">内长</th>
                                <th className="py-1.5 font-sans font-medium">脚口</th>
                              </>
                            )}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F0F0EC]">
                          {selectedGarment.sizes.map((row) => (
                            <tr
                              key={row.size}
                              onClick={() => setInspectedSize(row.size)}
                              className={`cursor-pointer transition-colors ${
                                row.size === inspectedSize
                                  ? 'bg-[#F8FAFF] text-[#1D4ED8] font-semibold'
                                  : 'text-[#141413] hover:bg-[#FAFAF8]'
                              }`}
                            >
                              <td className="py-2 text-left flex items-center gap-1">
                                {row.size}
                                {row.size === bestForSelected.size && (
                                  <Check className="w-3 h-3 text-[#047857]" />
                                )}
                              </td>
                              {selectedGarment.category !== 'trousers' ? (
                                <>
                                  <td className="py-2">{row.shoulder}</td>
                                  <td className="py-2">{row.chest}</td>
                                  <td className="py-2">{row.length}</td>
                                  <td className="py-2">{row.sleeve}</td>
                                </>
                              ) : (
                                <>
                                  <td className="py-2">{row.waist}</td>
                                  <td className="py-2">{row.hip}</td>
                                  <td className="py-2">{row.length}</td>
                                  <td className="py-2">{row.inseam}</td>
                                  <td className="py-2">{row.hemWidth}</td>
                                </>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
