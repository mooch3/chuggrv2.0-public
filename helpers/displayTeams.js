export const displayTeams = (users) => {
  return Object.keys(users)
    .map((name) => users[name])
    .join(", ");
};
