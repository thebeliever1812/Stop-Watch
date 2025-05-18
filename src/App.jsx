import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
	const [start, setStart] = useState(false);
	const [secondCount, setSecondCount] = useState(0);
	const [reset, setReset] = useState(false);
	const audioRef = useRef(null);

	useEffect(() => {
		let secondInterval;

		if (start) {
			secondInterval = setInterval(
				() => setSecondCount((prev) => prev + 1),
				1000
			);
		}

		return () => clearInterval(secondInterval);
	}, [start]);

	const handleStart = () => {
		if (!start) {
			playSound(); // play when starting
		} else {
			if (audioRef.current) {
				audioRef.current.pause(); // pause the sound
			}
		}

		setStart(!start);
	};

	const handleReset = () => {
		if (audioRef.current) {
				audioRef.current.pause(); // pause the sound
				audioRef.current.currentTime = 0
			}
		if (start) {
			setStart(false);
		}
		setReset(!reset);
		setSecondCount(0);
	};

	let seconds = secondCount % 60;
	let minutes = Math.floor(secondCount / 60);
	let hours = Math.floor(minutes / 60);

	const playSound = () => {
		if (audioRef.current) {
			audioRef.current.play();
			audioRef.current.loop = true;
		}
	};

	return (
		<div className="container">
			<div className="stopWatch-container">
				<div className="stopWatch">
					<div className="stopWatch-count">
						<audio ref={audioRef} src="./watch-ticking.mp3" />
						<div className="hours">{String(hours).padStart(2, "0")}</div>
						<div>:</div>
						<div className="minutes">
							{String(minutes % 60).padStart(2, "0")}
						</div>
						<div>:</div>
						<div className="seconds">{String(seconds).padStart(2, "0")}</div>
					</div>
					<div className="btns-container">
						<button className="start btns" onClick={handleStart}>
							{start ? "Stop" : "Start"}
						</button>
						<button className="reset btns" onClick={handleReset}>
							Reset
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
