import { useEffect, useState } from 'react';
import { ArrowDownRight, Ruler } from 'lucide-react';
import { GarmentCatalogMatch } from './components/GarmentCatalogMatch';
import { GarmentSpecVerifier } from './components/GarmentSpecVerifier';
import { MeasurementStudio } from './components/MeasurementStudio';
import { SpecCardModal } from './components/SpecCardModal';
import { StylePatternSimulator } from './components/StylePatternSimulator';
import {
  BODY_PRESETS,
  HERO_IMAGE_PATH,
  analyzeBodyProfile,
} from './data/atelierEngine';
import { BodyMeasurements } from './types/atelier';

const STORAGE_KEY = 'caidu_atelier_measurements_v1';

function loadInitialMeasurements(): BodyMeasurements {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<BodyMeasurements>;
      if (
        typeof parsed.height === 'number' &&
        typeof parsed.shoulder === 'number' &&
        typeof parsed.chest === 'number' &&
        typeof parsed.waist === 'number' &&
        typeof parsed.hip === 'number'
      ) {
        return {
          ...BODY_PRESETS[0].measurements,
          ...parsed,
        };
      }
    }
  } catch {
    // Fallback to default standard profile
  }
  return { ...BODY_PRESETS[0].measurements };
}

export default function App() {
  const [measurements, setMeasurements] = useState<BodyMeasurements>(() =>
    loadInitialMeasurements()
  );
  const [specCardOpen, setSpecCardOpen] = useState(false);
  const [heroImgBroken, setHeroImgBroken] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(measurements));
    } catch {
      // Ignore storage quota restrictions
    }
  }, [measurements]);

  const diagnostic = analyzeBodyProfile(measurements);

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#141413] flex flex-col">
      {/* Top Bar Contract: Exactly 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-40 bg-[#F7F7F5]/95 backdrop-blur-sm border-b border-[#E2E2DC]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className="font-display text-2xl font-semibold tracking-tight text-[#141413] whitespace-nowrap shrink-0"
          >
            裁度 Atelier
          </a>

          {/* Zone 2: 4 concise single-line text nav links */}
          <nav
            aria-label="主导航"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5C5C57]"
          >
            <a
              href="#measurement-studio"
              className="hover:text-[#141413] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              量体档案
            </a>
            <a
              href="#style-lab"
              className="hover:text-[#141413] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              尺寸与风格
            </a>
            <a
              href="#garment-catalog"
              className="hover:text-[#141413] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              数据选款
            </a>
            <a
              href="#spec-verifier"
              className="hover:text-[#141413] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              尺码验算
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={() => setSpecCardOpen(true)}
              className="px-4 py-2 text-xs font-medium text-white bg-[#141413] hover:bg-[#1D4ED8] rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              生成尺寸卡
            </button>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Editorial Atelier Hero Section (2-Column Balanced Split) */}
        <section className="py-12 lg:py-20">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              {/* Left Thesis Column */}
              <div className="lg:col-span-6 flex flex-col justify-between py-2">
                <div>
                  <p className="text-xs text-[#5C5C57] tracking-wide mb-5">
                    服装数据选型工坊 · 净体维度 × 制版松量 × 风格几何
                  </p>

                  <h1 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.14] font-semibold tracking-tight text-[#141413] text-balance">
                    像专业服装设计师一样，用尺寸数据选择衣服
                  </h1>

                  <p className="mt-6 text-base leading-relaxed text-[#5C5C57] max-w-xl">
                    衣服合不合身、穿出精裁利落还是松弛廓形，本质上取决于一个制版公式：
                    <span className="font-mono text-sm text-[#141413] font-medium mx-1">
                      成衣尺寸 = 净体尺寸 + 松量
                    </span>
                    。量出自己的关键尺寸，告别凭感觉盲猜 S/M/L。
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-5">
                    <a
                      href="#measurement-studio"
                      className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-sm transition-colors whitespace-nowrap shrink-0"
                    >
                      输入我的身材尺寸
                      <ArrowDownRight className="w-4 h-4" />
                    </a>
                    <a
                      href="#style-lab"
                      className="text-sm font-medium text-[#141413] hover:text-[#1D4ED8] underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
                    >
                      直接体验尺寸与风格实验室
                    </a>
                  </div>
                </div>

                {/* Live Active Profile Bar at bottom of Hero Left */}
                <div className="mt-10 pt-6 border-t border-[#E2E2DC]">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs text-[#5C5C57] mb-2">
                    <span>当前激活的个人档案</span>
                    <span className="font-mono text-[#141413] font-medium">
                      {diagnostic.name}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-[#141413] tabular-nums">
                    <span>身高 {measurements.height}</span>
                    <span className="text-[#C8C8C0]" aria-hidden="true">/</span>
                    <span>肩宽 {measurements.shoulder}</span>
                    <span className="text-[#C8C8C0]" aria-hidden="true">/</span>
                    <span>胸围 {measurements.chest}</span>
                    <span className="text-[#C8C8C0]" aria-hidden="true">/</span>
                    <span>腰围 {measurements.waist}</span>
                    <span className="text-[#C8C8C0]" aria-hidden="true">/</span>
                    <span>臀围 {measurements.hip}</span>
                    <span className="text-[#C8C8C0]" aria-hidden="true">/</span>
                    <span>内长 {measurements.inseam} cm</span>
                  </div>
                </div>
              </div>

              {/* Right Editorial Studio Image (h-full stretch) */}
              <div className="lg:col-span-6">
                <div className="h-full min-h-[340px] lg:min-h-[440px] bg-[#EAEAE5] border border-[#E2E2DC] overflow-hidden relative">
                  {!heroImgBroken ? (
                    <img
                      src={HERO_IMAGE_PATH}
                      alt="服装制版工坊工作台：纸样、软尺、剪刀与立裁人台"
                      referrerPolicy="no-referrer"
                      onError={() => setHeroImgBroken(true)}
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 atelier-grid-bg text-center">
                      <Ruler className="w-10 h-10 text-[#5C5C57] mb-3" />
                      <p className="font-display text-xl text-[#141413]">
                        裁度 Atelier 制版工坊
                      </p>
                      <p className="text-xs text-[#5C5C57] mt-1">
                        净体量取 · 松量计算 · 廓形风格推演
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Full-Width 4-Step Methodology Strip below Hero Split */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-b border-[#E2E2DC] divide-y sm:divide-y-0 sm:divide-x divide-[#E2E2DC]">
              {[
                {
                  step: '01',
                  title: '精准量取 8 项净体',
                  desc: '跟随制版基准点测量肩宽、三围、背长与裤内长，自动诊断身形几何。',
                  href: '#measurement-studio',
                },
                {
                  step: '02',
                  title: '看懂尺寸如何塑造风格',
                  desc: '拖动胸围松量、落肩与衣长滑块，直观理解修身、松弛与短宽的厘米差异。',
                  href: '#style-lab',
                },
                {
                  step: '03',
                  title: '跨尺码数据选款对比',
                  desc: '同一版型穿 S、M、L 分别呈现什么风格？所有部位松量一目了然。',
                  href: '#garment-catalog',
                },
                {
                  step: '04',
                  title: '网购尺码表反推验算',
                  desc: '输入任意品牌详情页的平铺尺寸，下单前 10 秒提前避开紧绷与压个子。',
                  href: '#spec-verifier',
                },
              ].map((item) => (
                <a
                  key={item.step}
                  href={item.href}
                  className="py-6 sm:px-6 first:sm:pl-0 last:sm:pr-0 group block transition-colors hover:bg-white/60"
                >
                  <span className="font-mono text-xs text-[#1D4ED8] font-medium">
                    {item.step}
                  </span>
                  <h2 className="mt-1.5 text-sm font-semibold text-[#141413] group-hover:text-[#1D4ED8] transition-colors">
                    {item.title}
                  </h2>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#5C5C57]">
                    {item.desc}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Module 1: Atelier Body Measurement Studio & Silhouette Diagnostic */}
        <MeasurementStudio
          measurements={measurements}
          onChange={setMeasurements}
          onOpenSpecCard={() => setSpecCardOpen(true)}
        />

        {/* Module 2: Dimension-to-Style Parametric Blueprint Simulator */}
        <StylePatternSimulator measurements={measurements} />

        {/* Module 3: Data-Driven Architectural Garment Catalog & Multi-Size Inspector */}
        <GarmentCatalogMatch measurements={measurements} />

        {/* Module 4: Online Store Size Chart Reverse Verifier */}
        <GarmentSpecVerifier measurements={measurements} />
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-[#E2E2DC] bg-white py-10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="font-display text-xl font-semibold text-[#141413]">
              裁度 Atelier
            </span>
            <p className="text-xs text-[#5C5C57] mt-1">
              以制版几何与松量数据取代盲目试错 · 个人量体数据仅保存在本地浏览器
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-xs text-[#5C5C57]">
            <a href="#measurement-studio" className="hover:text-[#141413] transition-colors">
              量体档案
            </a>
            <a href="#style-lab" className="hover:text-[#141413] transition-colors">
              尺寸与风格
            </a>
            <a href="#garment-catalog" className="hover:text-[#141413] transition-colors">
              数据选款
            </a>
            <a href="#spec-verifier" className="hover:text-[#141413] transition-colors">
              尺码验算
            </a>
            <button
              type="button"
              onClick={() => setSpecCardOpen(true)}
              className="text-[#1D4ED8] font-medium hover:underline cursor-pointer"
            >
              导出个人尺寸卡
            </button>
          </div>
        </div>
      </footer>

      {/* Personal Buying Specification Card Modal */}
      <SpecCardModal
        isOpen={specCardOpen}
        onClose={() => setSpecCardOpen(false)}
        measurements={measurements}
      />
    </div>
  );
}
