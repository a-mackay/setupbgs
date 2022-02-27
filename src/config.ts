interface Config {
    // The base URL for all route locations. If null, all routes are served from
    // "/".
    baseName: string | null;
}

export function configFromEnv(): Config {
    const env = process.env.NODE_ENV;
    if (env === "production") {
        return {
            baseName: "/setupbgs",
        }
    } else if (env === "development") {
        return {
            baseName: null,
        }
    } else if (env === "test") {
        return {
            baseName: null,
        }
    } else {
        throw Error(`Unknown NODE_ENV: '${env}'`);
    }
}