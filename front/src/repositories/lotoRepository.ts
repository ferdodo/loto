import type { LotoRepository } from "core";
import { Loto } from "core";

type LotoObserver = (game: Loto) => void;

const LOTO_KEY = "loto:v2";

async function readLoto() {
	const serializedLoto = localStorage.getItem(LOTO_KEY);

	const rawData: unknown = serializedLoto
		? JSON.parse(serializedLoto)
		: new Loto({ drawnNumbers: [], isDrawRequested: false });

	return new Loto(rawData as Loto);
}

function createLotoRepository() {
	const observers: LotoObserver[] = [];

	return {
		readLoto,
		async setLoto(loto: Loto) {
			localStorage.setItem(
				LOTO_KEY,
				JSON.stringify({
					drawnNumbers: loto.drawnNumbers,
					isDrawRequested: loto.isDrawRequested,
				}),
			);

			for (const observer of observers) {
				observer(loto);
			}
		},
		subscribe(observer: LotoObserver): () => void {
			observers.push(observer);

			readLoto().then(observer);

			return () => {
				const index = observers.indexOf(observer);
				if (index > -1) {
					observers.splice(index, 1);
				}
			};
		},
	};
}

export const lotoRepository: LotoRepository = createLotoRepository();
