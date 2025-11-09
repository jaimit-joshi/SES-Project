import axios from "axios"
import { getRequest, getSuccess, getFailed, getError } from "./complainSlice"
const REACT_APP_BASE_URL = "http://localhost:5001"

export const getAllComplains = (id, address) => async (dispatch) => {
  dispatch(getRequest())

  try {
    const result = await axios.get(`${REACT_APP_BASE_URL}/${address}List/${id}`)
    if (result.data.message) {
      dispatch(getFailed(result.data.message))
    } else {
      dispatch(getSuccess(result.data))
    }
  } catch (error) {
    dispatch(getError(error))
  }
}

export const getUserComplains = (id) => async (dispatch) => {
  dispatch(getRequest())

  try {
    const result = await axios.get(`${REACT_APP_BASE_URL}/UserComplains/${id}`)
    if (result.data.message) {
      dispatch(getFailed(result.data.message))
    } else {
      dispatch(getSuccess(result.data))
    }
  } catch (error) {
    dispatch(getError(error))
  }
}

export const updateComplainStatus = (id, status) => async (dispatch) => {
  try {
    const result = await axios.put(
      `${REACT_APP_BASE_URL}/ComplainStatus/${id}`,
      { status },
      { headers: { "Content-Type": "application/json" } },
    )
    return result.data
  } catch (error) {
    dispatch(getError(error))
    throw error
  }
}
