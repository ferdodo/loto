import { describe, expect, it } from "vitest";
import { GeneratePlayerCardUseCase } from "./GeneratePlayerCardUseCase";

describe("GeneratePlayerCardUseCase", () => {
	it("should generate a valid player card", async () => {
		const useCase = new GeneratePlayerCardUseCase();
		const card = await useCase.execute();

		expect(card.numbers).toHaveLength(3);
		expect(card.numbers[0]).toHaveLength(9);
		expect(card.numbers[1]).toHaveLength(9);
		expect(card.numbers[2]).toHaveLength(9);

		for (let row = 0; row < 3; row++) {
			const emptyCells = card.numbers[row].filter((n) => n === null).length;
			expect(emptyCells).toBe(4);
		}

		for (let col = 0; col < 9; col++) {
			const min = col === 0 ? 1 : col * 10;
			const max = col === 8 ? 90 : (col + 1) * 10 - 1;

			for (let row = 0; row < 3; row++) {
				const number = card.numbers[row][col];
				if (number !== null) {
					expect(number).toBeGreaterThanOrEqual(min);
					expect(number).toBeLessThanOrEqual(max);
				}
			}
		}

		const allNumbers = card.numbers
			.flat()
			.filter((n): n is number => n !== null);
		const uniqueNumbers = new Set(allNumbers);
		expect(uniqueNumbers.size).toBe(allNumbers.length);
	});
});
