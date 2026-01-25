"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Icosahedron,
  Torus,
  Octahedron,
  Dodecahedron,
  Stars,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({
  position,
  color,
  type,
  speed = 1,
}: {
  position: [number, number, number];
  color: string;
  type:
    | "box"
    | "sphere"
    | "torus"
    | "octahedron"
    | "dodecahedron"
    | "icosahedron";
  speed?: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  // Random rotation offset
  const [rotationOffset] = useState(() => [
    Math.random() * Math.PI,
    Math.random() * Math.PI,
    0,
  ]);

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.2 * speed;
      mesh.current.rotation.y += delta * 0.3 * speed;
    }
  });

  const Material = (
    <meshStandardMaterial
      color={color}
      roughness={0.2}
      metalness={0.8}
      emissive={color}
      emissiveIntensity={0.2}
    />
  );

  return (
    <Float
      speed={2 * speed}
      rotationIntensity={1}
      floatIntensity={2}
      position={position}
    >
      {type === "icosahedron" && (
        <Icosahedron args={[0.8, 0]} ref={mesh}>
          {Material}
        </Icosahedron>
      )}
      {type === "octahedron" && (
        <Octahedron args={[0.8, 0]} ref={mesh}>
          {Material}
        </Octahedron>
      )}
      {type === "dodecahedron" && (
        <Dodecahedron args={[0.8, 0]} ref={mesh}>
          {Material}
        </Dodecahedron>
      )}
      {type === "torus" && (
        <Torus args={[0.6, 0.2, 16, 32]} ref={mesh}>
          {Material}
        </Torus>
      )}
    </Float>
  );
}

export function TechStack3DBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#4f46e5" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ec4899" />
        {/* Floating Geometric Shapes representing Tech Complexity */}
        <FloatingShape
          position={[-4, 2, -5]}
          color="#61DAFB"
          type="icosahedron"
          speed={0.8}
        />{" "}
        {/* React Blue */}
        <FloatingShape
          position={[4, -2, -6]}
          color="#F7DF1E"
          type="octahedron"
          speed={0.6}
        />{" "}
        {/* JS Yellow */}
        <FloatingShape
          position={[-3, -3, -4]}
          color="#3178C6"
          type="dodecahedron"
          speed={0.7}
        />{" "}
        {/* TS Blue */}
        <FloatingShape
          position={[3, 3, -5]}
          color="#E34F26"
          type="torus"
          speed={0.5}
        />{" "}
        {/* HTML Orange */}
        <Stars
          radius={100}
          depth={50}
          count={2000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        {/* Fog to blend into background */}
        <fog attach="fog" args={["#050505", 5, 20]} />
      </Canvas>
    </div>
  );
}
