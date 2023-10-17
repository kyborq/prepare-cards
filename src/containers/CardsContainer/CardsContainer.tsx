import { useRef, useState } from "react";
import { useAtom } from "jotai";

import { Card } from "../../components/Card";
import { Modal } from "../../components/Modal";
import { TCard, cardsAtom } from "../../atoms";

import styles from "./CardsContainer.module.css";

export const CardsContainer = () => {
  const [selectedCard, setCard] = useState<TCard | null>(null);
  const [cards, setCards] = useAtom(cardsAtom);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleDelete = (id: string) => {
    const newCards = cards.filter((card) => card.id !== id);
    setCards(newCards);
  };

  return (
    <div className={styles.Content} ref={containerRef}>
      {cards.map((card, index) => (
        <Card
          key={`${card.id}.${index}`}
          ref={containerRef}
          onClick={() => setCard(card)}
          card={card}
          onDelete={() => handleDelete(card.id)}
        />
      ))}

      <Modal
        title={selectedCard?.question || "Информация"}
        isOpened={!!selectedCard}
        onClose={() => setCard(null)}
      >
        {!!selectedCard && <p className={styles.Info}>{selectedCard.answer}</p>}
      </Modal>
    </div>
  );
};
