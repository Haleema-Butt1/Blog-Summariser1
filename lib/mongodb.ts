import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI as string

if (!uri) throw new Error('MONGODB_URI is not defined')

// Create reusable connection
const client = new MongoClient(uri)
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  // Global variable for connection caching
  if (!(global as any)._mongoClientPromise) {
    (global as any)._mongoClientPromise = client.connect()
  }
  clientPromise = (global as any)._mongoClientPromise
} else {
  clientPromise = client.connect()
}

export default clientPromise