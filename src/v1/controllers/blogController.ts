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
            let result:any;
            const formattedBlogs = blog.map((b: any) => {
                const formattedData = { ...b.dataValues };
                if (formattedData.createAt instanceof Date) {
                    formattedData.createAt = formattedData.createAt.toDateString();
                }
                return formattedData;
            });
            if(req.query){
                if(req.query.reformat){
                    result = formattedBlogs.map((item:any) => {
                        return {
                          id: item.id,
                          title: item.title,
                          img: item.image,
                          category: item.category,
                          author: item.author,
                          date: new Date(item.createAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
                          content: item.description,
                        };
                      });
                    const categorizedBlogs: {[key: string]: any[]} = {};

                    result.forEach((item: any) => {
                        const category = item.category;
                        if (!categorizedBlogs[category]) {
                            categorizedBlogs[category] = [];
                        }
                        categorizedBlogs[category].push(item);
                    });
                    result = categorizedBlogs;
                    console.log(result['Blog']);
                }
            }
            if(result){
                res.status(200).json(result);
            }else{
            res.status(200).json(formattedBlogs);
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        } finally {
            return;
        }
    }

    public static async getById(req: Request, res: Response): Promise<void>{
        try {
            const blog = await Blog.findByPk(req.params.id);
            let result:any;
            if(req.query){
                if(req.query.reformat){
                    result = {
                        id: blog.id,
                        title: blog.title,
                        img: blog.image,
                        category: blog.category,
                        author: blog.author,
                        date: new Date(blog.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
                        content: blog.description,
                      }
                }
            }
            blog.createAt = blog.createAt.toDateString()
            if(result){
                res.status(200).json(result);
            }
            else{
            res.status(200).json(blog);
            }
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