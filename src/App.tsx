import { ApiReferenceReact } from '@scalar/api-reference-react'
import { Analytics } from '@vercel/analytics/react'
import '@scalar/api-reference-react/style.css'

function App() {
  return (
    <>
      <ApiReferenceReact
        configuration={{
          spec: {
            url: '/openapi.yaml',
          },
          theme: 'default',
        }}
      />
      <Analytics />
    </>
  )
}

export default App
