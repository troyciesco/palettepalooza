import React from "react"
import clsx from "clsx"
import { Link } from "react-router-dom"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import { PaletteMetaForm } from "./PaletteMetaForm"

const PaletteFormNav = ({ open, classes, colors, ...props }) => {
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
					<Link to="/">
						<Button variant="contained" color="secondary" type="submit">
							Go Back
						</Button>
					</Link>
					<PaletteMetaForm palettes={props.palettes} handleSubmit={props.handleSubmit} />
				</Toolbar>
			</AppBar>
		</div>
	)
}

export { PaletteFormNav }
