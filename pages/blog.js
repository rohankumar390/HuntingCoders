import React from "react";
import styles from "../styles/Blog.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import * as fs from "fs";
import InfiniteScroll from "react-infinite-scroll-component";
const Blog = (props) => {
  const [blogs, setBlogs] = useState(props.allBlogs);
  const [count, setCount] = useState(2);
  const fetchData = async () => {
    let d = await fetch(`http://localhost:3000/api/blogs/?count=${count + 2}`);
    setCount(count + 2);
    let data = await d.json();
    setBlogs(data);
  };
  return (
    <div className={styles.container}>
      <main className={`${styles.main}`}>
        <InfiniteScroll
          dataLength={blogs.length} //This is important field to render the next data
          next={fetchData}
          hasMore={props.allCount !== blogs.length}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {blogs.map((blogitem) => {
            return (
              <div key={blogitem.slug} className={styles.blogItemh3}>
                <Link href={`/blogpost/${blogitem.slug}`}>
                  <h3 className={styles.blogItemh3}>{blogitem.title}</h3>
                  <p className={styles.blogItemp}>
                    {blogitem.metadesc.substr(0, 140)}...
                  </p>
                </Link>
              </div>
            );
          })}
        </InfiniteScroll>
      </main>
    </div>
  );
};
export async function getStaticProps(context) {
  let data = await fs.promises.readdir("blogdata");
  let allCount = data.length;
  let myfile;
  let allBlogs = [];
  for (let index = 0; index < data.length; index++) {
    const item = data[index];

    myfile = await fs.promises.readFile("blogdata/" + item, "utf-8");

    allBlogs.push(JSON.parse(myfile));
  }
  return {
    props: { allBlogs, allCount },
  };
}
// export async function getServerSideProps(context){
//   let data=await   fetch("http://localhost:3000/api/blogs")
//   let allBlogs=await data.json();
//   return{
//     props:{allBlogs},
//   }
// }
export default Blog;
