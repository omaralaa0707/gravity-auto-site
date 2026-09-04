"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactElement,
  type ReactNode,
} from "react";
import { useLocale } from "@/i18n/locale-provider";
import { useGravity } from "@/content/schema-ext";
import { FLEET, PROFILE, type FleetCar } from "@/content/media";
import { GravityWell } from "@/components/webgl/gravity-well";

/* ---------------------------------------------------------------- motion -- */

function useOnScreen<T extends HTMLElement>(rootMargin = "-6% 0px -6% 0px") {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reveal = () => node.setAttribute("data-seen", "");
    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          reveal();
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [rootMargin]);
  return ref;
}

const delayVar = (d: number) => ({ "--infall-delay": `${d}ms` }) as CSSProperties;

/** This site's arrival: infall. A block drops in from slightly above,
 * accelerating rather than easing, dips a touch past rest and recovers —
 * the way a mass actually falls into a well. */
function Infall({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const ref = useOnScreen<HTMLElement>();
  const C = Tag as unknown as (p: Record<string, unknown>) => ReactElement;
  return (
    <C ref={ref} data-infall="" className={className} style={delayVar(delay)}>
      {children}
    </C>
  );
}

/* ------------------------------------------------------------------- nav -- */

function MarkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" pathLength={100} strokeDasharray="76 24" strokeDashoffset="-4" />
      <path d="M 50,34 L 76,82 L 60,82 L 50,58 L 40,82 L 24,82 Z" fill="currentColor" />
    </svg>
  );
}

