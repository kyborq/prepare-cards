import { TIcon, icons } from "../icons/icons";

type Props = {
  name: TIcon;
  fill?: string;
  className?: string;
  onClick?: () => void;
};

export const Icon: React.FC<Props> = ({ name, className, fill, onClick }) => {
  const IconComponent = icons[name];
  return (
    <IconComponent
      fill={fill}
      className={className}
      onClick={(e) => {
        e.stopPropagation();
        onClick && onClick();
      }}
    />
  );
};
