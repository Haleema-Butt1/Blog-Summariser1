'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function BlogForm() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ 
    englishSummary: string; 
    urduSummary: string 
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    setError(null)
    
    try {
      const res = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })
      
      // Handle response as text first
      const responseText = await res.text()
      let data: any
      
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        throw new Error(`Invalid response from server: ${responseText.slice(0, 100)}`)
      }
      
      if (res.ok) {
        setResult(data)
      } else {
        throw new Error(data.error || `Request failed with status ${res.status}`)
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try a different URL.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Blog Summarizer</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Blog URL</Label>
            <Input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/blog"
              required
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Processing...' : 'Generate Summary'}
          </Button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-md">
            <p className="font-medium">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-8 space-y-6">
            <div>
              <h3 className="font-medium mb-2">English Summary</h3>
              <p className="p-4 bg-gray-50 rounded-md border">{result.englishSummary}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Urdu Summary</h3>
              <p 
                className="p-4 bg-gray-50 rounded-md border text-right" 
                dir="rtl"
                style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}
              >
                {result.urduSummary}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}