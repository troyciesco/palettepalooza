import React, { useState } from "react"
import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/styles"
import chroma from "chroma-js"
import "./color-box.css"
import { CopyToClipboard } from "react-copy-to-clipboard"

const useStyles = makeStyles({
	copyText: {
		color: "purple"
	}
})

const ColorBox = props => {
	const [isCopied, setIsCopied] = useState(false)
	const classes = useStyles()
	const { moreUrl, name, background, showLink } = props

	const isDarkColor = chroma(background).luminance() <= 0.09
	const isLightColor = chroma(background).luminance() >= 0.6

	const changeCopyState = () => {
		setIsCopied(true)
		setTimeout(() => setIsCopied(false), 1500)
	}

	return (
		<CopyToClipboard text={background} onCopy={changeCopyState}>
			<div style={{ background }} className="color-box">
				<div style={{ background }} className={`copy-overlay ${isCopied && "show"}`} />
				<div className={`copy-msg ${isCopied && "show"}`}>
					<h2>Copied!</h2>
					<p className={classes.copyText}>{background}</p>
				</div>
				<div className="copy-container">
					<div className="box-content">
						<span className={isDarkColor ? "light-text" : "dark-text"}>{name}</span>
					</div>
					<button className={`copy-button ${isLightColor ? "dark-text" : "light-text"}`}>
						Copy
					</button>
				</div>
				{showLink && (
					<Link to={moreUrl} onClick={e => e.stopPropagation()}>
						<span className={`see-more ${isLightColor ? "dark-text" : "light-text"}`}>More</span>
					</Link>
				)}
			</div>
		</CopyToClipboard>
	)
}

export { ColorBox }
