#!/usr/bin/node
const req = require('request');
const url = 'https://swapi-api.alx-tools.com/api';

if (process.argv.length > 2) {
  const link = `${url}/films/${process.argv[2]}/`;
  req(link, (error, request, body) => {
    if (error) {
      console.log(error);
    }
    const name = JSON.parse(body).characters.map(
      url_ => new Promise((resolve, reject) => {
        req(url_, (err, reqs, bodi) => {
          if (err) {
            reject(err);
          }
          resolve(JSON.parse(bodi).name);
        });
      }));
    Promise.all(name)
      .then(names => console.log(names.join('\n')))
      .catch(errors => console.log(errors));
  });
}