import React from 'react';
import HeroCover from './components/HeroCover';
import Narration from './components/Narration';
import TechHighlights from './components/TechHighlights';
import Closing from './components/Closing';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white font-inter">
      <HeroCover />
      <main>
        <Narration />
        <TechHighlights />
        <Closing />
      </main>
    </div>
  );
}
