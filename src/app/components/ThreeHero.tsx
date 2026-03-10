import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Renderer, Program, Triangle, Mesh } from "ogl";
import { Menu, X } from "lucide-react";

// --- LOCAL ORACLE RED BULL F1 CAR MODEL ---
const MODEL_URL = "/oracle_red_bull_f1_car_rb19_2023/scene.gltf";

type ThreeHeroProps = {
  onFaqClick?: () => void;
  onSponsorClick?: () => void;
};

export const ThreeHero = ({ onFaqClick, onSponsorClick }: ThreeHeroProps) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mountRef = useRef<HTMLDivElement>(null);
  const raysRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // ==========================================
  // 1. PRELOADER & START LOGIC
  // ==========================================
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 4) + 1;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    setLoading(false);

    setTimeout(() => {
      setStarted(true);
      // Keep particle text on larger screens to avoid performance issues on small devices.
      if (window.innerWidth >= 768) {
        initParticleText("SOLUTIONS 2K26");
      }
    }, 500);
  };

  // ==========================================
  // 2. PARTICLE TEXT EFFECT
  // ==========================================
  const initParticleText = (text: string) => {
    if (!textRef.current) return;

    const CELL_SIZE = 5;
    const CELL_DISTANCE = 7;
    const FONT_COLOR = "#ef4444"; // Red-500
    let ACTIVE_ELECTRONS: any[] = [];
    let PINNED_CELLS: any[] = [];

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    textRef.current.appendChild(canvas);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    class Electron {
      current: number[];
      destination: number[];
      lifeTime: number;
      expireAt: number;

      constructor(x: number, y: number) {
        this.lifeTime = 2000;
        this.expireAt = Date.now() + this.lifeTime;
        this.current = [x, y];
        this.destination = [
          x + (Math.random() - 0.5) * 30,
          y + (Math.random() - 0.5) * 30,
        ];
      }
      paint(context: CanvasRenderingContext2D) {
        this.current[0] += (this.destination[0] - this.current[0]) * 0.05;
        this.current[1] += (this.destination[1] - this.current[1]) * 0.05;
        context.globalAlpha = Math.max(
          0,
          (this.expireAt - Date.now()) / this.lifeTime,
        );
        context.fillStyle = FONT_COLOR;
        context.fillRect(this.current[0], this.current[1], 2, 2);
      }
    }

    class Cell {
      x: number;
      y: number;
      constructor(row: number, col: number) {
        this.x = col * CELL_DISTANCE;
        this.y = row * CELL_DISTANCE;
      }
      paint(context: CanvasRenderingContext2D) {
        if (Math.random() > 0.985)
          ACTIVE_ELECTRONS.push(new Electron(this.x, this.y));
        context.globalAlpha = 0.25;
        context.fillStyle = FONT_COLOR;
        context.fillRect(this.x, this.y, CELL_SIZE, CELL_SIZE);
      }
    }

    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d")!;
    tempCanvas.width = window.innerWidth;
    tempCanvas.height = window.innerHeight;

    tempCtx.textAlign = "center";
    tempCtx.textBaseline = "middle";
    tempCtx.font = '900 200px "Orbitron", sans-serif';

    // Auto-scale text to fit screen
    const scale = (window.innerWidth * 0.85) / tempCtx.measureText(text).width;
    tempCtx.font = `900 ${200 * scale}px "Orbitron", sans-serif`;

    tempCtx.fillStyle = "white";
    tempCtx.fillText(text, tempCanvas.width / 2, tempCanvas.height / 2 + 100);

    const data = tempCtx.getImageData(
      0,
      0,
      tempCanvas.width,
      tempCanvas.height,
    ).data;
    for (let i = 0; i < tempCanvas.height; i += CELL_DISTANCE) {
      for (let j = 0; j < tempCanvas.width; j += CELL_DISTANCE) {
        if (data[(j + i * tempCanvas.width) * 4 + 3] > 128) {
          PINNED_CELLS.push(new Cell(i / CELL_DISTANCE, j / CELL_DISTANCE));
        }
      }
    }

    const loop = () => {
      if (!textRef.current) return;
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "source-over";

      PINNED_CELLS.forEach((c) => c.paint(ctx));

      const now = Date.now();
      ACTIVE_ELECTRONS = ACTIVE_ELECTRONS.filter((e) => {
        if (now > e.expireAt) return false;
        e.paint(ctx);
        return true;
      });
      requestAnimationFrame(loop);
    };
    loop();
  };

  // ==========================================
  // 3. THREE.JS (F1 Car)
  // ==========================================
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    // Scene will use renderer's clear color (black) for layering
    scene.fog = new THREE.Fog(0x000000, 10, 20);

    const camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0.8, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 1);  // Black background but alpha enabled for layering
    renderer.toneMapping = THREE.ACESFilmicToneMapping;  // Realistic tone mapping
    renderer.toneMappingExposure = 1.0;  // Natural exposure

    mountRef.current.appendChild(renderer.domElement);

    // Stronger ambient light for overall visibility
    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambient);

    // DRAMATIC WHITE SPOTLIGHT FROM ABOVE - Very bright and visible
    const mainLight = new THREE.SpotLight(0xffffff, 250, 25, Math.PI / 5, 0.4, 1.2);
    mainLight.position.set(0, 10, 1);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.near = 1;
    mainLight.shadow.camera.far = 25;
    scene.add(mainLight);

    // Target for main light
    const mainTarget = new THREE.Object3D();
    mainTarget.position.set(0, 0, 0);
    scene.add(mainTarget);
    mainLight.target = mainTarget;

    // Front fill light for better visibility
    const frontLight = new THREE.DirectionalLight(0xffffff, 1.2);
    frontLight.position.set(0, 3, 5);
    scene.add(frontLight);

    // Secondary white rim lights from sides - Much brighter
    const rimLight1 = new THREE.SpotLight(0xffffff, 120, 18, Math.PI / 3, 0.5, 1.5);
    rimLight1.position.set(-5, 7, -2);
    rimLight1.castShadow = true;
    scene.add(rimLight1);
    const rimTarget1 = new THREE.Object3D();
    rimTarget1.position.set(0, 0, 0);
    scene.add(rimTarget1);
    rimLight1.target = rimTarget1;

    const rimLight2 = new THREE.SpotLight(0xffffff, 120, 18, Math.PI / 3, 0.5, 1.5);
    rimLight2.position.set(5, 7, -2);
    scene.add(rimLight2);
    const rimTarget2 = new THREE.Object3D();
    rimTarget2.position.set(0, 0, 0);
    scene.add(rimTarget2);
    rimLight2.target = rimTarget2;

    // FOCUSED WHITE LIGHTS ON CAR ROOF - Realistic studio lighting
    const roofLight1 = new THREE.SpotLight(0xffffff, 180, 12, Math.PI / 8, 0.3, 1.8);
    roofLight1.position.set(-2, 6, 0);
    roofLight1.castShadow = true;
    scene.add(roofLight1);
    const roofTarget1 = new THREE.Object3D();
    roofTarget1.position.set(0, 0.3, 0);  // Target the roof area
    scene.add(roofTarget1);
    roofLight1.target = roofTarget1;

    const roofLight2 = new THREE.SpotLight(0xffffff, 180, 12, Math.PI / 8, 0.3, 1.8);
    roofLight2.position.set(2, 6, 0);
    roofLight2.castShadow = true;
    scene.add(roofLight2);
    const roofTarget2 = new THREE.Object3D();
    roofTarget2.position.set(0, 0.3, 0);  // Target the roof area
    scene.add(roofTarget2);
    roofLight2.target = roofTarget2;

    // Add ground plane to receive shadows (studio floor effect)
    const groundGeometry = new THREE.PlaneGeometry(30, 30);
    const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.3;
    ground.receiveShadow = true;
    scene.add(ground);

    // LOAD ORACLE RED BULL F1 CAR MODEL
    const loader = new GLTFLoader();
    let carModel: THREE.Group;

    loader.load(
      MODEL_URL,
      (g) => {
        carModel = g.scene;
        
        // Perfect scale for viewing
        carModel.scale.set(1.4, 1.4, 1.4);
        
        // Apply realistic materials and shadows for F1 car
        carModel.traverse((n) => {
          if ((n as THREE.Mesh).isMesh) {
            n.castShadow = true;
            n.receiveShadow = true;
            const mesh = n as THREE.Mesh;
            if (mesh.material) {
              const material = mesh.material as THREE.MeshStandardMaterial;
              // Realistic F1 car material properties - balanced for realism
              material.roughness = 0.35;     // Not too shiny, realistic paint/carbon
              material.metalness = 0.7;      // Mixed metallic and painted surfaces
              material.envMapIntensity = 1.0; // Natural reflections
              material.needsUpdate = true;
            }
          }
        });

        // Position car higher and behind the text
        const box = new THREE.Box3().setFromObject(carModel);
        const center = box.getCenter(new THREE.Vector3());
        carModel.position.sub(center);
        carModel.position.y = 0.15;  // Raised up
        carModel.position.z = -1;     // Behind the particle text
        
        scene.add(carModel);
      },
      (progress) => {
        // Optional: track loading progress
        console.log(`Loading model: ${(progress.loaded / progress.total) * 100}%`);
      },
      (error) => {
        console.error("Error loading Red Bull F1 car model:", error);
      },
    );

    // Animate the car with smooth rotation - modern game scene style
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;
      
      // Smooth rotation animation for the car
      if (carModel) {
        carModel.rotation.y += 0.005;
        // Add subtle floating animation at raised position
        carModel.position.y = 0.15 + Math.sin(time * 0.8) * 0.04;
      }
      
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current) mountRef.current.innerHTML = "";
      renderer.dispose();
    };
  }, []);

  // ==========================================
  // 4. OGL (Light Rays)
  // ==========================================
  useEffect(() => {
    if (!raysRef.current) return;

    const renderer = new Renderer({
      alpha: true,
      dpr: Math.min(window.devicePixelRatio, 2),
    });
    const gl = renderer.gl;
    raysRef.current.appendChild(gl.canvas);

    const vertex = `
      attribute vec2 position; 
      varying vec2 vUv; 
      void main() { 
        vUv = position * 0.5 + 0.5; 
        gl_Position = vec4(position, 0.0, 1.0); 
      }
    `;

    const fragment = `
        precision highp float;
        uniform float iTime;
        uniform vec2 iResolution;
        uniform vec3 raysColor;
        uniform vec2 rayPos;
        uniform vec2 rayDir;
        uniform float raysSpeed;
        uniform float lightSpread;
        uniform float rayLength;
        uniform float mouseInfluence;
        uniform vec2 mousePos;
        
        float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed) {
            vec2 sourceToCoord = coord - raySource;
            vec2 dirNorm = normalize(sourceToCoord);
            float cosAngle = dot(dirNorm, rayRefDirection);
            float spreadFactor = pow(max(cosAngle, 0.0), 1.0 / max(lightSpread, 0.001));
            float distance = length(sourceToCoord);
            float maxDistance = iResolution.x * rayLength;
            float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);
            float baseStrength = clamp((0.45 + 0.15 * sin(cosAngle * seedA + iTime * speed)) + (0.3 + 0.2 * cos(-cosAngle * seedB + iTime * speed)), 0.0, 1.0);
            return baseStrength * lengthFalloff * spreadFactor;
        }
        
        void main() {
            vec2 coord = vec2(gl_FragCoord.x, iResolution.y - gl_FragCoord.y);
            vec2 finalRayDir = rayDir;
            if (mouseInfluence > 0.0) {
                vec2 mouseDirection = normalize((mousePos * iResolution) - rayPos);
                finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
            }
            float r1 = rayStrength(rayPos, finalRayDir, coord, 36.22, 21.11, 1.5 * raysSpeed);
            float r2 = rayStrength(rayPos, finalRayDir, coord, 22.39, 18.02, 1.1 * raysSpeed);
            vec3 finalColor = raysColor * (r1 * 0.5 + r2 * 0.4);
            float brightness = 1.0 - (coord.y / iResolution.y);
            finalColor *= (0.3 + brightness * 0.7);
            gl_FragColor = vec4(finalColor, 1.0);
        }
    `;

    const mouse = new Float32Array([0.5, 0.5]);
    const uniforms = {
      iTime: { value: 0 },
      iResolution: {
        value: new Float32Array([window.innerWidth, window.innerHeight]),
      },
      raysColor: { value: new Float32Array([1.0, 0.0, 0.0]) },
      rayPos: { value: new Float32Array([window.innerWidth / 2, -500]) },
      rayDir: { value: new Float32Array([0, 1]) },
      raysSpeed: { value: 1.2 },
      lightSpread: { value: 0.8 },
      rayLength: { value: 1.5 },
      mouseInfluence: { value: 0.15 },
      mousePos: { value: mouse },
    };

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms,
      transparent: true,
    });
    const geometry = new Triangle(gl);
    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.iResolution.value.set([window.innerWidth, window.innerHeight]);
      uniforms.rayPos.value.set([
        window.innerWidth / 2,
        -window.innerHeight * 0.6,
      ]);
    };
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouse[0] = e.clientX / window.innerWidth;
      mouse[1] = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", handleMouseMove);

    resize();

    let animationId: number;
    const update = (t: number) => {
      animationId = requestAnimationFrame(update);
      uniforms.iTime.value = t * 0.001;
      renderer.render({ scene: mesh });
    };
    animationId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
      if (raysRef.current) raysRef.current.innerHTML = "";
    };
  }, []);

  return (
    <section className="relative h-[100svh] min-h-[100svh] w-full overflow-hidden bg-black font-sans">
      {/* --- LOADER OVERLAY --- */}
      <div
        className={`fixed inset-0 bg-black flex flex-col justify-center items-center z-[9999] transition-all duration-1000 ${loading ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
      >
        <div className="text-center">
          {progress < 100 ? (
            <>
              {/* UPDATED: Loading Text */}
              <div className="mb-5 text-3xl font-black italic tracking-[5px] text-red-600 drop-shadow-[0_0_20px_rgba(255,0,0,0.6)] sm:text-5xl sm:tracking-[12px]">
                SOLUTIONS 2K26
              </div>
              <div className="relative mx-auto h-0.5 w-[250px] overflow-hidden bg-red-900/30 sm:w-[300px]">
                <div
                  className="h-full bg-red-600 shadow-[0_0_15px_#ff0000] transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-red-600 mt-4 font-mono text-xl tracking-widest">
                {progress}%
              </div>
            </>
          ) : (
            <button
              onClick={handleStart}
              className="mt-5 border-2 border-red-600 bg-transparent px-6 py-3 font-black italic uppercase tracking-[2px] text-red-600 transition-all duration-300 hover:scale-[1.03] hover:bg-red-600 hover:text-black hover:shadow-[0_0_25px_#ff0000] sm:px-8 sm:tracking-[4px]"
            >
              Click to Start
            </button>
          )}
        </div>
      </div>

      {/* --- HERO CONTENTS --- */}
      <div
        className={`transition-opacity duration-[2000ms] ${started ? "opacity-100" : "opacity-0"}`}
      >
        {/* Nav Bar */}
        <nav className="absolute top-0 z-50 w-full border-t-[3px] border-red-600 bg-gradient-to-b from-red-900/20 via-black/80 to-transparent px-4 py-4 sm:px-8 sm:py-5 lg:px-12 lg:py-6">
          <div className="flex items-center justify-between gap-3">
            <div className="text-2xl font-black italic tracking-[0.2em] text-red-600 drop-shadow-[0_0_15px_rgba(255,0,0,0.5)] sm:text-3xl">
              solutions
            </div>
            <div className="hidden md:flex items-center gap-8">
              {["Events", "Sponsors", "Team", "Gallery"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-bold uppercase tracking-widest text-white/80 transition-all hover:-translate-y-0.5 hover:text-red-500 hover:shadow-[0_0_10px_#ff0000]"
                >
                  {item}
                </a>
              ))}
              <button
                type="button"
                onClick={onFaqClick}
                className="rounded-full border border-zinc-500/60 bg-zinc-800/85 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-white/90 transition hover:scale-[1.03] hover:bg-zinc-700"
              >
                FAQ
              </button>
              <button
                type="button"
                onClick={onSponsorClick}
                className="rounded-full border border-red-500/60 bg-red-600/90 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-white transition hover:scale-[1.03] hover:bg-red-500"
              >
                SponsorUs
              </button>
            </div>
            <div className="flex items-center gap-2 md:hidden">
              <button
                type="button"
                onClick={onFaqClick}
                className="rounded-full border border-zinc-500/60 bg-zinc-800/85 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white/90 transition active:scale-[0.97]"
              >
                FAQ
              </button>
              <button
                type="button"
                onClick={onSponsorClick}
                className="rounded-full border border-red-500/60 bg-red-600/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white transition active:scale-[0.97]"
              >
                Sponsor
              </button>
              <button
                type="button"
                aria-label="Toggle navigation menu"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="rounded-md border border-zinc-700 bg-zinc-900/80 p-2 text-zinc-100 transition active:scale-[0.96]"
              >
                {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="mt-3 rounded-xl border border-red-500/20 bg-black/90 p-3 md:hidden">
              <div className="grid grid-cols-2 gap-2">
                {["Events", "Sponsors", "Team", "Gallery"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-lg border border-zinc-700 bg-zinc-900/80 px-3 py-2 text-center text-xs font-bold uppercase tracking-[0.12em] text-zinc-100 transition active:scale-[0.97]"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Background Text "TB" */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -skew-x-[10deg] text-[55vw] font-black italic text-transparent pointer-events-none z-0 select-none"
          style={{
            WebkitTextStroke: "2px rgba(255, 0, 0, 0.03)",
            background:
              "linear-gradient(to bottom, rgba(255, 0, 0, 0.05), rgba(255, 255, 255, 0.01))",
            WebkitBackgroundClip: "text",
            filter: "blur(2px)",
          }}
        >
          TB
        </div>

        {/* Layers */}
        <div
          ref={raysRef}
          className="absolute inset-0 z-10 pointer-events-none"
        />
        <div ref={mountRef} className="absolute inset-0 z-20" />
        <div
          ref={textRef}
          className="absolute inset-0 z-50 pointer-events-none mix-blend-screen"
        />

        {/* Bottom Light Bar Animation */}
        <div className="absolute left-1/2 top-[18%] z-30 hidden -translate-x-1/2 gap-5 sm:flex">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-20 h-2.5 bg-gradient-to-b from-red-600 to-red-900 relative animate-pulse"
            >
              <div className="absolute top-0 left-2.5 w-14 h-2.5 bg-[#ff3333] shadow-[0_0_40px_8px_#ff0000]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
