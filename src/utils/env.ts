import * as envvars from 'env-var';
import * as dotenv from 'dotenv';

// Read in the .env file if exists
dotenv.config();

export default {
  app: {
    port: envvars.get('PORT').required().asPortNumber(),
    jwtSecret: envvars.get('JWT_TOKEN').required().asString(),
  },
  db: {
    url: envvars.get('DB_URL').required().asString(),
    
  }
}
