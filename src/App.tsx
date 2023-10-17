import { useForm } from "react-hook-form";
import { useAtom } from "jotai";

import { CardsContainer } from "./containers";
import { Button } from "./components/Button";
import { Panel } from "./components/Panel";
import { Field, MultilineField } from "./components/Field";
import { useSwitcher } from "./hooks/useSwitcher";
import { TCard, cardsAtom } from "./atoms";

import styles from "./App.module.css";
import { uuid4 } from "./utils/uuid4";
import { IconButton } from "./components/IconButton";

type NewCardForm = {
  question: string;
  answer: string;
};

function App() {
  const { register, handleSubmit, reset } = useForm<NewCardForm>();

  const [cards, setCards] = useAtom(cardsAtom);
  const newCard = useSwitcher();

  const handleCreate = handleSubmit(({ answer, question }) => {
    const card: TCard = {
      id: uuid4(),
      ready: false,
      answer,
      question,
    };
    const newCards = [...cards, card];

    setCards(newCards);
    newCard.toggleOff();
    reset();
  });

  const onOpen = () => {
    const fileInputNode = document.createElement("input");
    fileInputNode.type = "file";
    fileInputNode.accept = ".json";
    fileInputNode.click();
    fileInputNode.addEventListener("change", () => {
      const file = fileInputNode.files?.[0] as File;

      const dataStr = window.URL.createObjectURL(file);

      fetch(dataStr)
        .then((response) => response.json())
        .then((json) => {
          setCards(json);
        });
    });
  };

  const onSave = () => {
    const toJSON = JSON.stringify(cards);
    const encodedObject = encodeURIComponent(toJSON);
    const dataStr = `data:text/json;charset=utf-8,${encodedObject}`;

    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "file.json");
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className={styles.App}>
      <div className={styles.Header}>
        <div className={styles.HeaderContainer}>
          <h1 className={styles.Logo}>Карточки</h1>
          <div className={styles.Actions}>
            <div className={styles.Buttons}>
              <IconButton icon="open" onClick={onOpen} />
              <IconButton icon="save" onClick={onSave} />
            </div>
            <Button icon="plus" text="Добавить" onClick={newCard.toggleOn} />
          </div>
        </div>
      </div>

      <div className={styles.Page}>
        <CardsContainer />
      </div>

      <Panel
        side="right"
        title="Новая карточка"
        isOpened={newCard.toggled}
        onClose={newCard.toggleOff}
      >
        <form onSubmit={handleCreate} className={styles.Form}>
          <Field label="Вопрос" {...register("question")} />
          <MultilineField label="Ответ" {...register("answer")} />
          <Button icon="plus" text="Сохранить" />
        </form>
      </Panel>
    </div>
  );
}

export default App;
