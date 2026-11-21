import {
  BodyDiagnostic,
  BodyMeasurements,
  CatalogGarment,
  DimensionFitMetric,
  EaseStatus,
  GarmentCategory,
  GarmentFitEvaluation,
  GarmentSizeSpec,
  MeasurementGuide,
  StyleAnalysisResult,
  StyleParameters,
  StylePresetId,
} from '../types/atelier';

export const HERO_IMAGE_PATH = '/src/assets/images/hero_atelier_draping_1795188950528.jpg';

export interface BodyPreset {
  id: string;
  label: string;
  caption: string;
  measurements: BodyMeasurements;
}

export const BODY_PRESETS: BodyPreset[] = [
  {
    id: 'womens-standard',
    label: '女装标准 165/84A',
    caption: '均衡比例 · 常见通勤身形',
    measurements: {
      patternSystem: 'womens',
      height: 165,
      shoulder: 38.5,
      chest: 84,
      waist: 66,
      hip: 91,
      armLength: 55,
      torsoLength: 39,
      inseam: 75,
    },
  },
  {
    id: 'womens-pear',
    label: '女装梨形 160/82B',
    caption: '窄肩细腰 · 臀胯丰满',
    measurements: {
      patternSystem: 'womens',
      height: 160,
      shoulder: 36.5,
      chest: 81,
      waist: 64,
      hip: 96,
      armLength: 53,
      torsoLength: 38,
      inseam: 72,
    },
  },
  {
    id: 'mens-standard',
    label: '男装标准 178/96A',
    caption: '直筒偏宽肩 · 现代基础身形',
    measurements: {
      patternSystem: 'mens',
      height: 178,
      shoulder: 45,
      chest: 96,
      waist: 81,
      hip: 97,
      armLength: 61,
      torsoLength: 44,
      inseam: 81,
    },
  },
  {
    id: 'mens-athletic',
    label: '男装倒三角 182/104Y',
    caption: '宽肩厚胸 · 细腰长腿',
    measurements: {
      patternSystem: 'mens',
      height: 182,
      shoulder: 48.5,
      chest: 104,
      waist: 80,
      hip: 98,
      armLength: 63,
      torsoLength: 45,
      inseam: 84,
    },
  },
];

export const MEASUREMENT_GUIDES: MeasurementGuide[] = [
  {
    key: 'height',
    label: '净身高',
    enLabel: 'Height',
    unit: 'cm',
    min: 145,
    max: 200,
    step: 1,
    howToMeasure: '赤脚靠墙自然直立，双脚并拢，平视前方，测量头顶至地面的垂直高度。',
    designerNote: '决定大衣、长裤与连身单品的绝对纵向分割点，避免衣长压个子或短款截断比例。',
    commonMistake: '穿鞋测量或低头看尺会导致 2–3cm 误差，直接影响大衣是否压过小腿最粗处。',
  },
  {
    key: 'shoulder',
    label: '净肩宽',
    enLabel: 'Shoulder Width',
    unit: 'cm',
    min: 32,
    max: 54,
    step: 0.5,
    howToMeasure: '双臂自然下垂，请他人从背后沿微弧线测量左肩峰骨点至右肩峰骨点的距离。',
    designerNote: '服装的“建筑承重梁”。正肩款成衣肩宽应与净肩宽接近（+0.5~2cm），落肩款则需明确外移量。',
    commonMistake: '量到三角肌外侧圆弧处会偏宽 3cm 以上，导致买回来的正肩西装出现塌肩空鼓。',
  },
  {
    key: 'chest',
    label: '净胸围',
    enLabel: 'Chest / Bust',
    unit: 'cm',
    min: 72,
    max: 124,
    step: 1,
    howToMeasure: '穿着薄贴身衣物，平静呼吸，用软尺水平绕过胸部最丰满点及肩胛骨下缘一周。',
    designerNote: '制版最核心的基准围度。成衣胸围减去净胸围即为“胸围松量”，直接决定衣服是修身、合体还是廓形。',
    commonMistake: '深吸气挺胸或软尺在后背下滑倾斜，会造成 3–4cm 偏差，使合体衬衫门襟崩扣。',
  },
  {
    key: 'waist',
    label: '净腰围',
    enLabel: 'Natural Waist',
    unit: 'cm',
    min: 54,
    max: 112,
    step: 1,
    howToMeasure: '自然放松不刻意吸腹，在肚脐上方约 2–3cm 躯干最细凹陷处水平绕量一周（可插一指松紧）。',
    designerNote: '控制高腰裤坐姿舒适度与收腰外套的沙漏曲线；高腰下装成衣腰围通常仅需 +1~3cm 松量。',
    commonMistake: '把低腰裤腰线当成自然腰围，或死命收腹量取，结果坐下时腰头勒紧。',
  },
  {
    key: 'hip',
    label: '净臀围',
    enLabel: 'Full Hip',
    unit: 'cm',
    min: 78,
    max: 124,
    step: 1,
    howToMeasure: '双脚并拢直立，软尺保持绝对水平，绕过臀部向后最突出点与两侧胯骨最宽处一周。',
    designerNote: '决定裤装能否顺畅穿脱、坐下裆部不起横褶，也是判断上衣下摆是否会卡在胯上的关键数据。',
    commonMistake: '忽略侧胯（假胯宽）只量臀峰，会导致直筒西裤大腿根部紧绷拉扯出“猫须纹”。',
  },
  {
    key: 'torsoLength',
    label: '后背长',
    enLabel: 'Back Waist Length',
    unit: 'cm',
    min: 33,
    max: 52,
    step: 0.5,
    howToMeasure: '低头摸到颈后最凸出的第七颈椎点，沿脊柱中线垂直量至自然腰线位置。',
    designerNote: '区分“短躯干”与“长躯干”的隐藏指标，决定短款上衣和收腰西装的腰节是否正好落在你的细腰上。',
    commonMistake: '仅凭身高估算衣长，忽略同样 170cm 的人背长可相差 4–5cm。',
  },
  {
    key: 'armLength',
    label: '臂长',
    enLabel: 'Arm Length',
    unit: 'cm',
    min: 48,
    max: 70,
    step: 0.5,
    howToMeasure: '手臂微弯约 15°，从肩峰骨点经手肘外侧量至手腕尺骨凸起处（虎口上方约 2cm）。',
    designerNote: '与肩宽联动计算“总袖长 = (成衣肩宽/2) + 成衣袖长”。落肩越大，袖长数值通常越短。',
    commonMistake: '只看商家袖长数值而不算入落肩宽度，结果袖子盖过手指或露出半截小臂。',
  },
  {
    key: 'inseam',
    label: '裤内长',
    enLabel: 'Inseam Length',
    unit: 'cm',
    min: 64,
    max: 94,
    step: 0.5,
    howToMeasure: '双脚微开，从大腿内侧根部（裆底点）垂直向下量至内脚踝骨中心位置。',
    designerNote: '比外裤长更精确！九分裤 ≈ 裤内长 - 4cm；利落盖鞋面 ≈ 裤内长 + 2~3cm；拖地堆叠 ≈ +5~7cm。',
    commonMistake: '只看外裤长却不看前裆深度（高腰 vs 中低腰的裤长可相差 6cm）。',
  },
];

