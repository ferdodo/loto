import type { PlayerCard } from "core";
import React from "react";

export function Card(playerCard: PlayerCard) {
	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "0.3fr repeat(9, 1fr) 0.3fr",
				gridTemplateRows: "0.5fr repeat(3, 1fr) 0.4fr",
				aspectRatio: "662/381",
				gap: "3px",
			}}
		>
			<img
				style={{ gridArea: "1 / 1 / 6 / 12", width: "100%" }}
				alt="Carte de bingo"
				src="./carte.jpg"
			/>

			{playerCard.numbers.map((lines, y) => {
				return lines.map((num, x) => {
					return (
						<div
							key={`${Math.random()}`}
							style={{
								gridArea: `${y + 2} / ${x + 2} / ${y + 3} / ${x + 3}`,
								display: "grid",
								placeContent: "center",
								fontSize: "2em",
							}}
						>
							<span>{num || "-"}</span>
						</div>
					);
				});
			})}
		</div>
	);
}
