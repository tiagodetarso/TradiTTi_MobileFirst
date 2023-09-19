// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'

//images
import todoDia from '../../images/todoDiaBoston.jpg'
import esfihaDoce from '../../images/esfihaChocoBoston.jpg'
import Pastel from '../../images/pastelBoston.jpg'
import Tilapia from '../../images/tilapiaBoston.jpg'
import Alcatra from '../../images/alcatraBoston.jpg'
import Balcao from '../../images/bostonFrente.jpg'
import Closed from '../../images/fechadoBoston.jpg'

//styles
import { HomeWrap } from './homeStyles'

//components
import BButton from '../formItems/button'


export default function Home() {

    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL
    const clientNumber = import.meta.env.VITE_REACT_APP_CLIENT_NUMBER

    const navigate = useNavigate()

    const [currentDay, setCurrentDay]=useState("")
    const [promotionImage, setPromotionImage] = useState("")
    const [price, setPrice] = useState("")
    const [isOpen, setIsOpen] = useState(true)

    const responsive = {
        0:{items:1},
        568: {items:2},
        1024: {
            items: 3,
            itemsFit: 'contain'
        },
    }

    const items = [
        <div className='item' data-value='1' key="1">
            <img className='image' src={todoDia} alt="Todo Dia"/>
        </div>,
        <div className='item' data-value='2' key="2">
            <img className='image' src={esfihaDoce} alt="Esfiha Doce"/>
        </div>,
        <div className='item' data-value='3' key="3">
            <img className='image' src={Pastel} alt="Pastel"/>
        </div>,
        <div className='item' data-value='4' key="4">
            <img className='image' src={Tilapia} alt="Tilapia"/>
        </div>,
        <div className='item' data-value='5' key="5">
            <img className='image' src={Alcatra} alt="Alcatra"/>
        </div>,
        <div className='item' data-value='5' key="5">
            <img className='image' src={Balcao} alt="Balcao"/>
        </div>,
    ]

    useEffect(() => {
        function PromoImage(day) {
            fetch (`${apiUrl}/product/promotionlist`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({clientNumber: clientNumber})
            })
            .then(resp => resp.json())
            .then((data) => {
                if (data.msg === "Pesquisa bem sucedida!") {
                    const content = data.content
                    for ( let i = 0; i < content.length; i++) {
                        if (content[i].fixPromotionDay === day) {
                            setPromotionImage(content[i].promotionImage)
                            setPrice(`R$ ${content[i].promotionValue.toFixed(2).replace('.',',')}`)
                            return
                        }
                    }
                } 
            })
            .catch((err) => console.log(err))
        }


        let fullDate = new Date()
        setCurrentDay(fullDate.getDay())
        if (currentDay !== 1) {
            PromoImage(currentDay)
        } else {
            setPromotionImage(Closed)
        }
    },[clientNumber, apiUrl, currentDay])


    useEffect(() => {

        function IsOpen(numberClient) {
            fetch (`${apiUrl}/client/isopen`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({clientNumber: numberClient})
                })
                .then(resp => resp.json())
                .then((data) => {
                    if (data.msg === `Pesquisa realizada com sucesso!`) {
                        setIsOpen(data.content.isOpen)
                    }
                })
                .catch((err) => console.log(err))
        }

        IsOpen(clientNumber)
        const interval = setInterval(() => {
            IsOpen(clientNumber)
        },30000)
        return () => clearInterval(interval)

    },[])

    
    function GoMenu() {
        navigate("/menu")
    }

    return (
        <HomeWrap>
            <div className='openClose'>
            {
                isOpen ?
                <>
                    <h3 className='openned'>Estamos Abertos!!!</h3>
                    <p>Clique no botão abaixo para selecionar os produtos do seu pedido.</p>
                </> :
                <>
                    <h3 className='closed'>Estamos Fechados!!!</h3>
                    <p>Tente em outro momento! Normalmente, entregamos de terça-feira a domingo, das 18:30 às 22:30.</p>
                    <a></a>
                </>
            }
            </div>
            <BButton text="Faça seu pedido!" handleOnClick= {GoMenu}/>
            <AliceCarousel 
                mouseTracking
                items={items}
                responsive={responsive}
            />
            <div className="promo">
                <div className="imageDiv">
                    { promotionImage !== Closed ?
                    <img className="image" src={`data:image/jpeg;base64,${promotionImage}`} alt="promocao"/>
                    :
                    <img className="image" src={promotionImage} alt="promocao"/>
                    }
                    </div>
                <div className="title">
                {
                    promotionImage === Closed 
                    ?
                        <h2>Fechamos às segundas-feiras!!!</h2>
                    :
                    <>
                        <h1>APENAS</h1>
                        <h2>{price} a unidade</h2>
                    </>
                }
                </div>
            </div>
        </HomeWrap>
    )
}