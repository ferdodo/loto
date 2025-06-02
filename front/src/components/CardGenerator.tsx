import { GeneratePlayerCardUseCase } from "core";
import type { PlayerCard } from "core";
import html2canvas from "html2canvas";
import React, { useCallback, useState, useRef } from "react";
import type { ChangeEvent } from "react";
import { useNavigation } from "../hooks/useNavigation";
import { Card } from "./Card";

export function CardGenerator() {
	const { goToMainMenu } = useNavigation();
	const screenshotableElement = useRef(null);

	const [playerCard, setPlayerCard] = useState<PlayerCard | null>(null);
	const [pseudo, setPseudo] = useState<string>("");

	async function changePseudo(e: ChangeEvent<HTMLInputElement>) {
		setPseudo(e.target.value);

		if (!pseudo) {
			const value = await new GeneratePlayerCardUseCase().execute();
			setPlayerCard(value);
		}
	}

	const saveCard = useCallback(async () => {
		if (!screenshotableElement.current) {
			return;
		}

		const canvas = await html2canvas(screenshotableElement.current);
		const image = canvas.toDataURL("image/png");

		const link = document.createElement("a");
		link.href = image;
		link.download = `loto_card_${pseudo}.png`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}, [pseudo]);

	return (
		<div>
			<button type="button" onClick={goToMainMenu}>
				Retour
			</button>
			<h1>Generer une carte de joueur</h1>

			<div
				ref={screenshotableElement}
				style={{
					backgroundColor: "#8ea741",
					maxWidth: "50rem",
				}}
			>
				<div
					style={{
						display: "grid",
						placeContent: "start",
						gap: "1rem",
						padding: "2rem",
						paddingBottom: playerCard ? "0rem" : "2rem",
					}}
				>
					<label htmlFor="pseudoInput">Nom:</label>
					<input
						id="pseudoInput"
						type="text"
						value={pseudo}
						onChange={changePseudo}
					/>
				</div>

				{playerCard && pseudo && <div>{Card(playerCard)}</div>}
			</div>

			{screenshotableElement && playerCard && pseudo && (
				<button type="button" onClick={saveCard}>
					Enregistrer la carte
				</button>
			)}
		</div>
	);
}
