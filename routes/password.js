const router = require("express").Router();
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

const passwordUtils = require("../lib/passwordUtils");

const userInput = { email: "test@t.com", password: "123" };
// console.log(userInput.password);
const { salt, hash } = passwordUtils.hashPassword(userInput.password);
const userDb = [{
    id: '1234-12345645-34529503-129847542918',
    email: userInput.email,
    salt,
    hash,
}, ];

const pathToKey = path.resolve(__dirname + "/.." + "/cryptograph");

const privateKey = fs.readFileSync(pathToKey + "/privatekey.pem", "utf8");
const publicKey = fs.readFileSync(pathToKey + "/publicKey.pem", "utf8");

router.get("/forgotPassword", (req, res) => {
    res.render("forgotPassword");
});

router.post("/forgotPassword", (req, res) => {
    const { email } = req.body;

    const user = userDb.find((user) => user.email === email);
    try {
        if (!user) return res.status(401).send("<h2>User not found</h2>");
        const payload = {
            // id: user.id,
            // email: user.email,
            iss: "Gbolahan",
            sub: user,
            // iat: Date.now(),
            // exp: 1000000,
        };
        const token = jwt.sign(payload, privateKey, {
            algorithm: "RS256",
            expiresIn: '15s',
        });
        // console.log(token);
        const link = `http://localhost:5000/password/resetPassword/${user.id}/${token}`;
        console.log(link);
        res.status(200).send('<h2>Password reset link has been sent to your mail ...</h2>')

    } catch (error) {
        console.log(error);
        res.status(401).send("<h2>User not found</h2>");
    }
});

router.get("/resetPassword/:id/:token", (req, res) => {
    try {
        const { id, token } = req.params;

        const user = userDb.find(user => id === user.id)
        if (!user) throw new Error('invalid user')

        const verify = jwt.verify(token, publicKey, { algorithm: ['RS256'] })
        res.status(200).render('resetPassword', { email: user.email });


    } catch (error) {
        console.log(error);
        res.send(error.message)
    }
});
router.post("/resetPassword/:id/:token", (req, res) => {
    try {
        const { id, token } = req.params;

        const user = userDb.find(user => user.id === id)
        if (!user) throw new Error('Invalid user');

        const verify = jwt.verify(token, publicKey, { algorithm: ['RS256'] })
        const { password1, password2 } = req.body;
        console.log(password1);

    } catch (error) {
        console.log(error);
        res.send(error.message)
    }

});

module.exports = router;