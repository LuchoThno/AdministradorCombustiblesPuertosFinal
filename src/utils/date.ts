import { format, isAfter, isBefore, addDays } from 'date-fns';

export const formatDate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

export const formatDateTime = (date: Date): string => {
  return format(date, 'yyyy-MM-dd HH:mm');
};

export const isExpiringSoon = (date: Date, daysThreshold = 30): boolean => {
  const threshold = addDays(new Date(), daysThreshold);
  return isBefore(date, threshold) && isAfter(date, new Date());
};

export const isExpired = (date: Date): boolean => {
  return isBefore(date, new Date());
};