let mongooseModule: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  mongooseModule = require('mongoose');
} catch (e) {
  // mongoose package not installed in node_modules yet
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://Ollyboy:123Ollyboy%23@cluster0.vdlkuem.mongodb.net/dixnova?retryWrites=true&w=majority';

interface MongooseCache {
  conn: any;
  promise: Promise<any> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectToDatabase() {
  if (!mongooseModule) {
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongooseModule.connect(MONGODB_URI, opts).then((mongooseInstance: any) => {
      console.log('MongoDB connected successfully');
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
