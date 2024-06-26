import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { getRepository } from 'typeorm';
import User from '../entities/user.entity';
import { checkPassword } from '../util/password';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import env from '../util/env';

export enum LOGIN_TYPE {
  NATIVE = 'Local',
  JWT = 'jwt'
};

passport.use(LOGIN_TYPE.NATIVE, new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {

  try {
    const model = getRepository(User);
    const user = await model.findOne({
      where: [{
        email: email
      }]
    });

    if (!user) {
      return done(null, false, {
        message: 'Not authorized',
      })
    }

    const isValidPassword = await checkPassword(password, user.password);
    if (!isValidPassword) {
      return done(null, false, {
        message: 'Not authorized',
      })
    }

    return done(null, user, {
      message: 'Succeded'
    });

  } catch (e) {
    done(e)
  }
}));

passport.use(new JWTStrategy({
  secretOrKey: env.app.jwtSecret,
  jwtFromRequest: ExtractJwt.fromHeader('x-token'),
}, async (token, done) => {
  try {
    const model = getRepository(User);
    const user = await model.findOne({ id: token.sub });

    if (user) {
      return done(null, user.toAPI());
    }

    return done(null, false);
  } catch (error) {
    return done(error);
  }
}))

export const authorize = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(LOGIN_TYPE.NATIVE, (error: any, user: User, info: any) => {
    if (error || !user) {
      res.status(401)
      return res.json(error || info);
    }

    req.user = user.toAPI();
    next()
  })(req, res, next);
};

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(LOGIN_TYPE.JWT, (error: any, user: User, info: any) => {
    const message = error?.message || info?.message || 'Invalid token';

    if (error || info || !user) {
      return res.json({ error: message });
    }

    next();
  })(req, res, next);
}
