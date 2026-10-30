import { useState } from "react"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import ClosetPage from "./pages/ClosetPage"
import OutfitBuilderPage from "./pages/OutfitBuilderPage"

type Destination = "Home" | "Closet" | "Build" | "Explore" | "Profile"

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [page, setPage] = useState<"home" | "closet" | "builder">("home")

  const navigate = (destination: Destination) => {
    if (destination === "Closet") {
      setPage("closet")
    } else if (destination === "Build") {
      setPage("builder")
    } else {
      // Explore and Profile are not implemented yet; return to Home.
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

  if (page === "builder") {
    return <OutfitBuilderPage onNavigate={navigate} />
  }

  return (
    <HomePage
      onSignOut={() => {
        setIsLoggedIn(false)
        setPage("home")
      }}
      onNavigate={navigate}
    />
  )
}
