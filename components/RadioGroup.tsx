import React from 'react'

interface RadioGroupProps {
    children: React.ReactNode,
    errorMessage?: string
    name: string,
    title: string,
}

const RadioGroup: React.ForwardRefRenderFunction<HTMLDivElement, RadioGroupProps> = ({ children, errorMessage, name, title }, ref) => (
    <div aria-invalid={!!errorMessage} aria-describedby={!!errorMessage && `${name}-error-message`} aria-labelledby={`${name}-label`} role="radiogroup" ref={ref}>
        <p id={`${name}-label`}>{title}</p>
        {children}
        {errorMessage && <span id={`${name}-error-message`} role="alert">{errorMessage}</span>}
    </div>
)

const RadioGroupwithRef = React.forwardRef(RadioGroup)

export default RadioGroupwithRef