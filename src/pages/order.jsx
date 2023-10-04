// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Button from '@mui/material/Button'
import { FaTrashAlt } from 'react-icons/fa'
import { setDeliveryInfo } from '../slices/deliveryInfoSlice'
import { excludeItem } from '../slices/orderSlice'

import DeliveryInfo from '../forms/deliveryInfoForm'
import TextArea from '../formItems/textArea'
import BButton from '../formItems/button'

//styles
import { OrderWrap } from './orderStyles'

export default function Order() {

    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL
    const clientNumber = import.meta.env.VITE_REACT_APP_CLIENT_NUMBER

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const orderItems = useSelector((state) => state.order.orderItems)
    const deliveryInfo = useSelector((state) => state.delivery.info)
    const now = new Date()

    const [dayTime, setDayTime] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [taxaEntrega, setTaxaEntrega] = useState(0)
    const [tempoEntrega, setTempoEntrega] = useState("")
    const [tempoBalcao, setTempoBalcao] = useState("")
    const [totalValue, setTotalValue] = useState(0)
    const [obs, setObs] = useState("")

    function DataEHora (date) {
        const day = date.getDate()
        const month = date.getMonth()+1
        const year = date.getFullYear()
        const hour = date.getHours()
        const minute = date.getMinutes()

        const dataEhora = `${('0'+day).slice(-2)}/${('0'+month).slice(-2)}/${year} - ${('0'+hour).slice(-2)}:${('0'+minute).slice(-2)}`
        setDayTime(dataEhora)
    }

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

    function Info (obj) {
        dispatch(setDeliveryInfo(obj))
    }

    function Combo (obj) {
        const combo = obj.combo
        let comboText = (
            <div>
                <p>Esfihas do combo:</p>
                <ul>
                    {combo.map((item, index) => (
                        <li key={index}>{`${item.quantity} x ${item.specification}`}</li>
                    ))}
                </ul><br></br>
            </div>
        )
        
        if (comboText === null || comboText === undefined || comboText.props.children[1].props.children.length === 0) {
            return ""
          } else {
            return comboText
          }
    }

    function Adicional01 (obj) {
        const extra = obj.extra
        let adicional = (
            <div>
                <ul>
                    {
                        extra.map((item, index) => (
                            <li key={index}>{`(1 x R$ ${item.value.toFixed(2).replace(".",",")})`}</li>
                        ))
                    }
                </ul>
            </div>
        )
        return adicional
    }

    function Adicional02 (obj) {
        const extra = obj.extra
        let adicional = (
            <div>
                {
                    extra.length >= 1 ?
                    <p>Adicionais:</p> :
                    <></>
                }
                <ul>
                    {
                        extra.map((item, index) => (
                            <li key={index}>
                                <div className='adds'>
                                    <p>{`1 x .`}</p>
                                    {item.add.map((ingr, id) => (
                                        id === 0 ?
                                        <p key={id}>{`${ingr}`}</p> :
                                        <p key={id}>{`. e ${ingr}`}</p>
                                    ))}
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
        return adicional
    }

    function Adicional03 (obj) {
        const extra = obj.extra
        let adicional = 0
        let valor = 0
        for (let item of extra) {
            const value = item.value
            valor += value
        }
        adicional += valor

        if (adicional === 0) {
            return ""
        } else {
            return `R$ ${adicional.toFixed(2).replace(".",",")}\n`
        }
    }

    function Delete(index) {
        dispatch(excludeItem(index))
    }

    function GoMenu() {
        navigate("/menu")
    }

    function DescontoEsfihaSalgada (order) {
        let qtSum = 0
        let discount
        for (const product of order) {
            if (product.fixPromotionDay !== now.getDay() && product.subType == 'esfiha') {
                qtSum += product.quantity
            }
        }
        if (qtSum >= 10) {
            discount = (-0.5) * qtSum
        } else {
            discount = 0
        }
        return discount
    }

    function Total (pedido, recebimento) {
        let totalArray = []
        for (const item of pedido) {
            item.fixPromotionDay === now.getDay()
            ?
            totalArray.push(item.promotionValue * item.quantity)
            :
            totalArray.push(item.value * item.quantity)

            for (let add of item.extra) {
                totalArray.push(add.value)
            }
        }

        const discount = Number(DescontoEsfihaSalgada(pedido))
        if (discount !== 0) {
            totalArray.push(discount)
        }

        let soma = 0
        for (let i=0; i < totalArray.length; i++) {
            soma += Number(totalArray[i])
        }

        recebimento === "Entrega em domicílio"
        ?
        setTotalValue(soma+Number(taxaEntrega))
        :
        setTotalValue(soma)
    }

    function DeliveryFee(numberClient) {
        fetch (`${apiUrl}/client/getdeliveryfee`, {
            method: 'POST',
            headers: {
                'Content-type':'application/json',
            },
            body: JSON.stringify({clientNumber: numberClient})
        })
        .then(resp => resp.json())
        .then((data) => {
            if(data.msg === 'Pesquisa realizada com sucesso!') {
                setTaxaEntrega(data.content.deliveryFee[deliveryInfo.neighborhood])
            } else {
                setTaxaEntrega("escolha o bairro")
            }
        })
        .catch((err) => console.log(err))  
    }

    function DeliveryGap(numberClient) {
        fetch (`${apiUrl}/client/getdeliverygap`, {
            method: 'POST',
            headers: {
                'Content-type':'application/json',
            },
            body: JSON.stringify({clientNumber: numberClient})
        })
        .then(resp => resp.json())
        .then((data) => {
            if(data.msg === 'Pesquisa realizada com sucesso!') {
                setTempoEntrega(data.content.deliveryGap)
            } else {
                setTempoEntrega("erro")
            }
        })
        .catch((err) => console.log(err))  
    }

    function PickupoGap(numberClient) {
        fetch (`${apiUrl}/client/getpickupgap`, {
            method: 'POST',
            headers: {
                'Content-type':'application/json',
            },
            body: JSON.stringify({clientNumber: numberClient})
        })
        .then(resp => resp.json())
        .then((data) => {
            if(data.msg === 'Pesquisa realizada com sucesso!') {
                setTempoBalcao(data.content.pickupGap)
            } else {
                setTempoBalcao("erro")
            }
        })
        .catch((err) => console.log(err))  
    }

    const observation = (e) => {
        setObs(e.target.value)
    }

    function ItensPedido(order) {
        var itensPedido = ""

        for (let i = 1; i < order.length; i++) {
            var adicional = ""
            var comb = ""

            for (let objeto of order[i].extra) {
                let conteudo = ""
                for (let j = 0; j < objeto.add.length; j++) {
                    conteudo === "" ? conteudo += `${objeto.add[j]} ` : conteudo += `e ${objeto.add[j]}`
                }
                adicional += ` 1 x ADD de ${conteudo} (R$ ${objeto.value.toFixed(2).replace(".",",")})\n`
            }

            let combinado = ""
            for (let objeto of order[i].combo) {
                combinado += `${objeto.quantity} x ${objeto.specification}\n`
            }
            comb += combinado

            if (order[i].fixPromotionDay === now.getDay()){
                comb === "" ?
                itensPedido += `>> ${order[i].quantity} x ${order[i].subType} - ${order[i].specification} -> R$ ${(order[i].quantity * order[i].promotionValue).toFixed(2).replace('.',",")}\n${adicional}\n`:
                itensPedido += `>> ${order[i].quantity} x ${order[i].subType} - ${order[i].specification} -> R$ ${(order[i].quantity * order[i].promotionValue).toFixed(2).replace('.',",")}\n${comb}\n`
            } else {
                comb === "" ?
                itensPedido += `>> ${order[i].quantity} x ${order[i].subType} - ${order[i].specification} -> R$ ${(order[i].quantity * order[i].value).toFixed(2).replace('.',',')}\n${adicional}\n` :
                itensPedido += `>> ${order[i].quantity} x ${order[i].subType} - ${order[i].specification} -> R$ ${(order[i].quantity * order[i].value).toFixed(2).replace('.',',')}\n${comb}\n`
            }
        }
        return itensPedido
    }

    function SendOrder () {
        if (!isOpen) {
            alert("A loja não está recebendo pedidos no momento. Tente de terça-feira a Domingo, das 18:30 às 22:00 horas")
        } else {
            var whatsapp_number = '+5544997006598';
            var modoPagamento = deliveryInfo.payment === 'Dinheiro' ? `TROCO p/: R$ ${Number(deliveryInfo.paymentChange).toFixed(2).replace('.', ',')}` : '';
            var entrega = deliveryInfo.receiveWay === 'Entrega em domicílio' ? `Taxa de Entrega ---------------------> R$ ${Number(taxaEntrega).toFixed(2).replace(".",",")}` : '';
            var desconto = DescontoEsfihaSalgada > 0 ? `Desconto Esfihas Salgadas -> R$ ${DescontoEsfihaSalgada(orderItems).toFixed(2).replace('.',',')}` : "";
            var message = `Boston Esfiharia TradiTTi App\n` + 
            `-----------------------------------\n` +
            `Data: ${dayTime}\n` +
            `-----------------------------------\n` +
            `Cliente:\n` + 
            `${deliveryInfo.clientName}\n` +
            `-----------------------------------\n` +
            `Endereço:\n` + 
            `${deliveryInfo.street}, ${deliveryInfo.placeNumber}\n` +
            `${deliveryInfo.neighborhood}\n` +
            `-----------------------------------\n` +
            `Recebimento:\n` + 
            `${deliveryInfo.receiveWay.toUpperCase()}\n` +
            `-----------------------------------\n` +
            `Pagamento:\n` + 
            `${deliveryInfo.payment.toUpperCase()}\n` +
            `${modoPagamento}\n` +
            `-----------------------------------\n` +
            `Itens do Pedido:\n\n` +
            `${ItensPedido(orderItems)}\n\n` +
            `${entrega}\n\n` +
            `${desconto}\n\n` +
            `TOTAL ---------------------> R$ ${totalValue.toFixed(2).replace('.',',')}\n\n\n`+
            `OBS: ${obs}`

            if (!deliveryInfo.clientName) {
                alert("Você não preencheu seu nome.")
            } else if (!deliveryInfo.receiveWay) {
                alert("Você não escolheu o meio de recebimento do pedido.");
            } else if (deliveryInfo.receiveWay === "Entrega em domicílio" && !deliveryInfo.street) {
                alert("Você não preencheu o nome da rua.")
            } else if (deliveryInfo.receiveWay === "Entrega em domicílio" && !deliveryInfo.placeNumber) {
                alert("Você não preencheu o número da sua residência ou local do recebimento.")
            } else if (deliveryInfo.receiveWay === "Entrega em domicílio" && !deliveryInfo.neighborhood) {
                alert("Você não selecionou o bairro ou distrito do local de entrega.")
            } else if (!deliveryInfo.payment) {
                alert("Você não selecionou a forma de pagamento do pedido");
            } else if (orderItems.length <= 1) {
                alert("Pedido vazio! Vá na aba 'Escolher' para adicionar produtos ao pedido");
            } else {
                const url = `https://wa.me/${whatsapp_number}?text=${encodeURIComponent(message)}`;
          
                window.open(url);
              }
        }
    }

    useEffect(() => {
        DataEHora(now)
        IsOpen(clientNumber)
    },[orderItems, dayTime])

    useEffect(() => {
        DeliveryFee(clientNumber)
        DeliveryGap(clientNumber)
        PickupoGap(clientNumber)
        Total(orderItems, deliveryInfo.receiveWay)
    },[orderItems, taxaEntrega, deliveryInfo.receiveWay, deliveryInfo.neighborhood])

    return (
        <OrderWrap>
            <div className='titleDiv'>
                <h2 className='title' >Conclua seu Pedido!</h2>
                <p>---------------------------------------------</p>
                <h4 className='date'>{`Data: ${dayTime}`}</h4>
                <p>---------------------------------------------</p>
            </div>
            <div className='infoForm'>
                <DeliveryInfo handleSubmit={Info} deliveryTx={taxaEntrega} deliveryInterval={tempoEntrega} pickupInterval={tempoBalcao} />
                <p>---------------------------------------------</p>
            </div>
            <div className='orderDiv'>
                <div className='orderTitle'>
                    <h5>{"PEDIDO: escolher + itens ->"}</h5>
                    <Button onClick={GoMenu}>menu</Button>
                </div>
                <div className='orderHead'>
                    <p className='width5'>id</p>
                    <p className='width45'>produto</p>
                    <p className='width25'>qtd x R$</p>
                    <p className='width'>subTotal</p>
                    <p className='width5'>{" "}</p>
                </div>
                {
                    orderItems.length === 1
                    ?
                    <h4>Nenhum Produto foi selecionado</h4> 
                    :
                    orderItems.map((element, index) => {
                        if (index>0) {
                            return (
                                <div key={`${index}${element}`} className='orderRow'>
                                    <p className='width5'>{`${index}: `}</p>
                                    <p className='width45'>{`${element.subType} - ${element.specification}`}<br></br>{Adicional02(element)}{Combo(element)}<br></br></p> 
                                    {
                                        element.fixPromotionDay === now.getDay()
                                        ?
                                        <p className='width25'>{`${element.quantity} x R$ ${element.promotionValue.toFixed(2).replace(".",",")}`}<br></br><br></br>{Adicional01(element)}</p>
                                        :
                                        <p className='width25'>{`${element.quantity} x R$ ${element.value.toFixed(2).replace(".",",")}`}<br></br><br></br>{Adicional01(element)}</p>
                                    }
                                    <br></br>
                                    {
                                        element.fixPromotionDay === now.getDay()
                                        ?
                                        <p className='width20'>{`R$ ${(element.quantity * element.promotionValue).toFixed(2).replace(".",",")}`}<br></br><br></br>{Adicional03(element)}</p>
                                        :
                                        <p className='width20'>{`R$ ${(element.quantity * element.value).toFixed(2).replace(".",",")}`}<br></br><br></br>{Adicional03(element)}</p>
                                    }
                                    <p className='width5'><button className='trash' type='button' onClick={() => Delete(index)}><FaTrashAlt /></button></p>
                                </div>
                            )
                        }
                    })
                }
                <br></br>
                <div className='orderRow2'>
                    {
                        deliveryInfo?.receiveWay === "Entrega em domicílio" ?
                        <>
                        {
                            taxaEntrega === 0 ?
                            <p>Não entregamos no local selecionado</p>:
                                typeof taxaEntrega === 'number'?
                                <>
                                    <p>Taxa de Entrega</p>
                                    <p>{`R$ ${Number(taxaEntrega).toFixed(2).replace(".",",")}`}</p>
                                </>:
                                <>
                                    <p>Taxa de Entrega</p>
                                    <p>Você não selecionou um bairro</p>
                                </>
                        }
                        </> :
                        <></>
                    }
                </div>
                <br></br>
                <div className='orderRow2'>
                    {
                        DescontoEsfihaSalgada(orderItems) !== 0 &&
                        <>
                            <p>DESCONTO quantidade esfihas salgadas</p>
                            <p>{`R$ ${DescontoEsfihaSalgada(orderItems).toFixed(2).replace(".",",")}`}</p>
                        </>
                    }
                </div>
                <br></br>
                <div className='total'>
                    {
                        totalValue === 0 ?
                        <></> :
                        <>
                            <p>TOTAL DO PEDIDO</p>
                            <p>{`R$ ${Number(totalValue).toFixed(2).replace(".",",")}`}</p>
                        </>
                    }
                </div>
                <p>---------------------------------------------</p>
                <div className='obs'>
                    <TextArea 
                        text='Acrescentar observação'
                        name='obs'
                        cols={1}
                        rows={8}
                        maxLength={300}
                        placeholder='Coloque aqui observações que julgue importante, por ex: "Gostaria que meu pedido demorasse mais do que o previsto para ficar pronto, pois só estarei em casa (ou só poderei buscá-lo) a partir das 21:00 horas".'
                        handleOnChange={observation}
                        value={obs}
                    />
                    <div className='character'><span>Limite máximo de <strong>{300 - obs.length}</strong> caracteres</span></div>
                </div>
            </div>
            <BButton text="Enviar Pedido por Whatsapp" handleOnClick={SendOrder}/>
        </OrderWrap>
    )
}