const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(err));
});

usersRouter.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json({error: `User not Found`}));
});

usersRouter.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'User deleted' }))
        .catch(err => res.status(400).json({ message: 'User id not found' }))
});

usersRouter.route('/user').post((req, res) => {
    const { user, avatar, name, password, email } = req.body;
    const newUser = new User({
        user,
        avatar,
        name,
        password,
        email
    });

    newUser.save()
        .then(() => res.json('User added'))
        .catch*(err => res.status(400).json(err));
});

usersRouter.route('/:id').put((req, res) => {
    const { user, avatar, name, password, email} = req.body;
    User.findById(req.params.id)
        .then(update => {
            update.user = user;
            update.avatar = avatar;
            update.name = name;
            update.password = password;
            update.email = email;

            update.save()
                .then(user => res.json(user))
                .catch(error => res.json(400).json({ error }))
        })
        .catch(error => res.json(400).json({ error }))
});

module.exports = usersRouter;