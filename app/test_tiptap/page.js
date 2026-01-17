'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World! 🌎️</p>',
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  })

  return (
    <div>
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-900">BEP Document Editor</h1>
        <p className="text-gray-500">ver 0.0.1</p>
      </div>

      <EditorContent editor={editor} />

    </div>
  )
}

export default Tiptap