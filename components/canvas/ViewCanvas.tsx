'use client';

import { Canvas } from '@react-three/fiber';
import { View } from '@react-three/drei';

export default function ViewCanvas() {
  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 30, // Be in front of text (for the 3D content, which is managed via View)
      }}
      eventSource={document.body}
      shadows
      camera={{ fov: 40 }}
    >
      <View.Port />
    </Canvas>
  );
}
