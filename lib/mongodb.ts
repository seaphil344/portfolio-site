import { MongoClient } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local')
}

const uri = process.env.MONGODB_URI
const options = {}

let client
let clientPromise

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export async function getProjects() {
  const client = await clientPromise
  const db = client.db('portfolio')
  return db.collection('projects').find({}).toArray()
}

export async function getPosts() {
  const client = await clientPromise
  const db = client.db('portfolio')
  return db.collection('posts').find({}).sort({ date: -1 }).toArray()
}