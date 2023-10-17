import { ChangeEventHandler, Ref, forwardRef } from "react";
import { classNames } from "../../utils/classNames";
import styles from "./Field.module.css";

type FieldProps = {
  label: string;
  name?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

export const Field = forwardRef(
  ({ label, name, onChange }: FieldProps, ref: Ref<HTMLInputElement>) => {
    return (
      <div className={styles.Field}>
        <span className={styles.Label}>{label}</span>
        <input
          ref={ref}
          className={styles.Input}
          name={name}
          autoComplete="off"
          onChange={onChange}
        />
      </div>
    );
  }
);

type MultilineFieldProps = {
  label: string;
  name?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
};

export const MultilineField = forwardRef(
  (
    { label, name, onChange }: MultilineFieldProps,
    ref: Ref<HTMLTextAreaElement>
  ) => {
    return (
      <div className={classNames(styles.Field, styles.Fill)}>
        <span className={styles.Label}>{label}</span>
        <textarea
          ref={ref}
          className={styles.Input}
          name={name}
          onChange={onChange}
          autoComplete="off"
        />
      </div>
    );
  }
);
