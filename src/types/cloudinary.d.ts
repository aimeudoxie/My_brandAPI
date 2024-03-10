// cloudinary.d.ts
declare module 'cloudinary' {
    const cloudinary: {
      v2: {
        config(arg0: { cloud_name: string | undefined; api_key: string | undefined; api_secret: string | undefined; }): unknown;
        uploader: {
          upload: (path: string, options?: { folder?: string }) => Promise<any>;
        };
      };
      config: (options: {
        cloud_name: string;
        api_key: string;
        api_secret: string;
      }) => void;
    };
    export = cloudinary;
  }
  