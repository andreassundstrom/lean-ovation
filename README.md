## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### MongoDb

```ps
docker run --name mongodb -d -p 27017:27017 mongo:7.0
```

### Configure signin

Add `.env.local` to root folder with configuration:

```txt
AZURE_AD_CLIENT_ID={...}
AZURE_AD_CLIENT_SECRET={...}
AZURE_AD_TENANT_ID={...}
MONGODB_URI=mongodb://localhost:27017/lean-ovation
```
