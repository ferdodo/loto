import { Loto } from "../entities/Loto";
import type { LotoRepository } from "../repositories/LotoRepository";

export class ResetLotoUseCase {
	constructor(private readonly lotoRepository: LotoRepository) {}

	async execute(): Promise<void> {
		const resetGame = new Loto({
			drawnNumbers: [],
			isDrawRequested: false,
		});
		await this.lotoRepository.setLoto(resetGame);
	}
}
