import { Loto } from "../entities/Loto";
import type { LotoRepository } from "../repositories/LotoRepository";

type LotoObserver = (game: Loto) => void;

export function createLotoRepository(): LotoRepository {
	const currentGame = new Loto({
		drawnNumbers: [],
		isDrawRequested: false,
	});
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
			Object.assign(currentGame, game);
			for (const observer of observers) {
				observer(currentGame);
			}
		},
		async readLoto(): Promise<Loto> {
			return currentGame;
		},
	};
}
