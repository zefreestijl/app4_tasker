'use client'


import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, List, Heading1, Heading2, Download, Upload } from 'lucide-react';

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  // --- 1. Download Logic ---
  const downloadJSON = () => {
    const json = editor.getJSON();
    const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `BIM-Plan-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // --- 2. Load Logic ---
  const loadJSON = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        editor.commands.setContent(json);
      } catch (error) {
        alert("Invalid JSON file for BIM Plan.");
      }
    };
    reader.readAsText(file);
  };

  const btnClass = (active) =>
    `p-2 rounded hover:bg-slate-100 transition-colors ${active ? 'bg-blue-100 text-blue-600' : 'text-slate-600'}`;

  return (
    <div className="flex items-center justify-between p-2 border-b border-slate-200 bg-white sticky top-0 z-10 rounded-t-lg">
      <div className="flex gap-2">
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={btnClass(editor.isActive('heading', { level: 1 }))}><Heading1 size={18} /></button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btnClass(editor.isActive('heading', { level: 2 }))}><Heading2 size={18} /></button>
        <div className="w-px h-6 bg-slate-200 mx-1" />
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={btnClass(editor.isActive('bold'))}><Bold size={18} /></button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={btnClass(editor.isActive('bulletList'))}><List size={18} /></button>
      </div>

      <div className="flex gap-3">
        {/* Load Button */}
        <label className="flex items-center gap-2 px-3 py-2 border border-slate-300 rounded-md hover:bg-slate-50 cursor-pointer text-sm font-medium text-slate-700 transition-all">
          <Upload size={16} /> Load Plan
          <input type="file" accept=".json" onChange={loadJSON} className="hidden" />
        </label>

        {/* Download Button */}
        <button onClick={downloadJSON} className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium text-sm transition-all shadow-sm">
          <Download size={16} /> Download JSON
        </button>
      </div>
    </div>
  );
};

export default function Editor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: `<h1>New BIM Execution Plan</h1><p>Start drafting here...</p>`,
    editorProps: {
      attributes: {
        class: 'prose prose-slate max-w-none focus:outline-none p-10 min-h-[600px]',
      },
    },
    immediatelyRender: false,
  });

  return (
    <div className="w-full bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
      <MenuBar editor={editor} />
      <div className="bg-slate-50 p-4"> {/* Added a "page" effect */}
        <div className="bg-white shadow-sm border border-slate-100 mx-auto max-w-[800px]">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}