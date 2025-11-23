import { ref } from 'vue'

export function useApiRequest(fn) {
  const loading = ref(false)
  const error = ref('')

  const execute = async (...args) => {
    loading.value = true
    error.value = ''
    try {
      const response = await fn(...args)
      return response
    } catch (err) {
      error.value = err.message || 'Request failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    execute
  }
}
