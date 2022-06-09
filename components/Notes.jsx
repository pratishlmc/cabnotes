import React, { useState, useEffect } from "react";
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

function Notes({ notes }) {
	const [data, setData] = useState(notes);
	const { data: session, status } = useSession();
	const [play, setPlay] = useState(false);

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
				<HStack key={i}>
					<Flex p={2} rounded={"md"} direction={"column"} bg={"gray.100"}>
						<Text fontWeight={500}>{item.title}</Text>
						<Box maxH={40}>
							<Text color={"gray.800"} fontWeight={400}>
								{item.description}
							</Text>
						</Box>
						<Flex mt={1} mr={2}>
							<Text color={"gray.800"} fontSize={14}>
								Updated: <ReactTimeAgo date={item.updatedAt} locale="en-US" />
							</Text>
							<Spacer />
							{/* <UseAnimations
								animation={trash}
								size={20}
								style={{ padding: 100 }}
							/> */}
							<Menu>
								<MenuButton>
									<Hero.DotsCircleHorizontalIcon width={20} as={Button} />
								</MenuButton>
								<MenuList w={10}>
									<MenuItem>Edit</MenuItem>
									<MenuItem>
										{/* <UseAnimations
											reverse={checked}
											onClick={() => {
												setChecked(!checked);
											}}
											size={40}
											wrapperStyle={{ marginTop: "5px" }}
											animation={radioButton}
										/> */}
										Delete
									</MenuItem>
								</MenuList>
							</Menu>
						</Flex>
					</Flex>
					{/* 
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
					</div> */}
				</HStack>
			))}
		</>
	);
}

export default Notes;
