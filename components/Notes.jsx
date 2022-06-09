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
import lottie from "lottie-web";

function Notes({ notes }) {
	const [data, setData] = useState(notes);
	const { data: session, status } = useSession();
	// const [play, setPlay] = useState(false);

	const handleDelete = async (item) => {
		const reloadNotes = toast.loading("Please wait...");
		axios.delete(`/api/note/${item._id}`);
		const notes = await fetchNotes();
		setData(notes);
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

	return (
		<Flex direction={"column"} gap={3}>
			{data.map((item, i) => (
				<Flex key={i} p={2} rounded={"md"} direction={"column"} bg={"gray.100"}>
					<Text fontWeight={500} noOfLines={1} textOverflow={"ellipsis"}>
						{item.title}
					</Text>
					<Box maxH={24} noOfLines={3} textOverflow={"ellipsis"}>
						<Text color={"gray.800"} fontSize={14} fontWeight={400}>
							{item.description}
						</Text>
					</Box>
					<Flex mt={1} mr={2}>
						<Text color={"gray.800"} fontSize={12}>
							Updated: <ReactTimeAgo date={item.updatedAt} locale="en-US" />
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
						<Menu>
							<MenuButton>
								<Hero.DotsCircleHorizontalIcon width={20} as={Button} />
							</MenuButton>
							<MenuList minW={"36"} padding={0}>
								<MenuItem
									closeOnSelect={false}
									onMouseEnter={() => playanimation("edit-icon")}
									onMouseLeave={() => stopanimation("edit-icon")}
								>
									<Text fontSize={15}>Edit</Text>
									<Spacer />
									<Icons
										icon={edit.animationData}
										name="edit-icon"
										size={28}
										animation="hover"
										reference="editicon"
									/>
								</MenuItem>
								<MenuItem
									closeOnSelect={false}
									onMouseEnter={() => playanimation("trash-icon")}
									onMouseLeave={() => stopanimation("trash-icon")}
								>
									<Text color={"red"} fontSize={15}>
										Delete
									</Text>
									<Spacer />
									<Icons
										icon={trash.animationData}
										name="trash-icon"
										size={25}
										reference="trashicon"
										animation="hover"
									/>
								</MenuItem>
							</MenuList>
						</Menu>
					</Flex>
				</Flex>
			))}
		</Flex>
	);
}

export default Notes;
