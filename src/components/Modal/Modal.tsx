import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { AnimatePresence, motion } from "framer-motion";

import { IconButton } from "../IconButton";

import styles from "./Modal.module.css";

type Props = {
  title: string;
  isOpened?: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
};

export const Modal: React.FC<Props> = ({
  title,
  isOpened,
  children,
  onClose,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClose = () => onClose && onClose();

  useOnClickOutside(ref, handleClose);

  return (
    <AnimatePresence>
      {isOpened && (
        <motion.div
          className={styles.Overlay}
          initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
          animate={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
          exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
        >
          <motion.div
            ref={ref}
            className={styles.Modal}
            initial={{ translateY: 200, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
          >
            <div className={styles.Header}>
              <h2 className={styles.Title}>{title}</h2>
              <div className={styles.Actions}>
                <IconButton icon="close" onClick={handleClose} />
              </div>
            </div>
            <div className={styles.Content}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
