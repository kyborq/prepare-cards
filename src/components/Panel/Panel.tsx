import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { AnimatePresence, motion } from "framer-motion";

import { IconButton } from "../IconButton";

import styles from "./Panel.module.css";

type TOptional = {
  [key: string]: any;
};

type Props = {
  title: string;
  side: "left" | "right";
  isOpened?: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
};

export const Panel: React.FC<Props> = ({
  title,
  side,
  children,
  isOpened,
  onClose,
}) => {
  const [ready, setReady] = useState(false);

  const appearanceStyle: TOptional = {
    left: { justifyContent: "flex-start" },
    right: { justifyContent: "flex-end" },
  };

  const appearanceSide: TOptional = {
    left: "-100%",
    right: "100%",
  };

  const ref = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    if (ready) {
      onClose && onClose();
    }
  };

  useOnClickOutside(ref, handleClose);

  return (
    <AnimatePresence>
      {isOpened && (
        <motion.div
          className={styles.Overlay}
          style={appearanceStyle[side]}
          initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
          animate={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
          exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
        >
          <motion.div
            ref={ref}
            className={styles.Panel}
            initial={{ translateX: appearanceSide[side] }}
            animate={{ translateX: 0 }}
            exit={{ translateX: appearanceSide[side] }}
            transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
            onAnimationComplete={() => setReady(true)}
          >
            <div className={styles.Header}>
              <h2 className={styles.Title}>{title}</h2>
              <IconButton icon="close" onClick={handleClose} />
            </div>
            <div className={styles.Content}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
