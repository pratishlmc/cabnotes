import React, { useState, useEffect } from "react";
import * as Hero from "@heroicons/react/outline";
import axios from "axios";
import { useRouter } from "next/router";
import { fetchNotes } from "../utils/fetchNotes";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

function Notes({ notes }) {
	const [data, setData] = useState(notes);
	const { data: session, status } = useSession();

	const handleDelete = async (item) => {
		const reloadNotes = toast.loading("Please wait...");
		axios.delete(`/api/note/${item._id}`);
		const notes = await fetchNotes();
		setData(notes);
		toast.success("Deleted", {
			id: reloadNotes,
		});
	};

	return (
		<>
			{data.map((item, i) => (
				<div key={i} style={{ display: "flex" }}>
					<div className="note-card">
						<div>
							<span className="note_title">{item.title}</span>
						</div>
						<span className="note_description">{item.description}</span>
					</div>
					<div
						style={{
							display: "flex",
							height: "65px",
						}}
					>
						<div
							onClick={(e) => handleDelete(item)}
							className="action-container"
							style={{
								backgroundColor: "#ff6961",
								borderStartEndRadius: "5px",
								borderEndEndRadius: "5px",
							}}
						>
							<Hero.TrashIcon style={{ width: "28px" }} />
						</div>
					</div>
				</div>
			))}
		</>
	);
}

export default Notes;
