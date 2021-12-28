import { parseJSON } from 'date-fns';

const getRemainingTime = (endTime: string | Date) => {
  if (typeof endTime === 'string') {
    endTime = parseJSON(endTime);
  }
  const milliseconds = endTime.getTime() - new Date().getTime();
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
  const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
  const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
  const isFinished = milliseconds <= 0;

  return { isFinished, seconds, minutes, hours, days, remainingInMs: milliseconds };
};

export const TimeUtils = { getRemainingTime };