export const CATEGORY_META: Record<
  GarmentCategory,
  {
    label: string;
    enLabel: string;
    baseEaseRange: [number, number];
    defaultParams: StyleParameters;
    isBottom?: boolean;
  }
> = {
  shirt: {
    label: '建筑感衬衫',
    enLabel: 'Structured Shirt',
    baseEaseRange: [6, 30],
    defaultParams: { chestEase: 14, shoulderDrop: 3, lengthOffset: 0, hemTaper: 2 },
  },
  blazer: {
    label: '精裁西装外套',
    enLabel: 'Tailored Blazer',
    baseEaseRange: [8, 28],
    defaultParams: { chestEase: 12, shoulderDrop: 2, lengthOffset: 2, hemTaper: 0 },
  },
  tshirt: {
    label: '重磅圆领T恤',
    enLabel: 'Heavyweight Tee',
    baseEaseRange: [6, 34],
    defaultParams: { chestEase: 18, shoulderDrop: 6, lengthOffset: -2, hemTaper: 2 },
  },
  coat: {
    label: '长款风衣/大衣',
    enLabel: 'Architectural Coat',
    baseEaseRange: [14, 38],
    defaultParams: { chestEase: 22, shoulderDrop: 5, lengthOffset: 28, hemTaper: 8 },
  },
  trousers: {
    label: '高腰精裁长裤',
    enLabel: 'Tailored Trousers',
    baseEaseRange: [4, 24],
    defaultParams: { chestEase: 10, shoulderDrop: 0, lengthOffset: 2, hemTaper: 4 },
    isBottom: true,
  },
};

export const STYLE_PRESETS: {
  id: StylePresetId;
  label: string;
  enLabel: string;
  brief: string;
  getParams: (category: GarmentCategory) => StyleParameters;
}[] = [
  {
    id: 'tailored',
    label: '精裁修身',
    enLabel: 'Tailored',
    brief: '贴合骨骼 · 利落干练',
    getParams: (cat) => {
      if (cat === 'trousers') return { chestEase: 5, shoulderDrop: 0, lengthOffset: -2, hemTaper: -5 };
      if (cat === 'coat') return { chestEase: 14, shoulderDrop: 1, lengthOffset: 20, hemTaper: 2 };
      return { chestEase: 8, shoulderDrop: 0.5, lengthOffset: -1, hemTaper: -3 };
    },
  },
  {
    id: 'classic',
    label: '经典通勤',
    enLabel: 'Classic',
    brief: '黄金余量 · 挺括得体',
    getParams: (cat) => {
      if (cat === 'trousers') return { chestEase: 9, shoulderDrop: 0, lengthOffset: 1, hemTaper: 1 };
      if (cat === 'coat') return { chestEase: 20, shoulderDrop: 3, lengthOffset: 26, hemTaper: 6 };
      return { chestEase: 13, shoulderDrop: 2, lengthOffset: 0, hemTaper: 0 };
    },
  },
  {
    id: 'relaxed',
    label: '知识分子松弛',
    enLabel: 'Relaxed Clean Fit',
    brief: '自然垂坠 · 空气感层次',
    getParams: (cat) => {
      if (cat === 'trousers') return { chestEase: 14, shoulderDrop: 0, lengthOffset: 3, hemTaper: 6 };
      if (cat === 'coat') return { chestEase: 26, shoulderDrop: 6, lengthOffset: 34, hemTaper: 10 };
      return { chestEase: 19, shoulderDrop: 4.5, lengthOffset: 3, hemTaper: 3 };
    },
  },
  {
    id: 'boxy',
    label: '现代短宽',
    enLabel: 'Boxy Cropped',
    brief: '拉高腰线 · 几何方正',
    getParams: (cat) => {
      if (cat === 'trousers') return { chestEase: 18, shoulderDrop: 0, lengthOffset: -3, hemTaper: 9 };
      if (cat === 'coat') return { chestEase: 24, shoulderDrop: 6, lengthOffset: 8, hemTaper: 6 };
      return { chestEase: 22, shoulderDrop: 6.5, lengthOffset: -6, hemTaper: 4 };
    },
  },
  {
    id: 'oversized',
    label: '街头廓形',
    enLabel: 'Oversized',
    brief: '强落肩量 · 雕塑体量',
    getParams: (cat) => {
      if (cat === 'trousers') return { chestEase: 22, shoulderDrop: 0, lengthOffset: 6, hemTaper: 12 };
      if (cat === 'coat') return { chestEase: 34, shoulderDrop: 9, lengthOffset: 40, hemTaper: 13 };
      return { chestEase: 29, shoulderDrop: 9, lengthOffset: 7, hemTaper: 6 };
    },
  },
];

/**
 * 1. Deterministic Patternmaker Body Diagnostic Engine
 */
