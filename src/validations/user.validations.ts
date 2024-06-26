import UserModel from '../entities/user.entity';
import { CustomValidator } from 'express-validator';
import { uniqueEmail } from '../utils/query';

export const isUniqueEmail: CustomValidator = async (value: string) => {
  const isUnique = await uniqueEmail(value, UserModel);

  if (isUnique) {
    return true;
  }

  throw new Error (`Email already registered`)
};