import React, { useState } from 'react';
import {
  CATEGORY_META,
  STYLE_PRESETS,
  evaluateStyleFromDimensions,
} from '../data/atelierEngine';
import {
  BodyMeasurements,
  GarmentCategory,
  StyleParameters,
  StylePresetId,
} from '../types/atelier';

interface StylePatternSimulatorProps {
  measurements: BodyMeasurements;
}

export const StylePatternSimulator: React.FC<StylePatternSimulatorProps> = ({
  measurements,
}) => {
  const [category, setCategory] = useState<GarmentCategory>('shirt');
  const [activePreset, setActivePreset] = useState<StylePresetId | 'custom'>('classic');
  const [params, setParams] = useState<StyleParameters>(
    STYLE_PRESETS[1].getParams('shirt')
  );

  const isBottom = category === 'trousers';
  const analysis = evaluateStyleFromDimensions(category, measurements, params);

  const handleCategoryChange = (nextCat: GarmentCategory) => {
    setCategory(nextCat);
    const presetObj =
      STYLE_PRESETS.find((p) => p.id === activePreset) ?? STYLE_PRESETS[1];
    setParams(presetObj.getParams(nextCat));
  };

  const handlePresetClick = (presetId: StylePresetId) => {
    setActivePreset(presetId);
    const presetObj = STYLE_PRESETS.find((p) => p.id === presetId);
    if (presetObj) {
      setParams(presetObj.getParams(category));
    }
  };

  const handleParamChange = <K extends keyof StyleParameters>(
    key: K,
    value: number
  ) => {
    setActivePreset('custom');
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  // --- Parametric Technical Pattern Blueprint Math (viewBox 0 0 460 440) ---
  const cx = 230;

  // Body inner reference contour (dashed architectural layer)
  const bodyShoulderHalf = Math.min(70, Math.max(44, measurements.shoulder * 1.4));
  const bodyChestHalf = Math.min(62, Math.max(38, (measurements.chest / Math.PI) * 1.65));
  const bodyWaistHalf = Math.min(54, Math.max(30, (measurements.waist / Math.PI) * 1.62));
  const bodyHipHalf = Math.min(64, Math.max(38, (measurements.hip / Math.PI) * 1.68));

  // Garment dynamic offsets in px
  const easePx = params.chestEase * 1.05; // half-side visual expansion
  const dropPx = params.shoulderDrop * 1.9;
  const gShoulderHalf = bodyShoulderHalf + dropPx;
  const gChestHalf = bodyChestHalf + easePx * 0.88;
  const gHemHalf = Math.max(
    bodyWaistHalf + 4,
    gChestHalf + params.hemTaper * 1.5
  );

  const topNeckY = 58;
  const shoulderY = 82;
  const chestY = 140;
  const waistY = 205;
  const hipY = 252;

  const baseGarmentBottomY =
    category === 'coat' ? 326 : category === 'blazer' ? 276 : 264;
  const garmentBottomY = Math.min(
    396,
    Math.max(198, baseGarmentBottomY + params.lengthOffset * 2.2)
  );

  // Sleeve geometry
  const sleeveSlopeY = shoulderY + 12 + params.shoulderDrop * 1.3;
  const isShortSleeve = category === 'tshirt';
  const sleeveLengthPx = isShortSleeve
    ? 68 + params.chestEase * 0.55
    : 185 - params.shoulderDrop * 0.7;
  const sleeveAngleX = isShortSleeve ? 28 + params.chestEase * 0.45 : 32 + params.chestEase * 0.5;
  const sleeveEndX = gShoulderHalf + sleeveAngleX;
  const sleeveEndY = sleeveSlopeY + sleeveLengthPx;
  const cuffWidthPx = isShortSleeve
    ? 22 + params.chestEase * 0.35
    : category === 'coat'
    ? 26 + params.chestEase * 0.25
    : 18 + params.chestEase * 0.2;
  const armholeBottomY = chestY + 12 + params.chestEase * 0.75;

  // Trouser parametric geometry
  const tWaistY = 66;
  const tHipY = 136;
  const tCrotchY = 166;
  const tAnkleBaseY = 368;
  const tHemY = Math.min(404, Math.max(324, tAnkleBaseY + params.lengthOffset * 3.6));
  const tWaistHalf = bodyWaistHalf + 4 + (params.chestEase > 14 ? 4 : 1);
  const tHipHalf = bodyHipHalf + params.chestEase * 1.15;
  const tLegOuterHem = Math.max(
    24,
    Math.min(92, tHipHalf * 0.74 + params.hemTaper * 2.2)
  );
  const tLegInnerHem = Math.max(6, 14 - params.hemTaper * 0.35);

  const chestEaseMin = category === 'coat' ? 10 : isBottom ? 4 : 4;
  const chestEaseMax = category === 'coat' ? 40 : isBottom ? 26 : 34;

  return (
    <section
      id="style-lab"
      className="py-16 lg:py-24 border-t border-[#E2E2DC]"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wider text-[#5C5C57] mb-2">
              02 · 尺寸与风格几何实验室
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-semibold tracking-tight text-[#141413] text-balance">
              差 4 厘米，为什么穿出完全不同的风格？
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#5C5C57]">
              风格并非玄学，而是<strong className="font-semibold text-[#141413]">松量、肩线落点与纵向衣长</strong>共同构成的物理几何。拖动下方尺寸滑块，实时观察成衣轮廓（实线）如何包裹你的净体轮廓（虚线）并改变风格气质。
            </p>
          </div>

          {/* Garment Category Segmented Selector */}
          <div
            role="tablist"
            aria-label="选择服装品类"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#EFEFEB] border border-[#E2E2DC] rounded-sm"
          >
            {(Object.keys(CATEGORY_META) as GarmentCategory[]).map((catKey) => {
              const active = category === catKey;
              return (
                <button
                  key={catKey}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleCategoryChange(catKey)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#141413] text-white'
                      : 'text-[#5C5C57] hover:text-[#141413]'
                  }`}
                >
                  {CATEGORY_META[catKey].label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Style Presets Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
          {STYLE_PRESETS.map((preset) => {
            const isSelected = activePreset === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handlePresetClick(preset.id)}
                className={`text-left px-4 py-3 border rounded-sm transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#1D4ED8] ring-1 ring-[#1D4ED8]/20'
                    : 'bg-white/70 border-[#E2E2DC] hover:border-[#141413]'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-sm font-semibold whitespace-nowrap ${
                      isSelected ? 'text-[#1D4ED8]' : 'text-[#141413]'
                    }`}
                  >
                    {preset.label}
                  </span>
                  <span className="text-[10px] font-mono text-[#8A8A83] truncate">
                    {preset.enLabel}
                  </span>
                </div>
                <p className="text-xs text-[#5C5C57] mt-1">{preset.brief}</p>
              </button>
            );
          })}
        </div>

        {/* Main 2-Zone Sandbox: 60% Live Parametric Blueprint / 40% Controls & Style Explanation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Interactive Drafting Blueprint */}
          <div className="lg:col-span-7 bg-white border border-[#E2E2DC] flex flex-col">
            {/* Blueprint Top Header */}
            <div className="px-6 py-4 border-b border-[#E2E2DC] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-4 text-[#5C5C57]">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-4 h-0 border-t-2 border-dashed border-[#9A9A92]" />
                  你的净体轮廓
                </span>
                <span className="inline-flex items-center gap-1.5 text-[#141413] font-medium">
                  <span className="w-4 h-0 border-t-2 border-[#141413]" />
                  成衣版型廓形
                </span>
                <span className="inline-flex items-center gap-1.5 text-[#1D4ED8] font-medium">
                  <span className="w-3 h-3 bg-[#1D4ED8]/12 border border-[#1D4ED8]/40 inline-block" />
                  空间松量层
                </span>
              </div>
              <span className="font-mono text-[#141413] tabular-nums">
                {CATEGORY_META[category].enLabel} · {analysis.silhouetteLabel}
              </span>
            </div>

            {/* SVG Stage */}
            <div className="flex-1 atelier-grid-bg p-4 sm:p-6 flex items-center justify-center min-h-[430px]">
              <svg
                viewBox="0 0 460 440"
                className="w-full max-w-[470px] h-auto overflow-visible"
                role="img"
                aria-label={`${CATEGORY_META[category].label}实时尺寸廓形推演图`}
              >
                {/* Vertical centerline */}
                <line
                  x1={cx}
                  y1={24}
                  x2={cx}
                  y2={422}
                  stroke="#D8D8D2"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />

                {!isBottom ? (
                  <>
                    {/* Horizontal Anatomical Reference Lines */}
                    <g className="font-mono text-[9.5px]" fill="#8A8A83">
                      <line x1={30} y1={waistY} x2={430} y2={waistY} stroke="#E4E4DE" strokeWidth="1" strokeDasharray="2 3" />
                      <text x={32} y={waistY - 4}>自然腰线</text>

                      <line x1={30} y1={hipY} x2={430} y2={hipY} stroke="#E4E4DE" strokeWidth="1" strokeDasharray="2 3" />
                      <text x={32} y={hipY - 4}>臀峰线</text>

                      {category === 'coat' && (
                        <>
                          <line x1={30} y1={352} x2={430} y2={352} stroke="#E4E4DE" strokeWidth="1" strokeDasharray="2 3" />
                          <text x={32} y={348}>膝盖参考位</text>
                        </>
                      )}
                    </g>

                    {/* Garment Ease Translucent Volume Fill + Crisp Ink Outline */}
                    <g className="transition-all duration-150">
                      {/* Left Sleeve */}
                      <path
                        d={`
                          M ${cx - gShoulderHalf} ${sleeveSlopeY}
                          L ${cx - sleeveEndX} ${sleeveEndY}
                          L ${cx - sleeveEndX + cuffWidthPx} ${sleeveEndY + 10}
                          L ${cx - gChestHalf} ${armholeBottomY}
                          Z
                        `}
                        fill="rgba(29, 78, 216, 0.06)"
                        stroke="#141413"
                        strokeWidth="1.7"
                        strokeLinejoin="round"
                      />
                      {/* Right Sleeve */}
                      <path
                        d={`
                          M ${cx + gShoulderHalf} ${sleeveSlopeY}
                          L ${cx + sleeveEndX} ${sleeveEndY}
                          L ${cx + sleeveEndX - cuffWidthPx} ${sleeveEndY + 10}
                          L ${cx + gChestHalf} ${armholeBottomY}
                          Z
                        `}
                        fill="rgba(29, 78, 216, 0.06)"
                        stroke="#141413"
                        strokeWidth="1.7"
                        strokeLinejoin="round"
                      />

                      {/* Garment Main Torso Block */}
                      <path
                        d={`
                          M ${cx - 22} ${topNeckY}
                          Q ${cx} ${category === 'tshirt' ? topNeckY + 18 : topNeckY + 10} ${cx + 22} ${topNeckY}
                          L ${cx + gShoulderHalf} ${sleeveSlopeY}
                          L ${cx + gChestHalf} ${armholeBottomY}
                          Q ${cx + (gChestHalf + gHemHalf) / 2 + (params.hemTaper < 0 ? -5 : 2)} ${(armholeBottomY + garmentBottomY) / 2}
                            ${cx + gHemHalf} ${garmentBottomY}
                          L ${cx - gHemHalf} ${garmentBottomY}
                          Q ${cx - (gChestHalf + gHemHalf) / 2 - (params.hemTaper < 0 ? -5 : 2)} ${(armholeBottomY + garmentBottomY) / 2}
                            ${cx - gChestHalf} ${armholeBottomY}
                          L ${cx - gShoulderHalf} ${sleeveSlopeY}
                          Z
                        `}
                        fill="rgba(29, 78, 216, 0.07)"
                        stroke="#141413"
                        strokeWidth="1.85"
                        strokeLinejoin="round"
                      />

                      {/* Category-specific architectural tailoring details */}
                      {category === 'blazer' && (
                        <g stroke="#141413" strokeWidth="1.1" fill="none">
                          {/* Notched lapel V-opening */}
                          <path d={`M ${cx - 22} ${topNeckY} L ${cx - 32} ${topNeckY + 40} L ${cx - 20} ${topNeckY + 46} L ${cx} ${chestY + 18}`} />
                          <path d={`M ${cx + 22} ${topNeckY} L ${cx + 32} ${topNeckY + 40} L ${cx + 20} ${topNeckY + 46} L ${cx} ${chestY + 18}`} />
                          <line x1={cx} y1={chestY + 18} x2={cx} y2={garmentBottomY} />
                          <circle cx={cx + 5} cy={chestY + 34} r={2.5} fill="#141413" />
                          <circle cx={cx + 5} cy={chestY + 62} r={2.5} fill="#141413" />
                        </g>
                      )}
                      {category === 'shirt' && (
                        <g stroke="#141413" strokeWidth="1" fill="none">
                          {/* Shirt collar & placket */}
                          <path d={`M ${cx - 22} ${topNeckY} L ${cx - 10} ${topNeckY + 22} L ${cx} ${topNeckY + 12} L ${cx + 10} ${topNeckY + 22} L ${cx + 22} ${topNeckY}`} />
                          <line x1={cx} y1={topNeckY + 12} x2={cx} y2={garmentBottomY} strokeDasharray="none" />
                        </g>
                      )}
                      {category === 'coat' && (
                        <g stroke="#141413" strokeWidth="1.1" fill="none">
                          {/* Raglan seam lines & placket */}
                          <line x1={cx - 22} y1={topNeckY + 4} x2={cx - gChestHalf} y2={armholeBottomY} strokeDasharray="3 2" />
                          <line x1={cx + 22} y1={topNeckY + 4} x2={cx + gChestHalf} y2={armholeBottomY} strokeDasharray="3 2" />
                          <line x1={cx} y1={topNeckY + 14} x2={cx} y2={garmentBottomY} />
                        </g>
                      )}
                    </g>

                    {/* Inner Net Body Silhouette Overlay (Dashed Reference) */}
                    <path
                      d={`
                        M ${cx - 16} ${topNeckY + 4}
                        L ${cx - bodyShoulderHalf} ${shoulderY}
                        L ${cx - bodyChestHalf} ${chestY}
                        Q ${cx - bodyWaistHalf} ${waistY - 8} ${cx - bodyWaistHalf} ${waistY}
                        Q ${cx - bodyHipHalf} ${hipY - 12} ${cx - bodyHipHalf} ${hipY}
                        L ${cx - bodyHipHalf * 0.92} ${hipY + 48}
                        M ${cx + 16} ${topNeckY + 4}
                        L ${cx + bodyShoulderHalf} ${shoulderY}
                        L ${cx + bodyChestHalf} ${chestY}
                        Q ${cx + bodyWaistHalf} ${waistY - 8} ${cx + bodyWaistHalf} ${waistY}
                        Q ${cx + bodyHipHalf} ${hipY - 12} ${cx + bodyHipHalf} ${hipY}
                        L ${cx + bodyHipHalf * 0.92} ${hipY + 48}
                      `}
                      fill="none"
                      stroke="#787872"
                      strokeWidth="1.4"
                      strokeDasharray="4 3"
                    />

                    {/* Technical Dimension Callouts in Cobalt Blue */}
                    {/* Shoulder drop callout */}
                    <g>
                      <line
                        x1={cx - gShoulderHalf}
                        y1={36}
                        x2={cx + gShoulderHalf}
                        y2={36}
                        stroke="#1D4ED8"
                        strokeWidth="1.2"
                      />
                      <line x1={cx - gShoulderHalf} y1={31} x2={cx - gShoulderHalf} y2={42} stroke="#1D4ED8" strokeWidth="1.2" />
                      <line x1={cx + gShoulderHalf} y1={31} x2={cx + gShoulderHalf} y2={42} stroke="#1D4ED8" strokeWidth="1.2" />
                      <rect x={cx - 66} y={24} width={132} height={18} rx={2} fill="#FFFFFF" />
                      <text
                        x={cx}
                        y={36.5}
                        textAnchor="middle"
                        className="font-mono text-[10.5px] font-semibold tabular-nums"
                        fill="#1D4ED8"
                      >
                        肩宽 {(measurements.shoulder + params.shoulderDrop).toFixed(1)}cm ({params.shoulderDrop >= 0 ? '+' : ''}{params.shoulderDrop})
                      </text>
                    </g>

                    {/* Chest Ease Callout Arrows */}
                    <g>
                      <line
                        x1={cx + bodyChestHalf}
                        y1={chestY}
                        x2={cx + gChestHalf}
                        y2={chestY}
                        stroke="#1D4ED8"
                        strokeWidth="2.2"
                      />
                      <line
                        x1={cx - bodyChestHalf}
                        y1={chestY}
                        x2={cx - gChestHalf}
                        y2={chestY}
                        stroke="#1D4ED8"
                        strokeWidth="2.2"
                      />
                      <line
                        x1={cx + gChestHalf + 2}
                        y1={chestY}
                        x2={430}
                        y2={chestY}
                        stroke="#1D4ED8"
                        strokeWidth="0.9"
                        strokeDasharray="2 2"
                      />
                      <text
                        x={430}
                        y={chestY - 5}
                        textAnchor="end"
                        className="font-mono text-[10.5px] font-semibold tabular-nums"
                        fill="#1D4ED8"
                      >
                        胸围松量 +{params.chestEase} cm
                      </text>
                    </g>

                    {/* Garment Length Callout (Right Side Vertical) */}
                    <g>
                      <line
                        x1={426}
                        y1={topNeckY}
                        x2={426}
                        y2={garmentBottomY}
                        stroke="#141413"
                        strokeWidth="1.1"
                      />
                      <line x1={421} y1={topNeckY} x2={431} y2={topNeckY} stroke="#141413" strokeWidth="1.1" />
                      <line x1={421} y1={garmentBottomY} x2={431} y2={garmentBottomY} stroke="#141413" strokeWidth="1.1" />
                      <text
                        x={418}
                        y={garmentBottomY - 4}
                        textAnchor="end"
                        className="font-mono text-[10.5px] font-medium tabular-nums"
                        fill="#141413"
                      >
                        {analysis.targetGarmentSpecs[2]?.value}
                      </text>
                    </g>
                  </>
                ) : (
                  /* TROUSERS PARAMETRIC BLUEPRINT */
                  <>
                    <g className="font-mono text-[9.5px]" fill="#8A8A83">
                      <line x1={30} y1={tHipY} x2={430} y2={tHipY} stroke="#E4E4DE" strokeWidth="1" strokeDasharray="2 3" />
                      <text x={32} y={tHipY - 4}>臀峰线</text>
                      <line x1={30} y1={tAnkleBaseY} x2={430} y2={tAnkleBaseY} stroke="#E4E4DE" strokeWidth="1" strokeDasharray="2 3" />
                      <text x={32} y={tAnkleBaseY - 4}>脚踝基准线</text>
                    </g>

                    {/* Trousers Outline */}
                    <path
                      d={`
                        M ${cx - tWaistHalf} ${tWaistY}
                        L ${cx + tWaistHalf} ${tWaistY}
                        Q ${cx + tHipHalf + 2} ${tHipY - 12} ${cx + tHipHalf} ${tHipY}
                        L ${cx + tLegOuterHem} ${tHemY}
                        L ${cx + tLegInnerHem} ${tHemY}
                        L ${cx + 4} ${tCrotchY}
                        L ${cx - 4} ${tCrotchY}
                        L ${cx - tLegInnerHem} ${tHemY}
                        L ${cx - tLegOuterHem} ${tHemY}
                        L ${cx - tHipHalf} ${tHipY}
                        Q ${cx - tHipHalf - 2} ${tHipY - 12} ${cx - tWaistHalf} ${tWaistY}
                        Z
                      `}
                      fill="rgba(29, 78, 216, 0.07)"
                      stroke="#141413"
                      strokeWidth="1.85"
                      strokeLinejoin="round"
                    />
                    {/* Waistband & Pleat Creases */}
                    <line x1={cx - tWaistHalf} y1={tWaistY + 14} x2={cx + tWaistHalf} y2={tWaistY + 14} stroke="#141413" strokeWidth="1.1" />
                    <line x1={cx} y1={tWaistY + 14} x2={cx} y2={tCrotchY} stroke="#141413" strokeWidth="1" />
                    <line
                      x1={cx - (tWaistHalf * 0.52)}
                      y1={tWaistY + 14}
                      x2={cx - (tLegOuterHem + tLegInnerHem) / 2}
                      y2={tHemY - 6}
                      stroke="#141413"
                      strokeWidth="0.9"
                      strokeDasharray="4 3"
                    />
                    <line
                      x1={cx + (tWaistHalf * 0.52)}
                      y1={tWaistY + 14}
                      x2={cx + (tLegOuterHem + tLegInnerHem) / 2}
                      y2={tHemY - 6}
                      stroke="#141413"
                      strokeWidth="0.9"
                      strokeDasharray="4 3"
                    />

                    {/* Inner Net Body Legs Contour (Dashed) */}
                    <path
                      d={`
                        M ${cx - bodyWaistHalf} ${tWaistY + 4}
                        Q ${cx - bodyHipHalf} ${tHipY - 10} ${cx - bodyHipHalf} ${tHipY}
                        L ${cx - 24} ${tAnkleBaseY}
                        M ${cx - 10} ${tAnkleBaseY}
                        L ${cx - 4} ${tCrotchY - 4}
                        L ${cx + 4} ${tCrotchY - 4}
                        L ${cx + 10} ${tAnkleBaseY}
                        M ${cx + 24} ${tAnkleBaseY}
                        L ${cx + bodyHipHalf} ${tHipY}
                        Q ${cx + bodyHipHalf} ${tHipY - 10} ${cx + bodyWaistHalf} ${tWaistY + 4}
                      `}
                      fill="none"
                      stroke="#787872"
                      strokeWidth="1.4"
                      strokeDasharray="4 3"
                    />

                    {/* Hip Ease Callout */}
                    <line x1={cx + bodyHipHalf} y1={tHipY} x2={cx + tHipHalf} y2={tHipY} stroke="#1D4ED8" strokeWidth="2.4" />
                    <line x1={cx - bodyHipHalf} y1={tHipY} x2={cx - tHipHalf} y2={tHipY} stroke="#1D4ED8" strokeWidth="2.4" />
                    <line x1={cx + tHipHalf + 2} y1={tHipY} x2={430} y2={tHipY} stroke="#1D4ED8" strokeWidth="0.9" strokeDasharray="2 2" />
                    <text x={430} y={tHipY - 6} textAnchor="end" className="font-mono text-[10.5px] font-semibold tabular-nums" fill="#1D4ED8">
                      臀围松量 +{params.chestEase} cm
                    </text>

                    {/* Hem Width Callout */}
                    <line x1={cx + tLegInnerHem} y1={tHemY + 14} x2={cx + tLegOuterHem} y2={tHemY + 14} stroke="#1D4ED8" strokeWidth="1.2" />
                    <text x={cx + (tLegInnerHem + tLegOuterHem) / 2} y={tHemY + 28} textAnchor="middle" className="font-mono text-[10px] font-semibold tabular-nums" fill="#1D4ED8">
                      裤脚 {analysis.targetGarmentSpecs[4]?.value}
                    </text>
                  </>
                )}
              </svg>
            </div>

            {/* Bottom Generated Target Spec Strip */}
            <div className="border-t border-[#E2E2DC] bg-[#FAFAF8] px-6 py-4">
              <p className="text-xs font-medium text-[#5C5C57] mb-3">
                要穿出当前风格，你选购{CATEGORY_META[category].label}时应寻找的成衣平铺/整圈参数：
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {analysis.targetGarmentSpecs.map((spec) => (
                  <div key={spec.label}>
                    <p className="text-[11px] text-[#5C5C57]">{spec.label}</p>
                    <p className="font-mono text-base font-semibold text-[#141413] tabular-nums mt-0.5">
                      {spec.value}
                    </p>
                    <p className="text-[10px] text-[#7A7A74] mt-0.5">{spec.formula}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Deck: Precision Sliders + Designer Style Decode */}
          <div className="lg:col-span-5 bg-white border border-[#E2E2DC] p-6 lg:p-8 flex flex-col justify-between">
            {/* Interactive Dimension Sliders */}
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-[#141413]">
                  调节版型加放尺寸
                </h3>
                <p className="text-xs text-[#5C5C57] mt-1">
                  每一厘米的变化都在重新定义衣物与身体之间的空气结构
                </p>
              </div>

              {/* Slider 1: Chest Ease / Hip Ease */}
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <label htmlFor="sim-ease" className="font-medium text-[#141413]">
                    {isBottom ? '臀围松量 (Hip Ease)' : '胸围松量 (Chest Ease)'}
                  </label>
                  <span className="font-mono font-semibold text-[#1D4ED8] tabular-nums">
                    +{params.chestEase} cm
                  </span>
                </div>
                <input
                  id="sim-ease"
                  type="range"
                  min={chestEaseMin}
                  max={chestEaseMax}
                  step={1}
                  value={params.chestEase}
                  onChange={(e) =>
                    handleParamChange('chestEase', Number(e.target.value))
                  }
                  className="atelier-slider"
                />
                <div className="flex justify-between text-[11px] text-[#5C5C57] mt-1.5">
                  <span>贴合修身 (+{chestEaseMin})</span>
                  <span>黄金松弛</span>
                  <span>大廓形 (+{chestEaseMax})</span>
                </div>
              </div>

              {/* Slider 2: Shoulder Drop (Tops only) */}
              {!isBottom && (
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <label htmlFor="sim-shoulder" className="font-medium text-[#141413]">
                      肩宽偏移 (Shoulder Drop)
                    </label>
                    <span className="font-mono font-semibold text-[#1D4ED8] tabular-nums">
                      {params.shoulderDrop >= 0 ? '+' : ''}
                      {params.shoulderDrop.toFixed(1)} cm
                    </span>
                  </div>
                  <input
                    id="sim-shoulder"
                    type="range"
                    min={0}
                    max={12}
                    step={0.5}
                    value={params.shoulderDrop}
                    onChange={(e) =>
                      handleParamChange('shoulderDrop', Number(e.target.value))
                    }
                    className="atelier-slider"
                  />
                  <div className="flex justify-between text-[11px] text-[#5C5C57] mt-1.5">
                    <span>精准正肩 (+0)</span>
                    <span>微落肩 (+4)</span>
                    <span>大落肩 (+12)</span>
                  </div>
                </div>
              )}

              {/* Slider 3: Length Offset */}
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <label htmlFor="sim-length" className="font-medium text-[#141413]">
                    {isBottom
                      ? '裤内长落点 (相对脚踝)'
                      : category === 'coat'
                      ? '大衣纵向长度增量'
                      : '衣长比例调节 (相对臀上)'}
                  </label>
                  <span className="font-mono font-semibold text-[#1D4ED8] tabular-nums">
                    {params.lengthOffset >= 0 ? '+' : ''}
                    {params.lengthOffset} cm
                  </span>
                </div>
                <input
                  id="sim-length"
                  type="range"
                  min={category === 'coat' ? 4 : isBottom ? -6 : -10}
                  max={category === 'coat' ? 44 : isBottom ? 8 : 12}
                  step={1}
                  value={params.lengthOffset}
                  onChange={(e) =>
                    handleParamChange('lengthOffset', Number(e.target.value))
                  }
                  className="atelier-slider"
                />
                <div className="flex justify-between text-[11px] text-[#5C5C57] mt-1.5">
                  <span>
                    {isBottom ? '九分露踝' : category === 'coat' ? '中长盖臀' : '短宽提腰'}
                  </span>
                  <span>
                    {isBottom ? '标准轻触鞋面' : category === 'coat' ? '过膝经典' : '标准盖胯'}
                  </span>
                  <span>
                    {isBottom ? '微堆拖地' : category === 'coat' ? '长款及踝' : '中长盖臀'}
                  </span>
                </div>
              </div>

              {/* Slider 4: Hem / Leg Opening Taper */}
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <label htmlFor="sim-hem" className="font-medium text-[#141413]">
                    {isBottom ? '裤脚宽窄廓形' : '下摆轮廓收放'}
                  </label>
                  <span className="font-mono font-semibold text-[#1D4ED8] tabular-nums">
                    {params.hemTaper > 0 ? `+${params.hemTaper}` : params.hemTaper} cm
                  </span>
                </div>
                <input
                  id="sim-hem"
                  type="range"
                  min={-6}
                  max={14}
                  step={1}
                  value={params.hemTaper}
                  onChange={(e) =>
                    handleParamChange('hemTaper', Number(e.target.value))
                  }
                  className="atelier-slider"
                />
                <div className="flex justify-between text-[11px] text-[#5C5C57] mt-1.5">
                  <span>{isBottom ? '修身锥形收口' : '微收下摆'}</span>
                  <span>直筒 H 型</span>
                  <span>{isBottom ? '建筑阔腿宽口' : '微 A 散摆'}</span>
                </div>
              </div>
            </div>

            {/* Real-time Style Geometry Analysis */}
            <div className="mt-8 pt-6 border-t border-[#E2E2DC]">
              <p className="text-xs font-mono text-[#5C5C57]">
                {analysis.styleSubtitle}
              </p>
              <h4 className="font-display text-2xl font-semibold text-[#141413] mt-1">
                {analysis.styleTitle}
              </h4>

              <div className="mt-4 space-y-3 text-sm leading-relaxed">
                <p className="text-[#141413]">
                  <span className="font-semibold">垂坠力学：</span>
                  <span className="text-[#5C5C57]">{analysis.drapeMechanism}</span>
                </p>
                <p className="text-[#141413]">
                  <span className="font-semibold">视觉效果：</span>
                  <span className="text-[#5C5C57]">{analysis.visualEffect}</span>
                </p>
                <p className="text-xs text-[#5C5C57]">
                  <span className="font-semibold text-[#141413]">适配场景：</span>
                  {analysis.occasionFit}
                </p>
              </div>

              {analysis.cautionNote && (
                <div className="mt-4 p-3.5 bg-[#FFFBEB] border border-[#FDE68A] text-xs leading-relaxed text-[#92400E]">
                  <strong className="font-semibold">制版师提示：</strong>
                  {analysis.cautionNote}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
