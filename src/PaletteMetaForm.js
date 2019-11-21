import React, { useState, useEffect } from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"
import "emoji-mart/css/emoji-mart.css"
import { Picker } from "emoji-mart"

const PaletteMetaForm = props => {
	const [stage, setStage] = useState("closed")
	const [newPaletteName, setNewPaletteName] = useState("")

	const handleChangePaletteName = e => {
		e.preventDefault()
		setNewPaletteName(e.target.value)
	}

	const handleClickOpen = () => {
		setStage("naming")
	}

	const handleClose = () => {
		setStage("closed")
	}

	const showEmojiPicker = () => {
		setStage("emoji")
	}

	const savePalette = newEmoji => {
		const emoji = newEmoji.native
		const newPalette = {
			paletteName: newPaletteName,
			emoji
		}
		props.handleSubmit(newPalette)
	}

	useEffect(() => {
		ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
			props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
		)
	}, [props.palettes])

	return (
		<div>
			<Button variant="contained" color="primary" onClick={handleClickOpen}>
				Save Palette
			</Button>
			<Dialog open={stage === "emoji"} onClose={handleClose}>
				<DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
				<Picker onSelect={savePalette} />
			</Dialog>
			<Dialog open={stage === "naming"} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Save Palette</DialogTitle>
				<DialogContent>
					<ValidatorForm onSubmit={showEmojiPicker}>
						<TextValidator
							label="Palette Name"
							value={newPaletteName}
							onChange={handleChangePaletteName}
							validators={["required", "isPaletteNameUnique"]}
							errorMessages={["Enter palette name.", "Palette name already in use."]}
						/>

						<Button variant="contained" color="primary" type="submit">
							Save Palette
						</Button>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
					</ValidatorForm>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export { PaletteMetaForm }
