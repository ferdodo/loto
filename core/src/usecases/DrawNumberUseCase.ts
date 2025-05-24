import { Bingo } from "../entities/Bingo";
import type { BingoRepository } from "../repositories/BingoRepository";

export class DrawNumberUseCase {
	constructor(private readonly bingoRepository: BingoRepository) {}

	async execute(number: number): Promise<void> {
		const game = await this.bingoRepository.readBingo();

		if (!game.isDrawRequested) {
			throw new Error("No draw requested");
		}

		if (game.drawnNumbers.length >= 90) {
			throw new Error("All numbers have been drawn");
		}

		if (number < 1 || number > 90) {
			throw new Error("Number must be between 1 and 90");
		}

		if (!Number.isInteger(number)) {
			throw new Error("Number must be an integer");
		}

		if (game.drawnNumbers.includes(number)) {
			throw new Error("Number has already been drawn");
		}

		const updatedGame = new Bingo({
			drawnNumbers: [...game.drawnNumbers, number].sort((a, b) => a - b),
			isDrawRequested: false,
		});

		await this.bingoRepository.setBingo(updatedGame);
	}
}
