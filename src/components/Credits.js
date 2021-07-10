import React, { useContext } from "react";
import { RhythmContext } from "../RhythmContext";

export default function Credits() {
    const { presetName, profile, by } = useContext(RhythmContext)
    if (!presetName || !by) return null;
    const madeBy = (profile !== "")
        ? <a href={profile}>{by}</a>
        : <>{by}</>

    return (
        <section>
            <p>This particular rhythm was made and shared by {madeBy}</p>
        </section>
    )
}