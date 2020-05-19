import User from "@/Factory/User/User.js";

class UserFactory {
  create(object) {
    return new User(object);
  }

  createFromDB(object) {
    console.log("createdb", object.data());
    const preparedPost = {
      email: object.data().email,
      displayName: object.data().displayName,
      bio: object.data().bio,
      photoURL: object.data().photoURL,
      tags: object.data().tags,
      joined: object.data().joined,
      uid: object.data().uid,
      readingLists: object.data().readingLists
        ? object.data().readingLists
        : [],
      isNewUser: object.data().isNewUser,
    };
    return new User(preparedPost);
  }
}

export default new UserFactory();
