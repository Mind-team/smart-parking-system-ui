import React, { FC, useEffect, useState } from "react";
import { IOptionalSizeable } from "../../utils";
import classes from "./InputField.styles.module.css";
import { useDebounce } from "../../hooks";

export type InputFieldType = "text" | "numbers" | "password";

export type Validator = (value: string) => ValidatorResponse;
export type ValidatorResponse =
  | { isValid: true }
  | { isValid: false; message: string };

// TODO
// mask
// regexp
export interface IInputFiledProps extends IOptionalSizeable {
  readonly type: InputFieldType;
  readonly placeholder?: string;
  readonly valueChanges?: (currentInput: string) => void;
  readonly validators?: Validator[];
  readonly state?: ({
    isValid,
    isTouched,
  }: {
    isValid: boolean;
    isTouched: boolean;
  }) => void;
}

const parseTypeToNative = (type: InputFieldType): string => {
  if (["text", "numbers"].includes(type)) {
    return "text";
  }
  if (type === "password") {
    return "password";
  }
  return "text";
  // throw new Error("Incorrect input filed type " + type);
};

const Styles = {
  control: {
    main: classes.control,
  },
  wrapper: {
    main: classes.wrapper,
    sizes: {
      s: classes.wrapperS,
      m: classes.wrapperM,
      l: classes.wrapperL,
    },
    valid: classes.valid,
    invalid: classes.invalid,
  },
  invalidMessage: {
    main: classes.invalidMessage,
  },
};

export const InputField: FC<IInputFiledProps> = ({
  type,
  size = "m",
  placeholder,
  valueChanges = (value: string) => console.log(value),
  validators = [],
  state,
}) => {
  const nativeInputType = parseTypeToNative(type);
  const [currentInput, setCurrentInput] = useState("");
  const [isValid, setValid] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState("");
  const [isTouched, setTouched] = useState(false);
  const inputAfterDebounce = useDebounce(currentInput, 600);

  useEffect(() => {
    if (inputAfterDebounce === "" && !isTouched) {
      return;
    }
    let validationsResult = true;
    validators?.forEach((validator) => {
      const validatorResponse = validator(inputAfterDebounce);
      if (!validatorResponse.isValid) {
        validationsResult = false;
        setInvalidMessage(validatorResponse.message);
      }
    });
    setValid(validationsResult);
    setTouched(true);
    if (state) {
      state({ isValid: validationsResult, isTouched: true });
    }
  }, [inputAfterDebounce]);

  const styles = {
    wrapper: {
      main: Styles.wrapper.main,
      size: (() => {
        if (size === "s") {
          return Styles.wrapper.sizes.s;
        }
        if (size === "m") {
          return Styles.wrapper.sizes.m;
        }
        if (size === "l") {
          return Styles.wrapper.sizes.l;
        }
      })(),
      valid: Styles.wrapper.valid,
      invalid: Styles.wrapper.invalid,
    },
    control: Styles.control.main,
    invalidMessage: Styles.invalidMessage.main,
  };

  const handleChange = (event: any) => {
    setCurrentInput(event.target.value);
    valueChanges(event.target.value);
  };

  const generateInvalidMessage = () => {
    if (isTouched && !isValid) {
      return invalidMessage === "" ? "Неправильный формат" : invalidMessage;
    }
    return "";
  };

  return (
    <div className={`${styles.control}`}>
      <span className={`${classes.invalidMessage}`}>
        {generateInvalidMessage()}
      </span>
      {/* {isTouched && !isValid && ( */}
      {/*   <span className={`${classes.invalidMessage}`}> */}
      {/*     {invalidMessage === "" ? "Неправильный формат" : invalidMessage} */}
      {/*   </span> */}
      {/* )} */}
      <input
        className={`${styles.wrapper.main} ${styles.wrapper.size} ${
          isTouched && isValid ? styles.wrapper.valid : ""
        } ${isTouched && !isValid ? styles.wrapper.invalid : ""}`}
        type={nativeInputType}
        value={currentInput}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};
