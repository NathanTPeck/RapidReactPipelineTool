import "./Footer.css"
import Form, { FormField } from "../Form/Form.tsx";
import { z } from "zod"

const Footer = () => {
    const subscribeForm: FormField[] = [{
        key: "email",
        label: "Email",
        type: "email",
        required: true,
    }]

    const subscribeSchema = z.object({
        email: z.string().email(),
    })

    return (
        <div className="footer-body p-8">
            <div className="grid grid-cols-10 container mx-auto max-w-6xl">
                <div className="col-span-5 lg:col-span-2 flex flex-col pb-4">
                    <span className="footer-title">Company</span>
                    <ul>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Enterprise</a></li>
                        <li><a href="#">Terms</a></li>
                        <li><a href="#">Privacy</a></li>
                    </ul>
                </div>
                <div className="col-span-5 lg:col-span-2 flex flex-col pb-4">
                    <span className="footer-title">Product</span>
                    <ul>
                        <li><a href="#">Security</a></li>
                        <li><a href="#">Customisation</a></li>
                        <li><a href="#">Customers</a></li>
                        <li><a href="#">Changelog</a></li>
                    </ul>
                </div>
                <div className="col-span-5 lg:col-span-2 flex flex-col pb-4">
                    <span className="footer-title">Docs</span>
                    <ul>
                        <li><a href="#">Introduction</a></li>
                        <li><a href="#">Installation</a></li>
                        <li><a href="#">Components</a></li>
                        <li><a href="#">Code Blocks</a></li>
                    </ul>
                </div>
                <div className="col-span-5 lg:col-span-4 pb-4">
                    <span className="footer-title">Subscribe</span>
                    <div className="mt-4">
                        <Form
                            cancellable={false}
                        submitText="Subscribe"
                        fields={subscribeForm}
                        schema={subscribeSchema}
                        onSubmit={() => console.log("Subscribed")}/>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Footer;