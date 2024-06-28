import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

export enum UserStatus {
  ACTIVE = "ACTIVE",
  DISABLED = "DISABLED",
}

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

@Entity()
export default class User {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({type: "text"})
  name: string;

  @Column({ type: "text",unique: true })
  email: string;

  @Column({ type: "text", nullable: true })
  profilePic: string;

  @Column({type: "text"})
  password: string;

  @Column({ type: "enum", enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus;

  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ type: "timestamp with time zone", default: new Date() })
  createdAt: Date;

  @Column({ type: "timestamp with time zone", default: new Date() })
  updatedAt: Date;

  toAPI = (): Partial<User> => {
    return {
      id: this.id,
      email: this.email,
      profilePic: this.profilePic,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      role: this.role,
    };
  };

  toAuth = (): Partial<User> => {
    return {
      id: this.id,
      email: this.email,
      role: this.role
    }
  }
}
