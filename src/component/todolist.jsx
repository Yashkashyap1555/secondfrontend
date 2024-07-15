import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "./todolist.css";

const TodoList = () => {
  const InitialState = {
    task: "",
    status: "",
    deadline: "",
  };

  const [list, setList] = useState(InitialState);
  console.log(list, "list");
  const [showlist, setShowList] = useState([]);
  //   console.log(showlist, "showlist");

  const handlechange = (e) => {
    const { name, value } = e.target;
    // console.log({ name, value }, "name");
    setList({
      ...list,
      [name]: value,
    });
  };

  const handlesubmit = async (event) => {
    event.preventDefault();
    try {
      const apiTodoRegister = await axios.put(
        "http://localhost:3001/todolist",
        list
      );
      console.log(apiTodoRegister, "apiTodoRegister");

      if (apiTodoRegister.status === 201) {
        alert("your task register successfully");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleGetAllTodoList = async (req, res) => {
    try {
      const apiTodoList = await axios.get("http://localhost:3001/getlist");
      // console.log(apiTodoList, "apilist")
      if (apiTodoList.status === 200) {
        const { joy } = apiTodoList.data;
        setShowList(joy);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    handleGetAllTodoList();
  }, []);

  const handleDelete = async (data) => {
    const payload = {
      task: data?.task,
    };
    console.log(data, "payload");
    try {
      const apiTodoUserDelete = await fetch(
        "http://localhost:3001/deletetodolist",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (apiTodoUserDelete.status === 200) {
        console.log("data delete successfully");
      }
      console.log(apiTodoUserDelete, "apitododelete");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleProfile = async (data) => {
    console.log(data, "data")
    try {
      const apiTodoUserProfile = await axios.get(
        "http://localhost:3001/profiletodolist",
        { data: data }
      );
      console.log(apiTodoUserProfile, "profile");

      if (apiTodoUserProfile.status === 200) {
        alert("your todo list found successful");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const { task, status, deadline } = list;

  console.log(showlist);
  return (
    <>
      <form onSubmit={handlesubmit}>
        <h4>Todo List Task Add and Delete</h4>
        <h2>Todo List</h2>
        <div>
          <h2>Add Task</h2>
        </div>
        <div>
          <label>Task</label>
          <input
            name="task"
            value={task}
            type="text"
            placeholder="Enter Task"
            onChange={handlechange}
          />
        </div>
        <div>
          <label>Status</label>
          <input
            name="status"
            value={status}
            type="text"
            placeholder="Enter Status"
            onChange={handlechange}
          />
        </div>
        <div>
          <label>Deadline</label>
          <input
            name="deadline"
            value={deadline}
            type="datetime-local"
            onChange={handlechange}
          />
        </div>
        <button>Add Task</button>
        <button onClick={handleGetAllTodoList}>getall</button>
      </form>
      <div>
        <h2>Todo List</h2>
      </div>
      <table>
        <tr>
          <th>Sr no.</th>
          <th>Task</th>
          <th>Status</th>
          <th>Deadline</th>
          <th>Action</th>
        </tr>
        {showlist?.map((value, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{value.task}</td>
            <td>{value.status}</td>
            <td>{value.deadline}</td>
            <td>
              <button onClick={() => handleDelete(value)}>delete</button>
              <button onClick={() => handleProfile(value)}>Profile</button>
            </td>
          </tr>
        ))}
      </table>
    </>
  );
};
export default TodoList;
