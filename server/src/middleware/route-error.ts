import { Request, Response, NextFunction } from 'express';

const RoutesErrorMiddleware = (err:Error, req:Request, res:Response, next: NextFunction) => {
    return res.status(400).send({message: err.message});
}

export default RoutesErrorMiddleware;