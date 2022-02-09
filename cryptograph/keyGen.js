const crypto = require('crypto');
const fs = require('fs');

const gen = (() => {
    // generating the public and private key pair
    const keyPair = crypto.generateKeyPairSync('rsa', {
            modulusLength: 4096,
            privateKeyEncoding: {
                type: 'pkcs1',
                format: 'pem'
            },
            publicKeyEncoding: {
                type: 'pkcs1',
                format: 'pem'
            }
        })
        // console.log(keyPair);
        // writing the public key to file

    fs.writeFileSync(__dirname + '/publicKey.pem', keyPair.publicKey)
        // writing the private key to file
    fs.writeFileSync(__dirname + '/privateKey.pem', keyPair.privateKey)
})()