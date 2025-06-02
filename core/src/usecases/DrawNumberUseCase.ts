import { Loto } from "../entities/Loto";
import type { LotoRepository } from "../repositories/LotoRepository";

export class DrawNumberUseCase {
	constructor(private readonly lotoRepository: LotoRepository) {}

	async execute(number: number): Promise<void> {
		const game = await this.lotoRepository.readLoto();

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

		const updatedGame = new Loto({
			drawnNumbers: [...game.drawnNumbers, number].sort((a, b) => a - b),
			isDrawRequested: false,
		});

		await this.lotoRepository.setLoto(updatedGame);
	}
}
