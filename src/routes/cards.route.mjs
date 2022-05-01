import {
    getCard, getUsers, getDeck
} from '../database.mjs'
import express from 'express'
const router = express.Router()

router.delete('/card/delete', async (req, res) => {
    let user = await getUsers().findOne({email: req.query.email})
    let deck = await getDeck(req.query.email, req.query.deck)
    deck.Cards.splice(req.query.index, 1)
    user.Decks[user.Decks.findIndex(x => x.Title == req.query.deck)] = deck
    const result = await getUsers().replaceOne({email: req.query.email}, user)
    if (result.modifiedCount > 0) {
        res.status(200).send("Success.")
    } else {
        res.status(500).send("Failed to delete.")
    }
})
router.get('/card', async (req, res) => {
    if (req.body == null) {
        res.status(400).send("request body cannot be null.")
        return
    }
    const card = await getCard(req.query.email, req.query.deck, req.query.index)
    if (card != null) {
        res.status(200).send(card)
    } else {
        res.status(500).send("Failed to get card.")
    }
})
router.get('/deck', async (req, res) => {
    if (req.body == null) {
        res.status(400).send("request body cannot be null.")
        return
    }
    const deck = await getDeck(req.query.email, req.query.deck)
    if (deck != null) {
        res.status(200).send(deck)
    } else {
        res.status(500).send("Failed to get deck.")
    }
})
router.post('/card/update', async (req, res) => {
    let user = await getUsers().findOne({email: req.query.email})
    let deck = await getDeck(req.query.email, req.query.deck)
    deck.Cards[req.query.index] = req.body
    user.Decks[user.Decks.findIndex(x => x.Title == req.query.deck)] = deck
    let result
    try {
        result = await getUsers().replaceOne({email: req.query.email}, user)
    } catch (e) {
        res.status(500).send("Index not found.")
        return
    }
    if (result.modifiedCount > 0) {
        res.status(200).send("Success.")
    } else {
        res.status(500).send("Failed to insert.")
    }
})
router.post('/card/new', async (req, res) => {
    let user = await getUsers().findOne({email: req.query.email})
    let deck = await getDeck(req.query.email, req.query.deck)
    if (deck == null) {
        res.status(500).send("Couldn't find deck.")
    }
    deck.Cards.push(req.body)
    user.Decks[user.Decks.findIndex(x => x.Title == req.query.deck)] = deck
    const result = await getUsers().replaceOne({email: req.query.email}, user)
    if (result.modifiedCount > 0) {
        res.status(200).send("Success.")
    } else {
        res.status(500).send("Failed to insert.")
    }
})
export default router
