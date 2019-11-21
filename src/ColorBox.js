import React, { useState } from "react"
import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/styles"
import chroma from "chroma-js"
import "./color-box.css"
import { CopyToClipboard } from "react-copy-to-clipboard"
import sizes from "./sizes"

const useStyles = makeStyles({
	coloredText: {
		color: props => (chroma(props.background).luminance() >= 0.6 ? "#333333" : "#ffffff")
	},
	colorBox: {
		[sizes.down("xs")]: {
			width: "100%",
			height: props => (props.showingFullPalette ? "5%" : "10%")
		}
	}
})

const ColorBox = props => {
	const classes = useStyles(props)
	const [isCopied, setIsCopied] = useState(false)
	const { moreUrl, name, background, showLink } = props

	const changeCopyState = () => {
		setIsCopied(true)
		setTimeout(() => setIsCopied(false), 1500)
	}

	return (
		<CopyToClipboard text={background} onCopy={changeCopyState}>
			<div style={{ background }} className={`color-box ${classes.colorBox}`}>
				<div style={{ background }} className={`copy-overlay ${isCopied && "show"}`} />
				<div className={`copy-msg ${isCopied && "show"}`}>
					<h2>Copied!</h2>
					<p className={classes.coloredText}>{background}</p>
				</div>
				<div className="copy-container">
					<div className="box-content">
						<span className={classes.coloredText}>{name}</span>
					</div>
					<button className={`copy-button ${classes.coloredText}`}>Copy</button>
				</div>
				{showLink && (
					<Link to={moreUrl} onClick={e => e.stopPropagation()}>
						<span className={`see-more ${classes.coloredText}`}>More</span>
					</Link>
				)}
			</div>
		</CopyToClipboard>
	)
}

export { ColorBox }
