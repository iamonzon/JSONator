#!/usr/bin/env node
/**
 * Smart file parser — detects format and outputs JSON.
 *
 * Supports:
 *   - Plain .json files (passed through)
 *   - Redis hset/set command files (parsed to JSON object)
 *
 * Usage: cat somefile | node parse-file.mjs > output.json
 */
import { readFileSync } from 'fs'

const input = readFileSync('/dev/stdin', 'utf-8')

// Try plain JSON first
try {
  JSON.parse(input)
  // Valid JSON — pass through as-is
  process.stdout.write(input)
  process.exit(0)
} catch {
  // Not valid JSON — try parsing as Redis commands
}

// Parse Redis hset/set commands
const entries = {}
for (const line of input.split('\n')) {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith('#')) continue

  // HSET <hash> <field> '<json>'
  let match = trimmed.match(/^hset\s+\S+\s+(\S+)\s+'(.*)'$/i)
  if (match) {
    const raw = match[2].replace(/\\'/g, "'")
    try { entries[match[1]] = JSON.parse(raw) } catch { entries[match[1]] = raw }
    continue
  }

  // SET <key> '<json>'
  match = trimmed.match(/^set\s+(\S+)\s+'(.*)'$/i)
  if (match) {
    const raw = match[2].replace(/\\'/g, "'")
    try { entries[match[1]] = JSON.parse(raw) } catch { entries[match[1]] = raw }
    continue
  }
}

process.stdout.write(JSON.stringify(entries, null, 2))
