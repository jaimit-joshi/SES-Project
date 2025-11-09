import axios from "axios"
import { getRequest, getSuccess, getFailed, getError } from "./noticeSlice"
const REACT_APP_BASE_URL = "https://ses-project.onrender.com"

export const getAllNotices = (id, address) => async (dispatch) => {
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

export const markNoticeAsRead = (noticeId, userId, userType) => async (dispatch) => {
  try {
    const result = await axios.put(
      `${REACT_APP_BASE_URL}/NoticeRead/${noticeId}`,
      { userId, userType },
      { headers: { "Content-Type": "application/json" } },
    )
    return result.data
  } catch (error) {
    dispatch(getError(error))
    throw error
  }
}

export const unmarkNoticeAsRead = (noticeId, userId, userType) => async (dispatch) => {
  try {
    const result = await axios.put(
      `${REACT_APP_BASE_URL}/NoticeUnread/${noticeId}`,
      { userId, userType },
      { headers: { "Content-Type": "application/json" } },
    )
    return result.data
  } catch (error) {
    dispatch(getError(error))
    throw error
  }
}
