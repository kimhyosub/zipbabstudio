/**
 * 글(포스트) 메타데이터
 * 홈/카테고리/사이트맵 목록에 쓰이는 요약 정보입니다.
 * 실제 본문은 posts/<slug>/index.html에 직접 작성되어 있으며,
 * 본문을 수정할 때는 이 파일의 summary/updatedAt도 함께 맞춰주는 것을 권장합니다.
 */
window.POSTS = [
  {
    slug: "mu-saengchae",
    title: "무생채 간 맞추기, 초보자가 자주 틀리는 포인트",
    summary:
      "무생채가 싱겁거나 짜지는 이유는 대부분 소금 타이밍과 물기 제거에 있습니다. 기본 비율과 순서를 정리했습니다.",
    category: "banchan",
    publishedAt: "2026-02-14",
    updatedAt: "2026-02-14",
    featured: true,
    hasFaq: false,
    related: ["banchan-storage", "myeolchi-bokkeum"]
  },
  {
    slug: "banchan-storage",
    title: "밑반찬 냉장 보관 기간, 반찬 종류별로 다르게 봐야 하는 이유",
    summary:
      "밑반찬은 수분 함량과 간의 세기에 따라 보관 기간이 크게 달라집니다. 반찬 종류별 대략적인 보관 기준을 정리했습니다.",
    category: "banchan",
    publishedAt: "2026-02-28",
    updatedAt: "2026-05-10",
    featured: false,
    hasFaq: true,
    related: ["mu-saengchae", "vegetable-storage", "jangajji-brine-ratio"]
  },
  {
    slug: "myeolchi-bokkeum",
    title: "멸치볶음이 눅눅해지는 이유와 바삭하게 유지하는 기본 원칙",
    summary:
      "멸치볶음이 시간이 지나면 눅눅해지는 건 대부분 수분과 식히는 방식 때문입니다. 초보자가 놓치기 쉬운 순서를 짚었습니다.",
    category: "banchan",
    publishedAt: "2026-03-09",
    updatedAt: "2026-03-09",
    featured: false,
    hasFaq: false,
    related: ["banchan-storage", "pan-coating-care"]
  },
  {
    slug: "kimchi-bokkeumbap",
    title: "자취생도 실패 없는 김치볶음밥, 재료 손질부터 순서까지",
    summary:
      "김치볶음밥이 애매한 맛이 되는 건 대개 김치 상태와 넣는 순서 때문입니다. 기본 순서를 단계별로 정리했습니다.",
    category: "one-dish",
    publishedAt: "2026-03-20",
    updatedAt: "2026-06-02",
    featured: true,
    hasFaq: false,
    related: ["bokkeumbap-rice", "one-bowl-balance"]
  },
  {
    slug: "basic-broth",
    title: "국물 요리 입문자를 위한 기본 육수 잡는 법",
    summary:
      "국물 요리가 매번 밍밍하거나 잡내가 난다면 육수 내는 순서부터 점검할 필요가 있습니다. 기본적인 육수 베이스를 정리했습니다.",
    category: "one-dish",
    publishedAt: "2026-04-02",
    updatedAt: "2026-04-02",
    featured: true,
    hasFaq: true,
    related: ["measuring-habit", "ramen-add-ins-order"]
  },
  {
    slug: "bokkeumbap-rice",
    title: "볶음밥이 질척해지는 이유와 밥 상태 맞추는 법",
    summary:
      "볶음밥이 떡지는 대부분의 원인은 밥의 수분 상태와 화력에 있습니다. 밥 짓는 시점부터 점검하는 방법을 정리했습니다.",
    category: "one-dish",
    publishedAt: "2026-04-11",
    updatedAt: "2026-04-11",
    featured: false,
    hasFaq: false,
    related: ["kimchi-bokkeumbap", "heat-control"]
  },
  {
    slug: "starter-tools",
    title: "자취 요리 처음 시작할 때 갖춰야 할 최소한의 조리도구",
    summary:
      "처음부터 도구를 다 갖출 필요는 없습니다. 입문 단계에서 우선순위를 두고 갖추면 좋은 도구를 정리했습니다.",
    category: "beginner",
    publishedAt: "2026-04-25",
    updatedAt: "2026-06-18",
    featured: true,
    hasFaq: false,
    related: ["measuring-habit", "fridge-cleanout", "knife-care"]
  },
  {
    slug: "measuring-habit",
    title: "계량 없이 요리하다 실수하는 이유와 계량 습관 만들기",
    summary:
      "레시피의 '적당히'가 어렵게 느껴지는 이유와, 계량 도구 없이도 기준을 잡아가는 방법을 정리했습니다.",
    category: "beginner",
    publishedAt: "2026-05-06",
    updatedAt: "2026-05-06",
    featured: false,
    hasFaq: false,
    related: ["starter-tools", "recipe-following-mistakes"]
  },
  {
    slug: "heat-control",
    title: "불 조절이 어려운 초보를 위한 화력별 요리 가이드",
    summary:
      "레시피의 '중불', '센 불' 표현이 헷갈리는 이유와, 가정용 화구 기준으로 화력을 가늠하는 방법을 정리했습니다.",
    category: "beginner",
    publishedAt: "2026-05-15",
    updatedAt: "2026-05-15",
    featured: true,
    hasFaq: true,
    related: ["bokkeumbap-rice", "basic-broth"]
  },
  {
    slug: "pan-coating-care",
    title: "프라이팬 코팅 오래 쓰는 관리법, 초보가 놓치는 습관",
    summary:
      "코팅 프라이팬의 수명을 줄이는 건 대부분 세척과 화력 습관입니다. 코팅을 오래 유지하는 기본 관리법을 정리했습니다.",
    category: "kitchen-tools",
    publishedAt: "2026-05-22",
    updatedAt: "2026-06-30",
    featured: true,
    hasFaq: false,
    related: ["knife-care", "container-guide"]
  },
  {
    slug: "knife-care",
    title: "칼 관리 기본, 무뎌지는 이유와 초보자의 관리 루틴",
    summary:
      "칼이 금방 무뎌지는 이유는 대부분 보관 방식과 사용 습관에 있습니다. 초보자가 부담 없이 실천할 수 있는 관리 루틴을 정리했습니다.",
    category: "kitchen-tools",
    publishedAt: "2026-05-29",
    updatedAt: "2026-05-29",
    featured: false,
    hasFaq: false,
    related: ["pan-coating-care", "cutting-board-hygiene"]
  },
  {
    slug: "cutting-board-hygiene",
    title: "도마 위생 관리, 교차 오염 막는 기본 원칙",
    summary:
      "도마 하나로 채소와 육류를 함께 손질하면 교차 오염 위험이 커집니다. 가정에서 실천 가능한 기본 원칙을 정리했습니다.",
    category: "kitchen-tools",
    publishedAt: "2026-06-05",
    updatedAt: "2026-06-05",
    featured: false,
    hasFaq: true,
    related: ["dishcloth-hygiene", "meat-storage"]
  },
  {
    slug: "vegetable-storage",
    title: "채소별 보관법 총정리, 냉장과 냉동 기준 나누기",
    summary:
      "채소는 종류에 따라 보관 온도와 방식이 크게 달라집니다. 자주 사는 채소를 기준으로 보관 원칙을 정리했습니다.",
    category: "ingredients",
    publishedAt: "2026-06-12",
    updatedAt: "2026-07-01",
    featured: true,
    hasFaq: false,
    related: ["banchan-storage", "scallion-garlic-storage"]
  },
  {
    slug: "meat-storage",
    title: "육류 손질 후 보관, 냉동실 활용하는 기본 원칙",
    summary:
      "육류는 손질 방식에 따라 냉동 후 품질 차이가 크게 납니다. 초보자가 따라 하기 쉬운 손질·보관 순서를 정리했습니다.",
    category: "ingredients",
    publishedAt: "2026-06-19",
    updatedAt: "2026-06-19",
    featured: false,
    hasFaq: false,
    related: ["cutting-board-hygiene", "vegetable-storage"]
  },
  {
    slug: "expiry-vs-best-before",
    title: "유통기한과 소비기한 차이, 식재료 폐기 기준 잡기",
    summary:
      "유통기한이 지났다고 바로 버려야 하는 건 아닙니다. 소비기한과의 차이를 이해하면 불필요한 폐기를 줄일 수 있습니다.",
    category: "ingredients",
    publishedAt: "2026-06-26",
    updatedAt: "2026-07-02",
    featured: true,
    hasFaq: true,
    related: ["vegetable-storage", "egg-freshness-storage"]
  },
  {
    slug: "jangajji-brine-ratio",
    title: "장아찌 만들 때 소금물 비율과 숙성 기간",
    summary:
      "장아찌가 너무 짜거나 금방 물러지는 건 대부분 소금물 비율과 숙성 기간 때문입니다. 기본 비율을 정리했습니다.",
    category: "banchan",
    publishedAt: "2026-03-15",
    updatedAt: "2026-03-15",
    featured: false,
    hasFaq: true,
    related: ["banchan-storage", "mu-saengchae"]
  },
  {
    slug: "muchim-timing",
    title: "나물무침, 미리 무쳐두면 안 되는 이유",
    summary:
      "나물무침을 미리 무쳐두면 시간이 지날수록 물이 생기고 간이 변합니다. 무치는 타이밍을 정리했습니다.",
    category: "banchan",
    publishedAt: "2026-04-18",
    updatedAt: "2026-04-18",
    featured: false,
    hasFaq: false,
    related: ["mu-saengchae", "banchan-storage"]
  },
  {
    slug: "one-bowl-balance",
    title: "덮밥 메뉴 균형 잡기, 초보자를 위한 기본 비율",
    summary:
      "덮밥은 밥과 소스 비율, 재료 구성에 따라 완성도가 크게 달라집니다. 초보자가 참고할 기본 균형을 정리했습니다.",
    category: "one-dish",
    publishedAt: "2026-04-29",
    updatedAt: "2026-06-10",
    featured: true,
    hasFaq: false,
    related: ["measuring-habit", "kimchi-bokkeumbap"]
  },
  {
    slug: "ramen-add-ins-order",
    title: "라면에 넣는 부재료, 순서에 따라 달라지는 맛",
    summary:
      "같은 재료를 넣어도 순서에 따라 라면 맛이 달라집니다. 부재료를 넣는 기본 순서를 정리했습니다.",
    category: "one-dish",
    publishedAt: "2026-05-20",
    updatedAt: "2026-05-20",
    featured: false,
    hasFaq: false,
    related: ["basic-broth", "heat-control"]
  },
  {
    slug: "fridge-cleanout",
    title: "냉장고 파먹기, 남은 재료로 반찬 만드는 기준",
    summary:
      "냉장고에 조금씩 남은 재료를 활용하는 기준을 정리했습니다. 자취요리에서 특히 유용한 접근법입니다.",
    category: "beginner",
    publishedAt: "2026-05-27",
    updatedAt: "2026-07-04",
    featured: true,
    hasFaq: false,
    related: ["starter-tools", "vegetable-storage"]
  },
  {
    slug: "recipe-following-mistakes",
    title: "레시피 그대로 따라 해도 자꾸 실패하는 이유",
    summary:
      "레시피를 그대로 따랐는데도 결과가 다르다면, 재료 상태나 조리 환경 차이를 점검할 필요가 있습니다.",
    category: "beginner",
    publishedAt: "2026-06-08",
    updatedAt: "2026-06-08",
    featured: false,
    hasFaq: false,
    related: ["measuring-habit", "heat-control"]
  },
  {
    slug: "container-guide",
    title: "밀폐용기 고르는 기준과 세척·보관 요령",
    summary:
      "밀폐용기는 재질과 용도에 따라 관리 방식이 다릅니다. 고르는 기준과 세척·보관 요령을 정리했습니다.",
    category: "kitchen-tools",
    publishedAt: "2026-06-15",
    updatedAt: "2026-06-15",
    featured: false,
    hasFaq: true,
    related: ["pan-coating-care", "knife-care"]
  },
  {
    slug: "dishcloth-hygiene",
    title: "행주·수세미 위생 관리, 교체 주기",
    summary:
      "행주와 수세미는 주방에서 세균이 가장 빨리 번식하는 도구 중 하나입니다. 관리 습관과 교체 주기를 정리했습니다.",
    category: "kitchen-tools",
    publishedAt: "2026-06-22",
    updatedAt: "2026-06-22",
    featured: false,
    hasFaq: false,
    related: ["cutting-board-hygiene", "knife-care"]
  },
  {
    slug: "scallion-garlic-storage",
    title: "자주 남는 대파·마늘, 손질해서 오래 보관하는 법",
    summary:
      "대파와 마늘은 손질 방식에 따라 보관 기간이 크게 달라집니다. 오래 두고 쓰는 손질법을 정리했습니다.",
    category: "ingredients",
    publishedAt: "2026-06-29",
    updatedAt: "2026-07-03",
    featured: true,
    hasFaq: true,
    related: ["vegetable-storage", "meat-storage"]
  },
  {
    slug: "egg-freshness-storage",
    title: "달걀 보관과 신선도 확인하는 법",
    summary:
      "달걀은 보관 위치와 방식에 따라 신선도 유지 기간이 달라집니다. 신선도를 확인하는 기본 방법도 함께 정리했습니다.",
    category: "ingredients",
    publishedAt: "2026-07-04",
    updatedAt: "2026-07-04",
    featured: false,
    hasFaq: true,
    related: ["expiry-vs-best-before", "vegetable-storage"]
  },
  {
    slug: "jorim-heat-control",
    title: "콩자반·조림류가 자꾸 타는 이유와 불 조절법",
    summary:
      "콩자반이나 조림 요리가 자꾸 바닥에 눌어붙거나 타는 건 대부분 불 세기와 뚜껑 사용 방식 때문입니다. 초보자가 놓치기 쉬운 불 조절 기본 원칙을 정리했습니다.",
    category: "banchan",
    publishedAt: "2026-07-05",
    updatedAt: "2026-07-05",
    featured: false,
    hasFaq: true,
    related: ["heat-control", "banchan-storage"]
  },
  {
    slug: "egg-fried-rice-coating",
    title: "계란볶음밥 팍팍해지지 않게 만드는 법",
    summary:
      "계란볶음밥이 자꾸 팍팍하고 밥알이 따로 노는 건 계란 코팅 순서와 기름 온도 때문인 경우가 많습니다. 고슬고슬하면서도 촉촉한 계란볶음밥을 만드는 기본 순서를 정리했습니다.",
    category: "one-dish",
    publishedAt: "2026-07-05",
    updatedAt: "2026-07-05",
    featured: false,
    hasFaq: true,
    related: ["bokkeumbap-rice", "heat-control"]
  },
  {
    slug: "measuring-spoon-rice-spoon",
    title: "계량스푼과 밥숟가락, 헷갈리면 간이 달라지는 이유",
    summary:
      "레시피의 '1큰술'을 밥숟가락으로 재는 건 자취요리 초반에 흔한 계량 실수입니다. 계량스푼과 밥숟가락의 용량 차이와 대체 기준을 정리했습니다.",
    category: "beginner",
    publishedAt: "2026-07-05",
    updatedAt: "2026-07-05",
    featured: false,
    hasFaq: true,
    related: ["measuring-habit", "starter-tools"]
  },
  {
    slug: "wooden-cutting-board-care",
    title: "나무도마 갈라지는 이유와 관리법",
    summary:
      "나무도마가 마르면서 갈라지는 건 대부분 건조 방식과 오일링 관리 주기 때문입니다. 갈라짐을 줄이는 기본 관리법을 정리했습니다.",
    category: "kitchen-tools",
    publishedAt: "2026-07-05",
    updatedAt: "2026-07-05",
    featured: false,
    hasFaq: true,
    related: ["cutting-board-hygiene", "pan-coating-care"]
  },
  {
    slug: "tofu-storage",
    title: "두부 보관과 남았을 때 활용법",
    summary:
      "두부를 다 먹지 못하고 남았을 때 어떻게 보관해야 오래 신선하게 쓸 수 있는지 헷갈리는 경우가 많습니다. 보관수 교체 주기와 활용법을 정리했습니다.",
    category: "ingredients",
    publishedAt: "2026-07-06",
    updatedAt: "2026-07-06",
    featured: false,
    hasFaq: true,
    related: ["vegetable-storage", "meat-storage"]
  },
  {
    slug: "mushroom-storage",
    title: "버섯류 보관법, 물러지지 않게 하는 법",
    summary:
      "버섯은 습기에 특히 약해 보관 방식을 잘못 잡으면 금방 물러지고 미끈거립니다. 습기 관리와 보관 용기 선택 기준을 정리했습니다.",
    category: "ingredients",
    publishedAt: "2026-07-06",
    updatedAt: "2026-07-06",
    featured: false,
    hasFaq: true,
    related: ["vegetable-storage", "container-guide"]
  },
  {
    slug: "jeotgal-salt-ratio",
    title: "젓갈로 만드는 밑반찬, 짠맛 조절하는 기준",
    summary:
      "젓갈로 무치거나 볶는 밑반찬은 젓갈 자체의 염도가 제품마다 크게 달라 같은 양을 넣어도 짠맛 차이가 큽니다. 젓갈 종류별 염도 차이를 확인하고 희석하는 기준을 정리했습니다.",
    category: "banchan",
    publishedAt: "2026-07-07",
    updatedAt: "2026-07-07",
    featured: false,
    hasFaq: true,
    related: ["jangajji-brine-ratio", "banchan-storage"]
  },
  {
    slug: "janchi-guksu-storage",
    title: "잔치국수 붇지 않게 삶고 보관하는 법",
    summary:
      "잔치국수는 삶은 뒤 시간이 지나면 면이 붇고 국물과 엉겨 붙기 쉽습니다. 면 삶는 시간과 헹굼, 국물을 따로 보관하는 방법을 정리했습니다.",
    category: "one-dish",
    publishedAt: "2026-07-07",
    updatedAt: "2026-07-07",
    featured: false,
    hasFaq: true,
    related: ["basic-broth", "ramen-add-ins-order"]
  }
];
