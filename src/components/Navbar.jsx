import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const NAV_LINKS = [
  { name: 'home',     href: '#',         pid: '00' },
  { name: 'about',    href: '#about',    pid: '01' },
  { name: 'projects', href: '#projects', pid: '02' },
  { name: 'contact',  href: '#contact',  pid: '03' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [time, setTime]           = useState('00:00:00');
  const [active, setActive]       = useState('00');
  const navRef    = useRef(null);
  const menuRef   = useRef(null);

  /* live clock */
  useEffect(() => {
    const tick = () => setTime(new Date().toTimeString().slice(0,8));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  /* scroll */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  /* entrance */
  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.4 }
    );
  }, []);

  /* mobile menu slide */
  useEffect(() => {
    if (!menuRef.current) return;
    gsap.to(menuRef.current, {
      y: menuOpen ? 0 : '-100%',
      duration: 0.35,
      ease: menuOpen ? 'power3.out' : 'power3.in',
    });
  }, [menuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        style={{ fontFamily: 'var(--mono)' }}
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
          scrolled ? 'bg-[#060606]/95 backdrop-blur-sm' : 'bg-transparent'
        }`}
      >
        {/* ── status bar ── */}
        <div className="hidden md:flex items-center justify-between px-6 py-1 border-b border-[var(--border)]">
          <div className="flex items-center gap-4 text-xs text-[var(--dim)] tracking-widest">
            <span className="text-[var(--red)] opacity-60">▶</span>
            <span>SYSTEM::PORTFOLIO</span>
            <span className="text-[var(--dim)]">/</span>
            <span>USER::YASH_YADAV</span>
            <span className="text-[var(--dim)]">/</span>
            <span>BUILD::v1.0.0</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="text-[var(--mid)]">MEM:OK</span>
            <span className="text-[var(--dim)]">|</span>
            <span className="text-[var(--red)] tracking-widest">{time}<span className="blink">_</span></span>
          </div>
        </div>

        {/* ── main row ── */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-[var(--border)]">

          {/* logo */}
          <a href="#" className="group flex items-center gap-2">
            <span className="text-[var(--dim)] text-xs">&lt;</span>
            <span
              className="text-sm font-bold tracking-tight text-[var(--white)] group-hover:text-[var(--red)] transition-colors duration-200"
              style={{ fontFamily: 'var(--display)' }}
            >
              YY
            </span>
            <span className="text-[var(--dim)] text-xs">/&gt;</span>
            <span className="hidden sm:block text-xs text-[var(--dim)] tracking-[0.25em] ml-2 uppercase">
              yash.dev
            </span>
          </a>

          {/* desktop links */}
          <div className="hidden md:flex items-center">
            {NAV_LINKS.map((l, i) => (
              <a
                key={l.name}
                href={l.href}
                onClick={() => setActive(l.pid)}
                className={`relative px-5 py-2 text-sm tracking-[0.18em] uppercase transition-colors duration-150 group ${
                  active === l.pid
                    ? 'text-[var(--red)]'
                    : 'text-[var(--mid)] hover:text-[var(--white)]'
                }`}
              >
                <span className="text-xs text-[var(--dim)] mr-1">{l.pid}.</span>
                {l.name}
                {/* active underline */}
                {active === l.pid && (
                  <span className="absolute bottom-0 left-4 right-4 h-px bg-[var(--red)]" />
                )}
                {/* hover underline */}
                <span className="absolute bottom-0 left-4 right-4 h-px bg-[var(--dim)] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden md:flex items-center gap-2 px-4 py-1.5 text-xs tracking-[0.2em] uppercase text-[var(--red)] border border-[var(--red-border)] hover:bg-[var(--red-glow)] hover:border-[var(--red)] transition-all duration-200"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--red)] animate-pulse" />
              hire_me()
            </a>

            {/* mobile toggle */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="md:hidden text-sm text-[var(--mid)] hover:text-[var(--red)] transition-colors tracking-widest"
            >
              {menuOpen ? '[close]' : '[menu]'}
            </button>
          </div>
        </div>
      </nav>

      {/* ── mobile fullscreen menu ── */}
      <div
        ref={menuRef}
        style={{ fontFamily: 'var(--mono)', transform: 'translateY(-100%)' }}
        className="fixed inset-0 z-40 bg-[#060606] flex flex-col pt-24 px-6"
      >
        <p className="text-xs text-[var(--dim)] tracking-widest mb-8">// NAVIGATION</p>
        {NAV_LINKS.map(l => (
          <a
            key={l.name}
            href={l.href}
            onClick={() => { setMenuOpen(false); setActive(l.pid); }}
            className="flex items-center gap-4 py-5 border-b border-[var(--border)] text-[var(--mid)] hover:text-[var(--red)] transition-colors duration-200 group"
          >
            <span className="text-xs text-[var(--dim)] w-6">{l.pid}</span>
            <span className="text-lg tracking-widest uppercase">{l.name}</span>
            <span className="ml-auto text-[var(--dim)] group-hover:text-[var(--red)] transition-colors">→</span>
          </a>
        ))}
        <a
          href="mailto:yashyadav1.dev@email.com"
          className="mt-8 flex items-center justify-center gap-2 py-4 border border-[var(--red-border)] text-[var(--red)] text-xs tracking-widest uppercase hover:bg-[var(--red-glow)] transition-all"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--red)] animate-pulse" />
          hire_me()
        </a>
      </div>
    </>
  );
}