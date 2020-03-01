# [betterReads](https://github.com/Lambda-School-Labs/betterreads-frontend)

![React](https://img.shields.io/badge/react-v16.7.0--alpha.2-blue.svg)
![Maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b6143502292664c1f0b4/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/betterreads-fe/test_coverage)
![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)

betterReads is a social media platform that allows users to connect with other readers alike, search its database of books, browse recommendations, and manage their own library.

## Installation

1. Once you have cloned the repository, download the dependencies with `npm install`.
2. Start the server with `npm start`.

## Documentation

-   [Product Canvas](https://www.notion.so/Better-Reads-66b5ba5a4c7e4036ab786e10b8c2de4d)
-   [Trello Board](https://trello.com)
-   [UX Design Files](https://figma.com)

### Tech Stack

-   React - fast and reusable
-   Redux - global state management
-   styled-components - customizable styling
-   Express - simple and effective
-   PostgreSQL - scalability and data persistence
-   AWS - robust and tailored

See [this repo](https://github.com/Lambda-School-Labs/betterreads-be) for details on the backend of our project.

See [this repo](https://github.com/Lambda-School-Labs/betterreads-ds) for details on the data science of our project.

### APIs

-   OAuth 2.0
-   Google Books API
-   BetterReads API

### Google Analytics

-   Import the necessary functions from the correct directory.
    ```js
    import { PageView, Events } from './components/tracking';
    ```
-   PageView() - tracks page views
    ```js
    useEffect(() => {
    	PageView();
    }, []);
    ```
-   Events(_category_, _action_, _label_)\*\* - tracks user interaction with form submits, links, buttons, etc.
    ```js
    Event('Book', 'User clicked on book details', 'SEARCH_RESULTS');
    ```
-   OutboundLink - tracks external links
    ```js
    <ReactGA.OutboundLink
    	eventLabel="Clicked read online link"
    	to="Link"
    	target="_blank"
    	rel="noopener noreferrer"
    >
    	Read online
    </ReactGA.OutboundLink>
    ```
-   Examples can be seen in Search.js, SearchForm.js, and SearchItems.js.

### Naming Conventions

-   Branches - kebab case, all lowercase
-   Variable and function names - camel case, descriptive
-   CSS class names - kebab case, descriptive
-   Database fields - camel case

### Prettier

-   Single quotes
-   4 space tabs
-   Semicolon at the end of every line

## Contributing

### Contributors

|                                     [Taylor Lohman](https://github.com/tclohm)                                      |                                      [Nicole Hollis](http://www.github.com/beautytechy)                                      |                                           [Jonah Aitchison](https://github.com/MarFan)                                           |                                                   [Michael Levick](https://github.com/mdlevick)                                                    |                                     [Miguel Nicolas](https://github.com/miugel)                                      |                                     [Aasa Christian](https://github.com/AasaChristian)                                      |
| :-----------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------: |
| [<img src="https://avatars3.githubusercontent.com/u/2380963?s=460&v=4" width = "200" />](https://github.com/tclohm) | [<img src="https://avatars3.githubusercontent.com/u/33879592?s=460&v=4" width = "200" />](http://www.github.com/beautytechy) |       [<img src="https://avatars0.githubusercontent.com/u/1047305?s=460&v=4" width = "200" />](https://github.com/MarFan)        |               [<img src="https://avatars1.githubusercontent.com/u/49565144?s=460&v=4" width = "200" />](https://github.com/mdlevick)               | [<img src="https://avatars0.githubusercontent.com/u/32444146?s=460&v=4" width = "200" />](https://github.com/miugel) | [<img src="https://avatars3.githubusercontent.com/u/54903068?s=460&v=4" width = "200" />](https://github.com/AasaChristian) |
|                 [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/tclohm)                 |                 [<img src="https://github.com/favicon.ico" width="15"> ](http://www.github.com/beautytechy)                  |                       [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/MarFan)                        |                               [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/mdlevick)                                |                 [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/miugel)                  |                 [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/AasaChristian)                  |
|    [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/)    | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/beautytechy/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/jonah-aitchison/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/michael-david-levick-jr-81b4a0115/) |    [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/)     |        [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/)        |

### License

betterReads is [MIT licensed](./license).
