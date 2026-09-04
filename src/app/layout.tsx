import type { Metadata } from "next";
import { Orbitron, Lexend, Rubik, Vazirmatn } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/i18n/locale-provider";
import { ScrollProvider } from "@/components/motion/scroll-provider";
import { ar } from "@/content/ar";
import { en } from "@/content/en";

// A geometric, technical display face echoing their own channel-letter
// signage, paired with a plain humanist sans for the spec sheets.
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-orbitron",
});
const lexend = Lexend({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lexend",
});
const rubik = Rubik({
  subsets: ["arabic"],
  weight: ["500", "700", "800"],
  variable: "--font-rubik",
});
const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
  title: "Gravity Auto — the well | Sheikh Zayed, Giza",
  description:
    "Their own name taken literally: a real gravity well warping a grid, built around Gravity Auto's four-car fleet sourced from their own Instagram.",
  metadataBase: new URL("https://gravity-auto-site.vercel.app"),
  icons: { icon: "/mark.svg" },
  openGraph: {
    title: "Gravity Auto — the well",
    description: "A dealership page built around a literal physics concept, sourced from their own Instagram.",
    locale: "en_US",
    type: "website",
  },
  other: { "theme-color": "#26282d" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // translate="no": the page ships hand-written Arabic and English copy,
    // and Chrome's auto-translate rewrites `lang`, which would also break
    // every [dir="rtl"] correction if the CSS were keyed off language.
    <html
      lang="en"
      dir="ltr"
      translate="no"
      className={`notranslate ${orbitron.variable} ${lexend.variable} ${rubik.variable} ${vazirmatn.variable}`}
    >
      <body className="bg-ground text-cream antialiased">
        {/* Content falls into place under an intersection observer, so
            without scripting every block would stay invisible. */}
        <noscript>
          <style>{`[data-infall]{opacity:1!important;transform:none!important;animation:none!important}`}</style>
        </noscript>
        <LocaleProvider dictionaries={{ ar, en }} defaultLocale="en">
          <ScrollProvider />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
