import { useEffect, useState } from "react";
import useSWR from "swr";

function LastSalesPage(props) {
  const [ sales, setSales ] = useState(props.sales)
  // const [ isLoading, setIsLoading] = useState(false)

  const { data, error } = useSWR(
    "https://udemy-max-react-course-code-3-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json", 
    (url) => fetch(url).then(res => res.json())
  );

  useEffect(() => {
    if (data) {
      const transformedSales = [];      

      for (const key in data) {
        transformedSales.push({
          id: key, 
          username: data[key].username, 
          volume: data[key].volume
        })
      }
      setSales(transformedSales)
    }
  }, [data]);

  // useEffect(() => {
  //   setIsLoading(true)

  //   fetch(
  //     "https://udemy-max-react-course-code-3-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json"
  //   ).then(response => response.json())
  //   .then(data=>{
  //     // need to transform data because data coming from firebase is in object mapping, not array
  //     const transformedSales = [];

  //     for (const key in data) {
  //       transformedSales.push({
  //         id: key, 
  //         username: data[key].username, 
  //         volume: data[key].volume
  //       })
  //     }

  //     setSales(transformedSales)
  //     setIsLoading(false)
  //   });
  // }, [])

  // if (isLoading) {
  //   return <p>Loading...</p>
  // }
  
  // if (!sales) {
  //   return <p>No data yet</p>
  // }

  if (error) {
    return <p>Failed to Load...</p>
  }  

  // if (!data || !sales) {
  //   return <p>Loading...</p>
  // }  

  if (!data && !sales) {
    return <p>Loading...</p>
  }    

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - {sale.volume}
        </li>
      ))}
    </ul>
  )

}

export async function getStaticProps() {
  const response = await fetch(
    "https://udemy-max-react-course-code-3-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json"
  )
  const data = await response.json()
  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({
      id: key, 
      username: data[key].username, 
      volume: data[key].volume
    })
  }

  return { props: {sales: transformedSales}, revalidate: 10}  
}

export default LastSalesPage;