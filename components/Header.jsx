import React, { Fragment, useState } from "react";
import Link from "next/link";
import { signOut, signIn, useSession } from "next-auth/react";
import {
	Flex,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuItemOption,
	MenuOptionGroup,
	Button,
	Text,
	Spacer,
	Box,
	MenuDivider,
	Image,
	WrapItem,
} from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon, AddIcon } from "@chakra-ui/icons";
import * as HeroSolid from "@heroicons/react/solid";
import { useRouter } from "next/router";
import theme from "../constants/theme";

function Header() {
	const { data: session, status } = useSession();
	const { colorMode, setColorMode } = useColorMode();
	const router = useRouter();

	if (status === "loading") {
		return null;
	}
	return (
		<Flex
			alignItems={"center"}
			h={"fit-content"}
			padding={5}
			className="header"
		>
			<Link href="/">
				<Flex direction={"column"}>
					<Text fontSize={40} fontWeight={"bold"} className={"titleText"}>
						Notes
					</Text>
					<Text mt={-2} fontSize={8}>
						by Cabbage
					</Text>
				</Flex>
			</Link>
			<Spacer />

			{status === "authenticated" ? (
				<Fragment>
					<Button
						size={"sm"}
						height={"10"}
						onClick={() => router.push("/create")}
						ml={5}
						mr={5}
						leftIcon={<AddIcon />}
						_focus={"none"}
						bg={theme.colors.brand.blue}
						_hover={{ bg: "blue.500" }}
						color={"white"}
					>
						Create New
					</Button>
					<Text fontSize={20} color={"gray.400"}>
						|
					</Text>
					<Box ml={5}>
						<Menu>
							<MenuButton __css={"none"} animation={100} as={Button}>
								<Image
									src={session.user.image}
									boxSize="45px"
									borderRadius="full"
									alt={session.user.name}
								/>
							</MenuButton>

							<MenuList p={2}>
								<MenuItem>
									<HeroSolid.UserIcon width={18} /> <Text ml={2}>Profile</Text>
								</MenuItem>
								<MenuDivider />
								<MenuOptionGroup
									defaultValue={colorMode}
									title="Appearence"
									type="radio"
								>
									<MenuItemOption
										closeOnSelect={false}
										value="light"
										onClick={() => setColorMode("light")}
									>
										<Flex alignItems={"center"}>
											Light <Spacer /> <SunIcon />
										</Flex>
									</MenuItemOption>
									<MenuItemOption
										closeOnSelect={false}
										value="dark"
										onClick={() => setColorMode("dark")}
									>
										<Flex alignItems={"center"}>
											Dark
											<Spacer /> <MoonIcon />
										</Flex>
									</MenuItemOption>
								</MenuOptionGroup>
								<MenuDivider />
								<MenuItem onClick={signOut}>
									<Text color={"red.400"} mr={2}>
										Log out
									</Text>
									<HeroSolid.LogoutIcon width={18} />
								</MenuItem>
							</MenuList>
						</Menu>
					</Box>
				</Fragment>
			) : (
				<Button onClick={signIn}>Log in</Button>
			)}
		</Flex>
	);
}

export default Header;
