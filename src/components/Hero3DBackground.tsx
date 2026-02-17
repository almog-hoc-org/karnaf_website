import { Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';

const FloatingGeometry = () => {
  return (
    <>
      {/* Floating geometric shapes */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh position={[-2, 1, -5]}>
          <torusGeometry args={[0.8, 0.3, 16, 32]} />
          <meshStandardMaterial
            color="#ff6600"
            opacity={0.1}
            transparent
            wireframe
          />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.7}>
        <mesh position={[3, -1, -8]}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#ff8833"
            opacity={0.08}
            transparent
            wireframe
          />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh position={[0, 2, -6]}>
          <sphereGeometry args={[0.6, 16, 16]} />
          <meshStandardMaterial
            color="#ffaa66"
            opacity={0.12}
            transparent
            wireframe
          />
        </mesh>
      </Float>
    </>
  );
};

export const Hero3DBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 opacity-60">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <FloatingGeometry />
      </Canvas>
    </div>
  );
};
