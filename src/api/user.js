import request from '@/utils/request'
// import { encryptedData } from '@/utils/encrypt'
// import { loginRSA, tokenName } from '@/config'

export async function loginApi(data) {
  // if (loginRSA) {
  //   data = await encryptedData(data)
  // }
  return request({
    url: 'index/login',
    method: 'post',
    data,
  })
}

export function logout() {
  return request({
    url: 'index/logout',
    method: 'post',
  })
}

export function catesLis() {
  return request({
    url: '/cate/getlist',
    method: 'post',
  })
}

export function getAdminList(data) {
  return request({
    url: '/admin/getlist',
    method: 'post',
	data
  })
}