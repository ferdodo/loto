import type { BingoRepository } from "core";
import { Bingo } from "core";

type BingoObserver = (game: Bingo) => void;

async function readBingo() {
	const serializedBingo = localStorage.getItem("bingo");

	const rawData: unknown = serializedBingo
		? JSON.parse(serializedBingo)
		: new Bingo({ drawnNumbers: [], isDrawRequested: false });

	return new Bingo(rawData as Bingo);
}

function createBingoRepository() {
	const observers: BingoObserver[] = [];

	return {
		readBingo,
		async setBingo(bingo: Bingo) {
			localStorage.setItem(
				"bingo",
				JSON.stringify({
					drawnNumbers: bingo.drawnNumbers,
					isDrawRequested: bingo.isDrawRequested,
				}),
			);

			for (const observer of observers) {
				observer(bingo);
			}
		},
		subscribe(observer: BingoObserver): () => void {
			observers.push(observer);

			readBingo().then(observer);

			return () => {
				const index = observers.indexOf(observer);
				if (index > -1) {
					observers.splice(index, 1);
				}
			};
		},
	};
}

export const bingoRepository: BingoRepository = createBingoRepository();
