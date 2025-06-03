import { Loto } from "core";
import type { LotoHistoryRepository, LotoRepository } from "core";
import { lotoRepository } from "./lotoRepository";

function createLocalStorageLotoHistoryRepository(
	lotoRepository: LotoRepository,
): LotoHistoryRepository {
	const HISTORY_KEY = "loto_history";

	function readHistory(): Loto[] {
		const serializedHistory = localStorage.getItem(HISTORY_KEY);
		if (!serializedHistory) {
			return [];
		}

		const rawData = JSON.parse(serializedHistory) as unknown[];
		return rawData.map((data) => new Loto(data as Loto));
	}

	const history: Loto[] = readHistory();

	function subscribeToLotoRepository() {
		lotoRepository.subscribe((loto: Loto) => {
			const lastState = history[history.length - 1];
			if (
				!lastState ||
				loto.drawnNumbers.length > lastState.drawnNumbers.length
			) {
				history.push(loto);
				localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
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
				localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
			}
		},
		clearHistory() {
			history.length = 0;
			localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
		},
	};
}

export const lotoHistoryRepository =
	createLocalStorageLotoHistoryRepository(lotoRepository);
