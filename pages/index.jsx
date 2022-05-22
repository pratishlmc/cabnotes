import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import notLoggedIn from "../images/not_logged_in.png";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { fetchNotes } from "../utils/fetchNotes";
import { fetchTasks } from "../utils/fetchTasks";
import Notes from "../components/Notes";
import Tasks from "../components/Tasks";
import Loading from "../components/Loading";
import Header from "../components/Header";

export default function Home({ notes, tasks }) {
	const [isChanged, setIsChanged] = useState(false);
	const { data: session, status } = useSession();
	const [data, setData] = useState(tasks);
	const router = useRouter();

	function refresh() {
		Router.replace(Router.asPath);
	}

	if (status === "loading") {
		return <Loading />;
	}

	if (status === "authenticated") {
		return (
			<>
				<div className="main">
					<div className="task_state_nav">
						<div
							onClick={() => (setIsChanged(false), refresh())}
							className={isChanged === false ? "active_nav_child" : "nav_child"}
						>
							<span>Notes</span>
						</div>
						<div
							onClick={() => (setIsChanged(true), refresh())}
							className={isChanged === true ? "active_nav_child" : "nav_child"}
						>
							<span>Tasks</span>
						</div>
					</div>
					<hr style={{ width: "100%", margin: "20px" }} />
					<div className="note_container">
						{isChanged === false ? (
							<Notes notes={notes} />
						) : (
							<Tasks tasks={tasks} />
						)}
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			<div
				style={{
					display: "flex",
					width: "100%",
					height: "400px",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Image src={notLoggedIn} height="400" width="400" />
			</div>
		</>
	);
}

export const getServerSideProps = async () => {
	const notes = await fetchNotes();
	const tasks = await fetchTasks();
	return {
		props: {
			notes,
			tasks,
		},
	};
};
