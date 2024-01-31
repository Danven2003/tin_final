const express = require('express');
const passport = require('passport');
const userService = require('../service/user_service');
const jwt = require('jsonwebtoken');
const {findUserById} = require("../service/user_service");
const { UsernameExistException, EmailExistException, AllFieldsRequired } = require("../exceptions/auth_exception");
const isAuthenticated = require('../middleware/auth_middleware');
const {JWT_SECRET, JWT_EXPIRATION_TIME} = require("../constants/constants");

const router = express.Router();


router.post('/register', async (req, res) => {
    try {
        const { email, password, username, name, surname, place_of_living, telephone, sex } = req.body;

        const newUser = await userService.createUser({
            email,
            password,
            username,
            name,
            surname,
            place_of_living,
            telephone,
            sex,
        });

        res.status(201).json({ user: newUser });
    } catch (error) {
        if (error instanceof UsernameExistException || error instanceof EmailExistException) {
            return res.status(error.code).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An error occurred while processing the request.' });
        }
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user) => {
        try {
            if (err) {
                return res.status(500).json({error: 'Internal Server Error'});
            }

            if (!user) {
                return res.status(401).json({error: 'Incorrect email or password. Please try again.'});
            }

            const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRATION_TIME });

            return res.status(200).json({token: token, user: user});
        } catch (error) {
            return res.status(500).json({error: 'An error occurred while processing the request.'});
        }
    })(req, res, next);
});

router.post('/logout', isAuthenticated, (req, res) => {
    try {
        res.clearCookie('sessionID');
        return res.status(200).json({message: 'Logout successful'});
    } catch (error) {
        return res.status(500).json({error: 'An error occurred during logout'});
    }
});

router.get('/user', isAuthenticated, async (req, res) => {
    const user = await findUserById(req.user.userId)
    return res.status(200).json({user: user});
});

module.exports = router;