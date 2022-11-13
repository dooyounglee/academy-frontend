// ** React Imports
import { forwardRef, useEffect, useState } from 'react'

// ** MUI Imports
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

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Contest Year' autoComplete='off' />
})

const FormLayoutsSeparator = () => {
  const router = useRouter();

  // ** States
  const [language, setLanguage] = useState([])
  const [date, setDate] = useState(null)
  const [problem, setProblem] = useState({ delYn: 'N' })
  
  useEffect(() => {
    if (router.query.problemNo != undefined) {
      submit({
        url: "/v1/api/dypb001/get",
        body: {
          ...problem,
          "problemNo": router.query.problemNo,
        },
        success: (res) => {
          setProblem(res);
        }
      });
    }
  }, [])

  const [values, setValues] = useState({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })

  const handleProblemChange = event => {
    setProblem({ ...problem, [event.target.name]: event.target.value })
  }

  const insert = () => {
    submit({
      url: "/v1/api/dypb001/save",
      body: problem,
      success: (res) => {
        setProblem(res)
      }
    });
  }

  const del = () => {
    submit({
      url: "/v1/api/dypb001/delete",
      body: problem,
      success: (res) => {
        router.push("/problem")
      }
    });
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
            <Grid item xs={12} sm={6}>
              <TextField fullWidth type='text' name='problemNo' label='ProblemNo' placeholder='ProblemNo' value={problem.problemNo} onChange={handleProblemChange} disabled/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>DelYn</InputLabel>
                <Select
                  label='DelYn'
                  defaultValue='N'
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                  name='delYn'
                  value={problem.delYn}
                  onChange={handleProblemChange}
                >
                  <MenuItem value='Y'>Y</MenuItem>
                  <MenuItem value='N'>N</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Markdown>{problem.question}</Markdown>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField fullWidth type='text' name='question' multiline label='Question' minRows={2} placeholder='Question' value={problem.question} onChange={handleProblemChange} />
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
              <TextField fullWidth type='text' name='solution' multiline label='Solution' minRows={2} placeholder='Solution' value={problem.solution} onChange={handleProblemChange} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Markdown>{problem.answer}</Markdown>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField fullWidth type='text' name='answer' multiline label='Answer' minRows={2} placeholder='Answer' value={problem.answer} onChange={handleProblemChange} />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ marginBottom: 0 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                3. Variables
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField fullWidth type='text' name='variables' multiline label='Variables' minRows={2} placeholder='Variables' value={problem.variables} onChange={handleProblemChange} />
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
          <Button size='large' color='warning' variant='contained' onClick={() => del()}>
            Delete
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default FormLayoutsSeparator
