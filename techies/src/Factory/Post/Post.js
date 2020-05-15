export default class Post {
  constructor(object) {
    if (!object.postid) {
      this.title = object.title;
      this.description = object.description;
      this.author = object.author;
      this.content = object.content;
      this.image = object.image;
      this.date = object.date;
      this.uid = object.uid;
      this.likes = object.likes;
      this.likesNo = object.likesNo;
      this.readTime = object.readTime;
      this.tags = object.tags;
    } else {
      this.postid = object.postid;
      this.title = object.title;
      this.description = object.description;
      this.author = object.author;
      this.content = object.content;
      this.image = object.image;
      this.date = object.date;
      this.uid = object.uid;
      this.likes = object.likes;
      this.likesNo = object.likesNo;
      this.readTime = object.readTime;
      this.tags = object.tags;
    }
  }
}
