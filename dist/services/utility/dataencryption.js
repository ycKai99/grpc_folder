"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataDecryption = exports.dataEncryption = void 0;
const crypto = require("crypto");
function dataEncryption(fileData) {
    let fpdata = fileData.toString();
    const key = 'axtQjz7QRHCV7yOrnNK7gp==';
    const keyBuffer = Buffer.from(key, 'base64');
    const plaintext = fpdata;
    const iv = 'Os28pvyLTO00JHdxsBA3sw==';
    const ivBuffer = Buffer.from(iv, 'base64');
    const cipher = crypto.createCipheriv('aes-128-cbc', keyBuffer, ivBuffer);
    let ciphertext = cipher.update(plaintext, 'utf8', 'base64');
    ciphertext += cipher.final('base64');
    return ciphertext;
}
exports.dataEncryption = dataEncryption;
function dataDecryption(ciphertext) {
    const ciphertextBuffer = Buffer.from(ciphertext, 'base64');
    const key = 'axtQjz7QRHCV7yOrnNK7gp==';
    const iv = 'Os28pvyLTO00JHdxsBA3sw==';
    const keyBuffer = Buffer.from(key, 'base64');
    const ivBuffer = Buffer.from(iv, 'base64');
    const decipher = crypto.createDecipheriv('aes-128-cbc', keyBuffer, ivBuffer);
    decipher.setAutoPadding(true);
    let plaintext = decipher.update(ciphertextBuffer, null, 'utf-8');
    plaintext += decipher.final('utf-8');
    return plaintext;
}
exports.dataDecryption = dataDecryption;
//# sourceMappingURL=dataencryption.js.map