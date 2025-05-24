import { PlayerCard } from "./PlayerCard";

export const PlayerCardTestFactory = {
	createValid() {
		return new PlayerCard({
			numbers: [
				[1, null, 21, null, 41, null, 61, null, 81],
				[null, 12, null, 32, null, 52, null, 72, 82],
				[3, null, 23, null, 43, null, 63, null, 83],
			],
		});
	},

	createWithInvalidType() {
		return new PlayerCard({
			numbers: "not an array" as unknown as (number | null)[][],
		});
	},

	createWithInvalidRowCount() {
		return new PlayerCard({
			numbers: [
				[1, 2, 3],
				[4, 5, 6],
			],
		});
	},

	createWithInvalidColumnCount() {
		return new PlayerCard({
			numbers: [
				[1, 2, 3, 4, 5, 6, 7, 8, 9],
				[1, 2, 3, 4, 5, 6, 7, 8],
				[1, 2, 3, 4, 5, 6, 7, 8, 9],
			],
		});
	},

	createWithInvalidNumberRange() {
		return new PlayerCard({
			numbers: [
				[1, null, 21, 31, null, 51, 61, null, 81],
				[null, 2, 22, null, 42, 52, null, 72, 82],
				[3, 13, null, 33, null, 53, 63, null, 83],
			],
		});
	},

	createWithDuplicateNumbers() {
		return new PlayerCard({
			numbers: [
				[1, null, 21, 31, null, 51, 61, null, 81],
				[null, 12, 22, null, 42, 52, null, 72, 82],
				[3, 13, null, 33, null, 53, 63, null, 81],
			],
		});
	},

	createWithInvalidTotalEmptyCells() {
		return new PlayerCard({
			numbers: [
				[1, null, 21, null, 41, null, 61, null, 81],
				[null, 12, 22, null, 42, 52, null, 72, 82],
				[3, 13, null, 33, null, 53, 63, null, null],
			],
		});
	},

	createWithTooFewEmptyCellsInRow() {
		return new PlayerCard({
			numbers: [
				[1, 11, 21, 31, 41, 51, 61, 71, 81],
				[null, 12, 22, null, 42, 52, null, 72, 82],
				[3, 13, null, 33, null, 53, 63, null, 83],
			],
		});
	},

	createWithTooManyEmptyCellsInRow() {
		return new PlayerCard({
			numbers: [
				[1, null, null, null, null, null, null, 71, 81],
				[null, 12, 22, null, 42, 52, null, 72, 82],
				[3, 13, null, 33, null, 53, 63, null, 83],
			],
		});
	},
};
