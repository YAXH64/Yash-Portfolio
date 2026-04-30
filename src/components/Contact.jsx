import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SOCIALS = [
  {
    pid: 'P001', name: 'GitHub', handle: 'github.com/yaxh64',
    href: 'https://github.com/yaxh64', status: 'ACTIVE',
    icon: (<svg viewBox="0 0 19 19" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844" clipRule="evenodd"/></svg>),
  },
  {
    pid: 'P002', name: 'LinkedIn', handle: 'linkedin.com/in/yashyadav-dev',
    href: 'https://linkedin.com/in/yashyadav-dev', status: 'ACTIVE',
    icon: (<svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>),
  },
  {
    pid: 'P003', name: 'Email', handle: 'yashyadav1.dev@gmail.com',
    href: 'mailto:yashyadav1.dev@gmail.com', status: 'OPEN',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>),
  },
];

function TermInput({ id, label, type = 'text', textarea = false, required = false, rows = 4 }) {
  const [focused, setFocused] = useState(false);
  const [filled,  setFilled]  = useState(false);
  const Tag = textarea ? 'textarea' : 'input';

  return (
    <div className="relative">
      <label htmlFor={id}
        className={`block text-xs tracking-[0.2em] uppercase mb-2 transition-colors duration-200 ${focused ? 'text-[var(--red)]' : 'text-[var(--dim)]'}`}
      >
        <span className="text-[var(--red)] mr-1">$</span>{label}
      </label>
      <Tag
        id={id} type={type} required={required} rows={textarea ? rows : undefined}
        onFocus={() => setFocused(true)}
        onBlur={e => { setFocused(false); setFilled(e.target.value.length > 0); }}
        className={`w-full bg-transparent border-b text-[var(--bright)] text-sm py-2.5 outline-none resize-none transition-colors duration-200 placeholder-[var(--dim)] ${focused ? 'border-[var(--red)]' : filled ? 'border-[var(--mid)]' : 'border-[var(--border)]'}`}
        style={{ fontFamily: 'var(--mono)' }}
        placeholder={`enter ${label.toLowerCase()}...`}
      />
      {focused && <span className="absolute right-0 bottom-2.5 text-[var(--red)] blink text-sm pointer-events-none">_</span>}
    </div>
  );
}

