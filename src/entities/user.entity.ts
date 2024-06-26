import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

export enum UserStatus {
    ACTIVE = "ACTIVE",
    DISABLED = "DISABLED"
}

export enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER",
}

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ type: "enum", enum: UserStatus, default: UserStatus.ACTIVE })
    status: UserStatus;
    
    @Column( { type: "enum", enum: UserRole, default: UserRole.USER})
    role: UserRole;
    
    toAPI = (): Partial<User> => {
        return{
            id: this.id,
            name: this.name,
            email: this.email,
            role: this.role,
            status: this.status
            }
            }
}