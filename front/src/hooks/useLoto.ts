import type { Loto } from "core";
import { useEffect, useState } from "react";
import { lotoRepository } from "../repositories/lotoRepository";

export function useLoto(): Loto | null {
	const [loto, setLoto] = useState<Loto | null>(null);
	useEffect(() => lotoRepository.subscribe(setLoto), []);
	return loto;
}
