const pb = new PocketBase("http://127.0.0.1:8090");
const root = ReactDOM.createRoot(document.getElementById("root"));
const records = await pb.collection("posts").getFullList(200, {
  sort: "-created"
});
console.log(records);
function Postlist() {
  return records.map((r) => /* @__PURE__ */ React.createElement("div", { className: "checklist" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("input", { type: "checkbox", id: r.id })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, r.body)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("button", { onClick: () => removeTODO(r.id) }, "Remove "))));
}
async function Addnewtodo(input) {
  const data = {
    "body": input
  };
  const record = await pb.collection("posts").create(data);
  window.location.reload();
}
async function othername() {
  var input = document.getElementById("userInput").value;
  Addnewtodo(input);
}
async function removeTODO(id) {
  const record = await pb.collection("posts").delete(id);
  window.location.reload();
}
root.render(
  /* @__PURE__ */ React.createElement(React.StrictMode, null, /* @__PURE__ */ React.createElement(App, null))
);
export default function App() {
  async function Logoutclick() {
    pb.authStore.clear();
  }
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "title" }, /* @__PURE__ */ React.createElement("h1", { className: "text-decoration-underline text-7xl text-center text-transparent font-extrabold bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" }, " Welcome to your todo list "), /* @__PURE__ */ React.createElement("h2", { className: "text-center" }, "Type your task below and click Add Task to add it to your To-Do List. To remove a task, simply click the Remove button beside it"), /* @__PURE__ */ React.createElement("br", null)), /* @__PURE__ */ React.createElement("div", { className: "container1" }, /* @__PURE__ */ React.createElement("div", { className: "todoPrompt" }, /* @__PURE__ */ React.createElement("input", { type: "text", id: "userInput", placeholder: "Add post here" }), /* @__PURE__ */ React.createElement("button", { className: "btn", onClick: othername }, "Add Task ")), /* @__PURE__ */ React.createElement("div", { className: "container2" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(Postlist, null)), /* @__PURE__ */ React.createElement("br", null))));
}
