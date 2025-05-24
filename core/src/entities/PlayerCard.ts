export class PlayerCard {
	readonly numbers: (number | null)[][];

	constructor(data: { numbers: (number | null)[][] }) {
		this.validateData(data);
		this.numbers = data.numbers;
	}

	private validateData(data: { numbers: (number | null)[][] }): void {
		if (!Array.isArray(data.numbers)) {
			throw new Error("Numbers must be an array");
		}

		if (data.numbers.length !== 3) {
			throw new Error("Card must have exactly 3 rows");
		}

		if (data.numbers.some((row) => !Array.isArray(row) || row.length !== 9)) {
			throw new Error("Each row must have exactly 9 columns");
		}

		const allNumbers = data.numbers
			.flat()
			.filter((n): n is number => n !== null);
		const uniqueNumbers = new Set(allNumbers);
		if (uniqueNumbers.size !== allNumbers.length) {
			throw new Error("There are duplicate numbers");
		}

		for (let col = 0; col < 9; col++) {
			const min = col === 0 ? 1 : col * 10;
			const max = col === 8 ? 90 : (col + 1) * 10 - 1;

			for (let row = 0; row < 3; row++) {
				const number = data.numbers[row][col];
				if (number !== null && (number < min || number > max)) {
					throw new Error(
						`Number ${number} in column ${col + 1} must be between ${min} and ${max}`,
					);
				}
			}
		}

		const emptyCellsPerRow = data.numbers.map(
			(row) => row.filter((n) => n === null).length,
		);
		if (emptyCellsPerRow.some((count) => count < 3 || count > 5)) {
			throw new Error("Each row must have between 3 and 5 empty cells");
		}

		const totalEmptyCells = data.numbers.reduce(
			(sum, row) => sum + row.filter((n) => n === null).length,
			0,
		);
		if (totalEmptyCells !== 12) {
			throw new Error("Card must have exactly 12 empty cells");
		}
	}
}
