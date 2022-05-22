import React from "react";
import { Jelly } from "@uiball/loaders";


function Loading() {
	
	return (
		<div
			style={{
				width: "100%",
				display: "flex",
				justifyContent: "center",
				padding: "10px",
				marginTop: "50px",
			}}
		>
			<Jelly size={55} color="#ffffff" />
		</div>
	);
}

export default Loading;
