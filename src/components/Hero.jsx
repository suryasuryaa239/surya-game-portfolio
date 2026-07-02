import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FaArrowRight, FaWhatsapp } from 'react-icons/fa';
import { audio } from '../utils/audio';

export default function Hero({ onExploreClick }) {
  const threeContainerRef = useRef(null);

  useEffect(() => {
    const container = threeContainerRef.current;
    if (!container) return;

    // Three.js setup
    const scene = new THREE.Scene();
    
    // Perspective Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 6;

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group to hold all geometries
    const group = new THREE.Group();
    scene.add(group);

    // Main 3D Shape: Low-poly abstract wireframe geometry (Icosahedron)
    const mainGeometry = new THREE.IcosahedronGeometry(1.5, 1);
    const mainMaterial = new THREE.MeshStandardMaterial({
      color: 0x2563eb, // primary blue
      wireframe: true,
      transparent: true,
      opacity: 0.55,
      roughness: 0.2,
      metalness: 0.8
    });
    const mainMesh = new THREE.Mesh(mainGeometry, mainMaterial);
    group.add(mainMesh);

    // Solid core shape inside wireframe
    const coreGeometry = new THREE.IcosahedronGeometry(0.7, 0);
    const coreMaterial = new THREE.MeshPhongMaterial({
      color: 0x60a5fa, // secondary light blue
      flatShading: true,
      transparent: true,
      opacity: 0.75,
      shininess: 80
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(coreMesh);

    // Orbiting particle points
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 45;
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.04,
      color: 0x2563eb,
      transparent: true,
      opacity: 0.8
    });
    const particlesMesh = new THREE.Points(particleGeometry, particleMaterial);
    group.add(particlesMesh);

    // Lights Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x2563eb, 1.5);
    dirLight1.position.set(5, 5, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x60a5fa, 1);
    dirLight2.position.set(-5, -5, 2);
    scene.add(dirLight2);

    // Mouse movement state mapping
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
      targetY = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation variables
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse coordinates interpolation
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Base rotations
      mainMesh.rotation.y = elapsedTime * 0.12;
      mainMesh.rotation.x = elapsedTime * 0.08;
      
      coreMesh.rotation.y = -elapsedTime * 0.15;
      coreMesh.rotation.x = -elapsedTime * 0.1;

      particlesMesh.rotation.y = -elapsedTime * 0.05;

      // Interactive mouse tilt
      group.rotation.y = mouseX * 0.5;
      group.rotation.x = -mouseY * 0.5;

      // Render
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    let animationFrameId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      mainGeometry.dispose();
      mainMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, []);

  const handleHover = () => {
    audio.playHover();
  };

  const handleClick = () => {
    audio.playClick();
  };

  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center justify-center relative px-6 py-12 md:py-24">
      {/* Background radial gradient wrapper */}
      <div className="absolute inset-0 bg-radial-gradient from-blue-50/20 via-transparent to-transparent pointer-events-none" />

      {/* Grid container */}
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Text details column */}
        <div className="lg:col-span-7 text-left space-y-6 md:space-y-8 order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-100 rounded-full font-sans text-xs font-bold text-blue-600 tracking-wide">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
            <span>Available for Game Projects</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-black tracking-tight leading-[1.05] text-slate-900">
              Hi, I'm <span className="text-blue-600 bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">Surya</span>
            </h1>
            
            <h2 className="text-xl sm:text-2xl font-sans font-extrabold text-slate-700 tracking-wider uppercase">
              Indie Game Developer
            </h2>
          </div>

          <p className="text-slate-500 font-sans text-base sm:text-lg leading-relaxed max-w-xl">
            I build immersive games with unique gameplay, cinematic visuals, and memorable player experiences. Specialized in Unity architecture, C# scripting, and interactive atmospheric mechanics.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <button
              onMouseEnter={handleHover}
              onClick={() => { handleClick(); onExploreClick(); }}
              className="w-full sm:w-auto py-3.5 px-8 bg-blue-600 hover:bg-blue-700 text-white font-sans font-bold rounded-lg text-sm tracking-wide transition-all duration-300 shadow-md hover:shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Explore Projects</span>
              <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
            </button>
            
            <a
              href="https://wa.me/916374889944?text=Hi%20Surya%2C%20I%20saw%20your%20game%20developer%20portfolio%20and%20wanted%20to%20connect%20with%20you%21"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={handleHover}
              onClick={handleClick}
              className="w-full sm:w-auto py-3.5 px-8 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 font-sans font-semibold rounded-lg text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer shadow-sm"
            >
              <FaWhatsapp className="text-emerald-500 text-lg" />
              <span>Contact</span>
            </a>
          </div>
        </div>

        {/* Right 3D Interactive WebGL column */}
        <div className="lg:col-span-5 w-full flex justify-center items-center order-1 lg:order-2">
          <div className="relative w-full aspect-square max-w-[400px] md:max-w-[460px] rounded-2xl bg-gradient-to-tr from-slate-50 to-blue-50/30 border border-slate-100 flex items-center justify-center shadow-inner group overflow-hidden">
            {/* Embedded WebGL Container */}
            <div 
              ref={threeContainerRef} 
              className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
            />
            
            {/* Grid corner details for technical aesthetic */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-slate-200 pointer-events-none group-hover:border-blue-300 transition-colors" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-slate-200 pointer-events-none group-hover:border-blue-300 transition-colors" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-slate-200 pointer-events-none group-hover:border-blue-300 transition-colors" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-slate-200 pointer-events-none group-hover:border-blue-300 transition-colors" />
            
            {/* Floating text stats in background */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-[9px] text-slate-400 uppercase tracking-widest pointer-events-none select-none">
              3D_RENDERER_ACTIVE: DRAG_TO_TILT
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
