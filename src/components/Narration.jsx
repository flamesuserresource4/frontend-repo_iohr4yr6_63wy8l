import React from 'react';

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

export default function Narration() {
  return (
    <section className="relative w-full bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        {/* Opening */}
        <div className="space-y-2">
          <Cue>Show Home Page</Cue>
          <Line>
            Good morning judges — this is <strong>EcoPulse Pakistan</strong>, the country’s first <strong>AI-powered</strong> solar intelligence platform.
          </Line>
          <Line>
            Pakistan faces 8–12 hours of daily load shedding, but solar adoption is only 2%. We’re fixing that through <strong>trust</strong>, <strong>data</strong>, and <strong>AI</strong>.
          </Line>
        </div>

        {/* Quick Calculator */}
        <div className="space-y-2">
          <Cue>Quick Calculator</Cue>
          <Line>
            Here’s how we remove <strong>ROI uncertainty</strong>. Select Lahore, enter 15,000 PKR, click <strong>Calculate</strong>.
          </Line>
          <Line>
            Behind the scenes, our API factors Lahore’s <strong>5.2 sun hours</strong>.
          </Line>
          <Line>
            Results appear — you instantly see savings: <strong>8,400 PKR/month</strong>, verified in real-time.
          </Line>
          <Line>
            Live stats below show national impact — <strong>2,847 users</strong>, <strong>15,480 tons CO₂ saved</strong> — directly from <strong>MongoDB</strong>.
          </Line>
        </div>

        {/* Live Map + Weather */}
        <div className="space-y-2">
          <Cue>Interactive Map → Karachi</Cue>
          <Line>
            Now, our interactive Pakistan map. Clicking Karachi shows live weather via <strong>OpenWeather API</strong> — <strong>31°C</strong>, <strong>48% humidity</strong>, <strong>2% clouds</strong>.
          </Line>
          <Line>
            Our algorithm computes <strong>68% solar efficiency</strong> right now.
          </Line>
          <Cue>Scroll to forecast</Cue>
          <Line>
            Below is a 7-day forecast — best solar hours for <strong>load shedding</strong> management.
          </Line>
        </div>

        {/* AI Predictor */}
        <div className="space-y-2">
          <Cue>Open AI Predictor</Cue>
          <Line>
            Here’s the <strong>AI Predictor</strong>. Selecting Lahore, our backend calls <strong>OpenWeather</strong> + <strong>Gemini AI</strong> to forecast solar output.
          </Line>
          <Line>
            AI summarizes daily insights — like “Run heavy loads between <strong>11–2 PM</strong>, confidence <strong>high</strong>.” That’s smart energy planning for Pakistan.
          </Line>
        </div>

        {/* Full Calculator */}
        <div className="space-y-2">
          <Cue>Open Full Calculator</Cue>
          <Line>
            Our full calculator goes deeper — roof area, property type, installation cost, and <strong>CO₂ offset</strong>.
          </Line>
          <Line>
            Data saves securely for users, ready for installers and exportable <strong>reports</strong>.
          </Line>
        </div>

        {/* Technical Highlights */}
        <div className="space-y-2">
          <Cue>Technical Highlights</Cue>
          <Line>
            Everything is <strong>live</strong> — no mock data. Built on <strong>Next.js 15</strong> + <strong>TypeScript</strong>, <strong>MongoDB Atlas</strong>, <strong>OpenWeather</strong>, <strong>Gemini AI</strong>, and <strong>JWT-secured APIs</strong>.
          </Line>
          <Line>
            It’s <strong>PWA-ready</strong>, so users can install it like a native app. We cache weather responses with <strong>ETags</strong> and edge <strong>CDN</strong> to keep it fast.
          </Line>
        </div>

        {/* Closing */}
        <div className="space-y-2">
          <Cue>Closing</Cue>
          <Line>
            EcoPulse drives solar adoption through <strong>AI transparency</strong> and national <strong>data trust</strong>.
          </Line>
          <Line>
            We’re scaling to <strong>40 cities</strong> — building Pakistan’s solar future. <strong>Thank you.</strong>
          </Line>
        </div>
      </div>
    </section>
  );
}
