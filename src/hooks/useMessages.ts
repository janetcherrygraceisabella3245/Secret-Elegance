import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { Message, MessageRow } from '@/lib/database.types'

function toMessage(r: MessageRow): Message {
  return {
    id: r.id,
    bookingId: r.booking_id,
    sender: r.sender,
    message: r.message,
    createdAt: r.created_at,
  }
}

export function useGetMessages(bookingId: number | null) {
  return useQuery<Message[]>({
    queryKey: ['messages', bookingId],
    enabled: !!bookingId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('booking_id', bookingId!)
        .order('created_at', { ascending: true })
      if (error) throw error
      return (data as MessageRow[]).map(toMessage)
    },
    refetchInterval: 5000, // poll every 5s for new messages
  })
}

export function useSendMessage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ data: payload }: {
      data: { bookingId: number; sender: string; message: string }
    }) => {
      const { error } = await supabase
        .from('messages')
        .insert({
          booking_id: payload.bookingId,
          sender: payload.sender,
          message: payload.message,
        })
      if (error) throw error
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['messages', variables.data.bookingId] })
    },
  })
}
