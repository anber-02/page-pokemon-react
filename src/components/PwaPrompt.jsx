// src/components/PwaPrompt.jsx
import React, { useState, useEffect } from 'react'

export const PwaPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault()
      setDeferredPrompt(event)
      setShowPrompt(true) // Mostrar el prompt al recibir el evento
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleShowPrompt = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
    }
  }

  const handleAccept = async () => {
    if (deferredPrompt) {
      const result = await deferredPrompt.userChoice
      setShowPrompt(false)
      console.log(result.outcome === 'accepted' ? 'User accepted the PWA prompt' : 'User dismissed the PWA prompt')
      setDeferredPrompt(null)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    setDeferredPrompt(null)
  }

  return (
    <div>
      {showPrompt && (
        <div>
          <p>Do you want to install this PWA?</p>
          <button onClick={handleDismiss}>No Thanks</button>
          <button onClick={handleAccept}>Add To Home Screen</button>
        </div>
      )}
    </div>
  )
}
