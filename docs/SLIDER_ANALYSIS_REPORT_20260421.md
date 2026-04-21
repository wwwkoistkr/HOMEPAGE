# 🔍 EAL 시뮬레이터 슬라이더 변화율 미반영 문제 — 원인 분석 보고서

> **작성일**: 2026-04-21  
> **대상 시스템**: KOIST 홈페이지 v39.0 ([https://koist-website.pages.dev](https://koist-website.pages.dev))  
> **분석 대상**: Hero 영역 "AI 시뮬레이터 패널"의 사전준비 슬라이더 변화율 (reduction %)  
> **보고서 유형**: 원인 조사 · 구조 분석 (코드 수정 없음)

---

## 1. 문제 요약 (사용자 보고 사항)

> "홈피 사업분야 → **보안기능확인서 시험개요** 페이지에 있는 슬라이더바를,  
> 홈피 관리자모드의 **슬라이더 자료실**에서 각 **EAL등급별 KOIST 소요기간**을 입력했는데  
> **슬라이더의 변화율이 바뀌지 않는다.**"

### 핵심 증상
관리자 모드에서 값을 저장해도 홈페이지 Hero 영역 시뮬레이터의 **단축률(%)**, **막대그래프 길이**, **Badge 수치**가 전혀 변하지 않음.

---

## 2. 결론 (먼저 보는 요약)

| # | 원인 유형 | 심각도 | 설명 |
|---|-----------|--------|------|
| **A** | **용어 혼동에 의한 편집 대상 오인** | 🔴 매우 높음 | 사용자가 "**슬라이더 자료실**"이라고 부르는 위치가 실제로는 별개 메뉴일 가능성 높음. 실제 시뮬레이터 데이터는 **`/admin/sim-cert-types`** (사이드바 메뉴 **"AI 시뮬레이터"**)에서 관리. |
| **B** | **헤더 Badge(%) 숫자가 DB 값으로 강제 고정** | 🔴 높음 | `headerReductionPct` 표시 값이 `unified_reduction_default` 설정(기본 35%)으로 초기 렌더되며, 슬라이더 이동 시에만 JS가 갱신. 페이지 로드 직후에는 DB의 평가기간과 무관하게 **"35%" 고정값**이 표시됨. |
| **C** | **EAL2/3/4 외 인증유형 수정 시 슬라이더에 반영 안 됨** | 🟠 중간 | `ealData`는 `slug`가 `cc-eal2`, `cc-eal3`, `cc-eal4`인 3건만 참조. **보안기능확인서(security-cert), KCMVP, 성능평가(performance)** 의 기간을 수정해도 시뮬레이터 탭이 4개뿐(overall·EAL2·EAL3·EAL4)이어서 절대 반영되지 않음. |
| **D** | **Cloudflare Edge Cache** | 🟡 낮음 | 값을 올바르게 수정했어도 엣지 캐시로 인해 최대 수 초~수 분간 이전 HTML이 반환될 수 있음. |

✅ **가장 유력한 원인은 A + C 조합**입니다. "자료실" 명칭의 메뉴에는 슬라이더 데이터가 들어있지 않으며, 제대로 된 메뉴를 찾아가더라도 **EAL2/3/4 외 항목을 수정해서는 슬라이더 계산식이 변하지 않습니다.**

---

## 3. 시스템 구조 분석

### 3.1 관리자 모드의 메뉴 구성
사이드바 메뉴 정의 파일: `src/templates/admin/index.tsx`

| 사이드바 레이블 | URL | 관리 대상 |
|------------|-----|----------|
| 사이트 설정 | `/admin/site-settings` | `site_settings` 테이블 |
| 홈 콘텐츠 | `/admin/home-content` | 히어로 문구, 패널 타이틀, `unified_reduction_default` 등 |
| 사업분야 관리 | `/admin/departments` | `departments`, `dep_pages` |
| 팝업 | `/admin/popups` | `popups` |
| 공지/FAQ/문의 | `/admin/notices` 등 | `notices` / `faqs` / `inquiries` |
| **평가현황** | `/admin/progress` | `progress_items` (자료실 아님) |
| **자료실** | `/admin/downloads` | `downloads` (파일 업로드/다운로드) |
| **AI 시뮬레이터** ⭐ | **`/admin/sim-cert-types`** | **`sim_cert_types`** ⭐ 실제 슬라이더 데이터 |

### 3.2 "자료실"과 "AI 시뮬레이터" 구분
- **자료실** (`downloads` 테이블): PDF 등 파일 다운로드 게시판. **슬라이더와 무관.**
- **AI 시뮬레이터** (`sim_cert_types` 테이블): Hero 배너의 슬라이더 변화율을 계산하는 **유일한** 데이터 원천.

> 🔑 **사용자가 말한 "슬라이더 자료실"은 실제로는 `/admin/sim-cert-types` (사이드바 "AI 시뮬레이터" 아이콘 🤖)** 입니다.

---

## 4. 슬라이더 변화율 계산 로직 (Data Flow)

### 4.1 전체 흐름도

```
[관리자]                                [서버]                           [브라우저]
──────                                  ─────                            ────────
/admin/sim-cert-types                   GET /api/admin/sim-cert-types
  "KOIST 기간 (주) 최소/최대" 수정   →   PUT /api/admin/sim-cert-types/:id
                                             ↓
                                        sim_cert_types 테이블 UPDATE
                                        (koist_min_weeks / koist_max_weeks)
                                             ↓
                                        다음 페이지 요청 시:
                                        SELECT * FROM sim_cert_types         →  home.tsx 렌더링
                                        WHERE is_active = 1                     ealData 객체 생성
                                             ↓                                  (EAL2/3/4 + overall)
                                                                                    ↓
                                                                             사용자 슬라이더 이동
                                                                             → onPrepChange()
                                                                             → simulate(level, prepVal)
                                                                             → reduction 재계산
                                                                             → DOM 업데이트
```

### 4.2 핵심 계산식 (`src/templates/home.tsx` 라인 1767–1785)

```js
function lerp(min, max, t) { return min + (max - min) * t; }

function simulate(level, prepVal) {
  var d = ealData[level];                         // level: 'overall'|'EAL2'|'EAL3'|'EAL4'
  var t = 1 - (prepVal - 1) / 99;                 // 사전준비도(1~100)를 0~1로 정규화
  var kPrep = Math.round(lerp(d.koist.prepMin, d.koist.prepMax, t));
  var kEval = Math.round(lerp(d.koist.evalMin, d.koist.evalMax, t));
  var g = d.general;
  var gTotal = g.prep + g.eval;
  var kTotal = kPrep + kEval;
  return {
    reduction: gTotal > 0 ? Math.round((1 - kTotal / gTotal) * 100) : 0,
    saving: gTotal - kTotal
    // ...
  };
}
```

- **reduction(%) = 1 − (KOIST 총 기간 ÷ 일반 총 기간) × 100**
- `ealData[level].koist.{prepMin, prepMax, evalMin, evalMax}` 값이 곧 관리자 입력값의 파생물입니다.

### 4.3 `ealData` 생성 로직 (라인 53–106)

```ts
const simTypes = opts.simCertTypes || [];  // DB에서 가져온 sim_cert_types

const eal2Type = simTypes.find(t => t.slug === 'cc-eal2');
const eal3Type = simTypes.find(t => t.slug === 'cc-eal3');
const eal4Type = simTypes.find(t => t.slug === 'cc-eal4');
// ⚠️ 오직 slug='cc-eal2', 'cc-eal3', 'cc-eal4' 3건만 사용

function simTypeToEal(st) {
  const W2M = 4.33;                               // 주→월 환산
  const tradMaxM = Math.round(st.traditional_max_weeks / W2M);
  const koistMinM = Math.round(st.koist_min_weeks / W2M);
  const koistMaxM = Math.round(st.koist_max_weeks / W2M);
  // 🚨 traditional_min_weeks는 **실제로 사용되지 않음**
  const gPrep = Math.round(tradMaxM * 0.55);      // 일반(55%: 준비)
  const gEval = Math.round(tradMaxM * 0.45);      // 일반(45%: 평가)
  const kPrepMin = Math.round(koistMinM * 0.40);  // KOIST (40%: 준비)
  const kEvalMin = Math.round(koistMinM * 0.60);
  const kPrepMax = Math.round(koistMaxM * 0.40);
  const kEvalMax = Math.round(koistMaxM * 0.60);
  return { gPrep, gEval, kPrepMin, kEvalMin, kPrepMax, kEvalMax };
}
```

### 4.4 핵심 관찰
| 관찰 | 의미 |
|------|------|
| `simTypes.find(t => t.slug === 'cc-eal2')` 등 **3개 slug만 지정** | 관리자가 slug='kcmvp' / 'security-cert' / 'performance' 값을 아무리 수정해도 `ealData`에 전혀 들어가지 않음 |
| 계산 시 `traditional_min_weeks` 미사용 | 관리자가 "CCRA 최소 주수" 필드 수정 → 변화율 영향 없음 |
| `koist_min_weeks` × 0.40 → `prepMin` | "KOIST 최소 기간" 편집 시 **사전준비 100% 상태**의 기간만 변화 |
| `koist_max_weeks` × 0.40 → `prepMax` | "KOIST 최대 기간" 편집 시 **사전준비 1% 상태**의 기간만 변화 |
| overall = EAL2+EAL3+EAL4 평균 | EAL2/3/4 셋 모두 수정해야 "전체평균" 탭 수치가 변함 |

---

## 5. 현재 원격 DB 데이터 (프로덕션 실시간)

```sql
SELECT id, name, slug,
       traditional_min_weeks, traditional_max_weeks,
       koist_min_weeks, koist_max_weeks
FROM sim_cert_types ORDER BY sort_order;
```

| id | name | slug | trad_min | trad_max | koist_min | koist_max | 계산되는 reduction(overall 기준) |
|----|------|------|----------|----------|-----------|-----------|-------------------------------|
| 1 | CC평가 (EAL2) | **cc-eal2** ✅ | 20 | 36 | 4 | 16 | 사용됨 |
| 2 | CC평가 (EAL3) | **cc-eal3** ✅ | 28 | 48 | 4 | 20 | 사용됨 |
| 3 | CC평가 (EAL4) | **cc-eal4** ✅ | 36 | 64 | 4 | 20 | 사용됨 |
| 4 | KCMVP | `kcmvp` ❌ | 14 | 28 | 8 | 16 | **무시됨** |
| 5 | 보안기능확인서 | `security-cert` ❌ | 8 | 16 | 4 | 10 | **무시됨** |
| 6 | 성능평가 | `performance` ❌ | 8 | 20 | 4 | 12 | **무시됨** |

### 검증 계산 (예: EAL2 탭, 슬라이더=50 기준)
- tradMax = 36주 → 약 8개월 (tradMaxM = 8)
  - gPrep = 8 × 0.55 = **4개월** / gEval = 8 × 0.45 = **4개월** → 일반 총 **8개월**
- koistMin = 4주 → 1개월 / koistMax = 16주 → 4개월
  - t = 1 − (50−1)/99 ≈ 0.505
  - kPrep = lerp(1×0.40, 4×0.40, 0.505) = lerp(0.4, 1.6, 0.505) ≈ **1개월**
  - kEval = lerp(1×0.60, 4×0.60, 0.505) = lerp(0.6, 2.4, 0.505) ≈ **1.5개월**
  - kTotal ≈ **2.5개월**
- **reduction ≈ 1 − 2.5/8 ≈ 69%**

> 📌 **EAL2의 `koist_min_weeks`/`koist_max_weeks`를 바꾸면 이 계산 결과는 반드시 바뀝니다.**  
> 만약 바뀌지 않는다면 (A) 다른 항목을 수정했거나, (D) 캐시 문제입니다.

---

## 6. 원인 상세 분석

### 6.1 원인 A — 편집 대상 메뉴 오인 (가장 유력)

**사용자가 "슬라이더 자료실" 이라고 부른 경로**가 실제로는 다음 세 곳 중 하나일 가능성이 큽니다:

| 경로 | 테이블 | 슬라이더 계산에 영향? |
|------|--------|-----------------------|
| `/admin/downloads` (자료실) | `downloads` | ❌ 전혀 없음 (파일 게시판) |
| `/admin/progress` (평가현황) | `progress_items` | ❌ 전혀 없음 (현황 게시판) |
| `/admin/site-settings` (사이트 설정) | `site_settings` (`eval_*_koist_prep_*` 키) | ⚠️ 조건부 폴백 (아래 참고) |
| **`/admin/sim-cert-types` (AI 시뮬레이터)** ⭐ | **`sim_cert_types`** | **✅ 여기서만 반영됨** |

#### 6.1.1 `site_settings`의 폴백 키 (눈여겨볼 점)

`src/templates/home.tsx` 라인 83–90 에는 다음 폴백 코드가 있습니다:

```ts
// sim_cert_types에 slug(cc-eal2/3/4)가 없을 경우에만 실행됨
const gp = s[`eval_${prefix}_general_prep`] || '12';
const kph = s[`eval_${prefix}_koist_prep_high`] || '4';
const kpl = s[`eval_${prefix}_koist_prep_low`] || '9';
...
```

**관리자 UI 어디에서도 `eval_eal2_koist_prep_high` 같은 키를 입력할 화면이 존재하지 않습니다.**  
(`src/templates/admin/home-content.tsx`, `admin-site-settings.js` 모두 미제공)  
즉, `site_settings` 테이블에 해당 키가 **없기 때문에**, 결국 하드코딩된 기본값(4, 9, 7, 11 등)이 쓰이거나 `sim_cert_types` 값이 사용됩니다.  
현재 `cc-eal2/3/4` 세 행이 모두 DB에 존재하므로 **폴백은 실질적으로 동작하지 않고 항상 `sim_cert_types` 값이 사용됩니다.**

---

### 6.2 원인 B — 헤더 Badge(%) 초기값 고정

`home.tsx` 라인 591:
```html
<span id="headerReductionPct" data-admin-edit="unified_reduction_default">${defaultReduction}%</span>
```
`defaultReduction = s.unified_reduction_default || '35'` (라인 122)

- 즉, 페이지 로드 시 **Badge 숫자는 DB의 `unified_reduction_default` 값**을 그대로 표시합니다.
- 슬라이더를 이동해야 비로소 `updateChart()` → `hdrPct.textContent = d.reduction + '%'` (라인 1833–1834)로 실제 계산값이 표시됩니다.

👉 **"관리자에서 KOIST 기간을 바꿨는데 헤더 % 숫자가 안 변해요"** 라는 증상이라면, **초기 렌더에서는 `unified_reduction_default` 고정값이 표시**되기 때문입니다.  
이를 해소하려면 아래 둘 중 하나:
1. 관리자 `/admin/home-content`에서 `unified_reduction_default` 값을 수동으로 조정
2. 페이지 로드 후 슬라이더를 1번 움직이면 실제 계산값이 표시됨

---

### 6.3 원인 C — EAL2/3/4 외 인증유형은 슬라이더와 무관

- 시뮬레이터 탭은 **`overall`, `EAL2`, `EAL3`, `EAL4`** 4개뿐입니다 (home.tsx 라인 600–603).
- `simTypes.find(t => t.slug === 'cc-eal2' | 'cc-eal3' | 'cc-eal4')` 3건만 참조.
- 따라서 관리자가 **KCMVP / 보안기능확인서 / 성능평가** 3개 항목의 `koist_min_weeks`, `koist_max_weeks` 를 수정해도 **Hero 슬라이더 변화율은 절대 바뀌지 않습니다.**
- 이 3개 항목은 현재 홈페이지 어디에도 "소요기간 슬라이더 계산"에는 쓰이지 않고, DB에만 존재하는 "휴면 데이터" 상태입니다.

---

### 6.4 원인 D — Cloudflare Edge Cache

- 배포 후 `https://koist-website.pages.dev`의 HTML은 Cloudflare 엣지에 캐시됩니다.
- `/support/progress` XSS 테스트 시 이미 한 차례 겪었던 증상으로, **저장 후 몇 초~수 분 간 이전 응답이 표시**될 수 있습니다.
- 해결: URL에 `?v=타임스탬프` 파라미터를 붙여 Force-refresh.

---

## 7. 재현 시나리오 (권장 검증 절차)

### 시나리오 A — 정상 동작 확인 (EAL2 수정)
1. `/admin/sim-cert-types` 접속
2. **CC평가 (EAL2)** 행의 `[수정]` 클릭
3. **KOIST 기간(주)** → "최대(사전준비 1%)" 값을 `16` → `40`으로 변경, 저장
4. 홈페이지에 다시 접속 → `?v=2` 파라미터로 캐시 우회  
   `https://koist-website.pages.dev/?v=2`
5. 시뮬레이터 탭 **[EAL2]** 클릭 → 슬라이더를 1 쪽으로 이동
6. 우측 Badge의 % 수치가 이전보다 **감소**해야 함 (KOIST 기간이 길어졌으므로 단축률↓)

### 시나리오 B — 버그 재현 (KCMVP 수정)
1. `/admin/sim-cert-types` 접속
2. **KCMVP** 행의 `[수정]` 클릭
3. KOIST 기간(주)을 아무리 크게 바꾸어도 저장
4. 홈페이지의 시뮬레이터 → **절대 변하지 않음** (탭에 KCMVP가 없음 + 코드가 cc-eal* 만 참조)

### 시나리오 C — 헤더 % 초기값 고정 재현
1. `/admin/home-content` → "기본 단축률" 필드를 `35` → `50`으로 변경, 저장
2. 홈페이지 `?v=3`으로 접속 → 헤더 Badge가 **"50%"** 로 표시됨 (실제 계산과 무관하게 고정 표시)
3. 슬라이더를 1회 이동 → 비로소 실제 계산값으로 갱신됨

---

## 8. 권장 조치 (요약, 코드 수정은 별도 요청 시 진행)

| 우선순위 | 조치 | 성격 | 예상 난이도 |
|--------|------|------|-----------|
| 🔴 즉시 | **관리자에게 "AI 시뮬레이터" (`/admin/sim-cert-types`) 메뉴가 슬라이더 원천임을 문서화** | 운영 가이드 | 낮음 |
| 🔴 즉시 | 수정 후 홈페이지 URL에 `?v=타임스탬프` 추가해 엣지 캐시 우회 확인 | 운영 가이드 | 낮음 |
| 🟠 단기 | **Hero Badge(%) 초기값을 서버 사이드에서 계산하도록 로직 변경** (페이지 로드 즉시 실제 값 표시) | 코드 수정 | 중간 |
| 🟠 단기 | KCMVP / 보안기능확인서 / 성능평가 항목을 **시뮬레이터 탭에 추가**하거나 또는 **관리자 UI에서 "슬라이더 비활성"으로 표시** | 코드 수정 | 중간 |
| 🟡 중기 | `/admin/sim-cert-types` UI에 **"이 항목이 홈 슬라이더에 반영됨" 배지** 추가 (cc-eal2/3/4 행에만) | UX 개선 | 낮음 |
| 🟡 중기 | 관리자가 값을 저장하면 **해당 페이지의 Cloudflare 캐시를 purge** 하는 기능 추가 | 코드 수정 | 중간 |

---

## 9. 관련 파일 목록 (참조용)

| 역할 | 파일 경로 | 주요 라인 |
|------|-----------|---------|
| 슬라이더 HTML/JS | `src/templates/home.tsx` | 53–106, 586–628, 1756–1884 |
| 시뮬레이터 탭 | `src/templates/home.tsx` | 600–603 |
| `sim_cert_types` CRUD API | `src/routes/admin.ts` | 320–349 |
| 관리자 UI 폼 | `public/static/js/admin-sim-cert-types.js` | 117–142, 195–219 |
| 홈 데이터 SELECT | `src/index.tsx` | 124 |
| DB 스키마 & 초기값 | `migrations/0006_simulator_cert_types.sql` | 4–31 |
| 홈 콘텐츠(단축률) | `src/templates/admin/home-content.tsx` | 199, 203 |

---

## 10. 종합 결론

1. **시뮬레이터 슬라이더의 변화율은 오직 `sim_cert_types` 테이블의 `cc-eal2/3/4` 3건의 `koist_min_weeks` / `koist_max_weeks` 값에 의해 결정됩니다.**
2. **"자료실" 또는 "평가현황"** 메뉴에서 아무리 값을 수정해도 슬라이더는 영향받지 않습니다.
3. **KCMVP / 보안기능확인서 / 성능평가** 항목은 DB에는 존재하지만 **현재 UI 어디에도 연결되어 있지 않은 휴면 데이터**입니다.
4. 수정 대상 메뉴를 제대로 찾았다면(즉 `/admin/sim-cert-types` → CC평가(EAL2/3/4) 편집), 다음 두 가지를 추가로 고려해야 합니다:
   - **헤더 Badge(%)의 초기값은 DB `unified_reduction_default` 고정값**이 표시되므로 슬라이더를 움직이지 않는 한 변화가 보이지 않음
   - **Cloudflare Edge Cache** 때문에 저장 직후 수 초간 이전 HTML이 반환될 수 있음 (`?v=...` 파라미터로 우회 가능)

> 👉 **별도 요청이 있을 경우, 위 8번 "권장 조치"의 단기/중기 항목을 순차 반영하는 코드 패치(v39.1)를 진행할 수 있습니다.**

---

**보고서 끝.** 🔍
