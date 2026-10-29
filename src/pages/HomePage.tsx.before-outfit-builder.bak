import "../styles/home.css"
import { ReactNode, useState } from "react"

type IconProps = {
  className?: string
  filled?: boolean
}

type NavItem = "Home" | "Closet" | "Build" | "Explore" | "Profile"

const wardrobeItems = [
  {
    name: "Oxford shirt",
    category: "Tops",
    image:
      "https://images.unsplash.com/photo-1580682312385-e94d8de1cf3c?auto=format&fit=crop&w=500&q=85",
  },
  {
    name: "Stone trousers",
    category: "Bottoms",
    image:
      "https://images.unsplash.com/photo-1601679249486-3e2a903f23ee?auto=format&fit=crop&w=500&q=85",
  },
  {
    name: "Court sneakers",
    category: "Shoes",
    image:
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=500&q=85",
  },
  {
    name: "Everyday layers",
    category: "Outerwear",
    image:
      "https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=500&q=85",
  },
]

function Icon({
  name,
  className = "",
  filled = false,
}: IconProps & { name: string }) {
  const paths: Record<string, ReactNode> = {
    bookmark: (
      <path
        d="M6.5 4.8c0-.9.7-1.6 1.6-1.6h7.8c.9 0 1.6.7 1.6 1.6v15l-5.5-3.4-5.5 3.4v-15Z"
        fill={filled ? "currentColor" : "none"}
      />
    ),
    shuffle: (
      <>
        <path d="M17 3.8h3.2V7" />
        <path d="m20.1 3.9-4.5 4.5a3.8 3.8 0 0 1-2.7 1.1h-1.8" />
        <path d="M4 6.5h2.1c1.1 0 2.1.5 2.8 1.3l6.3 7.9a3.8 3.8 0 0 0 3 1.4h2" />
        <path d="M17 14h3.2v3.2" />
        <path d="M4 17.1h2.2c1 0 2-.4 2.7-1.1l.8-.8" />
      </>
    ),
    suitcase: (
      <>
        <rect x="4" y="7.5" width="16" height="12" rx="2.2" />
        <path d="M9 7.5V5.8c0-.7.6-1.3 1.3-1.3h3.4c.7 0 1.3.6 1.3 1.3v1.7M8 10.5v6M16 10.5v6" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
        <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      </>
    ),
    home: (
      <>
        <path d="m3.8 10.5 8.2-7 8.2 7" />
        <path d="M5.8 9.3v10h12.4v-10M9.6 19.3v-5.8h4.8v5.8" />
      </>
    ),
    hanger: (
      <>
        <path d="M9.2 7.2c.1-2.1 1.2-3.4 3-3.4 1.6 0 2.8 1 2.8 2.5 0 1.2-.7 2-1.9 2.8-.7.4-1.1 1.1-1.1 1.9" />
        <path d="m12 11 8.2 5.9c1 .7.5 2.3-.8 2.3H4.6c-1.3 0-1.8-1.6-.8-2.3L12 11Z" />
      </>
    ),
    layers: (
      <>
        <path d="m12 3.4 8.2 4.4L12 12.2 3.8 7.8 12 3.4Z" />
        <path d="m5.2 11.2-1.4.8 8.2 4.4 8.2-4.4-1.4-.8" />
        <path d="m5.2 15.5-1.4.7 8.2 4.4 8.2-4.4-1.4-.7" />
      </>
    ),
    compass: (
      <>
        <circle cx="12" cy="12" r="8.6" />
        <path d="m15.7 8.3-2.1 5.3-5.3 2.1 2.1-5.3 5.3-2.1Z" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8.2" r="3.4" />
        <path d="M5.7 20c.4-3.1 2.9-5.3 6.3-5.3s5.9 2.2 6.3 5.3" />
      </>
    ),
    arrow: <path d="M5 12h13M14 7.5l4.5 4.5-4.5 4.5" />,
    chevron: <path d="m9 5 7 7-7 7" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
  }

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.65"
      viewBox="0 0 24 24"
    >
      {paths[name]}
    </svg>
  )
}

function ActionCard({
  icon,
  label,
  onClick,
}: {
  icon: string
  label: string
  onClick: () => void
}) {
  return (
    <button className="quick-card" onClick={onClick} type="button">
      <span className="quick-icon">
        <Icon name={icon} />
      </span>
      <span>{label}</span>
    </button>
  )
}

