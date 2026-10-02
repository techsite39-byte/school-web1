"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import styles from "./SchoolJourneyHero.module.css";

const images = {
  sports: "/sports.png",
  technology: "/technology.png",
  academics: "/academics.png",
  library: "/school.png",
  tower: "/building1.png",
  school: "/school2.png",
  facade: "/building.png",
};

export function SchoolJourneyHero() {
  const filmRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const film = filmRef.current;
    if (!film) return;

    const canvas = film.querySelector<HTMLCanvasElement>("canvas");
    const black = film.querySelector<HTMLElement>(`.${styles.black}`)!;
    const title = film.querySelector<HTMLElement>(`.${styles.title}`)!;
    if (!canvas) return;

    const mobile = window.matchMedia("(max-width:800px)").matches || (navigator.hardwareConcurrency || 8) <= 4;
    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: !mobile,
        powerPreference: "high-performance",
      });
    } catch {
      film.classList.add(styles.noGl);
      title.style.opacity = "1";
      black.style.display = "none";
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2));
    renderer.shadowMap.enabled = !mobile;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    const scene = new THREE.Scene();
    const fog = new THREE.FogExp2(0x0a1022, 0.0065);
    scene.fog = fog;
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 700);
    const uniforms = {
      top: { value: new THREE.Color() },
      bot: { value: new THREE.Color() },
    };

    scene.add(new THREE.Mesh(
      new THREE.SphereGeometry(500, 16, 12),
      new THREE.ShaderMaterial({
        uniforms,
        side: THREE.BackSide,
        depthWrite: false,
        fog: false,
        vertexShader: "varying float h;void main(){h=normalize(position).y;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
        fragmentShader: "uniform vec3 top;uniform vec3 bot;varying float h;void main(){gl_FragColor=vec4(mix(bot,top,smoothstep(-.05,.6,h)),1.);}",
      }),
    ));

    const material = (color: number | string | THREE.Color, options: THREE.MeshStandardMaterialParameters = {}) =>
      new THREE.MeshStandardMaterial({ color, roughness: 0.85, metalness: 0.05, ...options });
    const campus = new THREE.Group();
    scene.add(campus);

    function box(
      width: number,
      height: number,
      depth: number,
      x: number,
      y: number,
      z: number,
      surface: THREE.Material,
      parent: THREE.Object3D = campus,
    ) {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), surface);
      mesh.position.set(x, y, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      parent.add(mesh);
      return mesh;
    }

    const cream = material(0xeadfc9);
    const wood = material(0xb98a5a);
    const brick = material(0xa8553e);
    const glass = material(0x9fd0ff, {
      roughness: 0.2,
      metalness: 0.6,
      emissive: 0xffd59a,
      emissiveIntensity: 0,
    });

    const ground = new THREE.Mesh(new THREE.PlaneGeometry(700, 700), material(0x4a7436));
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    campus.add(ground);
    box(5, 0.12, 130, 0, 0.06, 65, material(0xd6c9ae));
    box(30, 0.12, 10, 0, 0.06, 6, material(0xcbbd9f));

    box(12.5, 12, 1, -8.75, 6, 0, cream);
    box(12.5, 12, 1, 8.75, 6, 0, cream);
    box(5, 6.5, 1, 0, 8.75, 0, cream);
    [-1, 1].forEach((side) => {
      box(0.9, 6, 0.9, side * 3, 3, 2.2, brick);
      box(1.2, 12, 0.6, side * 15.3, 6, 0.4, brick);
    });
    box(8, 0.5, 5, 0, 6.2, 2.2, brick);
    box(40, 0.6, 48, 0, 12.3, -23, brick);
    box(7, 9, 7, 0, 17, -4, cream);

    const clockMaterial = material(0xfff2d0, { emissive: 0xffd08a, emissiveIntensity: 0.8 });
    const clockFace = new THREE.Mesh(new THREE.CircleGeometry(2, 24), clockMaterial);
    clockFace.position.set(0, 17.5, -0.45);
    campus.add(clockFace);

    const textureLoader = new THREE.TextureLoader();
    function facadePanel(left: number, right: number, bottom: number, top: number) {
      const texture = textureLoader.load(images.facade);
      texture.repeat.set((right - left) / 30, (top - bottom) / 12.25);
      texture.offset.set((left + 15) / 30, bottom / 12.25);
      const panel = new THREE.Mesh(
        new THREE.PlaneGeometry(right - left, top - bottom),
        new THREE.MeshBasicMaterial({ map: texture, color: 0xe8e8e8 }),
      );
      panel.position.set((left + right) / 2, (bottom + top) / 2, 0.52);
      campus.add(panel);
    }
    facadePanel(-15, -2.5, 0, 12.25);
    facadePanel(2.5, 15, 0, 12.25);
    facadePanel(-2.5, 2.5, 5.5, 12.25);

    const room = new THREE.Group();
    campus.add(room);
    box(30, 0.5, 46, 0, -0.25, -23, wood, room);
    box(1, 12, 46, -15.5, 6, -23, cream, room);
    box(1, 12, 46, 15.5, 6, -23, cream, room);
    box(32, 12, 1, 0, 6, -46, cream, room);
    box(30, 0.4, 46, 0, 11.9, -23, cream, room);

    function framedImage(key: keyof typeof images, width: number, height: number, x: number, y: number, z: number, rotationY: number) {
      const frame = new THREE.Group();
      frame.add(new THREE.Mesh(new THREE.BoxGeometry(width + 0.5, height + 0.5, 0.2), material(0x2a2118)));
      const picture = new THREE.Mesh(
        new THREE.PlaneGeometry(width, height),
        new THREE.MeshBasicMaterial({ map: textureLoader.load(images[key]), color: 0xf0f0f0 }),
      );
      picture.position.z = 0.12;
      frame.add(picture);
      frame.position.set(x, y, z);
      frame.rotation.y = rotationY;
      room.add(frame);
    }
    framedImage("academics", 8, 5.3, -14.8, 6, -16, Math.PI / 2);
    framedImage("sports", 8, 5.3, -14.8, 6, -30, Math.PI / 2);
    framedImage("technology", 4.5, 6.75, 14.8, 6, -20, -Math.PI / 2);
    framedImage("library", 16, 10.7, 0, 6, -45.2, 0);
    for (const x of [-9, -3, 3, 9]) {
      for (const z of [-14, -22, -30, -38]) {
        box(2.4, 0.15, 1.4, x, 1.2, z, wood, room);
        box(0.2, 1.2, 0.2, x, 0.6, z, brick, room);
      }
    }

    const leftDoor = box(2.5, 5.5, 0.25, -1.25, 2.75, 0.7, glass);
    const rightDoor = box(2.5, 5.5, 0.25, 1.25, 2.75, 0.7, glass);
    const glow = new THREE.Mesh(
      new THREE.PlaneGeometry(5, 5.5),
      new THREE.MeshBasicMaterial({
        color: 0xffc98a,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    glow.position.set(0, 2.75, -0.6);
    campus.add(glow);

    const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.48, 5.2, 9, 4);
    const branchGeometry = new THREE.CylinderGeometry(0.035, 0.15, 1, 7);
    const foliageGeometry = new THREE.SphereGeometry(1, 28, 20);
    const foliageVertices = foliageGeometry.attributes.position;
    for (let index = 0; index < foliageVertices.count; index += 1) {
      const x = foliageVertices.getX(index);
      const y = foliageVertices.getY(index);
      const z = foliageVertices.getZ(index);
      const variation = 1 + Math.sin(x * 13 + z * 9) * Math.cos(y * 15 - z * 7) * 0.045;
      foliageVertices.setXYZ(index, x * variation, y * variation, z * variation);
    }
    foliageGeometry.computeVertexNormals();
    const trunkMaterial = material(0x6b4a30);
    const branchMaterial = material(0x765034);
    const foliageMaterials = [
      material(0x315b32),
      material(0x386b38),
      material(0x3d713b),
      material(0x477846),
    ];
    const swayingFoliage: Array<[THREE.Group, number]> = [];
    function tree(x: number, z: number, scale: number) {
      const group = new THREE.Group();
      const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
      const crown = new THREE.Group();
      const treeFoliageMaterial = foliageMaterials[(Math.random() * foliageMaterials.length) | 0];
      trunk.position.y = 2.6;
      crown.position.y = 3.5;
      trunk.castShadow = true;
      group.add(trunk, crown);

      for (let index = 0; index < 5; index += 1) {
        const angle = (index / 5) * Math.PI * 2 + Math.random() * 0.35;
        const start = new THREE.Vector3(Math.cos(angle) * 0.18, Math.random() * 0.7, Math.sin(angle) * 0.18);
        const end = new THREE.Vector3(
          Math.cos(angle) * (1.1 + Math.random() * 0.45),
          0.9 + Math.random() * 1.2,
          Math.sin(angle) * (1.1 + Math.random() * 0.45),
        );
        const direction = end.clone().sub(start);
        const branch = new THREE.Mesh(branchGeometry, branchMaterial);
        branch.position.copy(start).add(end).multiplyScalar(0.5);
        branch.scale.y = direction.length();
        branch.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
        branch.castShadow = true;
        crown.add(branch);
      }

      const clusters = [
        [0, 1.2, 0, 1.9, 1.18, 1.72],
        [0.82, 1.12, 0.02, 1.02, 0.98, 1.02],
        [-0.82, 1.16, -0.04, 1.04, 1.02, 1.04],
        [0.02, 1.82, 0.04, 1.12, 0.95, 1.1],
        [0.02, 0.72, 0.02, 1.12, 0.82, 1.12],
        [0.12, 1.22, 0.82, 1.02, 0.94, 0.96],
        [-0.08, 1.18, -0.82, 1.02, 0.96, 0.98],
        [0.7, 1.72, -0.58, 0.88, 0.82, 0.88],
        [-0.68, 1.68, 0.58, 0.9, 0.84, 0.9],
        [-0.68, 1.68, -0.58, 0.88, 0.82, 0.9],
        [0.68, 1.72, 0.58, 0.9, 0.84, 0.88],
      ];
      for (const [clusterX, clusterY, clusterZ, sizeX, sizeY, sizeZ] of clusters) {
        const leaves = new THREE.Mesh(foliageGeometry, treeFoliageMaterial);
        leaves.position.set(
          clusterX + (Math.random() - 0.5) * 0.22,
          clusterY + (Math.random() - 0.5) * 0.2,
          clusterZ + (Math.random() - 0.5) * 0.22,
        );
        leaves.scale.set(sizeX, sizeY, sizeZ);
        leaves.rotation.y = Math.random() * Math.PI * 2;
        leaves.castShadow = true;
        crown.add(leaves);
      }

      group.position.set(x, 0, z);
      group.scale.setScalar(scale);
      campus.add(group);
      swayingFoliage.push([crown, Math.random() * 6]);
    }
    for (let z = 14; z < 110; z += mobile ? 16 : 9) {
      tree(-9 - Math.random() * 3, z, 1 + Math.random() * 0.4);
      tree(9 + Math.random() * 3, z, 1 + Math.random() * 0.4);
    }
    for (let index = 0; index < (mobile ? 8 : 26); index += 1) {
      const angle = Math.random() * 6.28;
      const radius = 30 + Math.random() * 80;
      tree(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.6 + 40, 1.3 + Math.random() * 0.8);
    }

    const flags: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial>[] = [];
    [-8, 8].forEach((x) => {
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 14, 6), material(0xdddddd));
      pole.position.set(x, 7, 18);
      campus.add(pole);
      const geometry = new THREE.PlaneGeometry(3, 1.7, 10, 4);
      geometry.translate(1.5, 0, 0);
      const flag = new THREE.Mesh(
        geometry,
        new THREE.MeshStandardMaterial({ color: x < 0 ? 0xe8a24a : 0x2f6b4f, side: THREE.DoubleSide }),
      );
      flag.position.set(x + 0.1, 12.5, 18);
      campus.add(flag);
      flags.push(flag);
    });

    [-4, 4].forEach((x) => box(1.2, 5, 1.2, x, 2.5, 100, brick));
    box(9.5, 0.8, 1, 0, 5, 100, brick);
    [-11, 11].forEach((x) => {
      box(2.2, 0.3, 0.8, x, 0.7, 34, wood);
      box(2.2, 0.8, 0.2, x, 1.2, 33.7, wood);
    });
    box(0.2, 5, 0.2, -30, 2.5, 38, material(0x888888));
    box(0.2, 5, 0.2, -26, 2.5, 38, material(0x888888));
    box(4.4, 0.2, 0.2, -28, 5, 38, material(0x888888));
    box(1, 0.15, 0.5, -28, 1.6, 38, wood);
    for (let index = 0; index < 9; index += 1) {
      const hill = new THREE.Mesh(new THREE.ConeGeometry(55, 40 + Math.random() * 40, 6), material(0x587386));
      hill.position.set(-200 + index * 50, 15, -130 - Math.random() * 30);
      campus.add(hill);
    }

    const birds: THREE.Group[] = [];
    for (let index = 0; index < (mobile ? 4 : 8); index += 1) {
      const bird = new THREE.Group();
      const birdMaterial = new THREE.MeshBasicMaterial({ color: 0x1a2030, side: THREE.DoubleSide });
      const wingGeometry = new THREE.PlaneGeometry(1.4, 0.4);
      const leftWing = new THREE.Mesh(wingGeometry, birdMaterial);
      const rightWing = new THREE.Mesh(wingGeometry, birdMaterial);
      leftWing.position.x = -0.7;
      rightWing.position.x = 0.7;
      const leftPivot = new THREE.Group();
      const rightPivot = new THREE.Group();
      leftPivot.add(leftWing);
      rightPivot.add(rightWing);
      bird.add(leftPivot, rightPivot);
      bird.userData = {
        leftPivot,
        rightPivot,
        phase: Math.random() * 6,
        speed: 0.05 + Math.random() * 0.04,
        y: 35 + Math.random() * 25,
        radius: 60 + Math.random() * 50,
      };
      scene.add(bird);
      birds.push(bird);
    }

    const floatingObjects: THREE.Object3D[] = [];
    const colors = [0xe8a24a, 0x6fc29a, 0x8fb4ff, 0xf07a6a, 0xffffff];
    const objectFactories = [
      () => {
        const group = new THREE.Group();
        group.add(
          new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.3, 0.9), material(colors[(Math.random() * 4) | 0])),
          new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.22, 0.85), material(0xfaf5e8)),
        );
        return group;
      },
      () => {
        const group = new THREE.Group();
        group.add(
          new THREE.Mesh(new THREE.SphereGeometry(0.8, 20, 14), material(0x3a78c2, { roughness: 0.4 })),
          new THREE.Mesh(new THREE.TorusGeometry(1, 0.04, 6, 32), material(0xe8a24a)),
        );
        group.children[1].rotation.x = 1.2;
        return group;
      },
      () => {
        const group = new THREE.Group();
        const board = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.12, 1.6), material(0x15151f));
        const base = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.6, 0.4, 12), material(0x15151f));
        base.position.y = -0.25;
        group.add(board, base);
        return group;
      },
      () => {
        const group = new THREE.Group();
        const body = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 1.6, 8), material(0xf2c14e));
        const tip = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.3, 8), material(0xe9c9a0));
        tip.position.y = -0.95;
        group.add(body, tip);
        return group;
      },
      () => new THREE.Mesh(new THREE.TorusKnotGeometry(0.5, 0.14, 48, 8), material(0x8fb4ff, { metalness: 0.5, roughness: 0.3 })),
      () => new THREE.Mesh(new THREE.OctahedronGeometry(0.7), material(0x6fc29a, { metalness: 0.4, roughness: 0.3 })),
      () => {
        const group = new THREE.Group();
        for (let index = 0; index < 3; index += 1) {
          const ring = new THREE.Mesh(
            new THREE.TorusGeometry(0.8, 0.025, 6, 32),
            material(0xffffff, { emissive: 0x8fb4ff, emissiveIntensity: 0.8 }),
          );
          ring.rotation.set(index * 1.05, index * 0.6, 0);
          group.add(ring);
        }
        group.add(new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 8), material(0xe8a24a, { emissive: 0xe8a24a })));
        return group;
      },
    ];
    for (let index = 0; index < (mobile ? 14 : 28); index += 1) {
      const object = objectFactories[index % objectFactories.length]();
      object.position.set((Math.random() - 0.5) * 26, 2.5 + Math.random() * 7, -8 - Math.random() * 34);
      object.scale.setScalar(0.8 + Math.random() * 0.8);
      object.userData = {
        phase: Math.random() * 6,
        speed: 0.2 + Math.random() * 0.4,
        rotationSpeed: (Math.random() - 0.5) * 0.4,
        y: object.position.y,
      };
      campus.add(object);
      floatingObjects.push(object);
    }

    for (let index = 0; index < 3; index += 1) {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-14, 2 + index * 3, -10),
        new THREE.Vector3(-4, 6 + index * 2, -22),
        new THREE.Vector3(5, 3 + index * 3, -32),
        new THREE.Vector3(14, 8, -44),
      ]);
      scene.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(curve.getPoints(60)),
        new THREE.LineBasicMaterial({ color: 0xa8c8ff, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending }),
      ));
    }

    const particleCount = mobile ? 450 : 1100;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index += 1) {
      particlePositions[index * 3] = (Math.random() - 0.5) * 120;
      particlePositions[index * 3 + 1] = Math.random() * 50;
      particlePositions[index * 3 + 2] = -44 + Math.random() * 160;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        color: 0xffe2b8,
        size: 0.3,
        transparent: true,
        opacity: 0.65,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    scene.add(particles);

    const sun = new THREE.DirectionalLight(0xffd0a0, 0);
    const hemisphere = new THREE.HemisphereLight(0x8fb4ff, 0x3a2d1e, 0);
    const rim = new THREE.DirectionalLight(0x7fa8ff, 0);
    const interiorLight = new THREE.PointLight(0xffc98a, 0, 70);
    sun.position.set(60, 70, 60);
    sun.castShadow = !mobile;
    sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -80, right: 80, top: 80, bottom: -80, far: 260 });
    sun.shadow.bias = -0.0005;
    rim.position.set(-40, 30, -60);
    interiorLight.position.set(0, 9, -16);
    scene.add(sun, hemisphere, rim, interiorLight);

    const curve = (points: number[][]) => new THREE.CatmullRomCurve3(points.map((point) => new THREE.Vector3(...point)));
    const cameraPath = curve([
      [0, 46, 105], [0, 34, 82], [0, 16, 52], [0, 4, 30],
      [0, 2.6, 14], [0, 2.6, 5], [0, 3.2, -6], [0, 3.6, -20],
    ]);
    const targetPath = curve([
      [0, 6, 0], [0, 6, 0], [0, 5, 0], [0, 4, 0],
      [0, 3.5, 0], [0, 3.5, -10], [0, 4, -22], [0, 5, -40],
    ]);
    const colorsByTime = {
      night: [0x02040a, 0x0a1022],
      day: [0x5f8fc9, 0xf6c89a],
      interior: [0x151a2c, 0x241c1a],
    };
    const names = ["Aerial", "Approach", "Descent", "The path", "Entrance", "Doors open", "Inside", "The classroom"];
    const shot = film.querySelector<HTMLElement>(`.${styles.shot}`)!;
    const firstText = film.querySelector<HTMLElement>(`.${styles.firstText}`)!;
    const secondText = film.querySelector<HTMLElement>(`.${styles.secondText}`)!;
    const headline = film.querySelector<HTMLElement>(`.${styles.headline}`)!;
    const flash = film.querySelector<HTMLElement>(`.${styles.flash}`)!;
    const scrollCue = film.querySelector<HTMLElement>(`.${styles.scrollCue}`)!;

    let targetProgress = 0;
    let currentProgress = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let visible = true;
    const intro = { value: 0 };
    gsap.registerPlugin(ScrollTrigger);
    const trigger = ScrollTrigger.create({
      trigger: film,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => { targetProgress = self.progress; },
    });
    const introTween = gsap.to(intro, { value: 1, duration: 4.5, ease: "power2.inOut" });
    const observer = new IntersectionObserver((entries) => { visible = entries[0].isIntersecting; });
    observer.observe(film);
    const onMouseMove = (event: MouseEvent) => {
      targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    function resize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.fov = width / height < 1 ? 72 : 50;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener("resize", resize);

    function smoothstep(start: number, end: number, value: number) {
      const progress = Math.min(1, Math.max(0, (value - start) / (end - start)));
      return progress * progress * (3 - 2 * progress);
    }
    function reveal(element: HTMLElement, start: number, inEnd: number, outStart: number, end: number, progress: number) {
      const opacity = smoothstep(start, inEnd, progress) * (1 - smoothstep(outStart, end, progress));
      element.style.opacity = String(opacity);
      element.style.filter = `blur(${((1 - opacity) * 12).toFixed(1)}px)`;
      element.style.transform = `translateY(${-50 + (1 - opacity) * 8}%)`;
      return opacity;
    }

    const clock = new THREE.Clock();
    let animationFrame = 0;
    function animate() {
      animationFrame = window.requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.05);
      const time = clock.elapsedTime;
      if (!visible) return;

      currentProgress += (targetProgress - currentProgress) * (1 - Math.exp(-delta * 3.2));
      const progress = currentProgress;
      const introProgress = intro.value;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      if (mobile) {
        mouseX = Math.sin(time * 0.3) * 0.5;
        mouseY = Math.cos(time * 0.25) * 0.3;
      }

      const day = smoothstep(0.02, 0.2, progress + introProgress * 0.04);
      const interior = smoothstep(0.56, 0.66, progress);
      const opening = smoothstep(0.5, 0.62, progress);
      uniforms.top.value.set(colorsByTime.night[0]).lerp(new THREE.Color(colorsByTime.day[0]), day).lerp(new THREE.Color(colorsByTime.interior[0]), interior);
      uniforms.bot.value.set(colorsByTime.night[1]).lerp(new THREE.Color(colorsByTime.day[1]), day).lerp(new THREE.Color(colorsByTime.interior[1]), interior);
      fog.color.copy(uniforms.bot.value);
      fog.density = 0.0065 + 0.006 * interior;
      sun.intensity = 2.4 * day * (1 - 0.92 * interior) * (0.92 + 0.08 * Math.sin(time * 0.4));
      hemisphere.intensity = 0.7 * day * (1 - 0.7 * interior) + 0.1;
      rim.intensity = 0.9 * day;
      interiorLight.intensity = 0.3 + opening * 1.8 + interior * 0.6;
      glass.emissiveIntensity = opening * 0.8;
      (glow.material as THREE.MeshBasicMaterial).opacity = opening * (1 - interior) * 0.9;
      leftDoor.position.x = -1.25 - 2.5 * opening;
      rightDoor.position.x = 1.25 + 2.5 * opening;
      clockMaterial.emissiveIntensity = 0.4 + day;
      renderer.toneMappingExposure = (0.15 + 0.95 * smoothstep(0, 0.12, progress)) * (0.2 + 0.8 * introProgress);

      const cameraPosition = cameraPath.getPoint(Math.min(0.999, progress));
      const lookTarget = targetPath.getPoint(Math.min(0.999, progress));
      cameraPosition.z += (1 - introProgress) * 16;
      cameraPosition.y += Math.sin(time * 0.5) * 0.15;
      camera.position.copy(cameraPosition);
      camera.lookAt(lookTarget);
      camera.rotateY(-mouseX * 0.04);
      camera.rotateX(-mouseY * 0.025);

      particles.position.x = -mouseX * 2;
      particles.rotation.y = mouseX * 0.03;
      const positions = particleGeometry.attributes.position;
      for (let index = 0; index < particleCount; index += 1) {
        let y = positions.getY(index) + delta * (0.3 + (index % 5) * 0.08);
        if (y > 50) y = 0;
        positions.setY(index, y);
      }
      positions.needsUpdate = true;

      for (const [foliage, phase] of swayingFoliage) {
        foliage.rotation.z = Math.sin(time * 0.8 + phase) * 0.04;
        foliage.rotation.x = Math.cos(time * 0.7 + phase) * 0.03;
      }
      flags.forEach((flag) => {
        const vertices = flag.geometry.attributes.position;
        for (let index = 0; index < vertices.count; index += 1) {
          const x = vertices.getX(index);
          vertices.setZ(index, Math.sin(x * 2.2 - time * 4) * 0.2 * x / 3);
        }
        vertices.needsUpdate = true;
      });
      birds.forEach((bird) => {
        const data = bird.userData;
        const angle = time * data.speed + data.phase;
        bird.position.set(
          Math.cos(angle) * data.radius,
          data.y + Math.sin(angle * 3) * 2,
          Math.sin(angle) * data.radius * 0.5 - 60,
        );
        bird.rotation.y = -angle + Math.PI;
        const flap = Math.sin(time * 6 + data.phase) * 0.6;
        data.leftPivot.rotation.z = flap;
        data.rightPivot.rotation.z = -flap;
      });
      floatingObjects.forEach((object) => {
        const data = object.userData;
        object.position.y = data.y + Math.sin(time * data.speed + data.phase) * 0.8;
        object.rotation.y += data.rotationSpeed * delta;
        object.rotation.x = Math.sin(time * data.speed * 0.7 + data.phase) * 0.3;
      });

      renderer.render(scene, camera);
      black.style.opacity = String(1 - smoothstep(0, 0.1, progress + introProgress * 0.05) * introProgress);
      reveal(firstText, 0.1, 0.16, 0.28, 0.34, progress);
      reveal(secondText, 0.42, 0.48, 0.56, 0.6, progress);
      const titleOpacity = reveal(title, 0.84, 0.9, 0.97, 0.995, progress);
      headline.style.letterSpacing = `${(0.5 - 0.38 * titleOpacity).toFixed(3)}em`;
      flash.style.opacity = String(smoothstep(0.93, 0.995, progress));
      scrollCue.style.opacity = String(1 - smoothstep(0.01, 0.05, progress));
      const shotIndex = Math.min(7, Math.floor(progress * 8));
      shot.textContent = `Shot 0${shotIndex + 1}  ${names[shotIndex]}`;
    }
    animate();
    ScrollTrigger.refresh();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
      trigger.kill();
      introTween.kill();
      observer.disconnect();
      renderer.dispose();
    };
  }, []);

  return (
    <section ref={filmRef} className={styles.film} aria-label="Cinematic 3D tour of the school campus">
      <div className={styles.stage}>
        <canvas className={styles.canvas} aria-label="Animated 3D tour of the school campus" />
        <div className={styles.vignette} />
        <div className={`${styles.text} ${styles.firstText}`}><h2>A place built for wonder.</h2></div>
        <div className={`${styles.text} ${styles.secondText}`}><h2>Every door opens a new idea.</h2></div>
        <div className={`${styles.text} ${styles.title}`}>
          <h1 className={styles.headline}>EVERGREEN HEIGHTS</h1>
          <p>Where curiosity becomes knowledge</p>
        </div>
        <div className={styles.flash} />
        <div className={styles.black} />
        <div className={styles.hud}>
          <span className={styles.shot} />
          <div className={styles.scrollCue}>
            <span>SCROLL TO EXPLORE</span>
            <i />
          </div>
          <span />
        </div>
      </div>
    </section>
  );
}