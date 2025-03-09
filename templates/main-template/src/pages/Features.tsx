import { useReducer, useState } from "react";
import { z } from "zod";
import Button from "../components/Button/Button.tsx";
import Card from "../components/Card/Card.tsx";
import Form, { FormField } from "../components/Form/Form.tsx";
import useToast from "../hooks/useToast.ts";
import { ModalActionKind, modalReducer } from "../components/Modal/modalReducer.ts";
import Modal from "../components/Modal/Modal.tsx";
import SearchBar, { SearchItem } from "../components/SearchBar/SearchBar.tsx";

const Features = () => {
    // Button Example
    const [buttonText, setButtonText] = useState<string | null>(null);
    const buttonOnClick = () => {
        setButtonText("Button Clicked!");
    };
    const buttonReset = () => {
        setButtonText(null);
    };

    // Search bar Example
    const searchBarItems: SearchItem[] = [
        {
            label: "Item 1",
            path: "#"
        },
        {
            label: "Item 2",
            path: "#"
        }
    ];

    // Form Example
    const formFields: FormField[] = [
        {
            key: "name",
            label: "Name",
            type: "text",
            required: true,
        },
        {
            key: "password",
            label: "Password",
            type: "password",
            required: true,
        },
        {
            key: "preference",
            label: "Preference",
            type: "radio",
            required: true,
            options: [{
                value: "1",
                label: "Frontend"
            }, {
                value: "2",
                label: "Backend"
            }, {
                value: "3",
                label: "Devops"
            }
            ]
        },
        {
            key: "cookies",
            type: "checkbox",
            required: false,
            options: [{ label: "Accept Cookies?" }]
        },
        {
            key: "datetime",
            label: "Date and Time",
            type: "datetime",
            required: false,
        },
    ];
    const formSchema = z.object({
        name: z.string().min(1, "Field is required"),
        password: z.string().min(8, "Must be at least 8 characters"),
        preference: z.coerce.number().min(1, "Required"),
        cookies: z.boolean(),
        datetime: z.string()
    });
    const formSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data);
    };

    // Toast Example
    const { notify } = useToast();
    const toastType = "success";
    const toastContent = "This is a notification";

    // Modal Example
    const [state, dispatch] = useReducer(modalReducer, { isShowing: false });
    const modalFooter = (
        <Button type="primary" onClick={() => dispatch({ type: ModalActionKind.TOGGLE })}>Close Modal</Button>
    );

    return (
        <div className="container grid grid-cols-6 mx-auto mb-40 max-w-6xl gap-5 min-w-96">
            <h1 className="col-span-6 text-5xl mx-auto">Feature examples</h1>
            <p className="col-span-6">This page shows examples of the custom components that come with the application.
                To view the source code, go to <code className="text-stone-400">"./src/pages/Features.tsx"</code> in your files</p>
            <Card className="col-span-6 md:col-span-3 flex-col flex justify-between gap-5">
                <h2>Button Component</h2>
                <p>This is a quick example of the use of the custom button element,
                    it is very simple to use and has multiple theme options
                </p>
                <div className="flex gap-5">
                    {/*----------Button Example----------*/}
                    <Button type="primary" onClick={buttonOnClick}>Button</Button>
                    <span className="m-auto">{buttonText ?? ""}</span>
                    <Button type="secondary" onClick={buttonReset}
                            disabled={!buttonText}>Reset</Button>
                </div>
            </Card>
            <Card className="col-span-6 md:col-span-3 flex-col flex justify-between gap-5">
                <h2>Search bar Component</h2>
                <p>This shows how you can use a search bar for navigation purposes.
                    Simply reference a list of labels and the route they lead to.</p>
                {/*----------Search bar example----------*/}
                <SearchBar items={searchBarItems} />
            </Card>

            <Card className="col-span-6 grid grid-cols-6 gap-5 ">
                <div className="col-span-6 md:col-span-3 flex-col flex gap-6">
                    <h2>Form Component</h2>
                    <p>This is an example of a dynamically generated form created with the Form component in this
                        boilerplate. The form is built using a simple JSON-like configuration and Zod validation schema,
                        this allows for rapid creation and type safety</p>
                    <div>
                        <p>Features:</p>
                        <ul className="list-disc list-inside">
                            <li>Custom styled field types</li>
                            <li>Zod validation with customisable error messages</li>
                            <li>Easily customisable fields using a JSON-like field array</li>
                            <li>Simple submission handling</li>
                        </ul>
                    </div>
                    <div>
                        <p>Field Options:</p>
                        <ul className="list-disc list-inside">
                            <li>text | email | password</li>
                            <li>number</li>
                            <li>checkbox | radio</li>
                            <li>select</li>
                            <li>date | time</li>
                        </ul>
                    </div>
                </div>
                <div className="col-span-6 md:col-span-3 flex-col flex gap-5">
                    {/*----------Form example----------*/}
                    <Form title="Example Form" cancellable={false} fields={formFields} schema={formSchema}
                          onSubmit={formSubmit}/>
                </div>
            </Card>

            <Card className="col-span-6 md:col-span-3 flex-col flex justify-between gap-5">
                <h2>Toast Component (notification)</h2>
                <p>This shows how you can use a toast to notify the user of any actions.
                    You can also put anything you want in the toast, including buttons etc</p>
                {/*----------Toast Example----------*/}
                <Button className="mx-auto" type="primary"
                        onClick={() => notify(toastType, toastContent)}>Notify</Button>
            </Card>
            <Card className="col-span-6 md:col-span-3 flex-col flex gap-5 justify-between">
                <h2>Modal Component</h2>
                <p>Here is an example of the modal component,
                    this is a useful way to focus the users attention.
                </p>
                <p>
                    Note: it does not matter where you place the Modal component.
                </p>
                {/*----------Modal Example----------*/}
                <Button className="mx-auto" type="primary"
                        onClick={() => dispatch({ type: ModalActionKind.TOGGLE })}>Open
                    Modal</Button>
                <Modal show={state.isShowing} onClose={() => dispatch({ type: ModalActionKind.TOGGLE })}
                       title="Example modal" footer={modalFooter}>
                    <Card>
                        <p>You can put anything inside a modal</p>
                    </Card>
                </Modal>
            </Card>
        </div>
    );
};

export default Features;