import type { Bingo } from "../entities/Bingo";

type UnsubscribeHandler = () => void;
type BingoObserver = (game: Bingo) => void;

export interface BingoRepository {
	subscribe(observer: BingoObserver): UnsubscribeHandler;
	setBingo(game: Bingo): Promise<void>;
	readBingo(): Promise<Bingo>;
}
