import React, { useEffect, useState } from 'react'

export const PwaPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      console.log(e)
      e.preventDefault()
      setDeferredPrompt(e)
      setIsVisible(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          setIsVisible(false) // Oculta el banner solo si se acepta la instalación
        } else {
          console.log('Usuario rechazó la instalación de la PWA')
        }
      })
    }
  }

  return (
    isVisible && (
      <div className="bg-blue-600 text-white p-4 mt-20">
        <span>¡Instala nuestra app para una mejor experiencia!</span>
        <button
          className="ml-4 bg-blue-800 p-2 rounded"
          onClick={handleInstallClick}
        >
          Instalar
        </button>
      </div>
    )
  )
}
