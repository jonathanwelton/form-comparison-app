import React from 'react'

interface TextInputProps {
    errorMessage?: string,
    label: string,
    name: string,
    required?: boolean,
    type?: string,
}

const TextInput: React.ForwardRefRenderFunction<HTMLInputElement, TextInputProps> = ({ errorMessage, label, name, required, type = 'text', ...props }, ref) => (
    <>
        <label htmlFor={name}>{label}</label>
        <input aria-describedby={errorMessage && `${name}-error-message`} aria-invalid={!!errorMessage} id={name} name={name} required={required} type={type} {...props} ref={ref} />
        {errorMessage && <span id={`${name}-error-message`} role="alert">{errorMessage}</span>}
    </>
)

const TextInputwithRef = React.forwardRef(TextInput)

export default TextInputwithRef