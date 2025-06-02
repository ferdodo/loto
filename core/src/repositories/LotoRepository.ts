import type { Loto } from "../entities/Loto";

type UnsubscribeHandler = () => void;
type LotoObserver = (game: Loto) => void;

export interface LotoRepository {
	subscribe(observer: LotoObserver): UnsubscribeHandler;
	setLoto(game: Loto): Promise<void>;
	readLoto(): Promise<Loto>;
}
