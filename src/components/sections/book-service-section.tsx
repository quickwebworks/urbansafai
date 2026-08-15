'use client'

import { useState, useMemo, useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod/v4'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Calendar,
  Clock,
  MapPin,
  User,
  Mail,
  Phone,
  MessageSquare,
  Sparkles,
  Package,
  Loader2,
  CircleCheck,
  Copy,
  CheckCheck,
  Bath,
  BedDouble,
  Bug,
  Building,
  Building2,
  Castle,
  ChefHat,
  Droplets,
  HardHat,
  LogIn,
  LogOut,
  Refrigerator,
  ScanSearch,
  ShieldCheck,
  Snowflake,
  Sofa,
  Square,
  Store,
  WashingMachine,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { ScrollArea } from '@/components/ui/scroll-area'

import { services } from '@/lib/services-data'
import { BOOKING_TIME_SLOTS } from '@/lib/constants'
import type { BookingItem } from '@/lib/types'

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Extract the base (lowest) numeric price from a price string like "₹2,499 – ₹3,499" or "₹159" */
function extractBasePrice(priceStr: string): number {
  const match = priceStr.match(/[\d,]+(?:\.\d+)?/)
  return match ? parseFloat(match[0].replace(/,/g, '')) : 0
}

/** Format a number to INR string */
function formatPrice(num: number): string {
  if (num % 1 !== 0) {
    return `₹${num.toFixed(2)}`
  }
  return `₹${num.toLocaleString('en-IN')}`
}

/** Static icon map — avoids barrel import that kills tree-shaking */
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Bath, BedDouble, Bug, Building, Building2, Castle, ChefHat, Droplets, HardHat,
  Home, LogIn, LogOut, Refrigerator, ScanSearch, ShieldCheck, Snowflake,
  Sofa, Square, Store, WashingMachine, Sparkles,
}

function ServiceIcon({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const IconComponent = ICON_MAP[name] ?? Sparkles
  return <IconComponent className={className} />
}

// ─── Types ──────────────────────────────────────────────────────────────────

const detailsSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z
    .string()
    .min(10, 'Please enter a valid phone number')
    .max(15, 'Phone number is too long'),
  email: z.email('Please enter a valid email address'),
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time slot'),
  address: z.string().min(5, 'Please enter your full address'),
  message: z.string().optional(),
})

type DetailsFormValues = z.infer<typeof detailsSchema>

const STEPS = [
  { label: 'Select Services', icon: ShoppingBag },
  { label: 'Your Details', icon: User },
  { label: 'Review & Confirm', icon: Check },
]

