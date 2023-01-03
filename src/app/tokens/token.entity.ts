import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { IToken } from "./interfaces/token.interface";


@Entity('tokens')
export class Token implements IToken {
	// metadata
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn({ default: null })
	updatedAt: Date;

	@Column({ default: true })
	isActive: boolean;

	@DeleteDateColumn({ default: null })
	deletedAt: Date;

	// data
	@Column({ nullable: false, unique: true })
	name: string;

	@Column({ nullable: false, unique: true })
	symbol: string;

	@Column({ nullable: false })
	marketCap: number;
}
