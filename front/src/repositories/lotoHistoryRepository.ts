import { LotoHistoryRepository } from "core";
import { lotoRepository } from "./lotoRepository";

export const lotoHistoryRepository = new LotoHistoryRepository(lotoRepository);
