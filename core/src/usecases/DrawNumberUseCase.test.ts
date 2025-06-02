import { describe, expect, it } from "vitest";
import { Loto } from "../entities/Loto";
import { createLotoRepository } from "../utils/createLotoRepository";
import { DrawNumberUseCase } from "./DrawNumberUseCase";

describe("DrawNumberUseCase", () => {
	it("should draw a new number and update the game", async () => {
		const repository = createLotoRepository();
		const game = new Loto({
			drawnNumbers: [1, 2, 3],
			isDrawRequested: true,
		});

		await repository.setLoto(game);

		const useCase = new DrawNumberUseCase(repository);
		await useCase.execute(4);

		const updatedGame = await repository.readLoto();
		expect(updatedGame.drawnNumbers.length).toBe(4);
		expect(updatedGame.isDrawRequested).toBe(false);
		expect(updatedGame.drawnNumbers).toEqual([1, 2, 3, 4]);
	});

	it("should throw when no draw is requested", async () => {
		const repository = createLotoRepository();
		const game = new Loto({
			drawnNumbers: [1, 2, 3],
			isDrawRequested: false,
		});

		await repository.setLoto(game);

		const useCase = new DrawNumberUseCase(repository);
		await expect(useCase.execute(4)).rejects.toThrow("No draw requested");
	});

	it("should throw when all numbers have been drawn", async () => {
		const repository = createLotoRepository();
		const allNumbers = Array.from({ length: 90 }, (_, i) => i + 1);
		const game = new Loto({
			drawnNumbers: allNumbers,
			isDrawRequested: true,
		});

		await repository.setLoto(game);

		const useCase = new DrawNumberUseCase(repository);
		await expect(useCase.execute(91)).rejects.toThrow(
			"All numbers have been drawn",
		);
	});

	it("should throw when number is out of range", async () => {
		const repository = createLotoRepository();
		const game = new Loto({
			drawnNumbers: [1, 2, 3],
			isDrawRequested: true,
		});

		await repository.setLoto(game);

		const useCase = new DrawNumberUseCase(repository);
		await expect(useCase.execute(0)).rejects.toThrow(
			"Number must be between 1 and 90",
		);
		await expect(useCase.execute(91)).rejects.toThrow(
			"Number must be between 1 and 90",
		);
	});

	it("should throw when number is not an integer", async () => {
		const repository = createLotoRepository();
		const game = new Loto({
			drawnNumbers: [1, 2, 3],
			isDrawRequested: true,
		});

		await repository.setLoto(game);

		const useCase = new DrawNumberUseCase(repository);
		await expect(useCase.execute(4.5)).rejects.toThrow(
			"Number must be an integer",
		);
	});

	it("should throw when number has already been drawn", async () => {
		const repository = createLotoRepository();
		const game = new Loto({
			drawnNumbers: [1, 2, 3],
			isDrawRequested: true,
		});

		await repository.setLoto(game);

		const useCase = new DrawNumberUseCase(repository);
		await expect(useCase.execute(2)).rejects.toThrow(
			"Number has already been drawn",
		);
	});
});
