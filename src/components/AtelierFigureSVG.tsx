import React from 'react';
import { BodyMeasurements, MeasurementKey } from '../types/atelier';

interface AtelierFigureSVGProps {
  measurements: BodyMeasurements;
  activeKey: MeasurementKey;
  onSelectKey: (key: MeasurementKey) => void;
}

/**
 * Interactive Parametric Anatomical Drafting Mannequin
 * Dynamically scales shoulder, chest, waist, hip, torso, and leg proportions
 * to reflect the user's real cm dimensions and highlights the active measuring tape line.
 */
export const AtelierFigureSVG: React.FC<AtelierFigureSVGProps> = ({
  measurements,
  activeKey,
  onSelectKey,
}) => {
  // Normalize physical cm into architectural viewport coordinates (viewBox 0 0 320 460)
  const cx = 160;
  const topHead = 28;
  const totalPxHeight = 398; // vertical space for figure

  // Proportional widths scaled gently around anatomical ratios
  const shoulderHalf = Math.min(72, Math.max(36, measurements.shoulder * 1.28));
  const chestHalf = Math.min(62, Math.max(32, (measurements.chest / Math.PI) * 1.48));
  const waistHalf = Math.min(56, Math.max(24, (measurements.waist / Math.PI) * 1.45));
  const hipHalf = Math.min(64, Math.max(32, (measurements.hip / Math.PI) * 1.52));

  // Vertical anatomical landmarks derived from height, torsoLength, inseam
  const headH = totalPxHeight * 0.125;
  const neckY = topHead + headH;
  const shoulderY = neckY + 18;
  const chestY = shoulderY + 34;

  const torsoPx = Math.min(132, Math.max(82, (measurements.torsoLength / measurements.height) * totalPxHeight * 1.05));
  const waistY = shoulderY + torsoPx * 0.85;
  const hipY = waistY + 46;
  const crotchY = hipY + 18;

  const legRatio = Math.min(0.51, Math.max(0.41, measurements.inseam / measurements.height));
  const ankleY = Math.min(434, crotchY + legRatio * totalPxHeight * 0.92);

  const armEndY = Math.min(ankleY - 40, shoulderY + (measurements.armLength / measurements.height) * totalPxHeight * 0.95);
  const armOuterX = shoulderHalf + 18;

  // Smooth anatomical body silhouette path (left side down, right side up)
  const torsoPath = `
    M ${cx - 12} ${neckY}
    L ${cx - shoulderHalf + 6} ${shoulderY - 3}
    Q ${cx - shoulderHalf - 3} ${shoulderY + 2} ${cx - chestHalf - 2} ${chestY}
    C ${cx - chestHalf} ${chestY + 20}, ${cx - waistHalf - 1} ${waistY - 14}, ${cx - waistHalf} ${waistY}
    C ${cx - waistHalf - 1} ${waistY + 18}, ${cx - hipHalf} ${hipY - 14}, ${cx - hipHalf} ${hipY}
    C ${cx - hipHalf} ${hipY + 18}, ${cx - hipHalf * 0.72} ${crotchY + 20}, ${cx - 24} ${ankleY}
    L ${cx - 9} ${ankleY}
    L ${cx - 4} ${crotchY + 4}
    Q ${cx} ${crotchY + 1} ${cx + 4} ${crotchY + 4}
    L ${cx + 9} ${ankleY}
    L ${cx + 24} ${ankleY}
    C ${cx + hipHalf * 0.72} ${crotchY + 20}, ${cx + hipHalf} ${hipY + 18}, ${cx + hipHalf} ${hipY}
    C ${cx + hipHalf} ${hipY - 14}, ${cx + waistHalf + 1} ${waistY + 18}, ${cx + waistHalf} ${waistY}
    C ${cx + waistHalf + 1} ${waistY - 14}, ${cx + chestHalf} ${chestY + 20}, ${cx + chestHalf + 2} ${chestY}
    Q ${cx + shoulderHalf + 3} ${shoulderY + 2} ${cx + shoulderHalf - 6} ${shoulderY - 3}
    L ${cx + 12} ${neckY}
    Z
  `;

  const isHighlighted = (key: MeasurementKey) => activeKey === key;

  const tapeColor = (key: MeasurementKey) =>
    isHighlighted(key) ? '#1D4ED8' : '#A1A19A';

  const tapeWidth = (key: MeasurementKey) => (isHighlighted(key) ? 2.2 : 1.1);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none">
      <svg
        viewBox="0 0 320 460"
        className="w-full max-w-[330px] h-auto overflow-visible"
        role="img"
        aria-label="交互式人体尺寸制版轮廓图"
      >
        {/* Subtle vertical plumb line (Center Front Axis) */}
        <line
          x1={cx}
          y1={14}
          x2={cx}
          y2={446}
          stroke="#D6D6D0"
          strokeWidth="1"
          strokeDasharray="3 4"
        />

        {/* Floor baseline */}
        <line x1={38} y1={ankleY + 4} x2={282} y2={ankleY + 4} stroke="#D6D6D0" strokeWidth="1" />

        {/* Head oval */}
        <ellipse
          cx={cx}
          cy={topHead + headH * 0.48}
          rx={15}
          ry={headH * 0.44}
          fill="#FFFFFF"
          stroke="#141413"
          strokeWidth="1.25"
        />

        {/* Arms (subtle architectural outline) */}
        <path
          d={`M ${cx - shoulderHalf + 2} ${shoulderY + 2} Q ${cx - armOuterX} ${(shoulderY + armEndY) / 2} ${cx - armOuterX + 5} ${armEndY}`}
          fill="none"
          stroke="#7A7A74"
          strokeWidth="1.15"
          strokeLinecap="round"
        />
        <path
          d={`M ${cx + shoulderHalf - 2} ${shoulderY + 2} Q ${cx + armOuterX} ${(shoulderY + armEndY) / 2} ${cx + armOuterX - 5} ${armEndY}`}
          fill="none"
          stroke="#7A7A74"
          strokeWidth="1.15"
          strokeLinecap="round"
        />

        {/* Main parametric body contour */}
        <path
          d={torsoPath}
          fill="#FFFFFF"
          stroke="#141413"
          strokeWidth="1.35"
          className="transition-all duration-200"
        />

        {/* 1. HEIGHT dimension bracket (far left) */}
        <g
          onClick={() => onSelectKey('height')}
          className="cursor-pointer group"
        >
          <line
            x1={26}
            y1={topHead}
            x2={26}
            y2={ankleY + 4}
            stroke={tapeColor('height')}
            strokeWidth={tapeWidth('height')}
          />
          <line x1={21} y1={topHead} x2={31} y2={topHead} stroke={tapeColor('height')} strokeWidth={tapeWidth('height')} />
          <line x1={21} y1={ankleY + 4} x2={31} y2={ankleY + 4} stroke={tapeColor('height')} strokeWidth={tapeWidth('height')} />
          <text
            x={20}
            y={(topHead + ankleY) / 2}
            textAnchor="middle"
            transform={`rotate(-90 20 ${(topHead + ankleY) / 2})`}
            className="font-mono text-[10px] tabular-nums"
            fill={isHighlighted('height') ? '#1D4ED8' : '#5C5C57'}
            fontWeight={isHighlighted('height') ? 600 : 400}
          >
            身高 {measurements.height}cm
          </text>
        </g>

        {/* 2. SHOULDER line */}
        <g onClick={() => onSelectKey('shoulder')} className="cursor-pointer">
          <line
            x1={cx - shoulderHalf}
            y1={shoulderY - 12}
            x2={cx + shoulderHalf}
            y2={shoulderY - 12}
            stroke={tapeColor('shoulder')}
            strokeWidth={tapeWidth('shoulder')}
          />
          <circle cx={cx - shoulderHalf} cy={shoulderY - 12} r={isHighlighted('shoulder') ? 3.2 : 2} fill={tapeColor('shoulder')} />
          <circle cx={cx + shoulderHalf} cy={shoulderY - 12} r={isHighlighted('shoulder') ? 3.2 : 2} fill={tapeColor('shoulder')} />
          {isHighlighted('shoulder') && (
            <text
              x={cx}
              y={shoulderY - 18}
              textAnchor="middle"
              className="font-mono text-[10.5px] font-semibold tabular-nums"
              fill="#1D4ED8"
            >
              肩宽 {measurements.shoulder} cm
            </text>
          )}
        </g>

        {/* 3. CHEST tape line */}
        <g onClick={() => onSelectKey('chest')} className="cursor-pointer">
          <path
            d={`M ${cx - chestHalf - 2} ${chestY} Q ${cx} ${chestY + 5} ${cx + chestHalf + 2} ${chestY}`}
            fill="none"
            stroke={tapeColor('chest')}
            strokeWidth={tapeWidth('chest')}
            strokeDasharray={isHighlighted('chest') ? undefined : '4 3'}
          />
          <circle cx={cx - chestHalf - 2} cy={chestY} r={isHighlighted('chest') ? 3 : 1.8} fill={tapeColor('chest')} />
          <circle cx={cx + chestHalf + 2} cy={chestY} r={isHighlighted('chest') ? 3 : 1.8} fill={tapeColor('chest')} />
          {isHighlighted('chest') && (
            <g>
              <line x1={cx + chestHalf + 5} y1={chestY} x2={292} y2={chestY} stroke="#1D4ED8" strokeWidth="1" />
              <text x={294} y={chestY + 3.5} className="font-mono text-[10px] font-semibold tabular-nums" fill="#1D4ED8" textAnchor="end">
                胸围 {measurements.chest}
              </text>
            </g>
          )}
        </g>

        {/* 4. WAIST tape line */}
        <g onClick={() => onSelectKey('waist')} className="cursor-pointer">
          <path
            d={`M ${cx - waistHalf} ${waistY} Q ${cx} ${waistY + 4} ${cx + waistHalf} ${waistY}`}
            fill="none"
            stroke={tapeColor('waist')}
            strokeWidth={tapeWidth('waist')}
            strokeDasharray={isHighlighted('waist') ? undefined : '4 3'}
          />
          <circle cx={cx - waistHalf} cy={waistY} r={isHighlighted('waist') ? 3 : 1.8} fill={tapeColor('waist')} />
          <circle cx={cx + waistHalf} cy={waistY} r={isHighlighted('waist') ? 3 : 1.8} fill={tapeColor('waist')} />
          {isHighlighted('waist') && (
            <g>
              <line x1={cx + waistHalf + 4} y1={waistY} x2={292} y2={waistY} stroke="#1D4ED8" strokeWidth="1" />
              <text x={294} y={waistY - 5} className="font-mono text-[10px] font-semibold tabular-nums" fill="#1D4ED8" textAnchor="end">
                腰围 {measurements.waist}
              </text>
            </g>
          )}
        </g>

        {/* 5. HIP tape line */}
        <g onClick={() => onSelectKey('hip')} className="cursor-pointer">
          <path
            d={`M ${cx - hipHalf} ${hipY} Q ${cx} ${hipY + 6} ${cx + hipHalf} ${hipY}`}
            fill="none"
            stroke={tapeColor('hip')}
            strokeWidth={tapeWidth('hip')}
            strokeDasharray={isHighlighted('hip') ? undefined : '4 3'}
          />
          <circle cx={cx - hipHalf} cy={hipY} r={isHighlighted('hip') ? 3 : 1.8} fill={tapeColor('hip')} />
          <circle cx={cx + hipHalf} cy={hipY} r={isHighlighted('hip') ? 3 : 1.8} fill={tapeColor('hip')} />
          {isHighlighted('hip') && (
            <g>
              <line x1={cx + hipHalf + 4} y1={hipY} x2={292} y2={hipY} stroke="#1D4ED8" strokeWidth="1" />
              <text x={294} y={hipY - 5} className="font-mono text-[10px] font-semibold tabular-nums" fill="#1D4ED8" textAnchor="end">
                臀围 {measurements.hip}
              </text>
            </g>
          )}
        </g>

        {/* 6. TORSO LENGTH vertical line (center spine) */}
        <g onClick={() => onSelectKey('torsoLength')} className="cursor-pointer">
          <line
            x1={cx}
            y1={neckY + 4}
            x2={cx}
            y2={waistY}
            stroke={isHighlighted('torsoLength') ? '#1D4ED8' : 'transparent'}
            strokeWidth="2.4"
          />
          {isHighlighted('torsoLength') && (
            <>
              <circle cx={cx} cy={neckY + 4} r={3} fill="#1D4ED8" />
              <circle cx={cx} cy={waistY} r={3} fill="#1D4ED8" />
              <rect x={cx + 6} y={(neckY + waistY) / 2 - 9} width={76} height={18} rx={2} fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="0.8" />
              <text x={cx + 44} y={(neckY + waistY) / 2 + 3.5} textAnchor="middle" className="font-mono text-[9.5px] font-semibold tabular-nums" fill="#1D4ED8">
                背长 {measurements.torsoLength}cm
              </text>
            </>
          )}
        </g>

        {/* 7. ARM LENGTH line (right arm) */}
        <g onClick={() => onSelectKey('armLength')} className="cursor-pointer">
          <path
            d={`M ${cx + shoulderHalf + 5} ${shoulderY + 2} Q ${cx + armOuterX + 9} ${(shoulderY + armEndY) / 2} ${cx + armOuterX + 4} ${armEndY}`}
            fill="none"
            stroke={isHighlighted('armLength') ? '#1D4ED8' : '#C4C4BE'}
            strokeWidth={isHighlighted('armLength') ? 2.2 : 1}
            strokeDasharray={isHighlighted('armLength') ? undefined : '2 3'}
          />
          {isHighlighted('armLength') && (
            <text
              x={cx + armOuterX + 12}
              y={(shoulderY + armEndY) / 2}
              className="font-mono text-[10px] font-semibold tabular-nums"
              fill="#1D4ED8"
            >
              臂长 {measurements.armLength}
            </text>
          )}
        </g>

        {/* 8. INSEAM line (inner leg) */}
        <g onClick={() => onSelectKey('inseam')} className="cursor-pointer">
          <line
            x1={cx}
            y1={crotchY + 4}
            x2={cx}
            y2={ankleY}
            stroke={isHighlighted('inseam') ? '#1D4ED8' : '#B5B5AE'}
            strokeWidth={isHighlighted('inseam') ? 2.2 : 1}
            strokeDasharray={isHighlighted('inseam') ? undefined : '3 3'}
          />
          <circle cx={cx} cy={crotchY + 4} r={isHighlighted('inseam') ? 3 : 1.5} fill={tapeColor('inseam')} />
          <circle cx={cx} cy={ankleY} r={isHighlighted('inseam') ? 3 : 1.5} fill={tapeColor('inseam')} />
          {isHighlighted('inseam') && (
            <g>
              <line x1={cx + 3} y1={(crotchY + ankleY) / 2} x2={292} y2={(crotchY + ankleY) / 2} stroke="#1D4ED8" strokeWidth="1" />
              <text x={294} y={(crotchY + ankleY) / 2 - 5} textAnchor="end" className="font-mono text-[10px] font-semibold tabular-nums" fill="#1D4ED8">
                内长 {measurements.inseam}cm
              </text>
            </g>
          )}
        </g>
      </svg>

      {/* Interactive legend hint */}
      <p className="mt-2 text-xs text-[#5C5C57] text-center">
        点击图中测量线或右侧参数，查看专业量体基准点
      </p>
    </div>
  );
};
