import { unmountComponentAtNode } from "react-dom";
import {render, fireEvent, screen} from '@testing-library/react'
import Popup from './Popup'
import {Link} from 'react-router-dom'

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('popup displays score', () => {
  const {rerender} = render(<Popup content={
	  <>
          		<h1>Score</h1>
          		<div>
					<p id="percent"></p>
					<div>
						<button id="Pop" style={{marginRight: 40}}>View Incorrect Answers</button>
						<button id="Pop">Back to home page</button>
					</div>
				</div>
        	</>
  } />)
  expect(screen.getByTestId('display')).toHaveTextContent('ScoreView Incorrect AnswersBack to home page')
})

test('popup displays create new flashcard set', () => {
  const {rerender} = render(<Popup content={
	  <>
          <h1>Create New Flashcard Set</h1>
          <div className="form">
			  <label> Enter Title: </label>
			  <br></br>
			  <input type="text" className="textBox" onChange={e => setTitle(e.target.value)}></input>
			  <br></br>
			  <br></br>
			  <label> Enter Share link (Optional): </label>
			  <br></br>
			  <input type="text" className="textBox"></input>
			  <br></br>
			  <br></br>
			  <button className="confirm">Confirm</button>
		  </div>
        </>
  } />)
  expect(screen.getByTestId('display')).toHaveTextContent('Create New Flashcard Set Enter Title: Enter Share link (Optional): Confirm')
})

test('popup displays flashcard set options', () => {
  const {rerender} = render(<Popup content={
	  <>
          <h1><i>"text"</i></h1>
          <div className="options">
			  <button className="option">Study with Matching</button>
			  <button className="option">Study with Free Response</button>
			  <button className="option">View Study Statistics</button>
			  <button className="option">View Flashcards</button>
			  <button className="option">Edit Flashcards</button>
			  <button className="option">Delete Flashcards</button>
			  <button className="option">Generate Share Link</button>
		  </div>
      </>
  } />)
  expect(screen.getByTestId('display')).toHaveTextContent('"text"Study with MatchingStudy with Free ResponseView Study StatisticsView FlashcardsEdit FlashcardsDelete FlashcardsGenerate Share Link')
})