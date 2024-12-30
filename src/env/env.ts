interface ImportMeta {
  env: {
    VITE_API_URL: string
    VITE_BASE_URL: string
  }
}

const { VITE_API_URL, VITE_BASE_URL } = (import.meta as unknown as ImportMeta)
  .env

export { VITE_API_URL, VITE_BASE_URL }
