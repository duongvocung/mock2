import styles from "./ProductForm.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import uploadImg from "../../../../../images/image-upload.svg";
import xImg from "../../../../../images/x.svg";
import {
    createProductByAdmin,
    uploadImgByAdmin,
    getProductById,
    updateProductByAdmin,
    updateImage,
} from "../../../../../apis/product";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

function ProductForm() {
    const { id } = useParams();
    const [image, setImage] = useState("");
    const imgRef = useRef();
    const [product, setProduct] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getProductById(id).then((res) => {
                console.log(res.data.data.product);
                setProduct(res.data.data.product);
                setImage(res.data.data.product.images[0].url);
            });
        }
    }, []);

    const _onSubmitForm = async (values) => {
        if (image) {
            if (id) {
                await Promise.all([
                    updateProductByAdmin(id, { ...values }),
                    updateImage(product.images[0].id, image),
                ]);
            } else {
                await createProductByAdmin({ ...values, imageUrls: [image] });
            }
            navigate('/dashboard/product')
        } else {
            Swal.fire({
                icon: "error",
                title: "Select image plz!",
            });
        }
    };

    const schema = yup.object({
        name: yup.string().required("Name is required!"),
        brand: yup.string().required("Brand is required!"),
        category: yup.string().required("Category is required!"),
        description: yup.string().required("Description is required!"),
        price: yup.number().required("Price is required!"),
        rating: yup.number().required("Rating is required!"),
        countInStock: yup.number().required("CountInStock is required!"),
    });

    const _renderError = (err) => {
        return <p className={styles.error}>{err}</p>;
    };

    const _onChangeImg = async () => {
        let formData = new FormData();
        formData.append(
            "image",
            imgRef.current.files[0],
            `img${Number(new Date())}.jpg`
        );
        const { imageURL } = await uploadImgByAdmin(formData);
        setImage(imageURL);
    };

    return (
        <Formik
            key={product.id ? product.id : 1}
            initialValues={{
                name: product.name || "",
                brand: product.brand || "",
                category: product.category || "",
                description: product.description || "",
                price: product.price || "",
                rating: product.rating || "",
                countInStock: product.countInStock || "",
            }}
            onSubmit={_onSubmitForm}
            validationSchema={schema}
        >
            <Form className={styles.form}>
                <div className={styles.item_info}>
                    <p>{id ? `Update Product #${id}` : "Create Product"}</p>
                    <button type="submit">{id ? "Save" : "Add product"}</button>
                </div>
                <div className={styles.content}>
                    <div className={styles.content_left}>
                        <p className={styles.title}>Basic information</p>
                        <div className={styles.form_body}>
                            <div>
                                <p>Name</p>
                                <Field as="input" name="name" />
                                <ErrorMessage
                                    name="name"
                                    render={_renderError}
                                />
                            </div>
                            <div>
                                <p>Description</p>
                                <Field as="textarea" name="description" />
                                <ErrorMessage
                                    name="description"
                                    render={_renderError}
                                />
                            </div>
                            <div>
                                <p>Price</p>
                                <Field as="input" type="number" name="price" />
                                <ErrorMessage
                                    name="price"
                                    render={_renderError}
                                />
                            </div>
                            <div>
                                <p>Discount Percent</p>
                                <input value=" " disabled />
                            </div>
                            <div>
                                <p>Brand</p>
                                <Field as="input" name="brand" />
                                <ErrorMessage
                                    name="brand"
                                    render={_renderError}
                                />
                            </div>
                            <div>
                                <p>Stock quantity</p>
                                <Field as="input" name="countInStock" />
                                <ErrorMessage
                                    name="countInStock"
                                    render={_renderError}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.content_right}>
                        <div className={styles.content_right_item}>
                            <p className={styles.title}>Images</p>
                            <div>
                                {image ? (
                                    <img
                                        src={image}
                                        className={styles.upload}
                                    />
                                ) : (
                                    <img src={uploadImg} />
                                )}
                                <div>
                                    <label htmlFor="file">Chọn tệp</label>
                                </div>
                                <input
                                    type="file"
                                    id="file"
                                    style={{ display: "none" }}
                                    ref={imgRef}
                                    onChange={_onChangeImg}
                                />
                            </div>
                        </div>
                        <div className={styles.content_right_item}>
                            <p className={styles.title}>Categories</p>
                            <div>
                                <div>
                                    <img src={xImg} />
                                    <Field as="input" name="category" />
                                    <ErrorMessage
                                        name="category"
                                        render={_renderError}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.content_right_item}>
                            <p className={styles.title}>Rating</p>
                            <div>
                                <Field as="select" name="rating">
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </Field>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </Formik>
    );
}

export default ProductForm;
