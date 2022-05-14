import { SetStateAction } from "react";
import { useState } from "react";

export interface IUseUpgradedStateReturn<T> {
  value: T;
  setValue: (fn: SetStateAction<T>, changeLoading?: boolean) => void;
  isLoading: boolean;
  setLoading: (value: boolean) => void;
  toggleLoading: () => void;
  isError: boolean;
  serError: (value: boolean) => void;
  toggleError: () => void;
}

export const useUpgradedState = <T>(
  initialValue?: T | (() => T),
): IUseUpgradedStateReturn<T> => {
  const [_value, _setValue] = initialValue
    ? useState<T>(initialValue)
    : useState<T>();
  const [_isValueLoading, _setValueLoading] = useState(true);
  const [_isValueError, _setValueError] = useState(false);

  const setValue = (fn: SetStateAction<T>, changeLoading = true) => {
    // @ts-ignore
    _setValue(fn);
    if (changeLoading) {
      _setValueLoading(false);
    }
  };

  const toggle = (entity: "loading" | "error") => {
    if (entity === "loading") {
      _setValueLoading(!_isValueLoading);
    }
    if (entity === "error") {
      _setValueError(!_isValueError);
    }
  };

  return {
    // @ts-ignore
    value: _value,
    setValue,
    isLoading: _isValueLoading,
    setLoading: _setValueLoading,
    toggleLoading: toggle.bind(null, "loading"),
    isError: _isValueError,
    serError: _setValueError,
    toggleError: toggle.bind(null, "error"),
  };
};
