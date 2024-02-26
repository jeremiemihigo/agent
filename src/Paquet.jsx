/* eslint-disable react/prop-types */
import axios from 'axios'
import { lien, config } from './Static.jsx'
import React from 'react'
import { CircularProgress, Box, Typography } from '@mui/material'
import Liste from './Liste.jsx'
import { useSelector } from 'react-redux'

function Paquet({title}) {
  const [data, setData] = React.useState()
  const [load, setLoad] = React.useState(false)
  const [lotSelect, setLotSelect] = React.useState()
  const userConnect = useSelector(state=>state.user?.user)
  const loading = async () => {
   if(userConnect){
    setLoad(true)
    try {
      const response = await axios.get(
        `${lien}/paquet/${userConnect.codeAgent}`, config
      )
      setData(response.data)
      setLoad(false)
    } catch (error) {
      console.log(error)
    }
   }
  }
  React.useEffect(() => {
    loading()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userConnect])

  return (
    <div>
     <div className='titre'>
      <img src='/bboxx.png' alt='bboxxPages' />
      <p> {title}</p>
     </div>
      {load &&
       <Box sx={{ display: 'flex', justifyContent:"center" }}>
       <CircularProgress size={18}/>
     </Box>
      }
      {data && !lotSelect &&
        data.map((index) => {
          return (
            <div onClick={()=>setLotSelect(index._id)} key={index._id} style={style.containerPaquet}>
              <div style={style.lot}>{index._id}</div>
              <div style={style.reponse}>
                <Typography>Reponse(s)</Typography>
                <Typography>{index.reponse}</Typography>
              </div>
              <div style={style.demande}>
                <Typography>demandes(s)</Typography>
                <Typography>{index.demande}</Typography>
              </div>
            </div>
          )
        })}
        {lotSelect && <Liste lot={lotSelect} />}
    </div>
  )
}

const style = {
  containerPaquet: {
    display: 'flex',
    backgroundColor: '#dedede',
    marginTop: '10px',
    width: '100%',
    borderRadius: '10px',
    padding: '10px',
  },
  lot : {
    width:"35%"
  },
  demande : {
    width:"25%",
    textAlign:"center",
    paddingLeft:"5%"
  },
  reponse : {
    width:"25%",
    textAlign:"center",
   
  },
}

export default Paquet
