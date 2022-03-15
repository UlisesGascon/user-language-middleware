<p align="center">
<h1 align="center">
  user-language-middleware
</h1>

<p align="center">
  Express middleware to collect and normalize user lang from http headers
</p>

<p align="center">
  <a href="https://www.npmjs.org/package/user-language-middleware"><img src="https://badgen.net/npm/v/user-language-middleware" alt="npm version"/></a>
  <a href="https://www.npmjs.org/package/user-language-middleware"><img src="https://badgen.net/npm/license/user-language-middleware" alt="license"/></a>
  <a href="https://www.npmjs.org/package/user-language-middleware"><img src="https://badgen.net/npm/dt/user-language-middleware" alt="downloads"/></a>
  <a href="https://snyk.io/test/github/ulisesgascon/user-language-middleware"><img src="https://snyk.io/test/github/ulisesgascon/user-language-middleware/badge.svg" alt="Known Vulnerabilities"/></a>
</p>

</p>

# About

Express middleware to collect and normalize user lang from http headers.

❤️ Awesome Features:

- Easy to recognize request lang by checking `accept-language` http header value. 🔥
- Easy to assign default languages by simple settings definition 🍺
- `debug` is supported 💪
- Easy to use and great test coverage ✅

```js
const express = require('express');
const userLanguageMiddleware = require('user-language-middleware')
const app = express();

app.use(userLanguageMiddleware({
    defaultLang: 'en'
}))

app.get('/', (req, res) => {
  res.send(`Your supported language ${req.userLang}`);
});

app.listen(3000, () => {
  console.log('We are in port 3000!');
});
```

## Usage

### Install

```bash
npm install user-language-middleware
```

### simple example

```js
const express = require('express');
const userLanguageMiddleware = require('user-language-middleware')
const app = express();

app.use(userLanguageMiddleware({
    defaultLang: 'en'
}))

app.get('/', (req, res) => {
  res.send(`Your supported language ${req.userLang}`);
});

app.listen(3000, () => {
  console.log('We are in port 3000!');
});
```

### Include a list of supported languages


```js
const express = require('express');
const userLanguageMiddleware = require('user-language-middleware')
const app = express();

app.use(userLanguageMiddleware({
    defaultLang: 'en',
    availableLangs: ['en', 'es', 'ja']
}))

app.get('/', (req, res) => {
  res.send(`Your supported language ${req.userLang}`);
});

app.listen(3000, () => {
  console.log('We are in port 3000!');
});
```

## Built With

Development only:

- [Standard](https://www.npmjs.com/package/standard) - Linting propuses
- [Husky](https://www.npmjs.com/package/husky) - Git Hooks

Production only:

- [debug](https://www.npmjs.com/package/debug) - Debug the app
## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/ulisesGascon/user-language-middleware/tags).

## Authors

- **Ulises Gascón** - *Initial work- - [@ulisesGascon](https://github.com/ulisesGascon)

See also the list of [contributors](https://github.com/ulisesGascon/user-language-middleware/contributors) who participated in this project.

## License

This project is licensed under the GNU AGPL3.0 License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- This project is under development, but you can help us to improve it! We :heart: FOSS!
