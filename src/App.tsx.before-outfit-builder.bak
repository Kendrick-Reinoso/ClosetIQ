import { useState } from "react"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import ClosetPage from "./pages/ClosetPage"

type Destination = "Home" | "Closet" | "Build" | "Explore" | "Profile"

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [page, setPage] = useState<"home" | "closet">("home")
  const [startInBuilder, setStartInBuilder] = useState(false)

  const navigate = (destination: Destination) => {
    if (destination === "Closet") {
      setStartInBuilder(false)
      setPage("closet")
    } else if (destination === "Build") {
      setStartInBuilder(true)
      setPage("home")
    } else {
      // Explore and Profile are not implemented yet; return to Home.
      setStartInBuilder(false)
      setPage("home")
    }
  }

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />
  }

  if (page === "closet") {
    return (
      <ClosetPage
        onNavigate={navigate}
        onCreateOutfit={() => navigate("Build")}
      />
    )
  }

  return (
    <HomePage
      onSignOut={() => {
        setIsLoggedIn(false)
        setPage("home")
        setStartInBuilder(false)
      }}
      onNavigate={navigate}
      startInBuilder={startInBuilder}
    />
  )
}
