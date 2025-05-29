import React from "react";
import { useNavigation } from "../hooks/useNavigation";

export function CardGenerator() {
	const { goToMainMenu } = useNavigation();

	return (
		<div>
			<h1>Card generator</h1>
			<button type="button" onClick={goToMainMenu}>
				Retour
			</button>
		</div>
	);
}
