// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'

//components
import Input from '../formItems/input.jsx'

//styles
import { SearchProductWrap } from './searchProductFormStyles'

// eslint-disable-next-line react/prop-types
export default function ProductForm({ handleSubmit, btnText }) {

    const [ searchingProduct, setSearchingProduct ] = useState({ specification:"" })

    const handleChange = (e) => {
        e.preventDefault()
        setSearchingProduct({ ...searchingProduct, [e.target.name]: e.target.value})
        handleSubmit(searchingProduct.specification)
    }

    return (
        <SearchProductWrap>
            <Input 
                type="text"
                text="Pesquisar produto"
                name="specification"
                placeholder={btnText}
                handleOnChange={handleChange}
                value={searchingProduct.specification}
            />
        </SearchProductWrap>

    )
}