import React, { useState } from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import CssBaseline from "@material-ui/core/CssBaseline"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import { Button } from "@material-ui/core"
import { DraggableColorList } from "./DraggableColorList"
import { arrayMove } from "react-sortable-hoc"
import { PaletteFormNav } from "./PaletteFormNav"
import { ColorPickerForm } from "./ColorPickerForm"

const drawerWidth = 400

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex"
	},
	appBar: {
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	hide: {
		display: "none"
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
	drawerHeader: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		justifyContent: "flex-end"
	},
	content: {
		flexGrow: 1,
		height: "calc(100vh - 64px)",
		padding: theme.spacing(3),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		marginLeft: -drawerWidth
	},
	contentShift: {
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginLeft: 0
	}
}))

const NewPaletteForm = props => {
	const classes = useStyles()
	const [open, setOpen] = useState(true)
	const [colors, setColors] = useState(props.palettes[0].colors)

	const maxColors = 20
	const isPaletteFull = colors.length >= maxColors

	const handleDrawerOpen = () => {
		setOpen(true)
	}

	const handleDrawerClose = () => {
		setOpen(false)
	}

	const handleSubmit = newPalette => {
		newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-")
		newPalette.colors = colors
		props.savePalette(newPalette)
		props.history.push("/")
	}

	const addNewColor = (currentColor, newName) => {
		const newColor = {
			color: currentColor,
			name: newName
		}
		setColors([...colors, newColor])
	}

	const removeColor = colorName => {
		setColors(colors.filter(color => color.name !== colorName))
	}

	const onSortEnd = ({ oldIndex, newIndex }) => {
		setColors(arrayMove(colors, oldIndex, newIndex))
	}

	const clearColors = () => {
		setColors([])
	}

	const addRandomColor = () => {
		const allColors = props.palettes.map(p => p.colors).flat()
		let randomIndex
		let randomColor
		let isDuplicateColor = true
		while (isDuplicateColor) {
			randomIndex = Math.floor(Math.random() * allColors.length)
			randomColor = allColors[randomIndex]
			//eslint-disable-next-line
			isDuplicateColor = colors.some(color => color.name === randomColor.name)
		}
		setColors([...colors, randomColor])
	}

	return (
		<div className={classes.root}>
			<CssBaseline />
			<PaletteFormNav
				open={open}
				classes={classes}
				colors={colors}
				palettes={props.palettes}
				handleDrawerOpen={handleDrawerOpen}
				handleSubmit={handleSubmit}
			/>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<Typography variant="h4">Design Your Palette</Typography>
				<div>
					<Button variant="contained" color="secondary" onClick={clearColors}>
						Clear Palette
					</Button>
					<Button
						variant="contained"
						color="primary"
						disabled={colors.length >= maxColors}
						onClick={addRandomColor}
					>
						Random Color
					</Button>
				</div>
				<ColorPickerForm colors={colors} addNewColor={addNewColor} isPaletteFull={isPaletteFull} />
			</Drawer>
			<main
				className={clsx(classes.content, {
					[classes.contentShift]: open
				})}
			>
				<div className={classes.drawerHeader} />
				<DraggableColorList
					colors={colors}
					removeColor={removeColor}
					axis="xy"
					onSortEnd={onSortEnd}
					distance={20}
				/>
			</main>
		</div>
	)
}

export { NewPaletteForm }
