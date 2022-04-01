import {
    getCards
} from '../database.mjs'
import express from 'express'
const router = express.Router()
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
router.post('/card', async (req, res) => {
    try {
        if (req.body == null) {
            res.status(400).send("Request body cannot be null.")
            return
        }
        const result = await getCards().updateOne(req.query, {
            $set: req.body
        }, {
            upsert: true
        })
    } catch (e) {
        Error.captureStackTrace(e);
        throw e
    }
    if (result.insertedCount > 0) {
        res.status(200).send(result)
    } else {
        res.status(500).send("Failed to insert.")
    }
})
export default router
