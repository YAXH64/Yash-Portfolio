import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import imgSpiderman from '../assets/spiderman/20260407_055437.png';
import imgMan from '../assets/man/1775519899126.png';

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  { name: 'HTML / CSS',      level: 90, tag: 'frontend' },
  { name: 'JavaScript',      level: 82, tag: 'frontend' },
  { name: 'React',           level: 78, tag: 'frontend' },
  { name: 'Tailwind CSS',    level: 85, tag: 'frontend' },
  { name: 'GSAP / Three.js', level: 70, tag: 'frontend' },
  { name: 'Python',          level: 75, tag: 'backend'  },
  { name: 'FastAPI',         level: 65, tag: 'backend'  },
  { name: 'PyTorch / HF',    level: 60, tag: 'ai'       },
];

const FACTS = [
  { key: 'name',       val: '"Yash Yadav"' },
  { key: 'role',       val: '"Frontend Developer"' },
  { key: 'location',   val: '"Nashik, India"' },
  { key: 'available',  val: 'true',   red: true },
  { key: 'projects',   val: '4' },
  { key: 'hackathons', val: '2' },
  { key: 'coffee',     val: 'Infinity' },
];

/* extra decorative entries to fill the JSON block */
const EXTRA_FACTS = [
  { key: 'stack',        val: '["React","Python","GSAP","Three.js"]' },
  { key: 'ai_exp',       val: 'true', red: true },
  { key: 'open_source',  val: 'true', red: true },
  { key: 'status',       val: '"Building cool stuff"' },
];

