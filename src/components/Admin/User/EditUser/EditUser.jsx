import UserForm from "../AddUser/UserForm/UserForm";
import styles from "./EditUser.module.scss";

function EditUser() {
    return (
        <div className={styles.container}>
            <p className={styles.title}>Dashboard / User / Update user</p>
            <UserForm />
        </div>
    );
}

export default EditUser;
