import client from '@/api/client'

export function loginRequest(credentials) {
  return client.post('/auth/login/', credentials).then((res) => res.data)
}

export function fetchMe() {
  return client.get('/auth/me/').then((res) => res.data)
}

export function fetchTeacherDashboard() {
  return client.get('/dashboard/teacher/').then((res) => res.data)
}

export function fetchStudentDashboard() {
  return client.get('/dashboard/student/').then((res) => res.data)
}

export function registerTeacher(payload) {
  return client.post('/auth/register/teacher/', payload).then((res) => res.data)
}

export function registerStudent(payload) {
  return client.post('/auth/register/student/', payload).then((res) => res.data)
}
