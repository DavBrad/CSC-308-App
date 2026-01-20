// src/MyApp.jsx
import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => i !== index);
    setCharacters(updated);
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    return promise;
  }

  function updateList(person) 
  { 
    postUser(person)
    .then((res) => {
      console.log("Response status:", res.status);
      if (res.status === 201)
      {
        setCharacters([...characters, person])
      }
    })
      .catch((error) => 
        {
        console.log(error);
        });
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => {
        console.log("Response status:", res.status);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        console.log("Received JSON:", json);
        console.log("Users list:", json["users_list"]);
        if (json["users_list"]) {
          setCharacters(json["users_list"]);
        } else {
          console.error("No users_list found in response");
        }
      })
      .catch((error) => { 
        console.error("Error fetching users:", error); 
      });
  }, []);

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
