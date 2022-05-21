import styles from "./AddProduct.module.scss";
import ProductForm from "./ProductForm/ProductForm";

function AddProduct() {
    return (
        <div className={styles.container}>
            <p className={styles.title}>Dashboard / Product / Create product</p>
            <ProductForm/>
        </div>
    );
}

export default AddProduct;
