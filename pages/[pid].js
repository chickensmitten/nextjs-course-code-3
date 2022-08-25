import path from 'path'
import fs from 'fs/promises';
import { Fragment } from "react"

function ProductDetailPage(props) {
  const { loadedProduct } = props;

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  )
}

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;
  // this is different from useRouter hooks because, useRouter executes in browser client. 
  // params.pid executes in server

  const filePath = path.join(process.cwd(), "data", "dummy-backend.json")
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);  

  const product = data.products.find( product => product.id === productId);

  return {
    props: {
      loadedProduct: product
    }
  }
}

export async function getStaticPaths() {
  // to be used in dynamic pages or dynamic folders
  return {
    paths: [
      { params: { pid: 'p1' } },
      { params: { pid: 'p2' } },
      { params: { pid: 'p3' } },
    ],
    fallback: false
  }
  
}

export default ProductDetailPage