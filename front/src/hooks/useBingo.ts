import type { Bingo } from "core";
import { useEffect, useState } from "react";
import { bingoRepository } from "../repositories/bingoRepository";

export function useBingo(): Bingo | null {
	const [bingo, setBingo] = useState<Bingo | null>(null);
	useEffect(() => bingoRepository.subscribe(setBingo), []);
	return bingo;
}
