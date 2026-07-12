# PROJECT_CONTEXT.md — 집밥연구소 (zipbabstudio) 프로젝트 인수인계 문서

> 이 문서는 실제 저장소 파일(HTML/CSS/JS/JSON), git 커밋 이력(36개, 2026-01 초기 커밋 ~ 2026-07-11 최신), `CLAUDE.md`, 스케줄 자동화 작업(SKILL.md) 등을 직접 읽고 분석해 작성했습니다. 추측이나 일반론이 아니라 현재 코드/데이터 상태를 기준으로 합니다. 작성 시점: 2026-07-11.

---

# 프로젝트 개요

## 프로젝트 목적
**집밥연구소(www.zipbabstudio.com)**는 요리 초보자와 집밥을 즐기는 사람들을 위한 **요리 정보 브랜드 사이트**입니다. 개인 블로그가 아니라 "워드프레스 느낌의 CMS-lite 관리자 모드를 갖춘 정보형 미디어"를 표방합니다. 최종 목표는 **Google AdSense를 통한 광고 수익화**이며, 2026-07-06에 애드센스 신청을 완료하고 현재 심사 대기 중입니다.

핵심 원칙(`CLAUDE.md`에 명시, 반드시 준수):
- YMYL 주제(건강/금융/투자/대출/세금/법률) 절대 금지 — 요리 정보로 한정
- 가짜 후기·가짜 수치·허위 경험담·키워드 스팸 금지, lorem ipsum 등 더미 텍스트 금지
- 과장/낚시 표현("완벽 정리", "무조건", "100%", "충격" 등) 금지
- 연락 수단은 이메일(`hyosub19@naver.com`)만, 허위 회사 주소·전화번호 금지
- 관리자 모드는 실제 보안 인증이 아님을 화면에 명확히 고지

> ⚠️ **중요한 불일치 사항**: `CLAUDE.md`에는 "광고 코드 삽입 금지"라는 원칙이 명시되어 있지만, 실제로는 사용자의 명시적 요청(2026-07-11 이전 세션)에 따라 전 페이지에 Google AdSense 스크립트가 삽입되어 있습니다(`admin/index.html` 제외). 이는 CLAUDE.md 작성 이후 상황이 바뀐 것으로, **CLAUDE.md의 해당 항목이 갱신되지 않은 상태**입니다. 향후 CLAUDE.md를 근거로 "광고 코드를 지워야 한다"고 판단하지 마세요 — 이는 사용자가 의도적으로 승인한 최신 상태입니다. (자세한 내용은 "개발하면서 변경했던 사항" 섹션 참고)

## 전체 구조
빌드 도구가 전혀 없는 **순수 정적 사이트**(HTML/CSS/Vanilla JS)입니다. React/Vue 등 프레임워크, 번들러, 패키지 매니저(`package.json` 없음)를 전혀 사용하지 않습니다. GitHub Pages에 정적 파일을 그대로 배포하는 구조입니다.

