import { create } from "zustand";
import { persist } from "zustand/middleware";

enum NavigationState {
	MainMenu = "MAIN_MENU",
	BingoScreen = "BINGO_SCREEN",
	CardGeneratorScreen = "CARD_GENERATOR_SCREEN",
}

interface Navigation {
	state: NavigationState;
	isBingoScreen: () => boolean;
	isCardGeneratorScreen: () => boolean;
	goToMainMenu: () => void;
	goToBingoScreen: () => void;
	goToCardGeneratorScreen: () => void;
}

export const useNavigation = create<Navigation>()(
	persist(
		(set, get) => ({
			state: NavigationState.MainMenu,
			isBingoScreen() {
				return get().state === NavigationState.BingoScreen;
			},
			isCardGeneratorScreen() {
				return get().state === NavigationState.CardGeneratorScreen;
			},
			goToMainMenu() {
				set({ state: NavigationState.MainMenu });
			},
			goToBingoScreen() {
				set({ state: NavigationState.BingoScreen });
			},
			goToCardGeneratorScreen() {
				set({ state: NavigationState.CardGeneratorScreen });
			},
		}),
		{ name: "navigation" },
	),
);
