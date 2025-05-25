import { describe, expect, it } from "vitest";
import { Bingo } from "../entities/Bingo";
import { createBingoRepository } from "../utils/createBingoRepository";
import { ResetDrawUseCase } from "./ResetDrawUseCase";

describe("ResetDrawUseCase", () => {
	it("should reset the draw", async () => {
		const repository = createBingoRepository();
		const game = new Bingo({
			drawnNumbers: [1, 2, 3],
			isDrawRequested: true,
		});

		await repository.setBingo(game);

		const useCase = new ResetDrawUseCase(repository);
		await useCase.execute();

		const updatedGame = await repository.readBingo();
		expect(updatedGame.drawnNumbers).toEqual([]);
		expect(updatedGame.isDrawRequested).toBe(false);
	});
});
