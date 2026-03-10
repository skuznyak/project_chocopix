export const readStorage = <T>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') {
    return fallback
  }

  try {
    const rawValue = window.localStorage.getItem(key)

    if (!rawValue) {
      return fallback
    }

    return JSON.parse(rawValue) as T
  } catch {
    window.localStorage.removeItem(key)
    return fallback
  }
}

export const writeStorage = (key: string, value: unknown) => {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Ignore quota and serialization issues to avoid breaking UI state updates.
  }
}
