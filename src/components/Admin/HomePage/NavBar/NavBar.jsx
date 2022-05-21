import styles from "./NavBar.module.scss";
import barImg from "../../../../images/bar.svg";
import searchImg from "../../../../images/search.svg";
import bellImg from "../../../../images/bell.svg";
import avatarImg from "../../../../images/avatar.png";

function NavBar() {
    return (
        <div className={styles.container}>
            <div className={styles.left_item}>
                <img src={barImg} alt="bar"></img>
                <div className={styles.search_group}>
                    <label htmlFor="search">
                        <img src={searchImg} alt="search"></img>
                    </label>
                    <input id="search" placeholder="Search"></input>
                </div>
            </div>
            <div className={styles.right_item}>
                <img src={bellImg} alt="bell"></img>
                <img src={avatarImg} alt="avatar" className={styles.avatar} />
                <div>
                    <p>{localStorage.getItem("username")}</p>
                    <p>Admin</p>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
