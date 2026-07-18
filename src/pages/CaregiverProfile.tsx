import { useParams, Link } from "wouter"
import { motion } from "framer-motion"
import { Star, Award, Languages, Clock, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useGetCaregiver, useGetCaregiverReviews } from "@/hooks/useCaregivers"

export default function CaregiverProfile() {
  const { id } = useParams()
  const { data: caregiver, isLoading } = useGetCaregiver(id)
  const { data: reviews = [] } = useGetCaregiverReviews(id)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading profile…</div>
      </div>
    )
  }

  if (!caregiver) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Caregiver not found.</p>
      </div>
    )
  }

  const languageList = caregiver.languages
    ? caregiver.languages.split(",").map(l => l.trim())
    : []

  const certList = caregiver.certifications
    ? caregiver.certifications.split(",").map(c => c.trim())
    : []

  const dailyRate = caregiver.hourlyRate * 8

  return (
    <div className="w-full flex flex-col pb-24 bg-white">
      {/* Header Profile Section */}
      <section className="bg-secondary/30 pt-10 pb-20 border-b border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <Link
            href="/caregivers"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-10 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Caregivers
          </Link>

          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-8 border-white shadow-xl shrink-0">
              {caregiver.profilePhoto ? (
                <img
                  src={caregiver.profilePhoto}
                  alt={caregiver.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-serif text-6xl">
                  {caregiver.fullName.charAt(0)}
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-2">
                    {caregiver.fullName}
                  </h1>
                  <p className="text-xl text-primary font-medium">{caregiver.specialization}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Button size="lg" className="rounded-full shadow-md" asChild>
                    <Link href={`/book/service?caregiverId=${caregiver.id}`}>Book Appointment</Link>
                  </Button>
                  <p className="text-xs text-center text-muted-foreground uppercase tracking-wider">
                    From ${caregiver.hourlyRate}/hr
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-foreground/80 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500 fill-current" />
                  <span className="font-medium text-lg">{caregiver.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground">({reviews.length} reviews)</span>
                </div>
                {caregiver.yearsExperience != null && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <span>{caregiver.yearsExperience} Years Experience</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      caregiver.availability === "Available" ? "bg-green-500" : "bg-amber-500"
                    }`}
                  />
                  <span>{caregiver.availability}</span>
                </div>
              </div>

              {caregiver.bio && (
                <p className="text-muted-foreground leading-relaxed max-w-2xl">{caregiver.bio}</p>
              )}

              {certList.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {certList.map(cert => (
                    <Badge key={cert} variant="outline" className="bg-white gap-1">
                      <Award className="w-3 h-3" /> {cert}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews + Details */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl grid lg:grid-cols-3 gap-12">
          {/* Reviews */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-serif mb-8">Client Reviews</h2>
            {reviews.length > 0 ? (
              <div className="space-y-8">
                {reviews.map(review => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-secondary/20 p-6 rounded-[24px] border border-border/50"
                  >
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-200 fill-gray-200"
                          }`}
                        />
                      ))}
                      {review.reviewerName && (
                        <span className="font-medium text-sm ml-2">{review.reviewerName}</span>
                      )}
                    </div>
                    {review.reviewText && (
                      <p className="text-muted-foreground italic">"{review.reviewText}"</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-4">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No reviews available yet.</p>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-secondary/30 p-8 rounded-[32px] border border-border/50">
              <h3 className="font-serif text-xl mb-6">Details</h3>

              <div className="space-y-6">
                {languageList.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
                      <Languages className="w-4 h-4 text-muted-foreground" /> Languages
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {languageList.map(lang => (
                        <Badge key={lang} variant="outline" className="bg-white">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-6 border-t border-border">
                  <h4 className="text-sm font-medium text-foreground mb-4">Rates</h4>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-muted-foreground text-sm">Hourly Rate</span>
                    <span className="font-serif text-xl">${caregiver.hourlyRate}</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-muted-foreground text-sm">Daily Rate (est.)</span>
                    <span className="font-serif text-xl">${dailyRate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
