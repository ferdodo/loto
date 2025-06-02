import { create } from "zustand";
import { persist } from "zustand/middleware";

enum NavigationState {
	MainMenu = "MAIN_MENU",
	LotoScreen = "BINGO_SCREEN",
	CardGeneratorScreen = "CARD_GENERATOR_SCREEN",
	ResetScreen = "RESET_SCREEN",
}

interface Navigation {
	state: NavigationState;
	isLotoScreen: () => boolean;
	isCardGeneratorScreen: () => boolean;
	isResetScreen: () => boolean;
	goToMainMenu: () => void;
	goToLotoScreen: () => void;
	goToCardGeneratorScreen: () => void;
	goToResetScreen: () => void;
}

export const useNavigation = create<Navigation>()(
	persist(
		(set, get) => ({
			state: NavigationState.MainMenu,
			isLotoScreen() {
				return get().state === NavigationState.LotoScreen;
			},
			isCardGeneratorScreen() {
				return get().state === NavigationState.CardGeneratorScreen;
			},
			isResetScreen() {
				return get().state === NavigationState.ResetScreen;
			},
			goToMainMenu() {
				set({ state: NavigationState.MainMenu });
			},
			goToLotoScreen() {
				set({ state: NavigationState.LotoScreen });
			},
			goToCardGeneratorScreen() {
				set({ state: NavigationState.CardGeneratorScreen });
			},
			goToResetScreen() {
				set({ state: NavigationState.ResetScreen });
			},
		}),
		{ name: "navigation" },
	),
);
