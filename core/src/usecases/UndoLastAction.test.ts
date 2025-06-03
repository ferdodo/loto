import { describe, expect, it } from "vitest";
import { LotoHistoryRepository } from "../repositories/LotoHistoryRepository";
import { createLotoTestData } from "../utils/createLotoTestData";
import { createTestLotoRepository } from "../utils/createTestLotoRepository";
import { UndoLastAction } from "./UndoLastAction";

describe("UndoLastAction", () => {
	it("should throw an error when there is no previous state", async () => {
		const testRepository = createTestLotoRepository();
		const historyRepository = new LotoHistoryRepository(testRepository);
		const undoLastAction = new UndoLastAction(
			testRepository,
			historyRepository,
		);

		await expect(undoLastAction.execute()).rejects.toThrow(
			"Cannot undo: no previous state available",
		);
	});

	it("should restore the previous state when available", async () => {
		const testData = createLotoTestData();
		const testRepository = createTestLotoRepository();
		const historyRepository = new LotoHistoryRepository(testRepository);
		const undoLastAction = new UndoLastAction(
			testRepository,
			historyRepository,
		);

		await testRepository.setLoto(testData.empty());
		await testRepository.setLoto(testData.withTwoNumbers());
		await testRepository.setLoto(testData.withThreeNumbers());

		await undoLastAction.execute();

		const finalState = await testRepository.readLoto();
		expect(finalState).toEqual(testData.withTwoNumbers());
	});
});
