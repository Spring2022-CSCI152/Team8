import { unmountComponentAtNode } from "react-dom";
import {useEffect} from "./Matching";
jest.mock("axios");

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
})

describe("fetchUsers", () => {
  describe("when API call is successful", () => {
    it("should return users list", async () => {
	  const email = "testuser@tmail.com"
	  const deck = "Deck1"
	  const testDeck = {
		  0: {
			  Front: "front1",
			  Back: "back1",
		  },
	  }
	  axios.post.mockResolvedValueOnce({ email: email, deck: deck })
	  const result = await useEffect();
      expect(axios.post).toHaveBeenCalledWith('${process.env.REACT_APP_BASE_URL}/viewCards')
		expect(result.Deck.Cards).toEqual(testDeck)
	});
  });
});