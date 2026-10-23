import { ReactNode, SubmitEvent, useId, useState } from "react"

type AuthMode = "login" | "signup"

type IconProps = {
  className?: string
}

function ClosetMark({ className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 48 48"
    >
      <path
        d="M19.5 14.2c.2-3.5 2.1-5.7 5.1-5.7 2.6 0 4.6 1.7 4.6 4.1 0 2.1-1.1 3.3-3.2 4.6-1.2.8-2 1.8-2 3.3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2.5"
      />
      <path
        d="m24 20.5 14 10.1c1.7 1.2.8 3.9-1.3 3.9H11.3c-2.1 0-3-2.7-1.3-3.9l14-10.1Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2.5"
      />
    </svg>
  )
}

function GoogleIcon({ className = "" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24">
      <path
        d="M21.35 12.19c0-.74-.07-1.46-.19-2.15H12v4.06h5.24a4.48 4.48 0 0 1-1.94 2.94v2.63h3.15c1.84-1.7 2.9-4.2 2.9-7.48Z"
        fill="#4285F4"
      />
      <path
        d="M12 21.7c2.63 0 4.83-.87 6.44-2.36l-3.15-2.44c-.87.59-1.99.94-3.29.94-2.53 0-4.68-1.71-5.45-4.01H3.3v2.52A9.73 9.73 0 0 0 12 21.7Z"
        fill="#34A853"
      />
      <path
        d="M6.55 13.83A5.87 5.87 0 0 1 6.24 12c0-.64.11-1.26.31-1.83V7.65H3.3A9.7 9.7 0 0 0 2.3 12c0 1.57.38 3.06 1 4.35l3.25-2.52Z"
        fill="#FBBC05"
      />
      <path
        d="M12 6.16c1.43 0 2.71.49 3.72 1.45l2.79-2.8C16.82 3.24 14.62 2.3 12 2.3a9.73 9.73 0 0 0-8.7 5.35l3.25 2.52c.77-2.3 2.92-4.01 5.45-4.01Z"
        fill="#EA4335"
      />
    </svg>
  )
}

function AppleIcon({ className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M17.05 12.54c.02-2.14 1.75-3.17 1.83-3.22a3.94 3.94 0 0 0-3.1-1.68c-1.3-.14-2.56.78-3.22.78-.68 0-1.7-.77-2.8-.75a4.1 4.1 0 0 0-3.45 2.1c-1.5 2.6-.38 6.43 1.05 8.53.72 1.03 1.56 2.18 2.66 2.14 1.08-.04 1.48-.69 2.78-.69 1.29 0 1.67.69 2.8.66 1.16-.02 1.9-1.03 2.58-2.07a8.48 8.48 0 0 0 1.18-2.42 3.7 3.7 0 0 1-2.31-3.38ZM14.93 6.26a3.78 3.78 0 0 0 .87-2.7 3.85 3.85 0 0 0-2.5 1.28 3.6 3.6 0 0 0-.9 2.6 3.18 3.18 0 0 0 2.53-1.18Z" />
    </svg>
  )
}

function FacebookIcon({ className = "" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24">
      <path
        d="M21.5 12a9.5 9.5 0 1 0-10.98 9.39v-6.72H8.1V12h2.42V9.97c0-2.38 1.42-3.7 3.6-3.7 1.04 0 2.13.19 2.13.19V8.8h-1.2c-1.18 0-1.55.73-1.55 1.49V12h2.63l-.42 2.67H13.5v6.72A9.5 9.5 0 0 0 21.5 12Z"
        fill="#1877F2"
      />
    </svg>
  )
}