export function analyzeBodyProfile(m: BodyMeasurements): BodyDiagnostic {
  // Visual shoulder circumference proxy vs hip circumference
  const shoulderProxy = m.shoulder * 2.32;
  const shoulderHipRatio = Number((shoulderProxy / m.hip).toFixed(2));
  const waistHipRatio = Number((m.waist / m.hip).toFixed(2));
  const legHeightRatio = Number((m.inseam / m.height).toFixed(3));
  const chestWaistDiff = Math.round(m.chest - m.waist);
  const hipWaistDiff = Math.round(m.hip - m.waist);

  let code: BodyDiagnostic['code'] = 'H';
  let name = 'H 型 · 匀称直筒廓形';
  let enName = 'Column / Straight Silhouette';
  let summary =
    '肩、胸、腰、臀的横向落差相对克制，纵向线条干练利落。天然适配极简建筑感剪裁与直线型廓形。';
  let keyStrength = '极佳的极简垂坠表现力，不易因夸张曲线打破服装原有的几何线条。';

  if (waistHipRatio >= 0.87 && m.waist >= m.chest - 8) {
    code = 'O';
    name = 'O 型 · 中段圆润廓形';
    enName = 'Oval / Soft Midsection';
    summary =
      '腰腹围度接近胸臀围度，中段曲线饱满。选型核心在于保持前襟垂直落差与面料筋骨，避免在腰腹处产生水平绷紧褶皱。';
    keyStrength = '四肢与锁骨线条往往相对轻盈，适合通过外轮廓构建纵向通透感。';
  } else if (m.hip - m.chest >= 8 && shoulderHipRatio < 0.96) {
    code = 'A';
    name = 'A 型 · 梨形下稳廓形';
    enName = 'Pear / Triangle Silhouette';
    summary =
      '肩窄腰细、臀胯线条更具存在感。设计师的黄金平衡法则是“稳肩线、明腰节、顺胯廓形”，避免衣长截断在臀部最宽点。';
    keyStrength = '纤细的腰线与上身骨骼感，高腰与肩部微结构能立刻拉升整体重心。';
  } else if (shoulderHipRatio >= 1.09 || m.chest - m.hip >= 6) {
    code = 'Y';
    name = 'Y 型 · 倒三角宽肩廓形';
    enName = 'Inverted Triangle Silhouette';
    summary =
      '肩宽与胸廓体量显著优于下身，天然具备“衣架子”支撑力。选型需重点关注肩宽余量与袖笼深度，避免窄肩小版型造成上身拘束。';
    keyStrength = '撑起大衣、西装与重磅针织的天然骨骼优势，下装增加阔腿体量即可达成完美均衡。';
  } else if (waistHipRatio <= 0.76 && Math.abs(m.chest - m.hip) <= 9 && chestWaistDiff >= 14) {
    code = 'X';
    name = 'X 型 · 沙漏平衡廓形';
    enName = 'Hourglass Silhouette';
    summary =
      '肩臀视觉等宽且胸腰差、臀腰差清晰（腰臀比 ' +
      waistHipRatio.toFixed(2) +
      '）。无论精裁收腰还是带腰线的松弛剪裁，都应保留腰节清晰度以免被直筒大版型吞没比例。';
    keyStrength = '天然的上下平衡与明确腰节，微收腰或轻塞衣角即可凸显建筑曲线。';
  }

  const isLongLeg = legHeightRatio >= 0.455;
  const isShortTorso = m.torsoLength / m.height < 0.238;

  const shoulderRule =
    code === 'A'
      ? `净肩宽 ${m.shoulder}cm 偏精致：首选正肩微外扩 (+1.5~3cm) 或薄垫肩，慎选超过 +7cm 的大落肩。`
      : code === 'Y'
      ? `净肩宽 ${m.shoulder}cm 优势明显：优先插肩袖或自然肩线 (+1~2.5cm)，避免厚垫肩进一步放大横向宽度。`
      : `净肩宽 ${m.shoulder}cm 比例均衡：正肩通勤取 +1~2cm，松弛微落肩取 +3.5~5.5cm 最具层次。`;

  const waistAndLengthRule =
    code === 'A'
      ? `上衣衣长避开臀峰区（约 ${Math.round(m.torsoLength + 17)}–${Math.round(m.torsoLength + 22)}cm），首选短款齐腰 (${Math.round(m.torsoLength + 6)}–${Math.round(m.torsoLength + 10)}cm) 或完全盖臀 (${Math.round(m.torsoLength + 27)}cm+)。`
      : isShortTorso
      ? `后背长 ${m.torsoLength}cm 属利落短躯干：衣长不宜过长，常规上衣控制在 ${Math.round(m.torsoLength + 16)}–${Math.round(m.torsoLength + 22)}cm 即可稳住三七分。`
      : `后背长 ${m.torsoLength}cm：善用短宽 Boxy (${Math.round(m.torsoLength + 11)}–${Math.round(m.torsoLength + 15)}cm) 或高腰塞衣法，可将视觉腿长比例提升 3–5%。`;

  const easeRecommendation =
    code === 'O'
      ? `上装胸围松量建议 ≥ +14cm，且选择 260gsm 以上挺括面料；避免高弹紧身针织暴露中段起伏。`
      : code === 'X'
      ? `精裁款胸围松量 +8~12cm 配合收腰省道；若穿 +18cm 以上宽松款，建议敞开叠穿或强调腰带锚点。`
      : `日常通勤黄金胸围松量 +12~16cm（即成衣胸围 ${m.chest + 12}–${m.chest + 16}cm）；松弛风格取 +18~24cm。`;

  const trouserRule =
    code === 'A'
      ? `裤装臀围松量务必 ≥ +10cm（成衣臀围 ≥ ${m.hip + 10}cm），双褶高腰直筒/阔腿最能顺滑修饰胯线；推荐内长 ${Math.round(m.inseam + 2)}cm。`
      : isLongLeg
      ? `内腿长 ${m.inseam}cm（腿身比 ${(legHeightRatio * 100).toFixed(1)}%）：全长盖鞋面选内长 ${Math.round(m.inseam + 2.5)}cm，九分利落款选 ${Math.round(m.inseam - 4)}cm。`
      : `内腿长 ${m.inseam}cm：优先高腰直筒与微喇，裤脚盖住鞋面 1–2cm（内长 ${Math.round(m.inseam + 2)}cm）避免九分裤截断脚踝。`;

  return {
    code,
    name,
    enName,
    summary,
    shoulderHipRatio,
    waistHipRatio,
    legHeightRatio,
    chestWaistDiff,
    hipWaistDiff,
    keyStrength,
    tailoringStrategy: {
      shoulderRule,
      waistAndLengthRule,
      easeRecommendation,
      trouserRule,
    },
  };
}

/**
 * 2. Dimension-to-Style Engine: Explains HOW exact centimeters construct clothing style
 */
