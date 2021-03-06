const usersRouter = require('express').Router();
const bcrypt = require('bcryptjs');
const fs = require('fs');

const User = require('../models/UserModel');
const { verifyToken } = require('../validations/verifyToken');
const { userValidation } = require('../validations/userValidation');

usersRouter.get('/', verifyToken, (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(err));
});

usersRouter.get('/:id', verifyToken, (req, res) => {
    console.log(req.params.id)
    User.find({ _id: req.params.id })
        .then(user => res.json(user))
        .catch(() => res.status(400).json({error: `User not Found`}));
});

usersRouter.get('/:col/:query', verifyToken, (req, res) => {
    let query;
    switch (req.params.col) {
        case 'username':
            query = { username: req.params.query };
            break;
        case 'email':
            query = { email: req.params.query };
        default:
            // none
    }
    if (query) {
        User.find(query)
            .then(user => res.json(user))
            .catch(() => res.status(400).json({error: `User not Found`}));
    } else {
        return res.status(400).json({error: `Query column not defined`});
    }
});

usersRouter.delete('/:id', verifyToken, (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'User deleted' }))
        .catch(err => res.status(400).json({ message: 'User id not found' }))
});

usersRouter.post('/', verifyToken, (req, res) => {
    const { error } = userValidation(req.body);
    if ( error ) return res.status(400).json({ error: error.details[0].message });

    const { username, avatar, name, password, email } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPasswd = bcrypt.hashSync(password, salt);
    
    const newUser = new User({
        // _id: new mongoose.Types.Objectd(),
        username,
        name,
        password: hashedPasswd,
        email
    });
    newUser.save()
        .then(() => res.json('User added'))
        .catch(err => res.status(400).json({ error: err.errmsg }));
});

usersRouter.put('/:id', verifyToken, (req, res) => {
    const { error } = userValidation(req.body);
    if ( error ) return res.status(400).json({ error: error.details[0].message });

    const {
        username,
        avatar,
        name,
        password,
        email,
        slogan,
        language,
        description,
        social
    } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashedPasswd = bcrypt.hashSync(password, salt);
    User.findById(req.params.id)
        .then(update => {
            update.username = username;
            update.name = name;
            update.password = hashedPasswd;
            update.email = email;
            slogan ? update.slogan = slogan : null;
            language ? update.language = language : null;
            description ? update.description = description : null;
            social ? update.social = social : null;
            if ( avatar ) {
                update.avatar = {
                    content: new Buffer.from(fs.readFileSync(avatar.content), 'base64').toString('base64'),
                    content_type: avatar.content_type
                }
            }

            update.save()
                .then(user => res.json(user))
                .catch(error => res.json(400).json({ error }))
        })
        .catch(error => res.json(400).json({ error }))
});

module.exports = usersRouter;