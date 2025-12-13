import React, { useState, useEffect } from 'react';
import { BookOpen, Code, Terminal, ChevronRight, PlayCircle, Globe, FolderOpen } from 'lucide-react';
import { CONTENT, FULL_CODE, UI_TEXT } from './constants';
import { Language, Lesson } from './types';
import LessonView from './components/LessonView';
import CodeBlock from './components/CodeBlock';
import AssetsView from './components/AssetsView';

enum ViewMode {
  LESSON,
  FULL_CODE,
  ASSETS
}

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const content = CONTENT[lang];
  const ui = UI_TEXT[lang];
  const allLessons = [...content.core, ...content.extras];

  // Keep track of current lesson by ID so it persists across language changes if possible
  const [currentLessonId, setCurrentLessonId] = useState(content.core[0].id);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.LESSON);

  // Fallback if ID doesn't match new language structure (though ids are same)
  const currentLesson = allLessons.find(l => l.id === currentLessonId) || content.core[0];

  const handleNext = () => {
    const currentIndex = allLessons.findIndex(l => l.id === currentLessonId);
    if (currentIndex < allLessons.length - 1) {
      setCurrentLessonId(allLessons[currentIndex + 1].id);
      window.scrollTo(0,0);
    }
  };

  const handlePrev = () => {
    const currentIndex = allLessons.findIndex(l => l.id === currentLessonId);
    if (currentIndex > 0) {
      setCurrentLessonId(allLessons[currentIndex - 1].id);
      window.scrollTo(0,0);
    }
  };

  const renderNavButton = (lesson: Lesson) => (
    <button
      key={lesson.id}
      onClick={() => {
        setCurrentLessonId(lesson.id);
        setViewMode(ViewMode.LESSON);
        window.scrollTo(0,0);
      }}
      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-3 ${
        currentLessonId === lesson.id && viewMode === ViewMode.LESSON
          ? 'bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] border border-black text-black translate-y-[-2px]'
          : 'text-zinc-600 hover:bg-zinc-200/50 hover:text-black'
      }`}
    >
      <span className={`w-5 h-5 flex-shrink-0 rounded-full flex items-center justify-center text-[10px] border ${currentLessonId === lesson.id && viewMode === ViewMode.LESSON ? 'border-black bg-black text-white' : 'border-zinc-300 bg-white'}`}>
        {lesson.number}
      </span>
      <span className="truncate">{lesson.title}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-72 bg-zinc-50 border-r border-zinc-200 flex-shrink-0 h-auto md:h-screen md:sticky md:top-0 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white">
                <Terminal size={18} />
              </div>
              <span className="font-extrabold text-lg tracking-tight">PyFlap</span>
            </div>
            
            {/* Language Toggle */}
            <button 
              onClick={() => setLang(l => l === 'en' ? 'de' : 'en')}
              className="flex items-center gap-1.5 px-2 py-1 rounded bg-white border border-zinc-200 text-xs font-bold hover:bg-zinc-100 transition-colors"
            >
              <Globe size={12} />
              {lang.toUpperCase()}
            </button>
          </div>

          <nav className="space-y-6">
            
            {/* Core Section */}
            <div className="space-y-1">
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 pl-2">{ui.curriculum}</div>
              {content.core.map(renderNavButton)}
            </div>

            {/* Extras Section */}
            <div className="space-y-1">
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 pl-2">{ui.extras}</div>
              {content.extras.map(renderNavButton)}
            </div>

            {/* Resources Section */}
            <div className="space-y-1">
               <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 pl-2">{ui.resources}</div>
                <button
                   onClick={() => setViewMode(ViewMode.FULL_CODE)}
                   className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-3 ${
                      viewMode === ViewMode.FULL_CODE
                        ? 'bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] border border-black text-black translate-y-[-2px]'
                        : 'text-zinc-600 hover:bg-zinc-200/50 hover:text-black'
                    }`}
                >
                  <Code size={16} />
                  {ui.fullCode}
                </button>
                
                <button
                   onClick={() => setViewMode(ViewMode.ASSETS)}
                   className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-3 ${
                      viewMode === ViewMode.ASSETS
                        ? 'bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] border border-black text-black translate-y-[-2px]'
                        : 'text-zinc-600 hover:bg-zinc-200/50 hover:text-black'
                    }`}
                >
                  <FolderOpen size={16} />
                  {ui.assets}
                </button>
            </div>
          </nav>
        </div>
        
        <div className="p-6 mt-auto">
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-800 leading-relaxed">
            <strong>{ui.tip}</strong> {ui.tipText}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 md:max-w-4xl">
        {viewMode === ViewMode.LESSON ? (
          <>
            <LessonView lesson={currentLesson} lang={lang} />
            
            {/* Footer Navigation */}
            <div className="fixed bottom-0 left-0 md:left-72 right-0 bg-white/80 backdrop-blur-md border-t border-zinc-200 p-4 flex justify-between items-center z-50">
              <button 
                onClick={handlePrev}
                disabled={allLessons.findIndex(l => l.id === currentLessonId) === 0}
                className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-black disabled:opacity-30 disabled:hover:text-zinc-600 transition-colors"
              >
                {ui.prev}
              </button>
              <span className="text-xs text-zinc-400 font-mono hidden md:block">
                {currentLesson.title}
              </span>
              <button 
                onClick={handleNext}
                disabled={allLessons.findIndex(l => l.id === currentLessonId) === allLessons.length - 1}
                className="px-6 py-2 bg-black text-white text-sm font-bold rounded-full hover:bg-zinc-800 transition-transform active:scale-95 flex items-center gap-2 shadow-lg"
              >
                {ui.next} <ChevronRight size={14} />
              </button>
            </div>
          </>
        ) : viewMode === ViewMode.FULL_CODE ? (
          <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
             <header className="mb-8 pb-6 border-b border-zinc-100">
               <h1 className="text-3xl font-extrabold text-zinc-900 mb-2">{ui.fullCodeTitle}</h1>
               <p className="text-zinc-600">{ui.fullCodeDesc}</p>
             </header>
             <div className="bg-zinc-950 rounded-xl border border-zinc-800 shadow-2xl overflow-hidden">
                <CodeBlock code={FULL_CODE} />
             </div>
          </div>
        ) : (
          <AssetsView lang={lang} />
        )}
      </main>
    </div>
  );
};

export default App;