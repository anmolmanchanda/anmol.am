import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, AlertCircle } from 'lucide-react'

interface LoginFormProps {
  onLogin: (password: string) => Promise<boolean>
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const success = await onLogin(password)
    if (!success) {
      setError("Invalid password")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center aurora-bg">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-morphism rounded-2xl border backdrop-blur-md p-8 shadow-xl">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-primary/10">
              <Lock className="w-8 h-8 text-primary" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center mb-6">Admin Access</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 rounded-lg bg-background/50 backdrop-blur-sm border focus:outline-none focus:ring-2 focus:ring-primary"
              required
              autoFocus
            />

            {error && (
              <div className="flex items-center gap-2 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-medium"
            >
              Authenticate
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
