// src/helpers/cloudinary.ts
import { v2 as cloudinaryV2, ConfigOptions } from 'cloudinary';

const cloudinary = cloudinaryV2 as any; // Override the type temporarily

const cloudinaryConfig: ConfigOptions = { 
  cloud_name: 'dmhy5ah1b', 
  api_key: '199238467323671', 
  api_secret: 'zXAGW-h9KNpkhbl9eRRRjpHPQLo' 
};

cloudinary.config(cloudinaryConfig);

export default cloudinary;
