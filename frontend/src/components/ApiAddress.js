let url = '';
if (process.env.NODE_ENV === 'production')
{
  url = 'https://bondbuddies.com';
}
else
{
  url = 'http://localhost:3001';
}

export const API_URL = url;
