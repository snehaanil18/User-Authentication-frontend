import {serverURL} from './serverURL'
import { commonAPI } from './commonAPI'

//register user
export const registerAPI = async(user) => {
    return await commonAPI("post",`${serverURL}/register`,user,"")
}

//verify-email
export const verifyEmailAPI = async(email) => {
    return await commonAPI("post",`${serverURL}/verify-email`,email,"")
}

//verify-otp-email
export const verifyOtpAPI = async(body) => {
    return await commonAPI("post",`${serverURL}/verify-otp-email`,body,"")
}

//verify-phone
export const verifyMobileAPI = async(phone) => {
    return await commonAPI("post",`${serverURL}/verify-phone`,phone,"")
}

//verify-otp-phone
export const verifyMobileOtpAPI = async(body) => {
    return await commonAPI("post",`${serverURL}/verify-otp-phone`,body,"")
}

//verify aadhar
export const verifyAadharAPI = async(body) => {
    return await commonAPI("post",`${serverURL}/verify-aadhar`,body,"")
}

//login
export const loginAPI = async(body) => {
    return await commonAPI("post",`${serverURL}/login`,body,"")
}

//verify pan
export const verifyPanAPI = async(reqBody,reqHeader) => {
    return await commonAPI("post",`${serverURL}/verify-pan`,reqBody,reqHeader)
}

//verify pincode
export const verifyAddressAPI = async(addr,reqHeader) => {
    return await commonAPI("get",`${serverURL}/pincode/${addr}`,"",reqHeader)
}

//verify gst
export const verifyGstAPI = async(reqBody,reqHeader) => {
    return await commonAPI("post",`${serverURL}/verify-gst`,reqBody,reqHeader)
}

//verify bank
export const verifyBankAPI = async(reqBody,reqHeader) => {
    return await commonAPI("post",`${serverURL}/verify-account`,reqBody,reqHeader)
}

export const verifyDetailsAPI = async(id,reqHeader) => {
    return await commonAPI("get",`${serverURL}/verify-status/${id}`,"",reqHeader)
}