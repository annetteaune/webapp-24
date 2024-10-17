import { FormEvent } from "react";

// oppdaterer inputfelt
export const handleInputChange =
  (setter: (value: string) => void) =>
  (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const input = event.target as HTMLInputElement | HTMLTextAreaElement | null;
    if (!input) return;
    setter(input.value);
  };
