import React, { useState } from "react"
import { Route, Switch } from "react-router-dom"
import { Palette } from "./Palette"
import { PaletteList } from "./PaletteList"
import seedColors from "./seedColors"
import { generatePalette } from "./colorHelpers"
import { SingleColorPalette } from "./SingleColorPalette"
import { NewPaletteForm } from "./NewPaletteForm"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import "./app.css"

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
		<Route
			render={({ location }) => (
				<TransitionGroup>
					<CSSTransition key={location.key} classNames="fade" timeout={500}>
						<Switch location={location}>
							<Route
								exact
								path="/"
								render={routeProps => (
									<div className="page">
										<PaletteList palettes={palettes} {...routeProps} />}
									</div>
								)}
							/>
							<Route
								exact
								path="/palette/new"
								render={routeProps => (
									<div className="page">
										<NewPaletteForm savePalette={savePalette} palettes={palettes} {...routeProps} />
									</div>
								)}
							/>
							<Route
								exact
								path="/palette/:id"
								render={routeProps => (
									<div className="page">
										<Palette palette={generatePalette(findPalette(routeProps.match.params.id))} />
									</div>
								)}
							/>
							<Route
								path="/palette/:paletteId/:colorId"
								render={routeProps => (
									<div className="page">
										<SingleColorPalette
											colorId={routeProps.match.params.colorId}
											palette={generatePalette(findPalette(routeProps.match.params.paletteId))}
										/>
									</div>
								)}
							/>
							<Route render={() => <h1>Page Not Found.</h1>} />
						</Switch>
					</CSSTransition>
				</TransitionGroup>
			)}
		/>
	)
}

export default App
