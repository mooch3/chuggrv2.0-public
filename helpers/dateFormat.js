export const dateFormat = (date) => {
    return `${new Date(date).getMonth() + 1} / ${new Date(
      date
    ).getUTCDate()} / ${new Date(date).getFullYear()}`;
  };
  