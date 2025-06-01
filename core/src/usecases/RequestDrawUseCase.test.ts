import { describe, expect, it } from "vitest";
import type { Bingo } from "../entities/Bingo";
import { createBingoRepository } from "../utils/createBingoRepository";
import { RequestDrawUseCase } from "./RequestDrawUseCase";

describe("RequestDrawUseCase", () => {
	it("should set isDrawRequested to true", async () => {
		const repository = createBingoRepository();
		const useCase = new RequestDrawUseCase(repository);

		let updatedGame: Bingo | undefined;

		repository.subscribe((game: Bingo) => {
			updatedGame = game;
		});

		await useCase.execute();
		expect(updatedGame?.isDrawRequested).toBe(true);
	});
});
