const fetch = require('node-fetch');

const API_URL = 'http://localhost:3000';
let authToken = '';
let userId = '';
let applicationId = '';
let ipnftId = '';

async function registerUser() {
  console.log('Registering a test user...');
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: `test-${Date.now()}@example.com`,
      password: 'password123',
      name: 'Test User',
      walletAddress: `0x${Math.random().toString(16).substring(2, 42)}`
    })
  });

  const data = await response.json();
  console.log('Registration response:', data);
  if (data.token) {
    authToken = data.token;
    userId = data.userId;
    console.log('User registered successfully!');
    return true;
  }
  return false;
}

async function applyForCreator() {
  console.log('Applying for creator status...');
  const response = await fetch(`${API_URL}/api/creator/apply`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({
      userId: userId,
      creatorType: 'Designer',
      portfolio: 'https://example.com/portfolio',
      SNSLinks: ['https://twitter.com/example']
    })
  });

  const data = await response.json();
  console.log('Creator application response:', data);
  if (data.applicationId) {
    applicationId = data.applicationId;
    console.log('Creator application submitted successfully!');
    return true;
  }
  return false;
}

async function mintIPNFT() {
  console.log('Minting an IP NFT...');
  // Note: In a real environment, we would need to append a file
  // This is a simplified version
  const response = await fetch(`${API_URL}/api/ipnft/mint`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({
      userId: userId,
      name: 'Test NFT',
      description: 'This is a test NFT',
      price: 100,
      influencerShare: 10
    })
  });

  const data = await response.json();
  console.log('IP NFT minting response:', data);
  if (data.ipnftId) {
    ipnftId = data.ipnftId;
    console.log('IP NFT minted successfully!');
    return true;
  }
  return false;
}

async function listIPNFTs() {
  console.log('Listing IP NFTs...');
  const response = await fetch(`${API_URL}/api/ipnft/list?userId=${userId}`);
  const data = await response.json();
  console.log('IP NFT list response:', data);
  return data;
}

async function getIPNFTDetails() {
  console.log('Getting IP NFT details...');
  const response = await fetch(`${API_URL}/api/ipnft/${ipnftId}`);
  const data = await response.json();
  console.log('IP NFT details response:', data);
  return data;
}

async function runTests() {
  try {
    if (await registerUser()) {
      await applyForCreator();
      // In a real environment, an admin would need to approve the creator
      // For testing purposes, we'll proceed with minting
      await mintIPNFT();
      await listIPNFTs();
      if (ipnftId) {
        await getIPNFTDetails();
      }
      console.log('All tests completed!');
    }
  } catch (error) {
    console.error('Error during tests:', error);
  }
}

// Run the tests
runTests(); 