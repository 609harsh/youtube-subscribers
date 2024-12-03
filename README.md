# Get Youtube Subscribers Project
[Deployed Link](https://youtube-subscribers-oqlq.onrender.com)

* Wait for 50 seconds to let Render spin up the server
  
[Video Demo Link]()


![Uploading image.png…]()

# About this Project

This Project is a Rest API for getting details of Youtube Subscribers from dummy data. It is built using NodeJs, ExpressJs, Mongodb, Mongoose libraries. This api provides enpoint to fect all subscribers, fetch subscribers name and channel name,
, and fetch details of subscriber based on user id.

User can
- Get all subscribers
- Get all subscribers name
- Get details on subscriber for particular id

## Steps to run the code locally
- Step 1 - Clone the repo on your machine
```

git clone <repository-url>
cd <repository-folder>
```
- Step 2 - Install Dependecies

```

npm install
```

- Step 3 - run below command
```

cp .env.example .env
```

- Step 4: Enter your personal Mongodb Atlas Connection string

- Step 5: Populate your DB with data
```

node src/createDatabase.js
```

- Step 6: Start Server
```

node src/index.js
```

## Endpoints
1. /subscribers
2. /subscribers/name
3. /subscribers/{id}
4. /api -- Provides swagger documentation
   

