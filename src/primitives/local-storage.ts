import { createCache, dirty, dirtyAll, track } from "../utils/cache";

const LOCAL_STORAGE_KEYS = Symbol("localStorageKeys");

class LocalStorage implements Storage {
  private readonly signalsCache = createCache();
  private readonly valuesCache: Map<string, any>;

  [name: string]: any
  length: number;

  constructor() {
    // populate the cache with the values from localStorage
    this.valuesCache = new Map<string, any>(LocalStorage.values);
    this.length = window.localStorage.length;
  }

  /**
   * Helper method to retrieve all values from localStorage
   */
  private static get values() {
    const s: [string, any][] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) break;
      const value = localStorage.getItem(key);
      s.push([key, value]);
    }
    return s;
  }

  key(index: number): string | null {
    const key = this.storage.key(index);
    track(LOCAL_STORAGE_KEYS, this.signalsCache);
    return key;
  }

  clear() {
    this.valuesCache.clear();
    this.storage.clear();
    dirtyAll(this.signalsCache);
    dirty(LOCAL_STORAGE_KEYS, this.signalsCache);
  }

  getItem(key: string) {
    return this.valuesCache.get(key);
  }

  setItem(key: string, value: any) {
    this.valuesCache.set(key, value);
    this.storage.setItem(key, value);
  }

  removeItem(key: string) {
    this.valuesCache.delete(key);
    this.storage.removeItem(key);
  }
}

Object.setPrototypeOf(LocalStorage.prototype, localStorage.prototype);

export function createLocalStorage() {
  return new LocalStorage();
}
