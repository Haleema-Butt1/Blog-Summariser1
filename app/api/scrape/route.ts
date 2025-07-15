import { NextRequest, NextResponse } from 'next/server'
import { scrapeBlogContent } from '@/lib/scraper'
import { generateSummary } from '@/lib/summarizer'
import { translateToUrdu } from '@/lib/translator'
import { supabase } from '@/lib/supabase'
import clientPromise from '@/lib/mongodb'

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()

   
    if (!url || typeof url !== 'string' || !url.startsWith('http')) {
      return NextResponse.json(
        { error: 'Valid URL starting with http/https is required' },
        { status: 400 }
      )
    }

    
    const content = await scrapeBlogContent(url)
    console.log('Scraped content length:', content.length)

   
    const englishSummary = generateSummary(content)
    const urduSummary = translateToUrdu(englishSummary)
    console.log('Summaries generated.')

   
    const mongoClient = await clientPromise
    const mongoResult = await mongoClient.db('blogDB')
      .collection('blogs')
      .insertOne({ url, content, createdAt: new Date() })
    console.log('MongoDB saved:', mongoResult.insertedId)

   
    const { error } = await supabase.from('summaries').insert({
      blog_url: url,
      english_summary: englishSummary,
      urdu_summary: urduSummary,
      mongo_id: mongoResult.insertedId.toString()
    })

    if (error) {
      console.error('Supabase insert error:', error)
      throw new Error(`Database error: ${error.message}`)
    }

    return NextResponse.json({
      englishSummary,
      urduSummary
    })
  } catch (error: any) {
    console.error('Full error:', error)
    return NextResponse.json({
      error: error.message || 'Processing failed'
    }, { status: 500 })
  }
}
