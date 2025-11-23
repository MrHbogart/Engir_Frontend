import client from '@/api/client'

export function fetchSessions(params = {}) {
  return client.get('/sessions/', { params }).then((res) => res.data)
}

export function createSession(payload) {
  return client.post('/sessions/', payload).then((res) => res.data)
}

export function startStream(sessionId) {
  return client.post(`/sessions/${sessionId}/start_stream/`).then((res) => res.data)
}

export function endStream(sessionId, recordingUrl = '') {
  return client
    .post(`/sessions/${sessionId}/end_stream/`, { recording_url: recordingUrl })
    .then((res) => res.data)
}

export function regenerateStreamKey(sessionId) {
  return client.post(`/sessions/${sessionId}/regenerate_stream_key/`).then((res) => res.data)
}
