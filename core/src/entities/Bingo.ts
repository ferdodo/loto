export class Bingo {
	readonly drawnNumbers: number[];
	readonly isDrawRequested: boolean;

	constructor(data: {
		drawnNumbers: Bingo["drawnNumbers"];
		isDrawRequested: Bingo["isDrawRequested"];
	}) {
		this.validateData(data);
		this.validateDrawnNumbers(data.drawnNumbers);

		this.drawnNumbers = data.drawnNumbers;
		this.isDrawRequested = data.isDrawRequested;
	}

	private validateData(data: {
		drawnNumbers: number[];
		isDrawRequested: boolean;
	}): void {
		if (!Array.isArray(data.drawnNumbers)) {
			throw new Error("Drawn numbers must be an array");
		}

		if (typeof data.isDrawRequested !== "boolean") {
			throw new Error("isDrawRequested must be a boolean");
		}
	}

	private validateDrawnNumbers(numbers: number[]): void {
		if (numbers.length > 90) {
			throw new Error("Cannot draw more than 90 numbers");
		}

		const uniqueNumbers = new Set(numbers);
		if (uniqueNumbers.size !== numbers.length) {
			throw new Error("There are duplicate numbers");
		}

		if (numbers.some((num) => num < 1 || num > 90)) {
			throw new Error("Numbers must be between 1 and 90");
		}

		if (numbers.some((num) => !Number.isInteger(num))) {
			throw new Error("All numbers must be integers");
		}

		const sortedNumbers = [...numbers].sort((a, b) => a - b);
		if (JSON.stringify(numbers) !== JSON.stringify(sortedNumbers)) {
			throw new Error("Numbers must be in ascending order");
		}
	}
}
