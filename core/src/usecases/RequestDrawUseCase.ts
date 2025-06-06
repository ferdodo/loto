import { Loto } from "../entities/Loto";
import type { LotoRepository } from "../repositories/LotoRepository";

export class RequestDrawUseCase {
	constructor(private readonly lotoRepository: LotoRepository) {}

	async execute(): Promise<void> {
		const game = await this.lotoRepository.readLoto();

		const updatedGame = new Loto({
			...game,
			isDrawRequested: true,
		});

		await this.lotoRepository.setLoto(updatedGame);
	}
}
