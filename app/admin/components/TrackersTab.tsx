import { Save, Activity, Check } from 'lucide-react'
import type { TrackerData } from '../types'

interface TrackersTabProps {
  data: TrackerData
  setData: (data: TrackerData) => void
  onSave: () => void
  isSaving: boolean
  saveSuccess: boolean
}

export function TrackersTab({ data, setData, onSave, isSaving, saveSuccess }: TrackersTabProps) {
  return (
    <div className="space-y-6">
      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-all font-medium"
        >
          {isSaving ? (
            <>
              <Activity className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : saveSuccess ? (
            <>
              <Check className="w-4 h-4" />
              Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Changes
              <span className="text-xs opacity-70 ml-1">(Cmd+S)</span>
            </>
          )}
        </button>
      </div>

      {/* Custom Trackers */}
      <section className="glass-morphism rounded-xl border backdrop-blur-md p-6">
        <h2 className="text-xl font-semibold mb-4">Custom Trackers</h2>
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Days Since Last Poem</label>
            <input
              type="number"
              value={data.daysSinceLastPoem}
              onChange={(e) => setData({...data, daysSinceLastPoem: parseInt(e.target.value) || 0})}
              className="w-full px-3 py-2 rounded-lg bg-background/50 border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Current Side Project</label>
            <input
              type="text"
              value={data.currentSideProject}
              onChange={(e) => setData({...data, currentSideProject: e.target.value})}
              className="w-full px-3 py-2 rounded-lg bg-background/50 border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Learning Queue (comma-separated)</label>
            <input
              type="text"
              value={data.learningQueue.join(", ")}
              onChange={(e) => setData({...data, learningQueue: e.target.value.split(", ").filter(Boolean)})}
              className="w-full px-3 py-2 rounded-lg bg-background/50 border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </section>

      {/* Life Stats */}
      <section className="glass-morphism rounded-xl border backdrop-blur-md p-6">
        <h2 className="text-xl font-semibold mb-4">Life Stats</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Books Read This Year</label>
            <input
              type="number"
              value={data.booksReadThisYear}
              onChange={(e) => setData({...data, booksReadThisYear: parseInt(e.target.value) || 0})}
              className="w-full px-3 py-2 rounded-lg bg-background/50 border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Poems Written</label>
            <input
              type="number"
              value={data.poemsWritten}
              onChange={(e) => setData({...data, poemsWritten: parseInt(e.target.value) || 0})}
              className="w-full px-3 py-2 rounded-lg bg-background/50 border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">KM Run</label>
            <input
              type="number"
              value={data.kmRun}
              onChange={(e) => setData({...data, kmRun: parseInt(e.target.value) || 0})}
              className="w-full px-3 py-2 rounded-lg bg-background/50 border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Coffees Consumed</label>
            <input
              type="number"
              value={data.coffeesConsumed}
              onChange={(e) => setData({...data, coffeesConsumed: parseInt(e.target.value) || 0})}
              className="w-full px-3 py-2 rounded-lg bg-background/50 border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="glass-morphism rounded-xl border backdrop-blur-md p-6">
        <h2 className="text-xl font-semibold mb-4">Tech Stack</h2>
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">LLMs (comma-separated)</label>
            <input
              type="text"
              value={data.currentlyUsing.llms.join(", ")}
              onChange={(e) => setData({
                ...data,
                currentlyUsing: {...data.currentlyUsing, llms: e.target.value.split(", ").filter(Boolean)}
              })}
              className="w-full px-3 py-2 rounded-lg bg-background/50 border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Editors (comma-separated)</label>
            <input
              type="text"
              value={data.currentlyUsing.editor.join(", ")}
              onChange={(e) => setData({
                ...data,
                currentlyUsing: {...data.currentlyUsing, editor: e.target.value.split(", ").filter(Boolean)}
              })}
              className="w-full px-3 py-2 rounded-lg bg-background/50 border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Frameworks (comma-separated)</label>
            <input
              type="text"
              value={data.currentlyUsing.frameworks.join(", ")}
              onChange={(e) => setData({
                ...data,
                currentlyUsing: {...data.currentlyUsing, frameworks: e.target.value.split(", ").filter(Boolean)}
              })}
              className="w-full px-3 py-2 rounded-lg bg-background/50 border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </section>

      {/* Learning Progress */}
      <section className="glass-morphism rounded-xl border backdrop-blur-md p-6">
        <h2 className="text-xl font-semibold mb-4">Learning Progress</h2>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">French Level</label>
              <input
                type="text"
                value={data.learning.french.level}
                onChange={(e) => setData({
                  ...data,
                  learning: {...data.learning, french: {...data.learning.french, level: e.target.value}}
                })}
                className="w-full px-3 py-2 rounded-lg bg-background/50 border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">French Streak (days)</label>
              <input
                type="number"
                value={data.learning.french.streak}
                onChange={(e) => setData({
                  ...data,
                  learning: {...data.learning, french: {...data.learning.french, streak: parseInt(e.target.value) || 0}}
                })}
                className="w-full px-3 py-2 rounded-lg bg-background/50 border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">AWS Progress (%)</label>
              <input
                type="number"
                value={data.learning.aws.progress}
                onChange={(e) => setData({
                  ...data,
                  learning: {...data.learning, aws: {...data.learning.aws, progress: parseInt(e.target.value) || 0}}
                })}
                className="w-full px-3 py-2 rounded-lg bg-background/50 border focus:outline-none focus:ring-2 focus:ring-primary"
                min="0"
                max="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">AWS Target</label>
              <input
                type="text"
                value={data.learning.aws.target}
                onChange={(e) => setData({
                  ...data,
                  learning: {...data.learning, aws: {...data.learning.aws, target: e.target.value}}
                })}
                className="w-full px-3 py-2 rounded-lg bg-background/50 border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
