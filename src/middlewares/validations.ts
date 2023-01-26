import { Request, Response, NextFunction } from "express";
import { validate } from "uuid";

const availableGenres = ['fiction', 'non-fiction', 'biography', 'poetry', 'drama', 'science', 'history', 'philosophy', 'self-help', 'Fantasy','other'];

export const validateId = (req: Request,res: Response,next:NextFunction) => {
    console.log('[ValidateId]');
    console.log(req.params);
   
    try {
      if(!validate(req.params.id)) {
        return res.status(400).send('Invalid id');
      }
    } catch (error) {
      return res.status(400).send('Invalid id');
    }
    next();
  }

  export const validateAddBookDto = (req: Request,res: Response,next:NextFunction) => {
    console.log('[ValidateAddBookDto]');
    console.log(req.body);
    const { title, authorId, genre } = req.body;
    if(!title || !authorId || !genre || availableGenres.indexOf(genre) === -1) {
      return res.status(400).send('Invalid book');
    }
    next();
  }