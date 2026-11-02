import { useState } from "react"
import type { ReactNode } from "react"
import "../styles/profile.css"

type NavItem = "Home" | "Closet" | "Build" | "Explore" | "Profile"
type GalleryTab = "posts" | "saved"
type ListType = "followers" | "following"

type ProfilePageProps = {
  onNavigate?: (destination: NavItem) => void
}

type Outfit = {
  id: string
  title: string
  image: string
  imageAlt: string
  creator: string
  handle: string
  occasion: string
  weather: string
  likes: number
  saves: number
  note: string
}

const myPosts: Outfit[] = [
  {
    id: "soft-structure",
    title: "Soft Structure",
    image:
      "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=800&q=88",
    imageAlt: "Woman wearing an oversized brown coat in the city",
    creator: "Amara Kim",
    handle: "@amarakim",
    occasion: "Work",
    weather: "Cool · 16°C",
    likes: 428,
    saves: 76,
    note: "A long coat, clean lines, and just enough softness for a gallery day.",
  },
  {
    id: "quiet-monday",
    title: "Quiet Monday",
    image:
      "https://images.unsplash.com/photo-1618333452884-5c8d211ed2ad?auto=format&fit=crop&w=800&q=88",
    imageAlt: "Woman in a brown coat and grey trousers on white stairs",
    creator: "Amara Kim",
    handle: "@amarakim",
    occasion: "Everyday",
    weather: "Mild · 19°C",
    likes: 306,
    saves: 51,
    note: "Neutral layers for slow starts and a full afternoon in the studio.",
  },
  {
    id: "city-lines",
    title: "City Lines",
    image:
      "https://images.unsplash.com/photo-1692180142575-c31fcd106b5b?auto=format&fit=crop&w=800&q=88",
    imageAlt: "Woman in a dark editorial outfit leaning in the city",
    creator: "Amara Kim",
    handle: "@amarakim",
    occasion: "Dinner",
    weather: "Warm · 22°C",
    likes: 612,
    saves: 98,
    note: "Sharp black, a relaxed silhouette, and silver details after five.",
  },
  {
    id: "after-rain",
    title: "After Rain",
    image:
      "https://images.unsplash.com/photo-1618244985759-a8a1dc26bce3?auto=format&fit=crop&w=800&q=88",
    imageAlt: "Woman in a warm coat walking along a city pavement",
    creator: "Amara Kim",
    handle: "@amarakim",
    occasion: "Weekend",
    weather: "Rainy · 14°C",
    likes: 271,
    saves: 42,
    note: "The reliable trench, reworked with a tonal knit and practical shoes.",
  },
  {
    id: "stone-study",
    title: "Stone Study",
    image:
      "https://images.unsplash.com/photo-1681860317538-12f5b396c1bf?auto=format&fit=crop&w=800&q=88",
    imageAlt: "Woman in neutral fashion standing outside a tall building",
    creator: "Amara Kim",
    handle: "@amarakim",
    occasion: "Coffee",
    weather: "Sunny · 20°C",
    likes: 354,
    saves: 63,
    note: "One palette, three textures. The easiest kind of weekend uniform.",
  },
  {
    id: "doorway-notes",
    title: "Doorway Notes",
    image:
      "https://images.unsplash.com/photo-1618244965061-1d27b208d6e8?auto=format&fit=crop&w=800&q=88",
    imageAlt: "Woman in a brown coat beside a dark wooden doorway",
    creator: "Amara Kim",
    handle: "@amarakim",
    occasion: "City walk",
    weather: "Cool · 17°C",
    likes: 487,
    saves: 81,
    note: "A borrowed-from-the-archives shape with modern proportions.",
  },
]

const savedPosts: Outfit[] = [
  {
    id: "silver-hour",
    title: "Silver Hour",
    image:
      "https://images.unsplash.com/photo-1584216338898-f34d78201414?auto=format&fit=crop&w=800&q=88",
    imageAlt: "Woman wearing a grey coat in an urban setting",
    creator: "Mara Ellis",
    handle: "@marae",
    occasion: "Work",
    weather: "Cold · 10°C",
    likes: 846,
    saves: 212,
    note: "A lesson in balancing oversized tailoring with a narrow base.",
  },
  {
    id: "weekend-white",
    title: "Weekend White",
    image:
      "https://images.unsplash.com/photo-1780488704744-0e64cd66239e?auto=format&fit=crop&w=800&q=88",
    imageAlt: "Woman in a light jacket and brown trousers sitting on a ledge",
    creator: "Sasha Kim",
    handle: "@sashak",
    occasion: "Weekend",
    weather: "Warm · 21°C",
    likes: 1204,
    saves: 334,
    note: "Cream layers and warm brown trousers, saved for the next sunny day.",
  },
  {
    id: "street-poetry",
    title: "Street Poetry",
    image:
      "https://images.unsplash.com/photo-1676716184677-02c58a869b98?auto=format&fit=crop&w=800&q=88",
    imageAlt: "Woman carrying a brown purse on a city street",
    creator: "Lina Park",
    handle: "@linap",
    occasion: "Dinner",
    weather: "Mild · 18°C",
    likes: 954,
    saves: 267,
    note: "A compact bag and a long line make this feel instantly considered.",
  },
  {
    id: "soft-volume",
    title: "Soft Volume",
    image:
      "https://images.unsplash.com/photo-1604522655203-b60144616d5b?auto=format&fit=crop&w=800&q=88",
    imageAlt: "Woman in a long brown coat standing on a sunlit sidewalk",
    creator: "Noa Vale",
    handle: "@noavale",
    occasion: "Everyday",
    weather: "Cool · 15°C",
    likes: 683,
    saves: 179,
    note: "Volume without weight—the proportion note I want to remember.",
  },
]

