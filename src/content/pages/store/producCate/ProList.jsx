import { CInputGroup, CFormInput, CButton, CCardTitle, CCard, CCardImage, CCardBody } from '@coreui/react';
import React, { useState, useEffect, useCallback } from 'react';

const data = [
    {
        id: 1, img: "https://www.semana.com/resizer/lwdgNdshDLK8AX6ZFdEW69TmEpA=/1280x720/smart/filters:format(jpg):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/semana/62Y47IWDW5FULKCKPOVYQOHXGI.jpg",
        title: "Verduras",
    },
    {
        id: 2, img: "https://www.finedininglovers.com/es/sites/g/files/xknfdk1706/files/styles/article_1200_800_fallback/public/2021-10/tipos-de-frutas%C2%A9iStock.jpg?itok=pKcl7VEK",
        title: "frutas",
    },
    {
        id: 3, img: "https://www.aperitivoslareal.com/wp-content/uploads/2021/01/Aperitivos-LA-REAL-Blog-10-beneficios-de-las-legumbres-en-tu-dieta-2-1200x675.jpg",
        title: "legumbres",
    },
];

export default function ProList() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = data?.filter(item => item.title?.toLowerCase().includes(searchTerm.toLowerCase()));
    return (
        <div className="margin-90 conter-pro">
            <div className="conter-search top-50">
                <CInputGroup >
                    <CFormInput placeholder="¿Qué estás buscando?" className='input-search'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </CInputGroup>
            </div>
            <div >
                <div className="box-vendido">
                    {filteredData?.map(product => {
                        return (
                            <CCard>
                                <div className='flex'>
                                    <CCardTitle className='top-50 '>{product.title.toUpperCase()}</CCardTitle>
                                </div>
                                <CCardImage orientation="top" src={product.img} className='img-cards' />
                                <CCardBody>
                                    <div className='flex'>
                                        <a type='button' className='btn1 btn-secondary'>Ver mas</a>
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