export const convertPercentageToColor = (factor: number) => {
  const h = 0 + 125 * factor;

  return `hsl(${h}, 100%, 50%)`;
};
