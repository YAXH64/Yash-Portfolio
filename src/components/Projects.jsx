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
    stat:  '~92% acc',
    statLabel: 'MODEL_ACC',
    img:   imgSpiderman,
    href:  'https://github.com/YAXH64/Deepsentry---Deepfake-Detector',
    demo:  null,
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
    href:  'https://github.com/YAXH64/BloodLink',
    demo:  'https://bloodlink-plum.vercel.app/',
    blend: 'grayscale brightness-40',
    accent:'#ff2d2d',
  },
  {
    id:    '003',
    name:  'AI Code Review',
    slug:  'ai_code_review.rl',
    type:  'Hackathon 2026',
    year:  '2026',
    desc:  'Reinforcement Learning environment for AI code review agents. Built for Meta × HuggingFace Hackathon 2026. LLMs that learn to review code better.',
    tech:  ['Python', 'JS', 'YAML', 'HuggingFace', 'RL', 'LLM'],
    stat:  'HF × Meta',
    statLabel: 'HACKATHON',
    img:   imgSpiderman,
    href:  'https://github.com/YAXH64/ai-code-review-openenv',
    demo:  'https://huggingface.co/spaces/Yaxh64/ai-code-review-env-v2',
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
    href:  'https://github.com/YAXH64/Weather-App',
    demo:  'https://yaxh64.github.io/Weather-App/',
    blend: 'grayscale brightness-40',
    accent:'#38bdf8',
  },
  {
    id:    '005',
    name:  'This Portfolio',
    slug:  'yash_portfolio.dev',
    type:  'Portfolio · Live',
    year:  '2026',
    desc:  'The portfolio you are viewing right now. Built with React, Three.js, GSAP and Tailwind. Terminal aesthetic, WebGL shader reveal, animated skill bars.',
    tech:  ['React', 'Three.js', 'GSAP', 'Tailwind', 'Vite'],
    stat:  'Live ✓',
    statLabel: 'DEPLOYED',
    img:   imgSpiderman,
    href:  'https://github.com/YAXH64/Yash-Portfolio',
    demo:  'https://yashyadavdev.vercel.app',
    blend: 'grayscale brightness-50',
    accent:'#22c55e',
  },
];

const GithubIcon = () => (
  <svg viewBox="0 0 19 19" fill="currentColor" className="w-3.5 h-3.5">
    <path fillRule="evenodd" d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844" clipRule="evenodd"/>
  </svg>
);

