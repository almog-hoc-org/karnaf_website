import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="hero-particles"
      init={particlesInit}
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
            density: { enable: true, area: 1200 },
            value: 40,
          },
          opacity: {
            value: { min: 0.05, max: 0.2 },
            animation: {
              enable: true,
              speed: 0.5,
              minimumValue: 0.05,
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
