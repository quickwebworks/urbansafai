const path = require('path')
const fs = require('fs')

// ─── Step 1: Load .env file manually ─────────────────────────────────────
// Works on Hostinger where env vars may not pass through to the Node process

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

// Log critical env vars (masked) for debugging
const secretMask = (v) => v ? '***set***' : '***MISSING***'
console.log('[server.js] Env check:', {
  DATABASE_URL: secretMask(process.env.DATABASE_URL),
  NEXTAUTH_SECRET: secretMask(process.env.NEXTAUTH_SECRET),
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || '***MISSING***',
  NODE_ENV: process.env.NODE_ENV,
})

// ─── Step 2: Ensure Prisma generated client exists in standalone ──────────
// When Next.js builds with output: 'standalone', Prisma's generated files
// may not be included. This copies them if missing.

const standaloneDir = path.join(__dirname, '.next', 'standalone')
const standalonePrismaDir = path.join(standaloneDir, 'node_modules', '.prisma')
const standalonePrismaClientDir = path.join(standaloneDir, 'node_modules', '@prisma')
const srcPrismaDir = path.join(__dirname, 'node_modules', '.prisma')
const srcPrismaClientDir = path.join(__dirname, 'node_modules', '@prisma')

function copyDirSync(src, dest) {
  if (!fs.existsSync(src)) return false
  fs.mkdirSync(dest, { recursive: true })
  const entries = fs.readdirSync(src, { withFileTypes: true })
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
  return true
}

if (fs.existsSync(standaloneDir)) {
  // Copy .prisma/client (generated query engine)
  if (!fs.existsSync(standalonePrismaDir) && fs.existsSync(srcPrismaDir)) {
    console.log('[server.js] Copying .prisma into standalone output...')
    copyDirSync(srcPrismaDir, standalonePrismaDir)
  }
  // Copy @prisma/client (wrapper)
  if (!fs.existsSync(standalonePrismaClientDir) && fs.existsSync(srcPrismaClientDir)) {
    console.log('[server.js] Copying @prisma/client into standalone output...')
    copyDirSync(srcPrismaClientDir, standalonePrismaClientDir)
  }
}

// ─── Step 3: Copy public assets into standalone ────────────────────────────
// Next.js standalone does not include public/ or static assets

const standalonePublicDir = path.join(standaloneDir, 'public')
const srcPublicDir = path.join(__dirname, 'public')
if (fs.existsSync(standaloneDir) && !fs.existsSync(standalonePublicDir) && fs.existsSync(srcPublicDir)) {
  console.log('[server.js] Copying public/ into standalone output...')
  copyDirSync(srcPublicDir, standalonePublicDir)
}

// Copy static assets (.next/static)
const standaloneStaticDir = path.join(standaloneDir, '.next', 'static')
const srcStaticDir = path.join(__dirname, '.next', 'static')
if (fs.existsSync(standaloneDir) && !fs.existsSync(standaloneStaticDir) && fs.existsSync(srcStaticDir)) {
  console.log('[server.js] Copying .next/static into standalone output...')
  copyDirSync(srcStaticDir, standaloneStaticDir)
}

// ─── Step 4: Start the Next.js server ────────────────────────────────────

console.log('[server.js] Starting Next.js server...')

const standaloneServer = path.join(standaloneDir, 'server.js')

if (fs.existsSync(standaloneServer)) {
  try {
    require(standaloneServer)
  } catch (err) {
    console.error('[server.js] Failed to start standalone server:', err.message)
    console.error(err.stack)
    process.exit(1)
  }
} else {
  console.error('[server.js] Standalone server not found at:', standaloneServer)
  console.error('[server.js] Did you run "npm run build" before "npm start"?')
  process.exit(1)
}
