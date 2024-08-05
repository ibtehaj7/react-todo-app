import AddToDo from "./components/addtodo"
import Navbar from "./components/navbar"
import Todos from "./components/todos"
import "./App.css";

const App = () => {
  return (
    <main>
      <h2>TODO REACT + TYPESCRIPT</h2>
      <Navbar />
      <AddToDo />
      <Todos />
    </main>
  )
}

export default App