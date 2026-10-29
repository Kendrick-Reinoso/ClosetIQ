import { FormEvent, ReactNode, useEffect, useRef, useState } from "react"
import "../styles/outfit-builder.css"

type NavItem = "Home" | "Closet" | "Build" | "Explore" | "Profile"
type Category =
  | "Hat"
  | "Base Top"
  | "Outer Layer"
  | "Bottoms"
  | "Shoes"
  | "Accessory"

type ClothingItem = {
  id: string
  name: string
  color: string
  image?: string
  category: Category
  optional?: boolean
}

type OutfitBuilderProps = {
  onNavigate?: (destination: NavItem) => void
}

const hats: ClothingItem[] = [
  { id: "hat-black-cap", name: "Black Baseball Cap", color: "Black", category: "Hat", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=86" },
  { id: "hat-cream-beanie", name: "Cream Beanie", color: "Cream", category: "Hat", image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=600&q=86" },
  { id: "hat-navy-dad", name: "Navy Dad Hat", color: "Navy", category: "Hat", image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=600&q=86" },
  { id: "hat-brown-bucket", name: "Brown Bucket Hat", color: "Brown", category: "Hat", image: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=600&q=86" },
  { id: "hat-none", name: "No Hat", color: "Optional", category: "Hat", optional: true },
]

const baseTops: ClothingItem[] = [
  { id: "top-white-tee", name: "White Oversized T-Shirt", color: "White", category: "Base Top", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=86" },
  { id: "top-black-tee", name: "Black Fitted T-Shirt", color: "Black", category: "Base Top", image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=600&q=86" },
  { id: "top-blue-oxford", name: "Light Blue Oxford Shirt", color: "Light blue", category: "Base Top", image: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=600&q=86" },
  { id: "top-cream-knit", name: "Cream Knit Sweater", color: "Cream", category: "Base Top", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=86" },
  { id: "top-grey-long", name: "Grey Long-Sleeve Shirt", color: "Heather grey", category: "Base Top", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=86" },
]

const outerLayers: ClothingItem[] = [
  { id: "layer-none", name: "No Outer Layer", color: "Optional", category: "Outer Layer", optional: true },
  { id: "layer-grey-hoodie", name: "Grey Zip-Up Hoodie", color: "Heather grey", category: "Outer Layer", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=86" },
  { id: "layer-black-bomber", name: "Black Bomber Jacket", color: "Black", category: "Outer Layer", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=86" },
  { id: "layer-brown-leather", name: "Brown Leather Jacket", color: "Chestnut", category: "Outer Layer", image: "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=600&q=86" },
  { id: "layer-beige-trench", name: "Beige Trench Coat", color: "Beige", category: "Outer Layer", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=86" },
  { id: "layer-navy-denim", name: "Navy Denim Jacket", color: "Dark indigo", category: "Outer Layer", image: "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?auto=format&fit=crop&w=600&q=86" },
]

const bottoms: ClothingItem[] = [
  { id: "bottom-black-jeans", name: "Black Straight-Leg Jeans", color: "Washed black", category: "Bottoms", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=86" },
  { id: "bottom-stone-trousers", name: "Stone Tailored Trousers", color: "Warm stone", category: "Bottoms", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=86" },
  { id: "bottom-light-denim", name: "Light-Wash Denim Jeans", color: "Light wash", category: "Bottoms", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=86" },
  { id: "bottom-olive-cargo", name: "Olive Cargo Pants", color: "Olive", category: "Bottoms", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=86" },
  { id: "bottom-navy-chinos", name: "Navy Relaxed Chinos", color: "Navy", category: "Bottoms", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=600&q=86" },
]

const shoes: ClothingItem[] = [
  { id: "shoe-white-leather", name: "White Leather Sneakers", color: "White", category: "Shoes", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=86" },
  { id: "shoe-black-loafer", name: "Black Loafers", color: "Black", category: "Shoes", image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=600&q=86" },
  { id: "shoe-brown-boots", name: "Brown Suede Boots", color: "Tobacco", category: "Shoes", image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=600&q=86" },
  { id: "shoe-grey-runner", name: "Grey Running Sneakers", color: "Grey", category: "Shoes", image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=600&q=86" },
  { id: "shoe-cream-canvas", name: "Cream Canvas Sneakers", color: "Natural", category: "Shoes", image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=600&q=86" },
]

const accessories: ClothingItem[] = [
  { id: "accessory-none", name: "No Accessory", color: "Optional", category: "Accessory", optional: true },
  { id: "accessory-scarf", name: "Soft Wool Scarf", color: "Oatmeal", category: "Accessory", image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=600&q=86" },
  { id: "accessory-sunglasses", name: "Slim Sunglasses", color: "Tortoiseshell", category: "Accessory", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=86" },
  { id: "accessory-watch", name: "Minimal Steel Watch", color: "Silver", category: "Accessory", image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=86" },
  { id: "accessory-necklace", name: "Fine Chain Necklace", color: "Gold", category: "Accessory", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=86" },
  { id: "accessory-crossbody", name: "Leather Crossbody Bag", color: "Espresso", category: "Accessory", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=86" },
]

const navItems: { label: NavItem; icon: string }[] = [
  { label: "Home", icon: "home" },
  { label: "Closet", icon: "hanger" },
  { label: "Build", icon: "layers" },
  { label: "Explore", icon: "compass" },
  { label: "Profile", icon: "user" },
]

function Icon({ name }: { name: string }) {
  const paths: Record<string, ReactNode> = {
    home: <><path d="m3.8 10.5 8.2-7 8.2 7" /><path d="M5.8 9.3v10h12.4v-10M9.6 19.3v-5.8h4.8v5.8" /></>,
    hanger: <><path d="M9.2 7.2c.1-2.1 1.2-3.4 3-3.4 1.6 0 2.8 1 2.8 2.5 0 1.2-.7 2-1.9 2.8-.7.4-1.1 1.1-1.1 1.9" /><path d="m12 11 8.2 5.9c1 .7.5 2.3-.8 2.3H4.6c-1.3 0-1.8-1.6-.8-2.3L12 11Z" /></>,
    layers: <><path d="m12 3.4 8.2 4.4L12 12.2 3.8 7.8 12 3.4Z" /><path d="m5.2 11.2-1.4.8 8.2 4.4 8.2-4.4-1.4-.8M5.2 15.5l-1.4.7 8.2 4.4 8.2-4.4-1.4-.7" /></>,
    compass: <><circle cx="12" cy="12" r="8.6" /><path d="m15.7 8.3-2.1 5.3-5.3 2.1 2.1-5.3 5.3-2.1Z" /></>,
    user: <><circle cx="12" cy="8.2" r="3.4" /><path d="M5.7 20c.4-3.1 2.9-5.3 6.3-5.3s5.9 2.2 6.3 5.3" /></>,
    shuffle: <><path d="M4 6h2.3c4.4 0 5 12 10 12H20M17 15l3 3-3 3M4 18h2.3C10.7 18 11.3 6 16.3 6H20M17 3l3 3-3 3" /></>,
    save: <><path d="M5 4h12l2 2v14H5Z" /><path d="M8 4v6h8V4M8 20v-6h8v6" /></>,
    arrow: <path d="m9 5 7 7-7 7" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    check: <path d="m5 12 4 4L19 6" />,
  }
  return <svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.65" viewBox="0 0 24 24">{paths[name]}</svg>
}

function Picker({
  title,
  items,
  selected,
  selectedIds,
  selectOnScroll = true,
  onSelect,
}: {
  title: string
  items: ClothingItem[]
  selected?: ClothingItem
  selectedIds?: string[]
  selectOnScroll?: boolean
  onSelect: (item: ClothingItem) => void
}) {
  const rail = useRef<HTMLDivElement>(null)
  const scrollTimer = useRef<number | undefined>(undefined)
  const scroll = (direction: number) => rail.current?.scrollBy({ left: direction * 210, behavior: "smooth" })

  useEffect(() => {
    if (!selectOnScroll || !selected) return
    const selectedCard = rail.current?.querySelector<HTMLElement>(
      `[data-item-id="${selected.id}"]`,
    )
    selectedCard?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
  }, [selectOnScroll, selected])

  const selectCenteredItem = () => {
    if (!selectOnScroll) return
    window.clearTimeout(scrollTimer.current)
    scrollTimer.current = window.setTimeout(() => {
      if (!rail.current) return
      const center = rail.current.getBoundingClientRect().left + rail.current.clientWidth / 2
      const cards = Array.from(rail.current.querySelectorAll<HTMLElement>(".piece-card"))
      const closest = cards.reduce((best, card) => {
        const bounds = card.getBoundingClientRect()
        const distance = Math.abs(bounds.left + bounds.width / 2 - center)
        return distance < best.distance ? { card, distance } : best
      }, { card: cards[0], distance: Number.POSITIVE_INFINITY })
      const item = items.find((option) => option.id === closest.card?.dataset.itemId)
      if (item && item.id !== selected?.id) onSelect(item)
    }, 90)
  }

  return (
    <section className="builder-picker" aria-label={`${title} options`}>
      <div className="picker-heading">
        <h2>{title}</h2>
        <div className="picker-arrows">
          <button aria-label={`Previous ${title}`} onClick={() => scroll(-1)} type="button"><Icon name="arrow" /></button>
          <button aria-label={`Next ${title}`} onClick={() => scroll(1)} type="button"><Icon name="arrow" /></button>
        </div>
      </div>
      <div className="picker-rail" onScroll={selectCenteredItem} ref={rail}>
        {items.map((item) => (
          <button aria-pressed={selectedIds ? selectedIds.includes(item.id) : selected?.id === item.id} className={`piece-card${selectedIds ? selectedIds.includes(item.id) ? " selected" : "" : selected?.id === item.id ? " selected" : ""}`} data-item-id={item.id} key={item.id} onClick={(event) => {
            onSelect(item)
            if (selectOnScroll) event.currentTarget.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
          }} type="button">
            <span className={`piece-card-image${item.optional ? " optional" : ""}`}>
              {item.image ? <img alt="" src={item.image} /> : <span>{item.category === "Hat" ? "No hat" : "No layer"}</span>}
              {(selectedIds ? selectedIds.includes(item.id) : selected?.id === item.id) && <span className="selected-mark"><Icon name="check" /></span>}
            </span>
            <strong>{item.name}</strong>
            <small>{item.color}</small>
          </button>
        ))}
      </div>
    </section>
  )
}

export default function OutfitBuilderPage({ onNavigate }: OutfitBuilderProps) {
  const [selectedHat, setSelectedHat] = useState(hats[0])
  const [selectedBaseTop, setSelectedBaseTop] = useState(baseTops[0])
  const [selectedOuterLayer, setSelectedOuterLayer] = useState(outerLayers[0])
  const [selectedBottoms, setSelectedBottoms] = useState(bottoms[1])
  const [selectedShoes, setSelectedShoes] = useState(shoes[0])
  const [selectedAccessoryIds, setSelectedAccessoryIds] = useState<string[]>([])
  const [topMode, setTopMode] = useState<"base" | "layer">("base")
  const [previewExpanded, setPreviewExpanded] = useState(false)
  const [saveOpen, setSaveOpen] = useState(false)
  const [outfitName, setOutfitName] = useState("")
  const [occasion, setOccasion] = useState("Casual")
  const [notice, setNotice] = useState("")

  const selectedAccessories = accessories.filter((item) =>
    selectedAccessoryIds.includes(item.id),
  )
  const visiblePieces = [selectedHat, selectedBaseTop, selectedOuterLayer, selectedBottoms, selectedShoes].filter((item) => !item.optional)
  const summary = [
    selectedHat,
    selectedBaseTop,
    selectedOuterLayer,
    selectedBottoms,
    selectedShoes,
    ...(selectedAccessories.length ? selectedAccessories : [accessories[0]]),
  ]
  const announce = (message: string) => {
    setNotice(message)
    window.setTimeout(() => setNotice(""), 2400)
  }
  const startOver = () => {
    setSelectedHat(hats[0])
    setSelectedBaseTop(baseTops[0])
    setSelectedOuterLayer(outerLayers[0])
    setSelectedBottoms(bottoms[1])
    setSelectedShoes(shoes[0])
    setSelectedAccessoryIds([])
    setTopMode("base")
    announce("Your look has been reset.")
  }
  const random = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)]
  const shuffle = () => {
    setSelectedHat(random(hats))
    setSelectedBaseTop(random(baseTops))
    setSelectedOuterLayer(random(outerLayers))
    setSelectedBottoms(random(bottoms))
    setSelectedShoes(random(shoes))
    setSelectedAccessoryIds(
      Math.random() > 0.35
        ? accessories
            .slice(1)
            .filter(() => Math.random() > 0.62)
            .map((item) => item.id)
        : [],
    )
    announce("A fresh look is ready.")
  }
  const saveOutfit = (event: FormEvent) => {
    event.preventDefault()
    const savedOutfit = {
      id: `outfit-${Date.now()}`,
      name: outfitName.trim(),
      occasion,
      hatId: selectedHat.optional ? null : selectedHat.id,
      baseTopId: selectedBaseTop.id,
      outerLayerId: selectedOuterLayer.optional ? null : selectedOuterLayer.id,
      bottomsId: selectedBottoms.id,
      shoesId: selectedShoes.id,
      accessoryIds: selectedAccessoryIds,
    }
    try {
      const current = JSON.parse(localStorage.getItem("closetiq-saved-outfits") || "[]")
      localStorage.setItem("closetiq-saved-outfits", JSON.stringify([...current, savedOutfit]))
    } catch {
      // The confirmation still supports private browsing environments.
    }
    setSaveOpen(false)
    setOutfitName("")
    announce(`“${savedOutfit.name}” saved to your closet.`)
  }

  return (
    <main className="builder-page-shell">
      <section className="builder-page" aria-label="Outfit builder">
        <div className="builder-page-content">
          <header className="builder-header">
            <div>
              <p>THE STYLING STUDIO</p>
              <h1>Build Your Look</h1>
              <span>Every great outfit starts with a single piece.</span>
            </div>
            <button onClick={startOver} type="button">Start Over</button>
          </header>

          <div className="builder-layout">
            <div className="builder-controls">
              <Picker items={hats} onSelect={setSelectedHat} selected={selectedHat} title="Hats" />
              <section className="tops-section">
                <div className="picker-heading"><h2>Tops</h2><span>STYLE IN LAYERS</span></div>
                <div className="top-segments" role="tablist" aria-label="Top garment type">
                  <button aria-selected={topMode === "base"} onClick={() => setTopMode("base")} role="tab" type="button">Base Top</button>
                  <button aria-selected={topMode === "layer"} onClick={() => setTopMode("layer")} role="tab" type="button">Outer Layer</button>
                </div>
                {topMode === "base" ? (
                  <Picker items={baseTops} onSelect={setSelectedBaseTop} selected={selectedBaseTop} title="Choose your foundation" />
                ) : (
                  <Picker items={outerLayers} onSelect={setSelectedOuterLayer} selected={selectedOuterLayer} title="Add a layer" />
                )}
                <div className="top-summary">
                  <button onClick={() => setTopMode("base")} type="button"><span>Base</span><strong>{selectedBaseTop.name}</strong></button>
                  <button onClick={() => setTopMode("layer")} type="button"><span>Layer</span><strong>{selectedOuterLayer.optional ? "None selected" : selectedOuterLayer.name}</strong></button>
                </div>
              </section>
              <Picker items={bottoms} onSelect={setSelectedBottoms} selected={selectedBottoms} title="Bottoms" />
              <Picker items={shoes} onSelect={setSelectedShoes} selected={selectedShoes} title="Shoes" />
              <Picker
                items={accessories}
                onSelect={(item) =>
                  setSelectedAccessoryIds((current) => {
                    if (item.optional) return []
                    return current.includes(item.id)
                      ? current.filter((id) => id !== item.id)
                      : [...current, item.id]
                  })
                }
                selectedIds={
                  selectedAccessoryIds.length
                    ? selectedAccessoryIds
                    : [accessories[0].id]
                }
                selectOnScroll={false}
                title="Accessories"
              />
            </div>

            <aside className="look-panel">
              <div className="look-heading">
                <div><span>LIVE EDIT</span><h2>Your Look.</h2></div>
                <button aria-expanded={previewExpanded} onClick={() => setPreviewExpanded((value) => !value)} type="button">{previewExpanded ? "Collapse" : "Expand"}</button>
              </div>
              <div className={`look-collage${previewExpanded ? " expanded" : ""}`}>
                {visiblePieces.map((item) => (
                  <figure className={`look-piece ${item.category.toLowerCase().replace(" ", "-")}`} key={item.id}>
                    <img alt={item.name} src={item.image} />
                    <figcaption>{item.category}</figcaption>
                  </figure>
                ))}
                {selectedAccessories.length > 0 && (
                  <div className="look-accessories" aria-label="Selected accessories">
                    {selectedAccessories.map((item) => (
                      <figure key={item.id}>
                        <img alt={item.name} src={item.image} />
                        <figcaption>{item.name}</figcaption>
                      </figure>
                    ))}
                  </div>
                )}
              </div>
              <section className="pieces-summary" aria-labelledby="pieces-title">
                <div className="pieces-title"><h3 id="pieces-title">The Pieces.</h3><span>{visiblePieces.length} selected</span></div>
                {summary.map((item) => (
                  <article className={`summary-row${item.optional ? " omitted" : ""}`} key={item.id}>
                    <span className="summary-thumb">{item.image ? <img alt="" src={item.image} /> : <span>—</span>}</span>
                    <span><small>{item.category}</small><strong>{item.optional ? "Optional — none" : item.name}</strong></span>
                    <em>{item.color}</em>
                    {item.category === "Accessory" && !item.optional && (
                      <button
                        aria-label={`Remove ${item.name}`}
                        className="remove-accessory"
                        onClick={() =>
                          setSelectedAccessoryIds((current) =>
                            current.filter((id) => id !== item.id),
                          )
                        }
                        type="button"
                      >
                        <Icon name="close" />
                      </button>
                    )}
                  </article>
                ))}
              </section>
              <div className="outfit-actions">
                <button className="save-outfit" onClick={() => setSaveOpen(true)} type="button"><Icon name="save" />Save Outfit</button>
                <button onClick={shuffle} type="button"><Icon name="shuffle" />Shuffle Look</button>
              </div>
            </aside>
          </div>
        </div>

        <nav className="builder-bottom-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <button aria-current={item.label === "Build" ? "page" : undefined} className={`${item.label === "Build" ? "active build-nav" : ""}`} key={item.label} onClick={() => onNavigate?.(item.label)} type="button">
              <span className="builder-nav-icon"><Icon name={item.icon} /></span><span>{item.label}</span>
            </button>
          ))}
        </nav>
        <p aria-live="polite" className={`builder-toast${notice ? " visible" : ""}`}>{notice}</p>

        {saveOpen && (
          <div className="builder-modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setSaveOpen(false)}>
            <form aria-labelledby="save-title" className="save-modal" onSubmit={saveOutfit}>
              <button aria-label="Close save dialog" className="modal-close" onClick={() => setSaveOpen(false)} type="button"><Icon name="close" /></button>
              <p>SAVE TO YOUR CLOSET</p>
              <h2 id="save-title">Name this look.</h2>
              <label>Outfit name<input autoFocus onChange={(event) => setOutfitName(event.target.value)} placeholder="e.g. Gallery Saturday" required value={outfitName} /></label>
              <label>Occasion<select onChange={(event) => setOccasion(event.target.value)} value={occasion}>{["Casual", "Work", "Formal", "Streetwear", "Weekend"].map((value) => <option key={value}>{value}</option>)}</select></label>
              <button className="confirm-save" type="submit">Save Outfit</button>
            </form>
          </div>
        )}
      </section>
    </main>
  )
}
