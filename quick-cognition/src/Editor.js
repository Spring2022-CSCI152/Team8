function Editor() {
  return (
    <div className="Editor">
      <label for="title">Title</label>
      <input id="title" type="text" />
      <label for="card-content">Content</label>
      <input id="card-content" type="text" />
    </div>
  );
}

export default Editor;

