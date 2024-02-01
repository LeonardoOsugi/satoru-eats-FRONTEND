import styled from 'styled-components';
import Navbar from '../../components/NavBar';
import { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

export default function HomePage(){
    const [products, setProducts] = useState([]);
    const [product_name, setProduct_Name] = useState("");
    const [code_product, setCode_Product] = useState("");

    useEffect(() => {
        async function getProducts(){
            try{
                if(product_name !== "" && code_product !== ""){
                    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products?product_name=${product_name}&&code_product=${code_product}`);
                    setProducts(res.data);
                } else if(product_name !== ""){
                    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products?product_name=${product_name}`);
                    setProducts(res.data);
                }else if(code_product !== ""){
                    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products?code_product=${code_product}`);
                    setProducts(res.data);
                }else{
                    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products`);
                    setProducts(res.data);
                }
            }catch(e){
                console.log("deu erro direto");
                alert(e.response.data.message);
            }
        }

        getProducts();
    },[setProducts, code_product, product_name])

   
    return(
        <>
            <Navbar/>
            <BoxContent>
                <h1>SEJA BEM VINDO!</h1>
                <QueryBox>
                    <input
                    placeholder='Procure por nome do produto?'
                    type="text"
                    value={product_name}
                    onChange={(e) => setProduct_Name(e.target.value.replace(/ /g, '%20'))}
                    required
                    />
                    <input
                    placeholder='Procure por código do produto?'
                    type="text"
                    value={code_product}
                    onChange={(e) => setCode_Product(e.target.value.replace(/ /g, '%20'))}
                    required
                    />
                </QueryBox>
                <h1>Produtos</h1>
                <p>Selecione um produto para adicionar ao seu pedido</p>
                <BoxProducts>
                    {products.map((p) => 
                            <BoxProduct key={p.id}>
                                <Link to={`/product/${p.id}`}>
                                    <img src={p.image} alt="BURGUE"/>
                                    <BackgroudDescription>
                                        <p>{p.product_name}</p>
                                        <p>{p.product_description}</p>
                                        <p>R${(p.price / 100).toLocaleString("pt-BR", { style: "decimal", minimumFractionDigits: 2 })}</p>
                                    </BackgroudDescription>
                                </Link>
                            </BoxProduct>
                    )}
                </BoxProducts>
            </BoxContent>
        </>
    )
};

const BoxContent = styled.div`
        display: flex;
        flex-direction: column;
        margin-left: 15%;
        margin-right: 15%;
        margin-top: 5%;
        input{
            margin-top: 2%;
            margin-bottom: 5%;
            width: 30%;
            text-decoration: none;
            background-color: lightgray;
            font-size: 25px;
            border-radius: 10px;
            border-color: solid white;
        };
        h1{
            margin-bottom: 2%;
            font-size: 40px;
        };
        p{
            margin-bottom: 5%;
            font-size:25px;
        };
`;

const BoxProducts = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    a {
        text-decoration: none;
        color: inherit; 
    }
    img {
        margin-left: 10%;
    }
`;
const BoxProduct = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 20%;
    padding: 10px;
    border-radius: 10px;
    border: 2px solid black;
    box-shadow: 10px 5px 10px lightslategray;
    margin-bottom: 10%;
    margin-left: 10px;
    img{
        width: 75%;
        margin-bottom: 10px;
    }
`;

const BackgroudDescription = styled.div`
    background-color: red;
    color: yellow;
    border-radius: 10px;
    text-decoration: none;
    padding: 10px;
    box-shadow: 10px 5px 10px lightslategray;
`;

const QueryBox = styled.div`
      display: flex;
      justify-content: space-around;
      align-items: center;
`;