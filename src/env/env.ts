interface ImportMeta {
  env: {
    VITE_API_URL: string
  }
}

const { VITE_API_URL } = (import.meta as unknown as ImportMeta).env

export { VITE_API_URL }
