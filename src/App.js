import Logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { IoCheckmarkDone, IoClose, IoLockClosed } from "react-icons/io5";
import { ProDevApi } from "./axios";
import { BiSolidEditAlt } from "react-icons/bi";

function App() {
  const [toDos, setToDos] = useState([]);

  const [toDoForm, setToDoForm] = useState({
    title: "",
    description: "",
    action: "Create",
  });

  const submitToDoForm = async (e) => {
    e.preventDefault();

    let clear = true;

    if (toDoForm.action === "Create") {
      const newTodo = {
        title: toDoForm.title,
        description: toDoForm.description,
      };

      const create = await ProDevApi.post("", newTodo);

      if (!create.data.status) alert("error creating todo");
    } else if (toDoForm.action === "Update") {
      const updatedToDo = {
        title: toDoForm.title,
        description: toDoForm.description,
      };

      const update = await ProDevApi.patch(`${toDoForm.todoId}`, updatedToDo);

      if (!update.data.status) alert("error creating todo");
    }

    getAllTodos();

    clear &&
      setToDoForm({
        title: "",
        description: "",
        action: "Create",
      });
  };

  const updateToDo = async (action, todoId) => {
    const updateData = {
      status: action,
    };

    const update = await ProDevApi.put(`${todoId}`, updateData);

    if (!update.data.status) alert("error updating todo status");

    getAllTodos();
  };

  const getAllTodos = async () => {
    const Todos = await ProDevApi.get("");

    if (Todos.data.status) setToDos(Todos.data.data);
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full lg:w-1/2 mx-auto">
      <img src={Logo} className="App-logo" alt="logo" />
      <span className="text-center text-xl font-semibold">
        React ... Laravel
      </span>
      <form
        onSubmit={submitToDoForm}
        className="flex flex-col items-start justify-start w-5/6 lg:w-1/2 mt-4"
      >
        <span className="font-semibold text-md"> Title </span>
        <input
          type="text"
          name="title"
          className="border rounded-md border-solid border-amber-900 p-3 w-full my-2"
          placeholder="To Do Title"
          value={toDoForm.title}
          onInput={(e) => setToDoForm({ ...toDoForm, title: e.target.value })}
        />
        <span className="font-semibold text-md"> Description </span>
        <textarea
          name="description"
          className="border rounded-md border-solid border-amber-900 p-3 w-full my-2 resize-none"
          value={toDoForm.description}
          rows={4}
          placeholder="To Do Description"
          onInput={(e) =>
            setToDoForm({ ...toDoForm, description: e.target.value })
          }
        ></textarea>
        <button className="text-center font-bold text-lg bg-teal-700 text-white w-full rounded-md py-3">
          {toDoForm.action} To Do
        </button>
      </form>

      <div className="w-3/4">
        {toDos.map((toDo, toDoKey) => (
          <div
            key={toDoKey}
            className="border-b mb-2 py-3 px-5 border-solid border-stone-700 flex flex-row items-center justify-between w-full"
          >
            <div className="flex flex-col">
              <span className="text-2xl font-bold"> {toDo.title} </span>
              <span className="text-lg font-normal"> {toDo.description} </span>
            </div>
            <div className="flex flex-row gap-3 text-lg items-center justify-center">
              {toDo.status === "pending" ? (
                <>
                  <BiSolidEditAlt
                    className="cursor-pointer"
                    onClick={() => {
                      setToDoForm({
                        todoId: toDo.id,
                        title: toDo.title,
                        description: toDo.description,
                        action: "Update",
                      });
                    }}
                  />
                  <IoCheckmarkDone
                    className="cursor-pointer"
                    onClick={() => updateToDo("completed", toDo.id)}
                  />
                  <IoClose
                    className="cursor-pointer"
                    onClick={() => updateToDo("discarded", toDo.id)}
                  />
                </>
              ) : (
                <>
                  <span className="text-sm">{toDo.status}</span>
                  <IoLockClosed />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
