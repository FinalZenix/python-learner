export type Language = 'en' | 'de';

export interface LessonStep {
  title: string;
  description: string;
  codeSnippet?: string;
  visualConcept?: 'gravity' | 'scrolling' | 'arrays' | 'collision' | 'animation' | 'states';
}

export interface Lesson {
  id: string;
  number: number;
  title: string;
  goal: string;
  concept: string;
  steps: LessonStep[];
}

export interface CourseContent {
  core: Lesson[];
  extras: Lesson[];
}

export interface VizProps {
  lang: Language;
}