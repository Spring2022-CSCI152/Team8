import Ajv from "ajv"
const ajv = new Ajv()
const scoresSchema = {
    type: "array",
    elements: {
        type: "float64"
    }
}
const validateScores = ajv.compile(scoresSchema)
export {
    scoresSchema,
    validateScores
}
