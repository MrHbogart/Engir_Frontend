import client from '@/api/client'

export function createEnrollment(payload) {
  return client.post('/enrollments/', payload).then((res) => res.data)
}
