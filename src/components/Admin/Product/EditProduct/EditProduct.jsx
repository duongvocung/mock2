import ProductForm from "../AddProduct/ProductForm/ProductForm";
import styles from "./EditProduct.module.scss";

function EditProduct() {
    return (
        <div className={styles.container}>
            <p className={styles.title}>Dashboard / Product / Update product</p>
            <ProductForm />
        </div>
    );
}

export default EditProduct;
