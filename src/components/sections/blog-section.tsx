'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight, Clock } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'

import { blogPosts } from '@/lib/blog-data'
import type { BlogPost } from '@/lib/types'

/** Color map for author avatars (warm rose brand shades) */
const avatarColorMap: Record<string, string> = {
  amber: 'bg-amber-600',
  sky: 'bg-emerald-500',
  emerald: 'bg-emerald-400',
  cyan: 'bg-emerald-600',
  rose: 'bg-emerald-500',
  orange: 'bg-emerald-400',
  teal: 'bg-emerald-600',
  violet: 'bg-emerald-700',
}

/** Category badge color (warm palette variants) */
const categoryColors: Record<string, string> = {
  'Festival Cleaning': 'bg-amber-500/15 text-amber-400',
  'Appliance Care': 'bg-emerald-500/20 text-emerald-400',
  'Seasonal Care': 'bg-rose-500/15 text-rose-400',
  'Home Maintenance': 'bg-orange-500/15 text-orange-400',
  'Cleaning Tips': 'bg-emerald-500/15 text-emerald-300',
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function getAvatarColor(color: string) {
  return avatarColorMap[color] || 'bg-primary'
}

function getCategoryStyle(category: string) {
  return categoryColors[category] || 'bg-gray-800 text-gray-300'
}

/** Render the full article content from markdown-like text */
function ArticleContent({ content }: { content: string }) {
  const paragraphs = content.split('\n\n').filter((p) => p.trim())
  return (
    <div className="space-y-4">
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className="text-base leading-relaxed text-muted-foreground"
        >
          {paragraph.trim()}
        </p>
      ))}
    </div>
  )
}

/** Single blog card in the grid */
function BlogCard({
  post,
  onSelect,
}: {
  post: BlogPost
  onSelect: (post: BlogPost) => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Card className="group overflow-hidden border border-emerald-500/15 hover:border-emerald-500/30 shadow-black/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden rounded-t-lg">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Category badge */}
          <Badge
            className={`absolute top-3 left-3 ${getCategoryStyle(post.category)} border-0 text-xs font-medium`}
          >
            {post.category}
          </Badge>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          <h3 className="text-base font-bold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Bottom row */}
          <div className="mt-auto pt-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-3.5 w-3.5" />
                <span className="max-w-[100px] truncate">{post.author}</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>{formatDate(post.date)}</span>
              </div>
            </div>
            <button
              onClick={() => onSelect(post)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors shrink-0"
            >
              Read More
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

/** Full article dialog */
function ArticleDialog({
  post,
  open,
  onClose,
}: {
  post: BlogPost
  open: boolean
  onClose: () => void
}) {
  if (!post) return null

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent
        className="max-w-4xl w-[calc(100%-1rem)] sm:w-full p-0 gap-0 overflow-hidden max-h-[95vh] sm:max-h-[90vh]"
        showCloseButton={true}
      >
        <DialogTitle className="sr-only">{post.title}</DialogTitle>
        <DialogDescription className="sr-only">Blog article by {post.author}</DialogDescription>

        <ScrollArea className="max-h-[95vh] sm:max-h-[90vh]">
          {/* Hero image */}
          <div className="relative aspect-video w-full">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
          </div>

          <div className="p-6 sm:p-8">
            {/* Category & meta */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge
                className={`${getCategoryStyle(post.category)} border-0 text-xs font-medium`}
              >
                {post.category}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span>{formatDate(post.date)}</span>
              </div>
              {post.readTime && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{post.readTime}</span>
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight">
              {post.title}
            </h1>

            {/* Author info */}
            <div className="flex items-center gap-3 mt-6 mb-8 pb-6 border-b">
              <div
                className={`h-10 w-10 rounded-full ${getAvatarColor(post.authorAvatar)} flex items-center justify-center text-white font-semibold text-sm`}
              >
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium">{post.author}</p>
                <p className="text-xs text-muted-foreground">Urban Safai</p>
              </div>
            </div>

            {/* Article content */}
            <ArticleContent content={post.content} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  return (
    <section id="blog" className="py-16 md:py-24 bg-base">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-sm font-semibold text-emerald-400 tracking-wider uppercase mb-3">Blog</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            <span className="text-emerald-400">Cleaning Tips</span> &amp; Blog
          </h2>
          <p className="text-muted-foreground mt-3 text-lg max-w-2xl mx-auto">
            Expert advice and practical tips for a cleaner, healthier home
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogPosts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              onSelect={setSelectedPost}
            />
          ))}
        </div>
      </div>

      {/* Article Dialog */}
      <ArticleDialog
        post={selectedPost}
        open={!!selectedPost}
        onClose={() => setSelectedPost(null)}
      />
    </section>
  )
}
