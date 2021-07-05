export class EncodeDecode {
    static #encodeNotes = (notes) => {
        const encoded = {}
        const oneNoteArrReducer = (accumulator, currentValue) => {
            return `${accumulator}${currentValue}`
        }
        for (const prop in notes) {
            const bin = notes[prop].reduce(oneNoteArrReducer)
            const hex = parseInt(bin, 2).toString(16)
            encoded[prop] = hex
        }
        return encoded
    }

    static #decodeNotes = (notes) => {
        const decoded = {}
        for (const prop in notes) {
            const bin = parseInt(notes[prop], 16).toString(2).padStart(16, "0")
            decoded[prop] = bin.split("").map(i => parseInt(i));
        }
        return decoded
    }

    static encodeStatetoQueryStr = (presetName, by, stateObj) => {
        if (!stateObj || !presetName || !by) return
        const notes = this.#encodeNotes(stateObj.preset.notes)
        const thingstoEncode = {
            presetName,
            by,
            tempo: stateObj.options.tempo,
            noOfNodes: stateObj.preset.noOfNodes,
            notes
        }
        return encodeURIComponent(JSON.stringify(thingstoEncode))
    }

    static decodeQueryStrtoState = (queryStr) => {
        if (queryStr === "" || !queryStr) return

        const Obj = JSON.parse(decodeURIComponent(queryStr))
        const notes = this.#decodeNotes(Obj.notes)
        const decodedObj = {
            by: Obj.by,
            presetName: Obj.presetName,
            tempo: Obj.tempo,
            noOfNodes: Obj.noOfNodes,
            notes
        }
        return decodedObj;
    }
}