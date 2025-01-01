import { FormField } from "../Form";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { ReactNode } from "react";
import { Text, Number, Select, Radio, Checkbox, DateTime } from "./InputFields/InputFields";
import "./InputFieldWrapper.css"


type InputFieldProps<T extends FieldValues> = {
    field: FormField;
    register: UseFormRegister<T>;
    error?: string;
}

const InputFieldWrapper = <T extends FieldValues>({ field, register, error }: InputFieldProps<T>) => {
    const registerOptions = {
        ...register(field.name as Path<T>),
    };

    const renderers: Record<string, ReactNode | null> = {
        text: <Text error={error} type="text" registerOptions={registerOptions} />,
        email: <Text error={error} type="email" registerOptions={registerOptions} />,
        number: <Number error={error} registerOptions={registerOptions} />,
        password: <Text error={error} type="password" registerOptions={registerOptions} />,
        select: field.options ? (
            <Select error={error} options={field.options} registerOptions={registerOptions} />
        ) : null,
        checkbox: field.options ? (
            <Checkbox error={error} options={field.options} registerOptions={registerOptions} />
        ) : null,
        radio: field.options ? (
            <Radio error={error} options={field.options} registerOptions={registerOptions} />
        ) : null,
        date: <DateTime type="date" registerOptions={registerOptions} error={error} />,
        time: <DateTime type="time" registerOptions={registerOptions} error={error} />,
        datetime: <DateTime type="datetime-local" registerOptions={registerOptions} error={error} />,
    };

    return (
        <div className="form-group">
            <label className="form-label">{field.label} {field.required ? <span style={{ color: "indianred" }}>*</span> : ""}</label>
            {renderers[field.type] ?? null}
            {error && <span className="error-message">{error}</span>}
            {field.customComponent}
        </div>
    );
};

export default InputFieldWrapper;
