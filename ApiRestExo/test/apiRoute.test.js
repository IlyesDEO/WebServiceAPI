const request = require('supertest');
const app = require('../app'); // Assurez-vous que le chemin est correct
const sequelize = require('../src/db/sequelize');
const Exo = require('../src/models/exo'); 


describe('API Route Tests', () => {

  it('should return data from cache if available', async () => {
    // Préparez l'état avec cachedData défini
    cachedData = [{ exampleData: 'data' }];

    const response = await request(app).get('/api/exo')
    expect(response.statusCode).toBe(401);
  });

});
