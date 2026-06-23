const http = require('http');

async function makeRequest(method, path, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 4000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data || '{}') });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log("1. Testing GET /health");
  let res = await makeRequest('GET', '/health');
  console.log(`Status: ${res.status}`);
  console.log(`Body:`, res.body);
  console.log("-------------------------------------------------");

  console.log("2. Testing POST /api/feedback");
  res = await makeRequest('POST', '/api/feedback', {
    category: 'bug',
    comment: 'This is a manual test comment for a bug with enough characters.',
    email: 'test@example.com'
  });
  console.log(`Status: ${res.status}`);
  console.log(`Body:`, res.body);
  console.log("-------------------------------------------------");

  console.log("3. Testing GET /api/feedback (without auth - should fail)");
  res = await makeRequest('GET', '/api/feedback');
  console.log(`Status: ${res.status}`);
  console.log(`Body:`, res.body);
  console.log("-------------------------------------------------");

  console.log("4. Testing GET /api/feedback (with auth)");
  res = await makeRequest('GET', '/api/feedback', null, { 'x-api-key': 'dev-admin-key-123' });
  console.log(`Status: ${res.status}`);
  console.log(`Body:`, res.body);
  console.log("-------------------------------------------------");

  console.log("5. Testing GET /api/analytics/summary (with auth)");
  res = await makeRequest('GET', '/api/analytics/summary', null, { 'x-api-key': 'dev-admin-key-123' });
  console.log(`Status: ${res.status}`);
  console.log(`Body:`, res.body);
  console.log("-------------------------------------------------");
}

runTests().catch(console.error);
