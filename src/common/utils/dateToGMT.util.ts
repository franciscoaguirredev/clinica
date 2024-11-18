export function dateToGMT(value: any): string {
  const date = new Date(value);
  date.setHours(date.getHours() - 5); // Ajuste de zona horaria
  return date.toISOString().slice(0, 19).replace('T', ' ');
}
