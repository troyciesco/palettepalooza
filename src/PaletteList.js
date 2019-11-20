import React from "react"
import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/styles"
import { MiniPalette } from "./MiniPalette"

const useStyles = makeStyles({
	root: {
		backgroundColor: "blue",
		height: "100vh",
		display: "flex",
		alignItems: "flex-start",
		justifyContent: "center"
	},
	container: {
		width: "50%",
		display: "flex",
		alignItems: "flex-start",
		flexDirection: "column",
		flexWrap: "wrap"
	},
	nav: {
		display: "flex",
		width: "100%",
		justifyContent: "space-between",
		alignItems: "center",
		color: "#ffffff",
		"& a": {
			color: "#ffffff"
		}
	},
	palettes: {
		boxSizing: "border-box",
		width: "100%",
		display: "grid",
		gridTemplateColumns: "repeat(3, 30%)",
		gridGap: "5%",
		"& a": {
			textDecoration: "none"
		}
	}
})

const PaletteList = ({ palettes, history }) => {
	const classes = useStyles()

	const goToPalette = id => {
		history.push(`/palette/${id}`)
	}

	return (
		<div className={classes.root}>
			<div className={classes.container}>
				<nav className={classes.nav}>
					<h1>Palettes</h1>
					<Link to="/palette/new">Create Palette</Link>
				</nav>
				<div className={classes.palettes}>
					{palettes.map(palette => (
						<div key={palette.id}>
							<MiniPalette {...palette} handleClick={() => goToPalette(palette.id)} />
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export { PaletteList }
