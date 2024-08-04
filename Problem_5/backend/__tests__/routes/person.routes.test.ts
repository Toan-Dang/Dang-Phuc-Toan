import supertest from 'supertest';
import app from '../../src/index';
const request = supertest(app);

describe('API Tests', () => {
  let token: string = "";

  beforeAll(async () => {
    // Login and get token
    const response = await request
      .post('/login')
      .send({
        email: "toandp@gmail.com",
        password: "123"
      });
    
    token = response.body.data;
  });

  test('GET /person/search/:query - search for persons', async () => {
    const query = 'john';
    const response = await request
      .get(`/person/search/${query}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Success");
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test('POST /person/update - update person details', async () => {
    const updateData = [
      {
        "username": "john.smith2",
        "id": 3,
        "birthdate": "1884-09-07",
        "email": "john.smith.dsu@email.com"
      },
      {
        "username": "john.smith12",
        "id": 2,
        "birthdate": "1995-09-07",
        "email": "john.smith@email.com"
      }
    ];

    const response = await request
      .post('/person/update')
      .set('Authorization', `Bearer ${token}`)
      .send(updateData);
    
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Success");
    expect(response.body.data).toBeNull();
  });

  test('POST /person/update - update person not exists', async () => {
    const updateData = [
      {
        "username": "john.smith2",
        "id": 9999999,
        "birthdate": "1884-09-07",
        "email": "john.smith.dsu@email.com"
      },
      {
        "username": "john.smith12",
        "id": 2,
        "birthdate": "1995-09-07",
        "email": "john.smith@email.com"
      }
    ];

    const response = await request
      .post('/person/update')
      .set('Authorization', `Bearer ${token}`)
      .send(updateData);
    
    expect(response.statusCode).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe("Record with ID 9999999 does not exist.");
  });

  test('GET /person - Check if the database is not empty', async () => {
    const query = 'john';
    const response = await request
      .get(`/person`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Success");
    expect(response.body.data.Items.length).toBeGreaterThan(0);
  });

});

