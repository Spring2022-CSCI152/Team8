import { render, fireEvent ,screen, getByPlaceholderText, getAllByTestId, getAllByAltText, getByText, getByRole, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login, {handleEmail,handleLoginBtn} from "./Login";

describe("Login", ()=>{
 
    test("testing when clicking Login button ", ()=>{
        const mockFn = jest.fn();
        const component = render(<button onClick={mockFn}>Login</button>);
        fireEvent.click(screen.getByText(/login/i));
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    test("testing when clicking 'Don't have an account' ", ()=>{
        const mockFn = jest.fn();
        const {getByRole} = render(<Login handleClick={mockFn} />);
        const buttonNode = getByRole("signUpLink");
        fireEvent.click(buttonNode);
        expect(screen.findByText("Login")).toBeTruthy();
    });

    test("testing when clicking Signup button", ()=>{
        const mockFn = jest.fn();
        render(<button onClick={mockFn}>Signup</button>);
        fireEvent.click(screen.getByText(/signup/i));
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    test("testing when clicking 'Already have an account' ", ()=>{
        const mockFn = jest.fn();
        const {getByRole} = render(<Login handleClick={mockFn} />);
        const buttonNode = getByRole("loginLink");
        fireEvent.click(buttonNode);
        expect(screen.findByText("Signup")).toBeTruthy();
    });

    test("testing render signup", ()=>{
      const {getByText} = render(<Login/>);
      expect(screen.findAllByText("Signup")).toBeTruthy();
    });

    test("login email should accept text", () =>{
        const component = render(<Login/>);
        const emailNode = component.getByTestId("L-email");
        expect(emailNode.value).toMatch("");
        fireEvent.change(emailNode, {target: {value: "testing@mail.com"}});
        expect(emailNode.value).toMatch("testing@mail.com");
    });

    test("login password should accept text", () =>{
        const component = render(<Login/>);
        const passwordNode = component.getByTestId("L-password");
        expect(passwordNode.value).toMatch("");
        fireEvent.change(passwordNode, {target: {value: "TestPassword"}});
        expect(passwordNode.value).toMatch("TestPassword");
    });

    test("signup email should accept text", () =>{
        const component = render(<Login/>);
        const emailNode = component.getByTestId("S-email");
        expect(emailNode.value).toMatch("");
        fireEvent.change(emailNode, {target: {value: "testing@mail.com"}});
        expect(emailNode.value).toMatch("testing@mail.com");
    });

    test("signup password should accept text", () =>{
        const component = render(<Login/>);
        const passwordNode = component.getByTestId("S-password");
        expect(passwordNode.value).toMatch("");
        fireEvent.change(passwordNode, {target: {value: "TestPassword"}});
        expect(passwordNode.value).toMatch("TestPassword");
    });

    test("signup confirm password should accept text", () =>{
        const component = render(<Login/>);
        const cPasswordNode = component.getByTestId("S-Cpassword");
        expect(cPasswordNode.value).toMatch("");
        fireEvent.change(cPasswordNode, {target: {value: "TestPassword"}});
        expect(cPasswordNode.value).toMatch("TestPassword");
    });

});