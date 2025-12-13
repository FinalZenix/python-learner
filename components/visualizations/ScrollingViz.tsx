import React, { useEffect, useState } from 'react';
import { VizProps } from '../../types';

const ScrollingViz: React.FC<VizProps> = ({ lang }) => {
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setOffset(prev => (prev + 2) % 100); // 100 is width of one block percent
    }, 16);
    return () => clearInterval(interval);
  }, []);

  const t = {
    en: { title: "Infinite Scroll Concept", g1: "Ground 1", g2: "Ground 2", desc: "The bird **never moves forward**. Instead, we move two copies of the ground to the left." },
    de: { title: "Unendliches Scrollen", g1: "Boden 1", g2: "Boden 2", desc: "Der Vogel **bewegt sich nie vorwärts**. Stattdessen bewegen wir zwei Kopien des Bodens nach links." }
  };
  const txt = t[lang];

  return (
    <div className="border border-zinc-200 rounded-lg p-6 bg-white shadow-sm overflow-hidden">
      <h3 className="font-bold text-sm uppercase tracking-wider text-zinc-500 mb-4">{txt.title}</h3>
      
      <div className="relative h-32 w-full border-2 border-black bg-sky-100 overflow-hidden rounded-md">
        {/* Bird is stationary relative to screen */}
        <div className="absolute top-1/2 left-10 w-8 h-8 bg-yellow-400 border-2 border-black rounded-full z-20 -translate-y-1/2 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full translate-x-1 -translate-y-1"></div>
        </div>

        {/* The World Moves Left */}
        <div 
            className="absolute top-0 h-full w-[200%] flex"
            style={{ transform: `translateX(-${offset}%)` }}
        >
            <div className="w-1/2 h-full relative">
                <div className="absolute bottom-0 w-full h-8 bg-green-600 border-t-2 border-black"></div>
                {/* Building 1 */}
                <div className="absolute bottom-8 left-10 w-10 h-16 bg-zinc-300 border-2 border-black"></div>
                {/* Building 2 */}
                <div className="absolute bottom-8 left-40 w-14 h-24 bg-zinc-400 border-2 border-black"></div>
                
                <div className="absolute top-4 left-4 text-xs font-mono font-bold bg-white px-1">{txt.g1}</div>
            </div>
            <div className="w-1/2 h-full relative border-l-2 border-dashed border-red-500/50">
                 <div className="absolute bottom-0 w-full h-8 bg-green-600 border-t-2 border-black"></div>
                 {/* Building 3 */}
                <div className="absolute bottom-8 left-20 w-12 h-12 bg-zinc-300 border-2 border-black"></div>
                 {/* Building 4 */}
                <div className="absolute bottom-8 left-60 w-10 h-20 bg-zinc-400 border-2 border-black"></div>

                <div className="absolute top-4 left-4 text-xs font-mono font-bold bg-white px-1">{txt.g2}</div>
            </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-zinc-50 rounded text-xs font-mono text-zinc-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: txt.desc.replace(/\*\*(.*?)\*\*/g, '<span class="font-bold text-black">$1</span>') }}>
      </div>
    </div>
  );
};

export default ScrollingViz;