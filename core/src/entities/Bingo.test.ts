import { describe, expect, it } from "vitest";
import { Bingo } from "./Bingo";

type BingoConstructorParams = {
	drawnNumbers: number[];
	isDrawRequested: boolean;
};

describe("Bingo", () => {
	it("should create a valid bingo game", () => {
		const game = new Bingo({
			drawnNumbers: [1, 2, 3],
			isDrawRequested: false,
		});

		expect(game.drawnNumbers).toEqual([1, 2, 3]);
		expect(game.isDrawRequested).toBe(false);
	});

	it("should throw when drawnNumbers is not an array", () => {
		expect(() => {
			new Bingo({
				drawnNumbers: "not an array" as unknown as number[],
				isDrawRequested: false,
			});
		}).toThrow("Drawn numbers must be an array");
	});

	it("should throw when isDrawRequested is not a boolean", () => {
		expect(() => {
			new Bingo({
				drawnNumbers: [],
				isDrawRequested: "not a boolean" as unknown as boolean,
			});
		}).toThrow("isDrawRequested must be a boolean");
	});

	it("should throw when there are more than 90 numbers", () => {
		const numbers = Array.from({ length: 91 }, (_, i) => i + 1);
		expect(() => {
			new Bingo({
				drawnNumbers: numbers,
				isDrawRequested: false,
			});
		}).toThrow("Cannot draw more than 90 numbers");
	});

	it("should throw when there are duplicate numbers", () => {
		expect(() => {
			new Bingo({
				drawnNumbers: [1, 2, 2, 3],
				isDrawRequested: false,
			});
		}).toThrow("There are duplicate numbers");
	});

	it("should throw when numbers are not between 1 and 90", () => {
		expect(() => {
			new Bingo({
				drawnNumbers: [0, 1, 2],
				isDrawRequested: false,
			});
		}).toThrow("Numbers must be between 1 and 90");

		expect(() => {
			new Bingo({
				drawnNumbers: [1, 2, 91],
				isDrawRequested: false,
			});
		}).toThrow("Numbers must be between 1 and 90");
	});

	it("should throw when numbers are not integers", () => {
		expect(() => {
			new Bingo({
				drawnNumbers: [1, 2.5, 3],
				isDrawRequested: false,
			});
		}).toThrow("All numbers must be integers");
	});

	it("should throw when numbers are not in ascending order", () => {
		expect(() => {
			new Bingo({
				drawnNumbers: [3, 1, 2],
				isDrawRequested: false,
			});
		}).toThrow("Numbers must be in ascending order");
	});
});
