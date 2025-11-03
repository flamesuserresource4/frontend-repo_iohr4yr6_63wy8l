import React from 'react';
import { Server, Shield, Zap, Database } from 'lucide-react';

export default function TechHighlights() {
  const items = [
    {
      icon: <Server className="w-5 h-5 text-emerald-400" />,
      title: 'APIs',
      text: 'OpenWeather for live data, Gemini for AI summaries, JWT-secured endpoints.'
    },
    {
      icon: <Database className="w-5 h-5 text-emerald-400" />,
      title: 'Data Layer',
      text: 'MongoDB Atlas with indexed queries, time-series metrics, and caching.'
    },
    {
      icon: <Zap className="w-5 h-5 text-emerald-400" />,
      title: 'Performance',
      text: 'ETag/304 caching, CDN edge, batched requests, and optimistic UI.'
    },
    {
      icon: <Shield className="w-5 h-5 text-emerald-400" />,
      title: 'Security',
      text: 'JWT auth, rate limiting, input validation, and audit logs.'
    }
  ];

  return (
    <section className="bg-zinc-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-xl md:text-2xl font-semibold mb-6">Technical credibility at a glance</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((it, idx) => (
            <div key={idx} className="rounded-lg border border-white/10 bg-black/40 p-4 flex items-start gap-3">
              {it.icon}
              <div>
                <p className="font-medium">{it.title}</p>
                <p className="text-sm text-white/80">{it.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
