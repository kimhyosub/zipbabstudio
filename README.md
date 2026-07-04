# 집밥연구소 (www.zipbabstudio.com)

집밥연구소는 요리 초보자와 집밥을 즐기는 사람들을 위한 요리 정보 정적 사이트입니다. 빌드 도구 없이 순수 HTML/CSS/JS로 구성되어 있으며, Replit 등 정적 호스팅 환경에서 바로 실행할 수 있습니다.

## 실행 방법

이 프로젝트는 빌드 과정이 필요 없는 정적 사이트입니다.

- **Replit**: 이 폴더를 그대로 업로드하거나 import한 뒤, 정적 웹 서버(Static Web Server) 템플릿으로 실행하면 됩니다. `index.html`이 루트에 있으므로 별도 설정 없이 바로 열립니다.
- **로컬에서 확인**: 이 폴더에서 아래 명령 중 하나를 실행한 뒤 브라우저에서 `http://localhost:8000` 접속
  ```bash
  python -m http.server 8000
  # 또는
  npx serve .
  ```

> 이 사이트는 `fetch`나 서버 API를 사용하지 않으므로, 파일을 더블클릭해서 여는 것보다는 위와 같은 간단한 정적 서버를 통해 여는 것을 권장합니다(스크립트 경로가 절대경로 `/`로 되어 있기 때문입니다).

## 폴더 구조

```
/
  index.html                 홈
  about/                     사이트 소개
  author/                    운영자 소개 · 칼럼 허브
  contact/                   문의하기
  categories/                카테고리 목록 + 5개 상세 페이지
  posts/                     글 상세 페이지 15개
  columns/                   칼럼 목록 + 상세 페이지 3개
  admin/                     관리자 모드 (CMS-lite 데모)
  privacy/ terms/ disclaimer/ sitemap/   신뢰 페이지
  404.html
  robots.txt
  sitemap.xml
  assets/
    css/style.css            전체 디자인 시스템
    js/main.js                공통 헤더/푸터/카드 렌더링
    js/auth.js                관리자 세션 감지 (데모)
    js/admin.js                관리자 모드 로직 (CRUD, localStorage, export/import)
    icons/favicon.svg
  data/
    site.config.js            사이트명, 색상, 이메일, 운영자 정보 등 전역 설정
    categories.js              카테고리 5개
    posts.js                   글 메타데이터 15개
    columns.js                 칼럼 메타데이터 3개
```

## 콘텐츠 데이터 구조

- `data/site.config.js`, `data/categories.js`, `data/posts.js`, `data/columns.js`가 사이트 전역 설정과 콘텐츠 메타데이터(제목, 슬러그, 카테고리, 요약, 날짜, 추천 여부 등)의 단일 출처입니다.
- 홈·카테고리·칼럼 **목록** 페이지는 이 데이터를 읽어 카드 목록을 자동으로 렌더링합니다.
- 각 글/칼럼의 **본문**은 SEO 신뢰성과 크롤링 안정성을 위해 `posts/<slug>/index.html`, `columns/<slug>/index.html`에 정적 HTML로 직접 작성되어 있습니다. 본문을 수정할 때는 `data/posts.js` 또는 `data/columns.js`의 요약(summary)과 수정일(updatedAt)도 함께 맞춰주는 것을 권장합니다.

## 관리자 모드(admin)에 대한 중요한 안내

`/admin/`은 **워드프레스 느낌의 정적 CMS-lite 관리자 UI 데모**입니다. 실제 서비스에서 쓰이는 것과 같은 데이터베이스, 서버 인증, 권한 관리 시스템이 아닙니다.

- 로그인은 데모용입니다. 비밀번호 입력(`demo1234` 또는 아무 값) 또는 "데모 계정으로 바로 로그인" 버튼으로 로그인 상태를 흉내 낼 뿐, 실제 서버 인증이 이루어지지 않습니다.
- 관리자 세션 여부는 이 브라우저의 `localStorage`에 저장되는 값 하나로 판단합니다. 브라우저 저장소를 지우거나 다른 기기·브라우저에서 접속하면 로그인 상태가 유지되지 않습니다.
- 글/칼럼/카테고리/설정 편집 내용은 모두 `localStorage`에만 저장되며, **실제로 배포된 정적 HTML 파일에는 자동으로 반영되지 않습니다.**
- 실제로 콘텐츠를 사이트에 반영하려면, 관리자 화면의 "JSON으로 내보내기" 기능으로 편집 내용을 다운로드한 뒤, 그 내용을 참고해 `data/posts.js` / `data/columns.js` 등과 해당 페이지의 HTML 파일을 직접 수정해야 합니다.
- 추후 실제 데이터베이스 기반 CMS로 확장하고 싶다면, Supabase나 Firebase 같은 BaaS, 또는 Git 커밋을 CMS처럼 쓰는 Git 기반 CMS(예: 정적 사이트 + 관리자 화면에서 커밋 생성) 연동을 고려할 수 있는 구조로 설계되어 있습니다.

### 운영자명 클릭 흐름

사이트 전반(푸터, 홈 운영자 박스, 글/칼럼 하단 편집자 박스, 소개 페이지)의 "한끼연구원" 링크를 누르면 `/author/`(운영자 소개·칼럼 허브)로 이동합니다.

- 관리자 세션이 없는 일반 방문자에게는 "운영자가 정리한 칼럼을 읽어보세요" 안내와 칼럼 목록이 보입니다.
- 관리자 세션이 있는 상태로 `/author/`에 접속하면 같은 위치에 "새 칼럼 작성하기" 버튼이 나타나며, 이 버튼을 누르면 `/admin/#columns/new`(칼럼 관리 화면의 새 칼럼 작성 폼)으로 바로 이동합니다.
- 관리자 세션은 `/admin/`에서 데모 로그인을 하면 켜지고, 사이드바의 "로그아웃" 버튼을 누르면 꺼집니다.

## 수정 위치 안내

| 항목 | 수정 위치 |
|---|---|
| 사이트명 | `data/site.config.js` (`siteName`) |
| 메인/서브 색상 | `data/site.config.js` (`mainColor`, `subColor`) **및** `assets/css/style.css`의 `:root { --color-main; --color-sub; }` |
| 연락 이메일 | `data/site.config.js` (`contactEmail`) — 이메일을 직접 노출하는 각 페이지(`contact/index.html`, `privacy/index.html` 등)도 함께 확인 |
| 운영자명 | `data/site.config.js` (`ownerName`) — 각 글/칼럼 본문 안의 "한끼연구원" 표기는 직접 찾아 바꿔야 합니다 |
| 카테고리 | `data/categories.js` (5개 배열) + `categories/<slug>/index.html` |
| 일반 글 | `data/posts.js` (메타데이터) + `posts/<slug>/index.html` (본문) |
| 칼럼 | `data/columns.js` (메타데이터) + `columns/<slug>/index.html` (본문) |
| 관리자 기본 문구 | `admin/index.html`(화면 문구), `assets/js/admin.js` 상단 (`KEYS`, 시드 로직, 안내 문구) |

## 한계 및 향후 확장

이 프로젝트는 순수 정적 사이트이며 실제 백엔드가 없습니다. 즉:

- 문의 폼과 관리자 로그인은 실제 서버로 데이터를 전송하지 않는 데모 UI입니다.
- 관리자 모드의 모든 데이터는 브라우저 `localStorage`에만 존재하며, 여러 사용자 간에 공유되지 않습니다.
- 실제 서비스로 운영하려면 Supabase/Firebase 같은 BaaS, 또는 별도의 백엔드 API와 데이터베이스를 연동해야 합니다.
