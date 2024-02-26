/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from 'axios'
import { dateFrancais, lien, lien_image } from './Static'
import React from 'react'
import { Typography, CircularProgress, Grid } from '@mui/material'
import { Delete } from '@mui/icons-material'
import Popup from './Control/Popup'
import FormReclamation from './FormReclamation'
import { useSelector } from 'react-redux'

function Chat({ title }) {
  const [data, setData] = React.useState()
  const [idDelete, setIdDelete] = React.useState('')
  const userConnect = useSelector((state) => state.user?.user)
  const loading = async () => {
    if (userConnect) {
      try {
        const response = await axios.get(
          `${lien}/message/${userConnect?.codeAgent}`,
        )
        setData(response.data)
      } catch (error) {
        console.log(error)
      }
    }
  }
  React.useEffect(() => {
    loading()
  }, [userConnect])

  const deleteOne = async (id) => {
    setIdDelete(id)
    try {
      const response = await axios.delete(lien + '/deleteReclamation/' + id)
      const donner = data.filter((x) => x._id !== response.data)
      setData(donner)
    } catch (error) {
      console.log(error)
    }
  }

  const [open, setOpen] = React.useState(false)
  const [id, setId] = React.useState()
  const openData = (id) => {
    setId(id)
    setOpen(true)
  }
  return (
    <div>
      <div className="titre">
        <img src="/bboxx.png" alt="bboxxPages" />
        <p> {title}</p>
      </div>
      <div>
        {data &&
          data.length > 0 &&
          data.map((index) => {
            return (
              <div key={index._id} style={{ marginTop: '10px' }}>
                {index.reponseId.length > 0 && (
                  <div>
                    <p className="listeImage">
                      {index.reponseId[0].codeclient};{' '}
                      {index.reponseId[0].nomclient}
                    </p>
                    <Grid container>
                      <Grid
                        onClick={() => openData(index.reponseId[0]._id)}
                        item
                        lg={8}
                        sm={10}
                        xs={11}
                        className={`${
                          index.sender === 'agent' ? 'agentCss' : 'coCSS'
                        }`}
                      >
                        <p>{index.message} </p>
                      </Grid>
                      <Grid
                        className="message"
                        item
                        sm={2}
                        xs={1}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {index.sender === 'agent' && (
                          <span
                            onClick={() => deleteOne(index._id)}
                            className="deleteMessage"
                          >
                            {idDelete === index._id ? (
                              <CircularProgress
                                size={14}
                                color="inherit"
                                sx={{ marginRight: '10px' }}
                              />
                            ) : (
                              <Delete fontSize="small" />
                            )}
                          </span>
                        )}{' '}
                      </Grid>
                    </Grid>
                  </div>
                )}
                {index.demandeId.length > 0 && (
                  <div>
                    <Grid container className="listeImage">
                      <Grid
                        sx={{ display: 'flex' }}
                        item
                        sm={index.sender === 'co' ? 12 : 10}
                        xs={index.sender === 'co' ? 12 : 11}
                      >
                        <img
                          src={`${lien_image}/${index.demandeId[0].file}`}
                          alt={index._id}
                          style={{
                            height: '30px',
                            marginRight: '10px',
                            width: '30px',
                          }}
                        />
                        <Typography component="p" sx={{ fontSize: '12px' }}>
                          {index.demandeId[0]?.codeclient};{' '}
                          {index.demandeId[0]?.sector} {index.demandeId[0]?.sat}{' '}
                          {index.demandeId[0]?.reference}
                          {index.demandeId[0]?.statut};{' '}
                          {index.demandeId[0]?.raison.toLowerCase()}
                          <span style={{ float: 'right' }}>
                            {dateFrancais(index?.createdAt)}
                          </span>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid
                        onClick={() => openData(index.demandeId[0]._id)}
                        item
                        sm={index.sender === 'co' ? 12 : 10}
                        xs={index.sender === 'co' ? 12 : 11}
                      >
                        <p
                          className={`${
                            index.sender === 'agent' ? 'agentCss' : 'coCSS'
                          }`}
                        >
                          {index.message}
                        </p>
                      </Grid>
                      <Grid
                        className="message"
                        item
                        sm={2}
                        xs={1}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {index.sender === 'agent' && (
                          <span onClick={() => deleteOne(index._id)}>
                            {idDelete === index._id ? (
                              <CircularProgress
                                size={14}
                                color="inherit"
                                sx={{ marginRight: '10px' }}
                              />
                            ) : (
                              <Delete fontSize="small" />
                            )}
                          </span>
                        )}
                      </Grid>
                    </Grid>
                  </div>
                )}
              </div>
            )
          })}
      </div>
      {id && (
        <Popup open={open} setOpen={setOpen} title="Feedback">
          <FormReclamation id={id} setData={setData} data={data} />
        </Popup>
      )}
    </div>
  )
}

export default Chat
