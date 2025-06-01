import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'

export default async function ArticleList() {
  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      {articles?.map((article) => (
        <div key={article.id}>
          <h2>{article.title}</h2>
          <Link href={`/admin/articles/edit/${article.id}`}>
            Edit
          </Link>
        </div>
      ))}
    </div>
  )
}