const crypto = require("crypto");

const hashPassword = (password) => {
    const salt = crypto.randomBytes(300).toString("hex");
    const hash = crypto
        .pbkdf2Sync(password, salt, 20000, 64, "sha512")
        .toString();
    return { salt, hash };
};

const verifyHash = (password, salt, hash) => {
    const hashPassword = crypto
        .pbkdf2Sync(password, salt, 20000, 64, "sha512")
        .toString();
    return hash === hashPassword;
};

module.exports = { hashPassword, verifyHash };