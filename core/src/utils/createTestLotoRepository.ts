import { Loto } from "../entities/Loto";
import type { LotoRepository } from "../repositories/LotoRepository";
import { createLotoTestData } from "./createLotoTestData";

type LotoObserver = (game: Loto) => void;

export function createTestLotoRepository(): LotoRepository {
	let currentGame = createLotoTestData().empty();
	const observers: LotoObserver[] = [];

	return {
		subscribe(observer: LotoObserver): () => void {
			observers.push(observer);
			observer(currentGame);
			return () => {
				const index = observers.indexOf(observer);
				if (index > -1) {
					observers.splice(index, 1);
				}
			};
		},
		async setLoto(game: Loto): Promise<void> {
			currentGame = new Loto({
				drawnNumbers: [...game.drawnNumbers],
				isDrawRequested: game.isDrawRequested,
			});
			for (const observer of observers) {
				observer(currentGame);
			}
		},
		async readLoto(): Promise<Loto> {
			return currentGame;
		},
	};
}
