import { useEffect, useMemo, useRef, useState } from "react"
import type { ChangeEvent, ReactNode } from "react"
import "../styles/closet.css"

type NavItem = "Home" | "Closet" | "Build" | "Explore" | "Profile"
type Occasion = "All" | "Everyday" | "Work" | "Evening" | "Weekend"

type ClothingItem = {
  id: string
  name: string
  category: string
  color: string
  image: string
}

type Outfit = {
  id: string
  name: string
  occasion: Exclude<Occasion, "All">
  description: string
  items: ClothingItem[]
}

type ClosetPageProps = {
  onNavigate?: (destination: NavItem) => void
  onCreateOutfit?: () => void
}

type IconProps = {
  name: string
  filled?: boolean
  className?: string
}

const catalog: Record<string, ClothingItem> = {
  oxford: {
    id: "oxford",
    name: "Cloud Oxford Shirt",
    category: "Top",
    color: "Soft white",
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=600&q=86",
  },
  trousers: {
    id: "trousers",
    name: "Tailored Stone Trouser",
    category: "Bottom",
    color: "Warm stone",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=86",
  },
  sneakers: {
    id: "sneakers",
    name: "Leather Court Sneaker",
    category: "Shoes",
    color: "Chalk",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=86",
  },
  blazer: {
    id: "blazer",
    name: "Soft Structure Blazer",
    category: "Outerwear",
    color: "Oat",
    image:
      "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=600&q=86",
  },
  denim: {
    id: "denim",
    name: "Straight Leg Denim",
    category: "Bottom",
    color: "Washed indigo",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=86",
  },
  knit: {
    id: "knit",
    name: "Fine Merino Knit",
    category: "Top",
    color: "Sage",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=86",
  },
  loafers: {
    id: "loafers",
    name: "Penny Loafer",
    category: "Shoes",
    color: "Espresso",
    image:
      "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=600&q=86",
  },
  trench: {
    id: "trench",
    name: "Heritage Trench",
    category: "Outerwear",
    color: "Sand",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=86",
  },
  dress: {
    id: "dress",
    name: "Column Midi Dress",
    category: "Dress",
    color: "Ink",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=86",
  },
  heels: {
    id: "heels",
    name: "Slingback Heel",
    category: "Shoes",
    color: "Black",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=86",
  },
  bag: {
    id: "bag",
    name: "East–West Bag",
    category: "Accessory",
    color: "Chestnut",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=86",
  },
  tee: {
    id: "tee",
    name: "Essential Crew Tee",
    category: "Top",
    color: "Ivory",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=86",
  },
  skirt: {
    id: "skirt",
    name: "Bias Cut Midi Skirt",
    category: "Bottom",
    color: "Olive",
    image:
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=600&q=86",
  },
  boots: {
    id: "boots",
    name: "Square Toe Boot",
    category: "Shoes",
    color: "Dark brown",
    image:
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=600&q=86",
  },
  cardigan: {
    id: "cardigan",
    name: "Brushed Cardigan",
    category: "Knitwear",
    color: "Heather grey",
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=86",
  },
  sunglasses: {
    id: "sunglasses",
    name: "Slim Oval Sunglasses",
    category: "Accessory",
    color: "Tortoiseshell",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=86",
  },
}

const outfits: Outfit[] = [
  {
    id: "quiet-luxury",
    name: "Quiet Luxury",
    occasion: "Work",
    description:
      "Clean lines and tonal layers bring ease to a polished weekday uniform.",
    items: [catalog.oxford, catalog.trousers, catalog.blazer, catalog.loafers],
  },
  {
    id: "sunday-soft",
    name: "Sunday Soft",
    occasion: "Weekend",
    description:
      "An unhurried combination of lived-in denim, soft knitwear, and crisp sneakers.",
    items: [catalog.tee, catalog.denim, catalog.cardigan, catalog.sneakers],
  },
  {
    id: "after-dark",
    name: "After Dark",
    occasion: "Evening",
    description:
      "A precise black column softened with warm leather and a subtle point of shine.",
    items: [catalog.dress, catalog.heels, catalog.bag, catalog.sunglasses],
  },
  {
    id: "museum-morning",
    name: "Museum Morning",
    occasion: "Weekend",
    description:
      "Thoughtful proportions for a slow morning of galleries, coffee, and walking.",
    items: [catalog.knit, catalog.skirt, catalog.trench, catalog.loafers],
  },
  {
    id: "desk-to-dinner",
    name: "Desk to Dinner",
    occasion: "Work",
    description:
      "A composed foundation that transitions neatly beyond the last meeting.",
    items: [catalog.oxford, catalog.skirt, catalog.blazer, catalog.heels],
  },
  {
    id: "city-stroll",
    name: "City Stroll",
    occasion: "Everyday",
    description:
      "Light layers and grounded neutrals designed for wherever the day wanders.",
    items: [catalog.tee, catalog.denim, catalog.trench, catalog.sneakers],
  },
  {
    id: "tonal-study",
    name: "Tonal Study",
    occasion: "Everyday",
    description:
      "A quiet study in sage, stone, and cream with texture doing the talking.",
    items: [catalog.knit, catalog.trousers, catalog.sneakers],
  },
  {
    id: "soft-structure",
    name: "Soft Structure",
    occasion: "Evening",
    description:
      "Relaxed tailoring balanced by a fluid skirt and strong leather accessories.",
    items: [
      catalog.tee,
      catalog.skirt,
      catalog.blazer,
      catalog.boots,
      catalog.bag,
    ],
  },
]

