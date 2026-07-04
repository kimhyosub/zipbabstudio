# 집밥연구소 (www.zipbabstudio.com) — 프로젝트 명세

## 프로젝트 개요

- **사이트명**: 집밥연구소
- **한줄 소개**: 집에서 만드는 든든한 한 끼, 집밥연구소
- **주제**: 요리 레시피 / 집밥 정보
- **타깃 독자**: 요리 초보자, 집밥을 즐기는 일반인
- **톤앤매너**: 신뢰감 있고 친절하며 과장 없는 정보형 문체
- **메인 컬러**: `#F97316` (오렌지)
- **서브 컬러**: `#FFF7ED` (연한 오렌지/크림)
- **운영자명**: 한끼연구원
- **운영자 소개**: 집밥을 사랑하는 요리 정보 큐레이터
- **연락 이메일**: hyosub19@naver.com (사이트 내 유일한 연락 수단)
- **기본 도메인 표기**: www.zipbabstudio.com
- **성격**: 개인 블로그가 아니라 **브랜드형 정보 사이트**. 워드프레스 느낌의 CMS-lite 관리자 모드 포함.

## 절대 지켜야 할 원칙

- YMYL 주제(건강/금융/투자/대출/세금/법률) 금지 — 요리 정보로 한정
- 가짜 후기·가짜 수치·가짜 자격·허위 경험담·키워드 스팸 금지
- lorem ipsum 등 더미 텍스트 금지 — 전부 자연스러운 한국어 실문장
- 과장/낚시 표현("완벽 정리", "무조건", "100%", "충격" 등) 금지
- 허위 회사 주소·전화번호 금지, 연락은 이메일만
- 광고 코드 삽입 금지
- 관리자 모드는 실제 보안 인증이 아님을 명확히 고지 (localStorage 기반 데모)
- 최신성 연출은 하되 허위 통계·허위 업데이트 이력 조작 금지

## 기술 방향

- 순수 정적 사이트: HTML/CSS/JS (프레임워크 없이, Replit에서 바로 실행 가능)
- 콘텐츠는 `data/` 폴더의 JS 데이터 파일로 분리 (site.config.js, categories.js, posts.js, columns.js)
- 각 글/칼럼은 데이터 기반으로 하되, 정적 HTML 페이지로 사전 생성 (빌드 도구 없이 직접 생성)
- 접근성(시맨틱 태그, alt, heading 구조) 준수
- SEO: title/description/canonical/OG/Twitter 메타, JSON-LD(Article/Breadcrumb/FAQ), sitemap.xml, robots.txt

## 폴더 구조

```
/
  index.html
  about/index.html
  author/index.html          (운영자 소개 + 칼럼 허브, 관리자 세션 감지)
  contact/index.html
  categories/index.html
  categories/<slug>/index.html   (카테고리별 상세, 5개)
  posts/<slug>/index.html        (글 상세, 15개 이상)
  columns/index.html
  columns/<slug>/index.html      (칼럼 상세, 3개 이상)
  admin/index.html            (로그인 + 대시보드 + 글/칼럼/카테고리/설정 관리, SPA형 JS)
  privacy/index.html
  terms/index.html
  disclaimer/index.html
  sitemap/index.html          (HTML 사이트맵)
  404.html
  robots.txt
  sitemap.xml
  assets/
    css/style.css
    js/main.js                (공통: 헤더/푸터 네비, 모바일 메뉴 등)
    js/auth.js                (localStorage 기반 관리자 세션 감지 — author 페이지, footer 등에서 공용)
    js/admin.js                (admin 전용 로직: 로그인, CRUD, JSON export/import)
    icons/ (favicon 등, CSS/SVG 기반 아이콘 위주)
  data/
    site.config.js
    categories.js
    posts.js
    columns.js
```

## 카테고리 설계 (5개, 각 3~5개 이상 글 연결)

1. 밑반찬·저장음식
2. 한그릇 요리·집밥 메뉴
3. 자취요리·초보 입문
4. 요리 도구·주방 관리
5. 식재료 활용·보관법

