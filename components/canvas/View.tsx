'use client';

import { Suspense, forwardRef, useImperativeHandle, useRef } from 'react';
import { OrbitControls, PerspectiveCamera, View as ViewImpl } from '@react-three/drei';
import { AmbientLight, PointLight } from 'three';

export const Common = ({ color }: { color?: string }) => (
  <Suspense fallback={null}>
    {color && <color attach="background" args={[color]} />}
    <ambientLight intensity={0.5} />
    <pointLight position={[20, 30, 10]} intensity={1} color="#ff0f39" />
    <pointLight position={[-10, -10, -10]} intensity={0.5} color="blue" />
    <PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
  </Suspense>
);

type ViewProps = {
    children?: React.ReactNode;
    className?: string;
    // Add other props if needed, or use a more generic type intersection if ViewImpl supports more
} & React.HTMLAttributes<HTMLDivElement>;


const View = forwardRef<HTMLDivElement, ViewProps>(({ children, className, ...props }, ref) => {
  const localRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => localRef.current!);

  return (
    <>
      <div ref={localRef} className={className} {...props} />
      <ViewImpl track={localRef as React.MutableRefObject<HTMLElement>}>
        {children}
      </ViewImpl>
    </>
  );
}) as React.ForwardRefExoticComponent<ViewProps & React.RefAttributes<HTMLDivElement>> & { Port: typeof ViewImpl.Port };

View.Port = ViewImpl.Port;
View.displayName = 'View';

export { View };
