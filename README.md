## Image Processing API

This Node project is a basic API that allows the user to request for an image to be resized with both a width and height. Functionality, while basic, revolves around the URL
parameters for a filename, width and a height to be present in order to generate the resized image.

This project demonstrates the use of making APIs in Node, using the Sharp node module to resize images, working with FileSystems, working with basic project structures for Full Stack,
using Jasmine unit testing, using tools such as ESLint or Prettier to help standardize code and the usage of TypeScript. 

## Instructions
Clone the project locally and run 
```
npm install
```

From there, run the following command to run the server locally
```
npm run start
```

From there, you should be able to access the api via the following port (3000)

Here is an example url request
localhost:3000/api/images?filename=profile.jpg&width=640&height=480

If you wish to resize a different image, go into public/assets/full to insert the image you wish to resize.