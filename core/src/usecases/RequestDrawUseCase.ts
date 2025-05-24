import { Bingo } from "../entities/Bingo";
import type { BingoRepository } from "../repositories/BingoRepository";

export class RequestDrawUseCase {
	constructor(private readonly bingoRepository: BingoRepository) {}

	async execute(game: Bingo): Promise<void> {
		const updatedGame = new Bingo({
			...game,
			isDrawRequested: true,
		});

		await this.bingoRepository.setBingo(updatedGame);
	}
}
