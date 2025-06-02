import React, { useRef, useEffect } from "react";
import { useLoto } from "../hooks/useLoto";
import { useNavigation } from "../hooks/useNavigation";
import { bindEngine } from "../utils/bindEngine";
import { Flashboard } from "./Flashboard";

export function Loto() {
	const mountPoint = useRef(null);
	const { goToMainMenu } = useNavigation();
	const loto = useLoto();
	useEffect(() => bindEngine(mountPoint.current, 750, 1500, loto), [loto]);

	return (
		<div>
			<button type="button" onClick={goToMainMenu}>
				Retour
			</button>
			<h1>Loto</h1>
			<div style={{ display: "flex" }}>
				<div
					id="lotoMountPoint"
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
