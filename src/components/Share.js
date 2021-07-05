import React, { useContext, useRef, useState } from "react";
import { RhythmContext } from "../RhythmContext";
import "../styles/share.scss"

export default function Share({
  visible = false,
  toggleVisibility
}) {
  const { getShareURL } = useContext(RhythmContext)
  const tooltipRef = useRef(null)
  const [shareURL, setshareURL] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    profile: "",
    presetName: ""
  })

  const handelchange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))
  }

  const containerDivStyle = {
    display: (visible) ? "grid" : "none",
    opacity: (visible) ? 1 : 0,
    placeContent: "center",

    position: "fixed",
    zIndex: 20,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    transition: "300ms opacity linear"
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const twitter = (formData.profile === "") ? "" : `https://twitter.com/${formData.profile}`
    const url = getShareURL(formData.presetName, formData.name, twitter)
    const loc = String(window.location).split("?")[0]
    setshareURL(`${loc}?load=${url}`)

    navigator.clipboard.writeText(`${loc}?load=${url}`).then(function () {
      /* clipboard successfully set */
      tooltipRef.current.innerText = "Copied to clipboard";
    }, function () {
      /* clipboard write failed */
      tooltipRef.current.innerText = "Coping failed";
    });
    tooltipRef.current.classList.add("visible")
    setTimeout(() => { tooltipRef.current.classList.remove("visible") }, 1500)
  }

  return (
    <div style={containerDivStyle}>
      <form className="inner-div" onSubmit={handleSubmit}>
        <h1 className="share-heading">Share</h1>

        <label className="input-label" htmlFor="name">Your Name : </label>
        <input required placeholder="John doe" className="input-text" id="name" name="name" type="text" value={formData.name} onChange={handelchange} />

        <label className="input-label" htmlFor="rhythm">Give your rhythm a name : </label>
        <input required placeholder="My awesome Rhythm" className="input-text" id="rhythm" name="presetName" type="text" value={formData.presetName} onChange={handelchange} />

        <label className="input-label" htmlFor="profile">Attach your twitter profile to it :(optional) </label>
        <input placeholder="Jonhdoe123" className="input-text" id="profile" name="profile" type="text" value={formData.profile} onChange={handelchange} />

        <textarea className="url" disabled value={shareURL} placeholder="your sharable url will apear here" />

        <button className="btn btn-submit" type="submit">
          <span className="tooltiptext" ref={tooltipRef} id="myTooltip">Copied to clipboard</span>
          Get URL
        </button>
        <button className="btn-close" onClick={toggleVisibility}>X</button>
      </form>
    </div>
  );
}
