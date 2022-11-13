// ** React Imports
import { forwardRef, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import router, { useRouter } from 'next/router'
import { submit } from 'src/util/FetchUtil'
import { InlineMath, BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css';
import Markdown from '../../util/Markdown'
import { ConsoleNetworkOutline } from 'mdi-material-ui'

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Contest Year' autoComplete='off' />
})

const freeze = {};

const FormLayoutsSeparator = () => {
  const router = useRouter();

  // ** States
  const [problem, setProblem] = useState({})
  const [variables, setVariables] = useState([])
  const [sVariables, setSVariables] = useState("");
  
  useEffect(() => {
    submit({
      url: "/v1/api/dypb001/get",
      body: {
        ...problem,
        "problemNo": router.query.problemNo,
      },
      success: (res) => {
        setProblem(res);
        freeze=res;
      }
    });

    submit({
      url: "/v1/api/dypb002/get",
      body: {
        "problemNo": router.query.problemNo,
      },
      success: (res) => {
        console.log(res);
        setVariables(res);
        setSVariables(res.map(x => "\"" + x.variable + "\"").join(",\n"))
      }
    });
  }, [])

  const handleSVariablesChange = event => {
    setSVariables(event.target.value);
  }

  const insert = () => {
    submit({
      url: "/v1/api/dypb002/save",
      body: variables,
      success: (res) => {
        setVariables(res);
      }
    });
  }

  // const del = () => {
  //   submit({
  //     url: "/v1/api/dypb002/delete",
  //     body: problem,
  //     success: (res) => {
  //       router.push("/problem")
  //     }
  //   });
  // }

  const parse = () => {
    try {
      var temp = JSON.parse("[" + sVariables.trim() + "]")

      // array가 아님
      if(!(temp instanceof Array)) throw 'not array'

      // parameter 부족
      console.log(temp, problem.variables)
      for (let x of temp) {
        console.log(x.split(',').length, problem.variables.split(',').length)
        if (x.split(',').length !== problem.variables.split(',').length) throw 'not enough parameter'
      }
      
      setVariables(temp.map((variable, index) => ({
        problemNo: problem.problemNo,
        sn: index,
        variable: variable,
      })))
    } catch (e) {
      alert(e)
    }
  }

  const reset = () => {
    setProblem(freeze);
  }

  const handleViewClick = (str) => {
    var temp = {...freeze};
    var arr1 = problem.variables.split(",");
    var arr2 = str.split(",");
    for(var i=0;i<arr1.length;i++){
      if (arr2[i] == 1) temp.question = temp.question.replace(new RegExp("@" + arr1[i] + "\\|@", "g"), "");
      temp.question = temp.question.replace(new RegExp("@" + arr1[i] + "\\|@", "g"), arr2[i]);
      temp.question = temp.question.replace(new RegExp("@" + arr1[i] + "@", "g"), arr2[i]);
      if (arr2[i] == 1) temp.solution = temp.solution.replace(new RegExp("@" + arr1[i] + "\\|@", "g"), "");
      temp.solution = temp.solution.replace(new RegExp("@" + arr1[i] + "\\|@", "g"), arr2[i]);
      temp.solution = temp.solution.replace(new RegExp("@" + arr1[i] + "@", "g"), arr2[i]);
      temp.answer = temp.answer.replace(new RegExp("@" + arr1[i] + "@", "g"), arr2[i]);
    }
    setProblem(temp)
  }

  return (
    <Card>
      <CardHeader title='Register Contest' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={e => e.preventDefault()}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                1. Question
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Markdown>{problem.question}</Markdown>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ marginBottom: 0 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                2. Solution
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Markdown>{problem.solution}</Markdown>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Markdown>{problem.answer}</Markdown>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ marginBottom: 0 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                3. Variables
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth type='text' name='variables' multiline label='Variables' minRows={1} placeholder='Variables' value={problem.variables} disabled />
              <TextField fullWidth type='text' name='sVariables' multiline label='Variables' minRows={10} placeholder='Variables' value={sVariables} onChange={handleSVariablesChange}/>
              <Button size='large' color='warning' variant='contained' onClick={() => parse()}>
                parse
              </Button>
              <Button size='large' color='warning' variant='contained' onClick={() => reset()}>
                reset
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TableContainer>
                <Table sx={{ minWidth: 600 }} aria-label='table in dashboard'>
                  <TableHead>
                  </TableHead>
                  <TableBody>
                    {variables.length > 0 && variables.map(row => (
                      <TableRow hover key={row.sn} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                        <TableCell>{row.variable}</TableCell>
                        <TableCell>
                          <Chip
                            label='view'
                            sx={{
                              height: 24,
                              fontSize: '0.75rem',
                              textTransform: 'capitalize',
                              '& .MuiChip-label': { fontWeight: 500 }
                            }}
                            onClick={() => handleViewClick(row.variable)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained' onClick={() => insert()}>
            Submit
          </Button>
          <Button size='large' color='secondary' variant='outlined' onClick={() => router.push("/problem")}>
            Cancel
          </Button>
          {/* <Button size='large' color='warning' variant='contained' onClick={() => del()}>
            Delete
          </Button> */}
        </CardActions>
      </form>
    </Card>
  )
}

export default FormLayoutsSeparator
