import request from '@/utils/request'
// import { encryptedData } from '@/utils/encrypt'
// import { loginRSA, tokenName } from '@/config'

export function getcates(data) {
  return request({
    url: '/article/getcates',
    method: 'post',
	data,
  })
}

export function uploadThumb(data) {
  return request({
    url: '/article/upload',
    method: 'post',
	data,
  })
}

export function articleLis(data) {
  return request({
    url: '/article/getlist',
    method: 'post',
	data,
  })
}

export function addArticle(data) {
  return request({
    url: '/article/add',
    method: 'post',
	data,
  })
}

export function delArticle(data) {
  return request({
    url: '/article/del',
    method: 'post',
	data,
  })
}

export function editArticle(data) {
  return request({
    url: '/article/edit',
    method: 'post',
	data,
  })
}