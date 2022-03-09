import { render, fireEvent ,screen, getByPlaceholderText, getAllByTestId, getAllByAltText, getByText } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login, {handleEmail,handleLoginBtn} from "./Login";

describe("Login", ()=>{
 
    test("testing when clicking Login button",()=>{
        const mockFn = jest.fn();
        const {getByRole} = render(<Login handleLoginBtn={mockFn} />);
        const buttonNode = getByRole("loginBtn");
        fireEvent.submit(buttonNode);
    });

    test("testing when clicking 'Don't have an account' ", ()=>{
        const mockFn = jest.fn();
        const {getByRole} = render(<Login handleClick={mockFn} />);
        const buttonNode = getByRole("signUpLink");
        fireEvent.submit(buttonNode);
    });

    test("testing when clicking Signup button", ()=>{
        const mockFn = jest.fn();
        const {getByRole} = render(<Login handleClick={mockFn} />);
        const buttonNode = getByRole("signUpBtn");
        fireEvent.submit(buttonNode);
    });

    test("testing when clicking 'Don't have an account' ", ()=>{
        const mockFn = jest.fn();
        const {getByRole} = render(<Login handleClick={mockFn} />);
        const buttonNode = getByRole("loginLink");
        fireEvent.submit(buttonNode);
    });

    test("testing render signup", ()=>{
      const {getByText} = render(<Login/>);
      expect(screen.findAllByText("Signup")).toBeTruthy();
    });


});