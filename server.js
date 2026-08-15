const path = require('path')
const fs = require('fs')

// ─── Step 1: Load .env file manually ─────────────────────────────────────

const envPaths = [
  path.join(process.cwd(), '.env'),
  path.join(process.cwd(), '.env.local'),
  path.join(__dirname, '.env'),
  path.join(__dirname, '.env.local'),
]

for (const p of envPaths) {
  if (fs.existsSync(p)) {
    console.log('[server.js] Loading env from: ' + p)
    for (const line of fs.readFileSync(p, 'utf-8').split('\n')) {
      const t = line.trim()
      if (t && !t.startsWith('#')) {
        const eq = t.indexOf('=')
        if (eq > 0) {
          const key = t.slice(0, eq).trim()
          let val = t.slice(eq + 1).trim()
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1)
          if (!process.env[key]) process.env[key] = val
        }
      }
    }
  }
}

process.env.NODE_ENV = process.env.NODE_ENV || 'production'

// ─── Step 2: Copy missing files into standalone output ─────────────────────

const sa = path.join(__dirname, '.next', 'standalone')

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return
  fs.mkdirSync(dest, { recursive: true })
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dest, e.name)
    e.isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d)
  }
}

if (fs.existsSync(sa)) {
  // Prisma generated client
  if (!fs.existsSync(path.join(sa, 'node_modules', '.prisma')))
    copyDir(path.join(__dirname, 'node_modules', '.prisma'), path.join(sa, 'node_modules', '.prisma'))
  if (!fs.existsSync(path.join(sa, 'node_modules', '@prisma')))
    copyDir(path.join(__dirname, 'node_modules', '@prisma'), path.join(sa, 'node_modules', '@prisma'))
  // Public assets
  if (!fs.existsSync(path.join(sa, 'public')))
    copyDir(path.join(__dirname, 'public'), path.join(sa, 'public'))
  // Static files
  if (!fs.existsSync(path.join(sa, '.next', 'static')))
    copyDir(path.join(__dirname, '.next', 'static'), path.join(sa, '.next', 'static'))
}

// ─── Step 3: Log startup info ──────────────────────────────────────────────

const PORT = process.env.PORT || 3000
const HOST = process.env.HOSTNAME || '0.0.0.0'
const secret = (v) => v ? '***set***' : '***MISSING***'
console.log(`[server.js] Port=${PORT} Host=${HOST} Env=${process.env.NODE_ENV}`)
console.log('[server.js] Vars:', {
  DATABASE_URL: secret(process.env.DATABASE_URL),
  NEXTAUTH_SECRET: secret(process.env.NEXTAUTH_SECRET),
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || '***MISSING***',
  RESEND_API_KEY: secret(process.env.RESEND_API_KEY),
})

// ─── Step 4: Start ──────────────────────────────────────────────────────────

const serverPath = path.join(sa, 'server.js')
if (!fs.existsSync(serverPath)) {
  console.error('[server.js] ERROR: standalone server not found at', serverPath)
  console.error('[server.js] Did you run "npm run build" before "npm start"?')
  process.exit(1)
}

process.env.PORT = PORT
process.env.HOSTNAME = HOST

console.log('[server.js] Starting Next.js...')
try { require(serverPath) }
catch (err) { console.error('[server.js] FATAL:', err.message, err.stack); process.exit(1) }
