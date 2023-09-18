// eslint-disable-next-line no-unused-vars
import React from 'react'
import { InputWrap } from './inputStyles'

export default function Input ({
                                type,
                                text,
                                name,
                                placeholder,
                                handleOnChange,
                                value,
                                step,
                                accept,
                                pattern }) {
    return (
        <InputWrap>
            <label htmlFor={name}>{text}</label>
            <input
                type={type} 
                name={name} 
                id={name} 
                placeholder={placeholder} 
                onChange={handleOnChange}
                value={value}
                checked={value}
                step={step}
                accept={accept}
                required pattern={pattern}
            />
        </InputWrap>
    )
}