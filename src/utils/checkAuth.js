export default user => {
  if (!user) throw new Error('Invalid token');
  return user;
};
