import React, { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";
import UseAnimations from "react-useanimations";

function Icons({ icon, reference, name, animation, bool }) {
	const [type, setType] = useState(animation);
	const container = useRef(reference);
	const [checked, setChecked] = useState(true);

	// function action() {
	// 	setChecked(!checked);
	// }

	useEffect(() => {
		lottie.loadAnimation({
			name: name,
			container: container.current,
			renderer: "svg",
			loop: false,
			autoplay: false,
			animationData: icon,
		});

		return () => {
			lottie.destroy();
		};
	}, []);

	if (type === "hover") {
		return (
			<div
				ref={container}
				style={{ cursor: "pointer", width: "100px", height: "100px" }}
				onMouseEnter={() => lottie.play(name)}
				onMouseLeave={() => lottie.stop(name)}
			/>
		);
	}

	if (type === "snap") {
		return (
			<div
				ref={container}
				style={{ cursor: "pointer", width: "100px", height: "100px" }}
				onClick={() =>
					lottie.stop() ? lottie.play(name) : lottie.stop(name)
				}
			/>
		);
	}
}

export default Icons;
