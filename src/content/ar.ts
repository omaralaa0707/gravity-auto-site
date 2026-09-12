import type { GravityContent } from "./schema-ext";
import { PROFILE } from "./media";

export const ar: GravityContent = {
  locale: "ar",
  dir: "rtl",

  brand: {
    name: "جرافيتي أوتو",
    shortName: "GA",
    tagline: "Drive The Future — Today",
  },

  nav: [
    { label: "الأسطول", href: "#fleet" },
    { label: "الحساب", href: "#account" },
    { label: "زوروهم", href: "#contact" },
  ],

  hero: {
    eyebrow: "الشيخ زايد · الجيزة",
    headline: "Drive The Future — Today",
    sub: "اسم جرافيتي أوتو نفسه مصطلح فيزياء، فالصفحة دي أخدته بالحرف: بئر جاذبية حقيقي بيلوي شبكة زي ما الكتلة بتلوي الفضاء. أسطولهم الحقيقي أربع عربيات — BYD وVolvo وBMW ومرسيدس — كل واحدة عمرها أقل من سنة أو مستوردة جديدة، وكل واحدة اتنشرت 3 مرات على حساب متابعينه 207 بس.",
    primaryCta: "اتصل بالمعرض",
    secondaryCta: "شاهد الأسطول",
    followersLabel: "متابع",
    postsLabel: "منشور",
    wellAlt: "بئر جاذبية حقيقي: شبكة ملتوية لأسفل حول كتلة، زي ما الزمكان بينحني — مبني ليطابق اسم صاحب المعرض نفسه.",
  },

  about: { heading: "جرافيتي أوتو", body: [] },
  services: { heading: "الأسطول", items: [] },
  gallery: { heading: "الأسطول", items: [] },

  fleet: {
    eyebrow: "الأسطول",
    heading: "أربع عربيات، كل واحدة اتنشرت 3 مرات",
    intro: "كل إعلان هنا اتنشر 3 مرات منفصلة بصور مختلفة كل مرة — 12 منشور، أربع عربيات. الأرقام هي بالظبط اللي كل كابشن قاله، مفيش رقم منقول من إعلان لتاني.",
    figuresLabel: "الأرقام المنشورة",
    viewPost: "شاهد منشور",
    specLabels: {
      motor: "المحرك",
      power: "القوة",
      mileage: "العداد",
      range: "المدى",
      warranty: "الضمان",
      status: "الحالة",
    },
    cars: {
      sealion: {
        figures: [
          { label: "status", value: "كسر زيرو، استيراد" },
          { label: "range", value: "605 كم" },
        ],
      },
      xc60: {
        figures: [
          { label: "motor", value: "2000 سي سي" },
          { label: "power", value: "250 حصان" },
          { label: "mileage", value: "5,000 كم" },
        ],
      },
      bmw235: {
        figures: [
          { label: "motor", value: "2000 سي سي" },
          { label: "power", value: "300 حصان" },
          { label: "mileage", value: "400 كم" },
          { label: "warranty", value: "ضمان محلي" },
        ],
      },
      c180: {
        figures: [
          { label: "motor", value: "1500 سي سي" },
          { label: "power", value: "156 حصان" },
          { label: "mileage", value: "1,700 كم" },
        ],
      },
    },
  },

  account: {
    eyebrow: "الحساب",
    heading: "أصغر جمهور اتصدر منه موقع في السلسلة دي",
    body: [
      "207 متابع، 375 منشور — أصغر حساب يبني عليه موقع في السلسلة دي لحد دلوقتي، أصغر حتى من معرض بـ516 متابع اتصدرت منه المواقع قبل كده. صغير مش معناه ضعيف: كل إعلان فيه سطر مواصفات حقيقي، وكل عربية في العينة موديل 2024 أو أحدث وعدادها أقل من 5,000 كم.",
      "كابشن الـVolvo بيكتب كلمة \"Mototr\" في الثلاث منشورات بنفس الغلطة — غلطة إملائية متكررة بالظبط، مش متصلحة هنا، لأنها كلامهم هما بالحرف.",
    ],
  },

  contact: {
    heading: "زوروهم",
    addressLabel: "العنوان",
    address: PROFILE.addressAr,
    phoneLabel: "التليفون",
    phones: [PROFILE.mainPhone],
    mapsUrl: PROFILE.maps,
    instagramUrl: PROFILE.instagram,
    facebookUrl: PROFILE.facebook,
    cta: "اتصل بالمعرض",
  },

  footer: {
    rights: "© جرافيتي أوتو. كل الحقوق محفوظة.",
  },

  a11y: {
    toggleLanguage: "Switch to English",
    openMenu: "افتح القائمة",
    closeMenu: "أغلق القائمة",
  },
};
