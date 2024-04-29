export const formatDate = (date: number): string => {
  const dateObj = new Date(date * 1000);
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObj.getDate().toString().padStart(2, "0");
  return `${day}.${month}.${year}`;
};
