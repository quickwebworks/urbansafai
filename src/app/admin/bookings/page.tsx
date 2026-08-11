'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import {
  LogOut,
  Download,
  RefreshCw,
  Eye,
  Loader2,
  Inbox,
  ArrowLeft,
  Trash2,
} from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'
import { BookingDetailDialog } from './booking-detail-dialog'
import type { BookingItem } from '@/lib/types'

interface Booking {
  id: string
  name: string
  phone: string
  email: string | null
  services: string
  date: string
  time: string
  address: string
  message: string | null
  totalPrice: string
  status: string
  createdAt: string
  updatedAt: string
}

const statusConfig: Record<
  string,
  { label: string; className: string }
> = {
  pending: {
    label: 'Pending',
    className: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  },
  confirmed: {
    label: 'Confirmed',
    className: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  },
  completed: {
    label: 'Completed',
    className: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-red-500/15 text-red-400 border-red-500/20',
  },
}

const statusActions: { value: string; label: string; className: string }[] = [
  { value: 'confirmed', label: 'Confirm', className: 'hover:bg-blue-500/20 text-blue-400' },
  { value: 'completed', label: 'Complete', className: 'hover:bg-emerald-500/20 text-emerald-400' },
  { value: 'cancelled', label: 'Cancel', className: 'hover:bg-red-500/20 text-red-400' },
]

type FilterStatus = 'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'