- **콘텐츠 메타데이터**: `data/*.js`가 `window.SITE_CONFIG`, `window.CATEGORIES`, `window.POSTS`, `window.COLUMNS` 전역 변수를 정의 → 목록형 페이지(홈/카테고리/칼럼 목록)가 이를 읽어 카드 UI를 런타임에 렌더링
- **본문 콘텐츠**: 각 글/칼럼의 실제 본문은 `posts/<slug>/index.html`, `columns/<slug>/index.html`에 **정적 HTML로 직접 작성**(템플릿 엔진 없음). SEO/크롤러 신뢰성을 위한 의도적 설계
- **관리자 모드**: `admin/index.html` + `assets/js/admin.js`가 localStorage 기반 CMS-lite 데모(실제 DB/인증 없음)
- **자동 발행 파이프라인**: 이 저장소 밖(`C:\Users\김나은\.claude\scheduled-tasks\`)에 저장된 Claude Code 스케줄 작업 4개가 매일 새 글 2개·칼럼 1개를 자동 생성해 이 저장소에 git commit/push

## 사용 기술
| 영역 | 기술 |
|---|---|
| 마크업/스타일 | 순수 HTML5, CSS3 (커스텀 프로퍼티 기반 디자인 시스템, `prefers-color-scheme: dark` 다크모드, `prefers-reduced-motion` 접근성 대응) |
| 스크립트 | Vanilla JavaScript (ES5 스타일 IIFE, 프레임워크 없음) |
| 배포 | GitHub Pages + GitHub Actions (`.github/workflows/deploy.yml`) |
| 도메인/DNS | Gabia 등록, 커스텀 도메인 `www.zipbabstudio.com` (`CNAME` 파일) |
| SEO | JSON-LD(Article/BreadcrumbList/FAQPage/WebSite), `sitemap.xml`, `robots.txt`, `rss.xml`(RSS 2.0), Google Search Console(도메인 속성), 네이버 서치어드바이저(`naver-site-verification` 메타 태그) |
| 광고 | Google AdSense (`ca-pub-8436574422662926`), `ads.txt` |
| 자동화 | Claude Code 스케줄 작업(cron 기반), `automation/topic-queue.json` + `automation/weekly-log.json` |

## 개발 환경
- OS: Windows 11, 로컬 경로 `D:\blog`
- 셸: PowerShell(주 사용) / Git Bash(Bash 도구)
- 에디터/에이전트: Claude Code CLI (이 프로젝트의 거의 모든 코드가 Claude Code를 통해 생성·자동화됨)
- 로컬 미리보기: 빌드 과정이 없으므로 `python -m http.server 8000` 또는 `npx serve .` 로 충분
- 버전관리: Git, GitHub 저장소 `kimhyosub/zipbabstudio`, 브랜치는 `main` 단일 (feature 브랜치 없음)

---

# 현재까지 구현된 기능

## 완료된 기능
- 홈페이지(히어로, 대표 카테고리 5개, 최신 글 4개, 추천 글, 운영 목적, 편집 원칙, 운영자 미니 박스, 칼럼 미리보기, 문의 CTA)
- 카테고리 목록(`/categories/`) + 상세 페이지 5개(밑반찬·저장음식 / 한그릇 요리·집밥 메뉴 / 자취요리·초보 입문 / 요리 도구·주방 관리 / 식재료 활용·보관법), 각각 카테고리 대표 이미지 포함
- 글 상세 페이지 **39개** (모두 목차, 문제 제기→핵심 설명→실제 팁→주의사항→정리 구조, 핵심 요약 박스, 초보자 실수 포인트, 체크리스트, 편집자 박스, 관련 글 링크 포함. 상당수는 FAQ + FAQPage JSON-LD 포함)
- 칼럼 목록(`/columns/`) + 상세 페이지 **11개** (운영자 관점 글, badge-column 배지로 시각적 구분)
- 신뢰 페이지 8종: `about`, `author`(운영자 소개+칼럼 허브+관리자 세션 분기), `contact`(이메일 안내 + 데모 문의 폼), `privacy`(AdSense 쿠키 고지 포함), `terms`, `disclaimer`, `sitemap`(HTML 사이트맵), `404`
- 관리자 모드(`/admin/`): 데모 로그인(비밀번호 `demo1234` 또는 데모 로그인 버튼) → 대시보드(글/칼럼/카테고리 수, 발행/초안 통계, 최근 수정 목록) → 글 관리(목록/작성/수정/삭제/미리보기) → 칼럼 관리(동일 구조, 시각적 구분) → 카테고리 관리(이름/설명 수정) → 사이트 설정(사이트명/색상/이메일 등) → JSON export/import/초기화. 전부 `localStorage` 기반이며 실제 배포 파일에는 반영되지 않음(화면에 명시)
- 운영자명 클릭 흐름: 전 사이트의 "한끼연구원" 링크 → `/author/` → 비로그인 시 칼럼 안내, 관리자 세션(localStorage 플래그) 있을 시 "새 칼럼 작성하기" 버튼 → `/admin/#columns/new`
- 다크모드(`prefers-color-scheme: dark`) + 카드 등장 애니메이션(`prefers-reduced-motion` 대응 포함)
- `<article>` 시맨틱 태그로 본문 래핑, 인라인 스타일을 유틸리티 클래스(`.hero-compact`, `.section-flush-top`, `.section-body-narrow`)로 일부 교체
- GitHub Actions 자동 배포, 커스텀 도메인 연결, Google Search Console + 네이버 서치어드바이저 등록/사이트맵 제출
- RSS 2.0 피드(`rss.xml`, 최대 30개 항목, autodiscovery 태그)
- Google AdSense 스크립트(전 공개 페이지) + `ads.txt` + 개인정보처리방침 쿠키 고지 → **2026-07-06 애드센스 신청 완료**
- 자동 발행 파이프라인: 사전 검증된 주제 큐(`automation/topic-queue.json`, 카테고리 로테이션) 기반으로 매일 06:30/12:30 글, 18:30 칼럼 자동 작성+배포, 매주 일요일 20:00 발행 현황 요약 보고 + 큐 자동 보충

## 진행 중인 기능
- **자동 발행 파이프라인의 무인 실행 안정화**: 스케줄 작업이 실행될 때마다 Claude Code의 권한 승인 팝업(Bash/Write/Edit/Monitor 도구)이 반복적으로 발생해 트러블슈팅이 계속 진행 중입니다. 지금까지 발견/수정한 패턴:
  - `cd 경로 && 명령 > 파일` 형태의 압축 명령 → 프롬프트에서 금지 지침 추가
  - 새 파일 생성(`Write`) 시 매번 뜨는 프롬프트 → `settings.local.json`에 `Write(D:/blog/posts/**)`, `Write(D:/blog/columns/**)` 와일드카드 추가로 해결
  - 기존 파일 수정(`Edit`) 시 프롬프트(주로 스마트머니 가이드 쪽) → `Edit(D:/smartmoney-guide/**)` 추가로 해결 시도(다음 실행에서 검증 필요)
  - XML/JSON 검증에 PowerShell try/catch 스크립트 블록 사용 → "항상 허용" 옵션 자체가 없는 패턴이라 매번 재승인 필요 → `python -c` 한 줄 명령으로 대체하도록 8개 스케줄 프롬프트 전부 수정
  - 다른 스케줄 작업과의 git 충돌을 우려해 Monitor 도구 + `$(...)` 쉘 치환으로 동시 실행 대기 → 정적 분석 불가라 항상 재승인 필요 → 해당 패턴 자체를 만들지 말라고 8개 프롬프트에 명시, 충돌 시 `git pull --rebase` 후 재시도로 단순화
  - Bash에 Windows 백슬래시 경로(`D:\smartmoney-guide\columns\`)를 넘겨 파싱 오류 발생 → 항상 슬래시(`/`) 경로를 쓰도록 8개 프롬프트에 명시
  - **이 트러블슈팅은 완료되지 않았습니다.** 다음 스케줄 실행(오늘 12:30/18:30, 내일 06:30 등)에서 실제로 프롬프트 없이 통과되는지 확인이 필요합니다.

## 미완성 기능 (의도적 미구현 — 버그 아님)
- 실제 백엔드/데이터베이스 없음(정적 사이트 설계 의도). 관리자 모드 편집 내용은 브라우저 localStorage에만 저장되고 실제 배포 파일에는 반영되지 않음 — README/CLAUDE.md에도 명시된 의도된 한계
- 문의 폼은 실제 전송 기능 없음(데모 UI, 이메일 안내만 제공)
- 관리자 로그인은 실제 서버 인증이 아닌 localStorage 플래그 데모
- Google Analytics 등 별도 분석 도구 미연동(privacy 정책에도 "그 외 별도의 분석 도구는 사용하고 있지 않습니다"라고 명시)

---

# 디렉토리 구조

```
D:\blog\
├─ index.html                        홈페이지 (히어로/카테고리/최신글/추천글/운영목적/칼럼 미리보기)
├─ 404.html                          404 페이지 (noindex)
├─ robots.txt                        /admin/ 차단, sitemap.xml 위치 명시
├─ sitemap.xml                       전체 URL 목록 (posts/columns 포함, 자동화가 계속 추가)
├─ rss.xml                           RSS 2.0 피드 (최대 30개 항목, 자동화가 매일 갱신)
├─ ads.txt                           Google AdSense 검증 파일
├─ CNAME                             GitHub Pages 커스텀 도메인 (www.zipbabstudio.com)
├─ .nojekyll                         GitHub Pages가 Jekyll 처리를 하지 않도록 지정
├─ CLAUDE.md                         프로젝트 스펙/원칙 (Claude Code가 매 작업의 근거로 읽음)
├─ README.md                         실행 방법, 폴더 구조, 수정 위치 안내 (사람 대상)
├─ PROJECT_CONTEXT.md                (이 문서) 인수인계용 종합 문서
│
├─ about/index.html                  사이트 소개 (운영 목적/다루는 주제/편집 원칙)
├─ author/index.html                 운영자 소개 + 칼럼 허브 + 관리자 세션 분기 UI
├─ contact/index.html                문의하기 (이메일 안내 + 데모 폼, 실전송 없음)
├─ privacy/index.html                개인정보처리방침 (AdSense 쿠키 고지 포함)
├─ terms/index.html                  이용약관
├─ disclaimer/index.html             면책고지 (조리 결과 책임 한계 등)
├─ sitemap/index.html                사람이 읽는 HTML 사이트맵
│
├─ categories/
│  ├─ index.html                     카테고리 목록
│  ├─ banchan/index.html             밑반찬·저장음식 (글 8개)
│  ├─ one-dish/index.html            한그릇 요리·집밥 메뉴 (글 8개)
│  ├─ beginner/index.html            자취요리·초보 입문 (글 8개)
│  ├─ kitchen-tools/index.html       요리 도구·주방 관리 (글 7개)
│  └─ ingredients/index.html         식재료 활용·보관법 (글 8개)
│
├─ posts/<slug>/index.html × 39      글 상세 (본문 정적 HTML, 카테고리당 7~8개)
├─ columns/
│  ├─ index.html                     칼럼 목록
│  └─ <slug>/index.html × 11         칼럼 상세 (운영자 관점 글)
│
├─ admin/index.html                  관리자 모드 SPA (해시 라우팅, noindex/nofollow)
│
├─ assets/
│  ├─ css/style.css                  전체 디자인 시스템 (960줄, 상세는 "핵심 로직 분석" 참고)
│  ├─ js/main.js                     공통 헤더/푸터/내비/카드 렌더링 (212줄)
│  ├─ js/auth.js                     관리자 세션 감지 데모 (32줄)
│  ├─ js/admin.js                    관리자 CRUD/라우팅/데이터 관리 로직 (617줄)
│  ├─ icons/favicon.svg
│  └─ images/categories/*.jpg        카테고리당 대표 이미지 5장 (Pexels 무료 이미지)
│
├─ data/
│  ├─ site.config.js                 사이트명/색상/이메일/운영자 정보/nav/footer 링크 (전역 설정 단일 출처)
│  ├─ categories.js                  카테고리 5개 메타데이터
│  ├─ posts.js                       글 39개 메타데이터 (slug/title/summary/category/날짜/featured/hasFaq/related)
│  └─ columns.js                     칼럼 11개 메타데이터
│
├─ automation/
│  ├─ topic-queue.json               자동 발행용 사전 검증 주제 큐 (postQueue 60개, columnQueue 20개, 카테고리 로테이션 상태)
│  └─ weekly-log.json                주간 발행 로그 누적 (일요일 요약 후 초기화됨)
│
├─ .github/workflows/deploy.yml      GitHub Pages 배포 워크플로우 (push to main → 자동 배포)
└─ .claude/
   ├─ launch.json                    Claude Code 미리보기용 dev 서버 설정
   └─ settings.local.json            로컬 전용 권한 허용목록 (135개 항목, .gitignore 처리되어 커밋 안 됨)
```

**저장소 밖에 있는 중요 파일** (git으로 추적되지 않으므로 인수인계 시 별도 전달 필요):
```
C:\Users\김나은\.claude\scheduled-tasks\
├─ post-publish-morning\SKILL.md       매일 06:33경 새 글 1개 자동 작성·배포
├─ post-publish-afternoon\SKILL.md     매일 12:30경 새 글 1개 자동 작성·배포
├─ column-publish-evening\SKILL.md     매일 18:30경 새 칼럼 1개 자동 작성·배포
└─ weekly-publish-summary\SKILL.md     매주 일요일 20:00경 발행 현황 요약 + 큐 보충
```
(참고: 같은 사용자가 유사 구조의 "스마트머니 가이드"(`D:\smartmoney-guide`, 별도 GitHub 저장소 `kimhyosub/money-zipbabstudio`) 사이트도 동일한 패턴으로 자동 운영 중이며, 스케줄 작업 4개가 `smg-` 접두사로 같은 디렉터리에 공존합니다. **이 프로젝트와는 별개의 저장소이므로 혼동하지 마세요.**)

---

# 핵심 로직 분석

이 프로젝트는 클래스/API/DB가 없는 정적 사이트이므로, 이 섹션은 **핵심 JS 모듈의 함수**와 **데이터 흐름**을 분석합니다.

## `assets/js/main.js` (공통 렌더링, 212줄)
IIFE로 감싼 전역 `window.HCL` 네임스페이스 정의.
- `renderHeader()` / `renderFooter()`: `window.SITE_CONFIG.nav` / `footerLinks`를 읽어 `#site-header` / `#site-footer` DOM에 헤더·푸터 HTML을 주입. `DOMContentLoaded` 시 자동 호출됨 — **모든 페이지가 이 두 함수에 의존**하므로 `site.config.js` 스크립트 태그가 `main.js`보다 먼저 로드되어야 함.
- `isCurrent(href)`: 현재 경로와 nav 링크를 비교해 `aria-current="page"` 부여
- `HCL.formatDate(isoDate)`: `"2026-07-11"` → `"2026년 7월 11일"` 변환
- `HCL.categoryName(slug)`: `window.CATEGORIES` 배열에서 slug로 카테고리 이름 조회
- `HCL.renderPostCards(containerId, posts)` / `HCL.renderColumnCards(containerId, columns)`: 글/칼럼 배열을 카드 HTML 문자열로 변환해 지정 컨테이너에 주입. 홈/카테고리/칼럼 목록/author 페이지가 모두 이 두 함수를 공용으로 사용 — **카드 UI를 바꾸려면 이 두 함수만 수정하면 전 사이트에 반영됨**.

## `assets/js/auth.js` (관리자 세션 감지, 32줄)
`window.HCL_AUTH` 객체, `localStorage` 키 `"hcl_admin_session"` 하나로 로그인 여부만 판단하는 데모 로직.
- `isAdminLoggedIn()`: `localStorage.getItem(SESSION_KEY) === "1"` 여부만 확인 — 서버 검증 없음
- `login()` / `logout()`: 플래그를 `"1"`로 설정/제거
- `author/index.html`이 이 함수로 관리자 세션 여부를 판단해 "새 칼럼 작성하기" 버튼 노출을 분기

## `assets/js/admin.js` (관리자 CMS-lite, 617줄)
단일 IIFE, 데이터 계층/라우팅/렌더링이 분리되지 않은 구조(소규모 데모라 문제는 아니나 리팩토링 포인트에 기재).
- **데이터 계층**: `KEYS` 객체(`hcl_admin_posts`, `hcl_admin_columns`, `hcl_admin_categories`, `hcl_admin_settings`)로 4개의 localStorage 키 관리. `readJSON`/`writeJSON` 헬퍼로 직렬화.
- **시드 로직**: `seedIfEmpty()` — localStorage가 비어있으면 `window.POSTS`/`COLUMNS`/`CATEGORIES`/`SITE_CONFIG`(즉 `data/*.js`)의 값을 최초 1회 복사해 localStorage 초기값으로 사용. **주의**: 이후 `data/*.js`가 git으로 갱신돼도(자동 발행 등) 이미 시드된 localStorage는 자동 갱신되지 않음 — "기본 데이터로 초기화" 버튼을 눌러야 재시드됨.
- **해시 라우팅**: `currentRoute()`가 `location.hash`(`#dashboard`, `#posts`, `#posts/new`, `#posts/edit/<slug>`, `#columns`, `#columns/new`, `#columns/edit/<slug>`, `#categories`, `#settings`)를 파싱, `route()`가 해당 뷰를 표시. `window.addEventListener("hashchange", route)`로 뒤로가기/새로고침 대응.
- **CRUD**: `renderPostsTable`/`renderColumnsTable`(목록+수정/삭제 버튼), `loadPostForm`/`savePost`, `loadColumnForm`/`saveColumn`(신규는 push, 수정은 slug 매칭 후 map으로 교체), `renderCategories`(이름/설명만 수정 가능, slug는 고정)
- **FAQ 파싱**: `parseFaq(text)` — `Q: ...` / `A: ...` 줄바꿈 텍스트를 정규식으로 파싱해 `{q, a}` 배열 생성 (실제 배포 페이지의 FAQ와는 별개로, 미리보기 전용)
- **데이터 관리**: `exportBtn`(JSON Blob 다운로드), `importBtn`+`importFile`(JSON 업로드 후 4개 키 덮어쓰기), `resetBtn`(전체 삭제 후 재시드)
- **핵심 제약**: 이 모듈이 다루는 모든 데이터는 **브라우저 localStorage 안에서만** 존재합니다. 저장 버튼을 눌러도 `data/posts.js` 등 실제 파일은 전혀 수정되지 않습니다(각 저장 함수의 `alert()` 메시지에도 명시). 실제 콘텐츠 반영은 이 모듈이 아니라 **자동 발행 파이프라인** 또는 사람이 직접 `data/*.js` + `posts/<slug>/index.html`을 편집하는 방식으로만 이루어집니다.

## "DB" / API / 데이터 흐름
- **데이터베이스 없음.** 유일한 "영속 저장소"는 git 저장소 자체(HTML/JS/JSON 파일)와, 관리자 데모용 브라우저 `localStorage`(둘은 서로 무관).
- **외부 API 호출 없음.** `fetch`/XHR을 사용하는 코드가 존재하지 않음(README에도 명시). 완전한 정적 페이지.
- **콘텐츠 데이터 흐름**:
  1. 신규 글/칼럼은 `data/posts.js` / `data/columns.js`에 메타데이터 객체로 추가되고, 동시에 `posts/<slug>/index.html` / `columns/<slug>/index.html`에 본문이 직접 작성됨(둘 다 수동 동기화 — 자동 검증 로직 없음, 사람 또는 자동화 프롬프트가 규칙을 따라야 함)
  2. 목록 페이지(홈/카테고리/칼럼 목록/author)는 로드 시 `<script src="/data/posts.js">` 등으로 전역 배열을 읽어 `HCL.renderPostCards`/`renderColumnCards`로 카드를 그림
  3. `sitemap.xml` / `rss.xml`은 이 메타데이터와 별개로 **수동(또는 자동화 프롬프트가) 직접 XML을 갱신**해야 함 — `data/posts.js`에 글을 추가한다고 sitemap/rss가 자동으로 갱신되지 않음(빌드 스텝이 없으므로)
- **자동 발행 파이프라인 데이터 흐름**: `automation/topic-queue.json`의 `rotation.lastCategoryIndex`로 카테고리 순환 위치 추적 → `postQueue`/`columnQueue`에서 `status: "pending"` 항목을 순서대로 소비 → 작성 완료 시 `status: "published"` + `slug`/`publishedAt` 기록 → 동시에 `automation/weekly-log.json`의 `entries` 배열에 발행 이력 누적 → 매주 일요일 요약 보고 후 `entries`를 빈 배열로 초기화, 큐가 카테고리당 5개 이하로 줄면 6~8개씩 자동 보충.

---

# 개발하면서 변경했던 사항

| 변경 사항 | 기존 방식 | 변경 이유 | 최종 적용 방식 |
|---|---|---|---|
| 도메인 | (가칭 homecooklab.com 등 초기 논의) | 사용자가 실제 소유한 도메인으로 확정 | `www.zipbabstudio.com`, `CNAME` 파일 + Gabia DNS(CNAME 끝에 점 필요, A레코드 호스트 `@` 필요) |
| 다크모드 CSS 위치 | `style.css` 파일 중간에 `@media (prefers-color-scheme: dark)` 블록 배치 | 이후 선언된 동일 specificity 규칙(`.mistake-box` 등)에 소스 순서상 덮어써져 다크모드가 적용되지 않는 버그 발생 | 다크모드 블록을 **파일 맨 끝**으로 이동해 해결 (현재 960번째 줄) |
| 반복 인라인 스타일 | 여러 페이지에 `style="padding-top:32px"` 등 인라인 스타일 반복 | 유지보수성 저하 | `.hero-compact`, `.section-flush-top`, `.section-body-narrow` 등 유틸리티 클래스로 교체(단, 일부 페이지에는 여전히 인라인 style 잔존 — 리팩토링 포인트 참고) |
| 신뢰 페이지 스크립트 | privacy/terms 등에도 불필요한 스크립트 로드 | 사용하지 않는 데이터 스크립트 로드로 인한 낭비 | 실제로 필요한 페이지에서만 `data/*.js` 로드하도록 정리 |
| 글/칼럼 본문 마크업 | `<div>` 위주 구조 | 접근성/시맨틱 개선 요청 | 본문을 `<article>` 태그로 래핑 |
| Bash 명령 패턴(자동화) | `cd 경로 && 명령어 > 파일` 압축 명령 사용 | Claude Code가 "cd + 출력 리다이렉션"을 **설계상 항상 재승인이 필요한 위험 패턴**으로 취급해 무인 실행이 멈춤 | 절대경로 직접 전달(`cd` 없이), `git -C` 옵션 사용, 파일 입출력은 Read/Write/Edit 도구 우선 사용하도록 스케줄 프롬프트에 명시 |
| XML/JSON 검증 방식(자동화) | PowerShell `try {...} catch {...}` 스크립트 블록으로 유효성 검사 | 이런 스크립트 블록도 "정적 분석 불가"로 항상 재승인 필요 | `python -c "import xml.dom.minidom as m; m.parse(...); print('OK')"` 같은 단순 한 줄 명령으로 대체 (이미 `settings.local.json`에 `python *` 와일드카드 허용이 있어 재승인 불필요) |
| 동시 실행 처리(자동화) | Monitor 도구 + `$(git log ...)` 같은 쉘 명령어 치환으로 다른 스케줄 작업 완료를 대기 | 쉘 치환이 포함된 명령은 정적 분석 불가로 매번 재승인 필요 | 이런 대기/폴링 로직 자체를 만들지 않도록 지침 추가. 작업 간 실행 간격이 몇 시간이라 실제 동시성 위험이 낮다고 판단, 충돌 시 `git pull --rebase` 후 재시도로 단순화 |
| Bash 경로 표기(자동화) | Windows 스타일 백슬래시 경로(`D:\smartmoney-guide\columns\`)를 Bash 명령 인자로 전달 | bash에서 백슬래시는 이스케이프 문자라 파싱 오류 발생 | Bash 도구에 넘기는 모든 경로는 슬래시(`/`)만 사용하도록 8개 프롬프트에 명시 |

---

# 해결한 문제

## GitHub Pages 배포의 간헐적 실패 (재발성 이슈)
- **증상**: GitHub Actions에서 "Upload artifact" 단계는 성공하지만 "Deploy to GitHub Pages" 단계가 실패(`transient` 성격, 재현 조건 불명). 이번 세션 동안 최소 4회 관찰됨(커밋 로그의 "Retrigger deploy after transient GitHub Pages deploy failure" 4건이 그 흔적).
- **해결 방법**: `git commit --allow-empty -m "Retrigger deploy after transient GitHub Pages deploy failure"` 후 push해 배포를 재트리거. 매번 재트리거 후에는 GitHub Actions API로 최종 `conclusion`이 `success`인지 재확인.
- **주의사항**: 배포 실패는 코드 문제가 아니라 GitHub Pages 인프라 쪽의 일시적 문제로 보이므로, 배포 실패 시 코드를 의심하기 전에 먼저 재시도부터 하는 것이 효율적입니다.

## Gabia DNS 설정 오류
- **증상**: Gabia 관리 콘솔에서 CNAME/A레코드 등록 시 오류 메시지 발생.
- **해결 방법**: CNAME 값 끝에 점(`.`)을 붙여야 함(`kimhyosub.github.io.`), A레코드의 호스트 필드는 빈 값이 아니라 `@`를 입력해야 함.

## 자동 발행 파이프라인의 반복적인 권한 승인 프롬프트 (진행 중이던 문제 — 현재 대부분 해결, 최종 검증은 미완료)
- **증상**: 스케줄 작업이 실행될 때마다 사용자에게 다양한 형태의 "Claude가 X 하도록 허용하시겠습니까?" 팝업이 뜨고, 상당수가 "한 번만 허용"만 있고 "항상 허용"이 없어 매번 재승인이 필요했음.
- **원인이 여러 가지였음** (하나가 아니었다는 점이 중요):
  1. `cd && 리다이렉션` 압축 명령 — 설계상 영구 승인 불가능한 패턴
  2. 새 파일 생성(Write) — 매번 다른 slug라 기존 허용 패턴과 문자열이 달라 매번 새로 프롬프트
  3. 기존 파일 수정(Edit) — 스마트머니 가이드 쪽에서 "Path is outside allowed working directories"
  4. PowerShell try/catch 스크립트 블록 — 정적 분석 불가로 영구 승인 자체가 불가능한 패턴
  5. Monitor 도구 + 쉘 명령어 치환(`$(...)`) — 역시 정적 분석 불가
  6. Bash에 백슬래시 경로 전달 — 파싱 오류
- **해결 방법**: 원인 2·3은 `settings.local.json`에 와일드카드 권한(`Write(D:/blog/posts/**)` 등) 추가로 해결. 원인 1·4·5·6은 애초에 그런 명령 형태 자체를 만들지 않도록 8개 스케줄 작업의 SKILL.md 프롬프트에 구체적 지침을 추가.
- **주의사항**: `settings.local.json`은 `.gitignore` 처리되어 있어 **다른 기기/새 클론에서는 이 허용 목록이 존재하지 않습니다.** 새 환경에서 자동화를 그대로 옮기면 권한 프롬프트가 처음부터 다시 발생할 수 있으니, 이 문서의 "개발하면서 변경했던 사항" 표를 참고해 재설정해야 합니다. 또한 스케줄 작업 자체(SKILL.md)도 이 저장소 밖에 있으므로 별도로 이전해야 합니다.
- **미완료**: 이 문서 작성 시점까지 위 수정이 실제로 다음 스케줄 실행에서 프롬프트 없이 통과되는지는 아직 검증되지 않았습니다.

---

# 앞으로 해야 할 작업 (TODO)

## HIGH
- **자동 발행 파이프라인의 무인 실행 검증**: 다음 06:30/12:30/18:30 스케줄 실행에서 권한 프롬프트가 실제로 발생하지 않는지 확인. 새로운 형태의 프롬프트가 또 나타날 가능성이 있음(지금까지 6가지 다른 원인이 발견됐던 것처럼).
- **AdSense 심사 결과 확인 및 대응**: 2026-07-06 신청 후 결과 통보 대기 중. 반려 시 사유(콘텐츠 부족/탐색 어려움/정책 위반 콘텐츠 등)에 따라 대응 필요. 심사 기간 중에는 네비게이션/템플릿/광고 스크립트 위치 등 구조적 변경을 최소화할 것.
- **topic-queue 소진 대비**: 현재 `postQueue`에 pending 항목이 카테고리별로 9~12개, `columnQueue`에 7개 남아있음. 주간 자동 보충 로직(5개 이하 시 6~8개 보충)이 실제로 정상 작동하는지 다음 일요일(weekly-publish-summary 실행) 결과로 확인 필요.

## MEDIUM
- `admin/index.html`에 AdSense 스크립트를 추가할지 여부 미결정 상태(현재 의도적 제외 — `noindex, nofollow`라 광고 노출 의미가 적다고 판단했으나 사용자 확인 필요)
- 카테고리별 글 개수 불균형: `kitchen-tools`가 7개로 다른 4개 카테고리(각 8개)보다 1개 적음. 자동 발행 로테이션이 카테고리를 균등 순환하므로 자연히 해소될 가능성이 높지만, 급히 맞출 필요는 없어 보임.
- Google Analytics 등 추가 분석 도구 연동 여부 검토(현재 `privacy/index.html`에 "별도 분석 도구는 사용하고 있지 않습니다"라고 명시되어 있으므로, 추가할 경우 이 문구도 함께 갱신해야 함)
- `data/posts.js`/`columns.js` 수정과 `sitemap.xml`/`rss.xml` 갱신이 완전히 수동/반자동(자동화 프롬프트 의존)이라, 동기화가 깨질 위험이 있음. 간단한 검증 스크립트(예: posts.js의 slug 개수와 sitemap.xml의 `/posts/` URL 개수 비교) 작성 고려.

## LOW
- 실제 백엔드 CMS(Supabase/Firebase 또는 Git 커밋 기반 CMS)로의 전환 — README/CLAUDE.md에 이미 향후 확장 방향으로 언급되어 있음
- 문의 폼 실제 전송 연동(예: Formspree, 자체 이메일 API 등) — 현재는 데모 UI
- 이미지: 현재 카테고리당 이미지 1장(`assets/images/categories/<slug>.jpg`)을 그 카테고리의 모든 글이 공유. 글마다 고유 이미지가 아니므로, 원한다면 개별 이미지 추가 검토(단, 자동 발행 프롬프트는 카테고리 이미지 재사용을 전제로 작성되어 있어 함께 수정 필요)
- 관리자 모드(`admin.js`)의 라우팅/렌더링/데이터 계층 분리(현재 단일 617줄 IIFE) — "리팩토링 포인트" 참고

---

# 리팩토링 포인트

## 개선 가능한 부분
- **인라인 스타일 잔존**: 유틸리티 클래스로 정리하는 작업이 있었지만 완전하지 않습니다. 예: `about/index.html`, `author/index.html`의 `style="margin-top:16px"`, `sitemap.xml` 관련 페이지 등 일부 인라인 스타일이 여전히 남아있습니다. 완전히 걷어내려면 해당 스타일 패턴을 새 유틸리티 클래스로 추출해야 합니다.
- **콘텐츠-메타데이터 동기화 검증 부재**: `data/posts.js`의 항목 수·slug와 실제 `posts/` 폴더, `sitemap.xml`, `rss.xml` 간 정합성을 자동으로 검사하는 스크립트가 없습니다. 사람이나 자동화 에이전트의 실수로 어긋날 여지가 있습니다.
- **`admin.js`의 구조**: 617줄이 데이터 계층(`getPosts`/`setPosts` 등), 라우팅(`route`/`initNav`), 뷰 렌더링이 한 파일의 단일 IIFE에 섞여 있습니다. 현재 규모(글 관리/칼럼 관리/카테고리/설정 4개 화면)에서는 문제되지 않지만, 화면이 더 늘어나면 라우터/스토어/뷰를 분리하는 편이 유지보수에 유리합니다.

## 성능 개선
- 이미지가 카테고리당 1장만 재사용되고 있어(개별 글 전용 이미지 없음) 시각적 차별화가 부족합니다. 최적화 관점에서는 오히려 유리(추가 로딩 없음)하지만, 콘텐츠 품질/체류시간 관점에서는 개별 이미지가 있으면 더 좋을 수 있습니다.
- 이미지 포맷이 `.jpg`로 고정되어 있습니다. WebP/AVIF 등으로 변환하면 페이지 로딩 속도 개선 여지가 있습니다(단, 정적 사이트라 빌드 파이프라인이 없으므로 수동 변환 또는 별도 최적화 스크립트 필요).
- `main.js`의 카드 렌더링이 매번 문자열 결합(`+`)으로 HTML을 생성합니다. 글 수가 지금(39개)보다 훨씬 많아지면(수백 개 단위) DOM 삽입 방식을 재검토할 수 있으나, 현재 규모에서는 문제 없습니다.

## 코드 품질 개선
- `assets/js/admin.js`, `main.js` 모두 ES5 스타일(`var`, `function` 표현식)로 작성되어 있습니다. 일관성은 있으나, 이후 유지보수자가 최신 문법(`const`/`let`, 화살표 함수)에 익숙하다면 마이그레이션을 고려할 수 있습니다(단, 지금 당장 필요한 작업은 아님).
- 자동 발행 스케줄 프롬프트(SKILL.md, 8개)에 반복되는 지침(도구 사용 규칙 문단)이 파일마다 복붙되어 있어, 향후 정책을 또 바꿀 때 8곳을 전부 수정해야 하는 부담이 있습니다. 공통 지침을 별도 참조 파일로 분리하는 방식은 현재 스케줄 작업 도구의 구조상(각 SKILL.md가 완전히 독립적이어야 함) 어렵지만, 인지해 둘 필요는 있습니다.

---

# 실행 방법

빌드 과정이 전혀 없는 정적 사이트이므로, 아래 순서로 바로 실행할 수 있습니다.

1. 저장소를 클론하거나 다운로드합니다.
   ```bash
   git clone https://github.com/kimhyosub/zipbabstudio.git
   cd zipbabstudio
   ```
2. 이 폴더에서 간단한 정적 서버를 실행합니다(스크립트가 절대경로 `/`를 기준으로 하므로, 파일을 더블클릭해서 열지 말고 반드시 서버를 통해 열어야 합니다).
   ```bash
   python -m http.server 8000
   # 또는
   npx serve .
   ```
3. 브라우저에서 `http://localhost:8000` 접속 → 홈페이지 확인.
4. 관리자 모드를 확인하려면 `http://localhost:8000/admin/` 접속 → "데모 계정으로 바로 로그인" 클릭(또는 비밀번호에 아무 값이나 입력).
5. Replit 등 정적 호스팅 환경에서도 폴더를 그대로 업로드/import 후 "Static Web Server" 템플릿으로 바로 실행 가능합니다(`index.html`이 루트에 있음).

**실제 배포(GitHub Pages)에 반영하려면**: `main` 브랜치에 push하면 `.github/workflows/deploy.yml`이 자동으로 GitHub Pages에 배포합니다. 별도의 빌드 명령이 필요 없습니다.

---

# 환경설정

## 필요한 환경변수
**없습니다.** 이 프로젝트는 서버가 없는 순수 정적 사이트이며, API 키나 시크릿을 코드에서 직접 사용하지 않습니다. (Google AdSense, 네이버 서치어드바이저 등의 식별자는 공개 가능한 값으로, HTML에 직접 하드코딩되어 있습니다 — `client=ca-pub-8436574422662926`, `naver-site-verification` 메타 태그 값 등.)

## 설정 파일
| 파일 | 역할 |
|---|---|
| `data/site.config.js` | 사이트명/색상/이메일/운영자 정보/nav/footer 링크 — **가장 먼저 확인할 설정 파일** |
| `data/categories.js` / `posts.js` / `columns.js` | 콘텐츠 메타데이터 |
| `.github/workflows/deploy.yml` | GitHub Pages 배포 워크플로우 (수정 시 배포 자체가 깨질 수 있어 주의) |
| `CNAME` | 커스텀 도메인 지정 (`www.zipbabstudio.com`) — 삭제하면 GitHub Pages 기본 도메인으로 되돌아감 |
| `.nojekyll` | GitHub Pages의 Jekyll 처리를 끔 (없으면 `_`로 시작하는 파일/폴더가 무시될 수 있음) |
| `robots.txt` / `sitemap.xml` | 검색엔진 크롤링 설정 |
| `.claude/settings.local.json` | 로컬 전용 Claude Code 권한 허용목록. **`.gitignore` 처리되어 있어 새 환경에는 존재하지 않음** — 자동화를 새 기기로 옮길 때 반드시 재구성 필요 (구체적 패턴은 "해결한 문제" 섹션 참고) |
| `.claude/launch.json` | Claude Code 미리보기 도구용 dev 서버 설정(`python -m http.server` 등) |

## 실행 명령어
```bash
# 로컬 미리보기
python -m http.server 8000

# 배포 (git push만 하면 자동)
git add -A
git commit -m "커밋 메시지"
git push origin main
```

---

# Git

## 추천 브랜치 전략
현재까지 **`main` 브랜치 단일 운영**(feature 브랜치를 만든 적 없음)이며, 자동 발행 파이프라인도 매번 `main`에 직접 commit + push하는 구조로 설계되어 있습니다. 이 구조를 유지하는 것을 권장합니다 — 자동화가 PR 승인을 기다리도록 바꾸려면 스케줄 작업 프롬프트 전체를 다시 설계해야 하는 큰 변경이 됩니다.

다만 **사람이 대규모 구조 변경**(레이아웃 개편, 관리자 모드 재설계 등)을 할 때는 별도 브랜치에서 작업 후 PR로 병합하는 것을 권장합니다 — 자동화가 거의 매일 여러 번 `main`에 커밋하므로, 오래 열어두는 브랜치는 merge conflict 위험이 있습니다(짧게 작업하고 빨리 병합하는 편이 안전).

## 커밋 규칙
실제 커밋 로그(36개)에서 관찰되는 패턴을 그대로 따르는 것을 권장합니다.
- 새 글 추가: `Add post: <글 제목 그대로>` (예: `Add post: 나물 삶을 때 색이 죽는 이유`)
- 새 칼럼 추가: `Add column: <칼럼 제목 그대로>`
- 기능/구조 변경: 영어 명령형 요약 (예: `Add Google AdSense script, ads.txt, and privacy policy ad disclosure`, `Replace repeated inline styles with reusable CSS classes`, `Wrap post/column content in <article> semantic tag`)
- 배포 재시도: `Retrigger deploy after transient GitHub Pages deploy failure` (빈 커밋, `git commit --allow-empty`)
- 큐 보충: `Replenish topic queue`

한글 제목 커밋(글/칼럼 발행)과 영어 요약 커밋(구조 변경)이 혼재하는 것이 이 저장소의 자연스러운 패턴이므로, 억지로 통일할 필요는 없습니다.

---

# 프로젝트 메모

- **애드센스 신청 완료(2026-07-06)**: 신청 전 완료한 준비 작업 — 시맨틱 HTML, 다크모드, 콘텐츠 볼륨/품질(39 posts, 11 columns), SEO(sitemap/robots/JSON-LD), RSS, `ads.txt`, 개인정보처리방침 광고 고지. 심사 대기 중에는 큰 구조 변경을 피하고, 자동 발행 파이프라인은 그대로 유지하는 것이 좋습니다(콘텐츠가 계속 늘어나는 것은 긍정적 신호).
- **CLAUDE.md의 "광고 코드 삽입 금지" 항목은 현재 상태와 모순됩니다.** 이는 CLAUDE.md 작성 이후 사용자가 명시적으로 애드센스 도입을 요청했기 때문이며, 실수나 정책 위반이 아닙니다. CLAUDE.md를 갱신하거나, 최소한 이 문서를 함께 참고해 혼동하지 않도록 해야 합니다.
- **자동 발행 파이프라인은 저장소 밖에 존재합니다.** `C:\Users\김나은\.claude\scheduled-tasks\` 아래 4개 SKILL.md 파일이 실제 자동화 로직 전체를 담고 있으며, git으로 추적되지 않습니다. 이 프로젝트를 다른 사람에게 넘기거나 다른 기기로 옮길 때 반드시 이 파일들도 함께 전달해야 스케줄 자동화가 재현됩니다.
- **동일 사용자가 유사 구조의 "스마트머니 가이드"(`D:\smartmoney-guide`, 저장소 `kimhyosub/money-zipbabstudio`, 도메인 `info.zipbabstudio.com`) 사이트를 별도로 운영 중**입니다. 스케줄 작업 목록에 `smg-` 접두사로 4개가 함께 존재하므로, 이 프로젝트(집밥연구소) 관련 작업을 할 때 실수로 스마트머니 가이드 쪽 스케줄 작업을 건드리지 않도록 주의해야 합니다.
- **관리자 모드는 진짜 로그인 시스템이 아닙니다.** `demo1234`나 아무 값이나 입력해도 로그인되며, 이는 버그가 아니라 설계 의도입니다(CLAUDE.md에도 "관리자 모드는 실제 보안 인증이 아님을 명확히 고지"라고 명시).
- **날짜는 의도적으로 자연스럽게 분산 배치**되어 있습니다(예: posts.js의 `publishedAt`이 2026-02-14부터 2026-07-11까지 몇 달에 걸쳐 분포). 기계적으로 매일 하루씩 증가하는 패턴이 아니므로, 새 콘텐츠를 수동으로 추가할 때도 이 자연스러움을 유지하는 것이 좋습니다(단, 자동 발행 파이프라인이 만드는 신규 글은 실행일 날짜를 그대로 사용).

---

# AI 인수인계 문서

## 현재 상태 (2026-07-11 기준)
- 커밋 36개, `main` 브랜치, GitHub Pages + 커스텀 도메인(`www.zipbabstudio.com`)으로 라이브 운영 중
- 글 39개(카테고리별 7~8개), 칼럼 11개, 카테고리 5개, 신뢰 페이지 8종, 관리자 모드 1개 — CLAUDE.md의 최소 요구사항(글 15개+, 칼럼 3개+)을 크게 상회
- Google Search Console(도메인 속성) + 네이버 서치어드바이저 등록 및 사이트맵 제출 완료
- Google AdSense 스크립트/`ads.txt`/개인정보처리방침 반영 완료, **2026-07-06 애드센스 신청 완료, 심사 결과 대기 중**
- 자동 발행 파이프라인(하루 글 2개 + 칼럼 1개 + 주간 요약) 가동 중이나, **권한 승인 프롬프트 문제를 여러 차례 트러블슈팅 중이며 최종 검증이 끝나지 않은 상태**로 세션이 종료됨

## 해야 할 일
"앞으로 해야 할 작업(TODO)" 섹션을 그대로 따르면 됩니다. 가장 시급한 것은 **다음 스케줄 실행에서 자동 발행이 실제로 무인으로(승인 프롬프트 없이) 완료되는지 확인**하는 것과, **애드센스 심사 결과에 대응**하는 것입니다.

## 주의사항
1. **CLAUDE.md를 맹신하지 말 것.** "광고 코드 삽입 금지" 항목처럼, 사용자의 최신 지시가 CLAUDE.md 작성 시점 이후에 CLAUDE.md 내용을 넘어선 경우가 있습니다. 실제 파일 상태(이 문서에 반영됨)를 우선하고, 의심스러우면 사용자에게 확인하세요.
2. **YMYL 금지, 이메일만 연락 수단, 관리자 모드는 데모임을 고지** 같은 CLAUDE.md의 핵심 원칙은 여전히 유효하며 반드시 지켜야 합니다.
3. **자동화가 하루 3번 `main`에 직접 push합니다.** 사람이 로컬에서 파일을 수정하기 전에 반드시 `git pull`로 최신 상태를 받아야 충돌을 피할 수 있습니다.
4. **`.claude/settings.local.json`은 새 환경에 없습니다.** 자동화를 새 기기로 옮기거나 이 저장소를 새로 클론한 환경에서 스케줄 작업을 그대로 돌리면 권한 프롬프트가 처음부터 다시 나타날 수 있습니다. 이 문서의 "해결한 문제" 섹션에 정리된 6가지 원인과 해법을 참고해 재구성하세요.
5. **스케줄 작업(SKILL.md) 자체가 이 저장소 밖에 있습니다.** 마이그레이션 시 `C:\Users\김나은\.claude\scheduled-tasks\` 아래 `post-publish-morning`, `post-publish-afternoon`, `column-publish-evening`, `weekly-publish-summary` 4개 폴더도 함께 옮겨야 자동 발행이 재현됩니다.
6. **`data/posts.js`/`columns.js`와 `posts/`·`columns/` 폴더, `sitemap.xml`, `rss.xml` 사이의 정합성을 검증하는 자동화 장치가 없습니다.** 새 글/칼럼을 추가할 때는 이 네 곳을 모두 함께 갱신해야 하며, 이를 자동으로 검사하는 스크립트가 없다는 점을 기억하세요.
7. **"스마트머니 가이드"(`D:\smartmoney-guide`)는 별개 프로젝트입니다.** 같은 사용자의 다른 사이트이며, 이 프로젝트 작업 중 실수로 그쪽 파일이나 스케줄 작업을 건드리지 않도록 항상 경로를 확인하세요.

## 설계 의도
- **"개인 블로그"가 아니라 "브랜드형 정보 사이트"로 보이도록** 의도적으로 설계되었습니다. 그래서 워드프레스 느낌의 관리자 모드(실제로는 데모), 편집팀/운영자 개념, 편집 원칙 명시, 신뢰 페이지 8종 등을 갖췄습니다. 이는 애드센스 심사 통과 가능성을 높이기 위한 선택이기도 합니다.
- **콘텐츠 신뢰성(크롤러 안정성)을 위해 본문은 의도적으로 템플릿 엔진 없이 정적 HTML로 직접 작성**합니다. 메타데이터(`data/*.js`)만 동적으로 렌더링되는 목록에 쓰이고, 본문 자체는 검색엔진이 어떤 JS 실행 환경에서도 그대로 읽을 수 있도록 고정되어 있습니다. 이 원칙은 앞으로도 유지하는 것을 권장합니다(자동 발행 파이프라인도 이 원칙을 그대로 따르도록 설계됨).
- **관리자 모드는 "실제 백엔드 없이도 CMS 경험을 보여주는" 데모로 의도적으로 남겨두었습니다.** README/CLAUDE.md 모두 이 한계를 명확히 고지하도록 요구하고 있으며, 향후 Supabase/Firebase/Git 기반 CMS로 확장 가능한 구조(데이터와 뷰가 분리되어 있음)로 설계되었습니다.
- **자동 발행 파이프라인은 "완전 무인 운영"을 목표**로 설계되었습니다. 사용자가 명시적으로 "알림 없이, 승인 없이 끝까지 돌아가야 한다"고 요구했고, 그 요구를 만족시키기 위해 이번 세션 대부분의 시간을 권한 프롬프트 문제 해결에 썼습니다. 앞으로 이 파이프라인을 수정할 때도 "사람 개입 없이 끝까지 실행된다"는 제약을 최우선으로 유지해야 합니다.
