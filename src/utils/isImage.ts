export const isImage = (format: string | undefined): boolean => {
  if (!format) return false;
  return ['.jpg', '.jpeg', '.png'].includes(format);
};
