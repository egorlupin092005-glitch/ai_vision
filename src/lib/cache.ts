import { Redis } from "@upstash/redis";

const redis = process.env.UPSTASH_REDIS_REST_URL
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
    })
  : null;

export async function getCached<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds: number = 3600
): Promise<T> {
  if (!redis) {
    return fetcher();
  }

  const cached = await redis.get<T>(key);
  if (cached !== null) {
    return cached;
  }

  const data = await fetcher();
  await redis.setex(key, ttlSeconds, data);
  return data;
}

export async function invalidateCache(key: string): Promise<void> {
  if (!redis) return;
  await redis.del(key);
}
