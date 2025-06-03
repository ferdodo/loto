import { Loto } from "../entities/Loto";
import type { LotoHistoryRepository } from "../repositories/LotoHistoryRepository";
import type { LotoRepository } from "../repositories/LotoRepository";

export class ResetLotoUseCase {
	constructor(
		private readonly lotoRepository: LotoRepository,
		private readonly historyRepository: LotoHistoryRepository,
	) {}

	async execute(): Promise<void> {
		const resetGame = new Loto({
			drawnNumbers: [],
			isDrawRequested: false,
		});
		await this.lotoRepository.setLoto(resetGame);
		this.historyRepository.clearHistory();
	}
}
