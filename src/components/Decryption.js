const CryptoJS = require("crypto-js");

const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;

const Decryption = (encryptedText, iv) => {
    if (!encryptedText) return;
    const key = CryptoJS.SHA256(encryptionKey).toString(CryptoJS.enc.Base64).substr(0, 32);
    const decrypted = CryptoJS.AES.decrypt(encryptedText, key, { iv: CryptoJS.enc.Base64.parse(iv) }).toString(CryptoJS.enc.Utf8);
    return decrypted;
}

export { Decryption }