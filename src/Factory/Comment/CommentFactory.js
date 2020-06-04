import Comment from "@/Factory/Comment/Comment.js";

class CommentFactory {
  create(object) {
    return new Comment(object);
  }

  createFromDB(object) {
    const preparedComment = {
      comments: object.data().comments,
      postid: object.data().postid
    };

    return new Comment(preparedComment);
  }
}

export default new CommentFactory();
