// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import CardActions from '@mui/material/CardActions'
import router from 'next/router'
import { submit } from 'src/util/FetchUtil'
import Markdown from '../../util/Markdown'

const columns = [
  { id: 'problemNo', label: 'No', maxWidth: 20 },
  // { id: 'sn', label: 'sn', minWidth: 100 },
  {
    id: 'question',
    label: 'Question',
    minWidth: 170,
    align: 'left',
    format: value => <Markdown>{value}</Markdown>//value.toLocaleString('en-US')
  },
  {
    id: 'detail',
    label: 'Detail',
    minWidth: 170,
    align: 'right'
  }
]
function createData(name, code, population, size) {
  const density = population / size

  return { name, code, population, size, density }
}

// const rows = [
//   createData('India', 'IN', 1324171354, 3287263),
//   createData('China', 'CN', 1403500365, 9596961),
//   createData('Italy', 'IT', 60483973, 301340),
//   createData('United States', 'US', 327167434, 9833520),
//   createData('Canada', 'CA', 37602103, 9984670),
//   createData('Australia', 'AU', 25475400, 7692024),
//   createData('Germany', 'DE', 83019200, 357578),
//   createData('Ireland', 'IE', 4857000, 70273),
//   createData('Mexico', 'MX', 126577691, 1972550),
//   createData('Japan', 'JP', 126317000, 377973),
//   createData('France', 'FR', 67022000, 640679),
//   createData('United Kingdom', 'GB', 67545757, 242495),
//   createData('Russia', 'RU', 146793744, 17098246),
//   createData('Nigeria', 'NG', 200962417, 923768),
//   createData('Brazil', 'BR', 210147125, 8515767)
// ]

const List = () => {
  // ** States
  const [page, setPage] = useState(0)
  const [rows, setRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  useEffect(() => {
    submit({
      url: "/v1/api/dypb/list",
      // body: contest,
      success: (res) => {
        setRows(res);
      }
    });
  }, []);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <CardActions>
        <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained' onClick={() => router.push("/problem/insert")}>
          Register
        </Button>
      </CardActions>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 && rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={"" + row.yr + row.sn}>
                  {columns.map(column => {
                    const value = row[column.id]

                    if (column.id === "detail") {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <Button size='large' type='button' sx={{ mr: 2 }} variant='contained' onClick={() => router.push({
                            pathname: "/problem/insert",
                            query: { problemNo: row['problemNo'] }
                          })}>
                            Detail
                          </Button>
                        </TableCell>
                      )
                    } else {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      )
                    }
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default List