const people = {
  followers: [
    ["Mara Ellis", "@marae", "ME"],
    ["Lina Park", "@linap", "LP"],
    ["Noah Williams", "@noahwears", "NW"],
    ["Sasha Kim", "@sashak", "SK"],
    ["Imani Brooks", "@imanib", "IB"],
  ],
  following: [
    ["Milo Chen", "@milo.archive", "MC"],
    ["June Okafor", "@juneincolour", "JO"],
    ["Elena Rossi", "@elenar", "ER"],
    ["Theo James", "@theoj", "TJ"],
  ],
}

const navItems: { label: NavItem; icon: string }[] = [
  { label: "Home", icon: "home" },
  { label: "Closet", icon: "hanger" },
  { label: "Build", icon: "layers" },
  { label: "Explore", icon: "compass" },
  { label: "Profile", icon: "user" },
]

function Icon({ name }: { name: string }) {
  const paths: Record<string, ReactNode> = {
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    heart: <path d="M20.8 4.7a5.5 5.5 0 0 0-7.8 0L12 5.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.4 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    bookmark: <path d="M6.5 4.7c0-.9.7-1.6 1.6-1.6h7.8c.9 0 1.6.7 1.6 1.6v15.1L12 16.4l-5.5 3.4V4.7Z" />,
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

export default function ProfilePage({ onNavigate }: ProfilePageProps) {
  const [tab, setTab] = useState<GalleryTab>("posts")
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null)
  const [openList, setOpenList] = useState<ListType | null>(null)
  const [composerOpen, setComposerOpen] = useState(false)
  const [toast, setToast] = useState("")

  const outfits = tab === "posts" ? myPosts : savedPosts
  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(""), 2200)
  }

  return (
    <main className="profile-shell">
      <section className="profile-page" aria-label="ClosetIQ profile">
        <div className="profile-content">
          <header className="profile-topbar">
            <p>CLOSETIQ / PROFILE</p>
            <button
              aria-label="Open settings"
              className="profile-icon-button"
              onClick={() => notify("Profile settings opened.")}
              type="button"
            >
              <Icon name="settings" />
            </button>
          </header>

          <section className="profile-identity" aria-labelledby="profile-name">
            <div className="portrait-frame">
              <img
                alt="Amara Kim in an editorial fashion portrait"
                src="https://images.unsplash.com/photo-1674932668403-33398b81c92f?auto=format&fit=crop&w=600&q=90"
              />
              <span>THE EDIT / 024</span>
            </div>
            <h1 id="profile-name">Amara Kim</h1>
            <p className="profile-handle">@amarakim</p>
            <p className="profile-bio">
              Quiet tailoring, thoughtful layers, and outfits for real life.
            </p>

            <div className="profile-counts" aria-label="Profile connections">
              <button onClick={() => setOpenList("followers")} type="button">
                <strong>2.8k</strong>
                <span>Followers</span>
              </button>
              <i aria-hidden="true" />
              <button onClick={() => setOpenList("following")} type="button">
                <strong>184</strong>
                <span>Following</span>
              </button>
            </div>

            <button
              className="edit-profile-button"
              onClick={() => notify("Edit profile opened.")}
              type="button"
            >
              Edit Profile
            </button>
          </section>

          <section className="profile-gallery" aria-labelledby="gallery-title">
            <div className="gallery-heading">
              <div>
                <span>STYLE ARCHIVE</span>
                <h2 id="gallery-title">
                  {tab === "posts" ? "My wardrobe, worn." : "Notes for later."}
                </h2>
              </div>
              <button
                aria-label="Create a new outfit post"
                className="new-post-button"
                onClick={() => setComposerOpen(true)}
                type="button"
              >
                <Icon name="plus" />
              </button>
            </div>

            <div className="profile-tabs" role="tablist">
              <button
                aria-selected={tab === "posts"}
                className={tab === "posts" ? "active" : ""}
                onClick={() => setTab("posts")}
                role="tab"
                type="button"
              >
                My Posts <span>{myPosts.length}</span>
              </button>
              <button
                aria-selected={tab === "saved"}
                className={tab === "saved" ? "active" : ""}
                onClick={() => setTab("saved")}
                role="tab"
                type="button"
              >
                Saved Inspiration <span>{savedPosts.length}</span>
              </button>
            </div>

            <div className="outfit-grid">
              {outfits.map((outfit, index) => (
                <button
                  className="profile-outfit-card"
                  key={outfit.id}
                  onClick={() => setSelectedOutfit(outfit)}
                  type="button"
                >
                  <img alt={outfit.imageAlt} src={outfit.image} />
                  <span className="outfit-number">
                    / {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="outfit-card-copy">
                    <strong>{outfit.title}</strong>
                    <small>{outfit.occasion}</small>
                  </span>
                </button>
              ))}
            </div>
          </section>
        </div>

        <nav className="profile-bottom-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <button
              aria-current={item.label === "Profile" ? "page" : undefined}
              className={`${item.label === "Profile" ? "active " : ""}${
                item.label === "Build" ? "build-nav" : ""
              }`}
              key={item.label}
              onClick={() => onNavigate?.(item.label)}
              type="button"
            >
              <span className="profile-nav-icon">
                <Icon name={item.icon} />
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <p
          aria-live="polite"
          className={toast ? "profile-toast visible" : "profile-toast"}
        >
          {toast}
        </p>

        {selectedOutfit && (
          <div className="profile-modal-backdrop" role="presentation">
            <article
              aria-labelledby="outfit-detail-title"
              aria-modal="true"
              className="outfit-detail-modal"
              role="dialog"
            >
              <button
                aria-label="Close outfit details"
                className="modal-close-button"
                onClick={() => setSelectedOutfit(null)}
                type="button"
              >
                <Icon name="close" />
              </button>
              <img
                alt={selectedOutfit.imageAlt}
                className="detail-image"
                src={selectedOutfit.image}
              />
              <div className="detail-copy">
                <span>OUTFIT NOTES / {selectedOutfit.occasion.toUpperCase()}</span>
                <h2 id="outfit-detail-title">{selectedOutfit.title}</h2>
                <div className="detail-creator">
                  <b>AK</b>
                  <p>
                    <strong>{selectedOutfit.creator}</strong>
                    <small>{selectedOutfit.handle}</small>
                  </p>
                </div>
                <p className="detail-note">{selectedOutfit.note}</p>
                <div className="detail-tags">
                  <span>{selectedOutfit.occasion}</span>
                  <span>{selectedOutfit.weather}</span>
                </div>
                <div className="detail-engagement">
                  <p>
                    <Icon name="heart" />
                    <strong>{selectedOutfit.likes}</strong> appreciations
                  </p>
                  <p>
                    <Icon name="bookmark" />
                    <strong>{selectedOutfit.saves}</strong> saves
                  </p>
                </div>
              </div>
            </article>
          </div>
        )}

        {openList && (
          <div className="profile-modal-backdrop" role="presentation">
            <section
              aria-labelledby="people-title"
              aria-modal="true"
              className="people-modal"
              role="dialog"
            >
              <div className="people-modal-heading">
                <div>
                  <span>YOUR CIRCLE</span>
                  <h2 id="people-title">
                    {openList === "followers" ? "Followers" : "Following"}
                  </h2>
                </div>
                <button
                  aria-label="Close list"
                  className="modal-close-button inline"
                  onClick={() => setOpenList(null)}
                  type="button"
                >
                  <Icon name="close" />
                </button>
              </div>
              <div className="people-list">
                {people[openList].map(([name, handle, initials], index) => (
                  <div className="person-row" key={handle}>
                    <span>{initials}</span>
                    <p>
                      <strong>{name}</strong>
                      <small>{handle}</small>
                    </p>
                    <button
                      onClick={() =>
                        notify(index % 2 ? `Following ${name}.` : `${name} selected.`)
                      }
                      type="button"
                    >
                      {index % 2 ? "Follow" : "View"}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {composerOpen && (
          <div className="profile-modal-backdrop" role="presentation">
            <section
              aria-labelledby="composer-title"
              aria-modal="true"
              className="composer-modal"
              role="dialog"
            >
              <button
                aria-label="Close new post"
                className="modal-close-button"
                onClick={() => setComposerOpen(false)}
                type="button"
              >
                <Icon name="close" />
              </button>
              <span>NEW OUTFIT / 01</span>
              <h2 id="composer-title">Share today&apos;s look.</h2>
              <button className="photo-dropzone" type="button">
                <Icon name="plus" />
                <strong>Add outfit photo</strong>
                <small>Choose from your camera roll</small>
              </button>
              <div className="composer-preview">
                <p>Tag the moment</p>
                <div>
                  <button type="button">Everyday</button>
                  <button type="button">Work</button>
                  <button type="button">Dinner</button>
                  <button type="button">Weekend</button>
                </div>
              </div>
              <button
                className="publish-button"
                onClick={() => {
                  setComposerOpen(false)
                  notify("Your outfit draft is ready.")
                }}
                type="button"
              >
                Continue to caption
              </button>
            </section>
          </div>
        )}
      </section>
    </main>
  )
}
