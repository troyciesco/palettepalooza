import React from "react"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import { DraggableColorBox } from "./DraggableColorBox"
import { SortableContainer } from "react-sortable-hoc"

const DraggableColorList = SortableContainer(({ colors, removeColor }) => {
	return (
		<TransitionGroup style={{ height: "100%" }}>
			{colors.map((color, i) => (
				<CSSTransition key={color.name} classNames="fade" timeout={300}>
					<DraggableColorBox
						index={i}
						key={color.name}
						color={color.color}
						name={color.name}
						handleClick={() => removeColor(color.name)}
					/>
				</CSSTransition>
			))}
		</TransitionGroup>
	)
})

export { DraggableColorList }
