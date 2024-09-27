import USER_MODEL from "../API/Models/user.module";

const getUserByID = async (id: string) => {
  try {
    const user = await USER_MODEL.findById(id);
    return user;
  } catch (error) {
    console.error("Error finding user: ", error);
    return null;
  }
};

export { getUserByID };
