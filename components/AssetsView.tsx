import React from 'react';
import { Download, Music, Image as ImageIcon } from 'lucide-react';
import { ASSETS, UI_TEXT } from '../constants';
import { Language } from '../types';

interface AssetsViewProps {
  lang: Language;
}

const AssetsView: React.FC<AssetsViewProps> = ({ lang }) => {
  const ui = UI_TEXT[lang];

  return (
    <div className="max-w-3xl mx-auto pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-10 border-b border-zinc-100 pb-6">
        <h1 className="text-4xl font-extrabold text-zinc-900 mt-2 mb-4 tracking-tight">{ui.assetsTitle}</h1>
        <p className="text-zinc-600 leading-relaxed">{ui.assetsDesc}</p>
      </header>

      <div className="space-y-12">
        
        {/* Sprites Section */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <ImageIcon className="text-zinc-900" size={24} />
            <h2 className="text-2xl font-bold text-zinc-900">{ui.sprites}</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {ASSETS.sprites.map((file) => (
              <div key={file} className="group border border-zinc-200 rounded-lg p-4 flex flex-col items-center bg-zinc-50 hover:border-zinc-400 transition-colors">
                <div className="w-full h-24 flex items-center justify-center mb-3 bg-[url('https://raw.githubusercontent.com/samuelcust/flappy-bird-assets/master/sprites/background-day.png')] bg-repeat rounded overflow-hidden relative">
                   {/* We use a backdrop to make transparent pngs visible, though here we just use zinc-50 from container */}
                   <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px]"></div>
                   <img 
                    src={`/assets/sprites/${file}`} 
                    alt={file} 
                    className="relative z-10 max-h-full object-contain pixelated"
                    style={{ imageRendering: 'pixelated' }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                <span className="font-mono text-xs text-zinc-500 mb-3 truncate w-full text-center" title={file}>{file}</span>
                <a 
                  href={`/assets/sprites/${file}`} 
                  download 
                  className="w-full flex items-center justify-center gap-2 bg-white border border-zinc-300 py-1.5 rounded text-xs font-medium hover:bg-zinc-100 text-zinc-700 transition-colors"
                >
                  <Download size={12} /> {ui.download}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Audio Section */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Music className="text-zinc-900" size={24} />
            <h2 className="text-2xl font-bold text-zinc-900">{ui.audio}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ASSETS.audio.map((file) => (
              <div key={file} className="border border-zinc-200 rounded-lg p-4 flex items-center justify-between bg-zinc-50 hover:border-zinc-400 transition-colors">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-500">
                     <Music size={16} />
                   </div>
                   <span className="font-mono text-sm text-zinc-700">{file}</span>
                 </div>
                 
                 <div className="flex gap-2">
                    <a 
                      href={`/assets/audio/${file}`} 
                      download 
                      className="p-2 bg-white border border-zinc-300 rounded hover:bg-zinc-100 text-zinc-700 transition-colors"
                      title={ui.download}
                    >
                      <Download size={16} />
                    </a>
                 </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default AssetsView;