function ProjectCard({ project }) {
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
      {/* image strip */}
      <div className="relative w-full h-48 overflow-hidden bg-black">
        <img
          ref={imgRef}
          src={project.img}
          alt={project.name}
          className={`absolute inset-0 w-full h-[115%] -top-[7%] object-cover object-center ${project.blend} transition-all duration-1000`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[var(--bg2)]" />
        <div
          ref={glowRef}
          className="absolute w-40 h-40 rounded-full blur-[60px] pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-0 mix-blend-screen"
          style={{ background: `radial-gradient(circle, ${project.accent}22 0%, transparent 70%)` }}
        />
        {/* top-left tags */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="text-xs tracking-widest text-[var(--dim)] bg-[#060606]/80 px-2 py-1 border border-[var(--border)]">{project.id}</span>
          <span className="text-xs tracking-widest px-2 py-1 border" style={{ color: project.accent, borderColor: `${project.accent}44`, background: `${project.accent}11` }}>{project.type}</span>
        </div>
        {/* top-right stat */}
        <div className="absolute top-3 right-3 text-right">
          <p className="text-xs text-[var(--dim)] tracking-widest">{project.statLabel}</p>
          <p className="text-sm font-bold tracking-wide" style={{ color: project.accent }}>{project.stat}</p>
        </div>
        <div className="absolute inset-0 border transition-colors duration-300 pointer-events-none" style={{ borderColor: hovered ? `${project.accent}44` : 'transparent' }} />
      </div>

      {/* content */}
      <div className="p-5" style={{ transform: 'translateZ(20px)' }}>
        <p className="text-xs text-[var(--dim)] tracking-widest mb-2">
          ~/projects/<span style={{ color: project.accent }}>{project.slug}</span>
        </p>
        <h3 className="text-xl font-black tracking-tight text-[var(--white)] mb-2 leading-none" style={{ fontFamily: 'var(--display)' }}>
          {project.name}
        </h3>
        <p className="text-[var(--mid)] text-sm leading-relaxed mb-4 line-clamp-3">{project.desc}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map(t => (
            <span key={t} className="text-xs tracking-widest uppercase px-2 py-1 border border-[var(--border)] text-[var(--dim)]">{t}</span>
          ))}
        </div>

        {/* ── link row: GitHub + Live Demo ── */}
        <div className="flex items-center justify-between border-t border-[var(--border)] pt-4 gap-2">
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs tracking-widest uppercase transition-colors duration-200 hover:underline"
            style={{ color: hovered ? project.accent : 'var(--mid)' }}
          >
            <GithubIcon /> github
          </a>
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs tracking-widest uppercase font-bold px-3 py-1.5 border transition-all duration-200"
              style={{
                color: project.accent,
                borderColor: `${project.accent}55`,
                background: `${project.accent}11`,
              }}
            >
              live_demo →
            </a>
          ) : (
            <span className="text-xs tracking-widest text-[var(--dim)] opacity-40">no_demo</span>
          )}
        </div>
      </div>

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
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
      const cards = sectionRef.current.querySelectorAll('.project-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: cards[0], start: 'top 85%', toggleActions: 'play none none reverse' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full bg-[var(--bg)] grid-bg py-24 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ fontFamily: 'var(--mono)' }}
    >
      <div ref={headerRef} className="max-w-[90rem] mx-auto mb-14">
        {/* section label */}
        <div className="flex items-center gap-3 mb-10">
          <span className="text-[var(--red)] text-xs tracking-widest">02.</span>
          <div className="h-px w-[60px] bg-[var(--red)]" />
          <span className="text-xs text-[var(--dim)] tracking-[0.3em] uppercase">projects.dir</span>
          <div className="h-px flex-1 bg-[var(--border)]" />
          <span className="text-xs text-[var(--dim)] tracking-widest">5 entries</span>
        </div>

        {/* heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="text-[clamp(2.5rem,7vw,5rem)] font-black tracking-tighter leading-none text-[var(--white)]" style={{ fontFamily: 'var(--display)' }}>
            THINGS<br /><span className="text-[var(--red)]">I'VE_BUILT</span>
          </h2>
          <p className="text-[var(--mid)] text-sm leading-relaxed max-w-xs md:text-right">
            From AI research tools to real-time web platforms — projects that solve real problems.
          </p>
        </div>

        {/* desktop file-list table */}
        <div className="mt-10 grid grid-cols-[2rem_1fr_1fr_1fr_4rem] gap-4 text-xs text-[var(--dim)] tracking-widest border-b border-[var(--border)] pb-2 hidden md:grid">
          <span>ID</span><span>NAME</span><span>TYPE</span><span>STACK</span><span className="text-right">YEAR</span>
        </div>
        <div className="hidden md:block mb-10">
          {PROJECTS.map((p, i) => (
            <a
              key={p.id}
              href={p.demo || p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="grid grid-cols-[2rem_1fr_1fr_1fr_4rem] gap-4 items-center py-3 border-b border-[var(--border)] group hover:bg-[var(--bg2)] transition-all duration-150"
            >
              <span className="text-xs text-[var(--dim)]">{p.id}</span>
              <span className="text-sm text-[var(--bright)] group-hover:text-[var(--white)] transition-colors" style={{ fontFamily: 'var(--display)' }}>{p.name}</span>
              <span className="text-xs tracking-widest" style={{ color: p.accent }}>{p.type}</span>
              <span className="text-xs text-[var(--dim)]">{p.tech.slice(0,3).join(' · ')}{p.tech.length > 3 ? ` +${p.tech.length-3}` : ''}</span>
              <div className="flex items-center justify-end gap-2">
                <span className="text-xs text-[var(--dim)]">{p.year}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: p.accent }}>→</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* card grid — 3 cols so 5 cards fit nicely */}
      <div className="max-w-[90rem] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {PROJECTS.map(p => <ProjectCard key={p.id} project={p} />)}
      </div>

      {/* footer */}
      <div className="max-w-[90rem] mx-auto mt-10 flex items-center gap-4">
        <div className="h-px flex-1 bg-[var(--border)]" />
        <p className="text-xs text-[var(--dim)] tracking-widest">
          $ more on{' '}
          <a href="https://github.com/YAXH64" target="_blank" rel="noopener noreferrer" className="text-[var(--red)] hover:underline">
            github.com/YAXH64
          </a>
        </p>
        <div className="h-px flex-1 bg-[var(--border)]" />
      </div>
    </section>
  );
}