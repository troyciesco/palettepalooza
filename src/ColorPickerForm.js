import React, { useState, useEffect } from "react"
import { ChromePicker } from "react-color"
import { Button } from "@material-ui/core"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"

const ColorPickerForm = ({ colors, ...props }) => {
	const [currentColor, setCurrentColor] = useState("teal")
	const [newName, setNewName] = useState("")

	const updateCurrentColor = newColor => {
		setCurrentColor(newColor.hex)
	}

	const handleChangeColorName = e => {
		setNewName(e.target.value)
	}

	const addNewColor = () => {
		props.addNewColor(currentColor, newName)
		setNewName("")
	}

	useEffect(() => {
		ValidatorForm.addValidationRule("isColorNameUnique", value =>
			colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
		)
		ValidatorForm.addValidationRule("isColorUnique", () =>
			colors.every(({ color }) => color !== currentColor)
		)
	}, [colors, currentColor])

	return (
		<div>
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
					disabled={props.isPaletteFull}
					style={{ backgroundColor: props.isPaletteFull ? "grey" : currentColor }}
				>
					{props.isPaletteFull ? "Palette Full" : "Add Color"}
				</Button>
			</ValidatorForm>
		</div>
	)
}

export { ColorPickerForm }
