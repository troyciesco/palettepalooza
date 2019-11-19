import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Select, MenuItem, Snackbar, IconButton } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import Slider from "rc-slider"
import "rc-slider/assets/index.css"
import "./navbar.css"

const Navbar = ({ level, changeLevel, handleChange, showSlider }) => {
	const [colorFormat, setColorFormat] = useState("hex")
	const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)

	const handleFormatChange = e => {
		setColorFormat(e.target.value)
		setIsSnackbarOpen(true)
		handleChange(e.target.value)
	}

	const closeSnackBar = () => {
		setIsSnackbarOpen(false)
	}

	return (
		<header className="navbar">
			<div className="logo">
				<Link to="/">Palettepalooza</Link>
			</div>
			{showSlider && (
				<div className="slider-container">
					<span>Level: {level}</span>
					<div className="slider">
						<Slider
							defaultValue={level}
							min={100}
							max={900}
							step={100}
							onAfterChange={changeLevel}
						/>
					</div>
				</div>
			)}
			<div className="select-container">
				<Select value={colorFormat} onChange={handleFormatChange}>
					<MenuItem value="hex">HEX - #1234af</MenuItem>
					<MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
					<MenuItem value="rgba">RGBA - rgb(255, 255, 255, 1.0)</MenuItem>
				</Select>
			</div>
			<Snackbar
				anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
				open={isSnackbarOpen}
				autoHideDuration={3000}
				message={<span id="message-id">Format changed to {colorFormat.toUpperCase()}!</span>}
				ContentProps={{ "aria-describedby": "message-id" }}
				onClose={closeSnackBar}
				action={[
					<IconButton onClick={closeSnackBar} color="inherit" key="close" aria-label="close">
						<CloseIcon />
					</IconButton>
				]}
			/>
		</header>
	)
}
export { Navbar }
