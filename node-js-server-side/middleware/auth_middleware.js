const passport = require('passport');

const isAuthenticated = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        if (info && info.expiresIn <= 0) {
            return res.status(401).json({ error: 'Unauthorized - Token has expired' });
        }
        req.user = user;
        next();
    })(req, res, next);
};

module.exports = isAuthenticated;