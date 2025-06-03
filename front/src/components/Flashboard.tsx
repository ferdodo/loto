import { DrawNumberUseCase, RequestDrawUseCase, UndoLastAction } from "core";
import React, { useMemo } from "react";
import { useLoto } from "../hooks/useLoto";
import { lotoHistoryRepository } from "../repositories/lotoHistoryRepository";
import { lotoRepository } from "../repositories/lotoRepository";

export function Flashboard() {
	const loto = useLoto();

	const groups: number[][] = useMemo(() => {
		const _groups = [];
		for (let i = 1; i <= 90; i += 15) {
			const group: number[] = [];
			for (let j = i; j < i + 15 && j <= 90; j++) {
				group.push(j);
			}
			_groups.push(group);
		}
		return _groups;
	}, []);

	function requestDraw() {
		new RequestDrawUseCase(lotoRepository).execute();
	}

	function drawNumber(num: number) {
		new DrawNumberUseCase(lotoRepository).execute(num);
	}

	function lotoHasNumber(num: number): boolean {
		return loto?.drawnNumbers.includes(num) || false;
	}

	async function undoLastAction() {
		await new UndoLastAction(lotoRepository, lotoHistoryRepository).execute();
	}

	if (!loto) {
		return null;
	}

	return (
		<div
			style={{
				display: "grid",
				gap: "1rem",
				gridTemplateColumns: "repeat(15, 1fr) 1fr",
				gridTemplateRows: "repeat(6, 1fr) 1fr 1fr",
				flexGrow: "1",
			}}
		>
			{groups.map((group, i) =>
				group.map((num, j) => (
					<div
						key={num}
						style={{
							border: lotoHasNumber(num)
								? "1mm solid white"
								: "1px solid black",
							gridArea: `${i + 1} / ${j + 1}/ ${i + 2} / ${j + 2}`,
							aspectRatio: "1/1",
							display: "grid",
							placeContent: "center",
							fontSize: "1.75em",
							userSelect: "none",
						}}
						onClick={() => drawNumber(num)}
						onKeyUp={() => drawNumber(num)}
					>
						{num}
					</div>
				)),
			)}

			<div
				style={{
					border: loto.isDrawRequested ? "1mm solid white" : "1px solid black",
					gridArea: "7/6/8/8",
					display: "grid",
					placeContent: "center",
					fontSize: "1.5em",
					userSelect: "none",
				}}
				onClick={requestDraw}
				onKeyUp={requestDraw}
			>
				Go !
			</div>
			<div
				style={{
					border: "1px solid black",
					gridArea: "7/8/8/10",
					display: "grid",
					placeContent: "center",
					fontSize: "1.5em",
					userSelect: "none",
				}}
				onClick={undoLastAction}
				onKeyUp={undoLastAction}
			>
				Annuler
			</div>
		</div>
	);
}
