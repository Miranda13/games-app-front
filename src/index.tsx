import React from 'react'
import ReactDOM from 'react-dom/client'

import Core from './app/core'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Core/>
  </React.StrictMode>,
)
