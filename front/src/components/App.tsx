import React from "react";
import { useNavigation } from "../hooks/useNavigation";
import { CardGenerator } from "./CardGenerator";
import { Loto } from "./Loto";
import { Menu } from "./Menu";
import { Reset } from "./Reset";

export function App() {
	const { isLotoScreen, isCardGeneratorScreen, isResetScreen } =
		useNavigation();

	if (isLotoScreen()) {
		return <Loto />;
	}

	if (isCardGeneratorScreen()) {
		return <CardGenerator />;
	}

	if (isResetScreen()) {
		return <Reset />;
	}

	return <Menu />;
}
