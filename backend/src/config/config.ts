import "dotenv/config";

const { PORT, MONGO_URL, NODE_ENV, CLIENT_URL } = process.env;

interface CorsConfig {
  CLIENT_URL: string;
  ALLOWED_HEADERS: string[];
  ALLOWED_METHODS: string[];
  CREDENTIALS: boolean;
}

interface Config {
  PORT: number;
  DATABASE_URL: string;
  ENVIRONMENT: string;
  CORS: CorsConfig;
}

export const config: Config = {
  PORT: parseInt(PORT || "4000", 10),
  DATABASE_URL: MONGO_URL as string,
  ENVIRONMENT: NODE_ENV as string,
  CORS: {
    CLIENT_URL: (CLIENT_URL as string) || "http://localhost:5173",
    ALLOWED_HEADERS: ["Content-type", "Authorization"],
    ALLOWED_METHODS: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    CREDENTIALS: true,
  },
};
