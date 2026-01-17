'use client'

import React from 'react'
import { EditorContent, useEditor, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { TextStyle } from '@tiptap/extension-text-style'
import './styles.css'

const extensions = [TextStyle, StarterKit]

function MenuBar({ editor }) {
  const editorState = useEditorState({
    editor,
    selector: ctx => {
      const e = ctx.editor
      // Null-guarding to prevent "isActive" errors during init
      if (!e) return {}

      return {
        isBold: e.isActive('bold'),
        canBold: e.can().chain().toggleBold().run(),
        isItalic: e.isActive('italic'),
        canItalic: e.can().chain().toggleItalic().run(),
        isStrike: e.isActive('strike'),
        canStrike: e.can().chain().toggleStrike().run(),
        isCode: e.isActive('code'),
        canCode: e.can().chain().toggleCode().run(),
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
        canUndo: e.can().chain().undo().run(),
        canRedo: e.can().chain().redo().run(),
      }
    },
  })

  if (!editor) return null

  return (
    <div className="control-group p-2 border-b border-slate-200 bg-slate-50 sticky top-0 z-10">
      <div className="button-group flex flex-wrap gap-1">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          className={editorState.isBold ? 'is-active' : ''}
        > Bold </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          className={editorState.isItalic ? 'is-active' : ''}
        > Italic </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          className={editorState.isStrike ? 'is-active' : ''}
        > Strike </button>

        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState.canCode}
          className={editorState.isCode ? 'is-active' : ''}
        > Code </button>

        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>Clear marks</button>
        <button onClick={() => editor.chain().focus().clearNodes().run()}>Clear nodes</button>

        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editorState.isParagraph ? 'is-active' : ''}
        > Paragraph </button>

        {[1, 2, 3, 4, 5, 6].map((level) => (
          <button
            key={level}
            onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
            className={editorState[`isHeading${level}`] ? 'is-active' : ''}
          > H{level} </button>
        ))}

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editorState.isBulletList ? 'is-active' : ''}
        > Bullet list </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editorState.isOrderedList ? 'is-active' : ''}
        > Ordered list </button>

        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editorState.isCodeBlock ? 'is-active' : ''}
        > Code block </button>

        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editorState.isBlockquote ? 'is-active' : ''}
        > Blockquote </button>

        <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>Horizontal rule</button>
        <button onClick={() => editor.chain().focus().setHardBreak().run()}>Hard break</button>

        <button onClick={() => editor.chain().focus().undo().run()} disabled={!editorState.canUndo}> Undo </button>
        <button onClick={() => editor.chain().focus().redo().run()} disabled={!editorState.canRedo}> Redo </button>
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
      <p>This is a <em>basic</em> example of <strong>Tiptap</strong>. Use the buttons above to format your plan.</p>
      <pre><code class="language-css">body { display: none; }</code></pre>
      <blockquote>Ready to start working in Taiwan next month! 👏</blockquote>
    `,
    editorProps: {
      attributes: {
        class: 'tiptap prose prose-slate max-w-none focus:outline-none p-6 min-h-[500px]',
      },
    },
  })

  return (
    <div className="max-w-5xl mx-auto my-10 border border-slate-300 rounded shadow-lg bg-white">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}