export function evaluateStyleFromDimensions(
  category: GarmentCategory,
  body: BodyMeasurements,
  params: StyleParameters
): StyleAnalysisResult {
  const { chestEase, shoulderDrop, lengthOffset, hemTaper } = params;
  const isBottom = category === 'trousers';

  if (isBottom) {
    const hipEase = chestEase; // reused parameter as hip ease for trousers
    const targetHip = Math.round(body.hip + hipEase);
    const targetWaist = Math.round(body.waist + (hipEase <= 7 ? 2 : hipEase <= 14 ? 3 : 5));
    const targetInseam = Math.round(body.inseam + lengthOffset);
    const baseHemHalf = body.patternSystem === 'mens' ? 21 : 19.5;
    const targetHemHalf = Number((baseHemHalf + hemTaper * 0.7).toFixed(1));
    const frontRise = Math.round(body.height * 0.168 + (hipEase > 14 ? 2 : 0));
    const targetOutseam = targetInseam + frontRise;

    let styleTitle = '经典直筒通勤风';
    let styleSubtitle = 'Classic Straight Tailoring';
    let silhouetteLabel = 'H 型垂顺直线裤';
    let drapeMechanism =
      '臀围保留适中余量，面料从臀峰垂直下落而不贴合大腿肌理，裤管中线保持完整直线。';
    let visualEffect = '拉直腿部轮廓、弱化膝盖与小腿弧度，兼顾正式商务与日常 Clean Fit。';
    let occasionFit = '商务通勤、画廊日常、搭配精裁西装或衬衫';
    let cautionNote: string | null = null;

    if (hipEase <= 6 && hemTaper <= -2) {
      styleTitle = '意式修身锥形风';
      styleSubtitle = 'Italian Tapered Slim';
      silhouetteLabel = '微收锥形廓形';
      drapeMechanism =
        '臀腿松量紧贴人体活动下限（+4~6cm），膝下向脚口收窄，呈现锐利利落的脚踝线条。';
      visualEffect = '强调腿部线条紧致感，搭配乐福鞋或短靴显得干练紧凑，适合搭配略宽松上衣形成“上松下紧”。';
      occasionFit = '商务正装、利落都市出行、智能休闲';
      if (body.hip - body.waist >= 28) {
        cautionNote = `注意：您的臀腰差为 ${body.hip - body.waist}cm，臀围松量 ≤ 6cm 容易在大腿根部形成横向拉扯纹，建议至少留出 +8~10cm。`;
      }
    } else if (hipEase >= 17 || hemTaper >= 8) {
      styleTitle = '日系建筑阔腿廓形';
      styleSubtitle = 'Architectural Wide-Leg';
      silhouetteLabel = '宽体柱状 / 垂坠阔腿';
      drapeMechanism =
        '臀围充裕松量配合宽脚口（平铺 ' +
        targetHemHalf +
        'cm），行走时裤管产生宽幅摆动褶皱，彻底隐藏腿型。';
      visualEffect = '强化下半身量感与松弛气场，高腰设计配合长裤脚能制造极强的“胸以下全是腿”纵深感。';
      occasionFit = '创意办公、当代极简、街头复古、搭配短宽上衣';
      if (lengthOffset >= 5 && body.height < 164) {
        cautionNote = `裤内长超出净内长 +${lengthOffset}cm 会在鞋面形成明显堆叠，若鞋底偏薄易显拖沓，建议搭配 3–4cm 厚底鞋。`;
      }
    } else if (hipEase >= 12) {
      styleTitle = '知识分子松弛西裤';
      styleSubtitle = 'Relaxed Pleated Drape';
      silhouetteLabel = '双褶宽松直筒';
      drapeMechanism =
        '通过腰部打褶将 +' +
        hipEase +
        'cm 的臀围余量顺滑释放至大腿，坐姿零压迫且站立时呈现优雅纵向阴影。';
      visualEffect = '不费力的老钱松弛质感，对梨形、大腿有肉或小腿微弯都有极高的包容度。';
      occasionFit = '高阶通勤、艺术策展、四季百搭主力裤型';
    }

    if (!cautionNote && lengthOffset <= -3) {
      cautionNote = `当前为九分露踝长度（内长 ${targetInseam}cm），春夏清爽利落；秋冬搭配中筒袜可保持脚踝衔接。`;
    }

    return {
      styleTitle,
      styleSubtitle,
      silhouetteLabel,
      drapeMechanism,
      visualEffect,
      occasionFit,
      cautionNote,
      targetGarmentSpecs: [
        { label: '成衣腰围', value: `${targetWaist} cm`, formula: `净腰 ${body.waist} + ${targetWaist - body.waist}` },
        { label: '成衣臀围', value: `${targetHip} cm`, formula: `净臀 ${body.hip} + ${hipEase}` },
        { label: '成衣裤内长', value: `${targetInseam} cm`, formula: `净内长 ${body.inseam} ${lengthOffset >= 0 ? '+' : ''}${lengthOffset}` },
        { label: '参考外裤长', value: `${targetOutseam} cm`, formula: `含前裆约 ${frontRise} cm` },
        { label: '裤脚平铺宽', value: `${targetHemHalf} cm`, formula: `整圈脚口 ${Math.round(targetHemHalf * 2)} cm` },
      ],
    };
  }

  // Tops / Outerwear calculation
  const baseLength =
    category === 'coat'
      ? Math.round(body.height * 0.48) // baseline mid-thigh before coat offset
      : Math.round(body.torsoLength + (category === 'blazer' ? 26 : 22));
  const targetChest = Math.round(body.chest + chestEase);
  const targetShoulder = Number((body.shoulder + shoulderDrop).toFixed(1));
  const targetLength = Math.round(baseLength + lengthOffset);
  // Sleeve compensation: every 2cm of total shoulder drop (1cm each side) reduces sleeve length by ~0.85cm to hit same wrist point
  const sleeveExtra = category === 'tshirt' ? -Math.round(body.armLength * 0.62) : category === 'coat' ? 2 : 0.5;
  const targetSleeve = Math.round(
    body.armLength + sleeveExtra - shoulderDrop * 0.42 + (chestEase > 22 ? 1.5 : 0)
  );
  const targetHem = Math.round(targetChest + hemTaper * 1.4);

  let styleTitle = '经典通勤合体风';
  let styleSubtitle = 'Classic Balanced Fit';
  let silhouetteLabel = '标准 H 型直身';
  let drapeMechanism =
    `胸围 +${chestEase}cm 构成舒适呼吸层，肩线外移 +${shoulderDrop}cm 贴近自然肩峰，面料平顺贴合但不紧绷。`;
  let visualEffect = '比例端正、精神利落，不挑场合且极易作为内搭或单穿，展现克制的专业感。';
  let occasionFit = '日常通勤、商务会面、经典极简穿搭';
  let cautionNote: string | null = null;

  const isCoat = category === 'coat';
  const effectiveEase = isCoat ? chestEase - 6 : chestEase; // coats naturally carry +6cm over shirts for layering

  if (effectiveEase <= 9 && shoulderDrop <= 2) {
    styleTitle = '锐利精裁修身风';
    styleSubtitle = 'Sharp Tailored Fit';
    silhouetteLabel = '贴体雕塑 / 微收腰廓形';
    drapeMechanism =
      `低胸围松量 (+${chestEase}cm) 搭配精准正肩 (+${shoulderDrop}cm)，面料紧随肩胛与胸腔转折，几乎无多余褶皱。`;
    visualEffect = '最大化强化肩颈骨骼线条与挺拔仪态，视觉显瘦显高，带有经典萨维尔街/法式精裁气场。';
    occasionFit = '正式场合、高要求职场、作为大衣内搭层';
    if (effectiveEase < 7) {
      cautionNote = `胸围松量仅 +${chestEase}cm，若为无弹力梭织面料（如纯棉府绸/精纺羊毛），抬臂或扣纽扣时可能有紧绷风险。`;
    }
  } else if (lengthOffset <= -4 && effectiveEase >= 15) {
    styleTitle = '现代短宽建筑风';
    styleSubtitle = 'Boxy Cropped Proportion';
    silhouetteLabel = '宽肩短身几何方盒';
    drapeMechanism =
      `充裕胸围松量 (+${chestEase}cm) 与落肩 (+${shoulderDrop}cm) 撑起横向建筑量感，但衣长果断截短至 ${targetLength}cm 停在胯骨上方。`;
    visualEffect = '通过“横向放宽、纵向收短”瞬间拉高视觉腰线，与高腰宽裤组合可制造极强的三七分黄金比例。';
    occasionFit = '当代极简、城市机能、日韩 Clean Fit、显高核心版型';
  } else if (effectiveEase >= 23 || shoulderDrop >= 7.5) {
    styleTitle = '廓形街头雕塑风';
    styleSubtitle = 'Oversized Architectural';
    silhouetteLabel = '大落肩空间廓形';
    drapeMechanism =
      `胸围 +${chestEase}cm 且肩线大幅下落 +${shoulderDrop}cm，袖笼自然加深，衣物脱离身体形成独立包裹空间与宽大垂坠褶。`;
    visualEffect = '弱化原生肩宽与体型边界，传递先锋、松弛、反正式的当代街头与设计感氛围。';
    occasionFit = '周末出行、创意行业、层次叠穿、高克重面料单穿';
    if (shoulderDrop >= 8 && body.shoulder < 38) {
      cautionNote = `您的净肩宽为 ${body.shoulder}cm，+${shoulderDrop}cm 的大落肩需要 280gsm 以上挺括面料支撑；若面料过软易显溜肩拖沓。`;
    }
  } else if (effectiveEase >= 15 || shoulderDrop >= 3.5) {
    styleTitle = '知识分子松弛风';
    styleSubtitle = 'Relaxed Editorial Fit';
    silhouetteLabel = '微落肩自然垂坠';
    drapeMechanism =
      `胸围 +${chestEase}cm 搭配 +${shoulderDrop}cm 微落肩，在腋下与后背形成柔和空气余量，动态行走时呈现流动线条。`;
    visualEffect = '介于正式与休闲的“黄金松弛带”：既保留肩线体面，又彻底消除束缚感，呈现 Quiet Luxury / 知识分子气质。';
    occasionFit = '创意通勤、画廊咖啡、四季高频实穿单品';
  }

  // Check hem / length caution for pear body or long length
  if (!cautionNote && !isCoat && lengthOffset >= 5 && body.hip - body.chest >= 8) {
    cautionNote = `衣长 ${targetLength}cm 接近您臀部最宽区下方，下摆围度需至少大于净臀围 +8cm（即 ≥ ${body.hip + 8}cm），否则下摆易卡在胯部堆积。`;
  }
  if (!cautionNote && isCoat && targetLength / body.height > 0.72) {
    cautionNote = `大衣长度 ${targetLength}cm 已达身高的 ${Math.round((targetLength / body.height) * 100)}%（接近脚踝），气场极强但建议敞开穿着或配高腰内搭。`;
  }

  return {
    styleTitle,
    styleSubtitle,
    silhouetteLabel,
    drapeMechanism,
    visualEffect,
    occasionFit,
    cautionNote,
    targetGarmentSpecs: [
      { label: '目标成衣胸围', value: `${targetChest} cm`, formula: `净胸 ${body.chest} + 松量 ${chestEase}` },
      { label: '目标成衣肩宽', value: `${targetShoulder} cm`, formula: `净肩 ${body.shoulder} ${shoulderDrop >= 0 ? '+' : ''}${shoulderDrop}` },
      { label: '目标成衣衣长', value: `${targetLength} cm`, formula: isCoat ? `身高占比 ${Math.round((targetLength / body.height) * 100)}%` : `背长 ${body.torsoLength} + ${targetLength - body.torsoLength}` },
      { label: '目标袖长参考', value: `${Math.max(18, targetSleeve)} cm`, formula: '已按落肩量自动折算' },
      { label: '下摆整圈围度', value: `${targetHem} cm`, formula: hemTaper > 2 ? '微 A 字散摆' : hemTaper < -2 ? '微收下摆' : '直筒等宽' },
    ],
  };
}

