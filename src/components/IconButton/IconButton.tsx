import { TIcon } from "../../icons/icons";
import { Icon } from "../Icon";

import styles from "./IconButton.module.css";

type Props = {
  icon: TIcon;
  color?: string;
  className?: string;
  onClick?: () => void;
};

export const IconButton: React.FC<Props> = ({
  icon,
  color,
  className,
  onClick,
}) => {
  return (
    <Icon
      name={icon}
      fill={color}
      className={className || styles.Icon}
      onClick={onClick}
    />
  );
};
