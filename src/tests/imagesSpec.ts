import supertest from 'supertest';
import app from '../index';
const server = supertest(app);
import fs = require('fs');
import path = require('path');
describe('Server endpoint testing', (): void => {
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

describe('Testing image resizing functionality', () => {
    it('checks if the resized image is generated (using width: 480, height: 320)', async () => {
        let isFileGenerated = false;
        //delete the thumbnail if it already exists
        const thumbFilePath = //thumbFilePath: path str that leads to public/assets/thumb (which holds resized images)
            '../../public/assets/thumb/profile_thumb_480x320.jpg';
        const resizedPath = path.join(__dirname, thumbFilePath);
        if(fs.existsSync(resizedPath)){
            fs.unlinkSync(resizedPath);
        }
        await server.get(
            '/api/images?filename=profile.jpg&width=480&height=320',
        );
        console.log(fs.existsSync(resizedPath))
        if (fs.existsSync(resizedPath)) {
            isFileGenerated = true;
        }
        expect(isFileGenerated).toBe(true);
    });
});
