import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { Caregiver, CaregiverRow, Review, ReviewRow } from '@/lib/database.types'

function toCaregiver(r: CaregiverRow): Caregiver {
  return {
    id: r.id,
    fullName: r.full_name,
    specialization: r.specialization,
    profilePhoto: r.profile_photo,
    rating: r.rating,
    hourlyRate: r.hourly_rate,
    yearsExperience: r.years_experience,
    bio: r.bio,
    availability: r.availability,
    certifications: r.certifications,
    languages: r.languages,
  }
}

function toReview(r: ReviewRow): Review {
  return {
    id: r.id,
    caregiverId: r.caregiver_id,
    rating: r.rating,
    reviewText: r.review_text,
    reviewerName: r.reviewer_name,
    createdAt: r.created_at,
  }
}

export function useListCaregivers() {
  return useQuery<Caregiver[]>({
    queryKey: ['caregivers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('caregivers')
        .select('*')
        .order('full_name')
      if (error) throw error
      return (data as CaregiverRow[]).map(toCaregiver)
    },
  })
}

export function useGetCaregiver(id: number | string | undefined) {
  return useQuery<Caregiver>({
    queryKey: ['caregivers', id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('caregivers')
        .select('*')
        .eq('id', Number(id))
        .single()
      if (error) throw error
      return toCaregiver(data as CaregiverRow)
    },
  })
}

export function useGetCaregiverReviews(caregiverId: number | string | undefined) {
  return useQuery<Review[]>({
    queryKey: ['reviews', caregiverId],
    enabled: !!caregiverId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('caregiver_id', Number(caregiverId))
        .order('created_at', { ascending: false })
      if (error) throw error
      return (data as ReviewRow[]).map(toReview)
    },
  })
}

export function useDeleteCaregiver() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      const { error } = await supabase.from('caregivers').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['caregivers'] })
    },
  })
}
