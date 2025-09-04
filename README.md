# Web3 Messenger API

A Node.js/Express API for Web3 signature verification using Viem. This API provides endpoints to verify Ethereum signatures against messages.

## Features

- 🔐 Ethereum signature verification
- 🚀 Express.js REST API
- 📝 TypeScript support
- 🔄 Hot reload in development
- 🌐 CORS configuration
- ✅ Health check endpoint

## Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd web_3_messager_api
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your configuration (see Environment Variables section below).

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000

# CORS Configuration
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

### Environment Variables Explained

- **`PORT`** - Port number for the server to listen on (default: `3000`)
- **`CORS_ALLOWED_ORIGINS`** - Comma-separated list of allowed origins for CORS (default: `http://localhost:5173`)

## Running the Application

### Development Mode

Start the development server with hot reload:

```bash
pnpm dev
# or
npm run dev
```

The server will start at `http://localhost:3000` (or the port specified in your environment variables).

### Production Mode

1. **Build the application**

   ```bash
   pnpm build
   # or
   npm run build
   ```

2. **Start the production server**
   ```bash
   pnpm start
   # or
   npm start
   ```

## API Endpoints

### Health Check

**GET** `/health`

Returns the health status of the API.

**Response:**

```
OK
```

### Verify Signature

**POST** `/verify-signature`

Verifies an Ethereum signature against a message.

**Request Body:**

```json
{
  "message": "Hello, Web3!",
  "signature": "0x1234567890abcdef..."
}
```

**Response:**

```json
{
  "isValid": true,
  "signer": "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
  "originalMessage": "Hello, Web3!"
}
```

**Error Response:**

```json
{
  "error": "signature must be a 0x-prefixed hex string"
}
```

## API Usage Examples

### Using curl

```bash
# Health check
curl http://localhost:3000/health

# Verify signature
curl -X POST http://localhost:3000/verify-signature \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello, Web3!",
    "signature": "0x1234567890abcdef..."
  }'
```

### Using JavaScript/TypeScript

```typescript
const response = await fetch("http://localhost:3000/verify-signature", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    message: "Hello, Web3!",
    signature: "0x1234567890abcdef...",
  }),
});

const result = await response.json();
console.log(result);
```

## Project Structure

```
src/
├── config/          # Configuration files
│   └── index.ts     # Environment and app configuration
├── middleware/      # Express middleware
│   └── index.ts     # CORS and other middleware setup
├── routes/          # API routes
│   └── index.ts     # Route definitions
├── services/        # Business logic
│   ├── index.ts     # Service exports
│   └── signatureService.ts  # Signature verification logic
├── types/           # TypeScript type definitions
│   └── index.ts     # API request/response types
└── index.ts         # Application entry point
```

## Dependencies

### Production Dependencies

- `express` - Web framework
- `cors` - CORS middleware
- `dotenv` - Environment variable management
- `viem` - Ethereum library for signature verification

### Development Dependencies

- `typescript` - TypeScript compiler
- `ts-node-dev` - Development server with hot reload
- `@types/*` - TypeScript type definitions

## Development

### Code Style

- TypeScript for type safety
- Express.js for the web framework
- Viem for Ethereum operations

### Adding New Features

1. Add new routes in `src/routes/index.ts`
2. Implement business logic in `src/services/`
3. Define types in `src/types/index.ts`
4. Update this README if adding new environment variables

## Troubleshooting

### Common Issues

1. **Port already in use**

   - Change the `PORT` environment variable
   - Kill the process using the port: `lsof -ti:3000 | xargs kill -9`

2. **CORS errors**

   - Add your frontend URL to `CORS_ALLOWED_ORIGINS` in your `.env` file

3. **Invalid signature errors**
   - Ensure the signature is a valid hex string starting with `0x`
   - Verify the message matches what was originally signed
