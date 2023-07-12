# BoilerStore
## Students
- Bernardo Maia Coelho (12542481)
- Pedro Nascimento (12803492)
- Gustavo Wadas Lopes (12745640)

## Introduction
In this project, we aim to build BoilerStore: an asset store for indie games, designed by game devs for game devs. The store will offer a wide range of assets, from 3D models to music and more.

Boilerstore will offer a unique approach to asset searching. Our search engine will provide users with the assets they are looking for based on their inputs. Additionally, it will list assets that might help users finish their game based on the kind of game they are making.

## Navigation
![navigation diagram](navigation/navigation_diagram.png)

## UI Design
You can view our page and interaction designs in Figma [here](https://www.figma.com/file/0VzORJzqKJ0QuVIZ8dZElY/Web?type=design&node-id=0%3A1&t=3D4Uz93yfZ2p1mte-1). We are constantly iterating on different ideas and designs to see what works best, so the UI might change over time.

## HTML5 + CSS3 Mockup
We created a basic HTML + CSS mockup of some pages to serve as a guide and practice. You can find the mockup in the "/mockup/" folder of this repository. As of the last update, these screens are not responsive and are intended for desktop browsers.

The mockup is structured as follows:

    mockup
    | index.html
    | other pages (.html)
    | css (CSS style sheets)
    | dep (dependencies and fonts)
    | img (images)

## Design Principles
Since we aim to promote artistic expression, our UI design was made around the idea of "creativity". We use the following elements to express this mood:

- Smooth gradients
- Round and sharp corners combined
- Slight angles
- Non-conformant differently sized boxes
- Etc.

## Requirements
The following requirements must be met:

- Users must be able to search assets based on name, category, price range, etc.
- Users must be able to search suggested asset bundles based on game genre, target public, etc.
- Users must be able to create asset bundles.
- Users must be able to buy assets and asset bundles.

## Comments About the Code
No meaningful comments can be made at this time since we are still in the design phase.

## Test Plan
### Adim Test
- Go to Sign Up
- Try user 'ademiro' and password 'admin123'
- now click on 'More' on the top right
- now click on Edit Users
- now try to delete any user

### Login test
- Go to Sign Up
- Try random username and password
- Try "Jorge" (valid user) and random password
- Try random user and "123" (valid password)
- Try "Jorge" and "123"
- Hard reload page and try Try "jorge" and "123"
- Hard reload page and try "Admin" and "admin"
- Hard reload page and try "admin@mail.com" and "admin"

### Signup test
- Go to Sign Up
- Go to Sign In
- Try "Jorge" and random email and random password
- Try "jorge" and random email and random password
- Try random name and "jorge@mail.com" and random password
- Try random name and "JORGE@mail.com" and random password
- Try random name except "Jorge" and "Admin" with invalid email sintax and random password
- Try random name except "Jorge" and "Admin" with random valid email except "jorge@mail.com" and "admin@mail.com" and with random password

### Logoff test
- Go to Sign Up
- Log in as "Jorge" with password "123"
- Return to home page and go to Sign Off
- Confirm Sign Off
  
### Cart test
- Empty Cart
- Asset without discount
- Assets with discount
- Multiple assets, with and without discount
- Remove asset
- Remove all assets

## Test Results
### Login test
- User not found
- User not found
- User not found
- Logged in as "Jorge"
- Logged in as "Jorge"
- Logged in as "Admin"
- Logged in as "Admin"
 
### Signup test
- Name or email already taken
- Name or email already taken
- Name or email already taken
- Name or email already taken
- Invalid email
- Signed up

### Logoff test
- Successfully logged off
 
 
### Cart test
- Empty cart displays price 0
- Asset price correctly displayed
- Assets prices correctly displayed
- Total prices correctly displayed
- Correct asset removed and total price adjusted
- Empty cart message displayed correctly
  
## Build Procedures
Install nvm:
Linux and MacOS
```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```
Windows
```
https://github.com/coreybutler/nvm-windows/releases
```

Then install node using nvm:
```
nvm install node
```

Now, lets setup the database. Go to the 
[MongoDB website](https://www.mongodb.com/docs/manual/installation/)
and follow their instructions. After that, you should be able to verify that MongoDB is running at the port 27017. We recoment using MongoDB compass to verify that the database is working as expected.

Now clone our repository
```
git clone https://github.com/KrulesExGamer/BoilerStore
```

Now, to start the backend, go back to the repository directory and them type:
```
cd ./boilerstore-backend/
npm install
npm start
```

Now you only need to start the frontendt serce and it should be up and running:
```
cd ./boilerstore-frontend/
npm install
npm start
```

All done! Assuming the ports 3000 and 3001 are avaiable, the frontend and the backend should have started without issues.

Now, to quickly populate the database, you can simply run the http get request: [GET] `localhost:3001/api/dev/populate/all`. We recoment insomnia to work and debug the backend.

Now, you should have a frontend, a backend and a database working, enjoy :). 


## Problems
We had problems generalizing the code and learning how to use React + Typescript in a non-wacky way. We coordinated through Discord and Github to avoid code conflicts.

We also spent lots of time preparing the mockup APIs that could be easily upgraded to real APIs for the next milestone.

## Comments
Code may be a little to extensive due to lack of prior planning.

Obs: the command `npm run build` is not working peferctly for some reason. The index.html will not be correctly connected to styles and scripts. That can easily be solved by manualy combining those files into one file. This is an oddity of `create-react-app` and we could not figure out exactly what is causing it. Howerver, `npm start` is working as expected.