## 콘텐츠 요구사항

- 글 15개 이상, 칼럼 3개 이상, 각기 다른 주제/관점, 중복 없음
- 각 글 구성 요소: 제목, 요약 서브타이틀, 작성자 정보, 발행일/수정일, 목차, 본문(문제 제기→핵심 설명→실제 팁→주의사항→정리), 핵심 요약 박스, 초보자 실수 포인트, 체크리스트, 관련 글 링크, 편집자 박스
- 날짜는 최근 몇 달 사이 자연스럽게 분산 배치 (기계적 증가 금지), 홈 최신글 섹션은 최신 수정일 기준 정렬
- FAQ가 어울리는 글에는 FAQ 스키마(JSON-LD) 적용

## 운영자명 클릭 흐름 (필수 구현)

`{{OWNER_NAME}}`(한끼연구원) 링크는 footer, 운영자 소개 박스, 글 하단 편집자 박스, 운영자 소개 페이지 등 전 사이트에 노출.
클릭 시 `/author/`로 이동 → 그 페이지에서:
- 관리자 세션 없음: "운영자가 정리한 칼럼을 읽어보세요" + 칼럼 목록/소개
- 관리자 세션 있음(localStorage 플래그): "새 칼럼 작성하기" 버튼 노출 → 클릭 시 `/admin/#columns/new`(칼럼 관리 > 새 칼럼 작성 화면)로 이동

## 관리자 모드(admin) 요구사항

- 로그인 전/후 화면 구분 (데모 로그인 — 비밀번호 입력 또는 데모 로그인 버튼, 실보안 아님을 화면에 명시)
- 레이아웃: 좌측 사이드바(대시보드/글 관리/칼럼 관리/카테고리/사이트 설정) + 우측 편집 패널
- 대시보드: 총 글 수, 총 칼럼 수, 카테고리 수, 최근 수정 콘텐츠, 추천 글 수, 발행/초안 상태 요약
- 글 관리: 목록/작성/수정/삭제, 필드(제목/슬러그/요약/카테고리/본문/FAQ/관련글/추천여부/발행상태/작성일·수정일), 미리보기, 저장
- 칼럼 관리: 글 관리와 유사하되 시각적으로 구분, 운영자명 기본 연결
- 사이트 설정: 사이트명/한줄소개/운영자명/운영자소개/이메일/메인컬러/서브컬러/도메인 (편집 UI 또는 최소 연결 구조)
- 데이터: localStorage 저장 + 기본 데이터 로드 + JSON export/import
- 한계 고지 문구 필수: "실제 데이터베이스/인증 시스템 없음, 브라우저 저장소 기반 데모이며 기기·브라우저가 바뀌면 유지되지 않을 수 있음. Supabase/Firebase/Git 기반 CMS 등으로 추후 확장 가능."

## 필수 페이지 체크리스트

홈 / 카테고리 목록 / 카테고리 상세×5 / 글 상세×15+ / 소개(About) / 운영자 소개(Author) / 문의하기 / 개인정보처리방침 / 이용약관 / 면책고지 / HTML 사이트맵 / 404 / 칼럼 목록 / 칼럼 상세×3+ / 관리자(admin)

## 홈페이지 구성 요소

히어로(주제/목적 5초 이해) / 대표 카테고리 4~6개 / 최신 글 / 추천 글 / 운영 목적 소개 / 편집 원칙 요약 / 운영자 미니 박스 / 칼럼 미리보기 / 문의 CTA / 푸터(정책 링크·운영자·이메일)

## 수정 위치 안내 (README에도 명시 예정)

- 사이트명/색상/이메일/운영자명: `data/site.config.js`
- 카테고리: `data/categories.js`
- 일반 글: `data/posts.js`
- 칼럼: `data/columns.js`
- 관리자 기본 문구: `assets/js/admin.js` 상단 상수 + `admin/index.html`
