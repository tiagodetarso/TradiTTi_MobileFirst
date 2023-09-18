import styled from 'styled-components'
import { C_COLOR1, M_COLOR, D_COLOR1 } from '../global'

const media = {
    other: '@media(min-width: 568px)'
}

export const HomeWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid ${M_COLOR};
    background-color: ${C_COLOR1};

    .openClose {
        width: 95%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    h1 {
        margin:0px;
        padding: 5px;
        font-style: italic;
        font-family: cursive;
        color: ${D_COLOR1};
    }

    h2 {
        margin: 0px;
        padding: 3px;
        font-style: italic;
        font-family: cursive;
        color: ${D_COLOR1};
    }

    h3 {
        margin:0;
        padding-top: 10px;
        font-style: italic;
        font-size: 20px;
        font-family: cursive;
        text-decoration: underline;
        ${media.other} {
            font-size: 25px;
        }
    }

    .closed {
        color: red;
    }
    .openned {
        color: green;
    }

    p {
        margin:0;
        padding-bottom: 10px;
        font-style: italic;
        font-family: cursive;
        font-size: 14px;
        font-weight: bold;
        text-align: justify;
        color: ${D_COLOR1};
        ${media.other} {
            font-size: 20px;
        }
    }

    .item {
        min-width: 250px;
        padding: 5px;
    }

    .image {
        border-radius: 10px;
        height: auto;
        width: 100%;
    }

    .imageDiv {
        padding: 5px;
        ${media.other} {
            width: 30%
        }
    }

    .title {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 15px;
    }

    .promo {
        justify-content: center;
        align-items: center;

        ${media.other} {
            display: flex;
            justify-content: space-around;
            font-size: 30px;
        }
    }
`