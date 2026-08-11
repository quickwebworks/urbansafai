import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

// Ensure NEXTAUTH_SECRET is available
if (!process.env.NEXTAUTH_SECRET) {
  process.env.NEXTAUTH_SECRET = 'fallback-secret-change-in-production'
}
if (!process.env.NEXTAUTH_URL) {
  process.env.NEXTAUTH_URL = process.env.VERCEL_URL || 'https://urbansafai.in'
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
