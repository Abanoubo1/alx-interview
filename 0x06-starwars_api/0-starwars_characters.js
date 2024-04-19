const request = require('request');

const movieId = process.argv[2];
const movieEndpoint = `https://swapi-api.alx-tools.com/api/films/${movieId}`;

function sendRequest(characterList, index) {
  if (characterList.length === index) {
    return;
  }

  request(characterList[index], (error, response, body) => {
    if (error) {
      console.log(error);
    } else {
      const characterData = JSON.parse(body);
      console.log(characterData.name);
    }
    sendRequest(characterList, index + 1);
  });
}

request(movieEndpoint, (error, response, body) => {
  if (error) {
    console.log(error);
  } else {
    const data = JSON.parse(body);
    const characterList = data.characters;

    sendRequest(characterList, 0);
  }
});
