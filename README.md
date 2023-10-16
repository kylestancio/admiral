# ADMIRAL
A website solution for managing business vehicles in the Philippines.

## Cloning

### Using Git
Pre-requisites:
* You have git installed in your system

Step 1: Open up terminal and type the following command.
```sh
git clone https://github.com/kylestancio/admiral
```

Step 2: Install the node modules by navigating to the project directory, running the installation command.
```sh
cd admiral
npm install
```

Step 3: Create the `.env` files and provide the correct environment variables (`.env` file templates are provided below).


Step 4: Run the development server by running the following command:
```sh
npm run dev
```

If all works correctly, the development server should run.

### Environment Variables

Replace any values enclosed in `<>` with the correct environment variables.

`/.env`
```env
POSTGRES_USER=<POSTGRES USER>
POSTGRES_PASSWORD=<POSTGRES PASSWORD>
POSTGRES_DB=<POSTGRES DATABASE NAME>
```

`./web/.env` or `./web/.env.local`
```env
# PRISMA
DATABASE_URL=<DATABASE URL>

# NEXTAUTH
NEXTAUTH_SECRET=<NEXTAUTH SECRET>
NEXTAUTH_URL=<NEXTAUTH URL>

# API
NEXT_PUBLIC_URL=<API URL>
```
