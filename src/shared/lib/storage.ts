const isClient = typeof window !== "undefined";

export function getStorageItem<T extends string>(key: string, fallback: T): T {
  if (!isClient) return fallback;
  return (localStorage.getItem(key) as T | null) ?? fallback;
}

export function setStorageItem(key: string, value: string) {
  if (!isClient) return;
  localStorage.setItem(key, value);
}

export function removeStorageItem(key: string) {
  if (!isClient) return;
  localStorage.removeItem(key);
}
