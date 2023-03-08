import { useEffect, useState } from 'react'
import axios  from 'axios';

export default function TokenFetch() {
    const [data, setData] = useState<string | null>(null);

    useEffect(()=>{
        document.title = 'Fetching using token';
     
        const response = axios.get('https://api.github.com/octocat',{
            headers: {
                Authorization: 'Bearer [token here]'
            }
        })
        .then(response => setData(response.data))
        .catch((error) => console.log(error))

    },[])

  return (
    <>
        <div>{data}</div>
        <div>Should return a status 401, since there is no actual token.</div>
    </>
  )
}
