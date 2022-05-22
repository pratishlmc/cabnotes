import axios from 'axios';
import React, { Fragment, useState } from 'react'
import Router from "next/router";

function create_note() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const addHandler = async () => {
    const resopnse = await fetch("api/note/", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title, description: description })
    })
      Router.back()
  }

  return (
    <div className="create_main">
      <div className="form-container">
        <h2 align="center">Add Note</h2>
        <div className="add_form">
          <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" className="form-control" />
          <textarea onChange={(e) => setDescription(e.target.value)} value={description} rows="5" type="text" className="" />
          <button onClick={addHandler} className="add-button">Add Note</button>
        </div>
      </div>
    </div>
  )
}

export default create_note