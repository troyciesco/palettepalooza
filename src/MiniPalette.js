import React from "react"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles({
	root: {
		backgroundColor: "#ffffff",
		border: "1px solid black",
		borderRadius: "5px",
		padding: "0.5rem",
		position: "relative",
		overflow: "hidden",
		"&:hover": {
			cursor: "pointer"
		}
	},
	colorSquares: {
		backgroundColor: "#dae1e4",
		height: "150px",
		width: "100%",
		borderRadius: "5px",
		overflow: "hidden"
	},
	colorBox: {
		height: "20%",
		width: "25%",
		display: "inline-block",
		margin: "0 auto",
		position: "relative",
		marginBottom: "-3.5px"
	},
	title: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		margin: "0",
		color: "#333333",
		paddingTop: "0.5rem",
		fontSize: "1rem",
		position: "relative"
	},
	emoji: {
		marginLeft: "0.5rem",
		fontSize: "1.5rem"
	}
})

const MiniPalette = ({ handleClick, paletteName, emoji, colors }) => {
	const classes = useStyles()

	const colorSquares = colors.map(color => (
		<div
			className={classes.colorBox}
			key={color.name}
			style={{ backgroundColor: color.color }}
		></div>
	))
	return (
		<div className={classes.root} onClick={handleClick}>
			<div className={classes.colorSquares}>{colorSquares}</div>
			<h5 className={classes.title}>
				{paletteName}
				<span className={classes.emoji}>{emoji}</span>
			</h5>
		</div>
	)
}

export { MiniPalette }
