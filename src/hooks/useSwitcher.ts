import { useState } from "react";

export const useSwitcher = () => {
  const [toggled, setToggled] = useState(false);

  const toggleOn = () => setToggled(true);
  const toggleOff = () => setToggled(false);

  return { toggled, toggleOn, toggleOff };
};
