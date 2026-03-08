const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

export const toIST = (date: Date): Date => {
  const utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
  return new Date(utc + IST_OFFSET_MS);
};

export const formatISTTime = (date: Date): string => {
  const ist = toIST(date);
  return ist.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};

export const formatISTDate = (date: Date): string => {
  const ist = toIST(date);
  return ist.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const getISTHHMM = (date: Date): string => {
  const ist = toIST(date);
  return `${String(ist.getHours()).padStart(2, "0")}:${String(ist.getMinutes()).padStart(2, "0")}`;
};
