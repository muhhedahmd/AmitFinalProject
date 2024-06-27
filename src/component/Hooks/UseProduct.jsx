import axios from "axios";
import { useEffect, useMemo, useState } from "react";

const UseGetproduct = ( API ) => {
 
 
    const [isLooding, setIsLooding] = useState(true);
    const [Data, setData] = useState([]);
    useEffect(() => {
      (async () => {
              await axios
          .get(API)
          .then((res) => {
              setData(res.data.products)
              setIsLooding(false)
              console.log(res.data.products)
   
            }
          ).catch((err) =>{
              console.log(err)
          } )
      })();
    }, [API]);
    const memoizedData = useMemo(() => Data, [Data]);
  
  
 
    return {memoizedData , isLooding}
}

export default UseGetproduct