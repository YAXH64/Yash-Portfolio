import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { vertexShader, fragmentShader } from './HeroShaders';

import imgSpiderman from '../assets/spiderman/20260407_055437.png';
import imgMan from '../assets/man/1775519899126.png';

const BOOT_LINES = [
  { text: 'Initializing portfolio_v1.0.0...', delay: 0.1 },
  { text: 'Loading user profile: YASH_YADAV', delay: 0.4 },
  { text: 'Stack: React · Three.js · GSAP · Python', delay: 0.7 },
  { text: 'Status: Available for hire ✓', delay: 1.0, red: true },
];

export default function Hero() {
  const containerRef = useRef(null);
  const canvasRef    = useRef(null);
  const nameRef      = useRef(null);
  const uniformRef   = useRef(null);
  const mouseTarget  = useRef({ x: 0.5, y: 0.5 });
  const mouseCurrent = useRef({ x: 0.5, y: 0.5 });

  const [isHovered, setIsHovered]       = useState(false);
  const [bootDone, setBootDone]         = useState(false);
  const [visibleLines, setVisibleLines] = useState([]);

  /* boot sequence */
  useEffect(() => {
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, i]);
        if (i === BOOT_LINES.length - 1) setTimeout(() => setBootDone(true), 400);
      }, line.delay * 1000 + 600);
    });
  }, []);

  /* name entrance */
  useEffect(() => {
    if (!bootDone || !nameRef.current) return;
    gsap.fromTo(nameRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }
    );
  }, [bootDone]);

  /* Three.js */
  useEffect(() => {
    if (!canvasRef.current) return;
    const container = canvasRef.current;
    const scene    = new THREE.Scene();
    const camera   = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    const W = container.clientWidth, H = container.clientHeight;
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const uniforms = {
      uTexture1:       { value: null },
      uTexture2:       { value: null },
      uMouse:          { value: new THREE.Vector2(0.5, 0.5) },
      uHovered:        { value: 0.0 },
      uRadius:         { value: 0.28 },
      uSoftness:       { value: 0.12 },
      uScale:          { value: 0.04 },
      uResolution:     { value: new THREE.Vector2(W, H) },
      uImageResolution:{ value: new THREE.Vector2(1920, 1080) },
    };
    uniformRef.current = uniforms;

    let loaded = false;
    new THREE.TextureLoader();
    const loader = new THREE.TextureLoader();
    Promise.all([loader.loadAsync(imgSpiderman), loader.loadAsync(imgMan)]).then(([t1, t2]) => {
      [t1, t2].forEach(t => { t.generateMipmaps = false; t.minFilter = t.magFilter = THREE.LinearFilter; });
      uniforms.uTexture1.value = t1;
      uniforms.uTexture2.value = t2;
      if (t1.image) uniforms.uImageResolution.value.set(t1.image.width, t1.image.height);
      loaded = true;
    });

    const geo = new THREE.PlaneGeometry(2, 2);
    const mat = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms });
    scene.add(new THREE.Mesh(geo, mat));

    const tick = () => {
      if (!loaded) return;
      mouseCurrent.current.x = gsap.utils.interpolate(mouseCurrent.current.x, mouseTarget.current.x, 0.08);
      mouseCurrent.current.y = gsap.utils.interpolate(mouseCurrent.current.y, mouseTarget.current.y, 0.08);
      uniforms.uMouse.value.set(mouseCurrent.current.x, mouseCurrent.current.y);
      renderer.render(scene, camera);
    };
    gsap.ticker.add(tick);

    const onMove  = (e) => { const r = container.getBoundingClientRect(); mouseTarget.current.x = (e.clientX - r.left) / W; mouseTarget.current.y = 1 - (e.clientY - r.top) / H; };
    const onEnter = () => { setIsHovered(true);  gsap.to(uniforms.uHovered, { value: 1, duration: 1, ease: 'power3.out' }); };
    const onLeave = () => { setIsHovered(false); gsap.to(uniforms.uHovered, { value: 0, duration: 1, ease: 'power3.out' }); };
    const onResize= () => { const w = container.clientWidth, h = container.clientHeight; renderer.setSize(w, h); uniforms.uResolution.value.set(w, h); };

    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseenter', onEnter);
    container.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', onResize);

    return () => {
      gsap.ticker.remove(tick);
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseenter', onEnter);
      container.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      renderer.dispose(); mat.dispose(); geo.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen bg-[var(--bg)] overflow-hidden grid-bg scanlines"
      style={{ fontFamily: 'var(--mono)' }}
    >
      {/* ── canvas — right half ── */}
      <div
        ref={canvasRef}
        className="absolute right-0 top-0 w-full md:w-[55%] h-full z-0 select-none"
        style={{ maskImage: 'linear-gradient(to left, black 55%, transparent 100%)' }}
      />
      {/* canvas fade overlay */}
      <div
        className="absolute right-0 top-0 w-full md:w-[55%] h-full z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(to right, var(--bg) 0%, transparent 35%, rgba(6,6,6,0.2) 100%)' }}
      />

      {/* ── left panel — full height, flex column to push content apart ── */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between px-8 md:px-14 lg:px-20 py-8 pointer-events-none"
        style={{ paddingTop: '80px' }} /* clear navbar */
      >

        {/* TOP: boot lines */}
        <div className="space-y-1 max-w-lg">
          {BOOT_LINES.map((line, i) => (
            <div
              key={i}
              className={`text-xs tracking-widest transition-all duration-300 ${
                visibleLines.includes(i) ? 'opacity-100' : 'opacity-0'
              } ${line.red ? 'text-[var(--red)]' : 'text-[var(--dim)]'}`}
            >
              <span className="text-[var(--red)] mr-2">$</span>
              {line.text}
              {i === BOOT_LINES.length - 1 && visibleLines.includes(i) && !bootDone && (
                <span className="blink ml-1">_</span>
              )}
            </div>
          ))}
        </div>

        {/* MIDDLE: name block — vertically centered in remaining space */}
        <div
          ref={nameRef}
          className={`transition-opacity duration-500 max-w-2xl ${bootDone ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* label */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-[var(--red)]" />
            <span className="text-xs text-[var(--red)] tracking-[0.3em] uppercase">frontend.developer</span>
          </div>

          {/* name */}
          <h1
            className="text-[clamp(4rem,11vw,8rem)] font-black leading-[0.88] tracking-tighter text-[var(--white)] mb-6 relative"
            style={{ fontFamily: 'var(--display)' }}
          >
            YASH
            <br />
            <span className="text-[var(--red)]">YADAV</span>
            <span
              aria-hidden
              className="absolute inset-0 text-[var(--red)] opacity-0 hover:opacity-50"
              style={{ animation: 'glitch1 3s infinite', animationDelay: '2s', mixBlendMode: 'screen' }}
            >
              YASH<br />YADAV
            </span>
          </h1>

          {/* one-liner */}
          <p className="text-[var(--mid)] text-base leading-relaxed max-w-sm mb-7">
            I craft interfaces that merge sharp design with solid engineering — from pixel-precise UIs to AI-powered systems.
          </p>

          {/* skill tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {['HTML', 'CSS', 'JS', 'React', 'Python', 'Tailwind', 'Three.js', 'Spline 3D'].map(s => (
              <span
                key={s}
                className="text-xs tracking-widest uppercase px-3 py-1 border border-[var(--border)] text-[var(--dim)] hover:text-[var(--red)] hover:border-[var(--red-border)] transition-all duration-200 cursor-default"
              >
                {s}
              </span>
            ))}
          </div>

          {/* ── BUTTONS — highly visible ── */}
          <div className="flex items-center gap-4 pointer-events-auto flex-wrap">
            {/* Primary — solid red, hard to miss */}
            <a
              href="#projects"
              className="group flex items-center gap-3 px-8 py-4 bg-[var(--red)] text-black text-sm tracking-[0.15em] uppercase font-black hover:bg-white transition-colors duration-200 shadow-[0_0_24px_rgba(255,45,45,0.5)]"
            >
              view_work()
              <span className="group-hover:translate-x-1 transition-transform duration-200 text-base">→</span>
            </a>
            {/* Secondary — white border, clearly a button */}
            <a
              href="https://github.com/yashyadav"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-8 py-4 border-2 border-[var(--white)] text-[var(--white)] text-sm tracking-[0.15em] uppercase font-bold hover:bg-white hover:text-black transition-all duration-200"
            >
              github.open()
              <span className="group-hover:translate-x-1 transition-transform duration-200 text-base">↗</span>
            </a>
          </div>
        </div>

        {/* BOTTOM: status strip */}
        <div className="flex items-center justify-between border-t border-[var(--border)] pt-4 max-w-2xl">
          <div className="flex items-center gap-4 text-xs text-[var(--dim)] tracking-widest flex-wrap gap-y-1">
            <span>LOC:PUNE,IN</span>
            <span>·</span>
            <span>ROLE:FRONTEND_DEV</span>
            <span>·</span>
            <span className="text-[var(--red)]">OPEN_TO_WORK<span className="blink">_</span></span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-[var(--dim)] tracking-widest">
            <span className="blink text-[var(--red)]">●</span>
            <span>SCROLL_TO_EXPLORE</span>
          </div>
        </div>
      </div>

      {/* corner brackets */}
      <div className="absolute top-[72px] left-6 w-6 h-6 border-t border-l border-[var(--border)] pointer-events-none z-10" />
      <div className="absolute bottom-14 right-8 w-6 h-6 border-b border-r border-[var(--border)] pointer-events-none z-10" />

      {/* vertical label right edge */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 pointer-events-none hidden md:flex flex-col items-center gap-2">
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-[var(--border)]" />
        <span className="text-xs text-[var(--dim)] tracking-widest" style={{ writingMode: 'vertical-lr' }}>
          {isHovered ? 'REVEAL_MODE:ON' : 'HOVER_TO_REVEAL'}
        </span>
        <div className="w-px h-16 bg-gradient-to-t from-transparent to-[var(--border)]" />
      </div>
    </div>
  );
}