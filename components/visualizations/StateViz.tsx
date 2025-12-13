import React, { useState } from 'react';
import { Play, RotateCw, Skull } from 'lucide-react';
import { VizProps } from '../../types';

type GameState = 'MENU' | 'PLAYING' | 'GAMEOVER';

const StateViz: React.FC<VizProps> = ({ lang }) => {
  const [state, setState] = useState<GameState>('MENU');

  const handleSpace = () => {
    if (state === 'MENU') setState('PLAYING');
    else if (state === 'GAMEOVER') setState('MENU');
    // If Playing, Space just flaps, doesn't change state
  };

  const handleCollision = () => {
    if (state === 'PLAYING') setState('GAMEOVER');
  };

  const t = {
    en: { title: "Game State Machine", state: "STATE", input: "Simulate Input", wait: "Waiting for start...", run: "Game running...", stop: "Game Over. Waiting for reset.", restart: "Restart", start: "Start", flap: "Flap", hit: "Hit Pipe" },
    de: { title: "Spielzustands-Maschine", state: "ZUSTAND", input: "Eingabe Simulieren", wait: "Warte auf Start...", run: "Spiel läuft...", stop: "Spiel vorbei. Warte auf Reset.", restart: "Neustart", start: "Start", flap: "Flattern", hit: "Treffer" }
  };
  const txt = t[lang];

  return (
    <div className="border border-zinc-200 rounded-lg p-6 bg-white shadow-sm">
      <h3 className="font-bold text-sm uppercase tracking-wider text-zinc-500 mb-6">{txt.title}</h3>

      <div className="flex flex-col md:flex-row justify-between items-stretch gap-4 mb-8">
        {/* Menu State */}
        <div className={`flex-1 p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-all ${
            state === 'MENU' ? 'border-black bg-zinc-900 text-white shadow-md scale-105' : 'border-zinc-200 bg-white text-zinc-400 opacity-50'
        }`}>
            <div className="font-bold tracking-widest text-xs">{txt.state}</div>
            <div className="font-mono font-bold text-lg">MENU</div>
            <div className="text-[10px] mt-2 font-mono">game_active = False</div>
            <div className="text-[10px] font-mono">dead = False</div>
        </div>

        {/* Playing State */}
        <div className={`flex-1 p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-all ${
            state === 'PLAYING' ? 'border-black bg-zinc-900 text-white shadow-md scale-105' : 'border-zinc-200 bg-white text-zinc-400 opacity-50'
        }`}>
             <div className="font-bold tracking-widest text-xs">{txt.state}</div>
            <div className="font-mono font-bold text-lg">PLAYING</div>
            <div className="text-[10px] mt-2 font-mono">game_active = True</div>
            <div className="text-[10px] font-mono">dead = False</div>
        </div>

        {/* GameOver State */}
        <div className={`flex-1 p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-all ${
            state === 'GAMEOVER' ? 'border-red-500 bg-red-50 text-red-900 shadow-md scale-105' : 'border-zinc-200 bg-white text-zinc-400 opacity-50'
        }`}>
             <div className="font-bold tracking-widest text-xs">{txt.state}</div>
            <div className="font-mono font-bold text-lg">GAME OVER</div>
            <div className="text-[10px] mt-2 font-mono">game_active = False</div>
            <div className="text-[10px] font-mono">dead = True</div>
        </div>
      </div>

      <div className="bg-zinc-50 p-4 rounded-md border border-zinc-200 flex flex-col items-center">
          <div className="text-xs font-bold text-zinc-400 uppercase mb-4">{txt.input}</div>
          <div className="flex gap-4">
              <button 
                onClick={handleSpace}
                className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded font-mono text-sm hover:bg-zinc-800 active:translate-y-0.5 transition-all"
              >
                <span className="border border-white/30 px-1 rounded text-[10px]">SPACE</span>
                {state === 'GAMEOVER' ? txt.restart : state === 'MENU' ? txt.start : txt.flap}
              </button>
              
              <button 
                onClick={handleCollision}
                disabled={state !== 'PLAYING'}
                className="flex items-center gap-2 px-6 py-2 bg-red-100 text-red-800 border border-red-200 rounded font-mono text-sm hover:bg-red-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <Skull size={14} />
                {txt.hit}
              </button>
          </div>
          <div className="mt-4 h-6 text-xs font-mono text-zinc-500">
              {state === 'MENU' && txt.wait}
              {state === 'PLAYING' && txt.run}
              {state === 'GAMEOVER' && txt.stop}
          </div>
      </div>
    </div>
  );
};

export default StateViz;