// ─── Animation variants ─────────────────────────────────────────────────────

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function BookServiceSection() {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(0)
  const [selectedItems, setSelectedItems] = useState<BookingItem[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState<{
    bookingId: string
    name: string
    items: BookingItem[]
    date: string
    time: string
    totalPrice: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const form = useForm<DetailsFormValues>({
    resolver: zodResolver(detailsSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      date: '',
      time: '',
      address: '',
      message: '',
    },
  })

  // ── Derived state ──

  const totalPrice = useMemo(() => {
    return selectedItems.reduce((sum, item) => {
      const numPrice = parseFloat(item.price.replace(/[^\d.]/g, ''))
      return sum + numPrice * item.quantity
    }, 0)
  }, [selectedItems])

  const totalPriceStr = formatPrice(totalPrice)

  const addItem = useCallback((serviceId: string) => {
    const svc = services.find((s) => s.id === serviceId)
    if (!svc) return
    const basePrice = extractBasePrice(svc.price)
    const priceStr = formatPrice(basePrice)

    setSelectedItems((prev) => {
      const existing = prev.find((i) => i.serviceId === serviceId)
      if (existing) {
        return prev.map((i) =>
          i.serviceId === serviceId
            ? {
                ...i,
                quantity: i.quantity + 1,
                subtotal: formatPrice(
                  (parseFloat(i.price.replace(/[^\d.]/g, '')) * (i.quantity + 1))
                ),
              }
            : i
        )
      }
      return [
        ...prev,
        {
          serviceId: svc.id,
          serviceName: svc.name,
          price: priceStr,
          quantity: 1,
          subtotal: priceStr,
        },
      ]
    })
  }, [])

  const removeItem = useCallback((serviceId: string) => {
    setSelectedItems((prev) => {
      const existing = prev.find((i) => i.serviceId === serviceId)
      if (!existing) return prev
      if (existing.quantity <= 1) {
        return prev.filter((i) => i.serviceId !== serviceId)
      }
      const newQty = existing.quantity - 1
      const numPrice = parseFloat(existing.price.replace(/[^\d.]/g, ''))
      return prev.map((i) =>
        i.serviceId === serviceId
          ? { ...i, quantity: newQty, subtotal: formatPrice(numPrice * newQty) }
          : i
      )
    })
  }, [])

  const deleteItem = useCallback((serviceId: string) => {
    setSelectedItems((prev) => prev.filter((i) => i.serviceId !== serviceId))
  }, [])

  const getItemQuantity = useCallback(
    (serviceId: string) => {
      return selectedItems.find((i) => i.serviceId === serviceId)?.quantity ?? 0
    },
    [selectedItems]
  )

  // ── Step navigation ──

  const sectionRef = useRef<HTMLElement>(null)

  const goToStep = (nextStep: number) => {
    if (step === 0 && nextStep === 1) {
      if (selectedItems.length === 0) {
        toast.error('Please add at least one service')
        return
      }
    }
    if (step === 1 && nextStep === 2) {
      const valid = form.trigger(['name', 'phone', 'email', 'date', 'time', 'address'])
      valid.then((ok) => {
        if (ok) {
          setDirection(nextStep - step)
          setStep(nextStep)
          // Scroll to top of booking section on mobile
          setTimeout(() => {
            sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }, 100)
        }
      })
      return
    }
    setDirection(nextStep - step)
    setStep(nextStep)
    // Scroll to top of booking section on mobile
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  // ── Submit ──

  const onSubmit = async () => {
    setIsSubmitting(true)
    try {
      const values = form.getValues()
      const payload = {
        name: values.name,
        phone: values.phone,
        email: values.email,
        services: JSON.stringify(selectedItems),
        date: values.date,
        time: values.time,
        address: values.address,
        message: values.message || '',
        totalPrice: totalPriceStr,
      }

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.detail || data.error || 'Booking failed')
      }

      // Show full-screen success with all details
      setBookingSuccess({
        bookingId: data.bookingId,
        name: values.name,
        items: selectedItems,
        date: values.date,
        time: values.time,
        totalPrice: totalPriceStr,
      })

      // Reset form data (but keep success visible)
      setSelectedItems([])
      form.reset()
      setDirection(0)
      setStep(0)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  // ── Min date for date picker ──
  const today = new Date()
  const minDate = today.toISOString().split('T')[0]

  // ── Copy booking ID ──
  const copyBookingId = () => {
    if (bookingSuccess) {
      navigator.clipboard.writeText(bookingSuccess.bookingId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // ── Render ──

  // ── Full-screen booking confirmation overlay ──
  if (bookingSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm px-4 py-8 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          <div className="rounded-3xl border border-emerald-500/20 bg-card p-8 sm:p-10 text-center shadow-2xl shadow-emerald-900/10">

            {/* Animated success checkmark with pulse ring */}
            <div className="relative w-24 h-24 mx-auto mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.3, 1] }}
                transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full bg-emerald-500/10"
              />
              <motion.div
                initial={{ scale: 0, opacity: 0.6 }}
                animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                transition={{ delay: 0.5, duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                className="absolute inset-0 rounded-full border-2 border-emerald-500/30"
              />
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 180, damping: 12 }}
                className="relative w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
                >
                  <Check className="w-12 h-12 text-white" strokeWidth={3} />
                </motion.div>
              </motion.div>
            </div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-2xl sm:text-3xl font-bold text-foreground mb-2"
            >
              Booking Confirmed!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-muted-foreground text-sm sm:text-base mb-6"
            >
              Thank you, <span className="font-semibold text-foreground">{bookingSuccess.name}</span>! Our team will reach out shortly.
            </motion.p>

            {/* Booking ID — prominent */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="rounded-2xl bg-emerald-500/5 border border-emerald-500/20 p-5 mb-5"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2">Booking Reference ID</p>
              <div className="flex items-center justify-center gap-2">
                <code className="text-lg sm:text-2xl font-mono font-bold text-foreground tracking-wider">
                  {bookingSuccess.bookingId.slice(0, 8).toUpperCase()}
                </code>
                <button
                  onClick={copyBookingId}
                  className="p-2 rounded-lg hover:bg-emerald-500/10 text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-all"
                  title="Copy full Booking ID"
                >
                  {copied ? <CheckCheck className="size-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="size-4" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">Full ID: <span className="font-mono opacity-60">{bookingSuccess.bookingId}</span></p>
            </motion.div>

            {/* Order summary mini-card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="rounded-xl bg-muted/50 border border-border p-4 mb-5 text-left space-y-3"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Order Summary</p>

              {/* Services list */}
              <div className="space-y-1.5">
                {bookingSuccess.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground truncate mr-2">
                      {item.serviceName} × {item.quantity}
                    </span>
                    <span className="font-medium text-foreground whitespace-nowrap">{item.subtotal}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-2 flex justify-between items-center">
                <span className="text-sm font-semibold text-foreground">Total</span>
                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{bookingSuccess.totalPrice}</span>
              </div>

              <div className="flex gap-4 pt-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="size-3" />{bookingSuccess.date}</span>
                <span className="flex items-center gap-1"><Clock className="size-3" />{bookingSuccess.time}</span>
              </div>
            </motion.div>

            {/* What happens next */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="text-left rounded-xl bg-muted/30 p-4 mb-6"
            >
              <p className="text-sm font-semibold text-foreground mb-3">What happens next?</p>
              <div className="space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">1</span>
                  </div>
                  <p className="text-muted-foreground text-sm">Our team will call you to confirm the date & time</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">2</span>
                  </div>
                  <p className="text-muted-foreground text-sm">A confirmation email will be sent to your email</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">3</span>
                  </div>
                  <p className="text-muted-foreground text-sm">Our cleaning team arrives at your doorstep on schedule</p>
                </div>
              </div>
            </motion.div>

            {/* Done button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <Button
                onClick={() => {
                  setBookingSuccess(null)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all cursor-pointer shadow-lg shadow-emerald-600/20"
              >
                Done
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <section id="booking" ref={sectionRef} className="py-20 md:py-28 bg-gradient-to-b from-emerald-500/10 to-background">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/25">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            Book Now
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Book Your <span className="text-emerald-400">Cleaning Service</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Select one or more services, set quantities, and get instant pricing. Transparent pricing with no hidden charges.
          </p>
        </motion.div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10">
          {STEPS.map((s, i) => {
            const StepIcon = s.icon
            const isActive = step === i
            const isCompleted = step > i
            return (
              <div key={s.label} className="flex items-center">
                <button
                  onClick={() => i < step && goToStep(i)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                      : isCompleted
                        ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 cursor-pointer'
                        : 'bg-muted text-muted-foreground'
                  }`}
                  disabled={i > step}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <StepIcon className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {i < STEPS.length - 1 && (
                  <div
                    className={`w-8 sm:w-12 h-0.5 mx-1 ${
                      step > i ? 'bg-emerald-500' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {step === 0 && (
              <StepSelectServices
                selectedItems={selectedItems}
                addItem={addItem}
                removeItem={removeItem}
                deleteItem={deleteItem}
                getItemQuantity={getItemQuantity}
                totalPriceStr={totalPriceStr}
                onNext={() => goToStep(1)}
              />
            )}
            {step === 1 && (
              <StepYourDetails
                form={form}
                minDate={minDate}
                onBack={() => goToStep(0)}
                onNext={() => goToStep(2)}
              />
            )}
            {step === 2 && (
              <StepReviewConfirm
                selectedItems={selectedItems}
                totalPriceStr={totalPriceStr}
                formValues={form.getValues()}
                isSubmitting={isSubmitting}
                onBack={() => goToStep(1)}
                onSubmit={onSubmit}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

// ─── Step 1: Select Services ────────────────────────────────────────────────

function StepSelectServices({
  selectedItems,
  addItem,
  removeItem,
  deleteItem,
  getItemQuantity,
  totalPriceStr,
  onNext,
}: {
  selectedItems: BookingItem[]
  addItem: (id: string) => void
  removeItem: (id: string) => void
  deleteItem: (id: string) => void
  getItemQuantity: (id: string) => number
  totalPriceStr: string
  onNext: () => void
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Services Grid */}
      <div className="lg:col-span-2">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Package className="w-5 h-5 text-emerald-400" />
          Choose Your Services
          <Badge variant="outline" className="ml-2 text-xs font-normal">
            {services.length} available
          </Badge>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {services.map((svc) => {
            const qty = getItemQuantity(svc.id)
            const isSelected = qty > 0
            const basePrice = extractBasePrice(svc.price)
            const isRange = svc.price.includes('–')

            return (
              <Card
                key={svc.id}
                className={`relative transition-all duration-200 hover:shadow-black/20 ${
                  isSelected
                    ? 'border-emerald-500 border-2 bg-emerald-500/15'
                    : 'hover:border-emerald-500/50'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div
                        className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                          isSelected
                            ? 'bg-emerald-500 text-white'
                            : 'bg-emerald-500/20 text-emerald-400'
                        }`}
                      >
                        <ServiceIcon name={svc.icon} className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-sm leading-tight truncate">
                          {svc.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {svc.priceUnit}
                        </p>
                        <p className="text-emerald-400 font-semibold text-sm mt-1">
                          {isRange
                            ? `From ${formatPrice(basePrice)}`
                            : svc.price}
                        </p>
                      </div>
                    </div>
                    {isSelected ? (
                      <div className="flex items-center gap-1.5 shrink-0">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 text-red-500 hover:text-red-400 hover:bg-red-900/20"
                          onClick={() => removeItem(svc.id)}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </Button>
                        <span className="w-6 text-center font-semibold text-sm">
                          {qty}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 text-emerald-400 hover:text-white hover:bg-emerald-500/20"
                          onClick={() => addItem(svc.id)}
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="shrink-0 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20 hover:text-white"
                        onClick={() => addItem(svc.id)}
                      >
                        <Plus className="w-3.5 h-3.5 mr-1" />
                        Add
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Order Summary - Sticky on desktop */}
      <div className="lg:col-span-1">
        <div className="lg:sticky lg:top-6">
          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-400" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <ShoppingBag className="w-10 h-10 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No services selected yet.</p>
                  <p className="text-xs mt-1">
                    Click &quot;Add&quot; on services to get started.
                  </p>
                </div>
              ) : (
                <>
                  <ScrollArea className="max-h-72 overflow-y-auto">
                    <div className="space-y-3 pr-3">
                      {selectedItems.map((item) => (
                        <div
                          key={item.serviceId}
                          className="flex items-center justify-between gap-2"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium truncate">
                              {item.serviceName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {item.price} × {item.quantity}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-sm font-semibold text-emerald-400">
                              {item.subtotal}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-muted-foreground hover:text-red-500"
                              onClick={() => deleteItem(item.serviceId)}
                              aria-label={`Remove ${item.serviceName}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {selectedItems.reduce((s, i) => s + i.quantity, 0)}{' '}
                      {selectedItems.reduce((s, i) => s + i.quantity, 0) === 1
                        ? 'service'
                        : 'services'}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Subtotal
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Taxes & charges
                    </span>
                    <span className="text-xs text-emerald-400 font-medium">
                      Included
                    </span>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold">Grand Total</span>
                    <span className="text-xl font-bold text-emerald-400">
                      {totalPriceStr}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground text-center">
                    * Prices shown are starting prices. Final pricing may vary based on actual requirements.
                  </p>
                </>
              )}

              <Button
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
                size="lg"
                onClick={onNext}
                disabled={selectedItems.length === 0}
              >
                Continue to Details
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// ─── Step 2: Your Details ───────────────────────────────────────────────────

function StepYourDetails({
  form,
  minDate,
  onBack,
  onNext,
}: {
  form: ReturnType<typeof useForm<DetailsFormValues>>
  minDate: string
  onBack: () => void
  onNext: () => void
}) {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-400" />
            Your Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Full Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            placeholder="Enter your name"
                            className="pl-10 text-white"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Phone Number <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            type="tel"
                            placeholder="10-digit mobile number"
                            className="pl-10 text-white"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email Address <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          className="pl-10 text-white"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Preferred Date <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            type="date"
                            min={minDate}
                            className="pl-10 text-white"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Preferred Time <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                            <SelectTrigger className="pl-10 text-white">
                              <SelectValue placeholder="Select time slot" />
                            </SelectTrigger>
                          </div>
                        </FormControl>
                        <SelectContent>
                          {BOOKING_TIME_SLOTS.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Service Address <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="Full address in Ludhiana"
                          className="pl-10 text-white"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Message (Optional)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Textarea
                          placeholder="Any special requirements or instructions..."
                          className="pl-10 min-h-[80px] text-white"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onBack}
                  className="flex-1 sm:flex-none"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  type="button"
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
                  size="lg"
                  onClick={onNext}
                >
                  Review Order
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

// ─── Step 3: Review & Confirm ───────────────────────────────────────────────

function StepReviewConfirm({
  selectedItems,
  totalPriceStr,
  formValues,
  isSubmitting,
  onBack,
  onSubmit,
}: {
  selectedItems: BookingItem[]
  totalPriceStr: string
  formValues: DetailsFormValues
  isSubmitting: boolean
  onBack: () => void
  onSubmit: () => void
}) {
  const totalItems = selectedItems.reduce((s, i) => s + i.quantity, 0)

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Check className="w-5 h-5 text-emerald-400" />
            Review Your Booking
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Services ({totalItems} {totalItems === 1 ? 'item' : 'items'})
            </h4>
            <div className="rounded-lg border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-4 py-2.5 font-medium">Service</th>
                    <th className="text-center px-4 py-2.5 font-medium">Qty</th>
                    <th className="text-right px-4 py-2.5 font-medium">Price</th>
                    <th className="text-right px-4 py-2.5 font-medium">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedItems.map((item, idx) => (
                    <tr
                      key={item.serviceId}
                      className={idx % 2 === 0 ? 'bg-background' : 'bg-muted/10'}
                    >
                      <td className="px-4 py-2.5 font-medium">{item.serviceName}</td>
                      <td className="px-4 py-2.5 text-center">{item.quantity}</td>
                      <td className="px-4 py-2.5 text-right text-muted-foreground">
                        {item.price}
                      </td>
                      <td className="px-4 py-2.5 text-right font-semibold text-emerald-400">
                        {item.subtotal}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Separator />

          {/* Customer Details */}
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Customer Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground shrink-0" />
                <span>{formValues.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                <span>{formValues.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                <span>{formValues.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
                <span>{formValues.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground shrink-0" />
                <span>{formValues.time}</span>
              </div>
              <div className="flex items-center gap-2 sm:col-span-2">
                <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                <span>{formValues.address}</span>
              </div>
              {formValues.message && (
                <div className="flex items-start gap-2 sm:col-span-2">
                  <MessageSquare className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span>{formValues.message}</span>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Grand Total */}
          <div className="flex items-center justify-between bg-emerald-500/15 rounded-lg px-5 py-4">
            <span className="text-lg font-semibold">Grand Total</span>
            <span className="text-2xl font-bold text-emerald-400">
              {totalPriceStr}
            </span>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            By confirming, you agree to our service terms. Final pricing may vary based on on-site assessment. Our team will contact you to confirm the booking.
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="flex-1 sm:flex-none"
              disabled={isSubmitting}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              type="button"
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
              size="lg"
              onClick={onSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Confirming...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Confirm Booking
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