function EyeIcon({ className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M2.7 12s3.4-5 9.3-5 9.3 5 9.3 5-3.4 5-9.3 5-9.3-5-9.3-5Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}

function SocialButton({
  children,
  icon,
  onClick,
}: {
  children: ReactNode
  icon: ReactNode
  onClick: () => void
}) {
  return (
    <button className="social-button" onClick={onClick} type="button">
      <span className="social-icon">{icon}</span>
      <span>{children}</span>
    </button>
  )
}

function AuthField({
  autoComplete,
  label,
  name,
  placeholder,
  type = "text",
}: {
  autoComplete: string
  label: string
  name: string
  placeholder: string
  type?: string
}) {
  const inputId = useId()
  const [visible, setVisible] = useState(false)
  const isPassword = type === "password"

  return (
    <label className="field" htmlFor={inputId}>
      <span className="field-label">{label}</span>
      <span className="input-wrap">
        <input
          autoComplete={autoComplete}
          className="field-input"
          id={inputId}
          name={name}
          placeholder={placeholder}
          required
          type={isPassword && visible ? "text" : type}
        />
        {isPassword && (
          <button
            aria-label={visible ? "Hide password" : "Show password"}
            className="reveal-button"
            onClick={() => setVisible((current) => !current)}
            type="button"
          >
            <EyeIcon className="reveal-icon" />
          </button>
        )}
      </span>
    </label>
  )
}

export default function LoginPage({
  onLogin,
}: {
  onLogin: () => void
}) {
  const [mode, setMode] = useState<AuthMode>("login")
  const [message, setMessage] = useState("")

  const changeMode = (nextMode: AuthMode) => {
    setMode(nextMode)
    setMessage("")
  }

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
  event.preventDefault()
  onLogin()
}

  const handleSocial = (provider: string) => {
    setMessage(`${provider} sign-in is ready to connect.`)
  }

  return (
    <main className="app-shell">
      <section className="auth-screen" aria-label="ClosetIQ account access">
        <div className="ambient-shape ambient-shape-one" />
        <div className="ambient-shape ambient-shape-two" />

        <header className="brand-row">
          <span className="brand-mark">
            <ClosetMark className="brand-icon" />
          </span>
          <span className="brand-name">
            Closet<span>IQ</span>
          </span>
        </header>

        <div className="intro">
          <p className="eyebrow">
            {mode === "login" ? "YOUR CLOSET, CURATED" : "A SMARTER WARDROBE"}
          </p>
          <h1>
            {mode === "login" ? (
              <>
                Welcome
                <br />
                back.
              </>
            ) : (
              <>
                Dress better.
                <br />
                Buy less.
              </>
            )}
          </h1>
          <p className="intro-copy">
            {mode === "login"
              ? "Step back into a wardrobe that works for you."
              : "Create your account and discover more in what you already own."}
          </p>
        </div>

        <div className="auth-card">
          <div className="mode-switch" aria-label="Choose account action">
            <button
              aria-pressed={mode === "login"}
              className={mode === "login" ? "active" : ""}
              onClick={() => changeMode("login")}
              type="button"
            >
              Log in
            </button>
            <button
              aria-pressed={mode === "signup"}
              className={mode === "signup" ? "active" : ""}
              onClick={() => changeMode("signup")}
              type="button"
            >
              Sign up
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {mode === "signup" && (
              <AuthField
                autoComplete="name"
                label="Name"
                name="name"
                placeholder="Your name"
              />
            )}
            <AuthField
              autoComplete="email"
              label="Email"
              name="email"
              placeholder="you@example.com"
              type="email"
            />
            <AuthField
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
              label="Password"
              name="password"
              placeholder={
                mode === "login" ? "Enter your password" : "8+ characters"
              }
              type="password"
            />

            {mode === "login" ? (
              <button className="forgot-link" type="button">
                Forgot password?
              </button>
            ) : (
              <label className="terms-row">
                <input required type="checkbox" />
                <span>
                  I agree to the <button type="button">Terms</button> and{" "}
                  <button type="button">Privacy Policy</button>.
                </span>
              </label>
            )}

            <button className="primary-button" type="submit">
              <span>{mode === "login" ? "Log in" : "Create account"}</span>
              <span aria-hidden="true" className="button-arrow">
                →
              </span>
            </button>
          </form>

          <div className="divider">
            <span />
            <p>or continue with</p>
            <span />
          </div>

          <div className="social-stack">
            <SocialButton
              icon={<GoogleIcon className="provider-icon" />}
              onClick={() => handleSocial("Google")}
            >
              Continue with Google
            </SocialButton>
            <div className="social-pair">
              <SocialButton
                icon={<AppleIcon className="provider-icon apple-icon" />}
                onClick={() => handleSocial("Apple")}
              >
                Apple
              </SocialButton>
              <SocialButton
                icon={<FacebookIcon className="provider-icon" />}
                onClick={() => handleSocial("Facebook")}
              >
                Facebook
              </SocialButton>
            </div>
          </div>

          <p className="switch-prompt">
            {mode === "login" ? "New to ClosetIQ?" : "Already have an account?"}
            <button
              onClick={() => changeMode(mode === "login" ? "signup" : "login")}
              type="button"
            >
              {mode === "login" ? "Create an account" : "Log in"}
            </button>
          </p>

          <p
            aria-live="polite"
            className={message ? "status visible" : "status"}
          >
            {message}
          </p>
        </div>
      </section>
    </main>
  )
}
