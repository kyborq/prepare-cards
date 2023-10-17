import { ForwardedRef, RefObject, forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { TCard } from "../../atoms";

import styles from "./Card.module.css";
import { IconButton } from "../IconButton";

type Props = {
  card: TCard;
  onClick?: () => void;
  onDelete?: () => void;
};

export const Card = forwardRef(
  ({ card, onClick, onDelete }: Props, ref: ForwardedRef<HTMLDivElement>) => {
    const [isDeleted, setDeleted] = useState(false);
    const [isDragged, setDragged] = useState(false);

    return (
      <motion.div
        className={styles.Container}
        animate={isDeleted && { width: 0 }}
      >
        <motion.div
          onContextMenu={(e) => {
            e.preventDefault();
            onClick && onClick();
          }}
          onClick={() => {
            setDragged(!isDragged);
          }}
          onDoubleClick={onClick}
          initial={{ scale: 0 }}
          animate={{
            scale: isDeleted ? 0 : 1,
            rotateY: isDragged ? 180 : 0,
            zIndex: isDragged ? 1 : 0,
          }}
          dragSnapToOrigin
          onAnimationComplete={() => {
            isDeleted && onDelete && onDelete();
            setDeleted(false);
          }}
          transition={{ power: 0.1 }}
          dragTransition={{ power: 0 }}
          dragConstraints={ref as RefObject<HTMLDivElement>}
          className={styles.Card}
        >
          {!!onDelete && !isDragged && (
            <IconButton
              icon="trash"
              className={styles.Close}
              onClick={() => setDeleted(true)}
            />
          )}
          {!isDragged && <h3 className={styles.Question}>{card.question}</h3>}
          {isDragged && (
            <motion.p className={styles.Answer} animate={{ rotateY: -180 }}>
              {card.answer}
            </motion.p>
          )}
        </motion.div>
      </motion.div>
    );
  }
);
