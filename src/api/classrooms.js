import client from '@/api/client'

export function fetchClassrooms(params = {}) {
  return client.get('/classes/', { params }).then((res) => res.data)
}

export function fetchClassByCode(code) {
  return client.get(`/classes/code/${code}/`).then((res) => res.data)
}
