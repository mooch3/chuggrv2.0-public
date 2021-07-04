export const findStatus = (bet, user) => {
  if (Date.now() > bet.dueDate * 1000 && !bet.isFinished) {
    return <p style={{ color: 'rgb(226, 152, 68)' }}>Overdue</p>;
  } else if (!bet.isFinished) {
    return <p>Pending</p>;
  } else if (bet.isFinished && bet.outstandingUsers.includes(user)) {
    return <p style={{ color: 'rgb(226, 152, 68)' }}>You Owe Drinks</p>;
  } else if (bet.isFinished && !bet.outstandingUsers.includes(user)) {
    return <p style={{ color: '#ccc' }}>Closed</p>;
  }
};
