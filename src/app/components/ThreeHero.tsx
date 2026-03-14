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
  const [mouseOnText, setMouseOnText] = useState(false);
  const [rpmValue, setRpmValue] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);

  const mountRef = useRef<HTMLDivElement>(null);
  const raysRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const sparksCanvasRef = useRef<HTMLCanvasElement>(null);

  const [isMobileViewport, setIsMobileViewport] = useState(
    typeof window !== "undefined" ? window.innerWidth < 640 : false,
  );

  useEffect(() => {
    const handleViewportChange = () => {
      setIsMobileViewport(window.innerWidth < 640);
    };

    handleViewportChange();
    window.addEventListener("resize", handleViewportChange);
    return () => window.removeEventListener("resize", handleViewportChange);
  }, []);

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
      // Keep particle text on large desktop screens only.
      if (
        window.innerWidth >= 1024 &&
        window.matchMedia("(pointer: fine)").matches
      ) {
        initParticleText("SOLUTIONS 2K26");
      }
      initSparks();
      startRpmAnimation();
      startGlitchLoop();
    }, 500);
  };

  // ==========================================
  // 2b. RPM GAUGE ANIMATION
  // ==========================================
  const startRpmAnimation = () => {
    let rpm = 0;
    let direction = 1;
    const tick = () => {
      rpm += direction * (Math.random() * 400 + 100);
      if (rpm >= 18000) {
        rpm = 18000;
        direction = -1;
      }
      if (rpm <= 3000) {
        rpm = 3000;
        direction = 1;
      }
      setRpmValue(Math.round(rpm));
      setTimeout(tick, 60 + Math.random() * 80);
    };
    tick();
  };

  // ==========================================
  // 2c. GLITCH LOOP
  // ==========================================
  const startGlitchLoop = () => {
    const loop = () => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150 + Math.random() * 100);
      setTimeout(loop, 3000 + Math.random() * 4000);
    };
    setTimeout(loop, 2000);
  };

  // ==========================================
  // 2d. SPARKS CANVAS
  // ==========================================
  const initSparks = () => {
    const canvas = sparksCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    type Spark = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
      color: string;
    };
    const sparks: Spark[] = [];

    const spawn = () => {
      const count = 1 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) {
        sparks.push({
          x: canvas.width * (0.3 + Math.random() * 0.4),
          y: canvas.height * (0.35 + Math.random() * 0.3),
          vx: (Math.random() - 0.5) * 4,
          vy: -1 - Math.random() * 3,
          life: 0,
          maxLife: 40 + Math.random() * 40,
          size: 1 + Math.random() * 2,
          color: Math.random() > 0.5 ? "#ff4444" : "#ffaa22",
        });
      }
    };

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (Math.random() > 0.85) spawn();

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.08; // gravity
        s.life++;
        const alpha = 1 - s.life / s.maxLife;
        if (alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = alpha;
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      requestAnimationFrame(loop);
    };
    loop();
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
        this.lifeTime = 3000; // longer life for blossom effect
        this.expireAt = Date.now() + this.lifeTime;
        this.current = [x, y];
        this.destination = [
          x + (Math.random() - 0.5) * 40, // wider spread — flower blossom
          y + (Math.random() - 0.5) * 40,
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
        if (Math.random() > 0.96)
          // more particles for dense blossom effect
          ACTIVE_ELECTRONS.push(new Electron(this.x, this.y));
        context.globalAlpha = 0.5; // brighter / more highlighted
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
    tempCtx.fillText(text, tempCanvas.width / 2, tempCanvas.height / 2 + 200); // moved text lower

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

    const getSceneLayout = (width: number) => {
      const isMobile = width < 640;
      const isTablet = width >= 640 && width < 1024;

      return {
        fov: isMobile ? 48 : isTablet ? 40 : 35,
        cameraY: isMobile ? 1.08 : isTablet ? 0.95 : 0.8,
        cameraZ: isMobile ? 6.25 : isTablet ? 5.5 : 5,
        carScale: isMobile ? 0.95 : isTablet ? 1.1 : 1.25,
        carY: isMobile ? 0.4 : isTablet ? 0.48 : 0.55,
        carZ: isMobile ? -0.35 : isTablet ? -0.7 : -1,
        carFloatAmplitude: isMobile ? 0.022 : 0.032,
      };
    };

    const initialLayout = getSceneLayout(window.innerWidth);

    const scene = new THREE.Scene();
    // Scene will use renderer's clear color (black) for layering
    scene.fog = new THREE.Fog(0x000000, 10, 20);

    const camera = new THREE.PerspectiveCamera(
      initialLayout.fov,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    camera.position.set(0, initialLayout.cameraY, initialLayout.cameraZ);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0); // Black background but alpha enabled for layering
    renderer.toneMapping = THREE.ACESFilmicToneMapping; // Realistic tone mapping
    renderer.toneMappingExposure = 1.0; // Natural exposure

    mountRef.current.appendChild(renderer.domElement);

    // Reduced ambient light for darker/moodier look
    const ambient = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(ambient);

    // DRAMATIC WHITE SPOTLIGHT FROM ABOVE - shifted slightly right
    const mainLight = new THREE.SpotLight(
      0xffffff,
      250,
      25,
      Math.PI / 5,
      0.4,
      1.2,
    );
    mainLight.position.set(1.5, 10, 1); // shifted right
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.near = 1;
    mainLight.shadow.camera.far = 25;
    scene.add(mainLight);

    // Target for main light - shifted right
    const mainTarget = new THREE.Object3D();
    mainTarget.position.set(0.8, 0, 0); // shifted right
    scene.add(mainTarget);
    mainLight.target = mainTarget;

    // Front fill light - shifted right
    const frontLight = new THREE.DirectionalLight(0xffffff, 0.8);
    frontLight.position.set(1.2, 3, 5); // shifted right + dimmer for darker feel
    scene.add(frontLight);

    // Secondary white rim lights from sides - shifted right
    const rimLight1 = new THREE.SpotLight(
      0xffffff,
      120,
      18,
      Math.PI / 3,
      0.5,
      1.5,
    );
    rimLight1.position.set(-3.5, 7, -2); // shifted right from -5
    rimLight1.castShadow = true;
    scene.add(rimLight1);
    const rimTarget1 = new THREE.Object3D();
    rimTarget1.position.set(0.8, 0, 0); // shifted right
    scene.add(rimTarget1);
    rimLight1.target = rimTarget1;

    const rimLight2 = new THREE.SpotLight(
      0xffffff,
      120,
      18,
      Math.PI / 3,
      0.5,
      1.5,
    );
    rimLight2.position.set(6.5, 7, -2); // shifted right from 5
    scene.add(rimLight2);
    const rimTarget2 = new THREE.Object3D();
    rimTarget2.position.set(0.8, 0, 0); // shifted right
    scene.add(rimTarget2);
    rimLight2.target = rimTarget2;

    // FOCUSED WHITE LIGHTS ON CAR ROOF - shifted right
    const roofLight1 = new THREE.SpotLight(
      0xffffff,
      180,
      12,
      Math.PI / 8,
      0.3,
      1.8,
    );
    roofLight1.position.set(-0.5, 6, 0); // shifted right from -2
    roofLight1.castShadow = true;
    scene.add(roofLight1);
    const roofTarget1 = new THREE.Object3D();
    roofTarget1.position.set(0.8, 0.3, 0); // shifted right
    scene.add(roofTarget1);
    roofLight1.target = roofTarget1;

    const roofLight2 = new THREE.SpotLight(
      0xffffff,
      180,
      12,
      Math.PI / 8,
      0.3,
      1.8,
    );
    roofLight2.position.set(3.5, 6, 0); // shifted right from 2
    roofLight2.castShadow = true;
    scene.add(roofLight2);
    const roofTarget2 = new THREE.Object3D();
    roofTarget2.position.set(0.8, 0.3, 0); // shifted right
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
    let centeredCarX = 0;
    let carFloatBaseY = initialLayout.carY;
    let carFloatAmplitude = initialLayout.carFloatAmplitude;

    const applyResponsiveSceneLayout = (width: number, height: number) => {
      const layout = getSceneLayout(width);
      camera.aspect = width / height;
      camera.fov = layout.fov;
      camera.position.set(0, layout.cameraY, layout.cameraZ);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      carFloatBaseY = layout.carY;
      carFloatAmplitude = layout.carFloatAmplitude;

      if (carModel) {
        carModel.scale.set(layout.carScale, layout.carScale, layout.carScale);
        carModel.position.x = centeredCarX;
        carModel.position.y = layout.carY;
        carModel.position.z = layout.carZ;
      }
    };

    loader.load(
      MODEL_URL,
      (g) => {
        carModel = g.scene;

        // Scale is applied through viewport-aware layout below.
        carModel.scale.set(
          initialLayout.carScale,
          initialLayout.carScale,
          initialLayout.carScale,
        );

        // Apply realistic materials and shadows for F1 car
        carModel.traverse((n) => {
          if ((n as THREE.Mesh).isMesh) {
            n.castShadow = true;
            n.receiveShadow = true;
            const mesh = n as THREE.Mesh;
            if (mesh.material) {
              const material = mesh.material as THREE.MeshStandardMaterial;
              // Realistic F1 car material properties - balanced for realism
              material.roughness = 0.35; // Not too shiny, realistic paint/carbon
              material.metalness = 0.7; // Mixed metallic and painted surfaces
              material.envMapIntensity = 1.0; // Natural reflections
              material.needsUpdate = true;
            }
          }
        });

        // Position car higher and behind the text
        const box = new THREE.Box3().setFromObject(carModel);
        const center = box.getCenter(new THREE.Vector3());
        carModel.position.sub(center);
        centeredCarX = carModel.position.x;
        applyResponsiveSceneLayout(window.innerWidth, window.innerHeight);

        scene.add(carModel);
      },
      (progress) => {
        // Optional: track loading progress
        console.log(
          `Loading model: ${(progress.loaded / progress.total) * 100}%`,
        );
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
        // Add subtle floating animation with viewport-aware amplitude.
        carModel.position.y =
          carFloatBaseY + Math.sin(time * 0.8) * carFloatAmplitude;
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      applyResponsiveSceneLayout(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    applyResponsiveSceneLayout(window.innerWidth, window.innerHeight);

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
      rayPos: {
        value: new Float32Array([
          window.innerWidth / 2 + (window.innerWidth < 640 ? 40 : 120),
          -500,
        ]),
      },
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
        window.innerWidth / 2 + (window.innerWidth < 640 ? 40 : 120),
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
    <section
      className="relative h-[100dvh] min-h-[100dvh] w-full overflow-hidden font-sans"
      style={{ background: "#000000" }}
    >
      {/* --- LOADER OVERLAY --- */}
      <div
        className={`fixed inset-0 bg-black flex flex-col justify-center items-center z-[9999] transition-all duration-1000 ${loading ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
      >
        <div className="text-center">
          {progress < 100 ? (
            <>
              {/* UPDATED: Loading Text */}
              <div className="mb-5 px-4 text-center text-[8vw] leading-tight font-black italic tracking-[2px] text-red-600 drop-shadow-[0_0_20px_rgba(255,0,0,0.6)] sm:text-5xl sm:tracking-[12px] whitespace-normal sm:whitespace-nowrap">
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
        {/* Nav Bar — Light & Transparent */}
        <nav className="absolute top-0 z-50 w-full px-4 pt-3 sm:px-8 sm:pt-4 lg:px-12 lg:pt-5">
          <div
            className="mx-auto flex items-center justify-between gap-3 rounded-2xl border border-white/[0.04] px-5 py-3 sm:px-8 sm:py-4"
            style={{
              background: "rgba(0,0,0,0.15)",
              backdropFilter: "blur(8px) saturate(1.1)",
              WebkitBackdropFilter: "blur(8px) saturate(1.1)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
            }}
          >
            {/* Logo */}
            <a
              href="#hero"
              className="relative font-black tracking-[0.2em] sm:text-3xl font-orbitron group overflow-hidden px-2 py-1"
              style={{
                textTransform: "uppercase",
              }}
            >
              {/* Main Text with Gradient & Glow */}
              <span
                className="relative z-10 transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(to bottom right, #ffffff, #ff6b6b 40%, #cc0000)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 12px rgba(255,0,0,0.6))",
                }}
              >
                SOLUTIONS
              </span>

              {/* Animated Shine Sweep on Hover */}
              <span className="absolute inset-0 z-20 -translate-x-[150%] skew-x-[-25deg] bg-gradient-to-r from-transparent via-white/50 to-transparent transition-all duration-700 ease-out group-hover:translate-x-[150%]" />

              {/* Dynamic Bottom Line */}
              <span
                className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full transition-all duration-300 group-hover:h-[4px]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #ff0000, transparent)",
                  boxShadow: "0 0 10px #ff0000, 0 0 20px #ff0000",
                }}
              />
            </a>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-2 lg:gap-3">
              {[
                { label: "Prize Pool", href: "#prizepool" },
                { label: "Testimonial", href: "#testimonial-garage" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group relative px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/60 transition-all duration-300 hover:text-white lg:px-4 lg:text-xs"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-gradient-to-r from-red-600 to-red-400 transition-all duration-300 group-hover:w-3/4" />
                </a>
              ))}

              <button
                type="button"
                onClick={onFaqClick}
                className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/60 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.06] hover:text-white lg:text-xs"
              >
                FAQ
              </button>
            </div>

            {/* Mobile buttons */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                type="button"
                onClick={onFaqClick}
                className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white/60 transition active:scale-[0.97]"
              >
                FAQ
              </button>
              <button
                type="button"
                aria-label="Toggle navigation menu"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-2 text-zinc-200 transition active:scale-[0.96]"
              >
                {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>

          {/* Mobile menu dropdown */}
          {mobileMenuOpen && (
            <div
              className="mx-auto mt-2 rounded-xl border border-white/[0.04] p-3 md:hidden"
              style={{
                background: "rgba(0,0,0,0.3)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Prize Pool", href: "#prizepool" },
                  { label: "Testimonial", href: "#testimonial-garage" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-lg border border-white/[0.04] bg-white/[0.03] px-3 py-2.5 text-center text-xs font-bold uppercase tracking-[0.12em] text-zinc-200 transition active:scale-[0.97]"
                  >
                    {item.label}
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
          className="absolute inset-0 z-50 pointer-events-none mix-blend-screen hidden lg:block"
        />

        {/* Sparks overlay */}
        <canvas
          ref={sparksCanvasRef}
          className="absolute inset-0 z-40 pointer-events-none"
        />

        {/* ===== INTERACTIVE SOLUTIONS 2K26 TITLE (mobile fallback + glitch/glow) ===== */}
        <div
          className="absolute inset-x-0 bottom-[9svh] z-50 flex flex-col items-center px-4 pointer-events-auto lg:hidden"
          onMouseEnter={() => setMouseOnText(true)}
          onMouseLeave={() => setMouseOnText(false)}
        >
          <h1
            className="relative select-none cursor-pointer text-center w-full min-w-0"
            style={{
              fontFamily: '"Orbitron", sans-serif',
              fontWeight: 900,
              fontSize: "clamp(2rem, 10vw, 4rem)",
              letterSpacing: isMobileViewport ? "0.02em" : "0.14em",
              lineHeight: 1.1,
              maxWidth: "100%",
              wordWrap: "break-word",
              color: "transparent",
              background: mouseOnText
                ? "linear-gradient(90deg, #ff0000, #ff6644, #ff0000)"
                : "linear-gradient(90deg, #cc0000, #ff2222, #cc0000)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: mouseOnText
                ? "0 0 40px rgba(255,0,0,0.9), 0 0 80px rgba(255,0,0,0.5)"
                : "0 0 20px rgba(255,0,0,0.6)",
              filter: glitchActive ? "blur(1px) hue-rotate(20deg)" : "none",
              transform: glitchActive ? "translateX(2px) skewX(-1deg)" : "none",
              transition: "text-shadow 0.3s, filter 0.1s, transform 0.1s",
              animation: "glowPulse 2.5s ease-in-out infinite",
            }}
          >
            SOLUTIONS 2K26
          </h1>
        </div>

        {/* ===== RPM Tachometer (bottom-right) ===== */}
        <div className="absolute bottom-6 right-6 z-50 pointer-events-none hidden sm:flex flex-col items-end gap-1">
          <div
            className="font-mono text-xs tracking-widest uppercase"
            style={{
              color: "rgba(255,60,60,0.5)",
              fontFamily: '"Orbitron", sans-serif',
            }}
          >
            RPM
          </div>
          <div
            className="font-black tabular-nums"
            style={{
              fontFamily: '"Orbitron", sans-serif',
              fontSize: "2rem",
              color: rpmValue > 15000 ? "#ff2222" : "#cc3333",
              textShadow:
                rpmValue > 15000
                  ? "0 0 20px rgba(255,0,0,0.8), 0 0 40px rgba(255,0,0,0.4)"
                  : "0 0 10px rgba(255,0,0,0.4)",
              transition: "color 0.15s",
            }}
          >
            {rpmValue.toLocaleString()}
          </div>
          {/* RPM bar */}
          <div className="w-[120px] h-[3px] bg-red-900/30 rounded overflow-hidden">
            <div
              className="h-full rounded transition-all duration-75"
              style={{
                width: `${Math.min((rpmValue / 18000) * 100, 100)}%`,
                background:
                  rpmValue > 15000
                    ? "linear-gradient(90deg, #ff4444, #ff0000)"
                    : "linear-gradient(90deg, #880000, #cc2222)",
                boxShadow: rpmValue > 15000 ? "0 0 8px #ff0000" : "none",
              }}
            />
          </div>
        </div>

        {/* ===== Speed Lines (sides) ===== */}
        <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
          {[...Array(isMobileViewport ? 4 : 8)].map((_, i) => (
            <div
              key={`sl-${i}`}
              className="absolute"
              style={{
                left: i < 4 ? `${2 + i * 3}%` : "auto",
                right: i >= 4 ? `${2 + (i - 4) * 3}%` : "auto",
                top: `${20 + Math.random() * 50}%`,
                width: "1px",
                height: `${60 + Math.random() * 100}px`,
                background: `linear-gradient(to bottom, transparent, rgba(255,0,0,${0.05 + Math.random() * 0.1}), transparent)`,
                animation: `speedLine ${1.5 + Math.random() * 2}s linear infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* ===== F1 START LIGHTS (Foreground) ===== */}
        <div className="absolute left-1/2 top-[22%] sm:top-[14%] z-[60] -translate-x-1/2 scale-[0.6] sm:scale-100">
          {/* Metallic housing bar */}
          <div
            className="flex items-center gap-4 rounded-xl border border-white/[0.08] px-6 py-3"
            style={{
              background:
                "linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 50%, #141414 100%)",
              boxShadow:
                "0 8px 32px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 60px rgba(255,0,0,0.15)",
            }}
          >
            {[...Array(5)].map((_, i) => (
              <div key={i} className="relative flex flex-col items-center">
                {/* Light housing */}
                <div
                  className="relative flex h-10 w-10 items-center justify-center rounded-full"
                  style={{
                    background: "radial-gradient(circle, #1a1a1a, #0a0a0a)",
                    border: "2px solid #2a2a2a",
                    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.6)",
                  }}
                >
                  {/* The light bulb */}
                  <div
                    className="h-6 w-6 rounded-full"
                    style={{
                      animation: `f1StartLight 4s ease-in-out infinite`,
                      animationDelay: `${i * 0.6}s`,
                      background:
                        "radial-gradient(circle at 35% 35%, #330000, #1a0000)",
                      boxShadow: "inset 0 1px 3px rgba(255,0,0,0.1)",
                    }}
                  />
                </div>
                {/* Glow halo beneath */}
                <div
                  className="absolute -bottom-1 h-3 w-8 rounded-full blur-md"
                  style={{
                    animation: `f1GlowHalo 4s ease-in-out infinite`,
                    animationDelay: `${i * 0.6}s`,
                    background: "transparent",
                  }}
                />
              </div>
            ))}
          </div>
          {/* Support bar */}
          <div className="mx-auto h-4 w-2 bg-gradient-to-b from-zinc-800 to-zinc-900" />
          <div className="mx-auto h-1 w-8 rounded-b bg-zinc-800 shadow-[0_4px_12px_rgba(0,0,0,0.5)]" />
        </div>

        {/* ===== KEYFRAME STYLES ===== */}
        <style>{`
          @keyframes glowPulse {
            0%, 100% { filter: drop-shadow(0 0 8px rgba(255,0,0,0.5)); }
            50% { filter: drop-shadow(0 0 25px rgba(255,0,0,0.9)) drop-shadow(0 0 50px rgba(255,50,0,0.4)); }
          }
          @keyframes speedLine {
            0%   { transform: translateY(-120px); opacity: 0; }
            20%  { opacity: 1; }
            80%  { opacity: 1; }
            100% { transform: translateY(120px); opacity: 0; }
          }
          @keyframes f1StartLight {
            0%, 10% {
              background: radial-gradient(circle at 35% 35%, #330000, #1a0000);
              box-shadow: inset 0 1px 3px rgba(255,0,0,0.1);
            }
            15%, 50% {
              background: radial-gradient(circle at 35% 35%, #ff2222, #cc0000, #880000);
              box-shadow: inset 0 1px 3px rgba(255,100,100,0.4), 0 0 20px rgba(255,0,0,0.8), 0 0 50px rgba(255,0,0,0.4);
            }
            55%, 100% {
              background: radial-gradient(circle at 35% 35%, #330000, #1a0000);
              box-shadow: inset 0 1px 3px rgba(255,0,0,0.1);
            }
          }
          @keyframes f1GlowHalo {
            0%, 10% { background: transparent; }
            15%, 50% { background: rgba(255,0,0,0.5); }
            55%, 100% { background: transparent; }
          }
        `}</style>
      </div>
    </section>
  );
};
