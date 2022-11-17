import request from '@/utils/request'
// import { encryptedData } from '@/utils/encrypt'
// import { loginRSA, tokenName } from '@/config'

export function catesLis(data) {
  return request({
    url: '/cate/getlist',
    method: 'post',
	data,
  })
}

export function addCate(data) {
  return request({
    url: '/cate/add',
    method: 'post',
	data,
  })
}

export function delCate(data) {
  return request({
    url: '/cate/del',
    method: 'post',
	data,
  })
}

export function editCate(data) {
  return request({
    url: '/cate/edit',
    method: 'post',
	data,
  })
}