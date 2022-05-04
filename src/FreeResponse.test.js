import { render, fireEvent, screen,} from '@testing-library/react';
import FreeResponse from './FreeResponse';


describe("FreeResponse", ()=>{
 
    test("answer text area should accept text", () =>{
        const testAnswer = "test";
        const component = render(<FreeResponse/>);
        const answerNode = component.getByTestId("answer-text")
        expect(answerNode.value).toMatch("");
        fireEvent.change(answerNode, {target: {value: testAnswer}});
        expect(answerNode.value).toMatch("test");
    });

    test("render free response flip and next button should not be visible", () =>{
        const testAnswer = "test";

        const component = render(<FreeResponse/>);
        const answerNode = component.getByTestId("answer-text")
        const checkbutton = component.getByRole("check");

        const flipbutton = screen.queryByText("flip");
        const nextbutton = screen.queryByText("next");

        expect(flipbutton).not.toBeInTheDocument()
        expect(nextbutton).not.toBeInTheDocument()

    });

    test("user clicks check button flip and next buttons should be visible", () =>{
        const testAnswer = "test";

        const component = render(<FreeResponse/>);
        const answerNode = component.getByTestId("answer-text")
        const checkbutton = component.getByRole("check");

        fireEvent.change(answerNode, {target: {value: testAnswer}});
        fireEvent.click(checkbutton);

        expect(document.getElementById("b-Text")).toBeVisible();
        expect(document.getElementById("flipBtn")).toBeVisible();
        expect(document.getElementById("nextBtn")).toBeVisible();
    });

    test("test flip button gets called", () =>{
        const mockFn = jest.fn();
        render(<button onClick={mockFn}>Flip</button>);
        fireEvent.click(screen.getByText(/flip/i));
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    test("test clicking next button should clear answer and hide flip and next button", () =>{
        const testAnswer = "test";

        const component = render(<FreeResponse/>);
        const answerNode = component.getByTestId("answer-text")
        const checkbutton = component.getByRole("check");

        fireEvent.change(answerNode, {target: {value: testAnswer}});
        fireEvent.click(checkbutton);

        fireEvent.click(screen.getByRole("next"));

        expect(answerNode.value).toMatch("");

    });





});