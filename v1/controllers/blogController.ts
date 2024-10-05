import Blog from '../models/index';

import { Request, Response } from 'express';

class BlogController{
    public static async create(req: Request, res: Response): Promise<void>{
        try {
            const { title, description,category,author, image,createAt } = req.body;
            const blog = await Blog.create({ title, description,category,author, image,createAt });
            res.status(201).json({ message: 'Blog created successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public static async getAll(req: Request, res: Response): Promise<void>{
        try {
            const blog = await Blog.findAll();
            res.status(200).json(blog);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public static async getById(req: Request, res: Response): Promise<void>{
        try {
            const blog = await Blog.findByPk(req.params.id);
            res.status(200).json(blog);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public static async update(req: Request, res: Response): Promise<void>{
        try {
            await Blog.update(req.body, { where: { id: req.params.id } });
            res.status(200).json({ message: 'Blog updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public static async delete(req: Request, res: Response): Promise<void>{
        try {
            await Blog.destroy({ where: { id: req.params.id } });
            res.status(200).json({ message: 'Blog deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    
}

export default BlogController;