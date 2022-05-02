declare module 'express' {
  namespace Express {
    interface Request {
      currentUserId: string;
    }
  }
}
