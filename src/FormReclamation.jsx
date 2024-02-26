/* eslint-disable react/prop-types */
import { Button } from '@mui/material'
import TextArea from 'antd/es/input/TextArea'
import axios from 'axios'
import React from 'react'
import { lien } from './Static'
import DirectionSnackbar from './Control/SnackBar'
import { useSelector } from 'react-redux'

function FormReclamation({ id, data, setData }) {
  const [initial, setInitial] = React.useState('')
  const [sending, setSendIng] = React.useState(false)
  const [open, setOpen] = React.useState(true)
  const [message, setMessage] = React.useState()
  const userConnect = useSelector(state=>state.user?.user)

  const sendData = async (e) => {
    e.preventDefault()
    setSendIng(true)
    try {
      const response = await axios.post(lien + '/reclamation', {
        _id: id,
        codeAgent : userConnect && userConnect?.codeAgent,
        sender: 'agent',
        message: initial,
      })
      
      if (response.data[0]?.message) {
        setData([...data, response.data[0]])
        setInitial("")
      }
      if (response.status === 201) {
        setMessage(response.data)
      }
      setSendIng(false)
    } catch (error) {
      setSendIng(false)
      console.log(error)
    }
  }
  return (
    <div>
      {message && (
        <DirectionSnackbar message={message} open={open} setOpen={setOpen} />
      )}
      <TextArea
      value={initial}
        placeholder="Message"
        onChange={(e) => {
          setInitial(e.target.value)
          setMessage()
        }}
      />
      <Button
        disabled={sending}
        onClick={(e) => sendData(e)}
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: '10px' }}
      >
        Envoyer
      </Button>
    </div>
  )
}

export default FormReclamation
