import React, { useEffect, useRef, useState } from 'react';
import { RefreshCw, Play } from 'lucide-react';
import { VizProps } from '../../types';

const GravityViz: React.FC<VizProps> = ({ lang }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Physics state
  const stateRef = useRef({
    y: 50,
    vy: 0,
    gravity: 0.5,
    flap: -8,
    height: 300
  });

  const reset = () => {
    stateRef.current = { ...stateRef.current, y: 50, vy: 0 };
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) draw(ctx);
    }
    setIsPlaying(false);
  };

  const flap = () => {
    stateRef.current.vy = stateRef.current.flap;
    if (!isPlaying) setIsPlaying(true);
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    const { width, height } = ctx.canvas;
    ctx.clearRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = '#e4e4e7';
    ctx.beginPath();
    for(let i = 0; i < height; i+=20) {
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
    }
    ctx.stroke();

    // Draw Bird
    ctx.fillStyle = '#facc15'; // Yellow
    ctx.beginPath();
    ctx.arc(width / 2, stateRef.current.y, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000';
    ctx.stroke();

    // Draw Vector Arrow (Velocity)
    const birdX = width / 2;
    const birdY = stateRef.current.y;
    const vel = stateRef.current.vy;
    
    ctx.beginPath();
    ctx.moveTo(birdX + 20, birdY);
    ctx.lineTo(birdX + 20, birdY + vel * 5); // Amplify for visibility
    ctx.strokeStyle = vel > 0 ? '#ef4444' : '#22c55e'; // Red down, Green up
    ctx.lineWidth = 3;
    ctx.stroke();
  };

  useEffect(() => {
    let animationFrameId: number;

    const loop = () => {
      if (isPlaying) {
        stateRef.current.vy += stateRef.current.gravity;
        stateRef.current.y += stateRef.current.vy;

        // Floor collision
        if (stateRef.current.y > stateRef.current.height - 15) {
          stateRef.current.y = stateRef.current.height - 15;
          stateRef.current.vy = 0;
          setIsPlaying(false);
        }
      }

      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) draw(ctx);
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying]);

  const t = {
    en: { title: "Physics Sandbox", up: "Up (-vy)", down: "Down (+vy)", flap: "FLAP (SPACE)", hint: "Click canvas or button to flap" },
    de: { title: "Physik-Sandkasten", up: "Hoch (-vy)", down: "Runter (+vy)", flap: "FLATTERN (LEER)", hint: "Klicke Canvas oder Button zum Flattern" }
  };
  
  const txt = t[lang];

  return (
    <div className="border border-zinc-200 rounded-lg p-4 bg-white shadow-sm flex flex-col items-center gap-4">
      <div className="flex justify-between w-full items-center mb-2">
        <h3 className="font-bold text-sm uppercase tracking-wider text-zinc-500">{txt.title}</h3>
        <div className="flex gap-2">
           <div className="flex items-center gap-1 text-xs text-zinc-500">
             <div className="w-2 h-2 bg-green-500 rounded-full"></div> {txt.up}
           </div>
           <div className="flex items-center gap-1 text-xs text-zinc-500">
             <div className="w-2 h-2 bg-red-500 rounded-full"></div> {txt.down}
           </div>
        </div>
      </div>
      
      <canvas 
        ref={canvasRef} 
        width={300} 
        height={300} 
        className="border border-zinc-100 bg-zinc-50 rounded cursor-pointer"
        onClick={flap}
      />
      
      <div className="flex w-full gap-2">
        <button 
          onClick={flap}
          className="flex-1 bg-black text-white px-4 py-2 rounded-md font-mono text-sm hover:bg-zinc-800 active:translate-y-0.5 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]"
        >
          {txt.flap}
        </button>
        <button 
          onClick={reset}
          className="w-10 flex items-center justify-center border border-zinc-300 rounded-md hover:bg-zinc-100 active:translate-y-0.5 transition-all"
        >
          <RefreshCw size={16} />
        </button>
      </div>
      <p className="text-xs text-zinc-400 font-mono">{txt.hint}</p>
    </div>
  );
};

export default GravityViz;