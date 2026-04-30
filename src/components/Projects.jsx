import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import imgSpiderman from '../assets/spiderman/20260407_055437.png';
import imgMan from '../assets/man/1775519899126.png';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id:    '001',
    name:  'DeepSentry',
    slug:  'deep_sentry.ai',
    type:  'AI · ML',
    year:  '2025',
    desc:  'Detect deepfakes in images and videos using a fine-tuned Vision Transformer (ViT) model. Achieved ~92% detection accuracy on benchmark datasets.',
    tech:  ['Python', 'PyTorch', 'FastAPI', 'HuggingFace', 'ViT'],
    stat:  '~92% accuracy',
    statLabel: 'MODEL_ACC',
    img:   imgSpiderman,
    href:  '#',
    blend: 'grayscale brightness-50',
    accent:'#ff2d2d',
  },
  {
    id:    '002',
    name:  'BloodLink',
    slug:  'blood_link.app',
    type:  'Web App',
    year:  '2025',
    desc:  'Real-time blood availability and emergency response platform. Connects patients, donors and blood banks instantly — reducing critical delays.',
    tech:  ['HTML', 'CSS', 'JavaScript', 'REST API'],
    stat:  'Real-time',
    statLabel: 'RESPONSE',
    img:   imgMan,
    href:  '#',
    blend: 'grayscale brightness-40',
    accent:'#ff2d2d',
  },
  {
    id:    '003',
    name:  'AI Code Review',
    slug:  'ai_code_review.rl',
    type:  'Hackathon · 2026',
    year:  '2026',
    desc:  'Reinforcement Learning environment for AI code review agents. Built for Meta × HuggingFace Hackathon 2026. LLMs that learn to review code better.',
    tech:  ['Python', 'JavaScript', 'YAML', 'HuggingFace', 'RL', 'LLM'],
    stat:  'HF × Meta',
    statLabel: 'HACKATHON',
    img:   imgSpiderman,
    href:  '#',
    blend: 'grayscale brightness-40 saturate-0',
    accent:'#a855f7',
  },
  {
    id:    '004',
    name:  'Weather App',
    slug:  'weather_tracker.js',
    type:  'Web App',
    year:  '2024',
    desc:  'City weather dashboard with real-time conditions and AQI index. Clean, fast, and minimal. Built with vanilla JS and the OpenWeather API.',
    tech:  ['HTML', 'CSS', 'JavaScript', 'Weather API'],
    stat:  'Live AQI',
    statLabel: 'FEATURE',
    img:   imgMan,
    href:  '#',
    blend: 'grayscale brightness-40',
    accent:'#38bdf8',
  },
];

