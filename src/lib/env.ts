import { cleanEnv, num, str } from 'envalid';

const env = cleanEnv(process.env, {
	PORT: num(),
	MONGODB_URI: str(),
	SESSION_SECRET: str(),
	CLIENT_DOMAIN: str(),
});

export default env;
