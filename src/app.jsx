
const pb = new PocketBase('http://127.0.0.1:8090')
const root = ReactDOM.createRoot(document.getElementById('root'))

// you can also fetch all records at once via getFullList
const records = await pb.collection('posts').getFullList(200 /* batch size */, {
    sort: '+created',
});
console.log(records)

function Postlist(){
  return (
    records.map(r => (
      <div className="checklist">
        <input type="checkbox" id = {r.id} />
        <span >
          {r.body}
        </span>
        <button onClick={() => removeTODO(r.id)}>Remove </button>
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
      <div className="py-16">
        <h1 className=" text-7xl text-center text-transparent font-extrabold bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"> Welcome to your todo list </h1>

      </div>
      <div className="todoPrompt">
      <input type="text" id="userInput" placeholder="Add post here"/>
      <button className="btn" onClick= {othername} >Add TODO </button>
      </div>
      <div className="container">

        <div>


          <Postlist/>
        </div>
        <br></br>
      </div>
    </div>
  );
}
