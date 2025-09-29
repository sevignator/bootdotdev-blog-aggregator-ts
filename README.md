# Build a Blog Aggregator in TypeScript project from Boot.dev

Personal solution to the [Build a Blog Aggregator in TypeScript](https://www.boot.dev/courses/build-blog-aggregator-typescript) project from Boot.dev.

This is a CLI program, named gator, that allows users to fetch RSS feeds and store their content in a PostgreSQL database.

## Set up

1. Ensure that you have Node.js 22.15.0 installed on your machine. If you use NVM for managing your Node.js versions, you can simply run the following command from the project's root directory:

    ```sh
    nvm install
    ```

2. Ensure that you have a running PostgreSQL 16 server on your machine.

    - [Installing PostgreSQL 16 on macOS](https://medium.com/@abhinavsinha_/download-and-configure-postgresql16-on-macos-d41dc49217b6)
    - [Installing PostgreSQL 16 on Ubuntu](https://neon.com/postgresql/postgresql-getting-started/install-postgresql-linux)

3. From the project's root directory, execute any of the available command by running:

    ```sh
    npm start <command> <...args>
    ```

## Tech stack

- [Node.js](https://nodejs.org/en)
- [TypeScript](https://www.typescriptlang.org/)
- [Drizzle](https://orm.drizzle.team/docs/rqb)
- [PostgreSQL](https://www.postgresql.org/)
