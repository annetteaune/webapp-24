import { z } from "zod";

export const dateString = z
  .string()
  .refine((date) => !isNaN(Date.parse(date)), {
    message: "Ugyldig datoformat",
  });

export const validateDate = (date: string): boolean => {
  return !isNaN(Date.parse(date));
};
