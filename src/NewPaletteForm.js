import React, { useState, useEffect } from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import CssBaseline from "@material-ui/core/CssBaseline"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import { ChromePicker } from "react-color"
import { Button } from "@material-ui/core"
import { DraggableColorList } from "./DraggableColorList"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"
import { arrayMove } from "react-sortable-hoc"
import { PaletteFormNav } from "./PaletteFormNav"

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
	const [currentColor, setCurrentColor] = useState("teal")
	const [colors, setColors] = useState(props.palettes[0].colors)
	const [newName, setNewName] = useState("")

	const maxColors = 20
	const isPaletteFull = colors.length >= maxColors

	const handleDrawerOpen = () => {
		setOpen(true)
	}

	const handleDrawerClose = () => {
		setOpen(false)
	}

	const handleSubmit = newPaletteName => {
		const newPalette = {
			paletteName: newPaletteName,
			id: newName.toLowerCase().replace(/ /g, "-"),
			colors
		}
		props.savePalette(newPalette)
		props.history.push("/")
	}

	const updateCurrentColor = newColor => {
		setCurrentColor(newColor.hex)
	}

	const addNewColor = () => {
		const newColor = {
			color: currentColor,
			name: newName
		}
		setColors([...colors, newColor])
		setNewName("")
	}

	const removeColor = colorName => {
		setColors(colors.filter(color => color.name !== colorName))
	}

	const handleChangeColorName = e => {
		e.preventDefault()
		setNewName(e.target.value)
	}

	const onSortEnd = ({ oldIndex, newIndex }) => {
		setColors(arrayMove(colors, oldIndex, newIndex))
	}

	const clearColors = () => {
		setColors([])
	}

	const addRandomColor = () => {
		const allColors = props.palettes.map(p => p.colors).flat()
		let randomIndex = Math.floor(Math.random() * allColors.length)
		const randomColor = allColors[randomIndex]
		setColors([...colors, randomColor])
	}

	useEffect(() => {
		ValidatorForm.addValidationRule("isColorNameUnique", value =>
			colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
		)
		ValidatorForm.addValidationRule("isColorUnique", value =>
			colors.every(({ color }) => color !== currentColor)
		)
	}, [colors, currentColor])

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
				<ChromePicker color={currentColor} onChangeComplete={updateCurrentColor} />
				<ValidatorForm onSubmit={addNewColor}>
					<TextValidator
						value={newName}
						onChange={handleChangeColorName}
						validators={["required", "isColorNameUnique", "isColorUnique"]}
						errorMessages={[
							"This field is required.",
							"Color names must be unique.",
							"Colors must be unique."
						]}
					/>
					<Button
						variant="contained"
						color="primary"
						type="submit"
						disabled={isPaletteFull}
						style={{ backgroundColor: isPaletteFull ? "grey" : currentColor }}
					>
						{isPaletteFull ? "Palette Full" : "Add Color"}
					</Button>
				</ValidatorForm>
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
				/>
			</main>
		</div>
	)
}

export { NewPaletteForm }
