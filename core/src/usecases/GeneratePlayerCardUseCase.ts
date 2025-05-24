import { PlayerCard } from "../entities";

export class GeneratePlayerCardUseCase {
	async execute(): Promise<PlayerCard> {
		const numbers: (number | null)[][] = Array(3)
			.fill(null)
			.map(() => Array(9).fill(null));

		for (let col = 0; col < 9; col++) {
			const min = col === 0 ? 1 : col * 10;
			const max = col === 8 ? 90 : (col + 1) * 10 - 1;
			const possibleNumbers = Array.from(
				{ length: max - min + 1 },
				(_, i) => i + min,
			);

			for (let i = possibleNumbers.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[possibleNumbers[i], possibleNumbers[j]] = [
					possibleNumbers[j],
					possibleNumbers[i],
				];
			}

			const selectedNumbers = possibleNumbers.slice(0, 3);
			const positions = [0, 1, 2];

			for (let i = 0; i < selectedNumbers.length; i++) {
				const randomIndex = Math.floor(Math.random() * positions.length);
				const position = positions[randomIndex];
				positions.splice(randomIndex, 1);
				numbers[position][col] = selectedNumbers[i];
			}
		}

		for (let row = 0; row < 3; row++) {
			const filledCells = numbers[row].filter((n) => n !== null).length;
			const emptyCells = numbers[row].filter((n) => n === null).length;

			if (emptyCells < 4) {
				const cellsToEmpty = 4 - emptyCells;
				const filledPositions = numbers[row]
					.map((n, i) => (n !== null ? i : -1))
					.filter((i) => i !== -1);

				for (let i = 0; i < cellsToEmpty; i++) {
					const randomIndex = Math.floor(
						Math.random() * filledPositions.length,
					);
					const position = filledPositions[randomIndex];
					filledPositions.splice(randomIndex, 1);
					numbers[row][position] = null;
				}
			}
		}

		return new PlayerCard({ numbers });
	}
}
