const http = require('http');
const path = require('path');
const fs = require('fs');
const MutationEngine = require('./mutation_engine');

const PORT = parseInt(process.env.PORT, 10) || 7071;
const startTime = Date.now();

const server = http.createServer((req, res) => {
  const reqUrl = new URL(req.url, 'http://' + (req.headers.host || 'localhost'));
  const pathname = reqUrl.pathname;

  if (pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: 'UP', service: 'MutantScore-AST', uptimeSeconds: Math.floor((Date.now() - startTime) / 1000) }));
  }

  if (req.method === 'POST' && pathname === '/api/mutate') {
    const code = 'function checkout(cartTotal, taxRate) { if (cartTotal > 100) return cartTotal * taxRate; return cartTotal + 5; }';
    const mutants = MutationEngine.generateMutants(code);
    const result = MutationEngine.evaluateMutants(mutants, (m) => m.type.startsWith('ROR') || m.type.startsWith('AOR'));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(result));
  }

  let filePath = path.join(__dirname, '..', 'public', pathname === '/' ? 'index.html' : pathname);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    return fs.createReadStream(filePath).pipe(res);
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
});

server.listen(PORT, () => {
  console.log('MutantScore-AST running on port ' + PORT);
});
