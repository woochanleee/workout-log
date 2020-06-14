const fs = require('fs');

fs.writeFileSync('./.env', `GOOGLE_CLIENT_ID=${process.env.GOOGLE_CLIENT_ID}\nSERVER_URL=${process.env.SERVER_URL}\nDUMMY_TAG=${process.env.DUMMY_TAG}\n`);