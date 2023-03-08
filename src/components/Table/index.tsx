import { useEffect, useState } from 'react'
import axios from 'axios'
import './style.css'

export function Table() {
  
  type Entry = {
    API: string;
    Description: string;
    Auth: string;
    HTTPS: boolean;
    Cors: string;
    Link: string;
    Category: string;
    HTTPS_string: string;
  }

  const [data, setData] = useState<Entry[]>([])
  const [sortState, setSortState] = useState<{type: any; isAscending: boolean}>({ type: null, isAscending: true });

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    const response = await axios.get("https://api.publicapis.org/entries");

    //fill in the property HTTPS_string based on HTTPS property boolean data to better display
    const updatedData = response.data.entries.map((entry: Entry) => {
      return {
        ...entry,
        HTTPS_string: entry.HTTPS ? 'yes' : 'no'
      }
    });
    setData(updatedData);
  }

  enum SortType {
    API = 'API',
    Description = 'Description',
    Auth = 'Auth',
    HTTPS = 'HTTPS',
    Cors = 'Cors',
    Link = 'Link',
    Category= 'Category',
    HTTPS_string = 'HTTPS_string'
  }

  const sortList = (type: SortType) => {
    //checks if you clicked again on the same header to invert the sorting
    const isAscending = sortState.type === type ? !sortState.isAscending : true;
    const sortMultiplier = isAscending ? 1 : -1;

    
    data.sort((a, b) => {
      const x = a[type];
      const y = b[type];
      if (typeof x === 'string' && typeof y === 'string') {
        const result = x.localeCompare(y);
        return sortMultiplier * result;
      }

      if (typeof x === 'number' && typeof y === 'number') {
        const result = x - y;
        return sortMultiplier * result;
      }

      return 0;
    });

    setData([...data]);
    setSortState({ type, isAscending });
  };



  return (
    <div className='Table'>
      <table className='columns'>
        <tbody>
          <tr>
            <th onClick={() => sortList(SortType.API)}>API Name { sortState.type === SortType.API ? sortState.isAscending ? '▲' : '▼' : '' }</th>
            <th onClick={() => sortList(SortType.Description)}>Description { sortState.type === SortType.Description ? sortState.isAscending ? '▲' : '▼' : '' }</th>
            <th onClick={() => sortList(SortType.Auth)}>Auth</th>
            <th onClick={() => sortList(SortType.HTTPS_string)}>HTTPS</th>
            <th onClick={() => sortList(SortType.Cors)}>Cors</th>
            <th onClick={() => sortList(SortType.Link)}>Link</th>
            <th onClick={() => sortList(SortType.Category)}>Category</th>
          </tr>
          {
            data?.map((value, index) =>
              <tr key={index}>
                <td className='column'>{value.API}</td>
                <td className='column'>{value.Description}</td>
                <td className='column'>{value.Auth}</td>
                <td className='column'>{value.HTTPS_string}</td>
                <td className='column'>{value.Cors}</td>
                <td className='column'>{value.Link}</td>
                <td className='column'>{value.Category}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}
