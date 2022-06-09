import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { fetchNotes } from "../utils/fetchNotes";

function notes({ notes }) {
	return (
		<Fragment>
			<h1>hi</h1>
		</Fragment>
	);
}

export const getServerSideProps = async () => {
	const data = await fetchNotes();

	return {
		props: {
			notes: data,
		},
	};
};

export default notes;
