import React from "react";
import Link from "next/link";
import Head from "next/head";
import { signOut, signIn, useSession } from "next-auth/react";

function Header() {
	const { data: session, status } = useSession();
	
	if (status === "loading") {
		return null;
	}
	return (
		<div className="header">
			<Link href="/">
				<div style={{ cursor: "pointer" }}>
					<h1 style={{ fontWeight: 500}}>Notes</h1>
				</div>
			</Link>
			<div className="nav">
				<button onClick={session ? signOut : signIn}>
					{session ? "Sign Out" : "Sign In"}
				</button>

				<Link href="/create">
					<button>Add Notes</button>
				</Link>
			</div>
		</div>
	);
}

export default Header;
