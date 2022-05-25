import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";

type Props = {
  posts: string[];
  userInput: string;
  data: string[];
};
type TTodo = { uuid: string; title: string; description: string };
type InputTodo = {title: string; description: string}

const Home: NextPage = () => {
  const [form, setForm] = useState<InputTodo>({ title: "", description: "" });
  const [posts, setPosts] = useState([]);
  // const [userInput, setUserInput] = useState("");
  const [data, setData] = useState<TTodo[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // e.preventDefault();
    try {
      const res = await axios.get("http://localhost:3000/");
      setData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }

    // .then((response) => console.log(response))
    // .catch(err => console.error(err));
  };
  // const postsData = async () => {
  //   try {
  //     const res = await axios.post("http://localhost:3000/", {
  //       title: "Dolemon Sushi",
  //       description:
  //         "Unmissable Japanese Sushi restaurant. The cheese and salmon makis are delicious",
  //     });
  //     console.log(res);
  //     getData();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const handleSubmit = async (data: InputTodo) => {
    try {
      // console.log(data);
      // console.log(data.title);
      // console.log(data.description);
      const res = await axios.post("http://localhost:3000/", {
        title: data.title,
        description: data.description,
      });
      console.log(res);
      getData();
    } catch (error) {}
  };
  // const handlerInput = (e: any) => {
  //   e.preventDefault();
  //   setUserInput(e.target.value);
  // };
  const deleteData = async (uuid: string) => {
    try {
      const res = await axios.delete(`http://localhost:3000/${uuid}`);
      console.log(res);
      getData();
    } catch (error) {
      console.error(error);
    }
  };
  // const deleteData = async () => {
  //   try {
  //     const res = axios.delete(`http://localhost:3000/${userInput}`);
  //     console.log(res);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const updateData = async (uuid: string) => {

    try {
      const res = await axios.patch(`http://localhost:3000/${uuid}`,
      {
        title: 'Update',
        description: 'update data'
      });
      console.log(res);
      getData();
    } catch (error) {}
  };

  return (
    <div>
      <div>Hello</div>
      <div>
        <form
          id="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(form);
          }}
        >
          <input
            type="text"
            value={form.title}
            placeholder="title"
            onChange={e => setForm({...form, title: e.target.value})}
            required
          ></input>
          <div>
            <input
              type="text"
              value={form.description}
              placeholder="description"
              onChange={e => setForm({...form, description: e.target.value})}
              required
            ></input>
          </div>
          <button
            type="submit"
            value="update"
          >post</button>
        </form>
      </div>

      {/* <div>
        <button onClick={getData}>get data</button>
      </div> */}
      <div>{/* <button onClick={postsData()}>post</button> */}</div>
      {/* <div>
        <input type="text" value={userInput} onChange={handlerInput}></input>
      </div> */}
      {/* <div>{userInput}</div>
      <div>
        <button onClick={deleteData}>delete</button>
      </div> */}
      <div>
        {data.length}
        {data.map((v, i) => {
          return (
            <div key={v.uuid}>
              {v.title},
              <button onClick={() => deleteData(v.uuid)}>map delete</button>
              <button onClick={() => updateData(v.uuid)}>update</button>
              {v.uuid}
            </div>
          );
        })}
      </div>

     
    </div>
  );
};

export default Home;
