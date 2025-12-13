import React from 'react';
import { Clipboard, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple syntax highlighting based on keywords
  const highlightCode = (text: string) => {
    return text.split('\n').map((line, i) => {
      // Very basic tokenizer for visual effect
      const parts = line.split(/(\s+|[(){}=[\],.])/g).map((part, index) => {
        if (['def', 'import', 'return', 'if', 'else', 'elif', 'for', 'while', 'global'].includes(part)) {
          return <span key={index} className="text-pink-500 font-bold">{part}</span>;
        }
        if (['True', 'False', 'None'].includes(part)) {
          return <span key={index} className="text-orange-400 font-bold">{part}</span>;
        }
        if (part.match(/^[A-Z_]+$/)) { // Constants
          return <span key={index} className="text-blue-400">{part}</span>;
        }
        if (part.startsWith("'") || part.startsWith('"')) {
          return <span key={index} className="text-green-400">{part}</span>;
        }
        if (['Actor', 'Rect', 'pgzrun'].includes(part)) {
           return <span key={index} className="text-yellow-300">{part}</span>;
        }
        if (part.match(/^\d+$/) || part.match(/^\d+\.\d+$/)) {
           return <span key={index} className="text-purple-400">{part}</span>;
        }
        // Comments
        if (part.startsWith('#')) {
             return <span key={index} className="text-gray-500">{part}</span>;
        }
        return <span key={index} className="text-zinc-100">{part}</span>;
      });
      
      // Handle comments that span rest of line
      const commentIndex = line.indexOf('#');
      if (commentIndex !== -1) {
          return (
            <div key={i} className="whitespace-pre">
               <span className="text-zinc-100">{line.substring(0, commentIndex)}</span>
               <span className="text-gray-500">{line.substring(commentIndex)}</span>
            </div>
          )
      }

      return <div key={i} className="whitespace-pre">{parts}</div>;
    });
  };

  return (
    <div className="relative group rounded-lg overflow-hidden bg-zinc-950 border border-zinc-800 shadow-sm my-4">
      <div className="flex justify-between items-center px-4 py-2 bg-zinc-900 border-b border-zinc-800">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
        </div>
        <button 
          onClick={handleCopy}
          className="text-zinc-400 hover:text-white transition-colors"
          title="Copy code"
        >
          {copied ? <Check size={14} /> : <Clipboard size={14} />}
        </button>
      </div>
      <div className="p-4 font-mono text-sm overflow-x-auto">
        {highlightCode(code)}
      </div>
    </div>
  );
};

export default CodeBlock;