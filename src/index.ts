import { getDateFromSnowflake, isValidSnowflake } from "discord-lookup-api/helpers/snowflake";

// automatically connects via process.env.REDIS_URL
import { redis } from "bun";
import { USER_CACHE_TIME, USER_FLAGS } from "./constants";

if (!process.env.APP_PORT) {
  throw new Error("APP_PORT is not defined");
}
if (!process.env.BOT_TOKEN) {
  throw new Error("BOT_TOKEN is not defined");
}

const server = Bun.serve({
  hostname: process.env.APP_HOST,
  port: Number(process.env.APP_PORT!),
  routes: {
    "/api/v1/user/:userId": async (request) => {
      const start = Bun.nanoseconds();
      const userId = BigInt(request.params.userId);

      if (isNaN(Number(userId)) || !isValidSnowflake(userId)) {
        return Response.json(
          {
            status: 400,
            message: "User ID is not a valid snowflake",
          },
          { status: 400 }
        );
      }

      const cachedData = await redis.get(`user:${userId}`);
      if (cachedData) {
        console.log(`Fetched user ID ${userId} from cache in ${(Bun.nanoseconds() - start) / 1_000_000}ms!`);
        return Response.json(JSON.parse(cachedData), { status: 200 });
      }

      const resp = await fetch(`https://discord.com/api/v10/users/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${process.env.BOT_TOKEN}`,
        },
      });

      // lol!
      const data: any = await resp.json();

      if (data.message) {
        console.log(`Discord API error for user ID ${userId}: ${data.message}`);
        return Response.json(data, { status: resp.status });
      }

      let publicFlags: string[] = [];
      let premiumTypes: { [key: number]: string } = {
        0: "None",
        1: "Nitro Classic",
        2: "Nitro",
        3: "Nitro Basic",
      };

      USER_FLAGS.forEach((flag) => {
        if (data.public_flags & flag.bitwise) publicFlags.push(flag.flag);
      });

      let avatarLink = null;
      if (data.avatar)
        avatarLink = `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}`;

      let bannerLink = null;
      if (data.banner)
        bannerLink = `https://cdn.discordapp.com/banners/${data.id}/${data.banner}?size=480`;

      let userInfo = {
        id: data.id,
        created_at: getDateFromSnowflake(BigInt(data.id)),
        username: data.username,
        avatar: {
          id: data.avatar,
          link: avatarLink,
          is_animated: typeof data.avatar === 'string' && data.avatar.startsWith("a_"),
        },
        avatar_decoration: data.avatar_decoration_data,
        badges: publicFlags,
        premium_type: premiumTypes[data.premium_type as number],
        accent_color: data.accent_color,
        global_name: data.global_name,
        banner: {
          id: data.banner,
          link: bannerLink,
          is_animated: typeof data.banner === 'string' && data.banner.startsWith("a_"),
          color: data.banner_color,
        },
        raw: data,
      };

      await redis.set(`user:${userId}`, JSON.stringify(userInfo), "EX", USER_CACHE_TIME);
      console.log(`Fetched user ID ${userId} from Discord API in ${(Bun.nanoseconds() - start) / 1_000_000}ms!`);
      return Response.json(userInfo, { status: 200 });
    },
  },
});

console.log(`Discord Lookup API running on ${server.url}`);
