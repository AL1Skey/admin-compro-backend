import db from "../models";
import sequelize from "sequelize";
import { Request, Response } from "express";
const Alumni = db.Alumni;
const Jurusan = db.Jurusan;

function convertAlumniData(data: any[]) {
  const groupedByAngkatan = data.reduce((result: any, item) => {
    // Group by "angkatan"
    if (!result[item.angkatan]) {
      result[item.angkatan] = { angkatan: item.angkatan, total: 0, alumni: [] };
    }

    // Find or create jurusan group
    let jurusanGroup = result[item.angkatan].alumni.find(
      (j: any) => j.Jurusan === item.jurusan
    );
    if (!jurusanGroup) {
      jurusanGroup = { Jurusan: item.jurusan, [item.jurusan]: [], total: 0 };
      result[item.angkatan].alumni.push(jurusanGroup);
    }

    // Add alumni name to the corresponding jurusan
    jurusanGroup[item.jurusan].push(item.name.trim());
    jurusanGroup.total += 1;

    // Increment total for angkatan
    result[item.angkatan].total += 1;

    return result;
  }, {});

  // Convert the grouped data to an array
  return Object.values(groupedByAngkatan);
}
class AlumniController {
  public static async create(req: Request, res: Response): Promise<void> {
    try {
      const {
        name,
        email,
        image,
        phone,
        jobs,
        company,
        angkatan,
        jurusan,
        approval,
        isShown,
      } = req.body;
      const data: { [key: string]: any } = req.body;
      const cloudinaryUrls = req.body.cloudinaryUrls;

      // Check if there are any Cloudinary URLs
      if (cloudinaryUrls?.length === 0) {
        console.error("No Cloudinary URLs found.");
        throw new Error("No Cloudinary URLs found.");
      }
      if (cloudinaryUrls) {
        data["image"] = cloudinaryUrls[0];
      }
      
      data["approval"] = data["approval"]
        ? !!parseInt(data["approval"])
        : false;
      data["isShown"] = data["isShown"] ? !!parseInt(data["isShown"]) : false;
      // Check if name already exists in the database (case insensitive)
      
      const alumni = await Alumni.create(data);
      res.status(201).json({ message: "Alumni created successfully" });
      return;
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
      return;
    }
  }

