import React from 'react'
import styles from "./postcard.module.css"
import { Profile } from '../../assets/images'

const PostCard = ({item}) => {
  return (
    <div className={styles.PostCard}>
      <div className={styles.PostPorf}>
        <div className={styles.PostPor}>
        <img src={Profile} height={"50px"}/>
        <div>
        <h3>{item ? item?.name :" muhammad junaid"}</h3>
        <p>{}</p>
        </div>
        </div>
        <img src={Profile} height={"50px"}/>
      </div>
      <p>{item ? item?.desc :"Peace On Earth A Wonderful Wish But No Way"}</p>
      <div></div>
      <div className={styles.icons}>
          <div className={styles.iconscont}>
          <img src={Profile} height={"50px"}/>
          <h5>{item ? item?.like :"1.3K"} Comments</h5>
          </div>
          <div className={styles.iconscont}>
          <img src={Profile} height={"50px"}/>
          <h5>{item ? item?.like :"1.3K"} Likes</h5>
          </div>
          <div className={styles.iconscont}>
          <img src={Profile} height={"50px"}/>
          <h5>{item ? item?.like :"1.3K"} Share</h5>
          </div>
        </div>
      <div></div>
      <div className={styles.postimg}>
        <img src={Profile} height={"50px"}/>
        <div>
        <input type='name' placeholder='write your comment'/>
        </div>
      </div>
    </div>
  )
}

export default PostCard
