import { atomWithStorage } from "jotai/utils";

export type TCard = {
  id: string;
  question: string;
  answer: string;
  ready?: boolean;
};

export const cardsAtom = atomWithStorage<TCard[]>("cards", []);
