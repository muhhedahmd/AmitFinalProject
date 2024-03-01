import axios from "axios";
import { useEffect, useMemo, useState } from "react";

const GetSingleProduct = ( API ) => {
 
 
    const [isLooding, setIsLooding] = useState(true);
    const [Data, setData] = useState([]);
    useEffect(() => {
      (async () => {
              await axios
          .get(API)
          .then((res) => {
              setData(res.data)
              setIsLooding(false)
   
            }
          ).catch((err) =>{
              console.log(err)
          } )
      })();
    }, [API]);
    const memoizedData = useMemo(() => Data, [Data]);
  
  
 
    return {memoizedData , isLooding}
}

export default GetSingleProduct