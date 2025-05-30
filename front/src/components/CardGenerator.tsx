import { GeneratePlayerCardUseCase } from "core";
import type { PlayerCard } from "core";
import React, { useState } from "react";
import { useNavigation } from "../hooks/useNavigation";

export function CardGenerator() {
	const { goToMainMenu } = useNavigation();
	const [playerCard, setPlayerCard] = useState<PlayerCard | null>(null);

	async function generateCard() {
		const value = await new GeneratePlayerCardUseCase().execute();
		setPlayerCard(value);
	}

	return (
		<div>
			<h1>Card generator</h1>
			<button type="button" onClick={goToMainMenu}>
				Retour
			</button>
			<button type="button" onClick={generateCard}>
				Generate Card
			</button>

			{playerCard && JSON.stringify(playerCard)}
		</div>
	);
}
