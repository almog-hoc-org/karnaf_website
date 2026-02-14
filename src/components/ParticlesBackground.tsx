import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="hero-particles"
      options={{
        fullScreen: false,
        fpsLimit: 60,
        particles: {
          color: { value: "#ff8c00" },
          links: {
            color: "#ff8c00",
            distance: 150,
            enable: true,
            opacity: 0.12,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.8,
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "out" },
          },
          number: {
            density: { enable: true },
            value: 40,
          },
          opacity: {
            value: { min: 0.05, max: 0.2 },
            animation: {
              enable: true,
              speed: 0.5,
            },
          },
          shape: { type: "circle" },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
          },
          modes: {
            grab: {
              distance: 140,
              links: { opacity: 0.3 },
            },
          },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 z-[1]"
    />
  );
};

export default ParticlesBackground;
