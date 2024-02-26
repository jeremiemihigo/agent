// material-ui
import * as React from 'react'
import {
  FormHelperText,
  Grid,
  Button,
  OutlinedInput,
  Stack,
} from '@mui/material'
// third party
import * as Yup from 'yup'
import { Formik } from 'formik'
import axios from 'axios'
import { lien } from './Static'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
// project import

// assets
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})
// ============================|| FIREBASE - LOGIN ||============================ //

const NouvelleInscription = () => {
  const [open, setOpen] = React.useState(true)
  const userConnect = useSelector(state=>state.user?.user)
  const navigation = useNavigate()
  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <Typography component="p" sx={{fontSize:"12px"}}>Modifiez le mot de passe par défaut</Typography>
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              password: '',
            }}
            validationSchema={Yup.object().shape({
              password: Yup.string()
                .max(255)
                .required('Ce champ est obligatoire'),
            })}
            onSubmit={async (
              values,
              { setErrors, resetForm, setStatus, setSubmitting },
            ) => {
              try {
                const response = await axios.put(lien + '/userId', {
                  codeAgent: userConnect && userConnect.codeAgent,
                  ancien: '1234',
                  nouvelle: values.password,
                })
                if (response.status === 200) {
                  setOpen(false)
                  navigation('/operation')
                }
                resetForm()
              } catch (error) {
                setStatus({ success: false })
                setErrors({ submit: error.message })
                setSubmitting(false)
              }
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={1}>
                  <Grid item xs={12} lg={6}>
                    <Stack spacing={1}>
                      <OutlinedInput
                        id="password"
                        type="text"
                        value={values.password}
                        name="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Entrez le nouveau mot de passe"
                        fullWidth
                        error={Boolean(touched.password && errors.password)}
                      />
                      {touched.password && errors.password && (
                        <FormHelperText
                          error
                          id={`standard-weight-helper-text`}
                        >
                          {errors.password}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      disableElevation
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Enregistrer
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default NouvelleInscription
