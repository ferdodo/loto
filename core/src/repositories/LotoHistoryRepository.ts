import type { Loto } from "../entities/Loto";

export interface LotoHistoryRepository {
	getHistory(): Loto[];
	getLastState(): Loto | undefined;
	removeLastState(): void;
	clearHistory(): void;
}
