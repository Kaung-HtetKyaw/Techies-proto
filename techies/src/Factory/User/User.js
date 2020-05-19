export default class User {
  constructor(object) {
    (this.displayName = object.displayName),
      (this.email = object.email),
      (this.bio = object.bio ? object.bio : ""),
      (this.joined = object.joined
        ? object.joined
        : object.metadata.creationTime),
      (this.tags = object.tags ? object.tags : []),
      (this.photoURL = object.photoURL),
      (this.uid = object.uid);
    this.readingLists = object.readingLists ? object.readingLists : [];
    this.isNewUser = object.isNewUser;
  }
}
