import { describe, expect, it } from "vitest";
import { createLotoHistoryRepository } from "../repositories/createLotoHistoryRepository";
import { createTestLotoRepository } from "../utils/createTestLotoRepository";
import { ResetLotoUseCase } from "./ResetLotoUseCase";

describe("ResetLotoUseCase", () => {
	it("should reset the game and clear history", async () => {
		const testRepository = createTestLotoRepository();
		const historyRepository = createLotoHistoryRepository(testRepository);
		const resetLoto = new ResetLotoUseCase(testRepository, historyRepository);
		await resetLoto.execute();
		const game = await testRepository.readLoto();
		expect(game.drawnNumbers).toEqual([]);
		expect(game.isDrawRequested).toBe(false);
		expect(historyRepository.getHistory()).toEqual([]);
	});
});
