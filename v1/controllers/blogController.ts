import db from '../models';
const Blog = db.Blog;
import { Request, Response } from 'express';

class BlogController{
    public static async create(req: Request, res: Response): Promise<void>{
        try {
            const data:{[key:string]:any} = req.body;
            const cloudinaryUrls = req.body.cloudinaryUrls;

            // Check if there are any Cloudinary URLs
            if (cloudinaryUrls?.length === 0) {
                console.error("No Cloudinary URLs found.");
                throw new Error("No Cloudinary URLs found.");
            }
            if (cloudinaryUrls) {
                data["image"] = cloudinaryUrls[0];
            }
            
            data.createAt=new Date(data.createAt)

            const blog = await Blog.create(data);
            res.status(201).json({ message: 'Blog created successfully' });
            return;
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
    }

    public static async getAll(req: Request, res: Response): Promise<void>{
        try {
            const blog = await Blog.findAll();
            const formattedBlogs = blog.map((b: any) => {
                const formattedData = { ...b.dataValues };
                if (formattedData.createAt instanceof Date) {
                    formattedData.createAt = formattedData.createAt.toDateString();
                }
                return formattedData;
            });
            res.status(200).json(formattedBlogs);

        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        } finally {
            return;
        }
    }

    public static async getById(req: Request, res: Response): Promise<void>{
        try {
            const blog = await Blog.findByPk(req.params.id);
            blog.createAt = blog.createAt.toDateString()
            res.status(200).json(blog);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        } finally {
            return;
        }
    }

    public static async update(req: Request, res: Response): Promise<void>{
        try {
            const data:{[key:string]:any} = req.body;
            const cloudinaryUrls = req.body.cloudinaryUrls;

            // Check if there are any Cloudinary URLs
            if (cloudinaryUrls?.length === 0) {
                console.error("No Cloudinary URLs found.");
                throw new Error("No Cloudinary URLs found.");
            }
            if (cloudinaryUrls) {
                data["image"] = cloudinaryUrls[0];
            }

            if(data.createAt){
            data.createAt=new Date(data.createAt)
            }
            await Blog.update(req.body, { where: { id: req.params.id } });
            res.status(200).json({ message: 'Blog updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        } finally {
            return;
        }
    }

    public static async delete(req: Request, res: Response): Promise<void>{
        try {
            await Blog.destroy({ where: { id: req.params.id } });
            res.status(200).json({ message: 'Blog deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        } finally {
            return;
        }
    }

}

export default BlogController;