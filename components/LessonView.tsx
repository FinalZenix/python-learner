import React from 'react';
import { Lesson, Language } from '../types';
import { UI_TEXT } from '../constants';
import CodeBlock from './CodeBlock';
import GravityViz from './visualizations/GravityViz';
import ScrollingViz from './visualizations/ScrollingViz';
import ArrayViz from './visualizations/ArrayViz';
import CollisionViz from './visualizations/CollisionViz';
import AnimationViz from './visualizations/AnimationViz';
import StateViz from './visualizations/StateViz';

interface LessonViewProps {
  lesson: Lesson;
  lang: Language;
}

const LessonView: React.FC<LessonViewProps> = ({ lesson, lang }) => {
  const ui = UI_TEXT[lang];

  return (
    <div className="max-w-3xl mx-auto pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-10 border-b border-zinc-100 pb-6">
        <span className="text-zinc-400 font-mono text-sm uppercase tracking-widest">Lesson {lesson.number}</span>
        <h1 className="text-4xl font-extrabold text-zinc-900 mt-2 mb-4 tracking-tight">{lesson.title}</h1>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-baseline">
            <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded uppercase">{ui.goal}</span>
            <p className="text-zinc-600">{lesson.goal}</p>
          </div>
          <div className="flex gap-2 items-baseline">
            <span className="bg-zinc-200 text-zinc-800 text-xs font-bold px-2 py-1 rounded uppercase">{ui.concept}</span>
            <p className="text-zinc-600">{lesson.concept}</p>
          </div>
        </div>
      </header>

      <div className="space-y-16">
        {lesson.steps.map((step, idx) => (
          <section key={idx} className="relative pl-6 border-l-2 border-zinc-100">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-zinc-200 border-2 border-white"></div>
            <h2 className="text-xl font-bold text-zinc-800 mb-2">{step.title}</h2>
            <p className="text-zinc-600 mb-6 leading-relaxed">{step.description}</p>
            
            {step.visualConcept === 'gravity' && <GravityViz lang={lang} />}
            {step.visualConcept === 'scrolling' && <ScrollingViz lang={lang} />}
            {step.visualConcept === 'arrays' && <ArrayViz lang={lang} />}
            {step.visualConcept === 'collision' && <CollisionViz lang={lang} />}
            {step.visualConcept === 'animation' && <AnimationViz lang={lang} />}
            {step.visualConcept === 'states' && <StateViz lang={lang} />}
            
            {step.codeSnippet && <CodeBlock code={step.codeSnippet} />}
          </section>
        ))}
      </div>
    </div>
  );
};

export default LessonView;