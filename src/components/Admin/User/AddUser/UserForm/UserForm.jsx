import styles from "./UserForm.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import uploadImg from "../../../../../images/image-upload.svg";
import { uploadImgByAdmin } from "../../../../../apis/product";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import {
    addUserByAdmin,
    updateUserByAdmin,
    getUserByID,
} from "../../../../../apis/user";

function UserForm() {
    const { id } = useParams();
    const [image, setImage] = useState("");
    const imgRef = useRef();
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const phone = useRef();
    const mail = useRef()

    useEffect(() => {
        if (id) {
            getUserByID(id).then((res) => {
                setUser(res.data);
                phone.current = res.data.contact;
                mail.current = res.data.email;
                if (res.data.avatar) {
                    setImage(res.data.avatar);
                }
            });
        }
    }, []);

    const checkInformation = (object) => {
        const newObject = { ...object };
        Object.entries(object).forEach((element) => {
            console.log(element);
            if (element[1] === "" || element[0] === 'retypePassword') {
                delete newObject[element[0]];
            }

            if(element[0] === 'contact' && element[1] === phone.current){
                delete newObject[element[0]]
            }

            if(element[0] === 'email' && element[1] === mail.current){
                delete newObject[element[0]]
            }

            if(element[1] === "false"){
                newObject[element[0]] = false
            }

            if(element[1] === "true"){
                newObject[element[0] ]= true
            }
        });
        return newObject;
    };

    const _onSubmitForm = (values) => {
        console.log(values);
        if (id) {
            updateUserByAdmin(id, checkInformation({...values, avatar: image})).then(() =>
                navigate("/dashboard/user")
            );
        } else {
            addUserByAdmin(checkInformation(values));
        }
    };

    const schema = yup.object({
        username: yup.string().required("Username is required!"),
        email: yup
            .string()
            .email("Incorrect email!")
            .required("Email is required!"),
        password: yup.string().required("Password is required!"),
        retypePassword: yup.string().required("Retype Password is required!"),
        role: yup.string().required("Role is required!"),
        contact: yup.string(),
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

    const _onValidate = (values) => {
        const error = {};
        if (values.password !== values.retypePassword) {
            error.retypePassword = "Retype Password is not match!";
        }
        return error;
    };

    return (
        <Formik
            key={user.id ? user.id : "xyz"}
            initialValues={{
                username: user.username || "",
                email: user.email || "",
                password: user.password || "",
                retypePassword: user.retypePassword || "",
                role: user.role || "user",
                contact: user.contact || "",
                isEmailVerified: id ? `${user.isEmailVerified}` : "",
                isContactVerified: id ? `${user.isContactVerified}` : "",
                isActive: id ? `${user.isActive}` : "",
            }}
            onSubmit={_onSubmitForm}
            validationSchema={schema}
            validate={_onValidate}
        >
            <Form className={styles.form}>
                <div className={styles.item_info}>
                    <p>{id ? `Update User #${id}` : "Create User"}</p>
                    <button type="submit">{id ? "Save" : "Add user"}</button>
                </div>
                <div className={styles.content}>
                    <div className={styles.content_left}>
                        <p className={styles.title}>Basic information</p>
                        <div className={styles.form_body}>
                            <div>
                                <p>Name</p>
                                <Field as="input" name="username" />
                                <ErrorMessage
                                    name="username"
                                    render={_renderError}
                                />
                            </div>
                            <div>
                                <p>Email</p>
                                <Field as="input" name="email" />
                                <ErrorMessage
                                    name="email"
                                    render={_renderError}
                                />
                            </div>
                            <div>
                                <p>Password</p>
                                <Field
                                    as="input"
                                    type="password"
                                    name="password"
                                />
                                <ErrorMessage
                                    name="password"
                                    render={_renderError}
                                />
                            </div>
                            <div>
                                <p>Retype Password</p>
                                <Field
                                    as="input"
                                    name="retypePassword"
                                    type="password"
                                />
                                <ErrorMessage
                                    name="retypePassword"
                                    render={_renderError}
                                />
                            </div>
                            <div>
                                <p>Role</p>
                                <Field as="select" name="role">
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </Field>
                            </div>
                        </div>
                    </div>
                    <div className={styles.content_right}>
                        <div className={styles.content_right_item}>
                            <p className={styles.title}>Avatar</p>
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
                            <p className={styles.title}>Another info</p>
                            <div>
                                <p>Contact</p>
                                <Field as="input" name="contact" />
                                <div className={styles.radio}>
                                    <p>Status</p>
                                    <div>
                                        <Field
                                            type="radio"
                                            name="isActive"
                                            id="active"
                                            value="true"
                                        />
                                        <label htmlFor="active">Active</label>
                                    </div>
                                    <div>
                                        <Field
                                            type="radio"
                                            name="isActive"
                                            id="disabled"
                                            value="false"
                                        />
                                        <label htmlFor="disabled">
                                            Disabled
                                        </label>
                                    </div>
                                </div>
                                <div className={styles.radio}>
                                    <p>Verify Email</p>
                                    <div>
                                        <Field
                                            type="radio"
                                            name="isEmailVerified"
                                            id="verifyEmailY"
                                            value="true"
                                        />
                                        <label htmlFor="verifyEmailY">
                                            Yes
                                        </label>
                                    </div>
                                    <div>
                                        <Field
                                            type="radio"
                                            name="isEmailVerified"
                                            id="verifyEmailN"
                                            value="false"
                                        />
                                        <label htmlFor="verifyEmailN">No</label>
                                    </div>
                                </div>
                                <div className={styles.radio}>
                                    <p>Verify Contact</p>
                                    <div>
                                        <Field
                                            type="radio"
                                            name="isContactVerified"
                                            id="verifyContactY"
                                            value="true"
                                        />
                                        <label htmlFor="verifyContactY">
                                            Yes
                                        </label>
                                    </div>
                                    <div>
                                        <Field
                                            type="radio"
                                            name="isContactVerified"
                                            id="verifyContactN"
                                            value="false"
                                        />
                                        <label htmlFor="verifyContactN">
                                            No
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </Formik>
    );
}

export default UserForm;
