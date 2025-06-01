import { Bingo } from "../entities/Bingo";
import type { BingoRepository } from "../repositories/BingoRepository";

export class RequestDrawUseCase {
	constructor(private readonly bingoRepository: BingoRepository) {}

	async execute(): Promise<void> {
		const game = await this.bingoRepository.readBingo();

		const updatedGame = new Bingo({
			...game,
			isDrawRequested: true,
		});

		await this.bingoRepository.setBingo(updatedGame);
	}
}
