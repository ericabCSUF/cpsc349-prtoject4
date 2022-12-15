
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
      <div>
        <label><input type="checkbox" id = {r.id} />
          {r.body}
          </label>
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
      <div className="container" >
        <h1 className="mt-5 text-2xl text-center text-transparent font-extrabold bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"> Welcome to your todo list </h1>
      </div>
      <div className="container" >
        <ul>
          <Postlist/>
          <input type="text" id="userInput" placeholder="Add post here"/>
          <button className="btn" onClick= {othername} >Add TODO </button>
          </ul>
          <br></br>
      </div>
    </div>
  );
}