/* ── single project card ── */
function ProjectCard({ project, index }) {
  const cardRef  = useRef(null);
  const glowRef  = useRef(null);
  const imgRef   = useRef(null);
  const [hovered, setHovered] = useState(false);

  const onMove = (e) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    gsap.to(cardRef.current, { rotateY: x * 8, rotateX: -y * 8, transformPerspective: 900, duration: 0.4, ease: 'power2.out' });
    gsap.to(glowRef.current,  { x: e.clientX - r.left, y: e.clientY - r.top, opacity: 1, duration: 0.2 });
    gsap.to(imgRef.current,   { x: -x * 12, y: -y * 12, scale: 1.06, duration: 0.4, ease: 'power2.out' });
  };

  const onLeave = () => {
    setHovered(false);
    gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power3.out' });
    gsap.to(glowRef.current,  { opacity: 0, duration: 0.4 });
    gsap.to(imgRef.current,   { x: 0, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' });
  };

  return (
    <div
      ref={cardRef}
      className="project-card relative border border-[var(--border)] bg-[var(--bg2)] overflow-hidden cursor-pointer group"
      style={{ transformStyle: 'preserve-3d' }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
    >
      {/* ── image strip ── */}
      <div className="relative w-full h-52 overflow-hidden bg-black">
        <img
          ref={imgRef}
          src={project.img}
          alt={project.name}
          className={`absolute inset-0 w-full h-[115%] -top-[7%] object-cover object-center ${project.blend} transition-all duration-1000`}
        />
        {/* image overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[var(--bg2)]" />

        {/* glow */}
        <div
          ref={glowRef}
          className="absolute w-40 h-40 rounded-full blur-[60px] pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-0 mix-blend-screen"
          style={{ background: `radial-gradient(circle, ${project.accent}22 0%, transparent 70%)` }}
        />

        {/* top-left ID tag */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="text-xs tracking-widest text-[var(--dim)] bg-[#060606]/80 px-2 py-1 border border-[var(--border)]">
            {project.id}
          </span>
          <span
            className="text-xs tracking-widest px-2 py-1 border"
            style={{ color: project.accent, borderColor: `${project.accent}44`, background: `${project.accent}11` }}
          >
            {project.type}
          </span>
        </div>

        {/* top-right stat */}
        <div className="absolute top-3 right-3 text-right">
          <p className="text-xs text-[var(--dim)] tracking-widest">{project.statLabel}</p>
          <p className="text-sm font-bold tracking-wide" style={{ color: project.accent }}>{project.stat}</p>
        </div>

        {/* hover border overlay */}
        <div
          className="absolute inset-0 border transition-colors duration-300 pointer-events-none"
          style={{ borderColor: hovered ? `${project.accent}44` : 'transparent' }}
        />
      </div>

      {/* ── content ── */}
      <div className="p-5" style={{ transform: 'translateZ(20px)' }}>

        {/* file path */}
        <p className="text-xs text-[var(--dim)] tracking-widest mb-3">
          ~/projects/<span style={{ color: project.accent }}>{project.slug}</span>
        </p>

        {/* name */}
        <h3
          className="text-xl font-black tracking-tight text-[var(--white)] mb-3 leading-none group-hover:text-white transition-colors"
          style={{ fontFamily: 'var(--display)' }}
        >
          {project.name}
        </h3>

        {/* desc */}
        <p className="text-[var(--mid)] text-sm leading-relaxed mb-4 line-clamp-3">
          {project.desc}
        </p>

        {/* tech chips */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map(t => (
            <span key={t} className="text-xs tracking-widest uppercase px-2 py-1 border border-[var(--border)] text-[var(--dim)] group-hover:border-[var(--border)] transition-colors">
              {t}
            </span>
          ))}
        </div>

        {/* link */}
        <a
          href={project.href}
          className="flex items-center justify-between text-xs tracking-widest uppercase border-t border-[var(--border)] pt-4 transition-colors duration-200 group/link"
          style={{ color: hovered ? project.accent : 'var(--mid)' }}
        >
          <span>open_project()</span>
          <span className="group-hover/link:translate-x-1 transition-transform duration-200">→</span>
        </a>
      </div>

      {/* corner bracket bottom-right */}
      <div
        className="absolute bottom-0 right-0 w-5 h-5 border-b border-r pointer-events-none transition-colors duration-300"
        style={{ borderColor: hovered ? project.accent : 'var(--border)' }}
      />
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      );

      const cards = sectionRef.current.querySelectorAll('.project-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: cards[0], start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[var(--bg)] grid-bg py-28 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ fontFamily: 'var(--mono)' }}
    >
      {/* section label */}
      <div ref={headerRef} className="max-w-[90rem] mx-auto mb-16">
        <div className="flex items-center gap-3 mb-10">
          <span className="text-[var(--red)] text-xs tracking-widest">02.</span>
          <div className="h-px w-[60px] bg-[var(--red)]" />
          <span className="text-xs text-[var(--dim)] tracking-[0.3em] uppercase">projects.dir</span>
          <div className="h-px flex-1 bg-[var(--border)]" />
          <span className="text-xs text-[var(--dim)] tracking-widest">4 entries</span>
        </div>

        {/* header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2
              className="text-[clamp(2.5rem,7vw,5rem)] font-black tracking-tighter leading-none text-[var(--white)]"
              style={{ fontFamily: 'var(--display)' }}
            >
              THINGS
              <br />
              <span className="text-[var(--red)]">I'VE_BUILT</span>
            </h2>
          </div>
          <p className="text-[var(--mid)] text-sm leading-relaxed max-w-xs md:text-right">
            From AI research tools to real-time web platforms — projects that solve real problems.
          </p>
        </div>

        {/* ── horizontal file-list header ── */}
        <div className="mt-10 grid grid-cols-4 gap-4 text-xs text-[var(--dim)] tracking-widest border-b border-[var(--border)] pb-2 hidden md:grid">
          <span>ID / NAME</span>
          <span>TYPE</span>
          <span>STACK</span>
          <span className="text-right">YEAR</span>
        </div>

        {/* ── list view rows (desktop) ── */}
        <div className="hidden md:block mt-0 mb-10">
          {PROJECTS.map((p, i) => (
            <a
              key={p.id}
              href={p.href}
              className="grid grid-cols-4 gap-4 items-center py-3 border-b border-[var(--border)] group transition-all duration-150 hover:bg-[var(--bg2)]"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs text-[var(--dim)] w-8">{p.id}</span>
                <span className="text-sm text-[var(--bright)] group-hover:text-[var(--white)] transition-colors tracking-wide" style={{ fontFamily: 'var(--display)' }}>
                  {p.name}
                </span>
              </div>
              <span className="text-xs text-[var(--dim)] tracking-widest" style={{ color: i === 2 ? '#a855f7' : i === 3 ? '#38bdf8' : 'var(--dim)' }}>
                {p.type}
              </span>
              <div className="flex flex-wrap gap-1">
                {p.tech.slice(0,3).map(t => (
                  <span key={t} className="text-xs text-[var(--dim)] tracking-wider">{t}{' '}</span>
                ))}
                {p.tech.length > 3 && <span className="text-xs text-[var(--dim)]">+{p.tech.length-3}</span>}
              </div>
              <div className="flex items-center justify-end gap-2">
                <span className="text-xs text-[var(--dim)]">{p.year}</span>
                <span className="text-[var(--red)] opacity-0 group-hover:opacity-100 transition-opacity text-xs">→</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ── card grid ── */}
      <div className="max-w-[90rem] mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
      </div>

      {/* footer note */}
      <div className="max-w-[90rem] mx-auto mt-12 flex items-center gap-4">
        <div className="h-px flex-1 bg-[var(--border)]" />
        <p className="text-xs text-[var(--dim)] tracking-widest">
          $ more on{' '}
          <a
            href="https://github.com/yashyadav"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--red)] hover:underline"
          >
            github.com/yashyadav
          </a>
        </p>
        <div className="h-px flex-1 bg-[var(--border)]" />
      </div>
    </section>
  );
}