import { Table as TableComponent } from '../../components/Table'
import { useEffect } from 'react'

export function SortingTable() {
  useEffect(() => {
    document.title = 'Sorting a Table';
  }, []);

  return (
    <TableComponent />
  )
}
