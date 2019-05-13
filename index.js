const fs = require('fs');
const MovieList = require('./js/MovieList');
const inquirer = require('inquirer');

const mcuList = JSON.parse(fs.readFileSync('./data/movies.json', 'utf8'));
const Movies = new MovieList(mcuList);

(async function init(){
  while (!Movies.finished) {
    const comparison = Movies.getComparison();
    for (const movie of comparison.movies) {
      const answer = await inquirer.prompt([
        {
          type: 'list',
          name: 'comparison',
          message: 'Which movie is better?',
          choices: [
            {
              name: comparison.pivot,
              message: comparison.pivot,
            },
            {
              name: movie,
              message: movie,
            },
          ]
        }
      ]);
      if (answer.comparison == movie) {
        comparison.approve(movie);
      } else {
        comparison.reject(movie);
      }
    }
    Movies.finishComparison();
    console.log(Movies.MovieBlobs);
  }
})();

