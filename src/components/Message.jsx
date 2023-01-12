const Message = (props) => {
  const { content, own } = props;
  return (
    <>
      <div className={`w-full flex pb-1 ${own && " flex-row-reverse"} `}>
        <p className={own ? "own-message" : "other-message"}>{content}</p>
      </div>
    </>
  );
};

export default Message;
