import { describe, expect, it } from "vitest";
import { Bingo } from "../entities/Bingo";
import { createBingoRepository } from "../utils/createBingoRepository";
import { RequestDrawUseCase } from "./RequestDrawUseCase";

describe("RequestDrawUseCase", () => {
	it("should set isDrawRequested to true", async () => {
		const repository = createBingoRepository();
		const useCase = new RequestDrawUseCase(repository);
		const game = new Bingo({
			drawnNumbers: [1, 2, 3],
			isDrawRequested: false,
		});

		let updatedGame: Bingo | undefined;
		repository.subscribe((game: Bingo) => {
			updatedGame = game;
		});

		await useCase.execute(game);

		expect(updatedGame?.isDrawRequested).toBe(true);
		expect(updatedGame?.drawnNumbers).toEqual([1, 2, 3]);
	});
});
