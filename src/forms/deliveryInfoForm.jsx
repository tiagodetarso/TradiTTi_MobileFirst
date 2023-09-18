// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'

import Select from '../formItems/select'
import Input from '../formItems/input'

import {DeliveryInfoWrap} from './deliveryInfoFormStyles'

export default function DeliveryInfo({ handleSubmit, deliveryTx, deliveryInterval, pickupInterval }) {

    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL
    const clientNumber = import.meta.env.VITE_REACT_APP_CLIENT_NUMBER

    const deliveryInfo = useSelector((state) => state.delivery.info)

    const [neighborhoods, setNeighborhoods] = useState([])
    const [info, setInfo] = useState(deliveryInfo)
        
    const receiveWay =[ 
        "Entrega em domicílio",
        "Retirar no balcão para viagem",
        "Retirar no balcão p/ comer na Praça"
    ]

    const payment =[ 
        "Dinheiro",
        "Pix",
        "Cartão de Débito ou Crédito"
    ]

    const submit = () => {
        handleSubmit(info)
    }

    const handleChange = (e) => {
        setInfo ({ ...info, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        function Neighborhood () {
            fetch (`${apiUrl}/client/getdeliveryfee`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({clientNumber: clientNumber})
            })
            .then(resp => resp.json())
            .then((data) => {
                if (data.msg === "Pesquisa realizada com sucesso!") {
                    const content = data.content.deliveryFee
                    setNeighborhoods(Object.keys(content))
                } 
            })
            .catch((err) => console.log(err))
        }

        Neighborhood()
        console.log(neighborhoods)
    },[])

    useEffect(() => {
        submit()
    },[info])

    return (
        <DeliveryInfoWrap>
            <form onSubmit={submit}>
            <Input 
                type='text'
                text='Nome'
                name='clientName'
                placeholder='Preenchimento obrigatório'
                handleOnChange={handleChange}
                value={info.clientName}
            />
            <Input 
                type='text'
                text='Avenida / Rua /Travessa'
                name='street'
                placeholder='Obrigatório p/ entrega em domicílio'
                handleOnChange={handleChange}
                value={info.street}
            />
            <Input 
                type='text'
                text='Número do Local'
                name='placeNumber'
                placeholder='Obrigatório p/ entrega em domicílio'
                handleOnChange={handleChange}
                value={info.placeNumber}
            />
            <Input 
                type='text'
                text='Complemento de Endereço'
                name='adressComplement'
                placeholder='Se houver, para os casos de entrega em domicílio'
                handleOnChange={handleChange}
                value={info.adressComplement}
            />
            <Input 
                type='text'
                text='Ponto de Referência'
                name='referencePoint'
                placeholder='Preenchimento opcional'
                handleOnChange={handleChange}
                value={info.referencePoint}
            />
            <Select
                name="neighborhood"
                ops={neighborhoods}
                text="Bairro e/ou Distrito"
                size={1}
                handleOnChange={handleChange}
                value={info.neighborhood}
            />
            <Select
                name="receiveWay"
                ops={receiveWay}
                text="Forma de Recebimento do Pedido"
                size={1}
                handleOnChange={handleChange}
                value={info.receiveWay}
            />
            {
                info.receiveWay === "Entrega em domicílio"
                ?
                    Number(deliveryTx) === 0 ?
                    <p>{`Não entregamos em/no ${info.neighborhood}`}</p> :
                    <p>{`Tempo aprox. para a ENTREGA:`}<br></br>{`${deliveryInterval}`}</p>
                :
                info.receiveWay === "Retirar no balcão para viagem" || info.receiveWay === "Retirar no balcão p/ comer na Praça" ?
                <p>{`Tempo aprox. para a RETIRADA no balcão:`}<br></br>{`${pickupInterval}`}</p> :
                <></>
            }
            <Select
                name="payment"
                ops={payment}
                text="Forma de Pagamento"
                size={1}
                handleOnChange={handleChange}
                value={info.payment}
            />
            {
                info.payment === "Dinheiro" 
                ?
                <Input 
                type='number'
                text='Troco para (R$):'
                name='paymentChange'
                handleOnChange={handleChange}
                value={info.paymentChange}
                />
                :
                    info.payment === "Pix" ?
                    <>
                        <p>Nossa Chave Pix: 44997006598</p>
                        <p>Beneficiário: PPMG INTERNATIONAL</p>
                    </> :
                    <>
                    </>
            }
            </form>
        </DeliveryInfoWrap>
    )
}