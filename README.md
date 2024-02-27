# Initiate app in local environment
1. cd next-strapi-app-peliculas (NEXT Client) 
2. npm install 
3. npm run dev (to start the client in development) 

# cd ..
# cd next-app-pel-backend/next-strapi-app-peliculas (STRAPI Server)
4. For using Strapi its needed an even version of node.js (example ^18.19.0) [If you are using Windows you can install a node version using nvm 'nvm list available; nvm install 18.19.0; nvm use 18.19.0 (to use the new version 18.19.0 in current path folder, or 'nvm alias default 18.19.0' to select the new version as the default)'] 
5. Then run npm install in cd next-app-pel-backend/next-strapi-app-peliculas and modify the env files with the next values with your cloudinary cloud-name (create one if don't have one): 
```
CLOUDINARY_NAME=""
CLOUDINARY_KEY=""
CLOUDINARY_SECRET=""
```
6. Then use npm run develop to start the server, and that's all 
```
Next client will be running in localhost:3000
Strapi backend will be running in localhost:1337
```
```
You can test calling localhost:1337/api/peliculas?filters[enlaceUrl][$eq]=the-terminator , to get the data for The terminator movie i.e. or 
localhost:1337/api/peliculas?populate=* to get all the movies in the Strapi database with images and relations 
```

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
