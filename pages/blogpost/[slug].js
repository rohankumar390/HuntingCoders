import React, { useState } from "react";
import styles from "../../styles/Blog.module.css";
import * as fs from "fs";
const Slug = (props) => {
  function createMarkup(c) {
    return { __html: c };
  }

  const [blog, setBlog] = useState(props.myBlog);

  return (
    <div className={styles.container}>
      <main className={`${styles.main}`}>
        <h1>{blog && blog.title}</h1> <hr />
        {blog && (
          <div dangerouslySetInnerHTML={createMarkup(blog.content)}></div>
        )}
      </main>
    </div>
  );
};
export async function getStaticPaths() {
  let allb = await fs.promises.readdir(`blogdata`);
  console.log(allb);
  allb = allb.map((item) => {
    return { params: { slug: item.split(".")[0] } };
  });
  return {
    paths: allb,
    fallback: true,
  };
}
export async function getStaticProps(context) {
  //  const router = useRouter();
  const { slug } = context.params;
  let myBlog = await fs.promises.readFile(`blogdata/${slug}.json`, "utf-8");

  return {
    props: { myBlog: JSON.parse(myBlog) },
  };
}
export default Slug;

// export async function getServerSideProps(context) {
//   // const router = useRouter();

//   const { slug } = context.query;

//   let data = await fetch(`http://localhost:3000/api/getblog?slug=${slug}`);
//   let myBlog = await data.json();
//   return {
//     props: { myBlog },
//   };
// }
