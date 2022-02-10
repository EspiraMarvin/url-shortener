# url-shortener (Quasar(Vuejs 2) & Express API)


## Prerequisites
Before we set up the app, let’s check whether Quasar CLI is globally installed on your computer. Using the terminal run:

```bash
quasar -v
```

If you get a command not found error, run the following command to install it:

```bash
yarn global add @quasar/cli

OR

npm install -g @quasar/cli
```


## Install the dependencies
```bash
yarn install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
yarn dev / quasar dev
```

### Server opens up the URL [localhost:8080](http://localhost:8080)


### Lint the files
```bash
yarn run lint
```

### Build the app for production
```bash
quasar build
```


# Back-End with Expressjs & MongoDB Mongoose (api)

An Express Framework api

### Navigate to the server folder

```bash
cd url-shortener

cd server
```
## Install the dependencies

```bash
cd server
```

### Then install dependencies

```bash
yarn install
```

### Add .env file in the `server` folder

```bash
server/.env
```

### Add the `MONGO_URI` variable I have provider in the `.env` file like below:

```bash
#MONGO_URI = "the mongo uri"
MONGO_URI = "mongodb+srv://marvin:Itstbag254@cluster0.fkvqn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

```

### Start the api server in development mode
```bash
yarn dev
```

### Server opens up the URL [localhost:5000](http://localhost:5000)


### FOR VUE3 Code visit vue3 branch, link is below.


### [Vuejs 3 Code Implementation](https://github.com/EspiraMarvin/url-shortener/tree/vue3)
