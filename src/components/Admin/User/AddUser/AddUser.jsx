import styles from "./AddUser.module.scss";
import UserForm from "./UserForm/UserForm";

function AddUser() {
    return (
        <div className={styles.container}>
            <p className={styles.title}>Dashboard / User / Create User</p>
            <UserForm />
        </div>
    );
}

export default AddUser;