/**
 * 3. Curated Architectural Garment Catalog (using our 5 generated studio images)
 */
export const CATALOG_GARMENTS: CatalogGarment[] = [
  {
    id: 'blazer-01',
    code: 'AT-01',
    name: '炭灰精纺羊毛单排扣西装',
    enName: 'Structured Wool Single-Breasted Blazer',
    category: 'blazer',
    categoryLabel: '精裁外套',
    fabricSpec: '100% 澳洲美利奴精纺羊毛',
    weightGsm: 310,
    structureLevel: '挺括结构',
    intendedStyle: 'tailored',
    intendedStyleLabel: '利落精裁 / 通勤核心',
    image: '/src/assets/images/garment_tailored_blazer_1795189029318.jpg',
    patternNote: '采用轻薄马尾衬与微外扩建筑肩线，胸腰省道克制收拢，穿小一码呈利落商务，大一码即转变为知识分子松弛西装。',
    sizes: [
      { size: 'XS', shoulder: 40, chest: 94, length: 68, sleeve: 58 },
      { size: 'S', shoulder: 42, chest: 100, length: 70.5, sleeve: 60 },
      { size: 'M', shoulder: 44.5, chest: 106, length: 73, sleeve: 62 },
      { size: 'L', shoulder: 47, chest: 112, length: 75.5, sleeve: 63.5 },
      { size: 'XL', shoulder: 49.5, chest: 118, length: 78, sleeve: 65 },
    ],
  },
  {
    id: 'shirt-02',
    code: 'AT-02',
    name: '高支府绸微落肩建筑白衬衫',
    enName: 'Heavy Poplin Architectural Shirt',
    category: 'shirt',
    categoryLabel: '核心衬衫',
    fabricSpec: '100S 双股高密精梳棉府绸',
    weightGsm: 155,
    structureLevel: '中度筋骨',
    intendedStyle: 'relaxed',
    intendedStyleLabel: '知识分子松弛 / Clean Fit',
    image: '/src/assets/images/garment_oxford_shirt_1795188951884.jpg',
    patternNote: '后背采用双侧刀褶增加活动余量，肩线预设 +2.5~4cm 微落肩。面料挺而不硬，松量在 +14~20cm 时褶皱线条最克制高级。',
    sizes: [
      { size: 'XS', shoulder: 41.5, chest: 98, length: 67, sleeve: 55.5 },
      { size: 'S', shoulder: 44, chest: 104, length: 70, sleeve: 57.5 },
      { size: 'M', shoulder: 46.5, chest: 112, length: 73, sleeve: 59.5 },
      { size: 'L', shoulder: 49, chest: 120, length: 76, sleeve: 61 },
      { size: 'XL', shoulder: 51.5, chest: 126, length: 78.5, sleeve: 62.5 },
    ],
  },
  {
    id: 'tshirt-03',
    code: 'AT-03',
    name: '320G 重磅碳黑短宽廓形T恤',
    enName: '320gsm Boxy Heavyweight Tee',
    category: 'tshirt',
    categoryLabel: '重磅上衣',
    fabricSpec: '320gsm 精梳赛络纺重磅纯棉',
    weightGsm: 320,
    structureLevel: '挺括结构',
    intendedStyle: 'oversized',
    intendedStyleLabel: '现代短宽 / 雕塑廓形',
    image: '/src/assets/images/garment_boxy_tee_1795188953857.jpg',
    patternNote: '宽胸围搭配偏短衣长的几何方盒（Boxy）剪裁，高密厚领口不易变形。靠面料自身克重撑起独立立体轮廓，无需依赖身材肌肉支撑。',
    sizes: [
      { size: 'XS', shoulder: 45, chest: 102, length: 61, sleeve: 20 },
      { size: 'S', shoulder: 48, chest: 108, length: 64, sleeve: 21 },
      { size: 'M', shoulder: 51.5, chest: 116, length: 67, sleeve: 22.5 },
      { size: 'L', shoulder: 55, chest: 124, length: 70, sleeve: 23.5 },
      { size: 'XL', shoulder: 58, chest: 132, length: 73, sleeve: 24.5 },
    ],
  },
  {
    id: 'coat-04',
    code: 'AT-04',
    name: '深岩灰插肩袖长款风衣大衣',
    enName: 'Raglan Gabardine Long Coat',
    category: 'coat',
    categoryLabel: '长款大衣',
    fabricSpec: '高密防水棉毛华达呢 Gabardine',
    weightGsm: 340,
    structureLevel: '垂坠柔顺',
    intendedStyle: 'relaxed',
    intendedStyleLabel: '流动 A 廓形 / 极简长外套',
    image: '/src/assets/images/garment_trench_coat_1795188960367.jpg',
    patternNote: '一体式插肩袖对不同肩宽包容度极高，下摆呈克制 A 字展开。内搭西装或厚针织时，建议胸围松量 ≥ +22cm 以保证袖笼舒展。',
    sizes: [
      { size: 'XS', shoulder: 43, chest: 108, length: 105, sleeve: 56 },
      { size: 'S', shoulder: 45.5, chest: 114, length: 110, sleeve: 58 },
      { size: 'M', shoulder: 48, chest: 122, length: 115, sleeve: 60 },
      { size: 'L', shoulder: 50.5, chest: 130, length: 120, sleeve: 62 },
      { size: 'XL', shoulder: 53, chest: 136, length: 124, sleeve: 63.5 },
    ],
  },
  {
    id: 'trousers-05',
    code: 'AT-05',
    name: '石墨灰高腰双褶宽直筒羊毛裤',
    enName: 'Double-Pleated Wide Wool Trousers',
    category: 'trousers',
    categoryLabel: '精裁裤装',
    fabricSpec: '精纺抗皱垂感羊毛混纺',
    weightGsm: 275,
    structureLevel: '垂坠柔顺',
    intendedStyle: 'relaxed',
    intendedStyleLabel: '高腰直筒 / 修饰胯腿',
    image: '/src/assets/images/garment_pleated_trousers_1795188949534.jpg',
    patternNote: '前片双深褶为臀腿预留充裕立体空间，配合中缝熨烫线制造笔直视觉柱感。核心选购原则：先锁腰围合体度（+1~4cm），再核对臀围松量 ≥ +9cm。',
    sizes: [
      { size: 'XS', waist: 66, hip: 98, length: 99, inseam: 71, hemWidth: 22 },
      { size: 'S', waist: 71, hip: 103, length: 102, inseam: 74, hemWidth: 23 },
      { size: 'M', waist: 77, hip: 109, length: 105, inseam: 77, hemWidth: 24 },
      { size: 'L', waist: 83, hip: 115, length: 108, inseam: 80, hemWidth: 25 },
      { size: 'XL', waist: 89, hip: 121, length: 110, inseam: 82, hemWidth: 26 },
    ],
  },
];

