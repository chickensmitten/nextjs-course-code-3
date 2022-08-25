import path from 'path'
import fs from 'fs/promises';
import { Fragment } from "react"

function ProductDetailPage(props) {
  const { loadedProduct } = props;

  // Fallback checking only needed if fallback true
  if (!loadedProduct) {
    return <p>Loading...</p>
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  )

}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json")
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);  

  return data
}


export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;
  // this is different from useRouter hooks because, useRouter executes in browser client. 
  // params.pid executes in server

  const data = await getData();

  const product = data.products.find( product => product.id === productId);

  if (!product) {
    return { notFound: true}
  }

  return {
    props: {
      loadedProduct: product
    }
  }
}

export async function getStaticPaths() {
  // to be used in dynamic pages or dynamic folders
  const data = await getData()

  const ids = data.products.map(product => product.id)

  const pathsWithParams = ids.map((id) => ({ params: { pid: id}}));
  // [ { params: { pid: 'p1' } }, { params: { pid: 'p2' } }, { params: { pid: 'p3' } } ]
  
  return {
    paths: pathsWithParams,
    fallback: true
  }
  // if we have millions of pages, with some getting used more than others, pre-generating all of them are not very efficient.
  // that is where fallback true comes in to pre-generate highly visited pages only, while the rest are generated as it is used.
  // gotcha here is that we need fallback check with if else to handle non pre-generated pages for null props with Loading...
  // however if fallback is blocking, then fallback check if else is not needed.
}

export default ProductDetailPage