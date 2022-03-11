import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { setUpDB, getCards, getClient } from '../database'

beforeAll(setUpDB)
afterAll(async () => await getClient().close())
test('renders new card button', () => {
  render(<App />)
  const cardContentField = screen.getByRole(/button/i, { name: "New Card" })
  expect(cardContentField).toBeInTheDocument()
})

async function getNumCards() {
  return (await getCards().find().toArray()).length
}
test('new card button creates new card', async () => {
  render(<App />)
  const cardContentField = screen.getByRole(/button/i, { name: "New Card" })
  let prevNumCards = await getNumCards()
  userEvent.click(cardContentField)
  expect(await getNumCards()).toEqual(prevNumCards + 1)
})
