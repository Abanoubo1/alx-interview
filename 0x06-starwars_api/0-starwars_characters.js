#!/usr/bin/node

const request = require('request');

const url = 'https://swapi-api.hbtn.io/api';

if (process.argv.length > 2) {
  request(`${url}/films/${process.argv[2]}/`, (err, _, body) => {
    if (err) {
      console.log(err);
    }
    const charactersURL = JSON.parse(body).characters;
    charactersURL.forEach((characterURL) => {
      request(characterURL, (err, _, body) => {
        if (err) {
          console.log(err);
        }
        console.log(JSON.parse(body).name);
      });
    });
  });
}