import { Strategy, IStrategyOptions } from 'passport-local';

import authService from '../auth.service';

const options: IStrategyOptions = {
	usernameField: 'username',
	passwordField: 'password',
}

const verify: VerifyFunctionWithRequest = async (req, username, password, done) => {
	try {
		const user = await authService.validateUser(username, password);
		if (!user) return done(null, false);

		return done(null, user);
	} catch (err) {
		return done(err, false);
	}
};

export const LocalStrategy = new Strategy(options, verify);
