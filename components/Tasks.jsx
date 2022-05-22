import React, { useState, useEffect } from "react";
import * as Hero from "@heroicons/react/outline";
import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { fetchTasks } from "../utils/fetchTasks";
import Image from "next/image";

function Tasks({ tasks }) {
	const [showCompleted, setShowCompleted] = useState(true);
	const { data: session, status } = useSession();
	const [data, setData] = useState(tasks);

	const handleChange = async (item) => {
		axios.put(`/api/task/${item._id}`, { completed: !item.completed });
		const newTask = await fetchTasks();
		setData(newTask);
	};

	const handleDelete = async (item) => {
		const reloadNotes = toast.loading("Please wait...");
		axios.delete(`/api/task/${item._id}`);
		const newTasks = await fetchTasks();
		setData(newTasks);
		toast.success("Deleted", {
			id: reloadNotes,
		});
	};

	if (!data) {
		return (
			<>
				<Image
					src={require("../images/nothing_to_show.png")}
					width={100}
					height={100}
				/>
			</>
		);
	}

	return (
		<>
			<div className="note_container">
				{data.map((item, i) => (
					<div key={i} style={{ display: "flex" }}>
						{!item.completed && (
							<>
								<div
									className="note-card"
									style={{
										height: "50px",
										display: "flex",
										alignItems: "center",
									}}
								>
									<div>
										<span className="note_title">{item.content}</span>
									</div>
								</div>
								<div
									style={{
										display: "flex",
										height: "50px",
									}}
								>
									<div
										onClick={(e) => handleChange(item)}
										className="action-container"
										style={{ backgroundColor: "#C1E1C1" }}
									>
										<Hero.CheckIcon
											style={{
												width: "24px",
												height: "24px",
											}}
										/>
									</div>
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
							</>
						)}
					</div>
				))}
			</div>
			<div
				onClick={() => setShowCompleted(!showCompleted)}
				className="show-completed"
			>
				{showCompleted ? (
					<Hero.ChevronDownIcon style={{ width: "14px", marginRight: "5px" }} />
				) : (
					<Hero.ChevronUpIcon style={{ width: "14px", marginRight: "5px" }} />
				)}
				<span style={{ fontSize: "15px" }}>Completed</span>
			</div>
			<div>
				<div className="note_container">
					{showCompleted &&
						data.map((item, i) => (
							<div key={i} style={{ display: "flex" }}>
								{item.completed && (
									<>
										<div
											className="note-card"
											style={{
												height: "50px",
												display: "flex",
												alignItems: "center",
											}}
										>
											<div>
												<span className="note_title">{item.content}</span>
											</div>
										</div>
										<div
											style={{
												display: "flex",
												height: "50px",
											}}
										>
											<div
												onClick={(e) => handleChange(item)}
												className="action-container"
												style={{ backgroundColor: "#B6DDEE" }}
											>
												<Hero.ReplyIcon
													style={{
														width: "24px",
														height: "24px",
													}}
												/>
											</div>
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
									</>
								)}
							</div>
						))}
				</div>
			</div>
		</>
	);
}

export default Tasks;
