import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login, {handleEmail,handleLoginBtn} from "./Login";
import axios from 'axios'
import { Async } from 'react-async';

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
        expect(screen.findByText("Login")).toBeDefined();
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

    test("test when user clicks signup with blank fields should produce error", () =>{
        const testEmail = '';
        const testPass = '';
        const testCPass = '';

        const component = render(<Login/>);

        fireEvent.change(screen.getByTestId("S-email"), {target: {value: testEmail}});
        fireEvent.change(screen.getByTestId("S-password"), {target: {value: testPass}});
        fireEvent.change(screen.getByTestId("S-Cpassword"), {target: {value: testCPass}});
        fireEvent.click(screen.getByRole("signUpBtn"));

        expect(document.querySelector(".error").innerHTML).toMatch("Email and Password is blank")
    });

    test("test when user clicks signup passwords not matching", () =>{
        const testEmail = 'test@email.com';
        const testPass = 'test1234';
        const testCPass = 'test1233';

        const component = render(<Login/>);

        fireEvent.change(screen.getByTestId("S-email"), {target: {value: testEmail}});
        fireEvent.change(screen.getByTestId("S-password"), {target: {value: testPass}});
        fireEvent.change(screen.getByTestId("S-Cpassword"), {target: {value: testCPass}});
        fireEvent.click(screen.getByRole("signUpBtn"));

        expect(document.querySelector(".error").innerHTML).toMatch("Password fields don't match.")
    });

    test("test when user clicks login with blank email", () =>{
        const testEmail = '';
        const testPass = 'test1234';

        const component = render(<Login/>);

        fireEvent.change(screen.getByTestId("L-email"), {target: {value: testEmail}});
        fireEvent.change(screen.getByTestId("L-password"), {target: {value: testPass}});
        fireEvent.click(screen.getByRole("loginBtn"));

        expect(document.querySelector(".error").innerHTML).toMatch("Email is blank")
    });

    test("test when user clicks login with blank password", () =>{
        const testEmail = 'test@email.com';
        const testPass = '';

        const component = render(<Login/>);

        fireEvent.change(screen.getByTestId("L-email"), {target: {value: testEmail}});
        fireEvent.change(screen.getByTestId("L-password"), {target: {value: testPass}});
        fireEvent.click(screen.getByRole("loginBtn"));

        expect(document.querySelector(".error").innerHTML).toMatch("Password is blank")
    });




    

});
