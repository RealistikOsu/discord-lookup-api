const DISCORD_EPOCH_START = 1420070400000; // first second of 2015 in milliseconds

export const isValidSnowflake = (snowflake: number): boolean => {
    const snowflakeTime = (snowflake >> 22) + DISCORD_EPOCH_START;

    return snowflakeTime > DISCORD_EPOCH_START && snowflakeTime < Date.now();
}

export const getDateFromSnowflake = (snowflake: number): Date => {
    const snowflakeTime = (snowflake >> 22) + DISCORD_EPOCH_START;
    return new Date(snowflakeTime);
}