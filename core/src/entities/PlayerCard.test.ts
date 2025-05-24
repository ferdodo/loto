import { describe, expect, it } from "vitest";
import { PlayerCardTestFactory } from "./PlayerCardTestFactory";

describe("PlayerCard", () => {
	it("should create a valid player card", () => {
		const card = PlayerCardTestFactory.createValid();
		expect(card.numbers).toHaveLength(3);
		expect(card.numbers[0]).toHaveLength(9);
		expect(card.numbers[1]).toHaveLength(9);
		expect(card.numbers[2]).toHaveLength(9);
	});

	it("should throw when numbers is not an array", () => {
		expect(() => {
			PlayerCardTestFactory.createWithInvalidType();
		}).toThrow("Numbers must be an array");
	});

	it("should throw when there are not exactly 3 rows", () => {
		expect(() => {
			PlayerCardTestFactory.createWithInvalidRowCount();
		}).toThrow("Card must have exactly 3 rows");
	});

	it("should throw when there are not exactly 9 columns", () => {
		expect(() => {
			PlayerCardTestFactory.createWithInvalidColumnCount();
		}).toThrow("Each row must have exactly 9 columns");
	});

	it("should throw when numbers are not in the correct range for their column", () => {
		expect(() => {
			PlayerCardTestFactory.createWithInvalidNumberRange();
		}).toThrow("Number 2 in column 2 must be between 10 and 19");
	});

	it("should throw when there are duplicate numbers", () => {
		expect(() => {
			PlayerCardTestFactory.createWithDuplicateNumbers();
		}).toThrow("There are duplicate numbers");
	});

	it("should throw when there are not exactly 12 empty cells", () => {
		expect(() => {
			PlayerCardTestFactory.createWithInvalidTotalEmptyCells();
		}).toThrow("Card must have exactly 12 empty cells");
	});

	it("should throw when a row has less than 4 empty cells", () => {
		expect(() => {
			PlayerCardTestFactory.createWithTooFewEmptyCellsInRow();
		}).toThrow("Each row must have between 3 and 5 empty cells");
	});

	it("should throw when a row has more than 5 empty cells", () => {
		expect(() => {
			PlayerCardTestFactory.createWithTooManyEmptyCellsInRow();
		}).toThrow("Each row must have between 3 and 5 empty cells");
	});
});
