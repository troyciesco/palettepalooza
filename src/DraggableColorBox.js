import React from "react"
import { makeStyles } from "@material-ui/styles"
import { SortableElement } from "react-sortable-hoc"
import DeleteIcon from "@material-ui/icons/Delete"

const useStyles = makeStyles({
	// "@global": {
	// 	".fade-exit": {
	// 		opacity: 1
	// 	},
	// 	".fade-exit-active": {
	// 		opacity: 0,
	// 		transition: "opacity 300ms ease-out"
	// 	}
	// },
	root: {
		width: "20%",
		height: "25%",
		margin: "0 auto",
		display: "inline-block",
		position: "relative",
		marginBottom: "-3.5px",
		"&:hover svg": {
			color: "#ffffff",
			transform: "scale(1.2)"
		}
	},
	boxContent: {
		position: "absolute",
		color: "#333333",
		width: "100%",
		left: "0",
		bottom: "0",
		padding: "10px",
		letterSpacing: "1px",
		textTransform: "uppercase",
		fontSize: "12px",
		display: "flex",
		justifyContent: "space-between"
	},
	deleteIcon: {
		color: "#333333",
		cursor: "pointer",
		transition: "all 0.3s ease-in-out"
	}
})

const DraggableColorBox = SortableElement(({ color, name, handleClick }) => {
	const classes = useStyles()

	return (
		<div className={classes.root} style={{ backgroundColor: color }}>
			<div className={classes.boxContent}>
				<span>{name}</span>
				<DeleteIcon className={classes.deleteIcon} onClick={handleClick} />
			</div>
		</div>
	)
})

export { DraggableColorBox }
