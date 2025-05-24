import type { Bingo } from "../entities/Bingo";
import type { BingoRepository } from "../repositories/BingoRepository";

type BingoObserver = (game: Bingo) => void;

export function createBingoRepository(): BingoRepository {
	let currentGame: Bingo | null = null;
	const observers: BingoObserver[] = [];

	return {
		subscribe(observer: BingoObserver): () => void {
			observers.push(observer);
			if (currentGame) {
				observer(currentGame);
			}
			return () => {
				const index = observers.indexOf(observer);
				if (index > -1) {
					observers.splice(index, 1);
				}
			};
		},
		async setBingo(game: Bingo): Promise<void> {
			currentGame = game;
			for (const observer of observers) {
				observer(game);
			}
		},
		async readBingo(): Promise<Bingo> {
			if (!currentGame) {
				throw new Error("No game in progress");
			}
			return currentGame;
		},
	};
}
