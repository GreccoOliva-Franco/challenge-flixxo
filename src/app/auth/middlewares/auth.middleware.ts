import passport from 'passport';

import { bearerStrategy } from '../strategies/auth-jwt.strategy';

passport.use('jwt', bearerStrategy);

export class AuthMiddleware {
	static bearer() {
		return passport.authenticate('jwt', { session: false });
	}
}
