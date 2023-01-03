import { Strategy, StrategyOptions, ExtractJwt, VerifyCallback } from 'passport-jwt'

import userService from '../../users/user.service';

import authConfig from '../../../configs/auth';

const options: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: authConfig.jwt.tokens.access.secret,
};

const verify: VerifyCallback = async (payload, done) => {
	userService.findOneBy({ id: payload.userId })
		.then((user) => user ? done(null, user) : done(null, false))
		.catch((error) => done(error, false));
}

export const bearerStrategy = new Strategy(options, verify);
