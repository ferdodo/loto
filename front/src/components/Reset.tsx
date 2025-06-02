import { ResetLotoUseCase } from "core";
import React from "react";
import { useNavigation } from "../hooks/useNavigation";
import { lotoRepository } from "../repositories/lotoRepository";

export function Reset() {
	const { goToMainMenu, goToLotoScreen } = useNavigation();

	async function resetBingo() {
		await new ResetLotoUseCase(lotoRepository).execute();
		goToLotoScreen();
	}

	return (
		<>
			<button type="button" onClick={goToMainMenu}>
				Retour
			</button>
			<button type="button" onClick={resetBingo}>
				Reinitialiser le loto
			</button>
		</>
	);
}
