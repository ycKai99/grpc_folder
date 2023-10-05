import { SearchService } from "./services/query.service";

const express = require('express');
const bodyParser = require('body-parser');
const Messages = require('./schemas/message');
const app = express();
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

mongoose.connect('mongodb://192.168.100.59:27017/default', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err));


  /* Express Server: Http Connection */
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//     console.log(`Server listening on port http://localhost:${port}`);
// }); 

// GRPC SIDE
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('hello.proto');
const greeterProto = grpc.loadPackageDefinition(packageDefinition).Greeter;

function sayHello(call, callback) {
  callback(null, { message: 'Hello, ' + call.request.name });
}

const server = new grpc.Server();
server.addService(greeterProto.service, { sayHello });
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
server.start();