function classifyChestEase(
  ease: number,
  category: GarmentCategory
): { status: EaseStatus; label: string; note: string } {
  const shift = category === 'coat' ? 6 : category === 'blazer' ? 2 : 0;
  const e = ease - shift;
  if (e < 5) {
    return { status: 'tight', label: '偏紧预警', note: '胸围余量不足，扣合或抬臂易紧绷拉褶' };
  }
  if (e < 11) {
    return { status: 'tailored', label: '精裁修身', note: '紧贴胸腔线条，呈现干练利落轮廓' };
  }
  if (e < 18) {
    return { status: 'balanced', label: '黄金余量', note: '最易驾驭的舒适余量，挺括不紧绷' };
  }
  if (e < 26) {
    return { status: 'relaxed', label: '松弛廓形', note: '自然垂坠空气感，知识分子/Clean Fit 气质' };
  }
  return { status: 'oversized', label: '大幅廓形', note: '街头雕塑感体量，需靠面料筋骨撑起' };
}

function classifyShoulderDelta(delta: number): { status: EaseStatus; label: string; note: string } {
  if (delta < -0.5) {
    return { status: 'tight', label: '肩宽过窄', note: '肩缝缩进肩峰内侧，易勒腋下且显头大' };
  }
  if (delta <= 2.2) {
    return { status: 'tailored', label: '精准正肩', note: '肩缝精准落于肩峰，提拔精神气场' };
  }
  if (delta <= 5.5) {
    return { status: 'balanced', label: '微落肩', note: '柔和肩部棱角，营造松弛不刻板的肩线' };
  }
  if (delta <= 9) {
    return { status: 'relaxed', label: '明显落肩', note: '休闲廓形肩线，弱化原生宽肩或窄肩' };
  }
  return { status: 'oversized', label: '大落肩', note: '强烈先锋街头量感，注意整体身高平衡' };
}

function classifyWaistEase(delta: number): { status: EaseStatus; label: string; note: string } {
  if (delta < 0) {
    return { status: 'tight', label: '腰围偏小', note: '成衣小于净腰围，系扣困难或坐姿勒腹' };
  }
  if (delta <= 3.5) {
    return { status: 'tailored', label: '贴合稳腰', note: '无需腰带即可稳固贴合自然腰线' };
  }
  if (delta <= 7) {
    return { status: 'balanced', label: '微松余量', note: '塞入毛衣/衬衫后依然舒适，配腰带更利落' };
  }
  return { status: 'relaxed', label: '腰围偏大', note: '需搭配腰带收紧，或自然滑落为中低腰穿法' };
}

function classifyHipEase(delta: number): { status: EaseStatus; label: string; note: string } {
  if (delta < 4) {
    return { status: 'tight', label: '臀胯紧绷', note: '坐姿受限，易在裆部产生放射状拉扯褶' };
  }
  if (delta <= 9) {
    return { status: 'tailored', label: '合体修饰', note: '贴合臀型而不紧绷，呈现利落精裁直筒' };
  }
  if (delta <= 16) {
    return { status: 'balanced', label: '垂顺余量', note: '自然隐藏胯宽与大腿线条，行走垂坠感极佳' };
  }
  return { status: 'relaxed', label: '宽体廓形', note: '鲜明的日系/建筑宽腿体量感' };
}

/**
 * 4. Evaluate a specific Garment Size against User Body Measurements
 */
