import { describe, expect, it } from "vitest";
import type { Loto } from "../entities/Loto";
import { createLotoRepository } from "../utils/createLotoRepository";
import { RequestDrawUseCase } from "./RequestDrawUseCase";

describe("RequestDrawUseCase", () => {
	it("should set isDrawRequested to true", async () => {
		const repository = createLotoRepository();
		const useCase = new RequestDrawUseCase(repository);

		let updatedGame: Loto | undefined;

		repository.subscribe((game: Loto) => {
			updatedGame = game;
		});

		await useCase.execute();
		expect(updatedGame?.isDrawRequested).toBe(true);
	});
});
