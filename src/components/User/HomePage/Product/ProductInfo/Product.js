import React, { useEffect, useRef, useState } from "react";
import { getAllProduct, getProductById, postReview } from "../../../../../apis/product";
import Header from "../../Header/Header";
import NavTabs from "../NavTabsProduct/NavTabs";
import styles from "./Product.module.scss";
import InputSpinner from "react-bootstrap-input-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { Nav, Pagination } from "react-bootstrap";
import avatarImg from "../../../../../images/avatar.png";
import starImg from "../../../../../images/star.svg";
import starFullImg from "../../../../../images/starFull.svg";
import Swal from "sweetalert2";
import { createCart, createItem } from "../../../../../apis/cart";

function Product() {
    const [product, setProduct] = useState([]);
    const params = useParams();

    const [review, setReview] = useState();
    const [comment, setComment] = useState([]);

    const [page, setPage] = useState(1);
    const [showReviewCus, setShowReviewCus] = useState("review");
    const quantity = useRef();

    const [countRating, setCountRating] = useState(0);
    const [content, setContent] = useState("");

    const [resultProduct, setResultProduct] = useState([]);
    const _clickDetailsProduct = (id) =>{
        navigate("/product" +  "/" + id )
    }

    const navigate = useNavigate();

    useEffect(() => {
        getProductById(params.id).then((data) => {
            setProduct(data.data.data.product);
            setReview(data.data.data.reviews);
            console.log(data);
        });
        quantity.current = 1;

        getAllProduct(1).then((data) => {
            // resultProduct = data.data.data.result;
            setResultProduct(data.data.data.result);
            // console.log(resultProduct);
        });
    }, []);

    useEffect(() => {
        if (review) {
            setComment(review.result.slice((page - 1) * 3, page * 3));
        }
        console.log(review)
    }, [review, page]);

    const renderBtn = (number) => {
        const arrNumber = [];
        for (let i = 0; i < number; i++) {
            arrNumber.push(number);
        }
        return arrNumber.map((element, index) => {
            return (
                <button
                    onClick={() => {
                        setPage(index + 1);
                    }}
                    key={index}
                >
                    {index + 1}
                </button>
            );
        });
    };

    const _onClickPrevious = () => {
        if (!(page === 1)) {
            setPage(page - 1);
        }
    };
    const _onClickNext = () => {
        if (!(page === Math.ceil(review.total / 3))) {
            setPage(page + 1);
        }
    };
    // fun render start
    const renderStar = (number) => {
        let star = [];
        for (let i = 0; i < number; i++) {
            star.push(1);
        }

        return star.map((element, index) => {
            return (
                <span className={styles.start} key={index}>
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
                </span>
            );
        });
    };
    // Post cmt
    const _onPostReview = () => {
        if (!(content && countRating)) {
            Swal.fire({
                icon: "error",
                title: "Must to type content and choose rating",
            });
        } else {
            postReview(content, countRating, params.id)
                .then(() => {
                    getProductById(params.id).then((data) => {
                        setReview(data.data.data.reviews);
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const _addToCart = () => {
        if (!localStorage.getItem("cart")) {
            const cart = {
                cart: {
                    totalPrice: quantity.current * product.price,
                    userId: localStorage.getItem("userId"),
                },
                itemArr: [
                    {
                        productId: product.id,
                        quantity: quantity.current,
                        price: product.price,
                        total: quantity.current * product.price,
                    },
                ],
            };

            createCart(cart).then((res) => {
                localStorage.setItem("cart", res.data.cart.id);
                Swal.fire({
                    icon: "success",
                    title: "Add to cart successfully!",
                });
            });
        } else {
            const item = {
                cartId: localStorage.getItem("cart"),
                productId: product.id,
                quantity: quantity.current,
                price: product.price,
                total: quantity.current * product.price,
            };

            createItem(item).then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Add to cart successfully!",
                });
            });
        }
    };

    const renderStarHover = (number) => {
        const arr = [1, 1, 1, 1, 1];
        return arr.map((element, index) => {
            if (index >= number) {
                return <img src={starImg} key={index} onClick={() => {setCountRating(index+1)}}></img>;
            }
            return <img src={starFullImg} key={index} onClick={() => {setCountRating(index+1)}}></img>;
        });
    };

    return (
        <div>
            <Header></Header>
            <NavTabs path={product} />
            <div className={styles.wapper__product}>
                <div className={styles.wapperImg}>
                    <div className={styles.mainImg}>
                        {product.images && (
                            <img
                                className=" "
                                src={product.images[0].url}
                                alt="First slide"
                                // key={index}
                            />
                        )}
                    </div>
                    <div className={styles.litteImg}>
                        {product.images &&
                            product.images.map((data, index) => (
                                <img
                                    className=" "
                                    src={data.url}
                                    alt="First slide"
                                    key={index}
                                />
                            ))}
                    </div>
                </div>

                <div className={styles.content}>
                    <div className={styles.nameProduct}>{product.name}</div>
                    <div className={styles.vote}>
                        <span className={styles.star}>
                            {renderStar(product.rating)}
                        </span>
                        <span className={styles.rowLine}>
                            <svg
                                width="2"
                                height="15"
                                viewBox="0 0 2 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M1.70312 0.625V14.1094H0.359375V0.625H1.70312Z"
                                    fill="#565353"
                                />
                            </svg>
                        </span>
                        <span className={styles.reviewer}>
                            {product.numOfReviews} reviewer
                        </span>
                        <span className={styles.rowLine}>
                            <svg
                                width="2"
                                height="15"
                                viewBox="0 0 2 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M1.70312 0.625V14.1094H0.359375V0.625H1.70312Z"
                                    fill="#565353"
                                />
                            </svg>
                        </span>
                        <span className={styles.sold}>3k Sold</span>
                    </div>
                    <div className={styles.discript}>{product.description}</div>

                    <div className={styles.underLine}>
                        <span className={styles.avai}>
                            Availability: <span>In Stock</span>
                        </span>
                        <span className={styles.brand}>
                            Brand: <span>Adidas</span>
                        </span>
                        <span className={styles.sku}>
                            Sku: <span>83690/32</span>
                        </span>
                    </div>
                    <div className={styles.price}>
                        <span className={styles.priceUSD}>
                            $ {product.price}
                        </span>
                        <button className={styles.sell}>50% Off</button>
                    </div>
                    <div className={styles.quantity}>Quantity</div>

                    <div className={styles.btn__quantity}>
                        <div className={styles.btn__plus}>
                            <InputSpinner
                                type={"number"}
                                precision={2}
                                max={100}
                                min={0}
                                step={1}
                                value={1}
                                onChange={(num) => {
                                    quantity.current = num;
                                }}
                                // variant={'dark'}
                                // size="sm"
                                className={styles.InputSpinner}
                            />
                        </div>
                        <span className={styles.btn_cart}>
                            <button onClick={_addToCart}>
                                <span>
                                    <svg
                                        width="15"
                                        height="16"
                                        viewBox="0 0 15 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M9 4.8868C9 4.59502 8.77614 4.3585 8.5 4.3585C8.22386 4.3585 8 4.59502 8 4.8868V6.4717H6.5C6.22386 6.4717 6 6.70823 6 7C6 7.29178 6.22386 7.52831 6.5 7.52831H8V9.11321C8 9.40499 8.22386 9.64151 8.5 9.64151C8.77614 9.64151 9 9.40499 9 9.11321V7.52831H10.5C10.7761 7.52831 11 7.29178 11 7C11 6.70823 10.7761 6.4717 10.5 6.4717H9V4.8868Z"
                                            fill="#212529"
                                        />
                                        <path
                                            d="M0.5 0.13208C0.223858 0.13208 0 0.368609 0 0.660382C0 0.952155 0.223858 1.18868 0.5 1.18868H1.60961L2.01131 2.88644L3.50856 11.3238C3.55291 11.5737 3.75939 11.7547 4 11.7547H5C3.89543 11.7547 3 12.7008 3 13.8679C3 15.035 3.89543 15.9811 5 15.9811C6.10457 15.9811 7 15.035 7 13.8679C7 12.7008 6.10457 11.7547 5 11.7547H12C10.8954 11.7547 10 12.7008 10 13.8679C10 15.035 10.8954 15.9811 12 15.9811C13.1046 15.9811 14 15.035 14 13.8679C14 12.7008 13.1046 11.7547 12 11.7547H13C13.2406 11.7547 13.4471 11.5737 13.4914 11.3238L14.9914 2.87095C15.0188 2.71648 14.9797 2.55713 14.8848 2.4362C14.7898 2.31526 14.6487 2.24529 14.5 2.24529H2.89039L2.48507 0.53225C2.42943 0.297067 2.22943 0.13208 2 0.13208H0.5ZM4.41496 10.6981L3.10246 3.30189H13.8975L12.585 10.6981H4.41496ZM6 13.8679C6 14.4515 5.55228 14.9245 5 14.9245C4.44772 14.9245 4 14.4515 4 13.8679C4 13.2844 4.44772 12.8113 5 12.8113C5.55228 12.8113 6 13.2844 6 13.8679ZM13 13.8679C13 14.4515 12.5523 14.9245 12 14.9245C11.4477 14.9245 11 14.4515 11 13.8679C11 13.2844 11.4477 12.8113 12 12.8113C12.5523 12.8113 13 13.2844 13 13.8679Z"
                                            fill="#212529"
                                        />
                                    </svg>
                                </span>
                                Add to cart
                            </button>
                        </span>
                    </div>
                    <div className={styles.rate}>Rate</div>
                    <span className={styles.rateStar}>
                        {renderStar(product.rating)}
                    </span>
                </div>
            </div>

            <Nav variant="pills" style={{ marginLeft: "141px" }} className='navProduct' defaultActiveKey='/review'>
                <Nav.Item style={{ backgroundColor: "", marginLeft: "348px" }}>
                    <Nav.Link
                    
                        eventKey="des"
                        onClick={() => {
                            setShowReviewCus("discription");
                        }}
                    >
                        Description
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                    eventKey="spec"
                     
                        onClick={() => {
                            setShowReviewCus("specification");
                        }}
                    >
                        Scpecification
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        eventKey="review"
                        onClick={() => {
                            setShowReviewCus("review");
                        }}
                    >
                        Reviews
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            {/* Description */}
            {showReviewCus === "discription" ? (
                <div> </div>
            ) : showReviewCus === "specification" ? (
                <div> </div>
            ) : (
                <div className={styles.wapperReviews}>
                    <div className={styles.content}> Customer Reviews</div>
                    {comment[0] &&
                        comment.map((data, index) => (
                            <div className={styles.frameReviews} key={index}>
                                <div className={styles.avtar}>
                                    <img
                                    style={{objectFit:'cover'}}
                                        src={
                                            data.userReview.avatar || avatarImg
                                        }
                                        alt="First slide"
                                    />
                                </div>
                                <div className={styles.contenReview}>
                                    <div className={styles.nameCustomer}>
                                        {data.userReview.username}
                                    </div>
                                    <span className={styles.rateStarCus}>
                                        {renderStar(data.rating)}
                                    </span>
                                    <div className={styles.wordReview}>
                                        {data.content}
                                    </div>
                                    <div className={styles.dateReview}>
                                        {data.createdAt}
                                    </div>
                                </div>
                            </div>
                        ))}

                 {review?.result.length !==0  ? (<div className={styles.btnPagination}>
                        <button onClick={_onClickPrevious}>{"<"}</button>
                        {renderBtn(review && review.total / 3)}

                        <button onClick={_onClickNext}>{">"}</button>
                    </div>) : null}
                </div>
            )}

            {/* Reviews */}

            {/* wirte review */}
            <div className={styles.wapper__WriteReview}>
                <div className={styles.headReview}>Write Review</div>
               
                <span className={styles.star}>
    
                    {renderStarHover(countRating)}
                </span>

                <textarea
                    className={styles.wirtePostReview}
                    type="text"
                    placeholder="Write Your Review"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>

                <button
                    className={styles.btnPostReview}
                    onClick={_onPostReview}
                >
                    {" "}
                    Post Your Review
                </button>
            </div>

            {/* related Product */}
            <div  className={styles.RelatedProduct}>
                <span  className={styles.nameRealted}>Related Products</span>
                <span>
                    <svg
                        width="841"
                        height="1"
                        viewBox="0 0 841 1"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <line y1="0.5" x2="841" y2="0.5" stroke="#5A5A5A" />
                    </svg>
                </span>
                <span  className={styles.RelatedLeft}>
                    <svg
                        width="10"
                        height="15"
                        viewBox="0 0 10 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M0.340492 6.70337L6.92047 0.330366C7.37527 -0.110122 8.11067 -0.110122 8.56063 0.330366L9.65407 1.38941C10.1089 1.8299 10.1089 2.54217 9.65407 2.97798L4.99486 7.5L9.65891 12.0173C10.1137 12.4578 10.1137 13.1701 9.65891 13.6059L8.56547 14.6696C8.11067 15.1101 7.37527 15.1101 6.92531 14.6696L0.34533 8.29663C-0.114301 7.85614 -0.114301 7.14386 0.340492 6.70337Z"
                            fill="#706D6D"
                        />
                    </svg>
                </span>
                <span  className={styles.RelatedRight}>
                    <svg
                        width="10"
                        height="15"
                        viewBox="0 0 10 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M9.65934 8.29663L3.07618 14.6696C2.62117 15.1101 1.8854 15.1101 1.43523 14.6696L0.34126 13.6106C-0.113753 13.1701 -0.113753 12.4578 0.34126 12.022L5.00756 7.50469L0.34126 2.98735C-0.113753 2.54686 -0.113753 1.83458 0.34126 1.39878L1.43039 0.330366C1.8854 -0.110122 2.62116 -0.110122 3.07134 0.330366L9.6545 6.70337C10.1144 7.14386 10.1144 7.85614 9.65934 8.29663Z"
                            fill="#706D6D"
                        />
                    </svg>
                </span>

                {/* product */}
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
                        <div style={{display:"flex",marginLeft:'25px'}}>
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
        </div>
    );
}

export default Product;
