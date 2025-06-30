export abstract class CacheProvider {
  abstract get<T>(key: string): Promise<T | null>;

  abstract set<T>(key: string, value: T, ttlInSeconds?: number): Promise<void>;

  abstract has(key: string): Promise<boolean>;

  abstract delete(key: string): Promise<void>;

  abstract clear(): Promise<void>;
}
