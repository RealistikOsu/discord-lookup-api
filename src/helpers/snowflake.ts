const DISCORD_EPOCH_START = 1420070400000n; // first second of 2015 in milliseconds

export const isValidSnowflake = (snowflake: bigint): boolean => {
    const snowflakeTime = (snowflake >> 22n) + DISCORD_EPOCH_START;

    return snowflakeTime > DISCORD_EPOCH_START && snowflakeTime < Date.now();
}

export const getDateFromSnowflake = (snowflake: bigint): Date => {
    const snowflakeTime = (snowflake >> 22n) + DISCORD_EPOCH_START;
    const snowflakeTimeSeconds = Number(snowflakeTime / 1000n);
    return new Date(snowflakeTimeSeconds);
}