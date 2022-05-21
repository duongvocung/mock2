import React from 'react'
import styles from "./NavTabs.module.scss";

function NavTabs({path}) {
  return (
    <div>
        <div className={styles.nav}> Home {'>'} {path?.category}  {'>'} {path?.name}</div>
    </div>
  )
}

export default NavTabs