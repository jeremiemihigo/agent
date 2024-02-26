import * as React from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paquet from './Paquet'
import Demande from './Demande'
import Chats from './Chat'
import { Logout, Message, Person, TocOutlined, Visibility } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import Profil from './Profil'
import FirstLogin from "./FirstLogin"
import { useSelector } from 'react-redux'

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ paddingTop:1, paddingLeft:4, paddingRight:4, paddingBottom:4 }}>{children}</Box>}
    </div>
  )
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}



export default function BasicTabs() {
  const userConnect = useSelector(state=>state.user?.user)

  const navigation = useNavigate()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const deconnection = (e) => {
    e.preventDefault()
    localStorage.removeItem('auth')
    navigation('/')
  }

  React.useEffect(() => {
    if (!localStorage.getItem('auth')) {
      navigation('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box sx={{ width: '100%' }}>
      {userConnect && userConnect.first && <FirstLogin/>}
      <Box>
        <div style={{ display: 'flex', padding: '10px' }}>
          <Typography
            component="p"
            noWrap
            sx={{ width: '60%', textAlign: 'center' }}
          >
            {userConnect && userConnect?.nom}
          </Typography>
          <Typography component="p" sx={{ width: '20%' }}>
            {userConnect && userConnect?.codeAgent}
          </Typography>
          <Typography
            component="p"
            onClick={(e) => deconnection(e)}
            noWrap
            sx={{ width: '20%', textAlign: 'right' }}
          >
            {' '}
            <Logout />
          </Typography>
        </div>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label={<TocOutlined fontSize='small'/>} {...a11yProps(0)} />
          <Tab label={<Visibility fontSize='small'/>} {...a11yProps(1)} />
          <Tab label={<Message fontSize='small'/>} {...a11yProps(2)} />
          <Tab label={<Person fontSize='small' />} {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Paquet title="Paquet"/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Demande title="Demande"/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Chats title="Feedback"/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Profil title="Profil"/>
      </CustomTabPanel>
    </Box>
  )
}
