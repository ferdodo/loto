import type { Loto } from "../entities/Loto";
import type { LotoRepository } from "./LotoRepository";

export class LotoHistoryRepository {
	private history: Loto[] = [];
	private readonly lotoRepository: LotoRepository;

	constructor(lotoRepository: LotoRepository) {
		this.lotoRepository = lotoRepository;
		this.subscribeToLotoRepository();
	}

	private subscribeToLotoRepository() {
		this.lotoRepository.subscribe((loto) => {
			this.history.push(loto);
		});
	}

	public getHistory(): Loto[] {
		return [...this.history];
	}

	public getLastState(): Loto | undefined {
		if (this.history.length < 2) {
			return undefined;
		}

		return this.history[this.history.length - 2];
	}
}
