import { EntityTarget, getRepository } from "typeorm";

export const uniqueEmail = async (email: string, entity: EntityTarget<unknown>) => {
    const model = getRepository(entity);
    const found = await model.findOne({ where: { email } });
    return !found;
};