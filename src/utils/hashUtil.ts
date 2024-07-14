import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

const saltRounds = 10;

/**
 * Generates a SHA-256 hash of the given data.
 * @param data - The data to hash.
 * @returns The SHA-256 hash of the data.
 */
export function generateSHA256Hash(data: string): string {
  return crypto.createHash('sha256').update(data).digest('hex');
}

/**
 * Generates a bcrypt hash of the given password.
 * @param password - The password to hash.
 * @returns A promise that resolves to the bcrypt hash of the password.
 */
export async function generateBcryptHash(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

/**
 * Compares a password with a bcrypt hash.
 * @param password - The password to compare.
 * @param hash - The bcrypt hash to compare with.
 * @returns A promise that resolves to true if the password matches the hash, false otherwise.
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}
