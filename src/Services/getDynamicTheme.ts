export const getDynamicBgColor = (id: number) => {
  const hue = (id * 137.508) % 360;
  return `hsla(${hue}, 65%, 30%, 0.25)`;
};

export const getDynamicTextColor = (id: number) => {
  const hue = (id * 137.508) % 360;
  return `hsla(${hue}, 70%, 25%, 1)`;
};
