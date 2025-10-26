import { useState, useRef } from 'react'
import { Save, Activity, Check, TrendingUp, Camera, Download, Upload, FileJson } from 'lucide-react'
import type { TrackerData, HistoricalDataPoint } from '../types'
import { LifeStatsChart } from './LifeStatsChart'

interface TrackersTabProps {
  data: TrackerData
  setData: (data: TrackerData) => void
  onSave: () => void
  isSaving: boolean
  saveSuccess: boolean
  isAutoSaving?: boolean
  lastSaved?: Date | null
  historicalData: HistoricalDataPoint[]
  historyLoading: boolean
  onSaveSnapshot: () => void
}

export function TrackersTab({
  data,
  setData,
  onSave,
  isSaving,
  saveSuccess,
  isAutoSaving,
  lastSaved,
  historicalData,
  historyLoading,
  onSaveSnapshot
}: TrackersTabProps) {
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
    'booksReadThisYear',
    'poemsWritten',
    'kmRun',
    'coffeesConsumed'
  ])

  const toggleMetric = (metric: string) => {
    setSelectedMetrics(prev =>
      prev.includes(metric)
        ? prev.filter(m => m !== metric)
        : [...prev, metric]
    )
  }

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Export tracker data as JSON
  const handleExport = () => {
    const exportData = {
      trackerData: data,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `tracker-data-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Export timeline as CSV
  const handleExportTimeline = async () => {
    try {
      const response = await fetch('/api/timeline')
      const result = await response.json()

      if (result.success && result.timeline) {
        // Convert to CSV
        const headers = ['ID', 'Timestamp', 'Type', 'Description', 'Changes']
        const rows = result.timeline.map((entry: any) => [
          entry.id,
          new Date(entry.timestamp).toLocaleString(),
          entry.type,
          entry.description,
          entry.changes.map((c: any) => `${c.label}: ${c.oldValue} → ${c.newValue}`).join('; ')
        ])

        const csvContent = [
          headers.join(','),
          ...rows.map((row: any[]) => row.map(cell => `"${cell}"`).join(','))
        ].join('\n')

        const blob = new Blob([csvContent], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `timeline-${new Date().toISOString().split('T')[0]}.csv`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error('Failed to export timeline:', error)
    }
  }

  // Import tracker data from JSON
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        const importedData = JSON.parse(content)

        if (importedData.trackerData) {
          setData(importedData.trackerData)
          alert('Data imported successfully! Click Save to apply changes.')
        } else {
          alert('Invalid file format')
        }
      } catch (error) {
        alert('Failed to import data. Please check the file format.')
      }
    }
    reader.readAsText(file)

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-6">
      {/* Save Button and Auto-save Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          {isAutoSaving && (
            <div className="flex items-center gap-2">
              <Activity className="w-3 h-3 animate-spin text-blue-500" />
              <span>Auto-saving...</span>
            </div>
          )}
          {lastSaved && !isAutoSaving && (
            <div className="flex items-center gap-2">
              <Check className="w-3 h-3 text-green-500" />
              <span>Last saved: {lastSaved.toLocaleTimeString()}</span>
            </div>
          )}
          {!isAutoSaving && !lastSaved && (
            <span>Auto-save enabled (30s after changes)</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Export/Import Buttons */}
          <div className="flex items-center gap-2 mr-2">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-all text-sm"
              title="Export tracker data"
            >
              <Download className="w-4 h-4" />
              Export
            </button>

            <button
              onClick={handleExportTimeline}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-all text-sm"
              title="Export timeline as CSV"
            >
              <FileJson className="w-4 h-4" />
              Timeline
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-all text-sm"
              title="Import tracker data"
            >
              <Upload className="w-4 h-4" />
              Import
            </button>
          </div>

          {/* Save Button */}
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
                Save Now
                <span className="text-xs opacity-70 ml-1">(Cmd+S)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Historical Tracking Chart */}
      <section className="glass-morphism rounded-xl border backdrop-blur-md p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Life Stats Trends</h2>
          </div>
          <button
            onClick={onSaveSnapshot}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-secondary transition-all text-sm"
          >
            <Camera className="w-4 h-4" />
            Save Snapshot
          </button>
        </div>

        {historyLoading ? (
          <div className="flex items-center justify-center h-64">
            <Activity className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="flex gap-2 mb-4 flex-wrap">
              {[
                { key: 'booksReadThisYear', label: 'Books', color: 'bg-blue-500' },
                { key: 'poemsWritten', label: 'Poems', color: 'bg-green-500' },
                { key: 'kmRun', label: 'KM Run', color: 'bg-amber-500' },
                { key: 'coffeesConsumed', label: 'Coffees', color: 'bg-red-500' }
              ].map(metric => (
                <button
                  key={metric.key}
                  onClick={() => toggleMetric(metric.key)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ${
                    selectedMetrics.includes(metric.key)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full ${metric.color}`} />
                  {metric.label}
                </button>
              ))}
            </div>

            <LifeStatsChart data={historicalData} selectedMetrics={selectedMetrics} />
          </>
        )}
      </section>

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

          <div>
            <label className="block text-sm font-medium mb-2">Countries Visited</label>
            <input
              type="number"
              value={data.countriesVisited}
              onChange={(e) => setData({...data, countriesVisited: parseInt(e.target.value) || 0})}
              className="w-full px-3 py-2 rounded-lg bg-background/50 border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Languages Spoken</label>
            <input
              type="number"
              value={data.languagesSpoken}
              onChange={(e) => setData({...data, languagesSpoken: parseInt(e.target.value) || 0})}
              className="w-full px-3 py-2 rounded-lg bg-background/50 border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Cuisines Mastered</label>
            <input
              type="number"
              value={data.cuisinesMastered}
              onChange={(e) => setData({...data, cuisinesMastered: parseInt(e.target.value) || 0})}
              className="w-full px-3 py-2 rounded-lg bg-background/50 border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Days Meditated</label>
            <input
              type="number"
              value={data.daysMeditated}
              onChange={(e) => setData({...data, daysMeditated: parseInt(e.target.value) || 0})}
              className="w-full px-3 py-2 rounded-lg bg-background/50 border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </section>

      {/* Work Stats */}
      <section className="glass-morphism rounded-xl border backdrop-blur-md p-6">
        <h2 className="text-xl font-semibold mb-4">Work Stats</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Cities Impacted</label>
            <input
              type="number"
              value={data.citiesImpacted}
              onChange={(e) => setData({...data, citiesImpacted: parseInt(e.target.value) || 0})}
              className="w-full px-3 py-2 rounded-lg bg-background/50 border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Years Experience</label>
            <input
              type="number"
              value={data.yearsExperience}
              onChange={(e) => setData({...data, yearsExperience: parseInt(e.target.value) || 0})}
              className="w-full px-3 py-2 rounded-lg bg-background/50 border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Projects Completed</label>
            <input
              type="number"
              value={data.projectsCompleted}
              onChange={(e) => setData({...data, projectsCompleted: parseInt(e.target.value) || 0})}
              className="w-full px-3 py-2 rounded-lg bg-background/50 border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Data Processed</label>
            <input
              type="text"
              value={data.dataProcessed}
              onChange={(e) => setData({...data, dataProcessed: e.target.value})}
              className="w-full px-3 py-2 rounded-lg bg-background/50 border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g., 3TB"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">Current Role</label>
            <input
              type="text"
              value={data.currentRole}
              onChange={(e) => setData({...data, currentRole: e.target.value})}
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
