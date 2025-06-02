import React from "react";
import { useNavigation } from "../hooks/useNavigation";

export function Menu() {
	const { goToLotoScreen, goToCardGeneratorScreen, goToResetScreen } =
		useNavigation();

	return (
		<div>
			<button type="button" onClick={goToLotoScreen}>
				Lancer un loto
			</button>
			<button type="button" onClick={goToCardGeneratorScreen}>
				Generer une carte de joueur
			</button>
			<button type="button" onClick={goToResetScreen}>
				Reinitialisation
			</button>
		</div>
	);
}
