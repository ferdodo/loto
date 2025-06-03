import { describe, expect, it } from "vitest";
import { Loto } from "../entities/Loto";
import { createTestLotoRepository } from "../utils/createTestLotoRepository";
import { ResetLotoUseCase } from "./ResetLotoUseCase";

describe("ResetLotoUseCase", () => {
	it("should reset the draw", async () => {
		const repository = createTestLotoRepository();
		const game = new Loto({
			drawnNumbers: [1, 2, 3],
			isDrawRequested: true,
		});

		await repository.setLoto(game);

		const useCase = new ResetLotoUseCase(repository);
		await useCase.execute();

		const updatedGame = await repository.readLoto();
		expect(updatedGame.drawnNumbers).toEqual([]);
		expect(updatedGame.isDrawRequested).toBe(false);
	});
});
