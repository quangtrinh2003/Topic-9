import React from 'react';
import { ProductListParams, FetchProductsParam } from '../TypesCheck/HomeProps';
import axios from 'axios';
//import { ICatProps } from './../TypesCheck/CategoryTypes';
interface ICatProps {
    setGetCategory: React.Dispatch<React.SetStateAction<ProductListParams[]>>;
}

interface IProdByCatProps {
    catID: string;
    setGetProductsByCatID: React.Dispatch<React.SetStateAction<ProductListParams[]>>;
}

export const fetchCategories = async ({ setGetCategory }: ICatProps) => {
    try {
        const response = await axios.get("http://192.168.68.111:9000/category/getAllCategories");
        console.log("API Response", response.data);

        if (Array.isArray(response.data)) {
            const fixedData = response.data.map(item => ({
                ...item,
                images: item.images.map((img: string) => 
                    img.replace("http://localhost", "http://192.168.68.111")
            )
        }));

            setGetCategory(fixedData);
        } else {
            console.warn("fetchCategories: Dữ liệu API không là mảng", response.data);
            setGetCategory([]);
        }
    } catch (error) {
        console.log("axios get error", error);
        setGetCategory([]);
    }
};

export const fetchProductsByCatID = async ({ setGetProductsByCatID, catID }: IProdByCatProps) => {
    try {
        const response: FetchProductsParam = await axios.get(`http://192.168.68.111:9000/product/getProductByCatID/${catID}`);
        console.log("API Response", response.data);

        if (Array.isArray(response.data)) {
            const fixedData = response.data.map(item => ({
                ...item,
                images: item.images.map((img: string) => 
                    img.replace("http://localhost", "http://192.168.68.111")
            )
        }));
    
            setGetProductsByCatID(fixedData);
        }   else {
            console.warn("fetchProductsByCatID: Dữ liệu API không là mảng", response.data);
            setGetProductsByCatID([]);
        }
    } catch (error) {
        console.log("axios get error", error);
        setGetProductsByCatID([]);
    }
};






