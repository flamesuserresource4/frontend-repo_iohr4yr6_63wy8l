import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

function Line({ children }) {
  return (
    <p className="leading-relaxed text-sm md:text-base text-white/90">
      {children}
    </p>
  );
}

function Cue({ children }) {
  return (
    <p className="text-emerald-300/90 text-xs md:text-sm font-medium">[{children}]</p>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

export default function Narration() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-20% 0px -20% 0px', once: false });

  // Quick calculator state
  const [city, setCity] = useState('lahore');
  const [bill, setBill] = useState('15000');
  const [calc, setCalc] = useState(null);
  const [stats, setStats] = useState(null);
  const [loadingCalc, setLoadingCalc] = useState(false);

  // Map + weather
  const [mapCity, setMapCity] = useState('karachi');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loadingWx, setLoadingWx] = useState(false);

  // AI predictor
  const [aiCity, setAiCity] = useState('lahore');
  const [ai, setAi] = useState(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const headers = useMemo(() => ({ 'Content-Type': 'application/json' }), []);

  useEffect(() => {
    // Prefetch stats
    fetch(`${API_BASE}/api/stats`).then(r => r.json()).then(setStats).catch(() => {});
  }, []);

  const runCalc = async () => {
    setLoadingCalc(true);
    try {
      const res = await fetch(`${API_BASE}/api/calc/quick`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ city, monthly_bill_pkr: parseFloat(bill || '0') })
      });
      const data = await res.json();
      setCalc(data);
      // refresh stats
      const s = await fetch(`${API_BASE}/api/stats`).then(r => r.json());
      setStats(s);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingCalc(false);
    }
  };

  const runWeather = async () => {
    setLoadingWx(true);
    try {
      const cur = await fetch(`${API_BASE}/api/weather?city=${mapCity}`).then(r => r.json());
      const fc = await fetch(`${API_BASE}/api/forecast?city=${mapCity}`).then(r => r.json());
      setWeather(cur);
      setForecast(fc);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingWx(false);
    }
  };

  const runAi = async () => {
    setLoadingAi(true);
    try {
      const res = await fetch(`${API_BASE}/api/predict`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ city: aiCity })
      });
      const data = await res.json();
      setAi(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <section ref={ref} className="relative w-full bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        {/* Opening */}
        <motion.div variants={cardVariants} initial="hidden" animate={inView ? 'show' : 'hidden'} className="space-y-2">
          <Cue>Show Home Page</Cue>
          <Line>
            Good morning judges — this is <strong>EcoPulse Pakistan</strong>, the country’s first <strong>AI-powered</strong> solar intelligence platform.
          </Line>
          <Line>
            Pakistan faces 8–12 hours of daily load shedding, but solar adoption is only 2%. We’re fixing that through <strong>trust</strong>, <strong>data</strong>, and <strong>AI</strong>.
          </Line>
        </motion.div>

        {/* Quick Calculator */}
        <motion.div variants={cardVariants} initial="hidden" animate={inView ? 'show' : 'hidden'} className="space-y-3">
          <Cue>Quick Calculator</Cue>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <select value={city} onChange={(e) => setCity(e.target.value)} className="bg-zinc-900 border border-white/10 rounded px-3 py-2">
              <option value="lahore">Lahore</option>
              <option value="karachi">Karachi</option>
              <option value="islamabad">Islamabad</option>
            </select>
            <input value={bill} onChange={(e) => setBill(e.target.value)} type="number" min="0" placeholder="Monthly bill (PKR)" className="bg-zinc-900 border border-white/10 rounded px-3 py-2" />
            <button onClick={runCalc} className="bg-emerald-500 hover:bg-emerald-600 text-black font-medium rounded px-4 py-2">
              {loadingCalc ? 'Calculating…' : 'Calculate'}
            </button>
          </div>
          {calc && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-lg border border-white/10 bg-black/40 p-4">
                <p className="text-sm text-white/70">Sun hours</p>
                <p className="text-xl font-semibold">{calc.sun_hours}</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/40 p-4">
                <p className="text-sm text-white/70">Est. savings / month</p>
                <p className="text-xl font-semibold">{Number(calc.estimated_savings_pkr).toLocaleString()} PKR</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/40 p-4">
                <p className="text-sm text-white/70">System size</p>
                <p className="text-xl font-semibold">{calc.system_kw} kW @ {(calc.efficiency*100).toFixed(0)}%</p>
              </div>
            </div>
          )}
          {stats && (
            <div className="rounded-lg border border-white/10 bg-zinc-950 p-4 flex items-center justify-between text-sm">
              <p>Users: <strong>{stats.users.toLocaleString()}</strong></p>
              <p>CO₂ saved: <strong>{stats.co2_saved_tons.toLocaleString()} tons</strong></p>
              <p>Calcs: <strong>{stats.calculations.toLocaleString()}</strong></p>
            </div>
          )}
        </motion.div>

        {/* Live Map + Weather */}
        <motion.div variants={cardVariants} initial="hidden" animate={inView ? 'show' : 'hidden'} className="space-y-3">
          <Cue>Interactive Map → Karachi</Cue>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <select value={mapCity} onChange={(e) => setMapCity(e.target.value)} className="bg-zinc-900 border border-white/10 rounded px-3 py-2">
              <option value="karachi">Karachi</option>
              <option value="lahore">Lahore</option>
              <option value="islamabad">Islamabad</option>
            </select>
            <button onClick={runWeather} className="bg-emerald-500 hover:bg-emerald-600 text-black font-medium rounded px-4 py-2">
              {loadingWx ? 'Loading…' : 'Fetch Weather'}
            </button>
          </div>
          {weather && (
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <StatCard label="Temp" value={`${Math.round(weather.temp_c)}°C`} />
              <StatCard label="Humidity" value={`${weather.humidity}%`} />
              <StatCard label="Clouds" value={`${weather.clouds}%`} />
              <StatCard label="Efficiency Now" value={`${Math.round((100 - (weather.clouds || 0)) * 0.68)}%`} />
            </div>
          )}
          {forecast && (
            <div className="mt-2">
              <Cue>Scroll to forecast</Cue>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {forecast.best_hours?.map((d) => (
                  <div key={`${d.day}-${d.hour}`} className="rounded-lg border border-white/10 bg-black/40 p-3">
                    <p className="text-xs text-white/70">{d.day}</p>
                    <p className="text-sm">Best: <strong>{d.hour}:00</strong></p>
                    <p className="text-xs text-white/70">Clouds {d.clouds}% • {Math.round(d.temp_c)}°C</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* AI Predictor */}
        <motion.div variants={cardVariants} initial="hidden" animate={inView ? 'show' : 'hidden'} className="space-y-3">
          <Cue>Open AI Predictor</Cue>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <select value={aiCity} onChange={(e) => setAiCity(e.target.value)} className="bg-zinc-900 border border-white/10 rounded px-3 py-2">
              <option value="lahore">Lahore</option>
              <option value="karachi">Karachi</option>
              <option value="islamabad">Islamabad</option>
            </select>
            <button onClick={runAi} className="bg-emerald-500 hover:bg-emerald-600 text-black font-medium rounded px-4 py-2">
              {loadingAi ? 'Predicting…' : 'Run Predictor'}
            </button>
          </div>
          {ai && (
            <div className="rounded-lg border border-white/10 bg-black/40 p-4">
              <p className="text-sm">AI: {ai.summary}</p>
            </div>
          )}
        </motion.div>

        {/* Full Calculator */}
        <motion.div variants={cardVariants} initial="hidden" animate={inView ? 'show' : 'hidden'} className="space-y-2">
          <Cue>Open Full Calculator</Cue>
          <Line>
            Our full calculator goes deeper — roof area, property type, installation cost, and <strong>CO₂ offset</strong>.
          </Line>
          <Line>
            Data saves securely for users, ready for installers and exportable <strong>reports</strong>.
          </Line>
        </motion.div>

        {/* Technical Highlights */}
        <motion.div variants={cardVariants} initial="hidden" animate={inView ? 'show' : 'hidden'} className="space-y-2">
          <Cue>Technical Highlights</Cue>
          <Line>
            Everything is <strong>live</strong> — no mock data. Built on a modern stack with <strong>MongoDB Atlas</strong>, <strong>OpenWeather</strong>, <strong>Gemini AI</strong>, and <strong>JWT-secured APIs</strong>.
          </Line>
          <Line>
            It’s <strong>PWA-ready</strong>, with caching via <strong>ETag/Cache-Control</strong> and edge <strong>CDN</strong>.
          </Line>
        </motion.div>
      </div>
    </section>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/40 p-4">
      <p className="text-sm text-white/70">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}
