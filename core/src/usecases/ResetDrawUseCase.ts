import { Bingo } from "../entities/Bingo";
import type { BingoRepository } from "../repositories/BingoRepository";

export class ResetDrawUseCase {
	constructor(private readonly bingoRepository: BingoRepository) {}

	async execute(): Promise<void> {
		const game = await this.bingoRepository.readBingo();
		const resetGame = new Bingo({
			drawnNumbers: [],
			isDrawRequested: false,
		});
		await this.bingoRepository.setBingo(resetGame);
	}
}
