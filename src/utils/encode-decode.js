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

    static encodeStatetoQueryStr = (presetName, by, profile, stateObj) => {
        if (!stateObj || !presetName || !by) return
        const notes = this.#encodeNotes(stateObj.preset.notes)
        const thingstoEncode = {
            a: presetName,
            b: by,
            c: profile,
            d: stateObj.options.tempo,
            // noOfNodes: stateObj.preset.noOfNodes,
            e: notes
        }
        const b64 = btoa(JSON.stringify(thingstoEncode))
        return encodeURIComponent(b64)
    }

    static decodeQueryStrtoState = (queryStr) => {
        if (queryStr === "" || !queryStr) return
        const uri = atob(decodeURIComponent(queryStr))
        const Obj = JSON.parse(uri)
        const notes = this.#decodeNotes(Obj.e)
        const decodedObj = {
            presetName: Obj.a,
            by: Obj.b,
            profile: Obj.c,
            tempo: Obj.d,
            noOfNodes: 16,
            notes
        }
        return decodedObj;
    }
}