export async function encryptDeterministic(key: CryptoKey, plaintext: string) {
  const iv = new Uint8Array(12) // Fixed IV (e.g., all zeros)
  const encoded = new TextEncoder().encode(plaintext)
  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv },
    key,
    encoded
  )
  return btoa(String.fromCharCode(...new Uint8Array(ciphertext)))
}

export async function encryptData(key: CryptoKey, plaintext: string) {
  const iv = crypto.getRandomValues(new Uint8Array(12)) // Initialization Vector
  const encoded = new TextEncoder().encode(plaintext)
  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv },
    key,
    encoded
  )
  return {
    ciphertext: btoa(String.fromCharCode(...new Uint8Array(ciphertext))),
    iv: btoa(String.fromCharCode(...iv)),
  }
}

export async function decryptData(
  key: CryptoKey,
  ciphertext: string,
  iv: string = btoa(String.fromCharCode(...new Uint8Array(12)))
) {
  const cipherBuffer = Uint8Array.from(atob(ciphertext), (c) => c.charCodeAt(0))
  const ivBuffer = Uint8Array.from(atob(iv), (c) => c.charCodeAt(0))
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: ivBuffer },
    key,
    cipherBuffer
  )
  return new TextDecoder().decode(decrypted)
}
