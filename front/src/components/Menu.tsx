import React from "react";
import { useNavigation } from "../hooks/useNavigation";

export function Menu() {
	const { goToBingoScreen, goToCardGeneratorScreen } = useNavigation();

	return (
		<div>
			<button type="button" onClick={goToBingoScreen}>
				Bingo
			</button>
			<button type="button" onClick={goToCardGeneratorScreen}>
				Card generator
			</button>
		</div>
	);
}
