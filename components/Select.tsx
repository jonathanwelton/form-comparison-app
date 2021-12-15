import React from 'react'

interface SelectProps {
    errorMessage?: string,
    label: string,
    options: { label: string, value: string}[],
    name: string,
    required?: boolean,
    type?: string,
}

const Select: React.ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = ({ errorMessage, label, name, options, required, type = 'text', ...props }, ref) => (
    <>
        <label htmlFor={name}>{label}</label>
        <select aria-describedby={errorMessage && `${name}-error-message`} aria-invalid={!!errorMessage} id={name} name={name} required={required} {...props} ref={ref}>
        <option value=""></option>
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
        {errorMessage && <span id={`${name}-error-message`} role="alert">{errorMessage}</span>}
    </>
)

const SelectwithRef = React.forwardRef(Select)

export default SelectwithRef