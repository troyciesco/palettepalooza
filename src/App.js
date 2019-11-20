import React, { useState } from "react"
import { Route, Switch } from "react-router-dom"
import { Palette } from "./Palette"
import { PaletteList } from "./PaletteList"
import seedColors from "./seedColors"
import { generatePalette } from "./colorHelpers"
import { SingleColorPalette } from "./SingleColorPalette"
import { NewPaletteForm } from "./NewPaletteForm"

function App() {
	const [palettes, setPalettes] = useState(seedColors)

	function findPalette(id) {
		return palettes.find(function(palette) {
			return palette.id === id
		})
	}

	const savePalette = newPalette => {
		console.log(newPalette)
		setPalettes([...palettes, newPalette])
	}

	return (
		<Switch>
			<Route
				exact
				path="/"
				render={routeProps => <PaletteList palettes={palettes} {...routeProps} />}
			/>
			<Route
				exact
				path="/palette/new"
				render={routeProps => (
					<NewPaletteForm savePalette={savePalette} palettes={palettes} {...routeProps} />
				)}
			/>
			<Route
				exact
				path="/palette/:id"
				render={routeProps => (
					<Palette palette={generatePalette(findPalette(routeProps.match.params.id))} />
				)}
			/>
			<Route
				path="/palette/:paletteId/:colorId"
				render={routeProps => (
					<SingleColorPalette
						colorId={routeProps.match.params.colorId}
						palette={generatePalette(findPalette(routeProps.match.params.paletteId))}
					/>
				)}
			/>
		</Switch>
	)
}

export default App
