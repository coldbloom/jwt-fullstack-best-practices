const User = require('../entities/user')
const bcrypt = require('bcryptjs')

class AuthService {
    async signUpService({ userName, password, fingerprint }) {
        const userData = await User.findOne({ name: userName });

        if (userData) {
            throw new Error('Пользователь с таким именем уже существует');
        }

        const hashedPassword = bcrypt.hashSync(password, 8);

        const newUser = new User();
        newUser.name = userName;
        newUser.password = hashedPassword;

        await newUser.save();

        console.log('Создал нового пользователя = ', newUser)
    }

    async signInService(req, res) {

    }

    async refreshService(req, res) {

    }

    async logoutService(req, res) {

    }
}

module.exports = new AuthService()