'use client'

import '../styles.css' // your translated editor CSS
import React from 'react'
import { useEditor, EditorContent, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

// MenuBar component
function MenuBar({ editor }) {
  if (!editor) return null

  // track active state
  const editorState = useEditorState({
    editor,
    selector: ctx => ({
      isBold: ctx.editor.isActive('bold') ?? false,
      canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
      isItalic: ctx.editor.isActive('italic') ?? false,
      canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
      isStrike: ctx.editor.isActive('strike') ?? false,
      canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
      isCode: ctx.editor.isActive('code') ?? false,
      canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
      canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
      isParagraph: ctx.editor.isActive('paragraph') ?? false,
      isHeading1: ctx.editor.isActive('heading', { level: 1 }) ?? false,
      isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
      isBulletList: ctx.editor.isActive('bulletList') ?? false,
      isOrderedList: ctx.editor.isActive('orderedList') ?? false,
      canUndo: ctx.editor.can().chain().undo().run() ?? false,
      canRedo: ctx.editor.can().chain().redo().run() ?? false,
    }),
  })

  const buttonClass = (active) =>
    `px-2 py-1 border rounded ${active ? 'bg-gray-700 text-white' : 'bg-gray-100'}`

  return (
    <div className="mb-2 flex flex-wrap gap-1">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editorState.canBold}
        className={buttonClass(editorState.isBold)}
      >
        Bold
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editorState.canItalic}
        className={buttonClass(editorState.isItalic)}
      >
        Italic
      </button>

      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editorState.canStrike}
        className={buttonClass(editorState.isStrike)}
      >
        Strike
      </button>

      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editorState.canCode}
        className={buttonClass(editorState.isCode)}
      >
        Code
      </button>

      <button onClick={() => editor.chain().focus().unsetAllMarks().run()} className={buttonClass(false)}>
        Clear Marks
      </button>

      <button onClick={() => editor.chain().focus().setParagraph().run()} className={buttonClass(editorState.isParagraph)}>
        Paragraph
      </button>

      <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={buttonClass(editorState.isHeading1)}>
        H1
      </button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={buttonClass(editorState.isHeading2)}>
        H2
      </button>

      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={buttonClass(editorState.isBulletList)}>
        Bullet List
      </button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={buttonClass(editorState.isOrderedList)}>
        Ordered List
      </button>

      <button onClick={() => editor.chain().focus().undo().run()} disabled={!editorState.canUndo} className={buttonClass(false)}>
        Undo
      </button>
      <button onClick={() => editor.chain().focus().redo().run()} disabled={!editorState.canRedo} className={buttonClass(false)}>
        Redo
      </button>
    </div>
  )
}

// Main Page Component
export default function Page() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: `
      <h2>Hi there,</h2>
      <p>This is a <em>basic</em> example of <strong>Tiptap</strong>.</p>
      <ul>
        <li>That’s a bullet list with one …</li>
        <li>… or two list items.</li>
      </ul>
      <pre><code class="language-css">body { display: none; }</code></pre>
      <blockquote>
        Wow, that’s amazing. Good work, boy! 👏<br />
        — Mom
      </blockquote>
      <hr />
      <p>End of demo content.</p>
    `,
    immediatelyRender: false,
  })

  if (!editor) return null

  return (
    <div className="p-4">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="tiptap border border-gray-300 rounded p-3" />
    </div>
  )
}
