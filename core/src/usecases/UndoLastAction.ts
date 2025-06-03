import type { LotoHistoryRepository } from "../repositories/LotoHistoryRepository";
import type { LotoRepository } from "../repositories/LotoRepository";

export class UndoLastAction {
	private readonly lotoRepository: LotoRepository;
	private readonly historyRepository: LotoHistoryRepository;

	constructor(
		lotoRepository: LotoRepository,
		historyRepository: LotoHistoryRepository,
	) {
		this.lotoRepository = lotoRepository;
		this.historyRepository = historyRepository;
	}

	async execute(): Promise<void> {
		const previousState = this.historyRepository.getLastState();
		if (!previousState) {
			throw new Error("Cannot undo: no previous state available");
		}

		await this.lotoRepository.setLoto(previousState);
		this.historyRepository.removeLastState();
	}
}
