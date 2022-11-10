const oneHour = 60 * 60;

export const formatDuration = (seconds: number) => {
  const dateObj = new Date(seconds * 1000);
  let result = dateObj.toISOString().slice(11, 19);
  if (seconds < oneHour) {
    result = dateObj.toISOString().slice(14, 19);
  }
  return result;
};
