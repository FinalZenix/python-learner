import React, { useState, useRef, useEffect } from 'react';
import { VizProps } from '../../types';

const CollisionViz: React.FC<VizProps> = ({ lang }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isColliding, setIsColliding] = useState(false);

  // Pipe Box (Fixed)
  const pipeBox = { x: 150, y: 80, w: 80, h: 140 };

  // Bird Box (Follows mouse)
  const birdSize = 40;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  useEffect(() => {
    // AABB Collision Logic
    // rect1 = bird, rect2 = pipe
    const birdLeft = mousePos.x - birdSize/2;
    const birdRight = mousePos.x + birdSize/2;
    const birdTop = mousePos.y - birdSize/2;
    const birdBottom = mousePos.y + birdSize/2;

    const pipeLeft = pipeBox.x;
    const pipeRight = pipeBox.x + pipeBox.w;
    const pipeTop = pipeBox.y;
    const pipeBottom = pipeBox.y + pipeBox.h;

    const collision = (
      birdLeft < pipeRight &&
      birdRight > pipeLeft &&
      birdTop < pipeBottom &&
      birdBottom > pipeTop
    );

    setIsColliding(collision);
  }, [mousePos]);

  const t = {
    en: { title: "Hitbox Logic (colliderect)", hint: "Move your mouse to control the bird hitbox", pipe: "Pipe Rect", bird: "Bird", hit: "HIT!" },
    de: { title: "Hitbox Logik (colliderect)", hint: "Bewege die Maus um die Hitbox zu steuern", pipe: "Röhre", bird: "Vogel", hit: "TREFFER!" }
  };
  const txt = t[lang];

  return (
    <div className="border border-zinc-200 rounded-lg p-6 bg-white shadow-sm select-none">
       <h3 className="font-bold text-sm uppercase tracking-wider text-zinc-500 mb-4">{txt.title}</h3>
       
       <div 
         ref={containerRef}
         onMouseMove={handleMouseMove}
         className="relative w-full h-[300px] bg-zinc-50 border border-zinc-200 overflow-hidden cursor-crosshair rounded-md"
       >
         <div className="absolute top-4 left-4 text-xs font-mono text-zinc-400">{txt.hint}</div>

         {/* Pipe Box */}
         <div 
           className="absolute border-2 border-green-600 bg-green-200/50 flex items-center justify-center"
           style={{
             left: pipeBox.x,
             top: pipeBox.y,
             width: pipeBox.w,
             height: pipeBox.h
           }}
         >
           <span className="text-green-800 font-mono text-xs font-bold">{txt.pipe}</span>
         </div>

         {/* Bird Box */}
         <div 
           className={`absolute border-2 rounded-sm flex items-center justify-center transition-colors duration-75 ${isColliding ? 'border-red-600 bg-red-500/80' : 'border-yellow-600 bg-yellow-400/80'}`}
           style={{
             left: mousePos.x - birdSize/2,
             top: mousePos.y - birdSize/2,
             width: birdSize,
             height: birdSize,
             pointerEvents: 'none' // Let mouse pass through to container
           }}
         >
           <span className={`font-mono text-[10px] font-bold ${isColliding ? 'text-white' : 'text-black'}`}>
             {isColliding ? txt.hit : txt.bird}
           </span>
         </div>

         {/* Code overlay */}
         <div className="absolute bottom-4 right-4 bg-black/80 text-white p-2 rounded text-xs font-mono">
            bird.colliderect(pipe) == <span className={isColliding ? "text-red-400" : "text-green-400"}>{isColliding ? 'True' : 'False'}</span>
         </div>
       </div>
    </div>
  );
};

export default CollisionViz;