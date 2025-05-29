import { GeneratePlayerCardUseCase, createBingoRepository } from "core";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/App";

const bingoRepository = createBingoRepository();

bingoRepository.readBingo().then((bingo) => console.log({ bingo }));

new GeneratePlayerCardUseCase()
	.execute()
	.then((playerCard) => console.log({ playerCard }));

const div = document.getElementById("root");

if (!div) {
	throw new Error("#root not found !");
}

const root = ReactDOM.createRoot(div);

root.render(<App />);
