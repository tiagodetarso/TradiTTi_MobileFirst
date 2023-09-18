import styled from 'styled-components'
import { C_TEXT_COLOR, D_COLOR1, D_COLOR2 } from '../global'

const media = {
    smallPhone : '@media(min-width: 250px)',
    phone1: '@media(min-width: 320px)',
    phone2: '@media(min-width: 400px)',
    others: '@media(min-width: 550px)',
 }

export const ProductWrap = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    background-color: #FFFACD;

    .productImage {
        padding: 10px;
    }

    .image {
        border-radius: 15px;
        ${media.smallPhone} {
            width: 220px;
            height: 170px;
        };
        ${media.phone1} {
            width: 290px;
            height: 198px;
        };
        ${media.phone2} {
            width: 370px;
            height: 252px;
        };
        ${media.others} {
            width: 510px;
            height: 347px;
        };
    }

    .noImage {
        text-align: center;
        font-family: monospace;
        color: red;
        ${media.smallPhone} {
            font-size: 20px;
        };
        ${media.phone1} {
            font-size: 22px;
        };
        ${media.phone2} {
            font-size: 25px;
        };
        ${media.others} {
            font-size: 28px;
        };
    }

    .productDescription {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .name {
        margin: 0;
        padding:5px;
        color: ${D_COLOR1};
        font-family: cursive;
        font-weight: bold;
        ${media.smallPhone} {
            font-size: 15px;
        };
        ${media.phone1} {
            font-size: 17px;
        };
        ${media.phone2} {
            font-size: 19px;
        };
        ${media.others} {
            font-size: 21px;
        };
    }

    .specification {
        text-align: center;
        margin: 0;
        padding:5px;
        color: ${D_COLOR2};
        font-family: cursive;
        font-style: italic;
        ${media.smallPhone} {
            font-size: 12px;
        };
        ${media.phone1} {
            font-size: 14px;
        };
        ${media.phone2} {
            font-size: 16px;
        };
        ${media.others} {
            font-size: 18px;
        };
    }

    .price {
        margin: 0;
        padding:5px;
        color: #A52A2A;
        font-family: monospace;
        font-style:
        ${media.smallPhone} {
            font-size: 17px;
        };
        ${media.phone1} {
            font-size: 19px;
        };
        ${media.phone2} {
            font-size: 21px;
        };
        ${media.others} {
            font-size: 23px;
        };
    }

    .quantityDiv {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .quantityTitle {
        margin-top:10px
        padding:2px;
        color: ${D_COLOR2};
        font-family: cursive;
        font-weight: bold;
        ${media.smallPhone} {
            font-size: 15px;
        };
        ${media.phone1} {
            font-size: 17px;
        };
        ${media.phone2} {
            font-size: 19px;
        };
        ${media.others} {
            font-size: 21px;
        };
    }

    .counter {
        display: flex;
        flex-direction: row;
        justify-content: center;
        padding:5px;
    }
    
    .plus {
        border: none;
        color: green;
        background-color: #FFFACD;
        ${media.smallPhone} {
            font-size: 30px;
        };
        ${media.phone1} {
            font-size: 40px;
        };
        ${media.phone2} {
            font-size: 50px;
        };
        ${media.others} {
            font-size: 60px;
        };
    }

    .minus {
        border: none;
        color: red;
        background-color: #FFFACD;
        ${media.smallPhone} {
            font-size: 30px;
        };
        ${media.phone1} {
            font-size: 40px;
        };
        ${media.phone2} {
            font-size: 50px;
        };
        ${media.others} {
            font-size: 55px;
        };
    }

    .quantity {
        text-align: center;
        border: none;
        border-radius: 10px;
        background-color: ${D_COLOR2};
        color: ${C_TEXT_COLOR};
        font-weight: bold;
        ${media.smallPhone} {
            font-size: 25px;
            height: 30px;
            width: 50px;
        };
        ${media.phone1} {
            font-size: 35px;
            height: 40px;
            width: 50px;
        };
        ${media.phone2} {
            font-size: 45px;
            height: 50px;
            width: 55px;
        };
        ${media.others} {
            font-size: 55px;
            height: 55px;
            width: 55px;
        };
    }

    .button{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .back {
        align-self: center;
        font-size: 25px;
        padding: 10px;
    }

    .modal {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

`