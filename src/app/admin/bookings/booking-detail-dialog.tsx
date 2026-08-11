'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import type { BookingItem } from '@/lib/types'
import { toast } from 'sonner'

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

interface BookingDetailDialogProps {
  booking: Booking | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onStatusChange: () => void
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

export function BookingDetailDialog({
  booking,
  open,
  onOpenChange,
  onStatusChange,
}: BookingDetailDialogProps) {
  const [updatingStatus, setUpdatingStatus] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(booking?.status || 'pending')

  if (!booking) return null

  let serviceItems: BookingItem[] = []
  try {
    serviceItems = JSON.parse(booking.services) as BookingItem[]
  } catch {
    // ignore parse error
  }

  const currentStatus = statusConfig[booking.status] || statusConfig.pending
  const createdDate = new Date(booking.createdAt).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  const handleStatusUpdate = async () => {
    if (selectedStatus === booking.status) return
    setUpdatingStatus(true)
    try {
      const res = await fetch(`/api/bookings/${booking.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: selectedStatus }),
      })
      if (res.ok) {
        toast.success('Status updated successfully')
        onStatusChange()
        onOpenChange(false)
      } else {
        const data = await res.json()
        toast.error(data.error || 'Failed to update status')
      }
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setUpdatingStatus(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#111111] border-white/10 text-white sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-lg">Booking Details</DialogTitle>
          <DialogDescription className="text-gray-400">
            Booking ID: {booking.id}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-2">
          {/* Status Section */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-lg bg-white/5">
            <div className="flex items-center gap-3 flex-1">
              <span className="text-sm text-gray-400">Status:</span>
              <Badge className={currentStatus.className}>{currentStatus.label}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[150px] bg-white/5 border-white/10 text-white text-sm">
                  <SelectValue placeholder="Change status" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-white/10">
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Button
                size="sm"
                onClick={handleStatusUpdate}
                disabled={updatingStatus || selectedStatus === booking.status}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs cursor-pointer"
              >
                {updatingStatus ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  'Update'
                )}
              </Button>
            </div>
          </div>

          {/* Customer Info */}
          <div>
            <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-3">
              Customer Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InfoItem label="Name" value={booking.name} />
              <InfoItem label="Phone" value={booking.phone} />
              <InfoItem label="Email" value={booking.email || 'N/A'} />
              <InfoItem
                label="Booked At"
                value={createdDate}
              />
            </div>
          </div>

          {/* Service Details */}
          <div>
            <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-3">
              Service Details
            </h3>
            {serviceItems.length > 0 ? (
              <div className="rounded-lg border border-white/10 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="text-left px-4 py-2.5 text-gray-400 font-medium">
                        Service
                      </th>
                      <th className="text-center px-4 py-2.5 text-gray-400 font-medium">
                        Qty
                      </th>
                      <th className="text-right px-4 py-2.5 text-gray-400 font-medium">
                        Price
                      </th>
                      <th className="text-right px-4 py-2.5 text-gray-400 font-medium">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {serviceItems.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-2.5 text-white">
                          {item.serviceName}
                        </td>
                        <td className="px-4 py-2.5 text-center text-gray-300">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-2.5 text-right text-gray-300">
                          {item.price}
                        </td>
                        <td className="px-4 py-2.5 text-right text-emerald-400 font-medium">
                          {item.subtotal}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-emerald-500/5">
                      <td
                        colSpan={3}
                        className="px-4 py-2.5 text-right text-white font-semibold"
                      >
                        Total
                      </td>
                      <td className="px-4 py-2.5 text-right text-emerald-400 font-bold text-base">
                        {booking.totalPrice}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                Could not parse service details.
              </p>
            )}
          </div>

          {/* Scheduling & Address */}
          <div>
            <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-3">
              Scheduling & Location
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InfoItem label="Date" value={booking.date} />
              <InfoItem label="Time" value={booking.time} />
              <div className="sm:col-span-2">
                <InfoItem label="Address" value={booking.address} />
              </div>
            </div>
          </div>

          {/* Message */}
          {booking.message && (
            <div>
              <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-3">
                Customer Message
              </h3>
              <div className="p-3 rounded-lg bg-white/5 text-gray-300 text-sm">
                {booking.message}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-lg bg-white/5">
      <p className="text-xs text-gray-500 mb-0.5">{label}</p>
      <p className="text-sm text-white font-medium break-words">{value}</p>
    </div>
  )
}
