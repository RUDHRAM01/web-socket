import crypto from 'crypto-browserify';

const decryptionKey = process.env.REACT_APP_DECRYPTION_KEY;

const Decryption = ( message, iv) => {
  const key = crypto.createHash('sha256').update(decryptionKey).digest('base64').substr(0, 32);
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(message, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return (
    <>
      {decrypted}
    </>
  )
}

export { Decryption }