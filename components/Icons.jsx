import React, { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";

function Icons({ icon, reference, name, animation, bool, size }) {
	const [type, setType] = useState(animation);
	const container = useRef(reference);
	const [checked, setChecked] = useState(true);

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
				style={{ cursor: "pointer", width: size }}
				onMouseEnter={() => (lottie.play(name))}
				onMouseLeave={() => lottie.stop(name)}
			/>
		);
	}

	if (type === "snap") {
		return (
			<div
				ref={container}
				style={{ cursor: "pointer", width: size }}
				onClick={() => (lottie.stop() ? lottie.play(name) : lottie.stop(name))}
			/>
		);
	}
}

export default Icons;
