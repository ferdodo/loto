import React, { useRef, useEffect } from "react";
import { useBingo } from "../hooks/useBingo";
import { useNavigation } from "../hooks/useNavigation";
import { bindEngine } from "../utils/bindEngine";
import { Flashboard } from "./Flashboard";

export function Bingo() {
	const mountPoint = useRef(null);
	const { goToMainMenu } = useNavigation();
	const bingo = useBingo();
	useEffect(() => bindEngine(mountPoint.current, 750, 1500, bingo), [bingo]);

	return (
		<div>
			<button type="button" onClick={goToMainMenu}>
				Retour
			</button>
			<h1>Bingo</h1>
			<div style={{ display: "flex" }}>
				<div
					id="bingoMountPoint"
					style={{
						aspectRatio: "9/12",
						overflow: "hidden",
					}}
					ref={mountPoint}
				/>
				<Flashboard />
			</div>
		</div>
	);
}
