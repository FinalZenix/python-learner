import React, { useState, useEffect } from 'react';
import { VizProps } from '../../types';

const AnimationViz: React.FC<VizProps> = ({ lang }) => {
  const [frame, setFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setFrame(f => (f + 1) % 3);
    }, 150);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const t = {
    en: { title: "Frame Animation Logic", pause: "PAUSE", play: "PLAY", current: "Current Frame" },
    de: { title: "Frame-Animation Logik", pause: "PAUSE", play: "START", current: "Aktueller Frame" }
  };
  const txt = t[lang];

  return (
    <div className="border border-zinc-200 rounded-lg p-6 bg-white shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-sm uppercase tracking-wider text-zinc-500">{txt.title}</h3>
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-xs font-mono bg-zinc-100 px-2 py-1 rounded hover:bg-zinc-200"
        >
          {isPlaying ? txt.pause : txt.play}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
        
        {/* The Array Visual */}
        <div className="flex flex-col gap-2">
          <div className="font-mono text-zinc-400 text-sm mb-1">bird_images = [</div>
          {[0, 1, 2].map((i) => (
            <div 
              key={i} 
              className={`flex items-center gap-3 p-2 rounded border transition-all ${
                frame === i 
                  ? 'bg-zinc-900 border-zinc-900 text-white shadow-lg scale-105' 
                  : 'bg-white border-zinc-200 text-zinc-400 opacity-60'
              }`}
            >
               <span className="font-mono text-xs w-4">{i}:</span>
               <span className="font-mono text-xs">"frame_{i}.png"</span>
            </div>
          ))}
           <div className="font-mono text-zinc-400 text-sm mt-1">]</div>
        </div>

        {/* The Result Visual */}
        <div className="flex flex-col items-center justify-center w-32">
            <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center border-4 border-zinc-100 relative mb-4">
                {/* Simplified CSS Bird */}
                <div className="w-8 h-8 bg-yellow-400 rounded-full relative border-2 border-black">
                    <div className="absolute right-1 top-2 w-3 h-3 bg-white rounded-full border border-black">
                        <div className="absolute right-0.5 top-1 w-1 h-1 bg-black rounded-full"></div>
                    </div>
                    {/* Wing Changes based on frame */}
                    <div 
                        className={`absolute left-0 w-5 h-4 bg-white border border-black rounded-full transition-all duration-75 ${
                            frame === 0 ? 'top-[-5px] rotate-[-20deg]' : // Up
                            frame === 1 ? 'top-[8px] rotate-[0deg]' :     // Mid
                            'top-[12px] rotate-[20deg]'                   // Down
                        }`}
                    ></div>
                     <div className="absolute right-[-6px] top-4 w-4 h-2 bg-orange-400 border border-black rounded-full"></div>
                </div>
            </div>
            <div className="font-mono text-xs text-zinc-500">
                {txt.current}: <span className="font-bold text-black">{frame}</span>
            </div>
        </div>

      </div>
    </div>
  );
};

export default AnimationViz;