import Image from "next/image";
import Link from "next/link";
import Loading from "../images/loading.png";
import { Fragment } from "react";
import Nav from "../components/Nav";
import { fetchNotes } from "../utils/fetchNotes";

function notes({ notes }) {
	return (
		<Fragment>
			<Nav data={notes} />
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
