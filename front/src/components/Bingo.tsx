import React, { useRef, useEffect } from "react";
import { useElementSize } from "../hooks/useElementSize";
import { useNavigation } from "../hooks/useNavigation";
import { bindEngine } from "../utils/bindEngine";

export function Bingo() {
	const mountPoint = useRef(null);
	const { goToMainMenu } = useNavigation();
	const { w, h } = useElementSize(mountPoint);
	useEffect(() => bindEngine(mountPoint.current, w, h), [w, h]);

	return (
		<div>
			<button type="button" onClick={goToMainMenu}>
				Retour
			</button>
			<h1>Le bingo</h1>
			<div
				style={{
					aspectRatio: "16/9",
					width: "100%",
					overflow: "hidden",
				}}
				ref={mountPoint}
			/>
		</div>
	);
}
