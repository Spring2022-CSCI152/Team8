function Editor() {
  return (
    <div className="Editor">
      <label htmlFor="title">Title</label>
      <input id="title" type="text" />
      <label htmlFor="card-content">Content</label>
      <input id="card-content" type="text" />
      <button>Flip</button>
    </div>
  );
}

export default Editor;

