import { describe, expect, it } from "vitest";
import { createLotoHistoryRepository } from "../repositories/createLotoHistoryRepository";
import { createLotoTestData } from "../utils/createLotoTestData";
import { createTestLotoRepository } from "../utils/createTestLotoRepository";
import { DrawNumberUseCase } from "./DrawNumberUseCase";
import { RequestDrawUseCase } from "./RequestDrawUseCase";
import { UndoLastAction } from "./UndoLastAction";

describe("UndoLastAction", () => {
	it("should throw an error when there is no previous state", async () => {
		const testRepository = createTestLotoRepository();
		const historyRepository = createLotoHistoryRepository(testRepository);
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
		const historyRepository = createLotoHistoryRepository(testRepository);
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

	it("should be able to undo multiple actions", async () => {
		const testData = createLotoTestData();
		const testRepository = createTestLotoRepository();
		const historyRepository = createLotoHistoryRepository(testRepository);
		const undoLastAction = new UndoLastAction(
			testRepository,
			historyRepository,
		);

		await testRepository.setLoto(testData.empty());
		await testRepository.setLoto(testData.withTwoNumbers());
		await testRepository.setLoto(testData.withThreeNumbers());

		await undoLastAction.execute();
		await undoLastAction.execute();

		const finalState = await testRepository.readLoto();
		expect(finalState).toEqual(testData.empty());
	});

	it("should be able to undo real game actions", async () => {
		const testRepository = createTestLotoRepository();
		const historyRepository = createLotoHistoryRepository(testRepository);
		const undoLastAction = new UndoLastAction(
			testRepository,
			historyRepository,
		);
		const requestDraw = new RequestDrawUseCase(testRepository);
		const drawNumber = new DrawNumberUseCase(testRepository);
		await testRepository.setLoto(createLotoTestData().empty());
		await requestDraw.execute();
		await drawNumber.execute(1);
		await requestDraw.execute();
		await drawNumber.execute(2);
		await requestDraw.execute();
		await drawNumber.execute(3);
		await undoLastAction.execute();
		await undoLastAction.execute();
		const finalState = await testRepository.readLoto();
		expect(finalState.drawnNumbers).toEqual([1]);
	});
});
