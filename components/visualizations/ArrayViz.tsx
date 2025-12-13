import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { VizProps } from '../../types';

interface PipeData {
  id: number;
  x: number;
}

const ArrayViz: React.FC<VizProps> = ({ lang }) => {
  const [pipes, setPipes] = useState<PipeData[]>([]);
  const [nextId, setNextId] = useState(1);

  // Auto-move pipes
  useEffect(() => {
    const interval = setInterval(() => {
      setPipes(currentPipes => {
        // Move pipes left
        const moved = currentPipes.map(p => ({ ...p, x: p.x - 2 }));
        // Remove pipes that are off-screen (simulating < 0)
        return moved.filter(p => p.x > -20);
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const spawnPipe = () => {
    setPipes(prev => [...prev, { id: nextId, x: 100 }]); // 100% width
    setNextId(prev => prev + 1);
  };

  const t = {
    en: { title: "Memory (The List)", screen: "GAME SCREEN", hint: "Pipes are removed from the list when X < 0 to save memory!" },
    de: { title: "Speicher (Die Liste)", screen: "BILDSCHIRM", hint: "Röhren werden gelöscht wenn X < 0 um Speicher zu sparen!" }
  };
  const txt = t[lang];

  return (
    <div className="border border-zinc-200 rounded-lg p-6 bg-white shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-sm uppercase tracking-wider text-zinc-500">{txt.title}</h3>
        <button 
          onClick={spawnPipe}
          className="flex items-center gap-2 bg-black text-white px-3 py-1 rounded text-xs font-bold hover:bg-zinc-800"
        >
          <Plus size={12} /> pipes.append()
        </button>
      </div>

      {/* Visual representation of the List in memory */}
      <div className="flex gap-2 p-4 bg-zinc-100 rounded-md min-h-[60px] items-center overflow-x-auto border border-zinc-200">
        <span className="font-mono text-zinc-400 select-none">pipes = [</span>
        {pipes.length === 0 && <span className="font-mono text-zinc-300 italic">empty</span>}
        {pipes.map((pipe, idx) => (
          <div key={pipe.id} className="flex-shrink-0 bg-white border border-zinc-300 px-2 py-1 rounded shadow-sm flex flex-col items-center">
            <span className="text-xs font-bold font-mono">Pipe_{pipe.id}</span>
            <span className="text-[10px] text-zinc-500 font-mono">x:{Math.round(pipe.x)}</span>
          </div>
        ))}
        <span className="font-mono text-zinc-400 select-none">]</span>
      </div>

      {/* Visual representation of the Screen */}
      <div className="mt-6 relative h-32 w-full border-2 border-black bg-sky-100 overflow-hidden rounded-md">
        <div className="absolute top-2 left-2 px-2 py-1 bg-white/80 text-[10px] font-mono font-bold rounded">{txt.screen}</div>
        {pipes.map(pipe => (
          <div 
            key={pipe.id}
            className="absolute top-0 bottom-0 w-8 bg-green-500 border-x-2 border-black flex items-center justify-center transition-transform duration-75 ease-linear"
            style={{ left: `${pipe.x}%` }}
          >
             <span className="text-white font-mono text-xs font-bold -rotate-90">Pipe_{pipe.id}</span>
          </div>
        ))}
        {/* Bird for reference */}
        <div className="absolute top-1/2 left-8 w-6 h-6 bg-yellow-400 border-2 border-black rounded-full -translate-y-1/2 z-10"></div>
      </div>
      
      <p className="mt-2 text-xs text-zinc-400 text-center">
        {txt.hint}
      </p>
    </div>
  );
};

export default ArrayViz;