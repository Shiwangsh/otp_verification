import { ChangeEvent, KeyboardEvent, ClipboardEvent } from "react";

export const handleInputChange = (
  index: number,
  event: ChangeEvent<HTMLInputElement>,
  inputRefs: (HTMLInputElement | null)[],
  numDigits: number,
  setInputValues: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const value = event.target.value;
  // only single digits are entered
  if (value.length > 1) {
    event.target.value = "";
    return;
  }

  // Move focus to the next input if available
  if (value.length === 1 && index < numDigits - 1) {
    inputRefs[index + 1]?.focus();
  }

  const newValues = [...inputRefs.map((ref) => ref?.value || "")];
  newValues[index] = value;
  setInputValues(newValues);
};

export const handleBackspace = (
  index: number,
  event: KeyboardEvent<HTMLInputElement>,
  inputRefs: (HTMLInputElement | null)[],
  setInputValues: React.Dispatch<React.SetStateAction<string[]>>
) => {
  if (event.key === "Backspace") {
    event.preventDefault();

    // Move focus to the previous input if available
    if (index > 0 && inputRefs[index - 1]) {
      inputRefs[index - 1]?.focus();
    }

    // Clear the current input field
    if (inputRefs[index]) {
      inputRefs[index]!.value = "";
      const newValues = [...inputRefs.map((ref) => ref?.value || "")];
      newValues[index] = "";
      setInputValues(newValues);
    }
  }
};

export const handlePaste = (
  event: ClipboardEvent<HTMLFormElement>,
  inputRefs: (HTMLInputElement | null)[],
  numDigits: number,
  setInputValues: React.Dispatch<React.SetStateAction<string[]>>
) => {
  event.preventDefault();
  const pasteData = event.clipboardData?.getData("text/plain");
  const digits = pasteData?.replace(/\D/g, "").split("").slice(0, numDigits);

  digits?.forEach((digit, index) => {
    if (inputRefs[index]) {
      inputRefs[index]!.value = digit;
      inputRefs[index]!.focus();

      const newValues = [...inputRefs.map((ref) => ref?.value || "")];
      newValues[index] = digit;
      setInputValues(newValues);
    }
  });
};
