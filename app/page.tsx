import BlogForm from '@/components/blog-form'

export default function Home() {
  return (
    <main className="min-h-screen py-12 px-4 container mx-auto">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold mb-2">Blog Summarizer</h1>
        <p className="text-gray-600">Generate Urdu summaries from any blog URL</p>
      </div>
      
      <div className="flex justify-center">
        <BlogForm />
      </div>
      
      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>Enter any blog URL to see English and Urdu summaries</p>
      </footer>
    </main>
  )
}