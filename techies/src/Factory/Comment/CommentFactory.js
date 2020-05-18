import Comment from "@/Factory/Comment/Comment.js";

class CommentFactory {
  create(object) {
    return new Comment(object);
  }

  createFromDB(object) {
    console.log("createdb", object.data());
    const preparedComment = {
      comments: object.data().comments,
      postid: object.data().postid,
    };
    console.log("prepared comment", preparedComment);
    return new Comment(preparedComment);
  }
}

export default new CommentFactory();
