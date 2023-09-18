// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setProduct } from '../slices/selectedSlice'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

import { C_COLOR1, D_COLOR2 }  from '../global'

//styles
import { ListWrap } from './listStyles'

export default function SelectableList({ array }) {

    const dispatch = useDispatch()
    const navigate = useNavigate() 

    const now = new Date()
    
    function HandleListButtonClick(obj) {
        dispatch(setProduct(obj))
        navigate("/product")
    }

    return (
        <ListWrap>
            {
                array.map((category) => (
                    <div key={category.title}>
                        <h2 className="categoryTitle">{
                        category.title === 'esfiha combos' ? 'combo de esfihas' :
                            category.title === 'esfiha massa intg' ? 'esfiha massa integral' : category.title
                        }</h2>
                        <Box key={category.title} sx={{ width: '100%', bgcolor: C_COLOR1 }}>
                        <div className='list'>
                            <List 
                                key={category.title}
                            >
                            {
                                category.data.map((item, index) => (
                                            <ListItemButton  
                                                sx={{height:65, px:2, pt:2,
                                                    color: item.fixPromotionDay === now.getDay() ? 'ForestGreen' : 'initial'
                                                }} 
                                                key={index}
                                                onClick={() => HandleListButtonClick(item)}
                                            >
                                                <ListItemText
                                                    key={index} 
                                                    primary={
                                                        item.fixPromotionDay === now.getDay()
                                                        ? `${item.subType} - ${item.specification} (promo)`
                                                        : `${item.subType} - ${item.specification}`
                                                    }
                                                    secondary = {
                                                        item.fixPromotionDay === Number(now.getDay())
                                                        ?
                                                        <React.Fragment>
                                                            R$ {item.promotionValue.toFixed(2).replace(".",",")} por {item.unity}
                                                        </React.Fragment>
                                                        :
                                                        <React.Fragment>
                                                            R$ {item.value.toFixed(2).replace(".",",")} por {item.unity}
                                                        </React.Fragment>
                                                    }
                                                    primaryTypographyProps={{
                                                        color: {D_COLOR2},
                                                        fontSize: 18,
                                                        fontWeight: 'bold',
                                                        lineHeight: '80%',
                                                        mb: '5px',
                                                    }}
                                                    
                                                    secondaryTypographyProps={{
                                                        fontSize: 14,
                                                        lineHeight: '80%',
                                                        justifyContent: 'flex-end',
                                                    }}
                                                />
                                            </ListItemButton>
                                ))
                            }
                            </List>
                        </div>
                        </Box>
                    </div>
                ))
            }
        </ListWrap>
    )

}