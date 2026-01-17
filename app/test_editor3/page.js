'use client'

import React from 'react'
import { EditorContent, useEditor, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { TextStyle } from '@tiptap/extension-text-style'
import { Undo, Redo, Eraser, Scissors, Minus } from 'lucide-react'
import '../styles.css'

const extensions = [TextStyle, StarterKit]

function MenuBar({ editor }) {
  const editorState = useEditorState({
    editor,
    selector: ctx => {
      const e = ctx.editor
      if (!e) return {}
      return {
        isBold: e.isActive('bold'),
        canBold: e.can().toggleBold(),
        isItalic: e.isActive('italic'),
        canItalic: e.can().toggleItalic(),
        isStrike: e.isActive('strike'),
        canStrike: e.can().toggleStrike(),
        isCode: e.isActive('code'),
        canCode: e.can().toggleCode(),
        isParagraph: e.isActive('paragraph'),
        isHeading1: e.isActive('heading', { level: 1 }),
        isHeading2: e.isActive('heading', { level: 2 }),
        isHeading3: e.isActive('heading', { level: 3 }),
        isHeading4: e.isActive('heading', { level: 4 }),
        isHeading5: e.isActive('heading', { level: 5 }),
        isHeading6: e.isActive('heading', { level: 6 }),
        isBulletList: e.isActive('bulletList'),
        isOrderedList: e.isActive('orderedList'),
        isCodeBlock: e.isActive('codeBlock'),
        isBlockquote: e.isActive('blockquote'),
        canUndo: e.can().undo(),
        canRedo: e.can().redo(),
      }
    },
  })

  if (!editor) return null

  // Tailwind Button Helper
  const btn = (active, disabled = false) => `
    px-2 py-1 text-xs font-medium rounded border transition-all
    ${disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
    ${active
      ? 'bg-slate-800 text-white border-slate-800'
      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'}
  `

  const groupLabel = "text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1 w-full"

  return (
    <div className="p-3 border-b border-slate-200 bg-slate-50 sticky top-0 z-10 flex flex-wrap gap-2 items-center">

      {/* Text Style Group */}
      <div className="flex flex-wrap gap-1 items-center border-r border-slate-300 pr-2">
        <button onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editorState.canBold} className={btn(editorState.isBold)}>B</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editorState.canItalic} className={btn(editorState.isItalic)}>I</button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()} disabled={!editorState.canStrike} className={btn(editorState.isStrike)}>S</button>
        <button onClick={() => editor.chain().focus().toggleCode().run()} disabled={!editorState.canCode} className={btn(editorState.isCode)}>Code</button>
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()} className={btn(false)} title="Clear Marks"><Eraser size={14} /></button>
      </div>

      {/* Headings Group */}
      <div className="flex flex-wrap gap-1 items-center border-r border-slate-300 pr-2">
        <button onClick={() => editor.chain().focus().setParagraph().run()} className={btn(editorState.isParagraph)}>P</button>
        {[1, 2, 3].map((level) => (
          <button
            key={level}
            onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
            className={btn(editorState[`isHeading${level}`])}
          > H{level} </button>
        ))}
      </div>

      {/* Lists & Blocks */}
      <div className="flex flex-wrap gap-1 items-center border-r border-slate-300 pr-2">
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={btn(editorState.isBulletList)}>Bullet</button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btn(editorState.isOrderedList)}>Ordered</button>
        <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={btn(editorState.isCodeBlock)}>Code Block</button>
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btn(editorState.isBlockquote)}>“”</button>
      </div>

      {/* Utility Group */}
      <div className="flex flex-wrap gap-1 items-center">
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className={btn(false)} title="Horizontal Rule"><Minus size={14} /></button>
        <button onClick={() => editor.chain().focus().clearNodes().run()} className={btn(false)} title="Clear Nodes"><Scissors size={14} /></button>
        <button onClick={() => editor.chain().focus().undo().run()} disabled={!editorState.canUndo} className={btn(false)}><Undo size={14} /></button>
        <button onClick={() => editor.chain().focus().redo().run()} disabled={!editorState.canRedo} className={btn(false)}><Redo size={14} /></button>
      </div>
    </div>
  )
}

export default function Page() {
  const editor = useEditor({
    extensions,
    immediatelyRender: false,
    content: `
      <h2>BIM Execution Plan Header</h2>
      <p>Draft your project standards with high-fidelity formatting.</p>
    `,
    editorProps: {
      attributes: {
        // Tailwind Prose handles the rich text styling
        class: 'tiptap prose prose-slate prose-sm md:prose-base max-w-none focus:outline-none p-8 min-h-[600px]',
      },
    },
  })

  return (
    <main className="min-h-screen bg-slate-100 py-12 px-4">
      <div className="max-w-5xl mx-auto border border-slate-300 rounded-lg shadow-2xl bg-white overflow-hidden">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />

        {/* Footer Status Bar */}
        <div className="bg-slate-50 border-t border-slate-200 p-2 px-4 flex justify-between items-center text-[10px] text-slate-400 uppercase tracking-widest font-bold">
          <span>BIM Executive Plan Editor</span>
          <span>Hui Fa Construction • v0.0.1</span>
        </div>
      </div>
    </main>
  )
}