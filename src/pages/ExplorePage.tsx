import { useMemo, useState } from "react"
import type { ReactNode } from "react"
import "../styles/explore.css"

type NavItem = "Home" | "Closet" | "Build" | "Explore" | "Profile"
type FeedTab = "Following" | "Popular"

type ExplorePageProps = {
  onNavigate?: (destination: NavItem) => void
}

type Post = {
  id: string
  name: string
  handle: string
  initials: string
  time: string
  image: string
  imageAlt: string
  outfit: string
  caption: string
  occasion: string
  weather: string
  extraTag?: string
  likes: number
  friend: boolean
  avatarTone: string
}

const occasions = [
  ["School", "🎓"],
  ["Work", "💼"],
  ["Date", "❤️"],
  ["Party", "🎉"],
  ["Gym", "🏋️"],
  ["Sports", "🏀"],
  ["Wedding", "👰"],
  ["Dinner", "🍽️"],
  ["Night out", "🌃"],
  ["Vacation", "🏖️"],
  ["Casual", "🛋️"],
]

const weather = [
  ["Hot", "🌡️"],
  ["Warm", "☀️"],
  ["Cool", "🍃"],
  ["Cold", "❄️"],
  ["Rainy", "🌧️"],
  ["Snowy", "🌨️"],
]