export function evaluateGarmentSizeFit(
  body: BodyMeasurements,
  garment: CatalogGarment,
  sizeSpec: GarmentSizeSpec
): GarmentFitEvaluation {
  const metrics: DimensionFitMetric[] = [];
  const warnings: string[] = [];
  let penalty = 0;

  if (garment.category === 'trousers') {
    const waistDelta = Number(((sizeSpec.waist ?? 0) - body.waist).toFixed(1));
    const hipDelta = Number(((sizeSpec.hip ?? 0) - body.hip).toFixed(1));
    const inseamDelta = Number(((sizeSpec.inseam ?? 0) - body.inseam).toFixed(1));

    const wClass = classifyWaistEase(waistDelta);
    const hClass = classifyHipEase(hipDelta);

    metrics.push({
      label: '腰围松量',
      bodyValue: body.waist,
      garmentValue: sizeSpec.waist ?? 0,
      delta: waistDelta,
      status: wClass.status,
      statusLabel: wClass.label,
      note: wClass.note,
    });
    metrics.push({
      label: '臀围松量',
      bodyValue: body.hip,
      garmentValue: sizeSpec.hip ?? 0,
      delta: hipDelta,
      status: hClass.status,
      statusLabel: hClass.label,
      note: hClass.note,
    });
    metrics.push({
      label: '裤内长差',
      bodyValue: body.inseam,
      garmentValue: sizeSpec.inseam ?? 0,
      delta: inseamDelta,
      status:
        inseamDelta < -6
          ? 'tight'
          : inseamDelta <= -1
          ? 'tailored'
          : inseamDelta <= 4
          ? 'balanced'
          : 'relaxed',
      statusLabel:
        inseamDelta < -6
          ? '偏短'
          : inseamDelta <= -1
          ? '九分露踝'
          : inseamDelta <= 4
          ? '标准盖鞋'
          : '微堆拖地',
      note:
        inseamDelta <= -1
          ? '露出脚踝线条，视觉清爽利落'
          : inseamDelta <= 4
          ? '自然轻触鞋面，拉长下肢比例'
          : '在鞋面形成微堆积，建议搭配厚底鞋或锁边微调',
    });

    if (waistDelta < 0) {
      penalty += 42 + Math.abs(waistDelta) * 4;
      warnings.push(`成衣腰围比净腰围小 ${Math.abs(waistDelta)}cm，存在穿不上或勒腰风险。`);
    } else if (waistDelta > 8) {
      penalty += (waistDelta - 8) * 3.5;
      warnings.push(`腰围余量达 +${waistDelta}cm，建议配合皮带或选择小一码。`);
    } else {
      penalty += Math.abs(waistDelta - 2.5) * 2.2;
    }

    if (hipDelta < 5) {
      penalty += 35;
      warnings.push(`臀围松量仅 +${hipDelta}cm，坐姿与迈步时胯部可能紧绷。`);
    } else if (hipDelta > 22) {
      penalty += (hipDelta - 22) * 2;
    } else {
      penalty += Math.abs(hipDelta - 13) * 1.1;
    }

    if (Math.abs(inseamDelta) > 6) {
      penalty += 8;
    }

    const wearingStyleTitle =
      waistDelta < 0 || hipDelta < 4
        ? '尺码偏小 · 紧绷受限'
        : hipDelta <= 10
        ? '利落精裁直筒风'
        : hipDelta <= 17
        ? '松弛垂坠西裤风'
        : '宽幅建筑阔腿风';

    const wearingStyleSummary =
      waistDelta < 0
        ? `此码腰围偏小 ${Math.abs(waistDelta)}cm，不建议强行选小；建议上探一码再配合腰带。`
        : `在你身上将呈现 ${
            hipDelta <= 10 ? '克制合体的直筒线条' : hipDelta <= 17 ? '极具松弛垂感的双褶宽直筒' : '气场鲜明的宽体阔腿'
          }，裤脚${inseamDelta >= 1 ? '自然垂落覆鞋面' : '呈清爽九分露踝效果'}。`;

    const score = Math.max(15, Math.min(99, Math.round(100 - penalty)));
    return {
      size: sizeSpec.size,
      score,
      recommendedLabel: score >= 85 ? '数据最优匹配' : score >= 70 ? '可选风格尺码' : '存在维度偏差',
      wearingStyleTitle,
      wearingStyleSummary,
      metrics,
      warnings,
    };
  }

  // Tops & Outerwear
  const chestDelta = Number(((sizeSpec.chest ?? 0) - body.chest).toFixed(1));
  const shoulderDelta = Number(((sizeSpec.shoulder ?? 0) - body.shoulder).toFixed(1));
  const baseIdealLength =
    garment.category === 'coat'
      ? body.height * 0.65
      : garment.category === 'tshirt'
      ? body.torsoLength + 23
      : body.torsoLength + 27;
  const lengthDelta = Number((sizeSpec.length - baseIdealLength).toFixed(1));

  const cClass = classifyChestEase(chestDelta, garment.category);
  const sClass = classifyShoulderDelta(shoulderDelta);

  metrics.push({
    label: '胸围松量',
    bodyValue: body.chest,
    garmentValue: sizeSpec.chest ?? 0,
    delta: chestDelta,
    status: cClass.status,
    statusLabel: cClass.label,
    note: cClass.note,
  });

  metrics.push({
    label: '肩线偏移',
    bodyValue: body.shoulder,
    garmentValue: sizeSpec.shoulder ?? 0,
    delta: shoulderDelta,
    status: sClass.status,
    statusLabel: sClass.label,
    note: sClass.note,
  });

  const effectiveSleeveReach = (sizeSpec.shoulder ?? body.shoulder) / 2 + (sizeSpec.sleeve ?? 0);
  const bodyArmReach = body.shoulder / 2 + body.armLength;
  const sleeveDelta = Number((effectiveSleeveReach - bodyArmReach).toFixed(1));

  if (garment.category !== 'tshirt' && sizeSpec.sleeve) {
    metrics.push({
      label: '综合袖长落点',
      bodyValue: Math.round(bodyArmReach),
      garmentValue: Math.round(effectiveSleeveReach),
      delta: sleeveDelta,
      status:
        sleeveDelta < -3
          ? 'tight'
          : sleeveDelta <= 1.5
          ? 'tailored'
          : sleeveDelta <= 4.5
          ? 'balanced'
          : 'relaxed',
      statusLabel:
        sleeveDelta < -3
          ? '袖长偏短'
          : sleeveDelta <= 1.5
          ? '齐腕骨'
          : sleeveDelta <= 4.5
          ? '盖虎口'
          : '长袖堆叠',
      note: '按「半肩宽 + 袖长」计算实际覆盖至手腕的距离',
    });
  } else {
    metrics.push({
      label: '衣长比例位',
      bodyValue: Math.round(baseIdealLength),
      garmentValue: sizeSpec.length,
      delta: lengthDelta,
      status:
        lengthDelta < -5
          ? 'tailored'
          : lengthDelta <= 3
          ? 'balanced'
          : 'relaxed',
      statusLabel:
        lengthDelta < -5 ? '短宽显高' : lengthDelta <= 3 ? '黄金盖胯' : '中长盖臀',
      note:
        lengthDelta < -5
          ? '停在胯骨上方，显著抬高视觉腰线'
          : lengthDelta <= 3
          ? '落于自然臀上区，单穿扎衣皆可'
          : '完全盖过臀部，适合打造松弛廓形',
    });
  }

  // Target ideal ease per garment's intended design
  const idealChestEase =
    garment.category === 'coat'
      ? 26
      : garment.intendedStyle === 'tailored'
      ? 12
      : garment.intendedStyle === 'relaxed'
      ? 18
      : 24;
  const idealShoulder =
    garment.intendedStyle === 'tailored'
      ? 1.8
      : garment.intendedStyle === 'relaxed'
      ? 4.0
      : 7.0;

  if (chestDelta < (garment.category === 'coat' ? 12 : 6)) {
    penalty += 40;
    warnings.push(`胸围松量仅 +${chestDelta}cm，活动空间偏紧，建议选大一码。`);
  } else {
    penalty += Math.abs(chestDelta - idealChestEase) * 1.65;
  }

  if (shoulderDelta < -0.5) {
    penalty += 32 + Math.abs(shoulderDelta) * 5;
    warnings.push(`肩宽比净肩宽窄 ${Math.abs(shoulderDelta)}cm，正肩穿法易出现夹腋与袖山紧绷。`);
  } else {
    penalty += Math.abs(shoulderDelta - idealShoulder) * 2.4;
  }

  if (garment.category !== 'tshirt' && sleeveDelta < -4) {
    penalty += 12;
    warnings.push(`综合袖长可能短于腕骨约 ${Math.abs(sleeveDelta)}cm，抬臂会露出手腕以上。`);
  }

  const score = Math.max(18, Math.min(99, Math.round(100 - penalty)));

  let wearingStyleTitle = '经典均衡通勤';
  let wearingStyleSummary = '';

  if (chestDelta < (garment.category === 'coat' ? 12 : 7) || shoulderDelta < -0.5) {
    wearingStyleTitle = '偏紧受限 · 不建议';
    wearingStyleSummary = '关键维度松量低于舒适阈值，上身易显局促，推荐上调一码获得设计师预期轮廓。';
  } else if (chestDelta <= (garment.category === 'coat' ? 20 : 14) && shoulderDelta <= 3.5) {
    wearingStyleTitle = '干练精裁合体风';
    wearingStyleSummary = `胸围 +${chestDelta}cm 与精准肩线 (+${shoulderDelta}cm) 让整件衣服紧贴骨骼线条，气质克制利落，适合正式与高阶通勤。`;
  } else if (chestDelta <= (garment.category === 'coat' ? 30 : 22)) {
    wearingStyleTitle = '松弛知识分子风';
    wearingStyleSummary = `胸围 +${chestDelta}cm 搭配 +${shoulderDelta}cm 微落肩，在身体周围形成恰到好处的空气余量，不挑内搭且自带松弛高级感。`;
  } else {
    wearingStyleTitle = '宽大廓形街头风';
    wearingStyleSummary = `胸围 +${chestDelta}cm 与 +${shoulderDelta}cm 大落肩显著放大体量，呈现出鲜明的先锋 Oversized 垂坠气场。`;
  }

  return {
    size: sizeSpec.size,
    score,
    recommendedLabel: score >= 85 ? '数据最优匹配' : score >= 70 ? '风格化可选码' : '维度不匹配',
    wearingStyleTitle,
    wearingStyleSummary,
    metrics,
    warnings,
  };
}

