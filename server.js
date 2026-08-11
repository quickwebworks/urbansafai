const path = require('path')
const fs = require('fs')

// Load .env file manually (works on Hostinger where env vars may not pass through)
const envPaths = [
  path.join(process.cwd(), '.env'),
  path.join(process.cwd(), '.env.local'),
  path.join(__dirname, '.env'),
  path.join(__dirname, '.env.local'),
]

for (const envPath of envPaths) {
  if (fs.existsSync(envPath)) {
    console.log('[server.js] Loading env from: ' + envPath)
    const content = fs.readFileSync(envPath, 'utf-8')
    for (const line of content.split('\n')) {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith('#')) {
        const eqIdx = trimmed.indexOf('=')
        if (eqIdx > 0) {
          const key = trimmed.slice(0, eqIdx).trim()
          let value = trimmed.slice(eqIdx + 1).trim()
          if ((value.startsWith('"') && value.endsWith('"')) ||
              (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1)
          }
          if (!process.env[key]) {
            process.env[key] = value
          }
        }
      }
    }
  }
}

process.env.NODE_ENV = process.env.NODE_ENV || 'production'

console.log('[server.js] Starting Next.js server...')

try {
  require('./.next/standalone/server.js')
} catch (err) {
  console.error('[server.js] Failed to start server:', err.message)
  process.exit(1)
}
