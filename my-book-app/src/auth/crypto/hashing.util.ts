import * as bcrypt from 'bcrypt';
import { SALT_ROUND } from './crypto.constant';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(SALT_ROUND); // taoj salt
  return bcrypt.hash(password, salt); // hash = password + salt bam ra
}

export async function compareHashPassword(
  passwordPlain: string,
  hashPassword: string,
): Promise<boolean> {
  return bcrypt.compare(passwordPlain, hashPassword);
}
