import { cleanEnv, num, str } from 'envalid';

const env = cleanEnv(process.env, {
	PORT: num(),
	MONGODB_URI: str(),
});

export default env;
