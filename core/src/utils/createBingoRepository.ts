import { Bingo } from "../entities/Bingo";
import type { BingoRepository } from "../repositories/BingoRepository";

type BingoObserver = (game: Bingo) => void;

export function createBingoRepository(): BingoRepository {
	const currentGame = new Bingo({
		drawnNumbers: [],
		isDrawRequested: false,
	});
	const observers: BingoObserver[] = [];

	return {
		subscribe(observer: BingoObserver): () => void {
			observers.push(observer);
			observer(currentGame);
			return () => {
				const index = observers.indexOf(observer);
				if (index > -1) {
					observers.splice(index, 1);
				}
			};
		},
		async setBingo(game: Bingo): Promise<void> {
			Object.assign(currentGame, game);
			for (const observer of observers) {
				observer(currentGame);
			}
		},
		async readBingo(): Promise<Bingo> {
			return currentGame;
		},
	};
}
