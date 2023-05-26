export const convertTime = (value: number) => {
  const date = new Date(value * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const time = String(hours + ":" + (minutes > 9 ? minutes : "0" + minutes));
  return time;
};
