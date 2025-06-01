import React, { useMemo } from "react";
import { useBingo } from "../hooks/useBingo";

export function Flashboard() {
	const bingo = useBingo();

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

	if (!bingo) {
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
							border: "1px solid black",
							gridArea: `${i + 1} / ${j + 1}/ ${i + 2} / ${j + 2}`,
							aspectRatio: "1/1",
							display: "grid",
							placeContent: "center",
							fontSize: "1.75em",
						}}
					>
						{num}
					</div>
				)),
			)}

			<div
				style={{
					border: "1px solid black",
					gridArea: "7/6/8/8",
					display: "grid",
					placeContent: "center",
					fontSize: "1.5em",
				}}
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
				}}
			>
				Stop
			</div>
		</div>
	);
}
