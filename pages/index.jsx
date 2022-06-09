import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";
import { fetchNotes } from "../utils/fetchNotes";
import { fetchTasks } from "../utils/fetchTasks";
import Notes from "../components/Notes";
import Tasks from "../components/Tasks";
import Loading from "../components/Loading";
import {
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	Button,
	Flex,
	Box,
} from "@chakra-ui/react";

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
			<Fragment>
				<Flex>
					<Tabs p={1} variant={"unstyled"} w={"full"}>
						<TabList>
							<Flex justifyContent={"center"} w={"full"} gap={2}>
								<Tab
									_focus={"none"}
									bg={"gray.50"}
									rounded={"sm"}
									w={32}
									_selected={{ bg: "gray.200" }}
								>
									Notes
								</Tab>
								<Tab
									_focus={"none"}
									bg={"gray.50"}
									rounded={"sm"}
									w={32}
									_selected={{ bg: "gray.200" }}
								>
									Tasks
								</Tab>
							</Flex>
						</TabList>
						<Box mt={3} pl={80} pr={80}>
							<TabPanels w={"full"} mt={5}>
								<TabPanel>
									<Notes notes={notes} />
								</TabPanel>
								<TabPanel>
									<Tasks tasks={tasks} />
								</TabPanel>
							</TabPanels>
						</Box>
					</Tabs>
				</Flex>
			</Fragment>
		);
	}
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
