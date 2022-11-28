const users = [];

export const addUser = (id) => {
  users.push(id);
  return id;
};

export const removeUser = (id) => {
  let index = users.findIndex((obj) => obj === id);
  if (index !== -1) users.splice(index, 1);
};

export const getAllUser = () => {
  return users;
};
