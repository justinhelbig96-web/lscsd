import { Redis } from "@upstash/redis";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const ONLINE_KEY = "lscsd:online";
const VISITORS_KEY = "lscsd:visitors";
const ONLINE_WINDOW_MS = 60_000;
const validId = /^[a-zA-Z0-9-]{16,80}$/;

export default async function handler(request: VercelRequest, response: VercelResponse) {
  response.setHeader("Cache-Control", "no-store, max-age=0");

  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  const { sessionId, visitorId } = request.body ?? {};
  if (!validId.test(sessionId) || !validId.test(visitorId)) {
    return response.status(400).json({ error: "Invalid visitor data" });
  }

  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return response.status(503).json({ error: "Viewer counter is not configured" });
  }

  try {
    const redis = Redis.fromEnv();
    const now = Date.now();
    await redis.zadd(ONLINE_KEY, { score: now, member: sessionId });
    await redis.zremrangebyscore(ONLINE_KEY, 0, now - ONLINE_WINDOW_MS);
    await redis.sadd(VISITORS_KEY, visitorId);
    const [online, total] = await Promise.all([
      redis.zcard(ONLINE_KEY),
      redis.scard(VISITORS_KEY),
    ]);

    return response.status(200).json({ online, total });
  } catch {
    return response.status(500).json({ error: "Viewer counter unavailable" });
  }
}
