import request from '../util/requestnotoken.js'



export function reqLargeScreenData(data) {
  return request({
    url: '/dataBoard/getLargeScreenData',
    method: 'post',
    data
  })
}


