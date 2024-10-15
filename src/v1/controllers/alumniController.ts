import db from '../models';
import sequelize from 'sequelize';
import { Request, Response } from 'express';
const Alumni = db.Alumni;
const Jurusan = db.Jurusan;
class AlumniController {
    public static async create(req: Request, res: Response): Promise<void> {
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

            data['approval'] = data['approval'] ? !!parseInt(data['approval']) : false;
            const alumni = await Alumni.create(data);
            res.status(201).json({ message: 'Alumni created successfully' });
            return;
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
            return;
        }
    }

    public static async getAll(req: Request, res: Response): Promise<void> {
        try {
            if (!Alumni) {
                throw new Error('Alumni model is not defined');
            }
            let condition:{[key:string]:any} = {}
            if(req.query){
                let query:any[] = [];
                if (req.query.approval) {
                    query.push({ approval: req.query.approval==='true' });
                }
                if(req.query.isShown){
                    query.push({ isShown: req.query.isShown==='true' });
                }
                condition["where"] = { [sequelize.Op.and]: query };
            }
            const response = await Alumni.findAll(condition, { order: [['angkatan', 'DESC']] });
            const alumni = response ? await Promise.all(response?.map(async (alumnus: any) => {
                const formattedData = { ...alumnus.dataValues };
                console.log(formattedData);
                const jurusan = await Jurusan.findByPk(formattedData.jurusan);
                return {
                  id: formattedData.id,
                  name: formattedData.name,
                  email: formattedData.email,
                  image: formattedData.image,
                  phone: formattedData.phone,
                  jobs: formattedData.jobs,
                  angkatan: formattedData.angkatan,
                  jurusan: jurusan?.name ?? formattedData.jurusan,
                  approval: formattedData.approval,
                  isShown: formattedData.isShown,
                };
              })) : [];
            
              console.log(alumni);
            let result:any;
            if(alumni?.length === 0 || alumni === null) {
                res.status(404).json([]);
                return;
            }
            if(req.query){
                if(req.query.reformat){
                    const groupedData = alumni.reduce((acc:any, current:any) => {
                        const angkatan = current.angkatan;
                        if (!acc[angkatan]) {
                            acc[angkatan] = [];
                        }
                        acc[angkatan].push(current);
                        return acc;
                    }, {});

                    result = Object.keys(groupedData)
                        .sort((a, b) => parseInt(b, 10) - parseInt(a, 10)) // Sort by angkatan descending
                        .map((angkatan) => {
                            const alumnus = groupedData[angkatan];
                            const total = alumnus.length;
                            const jurusan = alumnus.reduce((acc:any, current:any) => {
                                const jurusanName = current.jurusan;
                                if (!acc[jurusanName]) {
                                    acc[jurusanName] = {
                                        Jurusan: jurusanName,
                                        Alumni: [],
                                        total: 0,
                                    };
                                }
                                acc[jurusanName].Alumni.push(current.name);
                                acc[jurusanName].total++;
                                return acc;
                            }, {});

                            return {
                                angkatan: parseInt(angkatan, 10),
                                total,
                                alumni: Object.values(jurusan),
                            };
                        });
                }
            }
            if(result){
                res.status(200).json(result);
                return;
            }
            res.status(200).json(alumni);
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error', error });
            return;
        }
    }

    public static async getById(req: Request, res: Response): Promise<void> {
        try {
            const alumni = await Alumni.findByPk(req.params.id);
            res.status(200).json(alumni);
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
    }

    public static async update(req: Request, res: Response): Promise<void> {
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
            if(data['approval']) {
                data['approval'] = !!parseInt(data['approval']);
            }
            await Alumni.update(data, { where: { id: req.params.id } });
            res.status(200).json({ message: 'Alumni updated successfully' });
            return;
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
    }

    public static async delete(req: Request, res: Response): Promise<void> {
        try {
            console.log('Deleting alumni');
            await Alumni.destroy({ where: { id: req.params.id } });
            console.log('Alumni deleted successfully');
            res.status(200).json({ message: 'Alumni deleted successfully' });
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
    }

    public static async approve(req: Request, res: Response): Promise<void> {
        try {
            await Alumni.update({ approval: true }, { where: { id: req.params.id } });
            res.status(200).json({ message: 'Alumni approved successfully' });
            return;
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
    }

    public static async reject(req: Request, res: Response): Promise<void> {
        try {
            await Alumni.update({ approval: false }, { where: { id: req.params.id } });
            res.status(200).json({ message: 'Alumni rejected successfully' });
            return;
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
    }

}

export default AlumniController;