export function isColorLight(hex: string) {
	const hexT = hex.replace("#", "");
	const r = Number.parseInt(hexT.substr(0, 2), 16);
	const g = Number.parseInt(hexT.substr(2, 2), 16);
	const b = Number.parseInt(hexT.substr(4, 2), 16);
	const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
	return hsp > 127.5;
}
