import arrowLeft from "./arrow-left.svg?react";
import arrowRight from "./arrow-right.svg?react";
import menu from "./menu.svg?react";
import user from "./user.svg?react";
import close from "./close.svg?react";
import plus from "./plus.svg?react";
import check from "./check-empty.svg?react";
import checkCompleted from "./check-completed.svg?react";
import checkFilled from "./check-filled.svg?react";
import trash from "./trash.svg?react";
import edit from "./edit.svg?react";
import save from "./save.svg?react";
import open from "./open.svg?react";

export const icons = {
  arrowLeft,
  arrowRight,
  menu,
  user,
  close,
  plus,
  check,
  checkCompleted,
  trash,
  edit,
  checkFilled,
  save,
  open,
};

export type TIcon = keyof typeof icons;
