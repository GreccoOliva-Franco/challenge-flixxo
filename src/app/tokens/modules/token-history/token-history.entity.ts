import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from "typeorm";

import { ITokenHistory } from "./interfaces/token-history.interface";

import { Token } from "../../token.entity";

@Entity('token_history')
export class TokenHistory implements ITokenHistory {
	// metadata
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@CreateDateColumn()
	createdAt: Date;

	// data
	@Column({ nullable: false })
	price: number;

	@Column({ nullable: false })
	tokenId: string;
}
