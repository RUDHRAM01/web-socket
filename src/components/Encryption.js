import crypto from 'crypto-browserify';

const encryptionKey = process.env.REACT_APP_DECRYPTION_KEY;

const Encryption = (message) => {
    
    const iv = crypto.randomBytes(16);
    const key = crypto.createHash('sha256').update(encryptionKey).digest('base64').substr(0, 32);

    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encryptedText = cipher.update(message, 'utf-8', 'hex');
    encryptedText += cipher.final('hex');

    return { encryptedText, iv: iv.toString('hex') };
}

export { Encryption }