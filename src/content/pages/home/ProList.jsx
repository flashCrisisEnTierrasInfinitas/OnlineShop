import { CInputGroup, CFormInput, CButton, CCardTitle, CCard, CCardImage, CCardBody } from '@coreui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const data = [
    {
        id: 1, img: "https://c.pxhere.com/photos/84/fb/background_bitter_breakfast_bright_c_catering_closeup_close_up-819293.jpg!d",
        title: "",
        price: 80,
        quantity: 1,
    },
    {
        id: 2, img: "https://get.pxhere.com/photo/plant-white-fruit-sweet-restaurant-isolated-summer-food-salad-green-cooking-ingredient-produce-tropical-colourful-macro-natural-fresh-couple-two-colorful-closeup-breakfast-healthy-delicious-health-cookery-fitness-life-close-up-peel-background-nutrition-mango-bright-seasonal-tasty-passion-still-over-good-c-catering-diet-vitamins-bitter-refreshing-rind-dieting-flowering-plant-nutrients-several-land-plant-wholesome-819451.jpg",
        title: "Card title",
        price: 80,
        quantity: 1,
    },
    {
        id: 3, img: "https://c.pxhere.com/photos/c4/2c/background_bitter_breakfast_bright_c_catering_closeup_close_up-819464.jpg!d",
        title: "Card title",
        price: 80,
        quantity: 1,
    },
    {
        id: 4, img: "https://c.pxhere.com/photos/eb/ac/background_bitter_breakfast_bright_c_catering_closeup_close_up-819423.jpg!d",
        title: "Card title",
        price: 80,
        quantity: 1,
    },
    {
        id: 6, img: "https://c.pxhere.com/photos/51/2b/pea_peas_vegetables_green_food_healthy_vegetarian_vegetable-1050058.jpg!d",
        title: "Card title",
        price: 80,
        quantity: 1,
    },
    {
        id: 7, img: "https://c.pxhere.com/images/ed/6d/6f8f2820848433558a0982c074b5-1636140.jpg!d",
        title: "Card title",
        price: 80,
        quantity: 1,
    },
    {
        id: 9, img: "https://c.pxhere.com/photos/f8/89/appetite_banana_calories_catering_cellulite_chilli_cholesterol_close_up-1048666.jpg!d",
        title: "Card title",
        price: 80,
        quantity: 1,
    },
    {
        id: 10, img: "https://c.pxhere.com/photos/83/dd/tangerines_citrus_fruit_clementines_citrus_fruit_vitamins_juicy_orange-458951.jpg!d",
        title: "Card title",
        price: 80,
        quantity: 1,
    }
];

export default function ProList() {


    return (
        <div className="margin-90">
            <div className="conter-search top-50">
                <CInputGroup className="">
                    <CFormInput placeholder="¿Qué estás buscando?" className='input-search' />
                    <CButton type="button" color="secondary" variant="outline" ><i class="fa fa-search" aria-hidden="true"></i>Buscar</CButton>
                </CInputGroup>
            </div>
            <div >
                <div className="box-vendido">
                    {data.map(product => {
                        return (
                            <CCard>
                                <CCardImage orientation="top" src={product.img} className='img-cards' />
                                <CCardBody>
                                    <CCardTitle>{product.title}</CCardTitle>
                                    <div className="descripcio">
                                        <label>Some quick example text to build on the card title and make up</label>
                                    </div>
                                    <div className="precio">
                                        <span>$999.00</span><a>$984.00</a>
                                    </div>
                                    <div className='btn.card'>
                                        <button className='btn1 btn-primary'>Agregar al carrito</button>
                                    </div>
                                </CCardBody>
                            </CCard>

                        )
                    })}
                </div>
            </div>
        </div>
    )
}