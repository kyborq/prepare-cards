import { TIcon } from "../../icons/icons";
import { Icon } from "../Icon";

import styles from "./Button.module.css";

type Props = {
  text?: string;
  icon?: TIcon;
  onClick?: () => void;
};

export const Button: React.FC<Props> = ({ text, icon, onClick }) => {
  return (
    <button className={styles.Button} onClick={onClick}>
      {!!text && <span className={styles.Label}>{text}</span>}
      {!!icon && <Icon name={icon} className={styles.Icon} />}
    </button>
  );
};
