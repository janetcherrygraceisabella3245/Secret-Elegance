import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { Client, ClientRow } from '@/lib/database.types'

function toClient(r: ClientRow): Client {
  return {
    id: r.id,
    fullName: r.full_name,
    email: r.email,
    phone: r.phone,
    address: r.address,
    createdAt: r.created_at,
  }
}

export function useListClients() {
  return useQuery<Client[]>({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return (data as ClientRow[]).map(toClient)
    },
  })
}

export function useCreateClient() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ data: payload }: {
      data: { fullName: string; email: string; phone?: string; address?: string }
    }): Promise<Client> => {
      const { data, error } = await supabase
        .from('clients')
        .insert({
          full_name: payload.fullName,
          email: payload.email,
          phone: payload.phone ?? null,
          address: payload.address ?? null,
        })
        .select()
        .single()
      if (error) throw error
      return toClient(data as ClientRow)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
    },
  })
}
