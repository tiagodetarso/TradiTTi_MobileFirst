// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { setSearchText } from '../slices/searchSlice'

//styles
import { MenuWrap } from './menuStyles'

//components
import SelectableList from '../components/list'
import SearchProductForm from '../forms/searchProductForm'

export default function Menu() {

    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL
    const clientNumber = import.meta.env.VITE_REACT_APP_CLIENT_NUMBER
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const searchText = useSelector((state) => state.search.searchText)
    const orderItems = useSelector((state) => state.order.orderItems)
    
    const [ theProducts, setTheProducts ] = useState([])
    const [ productsArray, setProductsArray ] = useState([])
    
    
    //const products = useMemo(() => theProducts, [theProducts]);

    useEffect(() => {
        function ListAllProducts() {
            fetch(`${apiUrl}/product/mobilelist`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({clientNumber: clientNumber})
            })
            .then(resp => resp.json())
            .then((data) => {
                if (data.msg === "Pesquisa bem sucedida!") {
                    setTheProducts(data.content)
                } 
            })
            .catch((err) => console.log(err))
        }

        ListAllProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {

        function moveArrayElement(arr, from, to) {
            var el = arr[from]
            arr.splice(from, 1)
            arr.splice(to, 0, el)
        }

        const now = new Date ()

        for (let i = 0; i < theProducts.length; i++) {
            if (theProducts[i].title === 'esfiha' ) {
                for (let j = 0; j < theProducts[i].data.length; j++) {
                    if (theProducts[i].data[j].fixPromotionDay === now.getDay()) {
                        moveArrayElement(theProducts[i].data, theProducts[i].data.indexOf(theProducts[i].data[j]), 0)
                    }
                }
            }
        }
        setProductsArray(theProducts)
    }, [theProducts])

    useEffect(() => {
        if (searchText.length <= 1) {
            setProductsArray(theProducts)
        } else {
            const list = []
            for (let j=0; j < productsArray.length; j++) {
                for (let i=0; i < productsArray[j].data.length; i++){
                    list.push(productsArray[j].data[i])
                } 
            }
            setProductsArray(
                [{
                    title:"Pesquisa de Produto",
                    data: 
                        list.filter(item => {
                            if ((item.specification).indexOf(searchText) > -1 ) {
                                return true
                            } else {
                                return false
                            }
                        })
                }]
            )
        }
    }, [searchText, theProducts])

    function Search(text) {
        dispatch(setSearchText(text))
    }

    return (
        <MenuWrap>
            <h2>MENU</h2>
            <h4>(clique sobre o produto para escolhê-lo)</h4>
            <SearchProductForm handleSubmit={Search} btnText='Descrição pós hífen(-): sabor, tipo ou marca'/>
            {
                orderItems.length <= 1 
                ?
                <></>
                :
                <Button onClick={() => navigate("/order")}>ver como esta ficando o pedido</Button>
            }
            <SelectableList array={productsArray} />
        </MenuWrap>
    )
}