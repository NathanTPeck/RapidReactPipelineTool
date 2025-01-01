import Form, { FormField } from "../components/Form/Form";
import { z } from "zod";
import Card from "../components/Card/Card.tsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const fields: FormField[] = [
        {
            name: "email",
            label: "Email",
            type: "email",
            required: true,
        },
        {
            name: "password",
            label: "Password",
            type: "password",
            required: true,
        },
    ];

    const schema = z.object({
        email: z.string().email("Invalid email address").min(1, "Field is required"),
        password: z.string().min(8, "Must be at least 8 characters"), // Todo: super refine for pw strength
    });
    

    const handleSubmit = (data: z.infer<typeof schema>)=> {
        // ToDo send to backend
        navigate("/home");
    }

    const handleCancel = () => {
        navigate("/home");
    }
    
    return (
        <Card className="w-full max-w-lg m-auto flex justify-center items-center">
            <Form
                title="Login"
                fields={fields}
                cancellable={true}
                schema={schema}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        </Card>
    );
};

export default Login;