import React from "react";
import { useNavigation } from "../hooks/useNavigation";
import { Bingo } from "./Bingo";
import { CardGenerator } from "./CardGenerator";
import { Menu } from "./Menu";

export function App() {
	const { isBingoScreen, isCardGeneratorScreen } = useNavigation();

	if (isBingoScreen()) {
		return <Bingo />;
	}

	if (isCardGeneratorScreen()) {
		return <CardGenerator />;
	}

	return <Menu />;
}
