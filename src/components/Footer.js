import React from "react"
import "../styles/footer.scss"

import Slider from "./Slider"

const Footer = () => (
    <footer className="footer">
    	<div className="container flex-spacebetween">
    		<Slider/>
    	    <h1>Footer</h1>
    	</div>
    </footer>
)

export default Footer