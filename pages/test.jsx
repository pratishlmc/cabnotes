import React, { useEffect, useRef } from "react";
import trash from "react-useanimations/lib/trash2";
import edit from "react-useanimations/lib/edit";
import bookmark from "react-useanimations/lib/bookmark";
import UseAnimations from "react-useanimations";
import lottie from "lottie-web";
import Icons from "../components/Icons";

function App() {
	return (
		<div className="App">
			<Icons
				icon={trash.animationData}
				reference={"container1"}
				name="trash-icon"
				animation="hover"
			/>
			<Icons
				icon={edit.animationData}
				reference={"container2"}
				name="edit-icon"
				animation="hover"
			/>
			<Icons
				icon={bookmark.animationData}
				reference={"container3"}
				name="bookmark-icon"
				animation="snap"
				bool={false}
			/>
		</div>
	);
}

export default App;
