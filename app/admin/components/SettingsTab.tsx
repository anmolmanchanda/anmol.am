export function SettingsTab() {
  return (
    <div className="space-y-6">
      <div className="glass-morphism rounded-xl border backdrop-blur-md p-6">
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        <p className="text-muted-foreground">
          Session-based authentication with JWT tokens.
          Session expires after 7 days of inactivity.
        </p>
      </div>

      <div className="glass-morphism rounded-xl border backdrop-blur-md p-6">
        <h2 className="text-xl font-semibold mb-4">Security</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
            <span className="text-sm">Password hash algorithm</span>
            <span className="text-sm font-mono text-muted-foreground">SHA-256</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
            <span className="text-sm">Session token algorithm</span>
            <span className="text-sm font-mono text-muted-foreground">HS256 (JWT)</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
            <span className="text-sm">Session duration</span>
            <span className="text-sm font-mono text-muted-foreground">7 days</span>
          </div>
        </div>
      </div>

      <div className="glass-morphism rounded-xl border backdrop-blur-md p-6">
        <h2 className="text-xl font-semibold mb-4">Keyboard Shortcuts</h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
            <span className="text-sm">Save changes (Trackers tab)</span>
            <kbd className="px-2 py-1 text-xs font-mono rounded bg-background border">Cmd + S</kbd>
          </div>
        </div>
      </div>
    </div>
  )
}