  public static async getAllAngkatan(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const angkatanList = await Alumni.findAll({
        attributes: [
          [
            db.sequelize.fn("DISTINCT", db.sequelize.col("angkatan")),
            "angkatan",
          ],
        ],
        order: [["angkatan", "DESC"]],
      });
      res.status(200).json(angkatanList.map((item: any) => item.angkatan));
      return;
    } catch (error: any) {
      res.status(500).json({ message: "Internal server error", error });
      return;
    }
  }

  public static async getAll(req: Request, res: Response): Promise<void> {
    try {
      if (!Alumni) {
        throw new Error("Alumni model is not defined");
      }
      let condition: { [key: string]: any } = {};
      let pages = 0;
      let limit = 25;
      if (req.query) {
        let query: any[] = [];
        if (req.query.approval) {
          query.push({ approval: req.query.approval === "true" });
        }
        if (req.query.angkatan) {
          query.push({ angkatan: req.query.angkatan as string });
        } else {
          query.push({ angkatan: { [sequelize.Op.ne]: "" } });
        }
        if (req.query.isShown) {
          query.push({ isShown: req.query.isShown === "true" });
        }
        if (req.query.pages) {
          pages = parseInt(req.query.pages as string);
        }
        if (req.query.limit) {
          
            limit = parseInt(req.query.limit as string);
          
        } 
        if (req.query.offset) {
          if (req.query.offset === "false") {
            pages = 0;
          }
        }
       
        condition["limit"] = limit;
        condition["offset"] = pages * limit;
        // condition['attributes'] = [ [db.sequelize.fn('DISTINCT', db.sequelize.col('name')),'name'],'id' ,'email', 'image', 'phone', 'jobs', 'angkatan', 'jurusan', 'approval', 'isShown'];
        
        query.push({ name: { [sequelize.Op.ne]: "" } });
        query.push({ angkatan: { [sequelize.Op.ne]: "" } });
        query.push({ jurusan: { [sequelize.Op.ne]: "" } });
        condition["where"] = { [sequelize.Op.and]: query };
      }
      condition["order"] = [["updatedAt", "DESC"]];

      const response = await Alumni.findAll(condition);
      let alumni = response
        ? await Promise.all(
            response?.map(async (alumnus: any) => {
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
            })
          )
        : [];

      console.log(alumni);
      let result: any;
      if (alumni?.length === 0 || alumni === null) {
        res.status(200).json([]);
        return;
      }
      if (req.query) {
        if (req.query.reformat) {
          const groupedData = alumni.reduce((acc: any, current: any) => {
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
              const jurusan = alumnus.reduce((acc: any, current: any) => {
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
      if (result) {
        res.status(200).json(result);
        return;
      }
      res.status(200).json(alumni);
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error", error });
      return;
    }
  }
  public static async getAllByAngkatan(req: Request, res: Response): Promise<void> {
    try {
      if (!Alumni) {
        throw new Error("Alumni model is not defined");
      }
      let pages = 0;
      let offset = 5;
      
      // Get Angkatan list
      let angkatanList = await Alumni.findAll({
        attributes: [
          [
            db.sequelize.fn("DISTINCT", db.sequelize.col("angkatan")),
            "angkatan",
          ],
        ],
        order: [["angkatan", "DESC"]],
      });
      angkatanList = angkatanList.map((item: any) => {
        if (item?.angkatan > 0) {
          return item.angkatan;
        }
      });

      // Start Condition
      let condition: { [key: string]: any } = {};
      if (req.query) {
        let query: any[] = [];
        if (req.query.approval) {
          query.push({ approval: req.query.approval === "true" });
        }
        if (req.query.isShown) {
          query.push({ isShown: req.query.isShown === "true" });
        }
        if (req.query.pages) {
          pages = parseInt(req.query.pages as string);
        }
       
        query.push({ angkatan : {[sequelize.Op.and]:
          {
            [sequelize.Op.lte]: angkatanList[(pages*offset)],
            [sequelize.Op.gt]: angkatanList[(pages*offset)+5]
          }
        }})
        query.push({ name: { [sequelize.Op.ne]: "" } });
        query.push({ jurusan: { [sequelize.Op.ne]: "" } });
        condition["where"] = { [sequelize.Op.and]: query };
      }
      condition["order"] = [["angkatan", "DESC"]];

      const response = await Alumni.findAll(condition);
      let alumni = response
        ? await Promise.all(
            response?.map(async (alumnus: any) => {
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
            })
          )
        : [];

      console.log(alumni);
      let result: any;
      if (alumni?.length === 0 || alumni === null) {
        res.status(200).json([]);
        return;
      }
      if (req.query) {
        if (req.query.reformat) {
          const groupedData = alumni.reduce((acc: any, current: any) => {
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
              const jurusan = alumnus.reduce((acc: any, current: any) => {
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
      if (result) {
        res.status(200).json(result);
        return;
      }
      res.status(200).json(alumni);
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error", error });
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
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  }

  public static async update(req: Request, res: Response): Promise<void> {
    try {
      const data: { [key: string]: any } = req.body;
      
      const cloudinaryUrls = req.body.cloudinaryUrls;
      console.log(req.body, "update");
      
      // Check if there are any Cloudinary URLs
      if (cloudinaryUrls?.length === 0) {
        console.error("No Cloudinary URLs found.");
        throw new Error("No Cloudinary URLs found.");
      }
      if (cloudinaryUrls) {
        data["image"] = cloudinaryUrls[0];
      }
      // Check if approval is a number
      let hasNumbers = /\d/.test(data["approval"]);
      if (hasNumbers) {
        data["approval"] = !!parseInt(data["approval"]);
      }
      else{
        console.log(typeof data["approval"],"approval tipe data");
      }
      if (data["isShown"]) {
        data["isShown"] = !!parseInt(data["isShown"]);
      }
      data["updatedAt"] = new Date();
      console.log(data);
      await Alumni.update(data, { where: { id: req.params.id } });
      res.status(200).json({ message: "Alumni updated successfully" });
      return;
    } catch (error) {
      console.log("Error", error);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  }

  public static async delete(req: Request, res: Response): Promise<void> {
    try {
      console.log("Deleting alumni");
      await Alumni.destroy({ where: { id: req.params.id } });
      console.log("Alumni deleted successfully");
      res.status(200).json({ message: "Alumni deleted successfully" });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  }

  public static async bulkDelete(req: Request, res: Response): Promise<void> {
    try {
      const {id} = req.body;
      for (let i = 0; i < id.length; i++) {
        await Alumni.destroy({ where: { id: id[i] } });
      }
      res.status(200).json({ message: "Alumni deleted successfully" });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  }

  public static async alumniRequest(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const data: { [key: string]: any } = req.body;
      data["approval"] = false;
      const check = await Alumni.findOne({
        where: { name:data?.name, angkatan: data?.angkatan, jurusan: data?.jurusan, approval: false },
      });
      let response:any
      const existingAlumni = await Alumni.findOne({
        where: sequelize.where(
          sequelize.fn('LOWER', sequelize.col('name')),
          sequelize.fn('LOWER', data['name'].trim())
        )
      });

      if (existingAlumni) {
        console.log("Name already exists");
        console.log(existingAlumni);
        res.status(200).json({ message: "Nama sudah terdaftar" });
        return;
      }
      if (check) {
        response = await Alumni.update({...data,updatedAt:new Date()}, { where: { id: check.id } });
      }
      else{
        response = await Alumni.create(data);
      }
      if (response) {
        res
          .status(201)
          .json({ message: "Alumni request created successfully" });
        return;
      }
    } catch (error) {
      res.status(505).json({ message: "Internal Server Error", error });
      return;
    }
  }

  public static async approve(req: Request, res: Response): Promise<void> {
    try {
      await Alumni.update({ approval: true }, { where: { id: req.params.id } });
      res.status(200).json({ message: "Alumni approved successfully" });
      return;
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  }

  public static async reject(req: Request, res: Response): Promise<void> {
    try {
      await Alumni.update(
        { approval: false },
        { where: { id: req.params.id } }
      );
      res.status(200).json({ message: "Alumni rejected successfully" });
      return;
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  }

  public static async checkName(req: Request, res:Response):Promise<any>{
      try{
        console.log("MASIUKKK")
        const {name} = req.body;
        console.log(name);
        const check = await Alumni.findOne({where:{name}});
        console.log("CHECKKED")
        if(check){
          res.status(200).json({message:"Name already exist"})
          return;
        }
        res.status(200).json({safe:true})
        return;
      }
      catch(error){
        res.status(500).json({message:"Internal server error", error});
        return
      }
  }
}

export default AlumniController;
