export const createTicks = () => {
  let ticks = 0;

  const setTicks = (newTicks: number) => {
    ticks = newTicks;
    return ticks;
  };

  const increaseTicks = () => {
    ticks = ticks + 1;
    return ticks;
  };

  return {
    ticks: () => ticks,
    setTicks,
    increaseTicks,
  };
};
