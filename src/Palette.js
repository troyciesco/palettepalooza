import React, { useState } from "react"
import { ColorBox } from "./ColorBox"
import { Navbar } from "./Navbar"
import "./palette.css"
import { PaletteFooter } from "./PaletteFooter"

const Palette = props => {
	const [level, setLevel] = useState(500)
	const [format, setFormat] = useState("hex")

	const changeLevel = newLevel => {
		setLevel(newLevel)
	}

	const changeFormat = val => {
		setFormat(val)
	}

	const { colors, paletteName, id, emoji } = props.palette

	const colorBoxes = colors[level].map(color => (
		<ColorBox
			key={color.id}
			background={color[format]}
			name={color.name}
			moreUrl={`/palette/${id}/${color.id}`}
			showLink
		/>
	))
	return (
		<div className="palette">
			<Navbar level={level} changeLevel={changeLevel} handleChange={changeFormat} showSlider />
			<div className="palette-colors">{colorBoxes}</div>
			<PaletteFooter paletteName={paletteName} emoji={emoji} />
		</div>
	)
}

export { Palette }
