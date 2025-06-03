import { Loto } from "../entities/Loto";

export function createLotoTestData() {
	return {
		empty: () =>
			new Loto({
				drawnNumbers: [],
				isDrawRequested: false,
			}),
		withTwoNumbers: () =>
			new Loto({
				drawnNumbers: [1, 2],
				isDrawRequested: false,
			}),
		withThreeNumbers: () =>
			new Loto({
				drawnNumbers: [1, 2, 3],
				isDrawRequested: false,
			}),
		withDrawRequested: () =>
			new Loto({
				drawnNumbers: [1, 2, 3],
				isDrawRequested: true,
			}),
	};
}
