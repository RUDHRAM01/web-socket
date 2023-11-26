const CryptoJS = require("crypto-js");
const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;

const Encryption = (message) => {
    if (!message) return;
    const iv = CryptoJS.lib.WordArray.random(16);
    const key = CryptoJS.SHA256(encryptionKey).toString(CryptoJS.enc.Base64).substr(0, 32);
    const cipher = CryptoJS.AES.encrypt(message, key, { iv: iv }).toString();
    return { encryptedText: cipher, iv: iv.toString() }
}
    
export { Encryption }