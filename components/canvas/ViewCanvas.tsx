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
        pointerEvents: 'none', // Allow clicks to pass through to DOM elements below
        zIndex: 30, 
      }}
      eventSource={document.body}
      shadows
      camera={{ fov: 40 }}
    >
      <View.Port />
    </Canvas>
  );
}
