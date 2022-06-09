import React, { useState, useEffect, useRef } from "react";
import * as Hero from "@heroicons/react/outline";
import axios from "axios";
import { useRouter } from "next/router";
import { fetchNotes } from "../utils/fetchNotes";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import {
	Box,
	HStack,
	Spacer,
	Text,
	Flex,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuItemOption,
	MenuOptionGroup,
	Button,
	MenuDivider,
	Image,
	WrapItem,
} from "@chakra-ui/react";
import ReactTimeAgo from "react-time-ago";
import Icons from "./Icons";
import trash from "react-useanimations/lib/trash2";
import edit from "react-useanimations/lib/edit";
import bookmark from "react-useanimations/lib/bookmark";
import checkbox from "react-useanimations/lib/checkBox";
import lottie from "lottie-web";

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

	function playanimation(item) {
		lottie.play(item);
	}

	function stopanimation(item) {
		lottie.stop(item);
	}

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
		<Flex direction={"column"} w={"full"} gap={2}>
			{data.map((item, i) => (
				<Flex key={i}>
					<Icons
						icon={checkbox.animationData}
						name="checkbox-icon"
						size={30}
						reference="checkboxicon"
						animation="hover"
					/>
					<Flex p={2} rounded={"md"} w={"full"} ml={1} mr={1} bg={"gray.100"}>
						<Text fontWeight={500} noOfLines={1} textOverflow={"ellipsis"}>
							{item.content}
						</Text>
						<Spacer />
						<Box>
							<Icons
								icon={bookmark.animationData}
								reference={"bookmarkicon"}
								name="bookmark-icon"
								size={25}
								animation="hover"
							/>
						</Box>
					</Flex>
					<Flex>
						<Button
							closeOnSelect={false}
							onMouseEnter={() => playanimation("edit-icon")}
							onMouseLeave={() => stopanimation("edit-icon")}
							p={0}
						>
							<Icons
								icon={edit.animationData}
								name="edit-icon"
								size={28}
								animation="hover"
								reference="editicon"
							/>
						</Button>
						<Box w={1} />
						<Button
							closeOnSelect={false}
							onMouseEnter={() => playanimation("trash-icon")}
							onMouseLeave={() => stopanimation("trash-icon")}
							p={0}
						>
							<Icons
								icon={trash.animationData}
								name="trash-icon"
								size={25}
								reference="trashicon"
								animation="hover"
							/>
						</Button>
					</Flex>
				</Flex>
			))}
		</Flex>
	);
}

export default Tasks;
