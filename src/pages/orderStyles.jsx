import styled from 'styled-components'
import { C_COLOR1, M_COLOR, D_COLOR1 } from '../global'

const media = {
    smallPhone : '@media(min-width: 250px)',
    phone1: '@media(min-width: 320px)',
    phone2: '@media(min-width: 400px)',
    tablet1: '@media(min-width: 550px)',
    tablet2: '@media(min-width: 725px)',
    desktop: '@media(min-width: 900px)'
 }

export const OrderWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid ${M_COLOR};
    background-color: #e8f2a9;

    .titleDiv {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .infoForm {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .orderDiv {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        ${media.smallPhone} {
            width: 95%;
        };
        ${media.phone1} {
            width: 95%;
        };
        ${media.phone2} {
            width: 95%;
        };
        ${media.tablet1} {
            width: 600px;
        };
        ${media.tablet2} {
            width: 600px;
        };
        ${media.desktop} {
            width: 600px;
        }
    }

    .orderTitle {
        display: flex;
        flex-direction: row;
        margin:0;
        font-family: monospace;
        ${media.smallPhone} {
            font-size: 15px;
        };
        ${media.phone1} {
            font-size: 15px;
        };
        ${media.phone2} {
            font-size: 17px;
        };
        ${media.tablet1} {
            font-size: 17px;
        };
        ${media.tablet2} {
            font-size: 19px;
        };
        ${media.desktop} {
            font-size: 19px;
        }
    }

    .orderHead {
        display: flex;
        flex-direction: row;
        font-family: monospace;
        color: dodgerblue;
        text-decoration: underline;
        ${media.smallPhone} {
            width: 100%;
            font-size: 11px;
        };
        ${media.phone1} {
            width: 100%;
            font-size: 13px;
        };
        ${media.phone2} {
            width: 100%;
            font-size: 14px;
        };
        ${media.tablet1} {
            width: 600px;
            font-size: 16px;
        };
        ${media.tablet2} {
            width: 600px;
            font-size: 16px;
        };
        ${media.desktop} {
            width: 600px;
            font-size: 16px;
        }
    }

    .orderRow {
        color: forestGreen;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        ${media.smallPhone} {
            width: 100%;
            font-size: 11px;
        };
        ${media.phone1} {
            width: 100%;
            font-size: 13px;
        };
        ${media.phone2} {
            width: 100%;
            font-size: 14px;
        };
        ${media.tablet1} {
            width: 600px;
            font-size: 16px
        };
        ${media.tablet2} {
            width: 600px;
            font-size: 16px
        };
        ${media.desktop} {
            width: 600px;
            font-size: 16px
        }
    }

    .orderRow2 {
        color: forestGreen;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
        padding-right: 10px;
        padding-left: 10px;
        ${media.smallPhone} {
            width: 100%;
            font-size: 11px;
        };
        ${media.phone1} {
            width: 100%;
            font-size: 13px;
        };
        ${media.phone2} {
            width: 100%;
            font-size: 14px;
        };
        ${media.tablet1} {
            width: 600px;
            font-size: 16px
        };
        ${media.tablet2} {
            width: 600px;
            font-size: 16px
        };
        ${media.desktop} {
            width: 600px;
            font-size: 16px
        }
    }

    .total {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
        padding-right: 10px;
        padding-left: 10px;
        ${media.smallPhone} {
            width: 100%;
            font-size: 13px;
        };
        ${media.phone1} {
            width: 100%;
            font-size: 15px;
        };
        ${media.phone2} {
            width: 100%;
            font-size: 16px;
        };
        ${media.tablet1} {
            width: 600px;
            font-size: 17px
        };
        ${media.tablet2} {
            width: 600px;
            font-size: 17px
        };
        ${media.desktop} {
            width: 600px;
            font-size: 17px
        }
    }

    .title {
        margin: 0;
        padding: 5px;
        font-family: monospace;
    }

    .date {
        margin: 0;
        padding: 5px;
        font-family:monospace;
        ${media.smallPhone} {
            font-size: 15px;
        };
        ${media.phone1} {
            font-size: 15px;
        };
        ${media.phone2} {
            font-size: 17px;
        };
        ${media.tablet1} {
            font-size: 17px;
        };
        ${media.tablet2} {
            font-size: 19px;
        };
        ${media.desktop} {
            font-size: 19px;
        }
    }

    .trash {
        border:none;
        background-color: #e8f2a9;
        color: tomato;
    }
    
    p {
        margin: 0;
        font-weight: bold;
    }

    .width5 {
        display: flex;
        flex-direction: column;
        width: 5%;
        padding-right: 2px;
    }
    .width20 {
        display: flex;
        flex-direction: column;
        width: 19%;
    }
    .width25 {
        display: flex;
        flex-direction: column;
        width: 28%;
    }
    .width45 {
        display: flex;
        flex-direction: column;
        width:43%;
        padding-left: 3px;
        padding-right: 3px;
    }

    .adds {
        display: flex;
        flex-direction: row;
    }

    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    .obs {
        min-height: 100px;
        min-width: 100px;
    }

    .character {
        text-align: center;
        margin:0;
        padding-bottom: 10px;
    }
`