export function Nav() {
  const c = useGravity();
  const { locale, toggleLocale } = useLocale();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ground-3/70 bg-ground/90 backdrop-blur-md">
      <div className="mx-auto flex h-[4.2rem] max-w-6xl items-center justify-between px-5 lg:px-8">
        <a href="#top" className="flex shrink-0 items-center gap-2.5" aria-label={c.brand.name}>
          <MarkIcon className="h-7 w-7 text-steel" />
          <span className="font-display text-[1rem] text-cream">{c.brand.name}</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {c.nav.map((link) => (
            <a key={link.href} href={link.href} className="fine text-cream-2 transition-colors hover:text-cream">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={PROFILE.mainPhoneHref} className="latin tnum hidden text-[0.86rem] text-cream-2 sm:block">
            {PROFILE.mainPhone}
          </a>
          <button
            onClick={toggleLocale}
            className="label rounded-none border border-ground-3 px-2.5 py-1.5 text-steel transition-colors hover:border-steel"
            aria-label={c.a11y.toggleLanguage}
          >
            {locale === "en" ? "ع" : "EN"}
          </button>
          <button
            className="border border-ground-3 p-2 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? c.a11y.closeMenu : c.a11y.openMenu}
          >
            <span className="block h-[1.5px] w-4 bg-cream" />
            <span className="mt-1 block h-[1.5px] w-4 bg-cream" />
          </button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-ground-3/70 bg-ground px-5 py-3 md:hidden">
          {c.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-2 text-[0.92rem] text-cream-2"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------ hero -- */

function Hero() {
  const c = useGravity();
  return (
    <section id="top" className="relative overflow-hidden pt-[4.2rem]">
      <div className="mx-auto max-w-6xl px-5 pt-14 pb-16 lg:px-8 lg:pt-20 lg:pb-24">
        <Infall as="p" className="label text-steel">
          {c.hero.eyebrow}
        </Infall>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <Infall as="h1" className="text-hero font-display max-w-[16ch] text-cream" delay={60}>
              {c.hero.headline}
            </Infall>
            <Infall className="text-lead mt-7 max-w-[50ch] leading-[1.85] text-cream-2" delay={140}>
              {c.hero.sub}
            </Infall>
            <Infall className="mt-9 flex flex-wrap items-center gap-3" delay={220}>
              <a
                href={PROFILE.mainPhoneHref}
                className="bg-steel px-6 py-3 text-[0.9rem] font-medium text-ground transition-opacity hover:opacity-85"
              >
                {c.hero.primaryCta}
              </a>
              <a
                href="#fleet"
                className="border border-ground-3 px-6 py-3 text-[0.9rem] text-cream transition-colors hover:border-steel"
              >
                {c.hero.secondaryCta}
              </a>
            </Infall>
            <Infall className="mt-10 flex items-center gap-10 border-t border-ground-3 pt-6" delay={280}>
              <div>
                <div className="tnum text-[1.6rem] text-cream">{PROFILE.followers}</div>
                <div className="label mt-1 text-cream-2">{c.hero.followersLabel}</div>
              </div>
              <div>
                <div className="tnum text-[1.6rem] text-cream">{PROFILE.posts}</div>
                <div className="label mt-1 text-cream-2">{c.hero.postsLabel}</div>
              </div>
            </Infall>
          </div>
          <Infall delay={100} className="relative aspect-square w-full">
            <GravityWell className="h-full w-full" alt={c.hero.wellAlt} />
          </Infall>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ fleet -- */

function FleetCard({ car, index }: { car: FleetCar; index: number }) {
  const c = useGravity();
  const copy = c.fleet.cars[car.id];

  return (
    <Infall as="article" className="border-t border-ground-3 pt-10 first:border-t-0 first:pt-0" delay={(index % 2) * 70}>
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <div>
          <div className="aspect-[4/3] overflow-hidden bg-ground-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={car.frames[0]} alt={`${car.marque} ${car.model}`} className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="mt-2.5 grid grid-cols-2 gap-2.5">
            {car.frames.slice(1).map((src) => (
              <div key={src} className="aspect-[4/3] overflow-hidden bg-ground-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`${car.marque} ${car.model} detail`} className="h-full w-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="label text-steel">{String(index + 1).padStart(2, "0")}</div>
          <h3 className="font-display latin mt-2 text-[1.4rem] text-cream">
            {car.marque} {car.model}
            {car.year && <span className="tnum text-cream-2"> · {car.year}</span>}
          </h3>

          {copy.figures.length > 0 && (
            <div className="mt-6 divide-y divide-ground-3 border-y border-ground-3">
              {copy.figures.map((row) => (
                <div key={row.label} className="flex items-baseline justify-between gap-4 py-2.5">
                  <span className="fine text-cream-2">{c.fleet.specLabels[row.label]}</span>
                  <span className="latin tnum text-right text-[0.94rem] text-cream">{row.value}</span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            {car.postUrls.map((url, i) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noreferrer noopener"
                className="fine inline-block text-cream underline decoration-cream/30 underline-offset-4 transition-colors hover:text-steel"
              >
                {c.fleet.viewPost} {i + 1}
              </a>
            ))}
          </div>
        </div>
      </div>
    </Infall>
  );
}

function Fleet() {
  const c = useGravity();
  return (
    <section id="fleet" className="border-t border-ground-3/70 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Infall as="p" className="label text-steel">
          {c.fleet.eyebrow}
        </Infall>
        <Infall as="h2" className="text-display font-display mt-4 max-w-[22ch] text-cream" delay={60}>
          {c.fleet.heading}
        </Infall>
        <Infall className="text-lead mt-5 max-w-[62ch] leading-[1.85] text-cream-2" delay={120}>
          {c.fleet.intro}
        </Infall>

        <div className="mt-14 space-y-14">
          {FLEET.map((car, i) => (
            <FleetCard key={car.id} car={car} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- account -- */

function Account() {
  const c = useGravity();
  return (
    <section id="account" className="border-t border-ground-3/70 py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Infall as="p" className="label text-steel">
          {c.account.eyebrow}
        </Infall>
        <Infall as="h2" className="text-display font-display mt-4 max-w-[22ch] text-cream" delay={60}>
          {c.account.heading}
        </Infall>
        <Infall className="mt-8 max-w-[62ch] space-y-5" delay={120}>
          {c.account.body.map((p, i) => (
            <p key={i} className="text-[0.96rem] leading-relaxed text-cream-2">
              {p}
            </p>
          ))}
        </Infall>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- contact -- */

function Contact() {
  const c = useGravity();
  return (
    <section id="contact" className="border-t border-ground-3/70 py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Infall as="h2" className="text-display font-display max-w-[16ch] text-cream">
          {c.contact.heading}
        </Infall>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <Infall delay={60}>
            <div className="label text-steel">{c.contact.addressLabel}</div>
            <p className="mt-3 text-[0.94rem] leading-relaxed text-cream-2">{c.contact.address}</p>
            <a
              href={c.contact.mapsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="fine mt-3 inline-block text-cream underline decoration-cream/40 underline-offset-4"
            >
              Google Maps
            </a>
          </Infall>

          <Infall delay={130}>
            <div className="label text-steel">{c.contact.phoneLabel}</div>
            <a
              href={PROFILE.mainPhoneHref}
              className="latin tnum mt-3 block text-[1.05rem] text-cream transition-opacity hover:opacity-75"
            >
              {PROFILE.mainPhone}
            </a>
          </Infall>

          <Infall delay={200}>
            <div className="label text-steel">{c.brand.name}</div>
            <div className="mt-3 flex flex-col gap-2 text-[0.9rem]">
              <a
                href={c.contact.instagramUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-cream-2 underline decoration-cream/30 underline-offset-4 transition-colors hover:text-cream"
              >
                Instagram
              </a>
              <a
                href={c.contact.facebookUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-cream-2 underline decoration-cream/30 underline-offset-4 transition-colors hover:text-cream"
              >
                Facebook
              </a>
            </div>
          </Infall>

          <Infall delay={270}>
            <a
              href={PROFILE.mainPhoneHref}
              className="bg-steel inline-block px-6 py-3 text-[0.9rem] font-medium text-ground transition-opacity hover:opacity-85"
            >
              {c.contact.cta}
            </a>
          </Infall>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- footer -- */

export function Footer() {
  const c = useGravity();
  return (
    <footer className="border-t border-ground-3/70 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div className="flex items-center gap-2.5">
          <MarkIcon className="h-6 w-6 text-steel" />
          <span className="font-display text-[0.92rem] text-cream">{c.brand.name}</span>
        </div>
        <p className="fine max-w-[52ch] text-cream-2/75">{c.footer.disclaimer}</p>
        <p className="fine shrink-0 text-cream-2/60">{c.footer.rights}</p>
      </div>
    </footer>
  );
}

/* --------------------------------------------------------------- sections -- */

export function Sections() {
  return (
    <main>
      <Hero />
      <Fleet />
      <Account />
      <Contact />
    </main>
  );
}
