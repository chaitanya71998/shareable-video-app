import React, { useState } from "react"
import "./VideoPlayer.css"

const VideoPlayer = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const videoUrl =
    "https://media-content.ccbp.in/website/video_assets/verticalNatureTesting_9_16.mp4"

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this video",
          text: "Watch this amazing video!",
          url: videoUrl,
        })
      } catch (error) {
        setErrorMessage("Failed to share. You can copy the video URL instead.")
      }
    } else {
      setErrorMessage(
        "Sharing is not supported in your browser. You can copy the video URL instead."
      )
    }
  }

  const handleDownload = async () => {
    try {
      const response = await fetch(videoUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "video.mp4"
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      setErrorMessage(
        "Failed to download. Please try using the direct video link."
      )
    }
  }

  return (
    <div className="video-container">
      <video className="video-player" controls playsInline src={videoUrl}>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="controls">
        <button onClick={handleShare} className="control-button">
          Share Video
        </button>
        <button onClick={handleDownload} className="control-button">
          Download Video
        </button>
      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  )
}

export default VideoPlayer
