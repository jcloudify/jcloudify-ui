export interface CacheObject<T> {
  cache: (obj: T) => T;
  get: () => T | null;
  invalidate: () => void;
  isPresent: () => boolean;
}

const createObjectCacher = <T>(key: string, storageFactory: () => Storage) => {
  const storage = storageFactory();
  return {
    cache: (obj: T) => {
      storage.set(key, JSON.stringify(obj));
      return obj;
    },
    get: () => {
      const obj = storage.getItem(key);
      if (!obj) return null;
      return JSON.parse(obj) as T;
    },
    invalidate: () => {
      storage.removeItem(key);
    },
    isPresent: () => storage.getItem(key) != null,
  };
};

const inLocalStorage = <T>(key: string) =>
  createObjectCacher<T>(key, () => localStorage);

export const authTokenCache = inLocalStorage<{
  accessToken: string;
  refreshToken: string;
}>("auth_tokens");
export const whoamiCache = inLocalStorage<{user?: any}>("whoami");

export const clearCaches = () => {
  localStorage.clear();
  sessionStorage.clear();
};
