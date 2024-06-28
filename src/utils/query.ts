import { EntityTarget } from 'typeorm';
import { dataSource } from './dataSource';
import User from '../entities/user.entity';

export const uniqueEmail = async (email: string, entity: EntityTarget<unknown>) => {
  const model = dataSource.getRepository(User);
  const found = await model.findOneBy({ email });
  console.log(found);
  return !found;
};
