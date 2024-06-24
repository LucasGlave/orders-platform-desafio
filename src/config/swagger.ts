import path from 'path';

const PORT = process.env.PORT

export const swaggerSpec = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node ExpressJs Api',
      version: '1.0.0'
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api`,
        description: 'Local server'
      },
      {
        url: `https://orders-backend-mrjgh.ondigitalocean.app/api`,
        description: 'Digital Ocean'
      }
    ]
  },
  apis: [`${path.join(__dirname, '../routes/*.ts')}`]
}