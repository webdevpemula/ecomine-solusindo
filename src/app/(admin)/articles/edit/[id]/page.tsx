'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function CreateArticle() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const router = useRouter()

  async function handleSubmit() {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return

    const { error } = await supabase
      .from('articles')
      .insert({
        title,
        content,
        category: 'Pertambangan',
        user_id: user.id
      })

    if (!error) router.push('/admin/articles')
  }

  return (
    <div>
      <input 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSubmit}>Simpan</button>
    </div>
  )
}