import React from 'react'

interface RadioButtonProps {
    label: string,
    name: string,
    required?: boolean,
    value: string
}

const RadioButton: React.ForwardRefRenderFunction<HTMLInputElement, RadioButtonProps> = ({label, name, required, value, ...props }, ref) => (
    <>
        <input id={value} name={name} required={required} type="radio" {...props} ref={ref} value={value} />
        <label htmlFor={value}>{label}</label>
    </>
)

const RadioButtonwithRef = React.forwardRef(RadioButton)

export default RadioButtonwithRef