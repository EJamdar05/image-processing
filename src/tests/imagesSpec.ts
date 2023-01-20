import supertest from 'supertest';
import app from '../index';
const server = supertest(app);

describe('Server endpoint testing', () => {
    it('can access the /api endpoint', async () => {
        const res = await server.get('/api');
        expect(res.statusCode).toBe(200);
    });

    it('throws an error with no params', async () => {
        const res = await server.get('/api/images');
        expect(res.text).toBe(
            'Error: No image input was given or the parameters (width and height) are missing.',
        );
    });

    it('throws an error with partial params (only filename)', async () => {
        const res = await server.get('/api/images/?file=profile.jpg');
        expect(res.text).toBe(
            'Error: No image input was given or the parameters (width and height) are missing.',
        );
    });

    it('throws an error with only a filename and width given', async () => {
        const res = await server.get('/api/images/?file=profile.jpg&width=100');
        expect(res.text).toBe(
            'Error: No image input was given or the parameters (width and height) are missing.',
        );
    });

    it('throws an error with only a filename and height given', async () => {
        const res = await server.get(
            '/api/images/?file=profile.jpg&height=100',
        );
        expect(res.text).toBe(
            'Error: No image input was given or the parameters (width and height) are missing.',
        );
    });

    it('generates an image with valid parameters', async () => {
        const res = await server.get(
            '/api/images?filename=profile.jpg&width=100&height=100',
        );
        expect(res.text).not.toBeDefined(); //assuming that a served file header has undef text
    });
});
