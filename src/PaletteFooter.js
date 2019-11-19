import React from "react"

const PaletteFooter = ({ paletteName, emoji }) => {
	return (
		<footer className="palette-footer">
			{paletteName}
			<span className="emoji">{emoji}</span>
		</footer>
	)
}

export { PaletteFooter }
