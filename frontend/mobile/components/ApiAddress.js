let url = '';
if (process.env.NODE_ENV === 'production')
{
  url = 'https://bondbuddies.com';
}
else
{
  // set to expo go ip addr
  url = 'http://10.132.181.204:3001';
}

export const API_URL = url;