function SkillBar({ skill, index }) {
  const barRef  = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(fillRef.current,
        { width: '0%' },
        {
          width: `${skill.level}%`,
          duration: 1.2,
          ease: 'power3.out',
          delay: index * 0.07,
          scrollTrigger: { trigger: barRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      );
    });
    return () => ctx.revert();
  }, [skill.level, index]);

  const tagColor =
    skill.tag === 'frontend' ? 'text-[var(--red)]' :
    skill.tag === 'ai'       ? 'text-purple-400'   : 'text-blue-400';

  return (
    <div ref={barRef}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={`text-xs tracking-widest ${tagColor} opacity-70`}>[{skill.tag}]</span>
          <span className="text-sm text-[var(--bright)] tracking-wide">{skill.name}</span>
        </div>
        <span className="text-xs text-[var(--mid)]">{skill.level}%</span>
      </div>
      <div className="h-px w-full bg-[var(--border)] relative">
        <div ref={fillRef} className="absolute top-0 left-0 h-px bg-[var(--red)]" style={{ width: 0 }} />
        {[25, 50, 75].map(t => (
          <div key={t} className="absolute top-0 w-px h-2 -translate-y-0.5 bg-[var(--dim)]" style={{ left: `${t}%` }} />
        ))}
      </div>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const leftRef    = useRef(null);
  const rightRef   = useRef(null);
  const maskRef    = useRef(null);
  const imgWrapRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' };
      gsap.fromTo(leftRef.current,  { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: st });
      gsap.fromTo(rightRef.current, { opacity: 0, x:  40 }, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.15, scrollTrigger: st });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleMove = (e) => {
    if (!imgWrapRef.current || !maskRef.current) return;
    const r = imgWrapRef.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width)  * 100;
    const y = ((e.clientY - r.top)  / r.height) * 100;
    gsap.to(maskRef.current, { '--mx': `${x}%`, '--my': `${y}%`, duration: 0.3, ease: 'power2.out' });
  };
  const handleLeave = () =>
    gsap.to(maskRef.current, { '--mx': '50%', '--my': '50%', duration: 0.7, ease: 'power3.out' });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-[var(--bg)] grid-bg overflow-hidden py-24 px-6 md:px-12 lg:px-20"
      style={{ fontFamily: 'var(--mono)' }}
    >
      {/* section label */}
      <div className="flex items-center gap-3 mb-14 max-w-[90rem] mx-auto">
        <span className="text-[var(--red)] text-xs tracking-widest">01.</span>
        <div className="h-px w-[60px] bg-[var(--red)]" />
        <span className="text-xs text-[var(--dim)] tracking-[0.3em] uppercase">about_me.jsx</span>
        <div className="h-px flex-1 bg-[var(--border)]" />
      </div>

      {/* ── grid: left fixed width, right takes rest, BOTH stretch to same height ── */}
      <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-10 lg:gap-16 items-stretch">

        {/* ── LEFT — flex col, stretches full height ── */}
        <div ref={leftRef} className="flex flex-col gap-0">

          {/* portrait — fixed height */}
          <div
            ref={imgWrapRef}
            className="relative w-full overflow-hidden border border-[var(--border)] cursor-crosshair group"
            style={{ height: '420px' }}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
          >
            <img src={imgMan} alt="Yash"
              className="absolute inset-0 w-full h-full object-cover object-top grayscale brightness-50 transition-transform duration-700 group-hover:scale-105"
            />
            <div ref={maskRef} className="absolute inset-0"
              style={{ '--mx': '50%', '--my': '50%', clipPath: 'circle(14% at var(--mx) var(--my))', transition: 'clip-path 0.08s linear' }}
            >
              <img src={imgSpiderman} alt="" className="absolute inset-0 w-full h-full object-cover object-top scale-105" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none">
              <div className="flex items-start justify-between">
                <span className="text-xs text-[var(--dim)] tracking-widest border border-[var(--border)] px-2 py-1 bg-[#060606]/70">IMG_CAPTURE.RAW</span>
                <span className="text-xs text-[var(--red)] tracking-widest">● REC</span>
              </div>
              <div className="border-t border-[var(--border)] pt-3 bg-gradient-to-t from-[#060606] to-transparent px-1 pb-1">
                <p className="text-[var(--white)] text-sm font-bold tracking-widest" style={{ fontFamily: 'var(--display)' }}>YASH YADAV</p>
                <p className="text-[var(--red)] text-xs tracking-widest mt-1">FRONTEND_DEVELOPER</p>
              </div>
            </div>
            <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[var(--red)] opacity-40 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[var(--red)] opacity-40 pointer-events-none" />
          </div>

          {/* profile.json — flex-1 fills ALL remaining left column height */}
          <div className="border border-t-0 border-[var(--border)] bg-[var(--bg2)] p-5 flex-1 flex flex-col">
            <p className="text-xs text-[var(--dim)] tracking-widest mb-3">// profile.json</p>
            <div className="space-y-2 flex-1">
              <p className="text-sm text-[var(--dim)]">{'{'}</p>
              {[...FACTS, ...EXTRA_FACTS].map((f, i, arr) => (
                <p key={f.key} className="text-sm pl-4">
                  <span className="text-blue-400">"{f.key}"</span>
                  <span className="text-[var(--dim)]">: </span>
                  <span className={f.red ? 'text-[var(--red)]' : 'text-green-400'}>{f.val}</span>
                  {i < arr.length - 1 && <span className="text-[var(--dim)]">,</span>}
                </p>
              ))}
              <p className="text-sm text-[var(--dim)]">{'}'}</p>
            </div>
          </div>
        </div>

        {/* ── RIGHT — fills same height as left via items-stretch ── */}
        <div ref={rightRef} className="flex flex-col gap-8">

          {/* bio */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="text-xs text-[var(--dim)] tracking-widest">// bio.txt</span>
              <div className="h-px flex-1 bg-[var(--border)]" />
            </div>
            <p className="text-[var(--bright)] text-base leading-[1.9]">
              I'm a <span className="text-[var(--red)]">Frontend Developer</span> from Pune, India who
              obsesses over the intersection of{' '}
              <span className="text-[var(--white)]">design and engineering</span>.
              I build interfaces that feel alive — pixel-precise, fast, and impossible to ignore.
            </p>
            <p className="text-[var(--mid)] text-base leading-[1.9] mt-4">
              From fine-tuning Vision Transformers at ~92% accuracy to building real-time emergency
              platforms — I work across the stack, but the frontend is where I live. I entered the
              Meta × HuggingFace Hackathon 2026 and keep shipping things that actually matter.
            </p>
          </div>

          {/* skills */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="text-xs text-[var(--dim)] tracking-widest">// skills.config</span>
              <div className="h-px flex-1 bg-[var(--border)]" />
            </div>
            <div className="space-y-5">
              {SKILLS.map((s, i) => <SkillBar key={s.name} skill={s} index={i} />)}
            </div>
          </div>

          {/* quote */}
          <div className="border-l-2 border-[var(--red)] pl-5 py-1">
            <p className="text-xs text-[var(--dim)] tracking-widest mb-2">$ echo $PHILOSOPHY</p>
            <p className="text-[var(--bright)] text-base italic leading-relaxed">
              "Code is craft. Design is intent. Together, they become experience."
            </p>
          </div>

          {/* CTAs — highlighted buttons */}
          <div className="flex flex-wrap gap-4 mt-auto">
            <a
              href="#projects"
              className="text-sm tracking-widest uppercase px-7 py-3.5 bg-[var(--red)] text-black font-black hover:bg-white transition-colors duration-200 shadow-[0_0_20px_rgba(255,45,45,0.4)]"
            >
              see_projects()
            </a>
            <a
              href="#contact"
              className="text-sm tracking-widest uppercase px-7 py-3.5 border-2 border-[var(--white)] text-[var(--white)] font-bold hover:bg-white hover:text-black transition-all duration-200"
            >
              get_in_touch()
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}