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
			<pre>
				{w} {h}
			</pre>
			<div
				style={{
					width: "750px",
					aspectRatio: "9/12",
					overflow: "hidden",
					border: "2px solid yellow",
				}}
				ref={mountPoint}
			/>
		</div>
	);
}