export function getBestGarmentSize(
  body: BodyMeasurements,
  garment: CatalogGarment
): GarmentFitEvaluation {
  const evals = garment.sizes.map((s) => evaluateGarmentSizeFit(body, garment, s));
  return evals.reduce((best, curr) => (curr.score > best.score ? curr : best), evals[0]);
}

/**
 * 5. Custom Online Store Size-Chart Verifier
 */
export interface CustomTopSpecInput {
  garmentType: 'shirt' | 'blazer' | 'tshirt' | 'coat';
  isHalfMeasurement: boolean; // true if shopper enters flat-lay chest width (e.g. 56cm instead of 112cm)
  shoulder: number;
  chestInput: number;
  length: number;
  sleeve: number;
}

export interface CustomBottomSpecInput {
  isHalfMeasurement: boolean;
  waistInput: number;
  hipInput: number;
  outseam: number;
  frontRise: number;
  hemWidth: number;
}

export function verifyCustomTopSpec(
  body: BodyMeasurements,
  input: CustomTopSpecInput
): GarmentFitEvaluation {
  const fullChest = input.isHalfMeasurement ? input.chestInput * 2 : input.chestInput;
  const mockGarment: CatalogGarment = {
    id: 'custom-top',
    code: 'CUSTOM',
    name: '自定义验算上装',
    enName: 'Custom Top',
    category: input.garmentType,
    categoryLabel: CATEGORY_META[input.garmentType].label,
    fabricSpec: '待购商品',
    weightGsm: 220,
    structureLevel: '中度筋骨',
    intendedStyle: 'relaxed',
    intendedStyleLabel: '自定义',
    image: '',
    patternNote: '',
    sizes: [],
  };
  return evaluateGarmentSizeFit(body, mockGarment, {
    size: 'M',
    shoulder: input.shoulder,
    chest: fullChest,
    length: input.length,
    sleeve: input.sleeve,
  });
}

export function verifyCustomBottomSpec(
  body: BodyMeasurements,
  input: CustomBottomSpecInput
): GarmentFitEvaluation {
  const fullWaist = input.isHalfMeasurement ? input.waistInput * 2 : input.waistInput;
  const fullHip = input.isHalfMeasurement ? input.hipInput * 2 : input.hipInput;
  const estimatedInseam = Math.max(50, Number((input.outseam - input.frontRise).toFixed(1)));
  const mockGarment: CatalogGarment = {
    id: 'custom-bottom',
    code: 'CUSTOM',
    name: '自定义验算裤装',
    enName: 'Custom Trousers',
    category: 'trousers',
    categoryLabel: '裤装',
    fabricSpec: '待购商品',
    weightGsm: 260,
    structureLevel: '垂坠柔顺',
    intendedStyle: 'relaxed',
    intendedStyleLabel: '自定义',
    image: '',
    patternNote: '',
    sizes: [],
  };
  return evaluateGarmentSizeFit(body, mockGarment, {
    size: 'M',
    waist: fullWaist,
    hip: fullHip,
    length: input.outseam,
    inseam: estimatedInseam,
    hemWidth: input.hemWidth,
  });
}

/**
 * 6. Generate Personal Shopping Spec Matrix (for Spec Card Modal)
 */
export interface BuyingRangeRow {
  category: string;
  keyMetric: string;
  tailoredRange: string;
  relaxedRange: string;
  keyTip: string;
}

export function buildPersonalBuyingMatrix(body: BodyMeasurements): BuyingRangeRow[] {
  return [
    {
      category: '基础衬衫 / 针织',
      keyMetric: '成衣胸围 · 肩宽',
      tailoredRange: `胸围 ${body.chest + 8}–${body.chest + 12}cm · 肩宽 ${(body.shoulder + 1).toFixed(1)}–${(body.shoulder + 2).toFixed(1)}cm`,
      relaxedRange: `胸围 ${body.chest + 16}–${body.chest + 22}cm · 肩宽 ${(body.shoulder + 3.5).toFixed(1)}–${(body.shoulder + 6).toFixed(1)}cm`,
      keyTip: `衣长推荐 ${Math.round(body.torsoLength + 20)}–${Math.round(body.torsoLength + 28)}cm`,
    },
    {
      category: '精裁西装 / 夹克',
      keyMetric: '成衣胸围 · 肩宽',
      tailoredRange: `胸围 ${body.chest + 10}–${body.chest + 14}cm · 肩宽 ${(body.shoulder + 1.5).toFixed(1)}–${(body.shoulder + 2.5).toFixed(1)}cm`,
      relaxedRange: `胸围 ${body.chest + 18}–${body.chest + 24}cm · 肩宽 ${(body.shoulder + 3.5).toFixed(1)}–${(body.shoulder + 5.5).toFixed(1)}cm`,
      keyTip: `综合袖长(半肩+袖长) ≈ ${Math.round(body.shoulder / 2 + body.armLength + 1.5)}cm`,
    },
    {
      category: '重磅 T 恤 / 卫衣',
      keyMetric: '成衣胸围 · 衣长',
      tailoredRange: `胸围 ${body.chest + 10}–${body.chest + 14}cm · 衣长 ${Math.round(body.torsoLength + 18)}–${Math.round(body.torsoLength + 22)}cm`,
      relaxedRange: `胸围 ${body.chest + 20}–${body.chest + 28}cm · 短宽衣长 ${Math.round(body.torsoLength + 15)}–${Math.round(body.torsoLength + 20)}cm`,
      keyTip: `肩宽可放至 ${(body.shoulder + 6).toFixed(1)}–${(body.shoulder + 9).toFixed(1)}cm 塑造方盒廓形`,
    },
    {
      category: '长款大衣 / 风衣',
      keyMetric: '成衣胸围 · 衣长',
      tailoredRange: `胸围 ${body.chest + 18}–${body.chest + 22}cm · 衣长 ${Math.round(body.height * 0.6)}–${Math.round(body.height * 0.65)}cm`,
      relaxedRange: `胸围 ${body.chest + 26}–${body.chest + 34}cm · 衣长 ${Math.round(body.height * 0.66)}–${Math.round(body.height * 0.71)}cm`,
      keyTip: '优先核对胸围能否容纳内搭西装/厚毛衣',
    },
    {
      category: '高腰西裤 / 长裤',
      keyMetric: '腰围 · 臀围 · 裤内长',
      tailoredRange: `腰围 ${body.waist + 1}–${body.waist + 3}cm · 臀围 ${body.hip + 6}–${body.hip + 10}cm`,
      relaxedRange: `腰围 ${body.waist + 2}–${body.waist + 5}cm · 臀围 ${body.hip + 12}–${body.hip + 18}cm`,
      keyTip: `九分内长 ${Math.round(body.inseam - 4)}cm / 标准盖鞋 ${Math.round(body.inseam + 2)}cm`,
    },
  ];
}