export default function HomePage({
  onSignOut,
  onNavigate,
  startInBuilder = false,
}: {
  onSignOut: () => void
  onNavigate?: (destination: NavItem) => void
  startInBuilder?: boolean
}) {
  const [saved, setSaved] = useState(false)
  const [activeNav, setActiveNav] = useState<NavItem>(startInBuilder ? "Build" : "Home")
  const [notice, setNotice] = useState("")
  const [builderOpen, setBuilderOpen] = useState(startInBuilder)

  const announce = (message: string) => {
    setNotice(message)
    window.setTimeout(() => setNotice(""), 2400)
  }

  const openBuilder = () => {
    setActiveNav("Build")
    setBuilderOpen(true)
  }

  const selectNav = (item: NavItem) => {
    if (item === "Closet") {
      onNavigate?.("Closet")
      return
    }
    setActiveNav(item)
    if (item === "Build") {
      setBuilderOpen(true)
      return
    }
    if (item !== "Home") announce(`${item} is ready for your next screen.`)
  }

  return (
    <main className="app-shell">
      <section className="home-screen" aria-label="ClosetIQ home">
        <div className="home-content">
          <header className="home-header">
            <div>
              <p className="wordmark">CLOSETIQ / DAILY</p>
              <h1>
                Good morning.
                <span>Let&apos;s put something together.</span>
              </h1>
            </div>
            <button
              aria-label="Open profile"
              className="avatar-button"
              onClick={() => selectNav("Profile")}
              type="button"
            >
              <span>AK</span>
            </button>
          </header>
          <div className="preview-bar">
            <span>UI PREVIEW · NO ACCOUNT AUTHENTICATION</span>
            <button type="button" onClick={onSignOut}>Sign out</button>
          </div>

          <section
            className="inspiration-section"
            aria-labelledby="inspiration-title"
          >
            <div className="section-topline">
              <div>
                <p className="section-index">01 / EDIT</p>
                <h2 id="inspiration-title">Today&apos;s Inspiration</h2>
              </div>
              <button
                aria-label={saved ? "Remove saved outfit" : "Save outfit"}
                aria-pressed={saved}
                className={saved ? "save-button saved" : "save-button"}
                onClick={() => {
                  setSaved((current) => !current)
                  announce(
                    saved ? "Removed from saved outfits." : "Outfit saved.",
                  )
                }}
                type="button"
              >
                <Icon filled={saved} name="bookmark" />
              </button>
            </div>

            <article className="outfit-card">
              <img
                alt="A relaxed neutral outfit with jeans, jacket, and sneakers laid out together"
                className="outfit-image"
                src="https://images.unsplash.com/photo-1739384879592-79903b12b2a6?auto=format&fit=crop&w=1000&q=88"
              />
              <div className="image-badge">CURATED FOR 18°C</div>
              <div className="outfit-info">
                <div>
                  <p>Relaxed Everyday</p>
                  <span>4 pieces · Casual</span>
                </div>
                <button
                  className="details-button"
                  onClick={() => announce("Outfit details opened.")}
                  type="button"
                >
                  View look <Icon name="arrow" />
                </button>
              </div>
            </article>
          </section>

          <button className="builder-card" onClick={openBuilder} type="button">
            <span className="builder-copy">
              <span className="builder-kicker">MAKE IT YOURS</span>
              <strong>Build Your Next Fit</strong>
              <span>Swipe, mix, and match pieces from your wardrobe.</span>
            </span>
            <span className="builder-action">
              Start Building <Icon name="arrow" />
            </span>
          </button>

          <section className="quick-section" aria-labelledby="quick-title">
            <div className="section-heading">
              <h2 id="quick-title">Quick Actions</h2>
              <span>STYLE TOOLS</span>
            </div>
            <div className="quick-grid">
              <ActionCard
                icon="shuffle"
                label="Shuffle"
                onClick={() => announce("A fresh outfit is being shuffled.")}
              />
              <ActionCard
                icon="suitcase"
                label="Pack"
                onClick={() => announce("Trip packing opened.")}
              />
              <ActionCard
                icon="plus"
                label="Add Item"
                onClick={() => announce("Add an item to your closet.")}
              />
            </div>
          </section>

          <section className="closet-section" aria-labelledby="closet-title">
            <div className="section-heading closet-heading">
              <div>
                <span>RECENTLY ADDED</span>
                <h2 id="closet-title">Your Closet</h2>
              </div>
              <button onClick={() => selectNav("Closet")} type="button">
                View All <Icon name="chevron" />
              </button>
            </div>
            <div className="closet-row">
              {wardrobeItems.map((item) => (
                <button
                  className="closet-item"
                  key={item.name}
                  onClick={() => announce(`${item.name} selected.`)}
                  type="button"
                >
                  <span className="closet-photo">
                    <img alt={item.name} src={item.image} />
                  </span>
                  <strong>{item.name}</strong>
                  <span>{item.category}</span>
                </button>
              ))}
            </div>
          </section>
        </div>

        <nav className="bottom-nav" aria-label="Primary navigation">
          {[
            { label: "Home" as NavItem, icon: "home" },
            { label: "Closet" as NavItem, icon: "hanger" },
            { label: "Build" as NavItem, icon: "layers" },
            { label: "Explore" as NavItem, icon: "compass" },
            { label: "Profile" as NavItem, icon: "user" },
          ].map((item) => (
            <button
              aria-current={activeNav === item.label ? "page" : undefined}
              className={`${activeNav === item.label ? "active " : ""}${
                item.label === "Build" ? "build-nav" : ""
              }`}
              key={item.label}
              onClick={() => selectNav(item.label)}
              type="button"
            >
              <span className="nav-icon">
                <Icon name={item.icon} />
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <p aria-live="polite" className={notice ? "toast visible" : "toast"}>
          {notice}
        </p>

        {builderOpen && (
          <div className="sheet-backdrop" role="presentation">
            <section
              aria-labelledby="builder-sheet-title"
              aria-modal="true"
              className="builder-sheet"
              role="dialog"
            >
              <div className="sheet-handle" />
              <button
                aria-label="Close outfit builder"
                className="sheet-close"
                onClick={() => {
                  setBuilderOpen(false)
                  setActiveNav("Home")
                }}
                type="button"
              >
                <Icon name="close" />
              </button>
              <p>OUTFIT BUILDER</p>
              <h2 id="builder-sheet-title">Start with a piece.</h2>
              <span>
                Choose what you want to wear and we&apos;ll build around it.
              </span>
              <div className="sheet-options">
                {wardrobeItems.slice(0, 3).map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      setBuilderOpen(false)
                      setActiveNav("Home")
                      announce(
                        `Building a look around ${item.name.toLowerCase()}.`,
                      )
                    }}
                    type="button"
                  >
                    <img alt="" src={item.image} />
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}
      </section>
    </main>
  )
}
