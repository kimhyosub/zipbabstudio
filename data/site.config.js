/**
 * 사이트 전역 설정
 * 사이트명 / 색상 / 이메일 / 운영자명 등을 여기서 한 번에 수정하면
 * assets/js/main.js가 모든 페이지의 헤더/푸터/메타에 반영합니다.
 */
window.SITE_CONFIG = {
  siteName: "집밥연구소",
  tagline: "집에서 만드는 든든한 한 끼, 집밥연구소",
  description:
    "요리 초보자와 집밥을 즐기는 사람들을 위한 요리 정보 사이트입니다. 밑반찬, 한그릇 요리, 자취요리 입문, 주방 도구 관리, 식재료 보관법까지 실생활에 바로 쓸 수 있는 정보를 정리합니다.",
  domain: "zipbabstudio.com",
  url: "https://www.zipbabstudio.com",
  mainColor: "#F97316",
  subColor: "#FFF7ED",
  ownerName: "한끼연구원",
  ownerBio: "집밥을 사랑하는 요리 정보 큐레이터",
  ownerLongBio:
    "여러 해 동안 집밥 레시피와 요리 정보를 조사하고 정리해 온 콘텐츠 큐레이터입니다. 화려한 레시피보다 '초보자가 실제로 따라 할 수 있는 정보'를 우선순위에 두고 집밥연구소를 운영하고 있습니다.",
  contactEmail: "hyosub19@naver.com",
  foundedYear: 2024,
  editorialPrinciples: [
    "과장되거나 검증되지 않은 조리법은 다루지 않습니다.",
    "초보자 기준으로 이해할 수 있도록 쉬운 표현을 우선합니다.",
    "정보는 발행 이후에도 주기적으로 점검하고 필요하면 보완합니다.",
    "실제 도움이 되는 정보인지를 기준으로 주제를 선정합니다."
  ],
  nav: [
    { label: "홈", href: "/" },
    { label: "카테고리", href: "/categories/" },
    { label: "칼럼", href: "/columns/" },
    { label: "소개", href: "/about/" },
    { label: "문의", href: "/contact/" }
  ],
  footerLinks: [
    { label: "개인정보처리방침", href: "/privacy/" },
    { label: "이용약관", href: "/terms/" },
    { label: "면책고지", href: "/disclaimer/" },
    { label: "사이트맵", href: "/sitemap/" },
    { label: "운영자 소개", href: "/author/" }
  ]
};
