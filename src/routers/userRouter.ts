import { Router } from 'express';

const userRouter = Router();

userRouter.get('api/register', (req, res) => {
  try {
    res.status(200).json({ result: 'success' });
  } catch (err) {
    console.error(err);
  }
});

export { userRouter };
