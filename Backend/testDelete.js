const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env' });
const token = jwt.sign({ id: '67b8bbbe31cd33beebc69fbc' }, process.env.JWT_SECRET, { expiresIn: '30d' });

fetch('https://greenai-website-webservice.onrender.com/api/admin/users/699bed3cff932674d967a644', {
    method: 'DELETE',
    headers: {
        'Authorization': 'Bearer ' + token
    }
}).then(res => res.text().then(text => console.log('Status:', res.status, 'Response:', text)))
    .catch(err => console.error(err));
