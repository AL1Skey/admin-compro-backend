import mongoose, { Schema, Document, Model } from 'mongoose';


// Schema
const CMSSchema: Schema = new Schema({}, { strict: false });

// Model
const CMS: Model<Document> = mongoose.model<Document>('CMS', CMSSchema);

export default CMS;