export default function AdminBookingsPage() {
  const { data: session, status: authStatus } = useSession()
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all')
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Booking | null>(null)
  const [detailBooking, setDetailBooking] = useState<Booking | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  // Redirect if not authenticated
  useEffect(() => {
    if (authStatus === 'unauthenticated') {
      router.push('/admin')
    }
  }, [authStatus, router])

  const fetchBookings = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/bookings')
      if (res.status === 401) {
        router.push('/admin')
        return
      }
      const data = await res.json()
      setBookings(data.bookings || [])
    } catch {
      toast.error('Failed to fetch bookings')
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    if (authStatus === 'authenticated') {
      fetchBookings()
    }
  }, [authStatus, fetchBookings])

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id)
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        toast.success(`Booking status updated to ${newStatus}`)
        fetchBookings()
      } else {
        const data = await res.json()
        toast.error(data.error || 'Failed to update status')
      }
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setUpdatingId(null)
    }
  }

  const openDetail = (booking: Booking) => {
    setDetailBooking(booking)
    setDetailOpen(true)
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    try {
      const res = await fetch(`/api/bookings/${deleteTarget.id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        toast.success('Booking deleted successfully')
        fetchBookings()
      } else {
        const data = await res.json()
        toast.error(data.error || 'Failed to delete booking')
      }
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setDeleteTarget(null)
    }
  }

  // Loading / Auth check
  if (authStatus === 'loading' || authStatus === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-emerald-400" />
      </div>
    )
  }

  // Filter bookings
  const filteredBookings =
    filterStatus === 'all'
      ? bookings
      : bookings.filter((b) => b.status === filterStatus)

  const parseServiceNames = (servicesStr: string): string => {
    try {
      const items: BookingItem[] = JSON.parse(servicesStr)
      return items.map((i) => i.serviceName).join(', ')
    } catch {
      return servicesStr
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-md px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => router.push('/')}
              className="text-gray-400 hover:text-white transition-colors shrink-0"
              aria-label="Back to home"
            >
              <ArrowLeft className="size-5" />
            </button>
            <div className="min-w-0">
              <h1 className="text-white font-bold text-base sm:text-lg truncate">
                Bookings Dashboard
              </h1>
              {!loading && (
                <p className="text-gray-500 text-xs">
                  {bookings.length} total booking{bookings.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={fetchBookings}
              disabled={loading}
              className="text-gray-400 hover:text-white hover:bg-white/5"
            >
              <RefreshCw className={`size-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline ml-1.5">Refresh</span>
            </Button>
            <a href="/api/bookings?format=csv" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white hover:bg-white/5"
              >
                <Download className="size-4" />
                <span className="hidden sm:inline ml-1.5">Export CSV</span>
              </Button>
            </a>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => signOut({ callbackUrl: '/admin' })}
              className="text-gray-400 hover:text-red-400 hover:bg-red-500/5"
            >
              <LogOut className="size-4" />
              <span className="hidden sm:inline ml-1.5">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-4 sm:px-6 sm:py-6">
        {/* Filter Bar */}
        <div className="mb-4 flex items-center gap-3">
          <span className="text-sm text-gray-400 shrink-0">Filter:</span>
          <Select
            value={filterStatus}
            onValueChange={(val) => setFilterStatus(val as FilterStatus)}
          >
            <SelectTrigger className="w-[160px] bg-white/5 border-white/10 text-white text-sm">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1a] border-white/10">
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-xs text-gray-500">
            Showing {filteredBookings.length} of {bookings.length}
          </span>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="rounded-lg border border-white/5 bg-white/[0.02] p-4"
              >
                <div className="flex items-center gap-4">
                  <Skeleton className="h-4 w-8 bg-white/5" />
                  <Skeleton className="h-4 w-32 bg-white/5" />
                  <Skeleton className="h-4 w-24 bg-white/5" />
                  <Skeleton className="h-4 w-40 bg-white/5" />
                  <Skeleton className="h-4 w-20 bg-white/5" />
                  <Skeleton className="h-5 w-16 bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredBookings.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <Inbox className="size-8 text-gray-600" />
            </div>
            <h3 className="text-white font-medium text-lg mb-1">
              No bookings yet
            </h3>
            <p className="text-gray-500 text-sm max-w-sm">
              {filterStatus !== 'all'
                ? `No bookings with "${filterStatus}" status found.`
                : 'Bookings placed through the website will appear here.'}
            </p>
          </div>
        )}

        {/* Bookings Table */}
        {!loading && filteredBookings.length > 0 && (
          <div className="rounded-xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/[0.03] border-b border-white/10">
                    <th className="text-left px-4 py-3 text-gray-400 font-medium text-xs uppercase tracking-wider whitespace-nowrap">
                      #
                    </th>
                    <th className="text-left px-4 py-3 text-gray-400 font-medium text-xs uppercase tracking-wider whitespace-nowrap">
                      Customer Name
                    </th>
                    <th className="text-left px-4 py-3 text-gray-400 font-medium text-xs uppercase tracking-wider whitespace-nowrap">
                      Phone
                    </th>
                    <th className="text-left px-4 py-3 text-gray-400 font-medium text-xs uppercase tracking-wider whitespace-nowrap min-w-[200px]">
                      Services
                    </th>
                    <th className="text-left px-4 py-3 text-gray-400 font-medium text-xs uppercase tracking-wider whitespace-nowrap">
                      Date & Time
                    </th>
                    <th className="text-right px-4 py-3 text-gray-400 font-medium text-xs uppercase tracking-wider whitespace-nowrap">
                      Total Price
                    </th>
                    <th className="text-center px-4 py-3 text-gray-400 font-medium text-xs uppercase tracking-wider whitespace-nowrap">
                      Status
                    </th>
                    <th className="text-right px-4 py-3 text-gray-400 font-medium text-xs uppercase tracking-wider whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredBookings.map((booking, idx) => {
                    const cfg = statusConfig[booking.status] || statusConfig.pending
                    return (
                      <tr
                        key={booking.id}
                        className="hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-4 py-3 text-gray-500 text-xs">
                          {idx + 1}
                        </td>
                        <td className="px-4 py-3 text-white font-medium whitespace-nowrap">
                          {booking.name}
                        </td>
                        <td className="px-4 py-3 text-gray-300 whitespace-nowrap">
                          {booking.phone}
                        </td>
                        <td className="px-4 py-3 text-gray-400 max-w-[250px] truncate">
                          {parseServiceNames(booking.services)}
                        </td>
                        <td className="px-4 py-3 text-gray-300 whitespace-nowrap">
                          <div className="text-xs">
                            <span className="text-gray-300">{booking.date}</span>
                            <span className="text-gray-600 mx-1.5">·</span>
                            <span className="text-gray-400">{booking.time}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right text-emerald-400 font-semibold whitespace-nowrap">
                          {booking.totalPrice}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <Badge className={cfg.className}>{cfg.label}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => openDetail(booking)}
                              className="p-1.5 rounded-md hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                              title="View details"
                            >
                              <Eye className="size-3.5" />
                            </button>
                            {statusActions
                              .filter((a) => a.value !== booking.status)
                              .map((action) => (
                                <button
                                  key={action.value}
                                  onClick={() =>
                                    handleStatusChange(booking.id, action.value)
                                  }
                                  disabled={updatingId === booking.id}
                                  className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                                    action.className
                                  } disabled:opacity-50`}
                                  title={action.label}
                                >
                                  {updatingId === booking.id ? (
                                    <Loader2 className="size-3 animate-spin" />
                                  ) : (
                                    action.label
                                  )}
                                </button>
                              ))}
                            <button
                              onClick={() => setDeleteTarget(booking)}
                              className="p-1.5 rounded-md hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                              title="Delete booking"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent className="bg-[#1a1a1a] border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Booking</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to delete the booking for <span className="text-white font-medium">{deleteTarget?.name}</span>?<br />
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Booking Detail Dialog */}
      <BookingDetailDialog
        booking={detailBooking}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onStatusChange={fetchBookings}
      />
    </div>
  )
}
