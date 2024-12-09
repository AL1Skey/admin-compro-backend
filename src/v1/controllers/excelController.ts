import sequelize from "sequelize";
import db from "../models";
import { Request, Response } from "express";
import * as XLSX from 'xlsx';
function capitalizeFirstLetter(str: string) {
  return str
    .split(" ")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

class ExcelController {
  public static async uploadAlumni(req: Request, res: Response): Promise<void> {
    try {
      let table: any;
      if (!req.body?.data) {
        res.status(400).json({ message: "No file found" });
        return;
      }
        const tablename = `Alumni`;
        if (!tablename) {
          res.status(400).json({ message: "No table name found" });
          return;
        }
        table = db[tablename];
        if (!table) {
          res.status(400).json({ message: "Table not found" });
          return;
        }
        // Map Excel data to Sequelize model fields
        const mappedData1 = req.body.data.slice(2).map((row: any) => ({
          Nama: row["D"] || "",
          Jurusan: row["G"] || "",
          Angkatan: row["I"] || "",
          "Nama Perusahaan": row["L"] || "",
          Jabatan: row["N"] || "",
          Remarks: row["O"] || "",
          email: row["P"] || "",
        }));
        console.log(mappedData1[0], "MApped Data");
        console.log(mappedData1.length);
        // Filter out any rows where all fields are empty or null
        let filteredData = mappedData1.filter((row: any) =>
          Object.values(row).some((value) => value !== "" && value !== null)
        );
        // Filter out any rows where it has duplicate name
        filteredData = filteredData.filter((row: any, index: any, self: any) =>
          index === self.findIndex((t: any) => t.Nama === row.Nama)
        );
        console.log(filteredData[0], "Filtered Data");
        // Inside the mappedData Promise.all function
        const mappedData = await Promise.all(
          filteredData.map(async (row: any) => {
            try {
              let rowJurusan = row.Jurusan.toUpperCase(); // Normalize case
              let jurusan: any;

              // Use findOrCreate to avoid duplicates
              [jurusan] = await db.Jurusan.findOrCreate({
                where: {
                  name: rowJurusan,
                },
                defaults: {
                  name: rowJurusan, // This will only be used if a new record is created
                },
              });

              console.log(jurusan);
              return {
                name: row.Nama,
                email: row.email,
                phone: row.Remarks,
                jobs: row.Jabatan,
                company: row["Nama Perusahaan"],
                angkatan: row.Angkatan,
                jurusan: `${jurusan.id}`, // Assuming jurusan is not null
                approval: true,
                isShown: false,
              };
            } catch (error) {
              console.log(error);
            }
          })
        );
        // console.log(mappedData);

      // Filter out existing records in the database to avoid duplicates
      const existingRecords = await table.findAll({
        where: {
          email: filteredData.map((row: any) => row.email),
        },
      });

      const existingEmails = existingRecords.map((record: any) => record.email);

      const newRecords = mappedData.filter((row: any) => !existingEmails.includes(row.email));

      if (newRecords.length > 0) {
        await table.bulkCreate(newRecords);
      }
      res.status(200).json({ message: "Upload Excel" });
      return;
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
      return;
    }
  }
  public static async downloadAlumni(req: Request, res: Response): Promise<void> {
    try {
      let table: any;
        const tablename = `Alumni`;
        if (!tablename) {
          res.status(400).json({ message: "No table name found" });
          return;
        }

        // Get the table model from the database
        table = db[tablename];
        if (!table) {
          res.status(400).json({ message: "Table not found" });
          return;
        }

        // Fetch all records from the table
        const data = await table.findAll();
        if (!data.length) {
          res.status(404).json({ message: "No data found" });
          return;
        }

        // Get the field names
        const fields = Object.keys(data[0].dataValues);

        const alumni = await Promise.all(data?.map(async (alumnus: any) => {
          const formattedData = { ...alumnus.dataValues };
          console.log(formattedData);
          const jurusan = await db.Jurusan.findByPk(formattedData.jurusan);
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
        }));
        


        // Prepare the data for Excel
        const excelData = data.map((row: any,index:any) => {
          const rowData: any = {};
          fields.forEach((field) => {
            if (field === "jurusan") {
              // Assuming `jurusan` is a related model with a `name` field
              rowData[field] = row[field] ? row[field].name : null;
            }
            else if(field === "id"){
              rowData[field] = index+1;
            }
            else if(["createdAt","updatedAt"].includes(field)){
              rowData[field] = row[field].toISOString().substr(0, 10);
            }
            else {
              rowData[field] = row[field];
            }
          });
          return rowData;
        });

        // Create a new workbook and add a sheet with the data
        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Alumni");

        // Create a buffer for the Excel file
        const excelBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

        // Send the file as an attachment
        res.setHeader("Content-disposition", "attachment; filename=alumni.xlsx");
        res.set("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.status(200).send(excelBuffer);
      return;
    } catch (error) {
      console.error("Error downloading data:", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  }
}

export default ExcelController;
