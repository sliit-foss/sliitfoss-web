"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 120;
const CONNECTION_DISTANCE = 2.5;
const MOUSE_INFLUENCE = 3;

export function ParticleScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef(new THREE.Vector2(9999, 9999));
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Setup
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particles
    const positions: THREE.Vector3[] = [];
    const velocities: THREE.Vector3[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 6
        )
      );
      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.008,
          (Math.random() - 0.5) * 0.008,
          (Math.random() - 0.5) * 0.004
        )
      );
    }

    // Point geometry
    const pointsGeo = new THREE.BufferGeometry();
    const pointPositions = new Float32Array(PARTICLE_COUNT * 3);
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(pointPositions, 3));

    const pointsMat = new THREE.PointsMaterial({
      color: 0x6366f1,
      size: 0.06,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(pointsGeo, pointsMat);
    scene.add(points);

    // Lines geometry — preallocate max possible
    const maxLines = PARTICLE_COUNT * 10;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    // Raycaster for mouse interaction
    const raycaster = new THREE.Raycaster();
    const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const mouseWorld = new THREE.Vector3();

    // Mouse handler
    function onMouseMove(e: MouseEvent) {
      const rect = container!.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    }

    function onMouseLeave() {
      mouseRef.current.set(9999, 9999);
    }

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    // Animate
    function animate() {
      rafRef.current = requestAnimationFrame(animate);

      // Get mouse world position
      raycaster.setFromCamera(mouseRef.current, camera);
      raycaster.ray.intersectPlane(mousePlane, mouseWorld);

      // Update particles
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = positions[i];
        const v = velocities[i];

        // Mouse repulsion/attraction
        if (mouseRef.current.x !== 9999) {
          const dx = p.x - mouseWorld.x;
          const dy = p.y - mouseWorld.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_INFLUENCE) {
            const force = (MOUSE_INFLUENCE - dist) / MOUSE_INFLUENCE * 0.02;
            v.x += dx * force * 0.3;
            v.y += dy * force * 0.3;
          }
        }

        // Move
        p.add(v);

        // Damping
        v.multiplyScalar(0.995);

        // Bounds
        if (p.x > 7 || p.x < -7) v.x *= -1;
        if (p.y > 5 || p.y < -5) v.y *= -1;
        if (p.z > 3 || p.z < -3) v.z *= -1;

        pointPositions[i * 3] = p.x;
        pointPositions[i * 3 + 1] = p.y;
        pointPositions[i * 3 + 2] = p.z;
      }
      pointsGeo.attributes.position.needsUpdate = true;

      // Update connections
      let lineIndex = 0;
      const indigo = new THREE.Color(0x6366f1);
      const cyan = new THREE.Color(0x06b6d4);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const dist = positions[i].distanceTo(positions[j]);
          if (dist < CONNECTION_DISTANCE && lineIndex < maxLines) {
            const alpha = 1 - dist / CONNECTION_DISTANCE;
            const color = indigo.clone().lerp(cyan, alpha);

            const idx = lineIndex * 6;
            linePositions[idx] = positions[i].x;
            linePositions[idx + 1] = positions[i].y;
            linePositions[idx + 2] = positions[i].z;
            linePositions[idx + 3] = positions[j].x;
            linePositions[idx + 4] = positions[j].y;
            linePositions[idx + 5] = positions[j].z;

            lineColors[idx] = color.r * alpha;
            lineColors[idx + 1] = color.g * alpha;
            lineColors[idx + 2] = color.b * alpha;
            lineColors[idx + 3] = color.r * alpha;
            lineColors[idx + 4] = color.g * alpha;
            lineColors[idx + 5] = color.b * alpha;

            lineIndex++;
          }
        }
      }

      lineGeo.setDrawRange(0, lineIndex * 2);
      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.color.needsUpdate = true;

      // Slow rotation
      scene.rotation.y += 0.0003;
      scene.rotation.x += 0.0001;

      renderer.render(scene, camera);
    }
    animate();

    // Resize
    function onResize() {
      const w = container!.clientWidth;
      const h = container!.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
      aria-hidden="true"
    />
  );
}
