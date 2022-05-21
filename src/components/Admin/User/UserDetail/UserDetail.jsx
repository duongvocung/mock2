import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserByID } from "../../../../apis/user";
import styles from "./UserDetail.module.scss";
import avatarImg from "../../../../images/avatar.png";
import { ReactComponent as VImg } from "../../../../images/V.svg";
import { ReactComponent as XImg } from "../../../../images/x.svg";

function UserDetail() {
    const { id } = useParams();
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        getUserByID(id).then((res) => setUserInfo(res.data));
    }, []);

    return (
        <div className={styles.container}>
            <p className={styles.title}>
                Dashboard / User / Update Detail #{id}
            </p>
            <div className={styles.item_info}>
                <p>User Detail #{id}</p>
                <p>User ID : {id}</p>
            </div>
            <div className={styles.content}>
                <img src={userInfo.avatar || avatarImg} />
                <p>{userInfo.username}</p>
                <p>{userInfo.email}</p>
                <p>{userInfo.contact}</p>
                <hr></hr>
                <div>
                    <p>Role:</p>
                    <p>
                        <span
                            className={
                                userInfo.role === "admin"
                                    ? styles.green
                                    : styles.red
                            }
                        >
                            {userInfo.role === "admin" ? "Admin" : "Customer"}
                        </span>
                    </p>
                    <p>Status:</p>
                    <p>
                        <span
                            className={
                                userInfo.isActive ? styles.green : styles.red
                            }
                        >
                            {userInfo.isActive ? "Active" : "Disabled"}
                        </span>
                    </p>
                    <p>Verify Email:</p>
                    <p>
                        <span
                            className={
                                userInfo.isEmailVerified
                                    ? styles.green
                                    : styles.red
                            }
                        >
                            {userInfo.isEmailVerified ? <VImg /> : <XImg />}
                        </span>
                    </p>
                    <p>Verify Contact:</p>
                    <p>
                        <span
                            className={
                                userInfo.isContactVerified
                                    ? styles.green
                                    : styles.red
                            }
                        >
                            {userInfo.isContactVerified ? <VImg /> : <XImg />}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default UserDetail;
