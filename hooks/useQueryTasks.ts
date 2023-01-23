import { Task } from '@/types/types'
import { supabase } from '@/utils/supabase'
import { useQuery } from 'react-query'

export const useQueryTasks = () => {
  const getTasks = async () => {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }
    return data
  }
  return useQuery<Task[], Error>({
    queryKey: 'todos',
    queryFn: getTasks,
    staleTime: Infinity, // 再フェッチまでの時間無限にしておくと再度ページ更新が起こらないとフェッチされない
  })
}
