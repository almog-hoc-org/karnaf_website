/** Israeli phone validation for lead forms. Accepts 05X-XXXXXXX styles
 * (with spaces/dashes) and the +972 / 972 international prefix. */
export function isValidIsraeliPhone(raw: string): boolean {
  const digits = raw.replace(/[\s\-().]/g, "");
  return /^(?:\+?972|0)(?:[23489]\d{7}|5\d{8}|7\d{8})$/.test(digits);
}

export const PHONE_ERROR_MESSAGE = "מספר הטלפון לא נראה תקין — בדקו ונסו שוב";
