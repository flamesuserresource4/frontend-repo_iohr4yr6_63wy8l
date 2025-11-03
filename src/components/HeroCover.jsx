import React from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroCover() {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
      <Spline
        scene="https://prod.spline.design/VyGeZv58yuk8j7Yy/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="max-w-4xl text-center text-white">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
            EcoPulse Pakistan — AI-Powered Solar Intelligence
          </h1>
          <p className="mt-4 text-base md:text-lg text-white/80">
            Tackling blackouts with real data, credible AI, and national transparency
          </p>
        </div>
      </div>
    </section>
  );
}
