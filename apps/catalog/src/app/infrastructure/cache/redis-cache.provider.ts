import Redis from 'ioredis';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { createServiceLogger } from '@allu-shop/database';
import { CacheProvider } from './cache.provider';

@Injectable()
export class RedisCacheProvider
  extends CacheProvider
  implements OnModuleInit, OnModuleDestroy
{
  private redis: Redis;
  private readonly logger = createServiceLogger('RedisCacheProvider');

  async onModuleInit() {
    try {
      this.redis = new Redis({
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
        maxRetriesPerRequest: 3,
        lazyConnect: true,
      });

      await this.redis.connect();

      this.logger.info('Redis cache provider connected successfully');
    } catch (error) {
      this.logger.error('Failed to connect to Redis:', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    if (this.redis) {
      await this.redis.disconnect();
      this.logger.info('Redis cache provider disconnected');
    }
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this.redis.get(key);
      if (value === null) {
        this.logger.debug(`Cache miss for key: ${key}`);
        return null;
      }

      this.logger.debug(`Cache hit for key: ${key}`);
      return JSON.parse(value) as T;
    } catch (error) {
      this.logger.error(`Error getting cache key ${key}:`, error);
      return null;
    }
  }

  async set<T>(key: string, value: T, ttlInSeconds?: number): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);

      if (ttlInSeconds) {
        await this.redis.setex(key, ttlInSeconds, serializedValue);
        this.logger.debug(`Cached key: ${key} with TTL: ${ttlInSeconds}s`);
      } else {
        await this.redis.set(key, serializedValue);
        this.logger.debug(`Cached key: ${key} (no TTL)`);
      }
    } catch (error) {
      this.logger.error(`Error setting cache key ${key}:`, error);
      throw error;
    }
  }

  async has(key: string): Promise<boolean> {
    try {
      const exists = await this.redis.exists(key);
      const hasKey = exists === 1;
      this.logger.debug(`Key existence check for ${key}: ${hasKey}`);
      return hasKey;
    } catch (error) {
      this.logger.error(`Error checking cache key ${key}:`, error);
      return false;
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.redis.del(key);
      this.logger.debug(`Deleted cache key: ${key}`);
    } catch (error) {
      this.logger.error(`Error deleting cache key ${key}:`, error);
      throw error;
    }
  }

  async clear(): Promise<void> {
    try {
      await this.redis.flushall();
      this.logger.info('Cleared all cache');
    } catch (error) {
      this.logger.error('Error clearing cache:', error);
      throw error;
    }
  }
}
