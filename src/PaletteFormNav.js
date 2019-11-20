import React, { useState, useEffect } from "react"
import clsx from "clsx"
import { Link } from "react-router-dom"
import CssBaseline from "@material-ui/core/CssBaseline"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import { Button } from "@material-ui/core"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"

const PaletteFormNav = ({ open, classes, colors, ...props }) => {
	const [newPaletteName, setNewPaletteName] = useState("")

	const handleChangePaletteName = e => {
		e.preventDefault()
		setNewPaletteName(e.target.value)
	}

	useEffect(() => {
		ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
			props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
		)
	}, [props.palettes])

	return (
		<div>
			<CssBaseline />
			<AppBar
				position="fixed"
				color="default"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open
				})}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={props.handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, open && classes.hide)}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap>
						Persistent drawer
					</Typography>
					<ValidatorForm onSubmit={() => props.handleSubmit(newPaletteName)}>
						<TextValidator
							label="Palette Name"
							value={newPaletteName}
							onChange={handleChangePaletteName}
							validators={["required", "isPaletteNameUnique"]}
							errorMessages={["Enter palette name.", "Palette name already in use."]}
						/>
						<Link to="/">
							<Button variant="contained" color="secondary" type="submit">
								Go Back
							</Button>
						</Link>
						<Button variant="contained" color="primary" type="submit">
							Save Palette
						</Button>
					</ValidatorForm>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export { PaletteFormNav }
