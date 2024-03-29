// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import { AccessPoint } from 'mdi-material-ui'

import { submit } from 'src/util/FetchUtil'
import { useEffect, useState } from 'react'

const navigation = () => {
  const [role, setRole] = useState('')

  useEffect(() => {
    submit({
      url: "/v1/api/dyus001/myinfo",
      body: {},
      success: (res) => {
        setRole(res[0].authority)
      }
    });
  }, [])

  if (role == 'ROLE_ADMIN') {
    return [
      { title: 'Dashboard', icon: HomeOutline, path: '/' },
      { title: 'Account Settings', icon: AccountCogOutline, path: '/account-settings' },
      { sectionTitle: 'Contest' },
      { title: 'Contest', icon: AccessPoint, path: '/contest', },
      { title: 'Problem', icon: AccessPoint, path: '/problem', },
      { sectionTitle: 'Pages' },
      {
        title: 'Login',
        icon: Login,
        path: '/pages/login',
        openInNewTab: true
      },
      {
        title: 'Register',
        icon: AccountPlusOutline,
        path: '/pages/register',
        openInNewTab: true
      },
      {
        title: 'Error',
        icon: AlertCircleOutline,
        path: '/pages/error',
        openInNewTab: true
      },
      {
        sectionTitle: 'User Interface'
      },
      {
        title: 'Typography',
        icon: FormatLetterCase,
        path: '/typography'
      },
      {
        title: 'Icons',
        path: '/icons',
        icon: GoogleCirclesExtended
      },
      {
        title: 'Cards',
        icon: CreditCardOutline,
        path: '/cards'
      },
      {
        title: 'Tables',
        icon: Table,
        path: '/tables'
      },
      {
        icon: CubeOutline,
        title: 'Form Layouts',
        path: '/form-layouts'
      }
    ]
  } else if (role == 'ROLE_USER') {
    return [
      {
        title: 'Dashboard',
        icon: HomeOutline,
        path: '/'
      },
      {
        title: 'Account Settings',
        icon: AccountCogOutline,
        path: '/account-settings'
      },
      /*{
        sectionTitle: 'Pages'
      },
      { title: 'Login', icon: Login, path: '/pages/login', openInNewTab: true },
      { title: 'Register', icon: AccountPlusOutline, path: '/pages/register', openInNewTab: true },
      {
        title: 'Error',
        icon: AlertCircleOutline,
        path: '/pages/error',
        openInNewTab: true
      },*/
      {
        sectionTitle: 'User Interface'
      },
      {
        title: 'Typography',
        icon: FormatLetterCase,
        path: '/typography'
      },
      {
        title: 'Icons',
        path: '/icons',
        icon: GoogleCirclesExtended
      },
      {
        title: 'Cards',
        icon: CreditCardOutline,
        path: '/cards'
      },
      {
        title: 'Tables',
        icon: Table,
        path: '/tables'
      },
      {
        icon: CubeOutline,
        title: 'Form Layouts',
        path: '/form-layouts'
      }
    ]
  } else {
    return ([
      { title: 'Login', icon: Login, path: '/pages/login' },
      { title: 'Register', icon: AccountPlusOutline, path: '/pages/register', openInNewTab: true },
    ])
  }
}

export default navigation
