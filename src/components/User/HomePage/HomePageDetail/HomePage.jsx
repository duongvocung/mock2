import { useEffect } from "react";
import { ButtonGroup, Carousel, Container, Row } from "react-bootstrap";
import { getAllCategories, getAllProduct } from "../../../../apis/product";
import styles from "./HomePage.module.scss";
import { useState } from "react";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";


let indexShowMore = 1;

function HomePage() {

    let navigate = useNavigate()

    const [resultProduct, setResultProduct] = useState([]);
    const [resultCategories, setResultCategories] = useState([]);
    // console.log(resultProduct);
    const _clickDetailsProduct = (id) =>{
        navigate("/product" +  "/" + id )
    }

    // let resultProduct;
    useEffect(() => {
        // getAllProduct()
        getAllProduct(1).then((data) => {
            // resultProduct = data.data.data.result;
            setResultProduct(data.data.data.result);
            // console.log(resultProduct);
        });
        getAllCategories().then((data) => {
            // console.log(data)
            setResultCategories(data.data.data);
        });
    }, []);

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
    const _onClickShowMore = () => {
        indexShowMore++;
        getAllProduct(indexShowMore).then((data) => {
            // resultProduct = data.data.data.result;
            setResultProduct([...resultProduct, ...data.data.data.result]);

            // console.log(resultProduct);
        });
    };
    // const a = (data) => {
    //     // console.log(data)
    // }
    // let map1 = [];
    
    const _showListProductCategory = (data) =>{
        navigate("/listproductcategoryuser" + "/" + data); 
    }

    return (
        <>
            {/* {resultProduct[0] &&
                resultProduct
                    .sort((a, b) => {
                        return a.countInStock - b.countInStock;
                        console.log(resultProduct);
                    })
                    .map((resultProduct) => {
                        return <li>{resultProduct.name}</li>;
                    })}
            <ul>{map1}</ul> */}

  
            <Header></Header>
            {/* category */}
            <div className={styles.wapper__category}>
                <div className={styles.category} >
                    <div className={styles.header__category}>
                        <svg
                            width="32"
                            height="26"
                            viewBox="0 0 32 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4.79102 12.7174H16.3753"
                                stroke="white"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M4.79102 6.35864H27.9596"
                                stroke="white"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M4.79102 19.076H27.9596"
                                stroke="white"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                        Categories
                    </div>

                    
                     {resultCategories.map((data, index) => (
                        <div className={styles.btn__category} key={index} onClick={() => _showListProductCategory(data)}>
                            {data}
                            <svg
                                width="9"
                                height="20"
                                viewBox="0 0 9 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M7.75632 11.0622L2.47013 19.5595C2.10476 20.1468 1.51395 20.1468 1.15247 19.5595L0.274027 18.1475C-0.0913423 17.5601 -0.0913423 16.6104 0.274027 16.0294L4.02101 10.0062L0.274027 3.98313C-0.0913423 3.39581 -0.0913423 2.44611 0.274027 1.86504L1.14858 0.440487C1.51395 -0.146829 2.10476 -0.146829 2.46624 0.440487L7.75244 8.93783C8.12169 9.52515 8.12169 10.4749 7.75632 11.0622Z"
                                    fill="#F1F1F1"
                                />
                            </svg>
                        </div>
                    ))} 
                </div>
                {/* silder */}
                <div className={styles.slider}>
                    <div className={styles.carosel}>
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className=" "
                                    src="https://images.unsplash.com/photo-1644982647869-e1337f992828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                                    alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className=" "
                                    src="https://images.unsplash.com/photo-1649696224209-c8b2027ccd37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                                    alt="Second slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className=" "
                                    src="https://images.unsplash.com/photo-1553272725-086100aecf5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwzMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </div>
                    <div className={styles.under__carosel}>
                        <img
                            className=" "
                            src="https://images.unsplash.com/photo-1553272725-086100aecf5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwzMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                            alt="Third slide"
                        />
                        <img
                            className=" "
                            src="https://images.unsplash.com/photo-1553272725-086100aecf5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwzMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                            alt="Third slide"
                        />
                        <img
                            className=" "
                            src="https://images.unsplash.com/photo-1553272725-086100aecf5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwzMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                            alt="Third slide"
                        />
                    </div>
                </div>
            </div>
            {/* free shipping */}
            <div className={styles.wapper__shipping}>
                <div className={styles.content__shipping}>
                    <svg
                        width="42"
                        height="30"
                        viewBox="0 0 42 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M4.01479 22.0078C4.16259 22.5058 4.72809 22.8047 5.27432 22.6699L19.1805 19.2715C19.7268 19.1367 20.0545 18.6211 19.9067 18.123L16.7129 7.2539C16.5651 6.75585 15.9996 6.45702 15.4534 6.59179L10.4924 7.81054L12.0861 13.2422L8.11468 14.209L6.52099 8.77733L1.55357 9.99022C1.00734 10.125 0.679609 10.6406 0.82741 11.1387L4.01479 22.0078ZM25.4653 0C24.3279 0 23.409 0.83789 23.409 1.875V20.8359L1.168 26.3672C0.891672 26.4375 0.731018 26.6953 0.808132 26.9414L1.61783 29.6543C1.69494 29.9062 1.97769 30.0527 2.24759 29.9824L27.5474 23.6894C27.7016 27.1933 30.8376 30 34.719 30C38.6968 30 41.9163 27.0644 41.9163 23.4375V0H25.4653ZM34.719 26.25C33.0161 26.25 31.6344 24.9902 31.6344 23.4375C31.6344 21.8847 33.0161 20.625 34.719 20.625C36.4219 20.625 37.8036 21.8847 37.8036 23.4375C37.8036 24.9902 36.4219 26.25 34.719 26.25Z"
                            fill="black"
                        />
                    </svg>
                    <div>
                        <div className={styles.name__shipping}>
                            Free Shipping
                        </div>
                        <div>For orders from %50</div>
                    </div>
                </div>
                <div className={styles.content__shipping}>
                    <svg
                        width="42"
                        height="30"
                        viewBox="0 0 42 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M4.01479 22.0078C4.16259 22.5058 4.72809 22.8047 5.27432 22.6699L19.1805 19.2715C19.7268 19.1367 20.0545 18.6211 19.9067 18.123L16.7129 7.2539C16.5651 6.75585 15.9996 6.45702 15.4534 6.59179L10.4924 7.81054L12.0861 13.2422L8.11468 14.209L6.52099 8.77733L1.55357 9.99022C1.00734 10.125 0.679609 10.6406 0.82741 11.1387L4.01479 22.0078ZM25.4653 0C24.3279 0 23.409 0.83789 23.409 1.875V20.8359L1.168 26.3672C0.891672 26.4375 0.731018 26.6953 0.808132 26.9414L1.61783 29.6543C1.69494 29.9062 1.97769 30.0527 2.24759 29.9824L27.5474 23.6894C27.7016 27.1933 30.8376 30 34.719 30C38.6968 30 41.9163 27.0644 41.9163 23.4375V0H25.4653ZM34.719 26.25C33.0161 26.25 31.6344 24.9902 31.6344 23.4375C31.6344 21.8847 33.0161 20.625 34.719 20.625C36.4219 20.625 37.8036 21.8847 37.8036 23.4375C37.8036 24.9902 36.4219 26.25 34.719 26.25Z"
                            fill="black"
                        />
                    </svg>
                    <div>
                        <div className={styles.name__shipping}>
                            Free Shipping
                        </div>
                        <div>For orders from %50</div>
                    </div>
                </div>
                <div className={styles.content__shipping}>
                    <svg
                        width="42"
                        height="30"
                        viewBox="0 0 42 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M4.01479 22.0078C4.16259 22.5058 4.72809 22.8047 5.27432 22.6699L19.1805 19.2715C19.7268 19.1367 20.0545 18.6211 19.9067 18.123L16.7129 7.2539C16.5651 6.75585 15.9996 6.45702 15.4534 6.59179L10.4924 7.81054L12.0861 13.2422L8.11468 14.209L6.52099 8.77733L1.55357 9.99022C1.00734 10.125 0.679609 10.6406 0.82741 11.1387L4.01479 22.0078ZM25.4653 0C24.3279 0 23.409 0.83789 23.409 1.875V20.8359L1.168 26.3672C0.891672 26.4375 0.731018 26.6953 0.808132 26.9414L1.61783 29.6543C1.69494 29.9062 1.97769 30.0527 2.24759 29.9824L27.5474 23.6894C27.7016 27.1933 30.8376 30 34.719 30C38.6968 30 41.9163 27.0644 41.9163 23.4375V0H25.4653ZM34.719 26.25C33.0161 26.25 31.6344 24.9902 31.6344 23.4375C31.6344 21.8847 33.0161 20.625 34.719 20.625C36.4219 20.625 37.8036 21.8847 37.8036 23.4375C37.8036 24.9902 36.4219 26.25 34.719 26.25Z"
                            fill="black"
                        />
                    </svg>
                    <div>
                        <div className={styles.name__shipping}>
                            Free Shipping
                        </div>
                        <div>For orders from %50</div>
                    </div>
                </div>
                <div className={styles.content__shipping}>
                    <svg
                        width="42"
                        height="30"
                        viewBox="0 0 42 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M4.01479 22.0078C4.16259 22.5058 4.72809 22.8047 5.27432 22.6699L19.1805 19.2715C19.7268 19.1367 20.0545 18.6211 19.9067 18.123L16.7129 7.2539C16.5651 6.75585 15.9996 6.45702 15.4534 6.59179L10.4924 7.81054L12.0861 13.2422L8.11468 14.209L6.52099 8.77733L1.55357 9.99022C1.00734 10.125 0.679609 10.6406 0.82741 11.1387L4.01479 22.0078ZM25.4653 0C24.3279 0 23.409 0.83789 23.409 1.875V20.8359L1.168 26.3672C0.891672 26.4375 0.731018 26.6953 0.808132 26.9414L1.61783 29.6543C1.69494 29.9062 1.97769 30.0527 2.24759 29.9824L27.5474 23.6894C27.7016 27.1933 30.8376 30 34.719 30C38.6968 30 41.9163 27.0644 41.9163 23.4375V0H25.4653ZM34.719 26.25C33.0161 26.25 31.6344 24.9902 31.6344 23.4375C31.6344 21.8847 33.0161 20.625 34.719 20.625C36.4219 20.625 37.8036 21.8847 37.8036 23.4375C37.8036 24.9902 36.4219 26.25 34.719 26.25Z"
                            fill="black"
                        />
                    </svg>
                    <div>
                        <div className={styles.name__shipping}>
                            Free Shipping
                        </div>
                        <div>For orders from %50</div>
                    </div>
                </div>
            </div>
            {/* Bestseller */}
            <div className={styles.wapper__bestSeller}>
                <div className={styles.best_seller}>Bestsellers</div>
                <div className={styles.show} onClick={_onClickShowMore}>
                    Show more...
                </div>
            </div>
            {/* adidas shoes */}
            <div className={styles.wapper__item} >
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
                        <div style={{display:"flex"}}>
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
        </>
    );
}

export default HomePage;
