import express, { Application } from 'express';
import path from 'path';
import { CategoryRoute } from '../Routes/CategoryRoute';
import { ProductRoute } from '../Routes/ProductRoute';

export default async (app: Application) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }))
    app.use('/assets', express.static('assets'))
    app.use('/category', CategoryRoute)
   // app.use(express.static(path.join(__dirname, 'public')));
    app.use('/product', ProductRoute)

    return app;
}