const posts: Post[] = [
  {
    id: "stone-and-silk",
    name: "Mara Ellis",
    handle: "@marae",
    initials: "ME",
    time: "18m",
    image:
      "https://images.unsplash.com/photo-1769614552343-a86788218525?auto=format&fit=crop&w=900&q=88",
    imageAlt: "Woman walking between stone columns in an elegant neutral outfit",
    outfit: "Stone & Silk",
    caption: "Soft tailoring for a slow morning and a very long lunch.",
    occasion: "Dinner",
    weather: "Warm",
    extraTag: "Minimal",
    likes: 184,
    friend: true,
    avatarTone: "clay",
  },
  {
    id: "monday-uniform",
    name: "Noah Williams",
    handle: "@noahwears",
    initials: "NW",
    time: "42m",
    image:
      "https://images.unsplash.com/photo-1664815535218-30497990b10c?auto=format&fit=crop&w=900&q=88",
    imageAlt: "Man in a hat and glasses wearing a relaxed city outfit",
    outfit: "Monday, Uncomplicated",
    caption: "The trench does the work. Everything else gets to stay easy.",
    occasion: "Work",
    weather: "Cool",
    extraTag: "Layers",
    likes: 326,
    friend: true,
    avatarTone: "sage",
  },
  {
    id: "after-five",
    name: "Sasha Kim",
    handle: "@sashak",
    initials: "SK",
    time: "1h",
    image:
      "https://images.unsplash.com/photo-1729808785139-c8de8eff75d7?auto=format&fit=crop&w=900&q=88",
    imageAlt: "Woman in a polished black outfit standing on a city street",
    outfit: "After Five",
    caption: "A little structure, a little shine, nowhere to rush.",
    occasion: "Night out",
    weather: "Warm",
    likes: 892,
    friend: true,
    avatarTone: "ink",
  },
  {
    id: "library-hours",
    name: "Lina Park",
    handle: "@linap",
    initials: "LP",
    time: "2h",
    image:
      "https://images.unsplash.com/photo-1713629763763-ad3aa91f5dd4?auto=format&fit=crop&w=900&q=88",
    imageAlt: "Woman in a relaxed outfit standing in a stone archway",
    outfit: "Library Hours",
    caption: "Big shirt, tiny bag, and enough layers for the walk home.",
    occasion: "School",
    weather: "Cool",
    extraTag: "Neutral",
    likes: 247,
    friend: true,
    avatarTone: "sand",
  },
  {
    id: "sunday-market",
    name: "Imani Brooks",
    handle: "@imanib",
    initials: "IB",
    time: "3h",
    image:
      "https://images.unsplash.com/photo-1729808783871-797a683a07b1?auto=format&fit=crop&w=900&q=88",
    imageAlt: "Woman in a hat walking down a sunlit street",
    outfit: "Sunday Market",
    caption: "Found the perfect vintage scarf and built the rest around it.",
    occasion: "Casual",
    weather: "Warm",
    likes: 521,
    friend: true,
    avatarTone: "rose",
  },
  {
    id: "coastal-carry-on",
    name: "Avery Cole",
    handle: "@averycole",
    initials: "AC",
    time: "5h",
    image:
      "https://images.unsplash.com/photo-1768599064940-611c34ef079a?auto=format&fit=crop&w=900&q=88",
    imageAlt: "Woman leaning on a railing in a light vacation outfit",
    outfit: "Coastal Carry-on",
    caption: "One linen set, three days, no overthinking required.",
    occasion: "Vacation",
    weather: "Hot",
    extraTag: "Linen",
    likes: 1248,
    friend: true,
    avatarTone: "sky",
  },
  {
    id: "rain-check",
    name: "Theo James",
    handle: "@theoj",
    initials: "TJ",
    time: "Yesterday",
    image:
      "https://images.unsplash.com/photo-1664815535209-e514887a2163?auto=format&fit=crop&w=900&q=88",
    imageAlt: "Man in a hat wearing layered street style",
    outfit: "Rain Check",
    caption: "Waxed cotton, worn denim, and shoes that can take a puddle.",
    occasion: "Casual",
    weather: "Rainy",
    extraTag: "Utility",
    likes: 676,
    friend: true,
    avatarTone: "ochre",
  },
  {
    id: "gallery-date",
    name: "June Okafor",
    handle: "@juneincolour",
    initials: "JO",
    time: "Yesterday",
    image:
      "https://images.unsplash.com/photo-1618244935922-95c1b26ce6c6?auto=format&fit=crop&w=900&q=88",
    imageAlt: "Woman in an orange dress seated in a modern concrete space",
    outfit: "Gallery Date",
    caption: "Let the colour be the conversation.",
    occasion: "Date",
    weather: "Hot",
    likes: 2106,
    friend: false,
    avatarTone: "orange",
  },
  {
    id: "city-ceremony",
    name: "Elena Rossi",
    handle: "@elenar",
    initials: "ER",
    time: "2d",
    image:
      "https://images.unsplash.com/photo-1768599181259-546dcdca273e?auto=format&fit=crop&w=900&q=88",
    imageAlt: "Woman in a formal outfit standing on stone steps",
    outfit: "City Ceremony",
    caption: "Wedding guest dressing, but make it walkable.",
    occasion: "Wedding",
    weather: "Warm",
    extraTag: "Tailored",
    likes: 1734,
    friend: false,
    avatarTone: "plum",
  },
  {
    id: "first-snow",
    name: "Milo Chen",
    handle: "@milo.archive",
    initials: "MC",
    time: "3d",
    image:
      "https://images.unsplash.com/photo-1751127489150-7c989f78ca32?auto=format&fit=crop&w=900&q=88",
    imageAlt: "Person walking near a grand archway in a long layered outfit",
    outfit: "First Snow",
    caption: "A long coat makes even the coldest commute feel cinematic.",
    occasion: "Work",
    weather: "Snowy",
    extraTag: "Wool",
    likes: 2981,
    friend: false,
    avatarTone: "blue",
  },
]

