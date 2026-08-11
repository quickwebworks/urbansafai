'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod/v4'
import { toast } from 'sonner'
import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import {
  COMPANY_PHONE,
  COMPANY_WHATSAPP,
  COMPANY_EMAIL,
  COMPANY_ADDRESS,
} from '@/lib/constants'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormValues = z.infer<typeof contactSchema>

const contactCards = [
  {
    icon: Phone,
    label: 'Phone',
    value: COMPANY_PHONE,
    href: `tel:${COMPANY_PHONE.replace(/\s/g, '')}`,
    color: 'text-emerald-400 bg-emerald-500/20',
  },
  {
    icon: MessageSquare,
    label: 'WhatsApp',
    value: COMPANY_PHONE,
    href: `https://wa.me/${COMPANY_WHATSAPP}`,
    color: 'text-emerald-400 bg-emerald-500/20',
  },
  {
    icon: Mail,
    label: 'Email',
    value: COMPANY_EMAIL,
    href: `mailto:${COMPANY_EMAIL}`,
    color: 'text-amber-400 bg-amber-500/15',
  },
  {
    icon: MapPin,
    label: 'Address',
    value: COMPANY_ADDRESS,
    href: '#',
    color: 'text-rose-400 bg-rose-500/15',
  },
  {
    icon: Clock,
    label: 'Working Hours',
    value: 'Mon\u2013Sat: 8AM\u20138PM\nSun: 9AM\u20136PM',
    href: null,
    color: 'text-violet-400 bg-violet-500/15',
  },
]

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  })

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error('Failed to send message')

      toast.success('Message sent successfully!', {
        description: 'We\'ll get back to you within 24 hours.',
      })

      form.reset()
    } catch {
      toast.error('Failed to send message', {
        description: 'Please try again or contact us directly.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-16 md:py-24 bg-base">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Contact Us
          </h2>
          <p className="text-muted-foreground mt-3 text-lg max-w-2xl mx-auto">
            Get in touch with Urban Safai
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Contact Form */}
          <Card className="border-2">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-1">Send Us a Message</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Fill out the form and we&apos;ll respond promptly.
              </p>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            {...field}
                          />
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
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="Your phone number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject *</FormLabel>
                        <FormControl>
                          <Input placeholder="What is this about?" {...field} />
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
                        <FormLabel>Message *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us more..."
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Right: Contact Information Cards */}
          <div className="space-y-4">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-1">Get in Touch</h3>
              <p className="text-sm text-muted-foreground">
                Reach out through any of the channels below.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {contactCards.map((item) => {
                const Icon = item.icon
                const content = (
                  <Card
                    className="transition-all duration-200 hover:shadow-black/20 hover:-translate-y-0.5 cursor-pointer"
                  >
                    <CardContent className="flex items-center gap-4 py-4">
                      <div
                        className={`flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl ${item.color}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          {item.label}
                        </p>
                        {item.value.split('\n').map((line, i) => (
                          <p
                            key={i}
                            className="text-sm font-semibold truncate"
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )

                if (item.href && item.href !== '#') {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {content}
                    </a>
                  )
                }

                return <div key={item.label}>{content}</div>
              })}
            </div>

            <Separator className="my-4" />

            {/* Map placeholder */}
            <div className="rounded-xl border-2 border-emerald-500/20 bg-emerald-500/5 flex items-center justify-center h-48">
              <div className="text-center text-emerald-400/70">
                <MapPin className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm font-medium">Ludhiana, Punjab, India</p>
                <p className="text-xs">We serve all areas across the city</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
