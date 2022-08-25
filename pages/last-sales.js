import { useEffect, useState } from "react";

function LastSalesPage() {
  const [ sales, setSales ] = useState()
  const [ isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    fetch(
      "https://udemy-max-react-course-code-3-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json"
    ).then(response => response.json())
    .then(data=>{
      // need to transform data because data coming from firebase is in object mapping, not array
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key, 
          username: data[key].username, 
          volume: data[key].volume
        })
      }

      setSales(transformedSales)
      setIsLoading(false)
    });
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }
  
  if (!sales) {
    return <p>No data yet</p>
  }

  return (
    <ul>
      { sales.map(sale=> <li key={sale.id}>{sale.username} - {sale.volume}</li>)}
    </ul>
  )
}

export default LastSalesPage;