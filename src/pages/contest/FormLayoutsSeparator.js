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

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Contest Year' autoComplete='off' />
})

const FormLayoutsSeparator = () => {
  const router = useRouter();

  // ** States
  const [language, setLanguage] = useState([])
  const [date, setDate] = useState(null)
  const [contest, setContest] = useState({
    yr: router.query.yr || new Date().getFullYear(),
    sn: router.query.sn || '',
    delYn: 'N'
  })
  
  useEffect(() => {
    if (router.query.yr != undefined) {
      submit({
        url: "/v1/api/dypc/get",
        body: contest,
        success: (res) => {
          setContest(res);
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

  // Handle Password
  const handlePasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  // Handle Confirm Password
  const handleConfirmChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showPassword2: !values.showPassword2 })
  }

  const handleMouseDownConfirmPassword = event => {
    event.preventDefault()
  }

  // Handle Select
  const handleSelectChange = event => {
    setLanguage(event.target.value)
  }

  const handleContestChange = event => {
    setContest({ ...contest, [event.target.name]: event.target.value })
  }

  const handleYrChange = date => {
    setDate(date);
    setContest({ ...contest, 'yr': date.getFullYear() })
  }

  const insert = () => {
    submit({
      url: "/v1/api/dypc/save",
      body: contest,
      success: (res) => {
        setContest(res)
      }
    });
  }

  const del = () => {
    submit({
      url: "/v1/api/dypc/delete",
      body: contest,
      success: (res) => {
        router.push("/contest")
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
                1. Account Details
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                selected={new Date(contest.yr,1,1) || date}
                dateFormat="yyyy"
                showYearPicker
                placeholderText='YYYY'
                customInput={<CustomInput />}
                id='form-layouts-separator-date'
                // onChange={date => setDate(date)}
                onChange={date => handleYrChange(date)}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Username' placeholder='carterLeonard' />
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <TextField fullWidth type='text' name='sn' label='Sn' placeholder='Sn' value={contest.sn} onChange={handleContestChange} disabled/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth type='text' name='title' label='Title' placeholder='Title' value={contest.title} onChange={handleContestChange} />
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
                  value={contest.delYn}
                  onChange={handleContestChange}
                >
                  <MenuItem value='Y'>Y</MenuItem>
                  <MenuItem value='N'>N</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField fullWidth type='text' name='description' multiline label='Description' minRows={2} placeholder='Description' value={contest.description} onChange={handleContestChange} />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ marginBottom: 0 }} />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained' onClick={() => insert()}>
            Submit
          </Button>
          <Button size='large' color='secondary' variant='outlined' onClick={() => router.push("/contest")}>
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
