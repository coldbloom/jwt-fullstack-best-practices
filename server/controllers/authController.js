const {
    signUpService,
    signInService,
    logoutService,
    refreshService
} = require('../services/authService')

class AuthController {
    async signIn(req, res){
        try {

        } catch (e) {
            console.log(e)
        }
    }

    async signUp(req, res) {
        try {
            const fingerprint = req;
            const { userName, password } = req.body;

            try {
                await signUpService({ userName, password, fingerprint });
            } catch (error) {
                res.status(error.status || 500).json(error);
            }
        } catch (e) {
            console.log(e)
        }
    }

    async refresh(req, res) {
        try {

        } catch (e) {
            console.log(e)
        }
    }

    async logout(req, res) {
        try {

        } catch (e) {
            console.log(e)
        }
    }

    async testRequest(req, res) {
        try {
            res.send(200, 'Тестовый гет запрос')
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new AuthController()