import CryptoJS from 'crypto-js';

export class CryptoUtil {
  /**
   * Encrypts the password
   * @param password The password to be encrypted
   * @returns The encrypted password
   */

  static encrypt(password: string): string {
    return CryptoJS.AES.encrypt(password, process.env.PASSWORD_SECRET_KEY).toString();
  }

  /**
   * Decrypts the password
   * @param encryptedPassword The encrypted password
   * @returns The decrypted password
   */

  static decrypt(encryptedPassword: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, process.env.PASSWORD_SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
