export const getDynamicBgColor = (id: number) => {
  const hue = (id * 137.508) % 360;
  return `hsla(${hue}, 65%, 30%, 0.25)`;
};

export const getDynamicTextColor = (id: number) => {
  const hue = (id * 137.508) % 360;
  return `hsla(${hue}, 70%, 25%, 1)`;
};

export const getAlbumTheme = (index: number) => ({
  bg: getDynamicBgColor(index),
  text: getDynamicTextColor(index),
});

export const getInitials = (name?: string) =>
  name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "AL";
