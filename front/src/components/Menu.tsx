import React from "react";
import { useNavigation } from "../hooks/useNavigation";

export function Menu() {
	const { goToBingoScreen, goToCardGeneratorScreen } = useNavigation();

	return (
		<div>
			<button type="button" onClick={goToBingoScreen}>
				Lancer un bingo
			</button>
			<button type="button" onClick={goToCardGeneratorScreen}>
				Generer une carte de joueur
			</button>
		</div>
	);
}
