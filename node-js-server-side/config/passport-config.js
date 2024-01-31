const bcrypt = require('bcrypt');
const { Strategy: LocalStrategy } = require('passport-local');
const { ExtractJwt, Strategy: JWTStrategy } = require('passport-jwt');
const userService = require('../service/user_service');
const {JWT_SECRET} = require("../constants/constants");

async function initialize(passport) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async (email, password, done) => {
        try {
            const user = await userService.findUserByEmail(email);
            if (!user) {
                return done(null, false, { message: 'Incorrect email or password.' });
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            return passwordMatch ? done(null, user) : done(null, false, { message: 'Incorrect email or password.' });
        } catch (error) {
            return done(error);
        }
    }));

    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET,
        passReqToCallback: true,
    }, (req, jwtPayload, done) => {
        const expirationTime = jwtPayload.exp - Math.floor(Date.now() / 1000);
        done(null, jwtPayload, { expiresIn: expirationTime });
    }));

    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userService.findUserById(id);
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    });
}

module.exports = initialize;