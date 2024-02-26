/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { lien } from '../Static'

const initialState = {
  raison: [],
  readRaison: '',
  readRaisonError: '',
  postRaison: '',
  postRaisonError: '',
  updateRaison: '',
  updateRaisonError: '',
  deleteRaison: '',
  deleteRaisonError: '',
}

export const ReadRaison = createAsyncThunk(
  'raison/ReadRaison',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(lien + '/raison')
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

const demande = createSlice({
  name: 'demande',
  initialState,
  reducers: {},
  extraReducers: {
    [ReadRaison.pending]: (state, action) => {
      return {
        ...state,
        readRaison: 'pending',
        readRaisonError: '',
        postRaison: '',
        postRaisonError: '',
        updateRaison: '',
        updateRaisonError: '',
        deleteRaison: '',
        deleteRaisonError: '',
      }
    },
    [ReadRaison.fulfilled]: (state, action) => {
      return {
        ...state,
        raison: action.payload,
        readRaison: 'success',
        readRaisonError: '',
        postRaison: '',
        postRaisonError: '',
        updateRaison: '',
        updateRaisonError: '',
        deleteRaison: '',
        deleteRaisonError: '',
      }
    },
    [ReadRaison.rejected]: (state, action) => {
      return {
        ...state,
        readRaison: 'rejected',
        readRaisonError: action.payload,
        postRaison: '',
        postRaisonError: '',
        updateRaison: '',
        updateRaisonError: '',
        deleteRaison: '',
        deleteRaisonError: '',
      }
    },
  },
})

export default demande.reducer
