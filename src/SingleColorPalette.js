import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ColorBox } from "./ColorBox"
import { Navbar } from "./Navbar"
import { PaletteFooter } from "./PaletteFooter"

const SingleColorPalette = ({ palette, colorId }) => {
	const [shades, setShades] = useState([])
	const [format, setFormat] = useState("hex")

	const gatherShades = (palette, colorToFilterBy) => {
		let shades = []
		let allColors = palette.colors

		for (let key in allColors) {
			shades = shades.concat(allColors[key].filter(color => color.id === colorToFilterBy))
		}
		return shades.slice(1)
	}

	useEffect(() => {
		setShades(gatherShades(palette, colorId))
	}, [palette, colorId])

	const changeFormat = val => {
		setFormat(val)
	}

	const { paletteName, id, emoji } = palette

	const colorBoxes = shades.map(color => (
		<ColorBox key={color.name} name={color.name} background={color[format]} showLink={false} />
	))
	return (
		<div className="palette single-color-palette">
			<Navbar handleChange={changeFormat} showSlider={false} />
			<h1>Single color palette</h1>
			<div className="palette-colors">
				{colorBoxes}
				<div className="go-back color-box">
					<Link to={`/palette/${id}`} className="back-button">
						Go Back
					</Link>
				</div>
			</div>
			<PaletteFooter paletteName={paletteName} emoji={emoji} />
		</div>
	)
}

export { SingleColorPalette }
