import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

interface ModelProps {
  url: string;
}

function Model({ url }: ModelProps) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

interface ProductModelProps {
  modelUrl: string;
}

export function ProductModel({ modelUrl }: ProductModelProps) {
  return (
    <div className="w-full h-96 bg-neutral-100 rounded-xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Model url={modelUrl} />
        </Suspense>
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
}