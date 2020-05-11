const authRouter = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { userValidation, loginValidation } = require('../validations/userValidation');

authRouter.post('/register', (req, res) => {
    const { error } = userValidation(req.body);
    if ( error ) return res.status(400).json({ error: error.details[0].message });

    const { username, avatar, name, password, email } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPasswd = bcrypt.hashSync(password, salt);
    
    const newUser = new User({
        username,
        avatar,
        name,
        password: hashedPasswd,
        email
    });
    newUser.save()
        .then(() => res.json('User added'))
        .catch(err => res.status(400).json({ error: err.errmsg }));
});

authRouter.post('/login', (req, res) => {
    const { error } = loginValidation(req.body);
    if ( error ) return res.status(400).json({ error: error.details[0].message });

    User.findOne({ email: req.body.email })
        .then(user => {
            if ( !bcrypt.compareSync(req.body.password, user.password) )
                return res.status(404).json({ error: 'Invalid password' });
            
            const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
            return res.header('Authorization-Token', token)
                .json({ token });
        })
        .catch(err => res.status(404).json({ error: 'Invalid email' }))
})

module.exports = authRouter;