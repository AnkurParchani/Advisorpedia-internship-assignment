const Post = ({ post }) => {
  const { title, body, name } = post;
  return (
    <div className="border-2 border-purple-400 rounded-md px-3 py-2 bg-purple-50 flex flex-col gap-2">
      <h1 className="font-semibold">{title}</h1>
      <p className="flex-grow">{body}</p>
      <p className="self-end font-semibold ">{name}</p>
    </div>
  );
};

export default Post;
