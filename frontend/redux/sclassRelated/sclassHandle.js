import axios from "axios"
import {
  getRequest,
  getError,
  getStudentsSuccess,
  getFailedTwo,
  getSubDetailsSuccess,
  getSubDetailsRequest,
} from "./sclassSlice"
const REACT_APP_BASE_URL = "http://localhost:5001"

export const getClassStudents = (id) => async (dispatch) => {
  dispatch(getRequest())

  try {
    const result = await axios.get(`${REACT_APP_BASE_URL}/Sclass/Students/${id}`)
    if (result.data.message) {
      dispatch(getFailedTwo(result.data.message))
    } else {
      dispatch(getStudentsSuccess(result.data))
    }
  } catch (error) {
    dispatch(getError(error))
  }
}

export const getSubjectDetails = (id, address) => async (dispatch) => {
  dispatch(getSubDetailsRequest())

  try {
    const result = await axios.get(`${REACT_APP_BASE_URL}/${address}/${id}`)
    if (result.data) {
      dispatch(getSubDetailsSuccess(result.data))
    }
  } catch (error) {
    dispatch(getError(error))
  }
}

