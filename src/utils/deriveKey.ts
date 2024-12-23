async function deriveKey(username: string, password: string, salt: string) {
  const combinedCredentials = btoa(`${username}:${password}`)

  const PBKDF2_ITERATIONS = 100_000
  const DERIVED_KEY_LENGTH = 256

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      hash: 'SHA-256',
      salt: new TextEncoder().encode(salt),
      iterations: PBKDF2_ITERATIONS,
    },
    await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(combinedCredentials),
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
    ),
    {
      name: 'AES-GCM',
      length: DERIVED_KEY_LENGTH,
    },
    true,
    ['encrypt', 'decrypt']
  )
}

export default deriveKey
