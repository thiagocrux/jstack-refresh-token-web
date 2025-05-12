# JStack's Refresh Token (Web)

A web client made with React and TypeScript that integrates JWT authentication with refresh token rotation.

For more details on other project components, check out the [API](https://github.com/thiagocrux/jstack-refresh-token-api).

## Technologies

These are some of the tecnologies used in this project:

- `axios`: A promise-based HTTP client for Node.js and browsers, supporting request/response interception, automatic JSON transformation, and easy error handling.
- `clsx`: A tiny utility for constructing className strings conditionally in React, often used with Tailwind CSS.
- `commitlint`: A tool that checks your commits and ensures consistency in version control.
- `eslint`: A linting tool for JavaScript/TypeScript code.
- `husky`: A tool for adding Git hooks to automate tasks like linting, testing, or commits in JavaScript/Node.js projects.
- `lint-staged`: Runs linters on Git staged files.
- `postcss`: A tool for transforming CSS with JavaScript plugins, enabling features like autoprefixing and future CSS syntax.
- `prettier`: A code formatter.
- `react`: A JavaScript library for building user interfaces, based on a component model with a virtual DOM for efficient updates.
- `sonner`: A lightweight toast notification library for React applications with simple configuration and smooth animations.
- `tailwindcss`: A utility-first CSS framework for rapidly building custom designs without leaving your HTML.
- `typescript`: A strongly typed superset of JavaScript that compiles to plain JS, adding static types and modern tooling for better developer experience.

_For more information about other dependencies, see the `package.json` file._

## Installation

1. Clone the repository:

```bash
git clone https://github.com/thiagocrux/jstack-refresh-token-web.git
```

2. Browse to the project folder:

```bash
cd jstack-refresh-token-web
```

3. Install dependencies:

```bash
pnpm install
```

## Available scripts

This section describes the available scripts in the `package.json` file and their functionalities.

### Development

- #### `dev`

  Starts the server in development mode, enabling faster builds and live-reloading.

  ```bash
  pnpm dev
  ```

### Production

- #### `build`

  Compiles the application for production.

  ```bash
  pnpm build
  ```

### Git hooks

- #### `prepare`

  Automatically configures Git hooks (via `husky`) before each commit.

  ```bash
  pnpm prepare
  ```

## Related links

- [Live #019 - Autenticação com refresh tokens no React](https://app.jstack.com.br/classroom/lives/autenticacao-com-refresh-tokens-no-react)

## License

[MIT](https://choosealicense.com/licenses/mit/)