function Icon({
  name,
  filled = false,
}: {
  name: string
  filled?: boolean
}) {
  const paths: Record<string, ReactNode> = {
    bell: (
      <>
        <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 8h18c0-1-3-1-3-8" />
        <path d="M10 21h4" />
      </>
    ),
    sliders: (
      <>
        <path d="M4 7h10M18 7h2M4 17h2M10 17h10" />
        <circle cx="16" cy="7" r="2" />
        <circle cx="8" cy="17" r="2" />
      </>
    ),
    heart: (
      <path
        d="M20.8 4.7a5.5 5.5 0 0 0-7.8 0L12 5.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.4 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"
        fill={filled ? "currentColor" : "none"}
      />
    ),
    bookmark: (
      <path
        d="M6.5 4.7c0-.9.7-1.6 1.6-1.6h7.8c.9 0 1.6.7 1.6 1.6v15.1L12 16.4l-5.5 3.4V4.7Z"
        fill={filled ? "currentColor" : "none"}
      />
    ),
    share: (
      <>
        <circle cx="18" cy="5" r="2.3" />
        <circle cx="6" cy="12" r="2.3" />
        <circle cx="18" cy="19" r="2.3" />
        <path d="m8 11 7.8-4.6M8 13l7.8 4.6" />
      </>
    ),
    close: <path d="m6 6 12 12M18 6 6 18" />,
    link: (
      <>
        <path d="M9.5 14.5 14.5 9" />
        <path d="M7.2 17.3H6a4 4 0 0 1 0-8h3M17 6.7h1a4 4 0 0 1 0 8h-3" />
      </>
    ),
    send: (
      <>
        <path d="m21 3-8.5 18-2.3-7.2L3 11.5 21 3Z" />
        <path d="m10.2 13.8 5.1-5.1" />
      </>
    ),
    external: (
      <>
        <path d="M14 4h6v6M20 4l-9 9" />
        <path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" />
      </>
    ),
    check: <path d="m5 12 4.5 4.5L19 7" />,
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
        <path d="m5.2 11.2-1.4.8 8.2 4.4 8.2-4.4-1.4-.8M5.2 15.5l-1.4.7 8.2 4.4 8.2-4.4-1.4-.7" />
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
  }

  return (
    <svg
      aria-hidden="true"
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

export default function ExplorePage({ onNavigate }: ExplorePageProps) {
  const [tab, setTab] = useState<FeedTab>("Following")
  const [liked, setLiked] = useState<Set<string>>(new Set())
  const [saved, setSaved] = useState<Set<string>>(new Set())
  const [followed, setFollowed] = useState<Set<string>>(
    new Set(posts.filter((post) => post.friend).map((post) => post.id)),
  )
  const [occasion, setOccasion] = useState("")
  const [weatherFilter, setWeatherFilter] = useState("")
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [notificationsRead, setNotificationsRead] = useState(false)
  const [sharedPost, setSharedPost] = useState<Post | null>(null)
  const [toast, setToast] = useState("")

  const visiblePosts = useMemo(() => {
    const source =
      tab === "Following"
        ? posts.filter((post) => followed.has(post.id))
        : [...posts].sort((a, b) => b.likes - a.likes)
    return source.filter(
      (post) =>
        (!occasion || post.occasion === occasion) &&
        (!weatherFilter || post.weather === weatherFilter),
    )
  }, [followed, occasion, tab, weatherFilter])

  const announce = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(""), 2200)
  }

  const toggleSet = (
    setter: React.Dispatch<React.SetStateAction<Set<string>>>,
    id: string,
  ) => {
    setter((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const applyTag = (post: Post, tag: string) => {
    if (tag === post.occasion) setOccasion(tag)
    if (tag === post.weather) setWeatherFilter(tag)
    setFiltersOpen(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const clearFilters = () => {
    setOccasion("")
    setWeatherFilter("")
  }

  const shareAction = (action: string) => {
    if (action === "Link copied" && navigator.clipboard) {
      void navigator.clipboard.writeText(window.location.href)
    }
    setSharedPost(null)
    announce(`${action}. Demo complete.`)
  }

  return (
    <main className="explore-shell">
      <section className="explore-page" aria-label="ClosetIQ Explore">
        <div className="explore-content">
          <header className="explore-header">
            <div>
              <p>EXPLORE / COMMUNITY</p>
              <h1>Style in the wild.</h1>
            </div>
            <div className="notification-wrap">
              <button
                aria-expanded={notificationsOpen}
                aria-label="Open notifications"
                className="notification-button"
                onClick={() => setNotificationsOpen((open) => !open)}
                type="button"
              >
                <Icon name="bell" />
                {!notificationsRead && <span className="unread-badge">3</span>}
              </button>
              {notificationsOpen && (
                <aside className="notification-panel">
                  <div className="notification-heading">
                    <strong>Notifications</strong>
                    <button
                      onClick={() => setNotificationsRead(true)}
                      type="button"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="notification-item">
                    {!notificationsRead && <span className="notification-mark" />}
                    <p>
                      <strong>Mara</strong> liked your saved look.
                      <small>12m</small>
                    </p>
                  </div>
                  <div className="notification-item">
                    {!notificationsRead && <span className="notification-mark" />}
                    <p>
                      Your <strong>Soft Tailoring</strong> outfit was saved 8
                      times.
                      <small>1h</small>
                    </p>
                  </div>
                  <div className="notification-item">
                    {!notificationsRead && <span className="notification-mark" />}
                    <p>
                      <strong>@juneincolour</strong> started following you.
                      <small>Yesterday</small>
                    </p>
                  </div>
                </aside>
              )}
            </div>
          </header>

          <div className="feed-toolbar">
            <div className="feed-tabs" role="tablist">
              {(["Following", "Popular"] as FeedTab[]).map((item) => (
                <button
                  aria-selected={tab === item}
                  className={tab === item ? "active" : ""}
                  key={item}
                  onClick={() => setTab(item)}
                  role="tab"
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              aria-expanded={filtersOpen}
              className={
                occasion || weatherFilter
                  ? "filter-trigger active"
                  : "filter-trigger"
              }
              onClick={() => setFiltersOpen((open) => !open)}
              type="button"
            >
              <Icon name="sliders" />
              Filter
              {(occasion || weatherFilter) && (
                <span>{Number(Boolean(occasion)) + Number(Boolean(weatherFilter))}</span>
              )}
            </button>
          </div>

          {filtersOpen && (
            <section className="filter-panel" aria-label="Feed filters">
              <div className="filter-panel-top">
                <strong>Refine your feed</strong>
                {(occasion || weatherFilter) && (
                  <button onClick={clearFilters} type="button">
                    Clear filters
                  </button>
                )}
              </div>
              <p>OCCASION</p>
              <div className="filter-options">
                {occasions.map(([label, emoji]) => (
                  <button
                    aria-pressed={occasion === label}
                    className={occasion === label ? "active" : ""}
                    key={label}
                    onClick={() =>
                      setOccasion((current) => (current === label ? "" : label))
                    }
                    type="button"
                  >
                    <span>{emoji}</span> {label}
                  </button>
                ))}
              </div>
              <p>WEATHER</p>
              <div className="filter-options">
                {weather.map(([label, emoji]) => (
                  <button
                    aria-pressed={weatherFilter === label}
                    className={weatherFilter === label ? "active" : ""}
                    key={label}
                    onClick={() =>
                      setWeatherFilter((current) =>
                        current === label ? "" : label,
                      )
                    }
                    type="button"
                  >
                    <span>{emoji}</span> {label}
                  </button>
                ))}
              </div>
            </section>
          )}

          {(occasion || weatherFilter) && (
            <div className="active-filter-summary">
              <span>
                Showing {visiblePosts.length} look
                {visiblePosts.length === 1 ? "" : "s"}
              </span>
              <button onClick={clearFilters} type="button">
                Clear filters
              </button>
            </div>
          )}

          <div className="social-feed">
            {visiblePosts.map((post) => {
              const isLiked = liked.has(post.id)
              const isSaved = saved.has(post.id)
              const isFollowed = followed.has(post.id)
              const tags = [post.occasion, post.weather, post.extraTag].filter(
                Boolean,
              ) as string[]
              return (
                <article className="feed-post" key={post.id}>
                  <header className="post-creator">
                    <span className={`creator-avatar ${post.avatarTone}`}>
                      {post.initials}
                    </span>
                    <div>
                      <strong>{post.name}</strong>
                      <span>
                        {post.handle} · {post.time}
                      </span>
                    </div>
                    {tab === "Popular" && (
                      <button
                        className={isFollowed ? "following" : ""}
                        onClick={() => toggleSet(setFollowed, post.id)}
                        type="button"
                      >
                        {isFollowed ? "Following" : "Follow"}
                      </button>
                    )}
                  </header>
                  <div className="post-image-wrap">
                    <img
                      alt={post.imageAlt}
                      className="post-image"
                      loading="lazy"
                      src={post.image}
                    />
                    <span className="look-number">
                      LOOK {String(posts.indexOf(post) + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="post-body">
                    <div className="post-actions">
                      <button
                        aria-label={isLiked ? "Unlike outfit" : "Like outfit"}
                        aria-pressed={isLiked}
                        className={isLiked ? "liked" : ""}
                        onClick={() => toggleSet(setLiked, post.id)}
                        type="button"
                      >
                        <Icon filled={isLiked} name="heart" />
                        <span>{post.likes + (isLiked ? 1 : 0)}</span>
                      </button>
                      <button
                        aria-label="Share outfit"
                        onClick={() => setSharedPost(post)}
                        type="button"
                      >
                        <Icon name="share" />
                      </button>
                      <button
                        aria-label={
                          isSaved ? "Remove saved outfit" : "Save outfit"
                        }
                        aria-pressed={isSaved}
                        className={`bookmark-action ${isSaved ? "saved" : ""}`}
                        onClick={() => {
                          toggleSet(setSaved, post.id)
                          announce(
                            isSaved
                              ? "Removed from inspiration."
                              : "Saved for inspiration.",
                          )
                        }}
                        type="button"
                      >
                        <Icon filled={isSaved} name="bookmark" />
                      </button>
                    </div>
                    <h2>{post.outfit}</h2>
                    <p>{post.caption}</p>
                    <div className="post-tags">
                      {tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => applyTag(post, tag)}
                          type="button"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </article>
              )
            })}
            {visiblePosts.length === 0 && (
              <div className="empty-feed">
                <span>NO LOOKS FOUND</span>
                <h2>A rare combination.</h2>
                <p>Try clearing a filter to see more from the community.</p>
                <button onClick={clearFilters} type="button">
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>

        <nav className="explore-bottom-nav" aria-label="Primary navigation">
          {[
            { label: "Home" as NavItem, icon: "home" },
            { label: "Closet" as NavItem, icon: "hanger" },
            { label: "Build" as NavItem, icon: "layers" },
            { label: "Explore" as NavItem, icon: "compass" },
            { label: "Profile" as NavItem, icon: "user" },
          ].map((item) => (
            <button
              aria-current={item.label === "Explore" ? "page" : undefined}
              className={`${item.label === "Explore" ? "active " : ""}${
                item.label === "Build" ? "build-nav" : ""
              }`}
              key={item.label}
              onClick={() => onNavigate?.(item.label)}
              type="button"
            >
              <span className="explore-nav-icon">
                <Icon name={item.icon} />
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <p
          aria-live="polite"
          className={toast ? "explore-toast visible" : "explore-toast"}
        >
          {toast}
        </p>

        {sharedPost && (
          <div
            className="share-backdrop"
            onClick={() => setSharedPost(null)}
            role="presentation"
          >
            <section
              aria-labelledby="share-title"
              aria-modal="true"
              className="share-modal"
              onClick={(event) => event.stopPropagation()}
              role="dialog"
            >
              <button
                aria-label="Close share menu"
                className="share-close"
                onClick={() => setSharedPost(null)}
                type="button"
              >
                <Icon name="close" />
              </button>
              <span>SHARE THE LOOK</span>
              <h2 id="share-title">{sharedPost.outfit}</h2>
              <p>Pass along a little inspiration.</p>
              <div className="share-options">
                <button onClick={() => shareAction("Link copied")} type="button">
                  <span><Icon name="link" /></span>
                  <strong>Copy Link</strong>
                  <small>Ready to paste anywhere</small>
                </button>
                <button
                  onClick={() => shareAction("Sent to a friend")}
                  type="button"
                >
                  <span><Icon name="send" /></span>
                  <strong>Send to Friend</strong>
                  <small>Shared inside ClosetIQ</small>
                </button>
                <button
                  onClick={() => shareAction("External share opened")}
                  type="button"
                >
                  <span><Icon name="external" /></span>
                  <strong>Share Externally</strong>
                  <small>Open your device share menu</small>
                </button>
              </div>
            </section>
          </div>
        )}
      </section>
    </main>
  )
}
