import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

// Fail fast if NEXTAUTH_SECRET is not set — never use a fallback
if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('NEXTAUTH_SECRET environment variable is required')
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
