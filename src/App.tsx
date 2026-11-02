import { useState } from "react"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import ClosetPage from "./pages/ClosetPage"
import OutfitBuilderPage from "./pages/OutfitBuilderPage"
import ExplorePage from "./pages/ExplorePage"
import ProfilePage from "./pages/ProfilePage"

type Destination = "Home" | "Closet" | "Build" | "Explore" | "Profile"

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [page, setPage] = useState<"home" | "closet" | "builder" | "explore" | "profile">("home")

  const navigate = (destination: Destination) => {
    if (destination === "Closet") {
      setPage("closet")
    } else if (destination === "Build") {
      setPage("builder")
    } else if (destination === "Explore") {
      setPage("explore")
    } else if (destination === "Profile") {
      setPage("profile")
    } else {
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

  if (page === "explore") {
    return <ExplorePage onNavigate={navigate} />
  }

  if (page === "profile") {
    return <ProfilePage onNavigate={navigate} />
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