export default function Contact() {
  const sectionRef = useRef(null);
  const leftRef    = useRef(null);
  const rightRef   = useRef(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
      });
      tl.fromTo(leftRef.current,  { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' })
        .fromTo(rightRef.current, { opacity: 0, x:  40 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full bg-[var(--bg)] grid-bg overflow-hidden pt-24 pb-0 px-6 md:px-12 lg:px-20"
      style={{ fontFamily: 'var(--mono)' }}
    >
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] rounded-full blur-[140px] pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(ellipse, var(--red) 0%, transparent 70%)' }}
      />

      {/* section label */}
      <div className="flex items-center gap-3 mb-14 max-w-[90rem] mx-auto">
        <span className="text-[var(--red)] text-xs tracking-widest">03.</span>
        <div className="h-px w-[60px] bg-[var(--red)]" />
        <span className="text-xs text-[var(--dim)] tracking-[0.3em] uppercase">contact.sh</span>
        <div className="h-px flex-1 bg-[var(--border)]" />
      </div>

      {/* ── BOTH cols stretch to same height ── */}
      <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-10 lg:gap-16 items-stretch">

        {/* ── LEFT ── */}
        <div ref={leftRef} className="flex flex-col gap-7">

          <div>
            <h2
              className="text-[clamp(3rem,8vw,5rem)] font-black tracking-tighter leading-none text-[var(--white)] mb-5"
              style={{ fontFamily: 'var(--display)' }}
            >
              LET'S<br />
              <span className="text-[var(--red)]">CONNECT</span>
            </h2>
            <p className="text-[var(--mid)] text-base leading-[1.85]">
              Have a project in mind, want to collaborate, or just want to talk tech?
              My inbox is open — I respond fast.
            </p>
          </div>

          {/* process table */}
          <div>
            <p className="text-xs text-[var(--dim)] tracking-widest mb-3">// active_connections.ps</p>
            <div className="grid grid-cols-[2.5rem_1fr_3.5rem] gap-3 text-xs text-[var(--dim)] tracking-widest border-b border-[var(--border)] pb-2">
              <span>PID</span><span>PROCESS</span><span className="text-right">STAT</span>
            </div>
            {SOCIALS.map(s => (
              <a key={s.pid} href={s.href}
                target={s.name !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="grid grid-cols-[2.5rem_1fr_3.5rem] gap-3 items-center py-3.5 border-b border-[var(--border)] group hover:bg-[#0d0d0d] transition-colors duration-150"
              >
                <span className="text-xs text-[var(--dim)] tracking-widest">{s.pid}</span>
                <div className="flex items-center gap-3">
                  <span className="text-[var(--dim)] group-hover:text-[var(--red)] transition-colors duration-200 shrink-0">{s.icon}</span>
                  <div className="min-w-0">
                    <p className="text-sm text-[var(--bright)] group-hover:text-[var(--white)] transition-colors">{s.name}</p>
                    <p className="text-xs text-[var(--dim)] mt-0.5 truncate">{s.handle}</p>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-1.5">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${s.status === 'OPEN' ? 'bg-[var(--red)] animate-pulse' : 'bg-green-500'}`} />
                  <span className="text-xs tracking-widest text-[var(--dim)] hidden sm:block">{s.status}</span>
                </div>
              </a>
            ))}
          </div>

          {/* availability — flex-1 so it fills remaining left height */}
          <div className="border border-[var(--border)] bg-[var(--bg2)] p-5 flex-1 flex flex-col">
            <p className="text-xs text-[var(--dim)] tracking-widest mb-4">// availability.status</p>
            <div className="space-y-3 flex-1">
              {[
                { k: 'freelance',     v: 'true',           red: true },
                { k: 'full_time',     v: 'open_to',        red: true },
                { k: 'response_time', v: '"within 24h"'              },
                { k: 'timezone',      v: '"IST (UTC+5:30)"'          },
                { k: 'preferred',     v: '"Frontend / Full-Stack"'   },
                { k: 'collab_type',   v: '"Remote / Hybrid"'         },
              ].map(row => (
                <p key={row.k} className="text-sm">
                  <span className="text-blue-400">"{row.k}"</span>
                  <span className="text-[var(--dim)]">: </span>
                  <span className={row.red ? 'text-[var(--red)]' : 'text-green-400'}>{row.v}</span>
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: form stretches to fill full height of left col ── */}
        <div ref={rightRef} className="flex flex-col">
          <div className="border border-[var(--border)] bg-[var(--bg2)] p-6 md:p-8 flex flex-col flex-1">

            {/* terminal bar */}
            <div className="flex items-center gap-2 mb-7 pb-4 border-b border-[var(--border)]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#333]" />
                <div className="w-3 h-3 rounded-full bg-[#333]" />
                <div className="w-3 h-3 rounded-full bg-[var(--red)] opacity-70" />
              </div>
              <span className="ml-3 text-xs text-[var(--dim)] tracking-widest">send_message.sh — bash</span>
            </div>

            {sent ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
                <span className="text-[var(--red)] text-3xl font-black" style={{ fontFamily: 'var(--display)' }}>MSG_SENT ✓</span>
                <p className="text-sm text-[var(--dim)] tracking-widest">
                  <span className="text-[var(--red)] mr-1">$</span>Message transmitted. I'll respond within 24h.
                </p>
                <span className="text-sm text-[var(--dim)] blink">_</span>
              </div>
            ) : (
              /* form fills full height of the card */
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1">
                <p className="text-xs text-[var(--dim)] tracking-widest">
                  <span className="text-[var(--red)]">$</span> ./init_contact.sh
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <TermInput id="name"  label="name"  required />
                  <TermInput id="email" label="email" type="email" required />
                </div>

                <TermInput id="subject" label="subject" />

                {/* message textarea grows to fill remaining space */}
                <div className="flex-1 flex flex-col">
                  <label htmlFor="message"
                    className="block text-xs tracking-[0.2em] uppercase mb-2 text-[var(--dim)]"
                  >
                    <span className="text-[var(--red)] mr-1">$</span>message
                  </label>
                  <textarea
                    id="message" required
                    className="flex-1 w-full bg-[#0a0a0a] border border-[var(--border)] text-[var(--bright)] text-sm p-3 outline-none resize-none transition-colors duration-200 placeholder-[var(--dim)] focus:border-[var(--red)] min-h-[140px]"
                    style={{ fontFamily: 'var(--mono)' }}
                    placeholder="enter message..."
                  />
                </div>

                {/* highlighted submit button */}
                <button
                  type="submit"
                  className="group relative w-full py-4 bg-[var(--red)] text-black text-sm tracking-[0.2em] uppercase font-black hover:bg-white transition-colors duration-200 overflow-hidden shadow-[0_0_24px_rgba(255,45,45,0.4)]"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700" />
                  <span className="relative flex items-center justify-center gap-3">
                    execute_send()
                    <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </span>
                </button>

                <p className="text-xs text-[var(--dim)] tracking-widest text-center">
                  // encrypted · no spam · reply within 24h
                </p>
              </form>
            )}
          </div>
        </div>

      </div>

      {/* footer */}
      <div className="max-w-[90rem] mx-auto mt-16 py-5 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-[var(--dim)] tracking-widest">© 2026 YASH_YADAV — ALL RIGHTS RESERVED</p>
        <p className="text-xs text-[var(--dim)] tracking-widest">BUILT_WITH:: React · Three.js · GSAP · Tailwind</p>
        <a href="#" className="text-xs text-[var(--dim)] tracking-widest hover:text-[var(--red)] transition-colors duration-200">BACK_TO_TOP ↑</a>
      </div>
    </section>
  );
}