export type PatternSystem = 'womens' | 'mens' | 'unisex';

export type MeasurementKey =
  | 'height'
  | 'shoulder'
  | 'chest'
  | 'waist'
  | 'hip'
  | 'armLength'
  | 'torsoLength'
  | 'inseam';

export interface BodyMeasurements {
  patternSystem: PatternSystem;
  height: number; // 身高 cm
  shoulder: number; // 净肩宽 cm
  chest: number; // 净胸围 cm
  waist: number; // 净腰围 cm
  hip: number; // 净臀围 cm
  armLength: number; // 臂长 cm
  torsoLength: number; // 背长(后颈至自然腰线) cm
  inseam: number; // 内腿长(裆底至脚踝) cm
}

export interface MeasurementGuide {
  key: MeasurementKey;
  label: string;
  enLabel: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  howToMeasure: string;
  designerNote: string;
  commonMistake: string;
}

export type BodySilhouetteCode = 'X' | 'A' | 'Y' | 'H' | 'O';

export interface BodyDiagnostic {
  code: BodySilhouetteCode;
  name: string;
  enName: string;
  summary: string;
  shoulderHipRatio: number; // (shoulder * 2.35) / hip approx visual balance
  waistHipRatio: number;
  legHeightRatio: number; // inseam / height
  chestWaistDiff: number;
  hipWaistDiff: number;
  keyStrength: string;
  tailoringStrategy: {
    shoulderRule: string;
    waistAndLengthRule: string;
    easeRecommendation: string;
    trouserRule: string;
  };
}

export type GarmentCategory = 'shirt' | 'blazer' | 'tshirt' | 'coat' | 'trousers';

export type StylePresetId =
  | 'tailored'
  | 'classic'
  | 'relaxed'
  | 'boxy'
  | 'oversized';

export interface StyleParameters {
  chestEase: number; // cm added to net chest (or hipEase for trousers)
  shoulderDrop: number; // cm added to net shoulder width (total across both sides)
  lengthOffset: number; // cm relative to standard baseline (0 = hip peak / standard)
  hemTaper: number; // -8 (tapered/fitted) to +14 (A-line/wide flare)
}

export interface StyleAnalysisResult {
  styleTitle: string;
  styleSubtitle: string;
  silhouetteLabel: string;
  drapeMechanism: string;
  visualEffect: string;
  occasionFit: string;
  cautionNote: string | null;
  targetGarmentSpecs: {
    label: string;
    value: string;
    formula: string;
  }[];
}

export type SizeCode = 'XS' | 'S' | 'M' | 'L' | 'XL';

export interface GarmentSizeSpec {
  size: SizeCode;
  shoulder?: number; // cm
  chest?: number; // cm (full circumference)
  length: number; // cm
  sleeve?: number; // cm
  waist?: number; // cm (full circumference)
  hip?: number; // cm (full circumference)
  inseam?: number; // cm
  hemWidth?: number; // cm (flat half-opening for trousers or full hem)
}

export interface CatalogGarment {
  id: string;
  code: string;
  name: string;
  enName: string;
  category: GarmentCategory;
  categoryLabel: string;
  fabricSpec: string;
  weightGsm: number;
  structureLevel: '挺括结构' | '中度筋骨' | '垂坠柔顺';
  intendedStyle: 'tailored' | 'relaxed' | 'oversized';
  intendedStyleLabel: string;
  image: string;
  patternNote: string;
  sizes: GarmentSizeSpec[];
}

export type EaseStatus = 'tight' | 'tailored' | 'balanced' | 'relaxed' | 'oversized';

export interface DimensionFitMetric {
  label: string;
  bodyValue: number;
  garmentValue: number;
  delta: number;
  status: EaseStatus;
  statusLabel: string;
  note: string;
}

export interface GarmentFitEvaluation {
  size: SizeCode;
  score: number; // 0-100 suitability score for user's body
  recommendedLabel: string;
  wearingStyleTitle: string;
  wearingStyleSummary: string;
  metrics: DimensionFitMetric[];
  warnings: string[];
}
