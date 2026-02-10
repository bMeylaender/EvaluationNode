const prisma = require("../config/prisma-client");

const findUserByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
};

const addUser = async (userData) => {
  const newUser = await prisma.user.create({
    data: userData,
  });

  return newUser;
};

const findUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  return user;
};

module.exports = {
  findUserByEmail,
  addUser,
  findUserById,
};
