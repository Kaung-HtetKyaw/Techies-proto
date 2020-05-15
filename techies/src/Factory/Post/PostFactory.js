import Post from "@/Factory/Post/Post.js";

class PostFactory {
  create(object) {
    return new Post(object);
  }

  createFromDB(object) {
    const preparedPost = {
      postid: object.id,
      title: object.data().title,
      description: object.data().description,
      author: object.data().author,
      content: object.data().content,
      image: object.data().image,
      date: object.data().date,
      uid: object.data().uid,
      likes: object.data().likes,
      likesNo: object.data().likesNo,
      readTime: object.data().readTime,
      tags: object.data().readTime,
    };
    return new Post(preparedPost);
  }
}

export default new PostFactory();
