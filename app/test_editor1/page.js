'use client'

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, List, Heading1, Heading2, Save } from 'lucide-react';

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const btnClass = (active) =>
    `p-2 rounded hover:bg-slate-100 transition-colors ${active ? 'bg-blue-100 text-blue-600' : 'text-slate-600'}`;

  const handleSave = () => {
    const data = editor.getJSON();
    console.log('BIM Plan Data (JSON):', data);
    alert('Document structure saved to console!');
  };

  return (
    <div className="flex items-center justify-between p-2 border-b border-slate-200 bg-white sticky top-0 z-10 rounded-t-lg">
      <div className="flex gap-2">
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={btnClass(editor.isActive('heading', { level: 1 }))}><Heading1 size={18} /></button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btnClass(editor.isActive('heading', { level: 2 }))}><Heading2 size={18} /></button>
        <div className="w-px h-6 bg-slate-200 mx-1" />
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={btnClass(editor.isActive('bold'))}><Bold size={18} /></button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={btnClass(editor.isActive('italic'))}><Italic size={18} /></button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={btnClass(editor.isActive('bulletList'))}><List size={18} /></button>
      </div>

      <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium text-sm transition-all">
        <Save size={16} /> Save Plan
      </button>
    </div>
  );
};

export default function Editor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: `<h1>BIM Execution Plan</h1><p>Define your project standards...</p>`,
    editorProps: {
      attributes: {
        class: 'prose prose-slate max-w-none focus:outline-none p-8 min-h-[500px]',
      },
    },
    immediatelyRender: false,
  });

  return (
    <div className="w-full bg-white border border-slate-200 rounded-lg shadow-sm">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}