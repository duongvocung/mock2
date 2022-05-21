import React, { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header/Header";
import styles from "./SearchProductUser.module.scss";
import {searchProduct} from '../../../../apis/product'
function SearchProductUser() {
    const [resultProduct, setResultProduct] = useState([]);
    // const [searchItem, setSearchItem] = useState([])
    const params = useParams();
    const navigate = useNavigate()
    // console.log(params);
    useEffect(() => {
        searchProduct(params.id).then((data) => {
            // console.log(data);
            setResultProduct(data.data.data.products.result)
            // console.log(resultProduct);
        })
    
     
    }, [params.id])
    const _clickDetailsProduct = (id) =>{
        navigate("/product" +  "/" + id )
    }
    const renderStar = (number) => {
        let star = [];
        for (let i = 0; i < number; i++) {
            star.push(1);
        }
        // console.log(star);
        return star.map((element, index) => {
            return (
                <div className={styles.wapper__item__star_small}>
                    <svg
                        width="18"
                        height="17"
                        viewBox="0 0 18 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M4.61224 15.4427C4.2258 15.6413 3.78823 15.2942 3.86603 14.8508L4.69576 10.1213L1.17343 6.76462C0.844247 6.45092 1.01465 5.87737 1.45564 5.81472L6.35411 5.11885L8.53823 0.792305C8.73498 0.402565 9.26795 0.402565 9.4647 0.792305L11.6488 5.11885L16.5473 5.81472C16.9883 5.87737 17.1587 6.45092 16.8295 6.76462L13.3072 10.1213L14.1369 14.8508C14.2147 15.2942 13.7771 15.6413 13.3907 15.4427L9.00146 13.1868L4.61224 15.4427Z"
                            fill="#FFD333"
                            stroke="#B6B6B6"
                        />
                    </svg>
                </div>
            );
        });
    };
    return (
        <div>
        <Header></Header>
            <div className={styles.wapper__item}>
                {resultProduct.map((data, index) => (
                    <div className={styles.frame} key={index} onClick={ () => _clickDetailsProduct(data.id)}>
                        <img
                            className=" "
                            src={data.images[0].url}
                            alt="First slide"
                        />
                        <div className={styles.content__item}>{data.name}</div>
                        <div className={styles.id__item}>{data.id}</div>
                        <div className={styles.wapper__item__star}>
                            <div style={{ display: "flex" }}>
                                {renderStar(data.rating)}
                            </div>
                            <div className={styles.saleof__item}> 50% Off</div>
                        </div>
                        <div className={styles.wapper__item__star}>
                            <div className={styles.money}>{data.price} $</div>
                            <div className={styles.cart__item}>
                                <svg
                                    width="30"
                                    height="28"
                                    viewBox="0 0 30 28"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M17.6491 8.4C17.6491 7.88453 17.2244 7.46667 16.7005 7.46667C16.1766 7.46667 15.7519 7.88453 15.7519 8.4V11.2H12.906C12.3821 11.2 11.9573 11.6179 11.9573 12.1333C11.9573 12.6488 12.3821 13.0667 12.906 13.0667H15.7519V15.8667C15.7519 16.3821 16.1766 16.8 16.7005 16.8C17.2244 16.8 17.6491 16.3821 17.6491 15.8667V13.0667H20.495C21.019 13.0667 21.4437 12.6488 21.4437 12.1333C21.4437 11.6179 21.019 11.2 20.495 11.2H17.6491V8.4Z"
                                        fill="#212529"
                                    />
                                    <path
                                        d="M1.52236 0C0.998448 0 0.57373 0.417868 0.57373 0.933333C0.57373 1.4488 0.998448 1.86667 1.52236 1.86667H3.62759L4.38973 4.86603L7.23041 19.772C7.31454 20.2134 7.7063 20.5333 8.1628 20.5333H10.0601C7.9644 20.5333 6.26553 22.2048 6.26553 24.2667C6.26553 26.3285 7.9644 28 10.0601 28C12.1557 28 13.8546 26.3285 13.8546 24.2667C13.8546 22.2048 12.1557 20.5333 10.0601 20.5333H23.3409C21.2453 20.5333 19.5464 22.2048 19.5464 24.2667C19.5464 26.3285 21.2453 28 23.3409 28C25.4366 28 27.1355 26.3285 27.1355 24.2667C27.1355 22.2048 25.4366 20.5333 23.3409 20.5333H25.2382C25.6947 20.5333 26.0865 20.2134 26.1706 19.772L29.0165 4.83867C29.0685 4.56577 28.9943 4.28426 28.8141 4.07061C28.6339 3.85695 28.3663 3.73333 28.0841 3.73333H6.05757L5.28857 0.706967C5.183 0.291478 4.80356 0 4.36826 0H1.52236ZM8.95009 18.6667L6.45993 5.6H26.9411L24.4509 18.6667H8.95009ZM11.9573 24.2667C11.9573 25.2976 11.1079 26.1333 10.0601 26.1333C9.01223 26.1333 8.1628 25.2976 8.1628 24.2667C8.1628 23.2357 9.01223 22.4 10.0601 22.4C11.1079 22.4 11.9573 23.2357 11.9573 24.2667ZM25.2382 24.2667C25.2382 25.2976 24.3888 26.1333 23.3409 26.1333C22.2931 26.1333 21.4437 25.2976 21.4437 24.2667C21.4437 23.2357 22.2931 22.4 23.3409 22.4C24.3888 22.4 25.2382 23.2357 25.2382 24.2667Z"
                                        fill="#212529"
                                    />
                                </svg>
                            </div>
                        </div>
                        <button className={styles.btn_item}>Avaiable</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchProductUser;
