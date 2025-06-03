import type { Loto } from "../entities/Loto";
import type { LotoHistoryRepository } from "./LotoHistoryRepository";
import type { LotoRepository } from "./LotoRepository";

export function createLotoHistoryRepository(
	lotoRepository: LotoRepository,
): LotoHistoryRepository {
	const history: Loto[] = [];

	function subscribeToLotoRepository() {
		lotoRepository.subscribe((loto) => {
			const lastState = history[history.length - 1];
			if (
				!lastState ||
				loto.drawnNumbers.length > lastState.drawnNumbers.length
			) {
				history.push(loto);
			}
		});
	}

	subscribeToLotoRepository();

	return {
		getHistory() {
			return [...history];
		},
		getLastState() {
			if (history.length < 2) {
				return undefined;
			}
			return history[history.length - 2];
		},
		removeLastState() {
			if (history.length > 0) {
				history.pop();
			}
		},
		clearHistory() {
			history.length = 0;
		},
	};
}
