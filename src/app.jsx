const pb = new PocketBase('http://127.0.0.1:8090')
const root = ReactDOM.createRoot(document.getElementById('root'))

// you can also fetch all records at once via getFullList
const records = await pb.collection('posts').getFullList(200 /* batch size */, {
    sort: '-created',
});
console.log(records)
function Postlist(){
  return (
    records.map(r => (
      <div className="checklist">
        <div>
          <input type="checkbox" id = {r.id} />
        </div>
        <div>
          <span >
            {r.body}
          </span>
        </div>
        <div>
          <button onClick={() => removeTODO(r.id)}>Remove </button>
        </div>
      </div>
    ))
  );
}
async function Addnewtodo(input){
  const data = {
    "body": input
  };
  const record = await pb.collection('posts').create(data);
  window.location.reload();
}
async function othername() {
  var input = document.getElementById("userInput").value;
  Addnewtodo(input);
}
async function removeTODO(id) {
  const record = await pb.collection('posts').delete(id);
  window.location.reload();
}
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
export default function App () {
  async function Logoutclick(){
    pb.authStore.clear();
  }
  return (
    <div>
      <div className="title">
        <h1 className="text-decoration-underline text-7xl text-center text-transparent font-extrabold bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"> Welcome to your todo list </h1>
        <h2 className="text-center">Type your task below and click Add Task to add it to your To-Do List. To remove a task, simply click the Remove button beside it</h2>
        <br></br>
      </div>
      <div className="container1">
        <div className="todoPrompt">
          <input type="text" id="userInput" placeholder="Add post here"/>
          <button className="btn" onClick= {othername} >Add Task </button>
        </div>
        <div className="container2">
          <div>
            <br></br>
            <Postlist/>
          </div>
          <br></br>
        </div>
      </div>
    </div>
  );
}
