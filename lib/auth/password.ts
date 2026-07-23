/**
   * Zero-dependency password hashing using native WebCrypto API (SHA-256 with salt)
   * Works in Node.js and Next.js Edge Runtime without external npm packages like bcrypt.
   */

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('')
  
  const data = encoder.encode(password + saltHex)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

  return `${saltHex}:${hashHex}`
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  try {
    const [saltHex, originalHashHex] = storedHash.split(":")
    if (!saltHex || !originalHashHex) return false

    const encoder = new TextEncoder()
    const data = encoder.encode(password + saltHex)
    const hashBuffer = await crypto.subtle.digest("SHA-256", data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const computedHashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

    return computedHashHex === originalHashHex
  } catch (e) {
    return false
  }
}
