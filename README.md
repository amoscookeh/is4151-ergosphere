# Project Setup Guide

This guide covers the setup of environment files and the creation of symbolic links for the project.

Our monorepo structure includes a Node.js/Express.js backend and a React.js frontend, both utilizing TypeScript.

## Environment Files

We use a shared `.env` file located at the root of the monorepo to maintain consistency across our backend and frontend applications. This file contains environment-specific variables that are necessary for the applications to run and interact with external services.

### Creating the `.env` File

1. Navigate to the root of the monorepo.
2. Obtain the `.env` file from me if not already shared.
3. Add `.env` file to the root directory

### Symlinking the .env File

To make the root .env file accessible in both the backend and frontend directories without duplication, we use symbolic links.

1. Open a terminal.
2. Navigate to the root directory.

#### MacOS/Linux

3. Run the following commands to create symbolic links:

```
ln -s ./.env ./frontend/.env
```

#### Windows

3. Run the following commands to create symbolic links:

```
mklink .\frontend\.env .\.env
```

### Verifying the Setup

After setting up the symbolic links, running your applications should now have access to the environment variables defined in the root .env file. You can verify this by checking if the applications can connect to any services or databases as configured in .env.

### (Optional) Setting up Python Virtual Env

```
python3 -m venv ergo_env
source ergo_env/bin/activate
```

## Running Project

### Using start script

```
./scripts/start.sh
```

### Manually

#### Install Dependencies

```
yarn install
pip install -r requirements.txt
```

#### Start Flask server in the background

```
cd backend/ml
python app.py
```

##### Start yarn server in seperate terminal

```
yarn start
```