const navItems: {
  label: NavItem
  icon: string
}[] = [
  { label: "Home", icon: "home" },
  { label: "Closet", icon: "hanger" },
  { label: "Build", icon: "layers" },
  { label: "Explore", icon: "compass" },
  { label: "Profile", icon: "user" },
]

function Icon({ name, filled = false, className = "" }: IconProps) {
  const paths: Record<string, ReactNode> = {
    search: (
      <>
        <circle cx="10.8" cy="10.8" r="6.5" />
        <path d="m16 16 4.2 4.2" />
      </>
    ),
    heart: (
      <path
        d="M20.5 8.8c0 5.1-8.5 10-8.5 10s-8.5-4.9-8.5-10a4.6 4.6 0 0 1 8.5-2.5 4.6 4.6 0 0 1 8.5 2.5Z"
        fill={filled ? "currentColor" : "none"}
      />
    ),
    plus: <path d="M12 4.5v15M4.5 12h15" />,
    upload: (
      <>
        <path d="M12 16V4M7.5 8.5 12 4l4.5 4.5" />
        <path d="M5 14.5v4.2c0 .7.6 1.3 1.3 1.3h11.4c.7 0 1.3-.6 1.3-1.3v-4.2" />
      </>
    ),
    close: <path d="m6 6 12 12M18 6 6 18" />,
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

function OutfitCover({
  outfit,
  customCover,
  large = false,
}: {
  outfit: Outfit
  customCover?: string
  large?: boolean
}) {
  if (customCover) {
    return (
      <div className={`closet-cover uploaded${large ? " large" : ""}`}>
        <img alt={`Custom cover for ${outfit.name}`} src={customCover} />
        <span>Worn by you</span>
      </div>
    )
  }

  return (
    <div className={`closet-cover collage${large ? " large" : ""}`}>
      {outfit.items.slice(0, 4).map((item) => (
        <span className="collage-piece" key={item.id}>
          <img alt="" src={item.image} />
        </span>
      ))}
      <span className="collage-count">{outfit.items.length} pieces</span>
    </div>
  )
}

function OutfitCard({
  outfit,
  favorite,
  selected,
  customCover,
  onFavorite,
  onSelect,
}: {
  outfit: Outfit
  favorite: boolean
  selected: boolean
  customCover?: string
  onFavorite: () => void
  onSelect: () => void
}) {
  return (
    <article className={`closet-outfit-card${selected ? " selected" : ""}`}>
      <button
        aria-expanded={selected}
        className="outfit-card-main"
        onClick={onSelect}
        type="button"
      >
        <OutfitCover customCover={customCover} outfit={outfit} />
        <span className="outfit-card-copy">
          <strong>{outfit.name}</strong>
          <span>{outfit.occasion}</span>
          <small>{outfit.items.length} pieces</small>
        </span>
      </button>
      <button
        aria-label={`${favorite ? "Remove" : "Add"} ${outfit.name} ${
          favorite ? "from" : "to"
        } favorites`}
        aria-pressed={favorite}
        className={`favorite-button${favorite ? " active" : ""}`}
        onClick={onFavorite}
        type="button"
      >
        <Icon filled={favorite} name="heart" />
      </button>
    </article>
  )
}

function OutfitDetails({
  outfit,
  customCover,
  onClose,
  onCoverChange,
  onResetCover,
}: {
  outfit: Outfit
  customCover?: string
  onClose: () => void
  onCoverChange: (event: ChangeEvent<HTMLInputElement>) => void
  onResetCover: () => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <section
      aria-label={`${outfit.name} details`}
      className="outfit-detail-panel"
    >
      <div className="detail-topline">
        <span>THE LOOK / {String(outfit.items.length).padStart(2, "0")}</span>
        <button
          aria-label="Close outfit details"
          className="detail-close"
          onClick={onClose}
          type="button"
        >
          <Icon name="close" />
        </button>
      </div>

      <OutfitCover customCover={customCover} large outfit={outfit} />

      <div className="detail-heading">
        <div>
          <p>{outfit.occasion}</p>
          <h2>{outfit.name}</h2>
        </div>
        <button
          className="edit-cover-button"
          onClick={() => inputRef.current?.click()}
          type="button"
        >
          <Icon name="upload" />
          Edit cover
        </button>
        <input
          ref={inputRef}
          accept="image/*"
          className="cover-file-input"
          onChange={onCoverChange}
          type="file"
        />
      </div>

      <p className="detail-description">{outfit.description}</p>

      {customCover && (
        <button
          className="reset-cover-button"
          onClick={onResetCover}
          type="button"
        >
          Use clothing collage
        </button>
      )}

      <div className="pieces-heading">
        <h3>Pieces in this look</h3>
        <span>{outfit.items.length} total</span>
      </div>
      <div className="piece-list">
        {outfit.items.map((item, index) => (
          <article className="piece-row" key={item.id}>
            <span className="piece-index">
              {String(index + 1).padStart(2, "0")}
            </span>
            <img alt={item.name} src={item.image} />
            <span className="piece-copy">
              <strong>{item.name}</strong>
              <small>{item.category}</small>
            </span>
            <span className="piece-color">{item.color}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

export default function ClosetPage({
  onNavigate,
  onCreateOutfit,
}: ClosetPageProps) {
  const [query, setQuery] = useState("")
  const [occasion, setOccasion] = useState<Occasion>("All")
  const [favorites, setFavorites] = useState<Set<string>>(
    () => new Set(["quiet-luxury", "museum-morning"]),
  )
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>("quiet-luxury")
  const [customCovers, setCustomCovers] = useState<Record<string, string>>({})
  const [notice, setNotice] = useState("")
  const customCoverUrls = useRef<Record<string, string>>({})

  const filteredOutfits = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return outfits.filter((outfit) => {
      const matchesOccasion = occasion === "All" || outfit.occasion === occasion
      const matchesFavorite = !favoritesOnly || favorites.has(outfit.id)
      const searchable = [
        outfit.name,
        outfit.occasion,
        ...outfit.items.flatMap((item) => [
          item.name,
          item.category,
          item.color,
        ]),
      ]
        .join(" ")
        .toLowerCase()

      return (
        matchesOccasion &&
        matchesFavorite &&
        (!normalizedQuery || searchable.includes(normalizedQuery))
      )
    })
  }, [favorites, favoritesOnly, occasion, query])

  const rows = useMemo(() => {
    const nextRows: Outfit[][] = []
    for (let index = 0; index < filteredOutfits.length; index += 2) {
      nextRows.push(filteredOutfits.slice(index, index + 2))
    }
    return nextRows
  }, [filteredOutfits])

  useEffect(() => {
    if (
      selectedId &&
      !filteredOutfits.some((outfit) => outfit.id === selectedId)
    ) {
      setSelectedId(null)
    }
  }, [filteredOutfits, selectedId])

  useEffect(() => {
    customCoverUrls.current = customCovers
  }, [customCovers])

  useEffect(
    () => () => {
      Object.values(customCoverUrls.current).forEach((url) =>
        URL.revokeObjectURL(url),
      )
    },
    [],
  )

  const announce = (message: string) => {
    setNotice(message)
    window.setTimeout(() => setNotice(""), 2200)
  }

  const toggleFavorite = (outfit: Outfit) => {
    setFavorites((current) => {
      const next = new Set(current)
      if (next.has(outfit.id)) {
        next.delete(outfit.id)
        announce(`${outfit.name} removed from favorites.`)
      } else {
        next.add(outfit.id)
        announce(`${outfit.name} added to favorites.`)
      }
      return next
    })
  }

  const updateCover = (
    outfit: Outfit,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    const nextUrl = URL.createObjectURL(file)
    setCustomCovers((current) => {
      if (current[outfit.id]) URL.revokeObjectURL(current[outfit.id])
      return { ...current, [outfit.id]: nextUrl }
    })
    event.target.value = ""
    announce(`${outfit.name} cover updated.`)
  }

  const resetCover = (outfit: Outfit) => {
    setCustomCovers((current) => {
      const next = { ...current }
      if (next[outfit.id]) URL.revokeObjectURL(next[outfit.id])
      delete next[outfit.id]
      return next
    })
    announce("Clothing collage restored.")
  }

  return (
    <main className="closet-page-shell">
      <section className="closet-page" aria-label="Digital closet">
        <div className="closet-page-content">
          <header className="closet-page-header">
            <div className="closet-title-block">
              <p>CLOSETIQ / WARDROBE</p>
              <h1>My Closet</h1>
              <span>Your wardrobe, in perspective</span>
            </div>
            <button
              className="create-outfit-button"
              onClick={() => {
                onCreateOutfit?.()
                announce("Outfit builder opened.")
              }}
              type="button"
            >
              <Icon name="plus" />
              <span>Create</span>
            </button>
          </header>

          <section className="closet-tools" aria-label="Filter outfits">
            <label className="closet-search">
              <Icon name="search" />
              <input
                aria-label="Search outfits and pieces"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search your looks"
                type="search"
                value={query}
              />
              {query && (
                <button
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                  type="button"
                >
                  <Icon name="close" />
                </button>
              )}
            </label>

            <div className="filter-scroll">
              {([
                "All",
                "Everyday",
                "Work",
                "Evening",
                "Weekend",
              ] as Occasion[]).map((filter) => (
                <button
                  aria-pressed={occasion === filter}
                  className={occasion === filter ? "active" : ""}
                  key={filter}
                  onClick={() => setOccasion(filter)}
                  type="button"
                >
                  {filter}
                </button>
              ))}
              <button
                aria-pressed={favoritesOnly}
                className={`favorites-filter${favoritesOnly ? " active" : ""}`}
                onClick={() => setFavoritesOnly((current) => !current)}
                type="button"
              >
                <Icon filled={favoritesOnly} name="heart" />
                Saved
              </button>
            </div>
          </section>

          <div className="closet-gallery-heading">
            <p>
              <strong>{filteredOutfits.length}</strong>{" "}
              {filteredOutfits.length === 1 ? "look" : "looks"}
            </p>
            <span>CURATED OUTFITS</span>
          </div>

          {filteredOutfits.length ? (
            <div className="closet-gallery">
              {rows.map((row) => {
                const selectedOutfit = row.find(
                  (outfit) => outfit.id === selectedId,
                )
                return (
                  <div className="closet-gallery-row" key={row[0].id}>
                    <div className="closet-card-grid">
                      {row.map((outfit) => (
                        <OutfitCard
                          customCover={customCovers[outfit.id]}
                          favorite={favorites.has(outfit.id)}
                          key={outfit.id}
                          onFavorite={() => toggleFavorite(outfit)}
                          onSelect={() =>
                            setSelectedId((current) =>
                              current === outfit.id ? null : outfit.id,
                            )
                          }
                          outfit={outfit}
                          selected={selectedId === outfit.id}
                        />
                      ))}
                    </div>
                    {selectedOutfit && (
                      <OutfitDetails
                        customCover={customCovers[selectedOutfit.id]}
                        onClose={() => setSelectedId(null)}
                        onCoverChange={(event) =>
                          updateCover(selectedOutfit, event)
                        }
                        onResetCover={() => resetCover(selectedOutfit)}
                        outfit={selectedOutfit}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="closet-empty-state">
              <span>00 / FOUND</span>
              <h2>No looks in view.</h2>
              <p>Try another occasion or clear your search.</p>
              <button
                onClick={() => {
                  setQuery("")
                  setOccasion("All")
                  setFavoritesOnly(false)
                }}
                type="button"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        <nav className="closet-bottom-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <button
              aria-current={item.label === "Closet" ? "page" : undefined}
              className={`${item.label === "Closet" ? "active " : ""}${
                item.label === "Build" ? "build-nav" : ""
              }`}
              key={item.label}
              onClick={() => onNavigate?.(item.label)}
              type="button"
            >
              <span className="closet-nav-icon">
                <Icon name={item.icon} />
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <p
          aria-live="polite"
          className={`closet-toast${notice ? " visible" : ""}`}
        >
          {notice}
        </p>
      </section>
    </main>
  )
}
