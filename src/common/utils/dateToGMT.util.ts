export function dateToGMT(value: any): string {
  const date = new Date(value);
  date.setHours(date.getHours() - 5);
  const formattedDate =  date.toISOString().slice(0, 19).replace('T', ' '); 
  return formattedDate
}
