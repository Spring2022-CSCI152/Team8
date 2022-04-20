import {
    getCards
} from '../database.mjs'
import express from 'express'
const router = express.Router()

// inserts or updates a card
async function upsert(req, res, isNew) {
    let result
    try {
        if (req.body == null) {
            res.status(400).send("request body cannot be null.")
            return
        }
        if (isNew) {
            result = await getCards().insertOne(req.query, req.body)
        } else {
            result = await getCards().updateOne(req.query, {
                $set: req.body
            })
        }
    } catch (e) {
        console.log(e)
        throw e
    }
    if (result.matchedCount > 0 || isNew) {
        res.status(200).send(result)
    } else {
        res.status(500).send("Failed to insert.")
    }
}
router.delete('/card/delete', async (req, res) => {
    const result = await getCards().deleteOne(req.query)
    if (result.deletedCount === 1) {
        res.sendStatus(200)
    } else {
        res.status(500).send("Failed to delete.")
    }
})
router.get('/card', async (req, res) => {
    const result = await getCards().findOne(req.query)
    if (result !== null) {
        res.status(200).send(result)
    } else {
        res.status(404).send("Document not found.")
    }
})
router.post('/card/update', async (req, res) => {
    upsert(req, res, false)
})
router.post('/card/new', async (req, res) => {
    upsert(req, res, true)
})
export default router
