<p align="center">
  <a href="https://github.com/kraskoo/johnny-bravo-eshop">
    <img src="https://raw.githubusercontent.com/kraskoo/johnny-bravo-eshop/master/client/public/favicon.png" alt="Bootstrap logo" width="60" height="60">
  </a>
</p>

# johnny-bravo-eshop

> Gym online shop

## Table of contents

- [Installing](#installing)
- [Starting](#starting)
- [Built With](#built-with)
- [Addons](#addons)
- [Application structure](#application-structure)
- [Application routes](#application-routes)
- [Author](#author)
- [License](#license)

## Installing

Installing server dependencies

```
cd server && npm i
```

Installing client dependencies

```
cd client && npm i
```

## Starting
Starting server

```
cd server && npm start
```

Starting client

```
cd client && npm start
```

## Built With

### Server
* [ExpressJS](https://github.com/expressjs/express) - web framework for MVC architecture/REST services

### Client
* [ReactJS](https://github.com/facebook/react) - SPA framework
	* [React-Toastify](https://github.com/fkhadra/react-toastify) - React-Toastify allow you to add notification to your app with ease.
	* [React Router](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom) - Declarative routing for React
	* [React Spinners](https://github.com/davidhu2000/react-spinners) - Loading spinners with React.js
	* [React Responsive Carousel](https://github.com/leandrowd/react-responsive-carousel) - Carousel
* [Bootstrap](https://github.com/twbs/bootstrap) - front-end web framework

## Addons
* webpack-bundle - compiling bundle of bootstrap 3.4.1, jquery 3.3.1, popper.js 1.14.7, tether 1.4.5
	* Requrements: webpack, webpack-cli
		* Installing: ```npm i -g webpack && npm i -g webpack-cli```
	* Starting ```cd webpack-bundle && npm i && npm run build ```
* jsons - exported collections as json files for categories and devices
	* Importing: Just start ```populate.cmd``` file under Windows, sorry about Linux users

## Application structure
The application have three main parts

* Public part
	* Guests can access home page
	* Guests can access about page
	* Guests can register
	* Guests can login
	* Guests can list all devices
	* Guests can search devices 
* Private part
	* Regular users can logout
	* Regular users can buy devices
* Administration part
	* Admin users can create category
	* Admin users can list all categories
	* Admin users can edit category
	* Admin users can delete category
	* Admin users can create device
	* Admin users can edit device
	* Admin users can delete device

## Application routes
The application have two type of routes

* Server
	* Category
		* [*http://localhost:65535*]/category/all - [GET] - return all categories
		* [*http://localhost:65535*]/category/create - [POST] - create new category
		* [*http://localhost:65535*]/category/delete:/:id - [GET] - remove category by id
		* [*http://localhost:65535*]/category/edit/:id/:newName - [GET] - edit category by id
		* [*http://localhost:65535*]/category/get/:id - [GET] - return category by id
	* Device
		* [*http://localhost:65535*]/device/all - [GET] - return all devices
		* [*http://localhost:65535*]/device/buy/:id/:count - [GET] - remove quantity from device by id
		* [*http://localhost:65535*]/device/create - [POST] - create new device
		* [*http://localhost:65535*]/device/delete/:id - [GET] - delete device by id
		* [*http://localhost:65535*]/device/edit/:id - [POST] - edit device by id 
		* [*http://localhost:65535*]/device/get/:id - [GET] - return device by id
		* [*http://localhost:65535*]/device/search/:search - [GET] - return all categories by name or return all device by name and description
	* Session
		* [*http://localhost:65535*]/session/create - [POST] - create new session
		* [*http://localhost:65535*]/session/get - [GET] - return session by jwtString and email
		* [*http://localhost:65535*]/session/remove - [POST] - remove session by jwtString and email
	* User
		* [*http://localhost:65535*]/user/allRegular - [GET] - return all users, which don't have Admin role
		* [*http://localhost:65535*]/user/login - [POST] - authenticate user
		* [*http://localhost:65535*]/user/register - [POST] - create new user with regular role, authenticate
		* [*http://localhost:65535*]/user/setadmin/:id - [GET] - replace user regular role with admin role
* Client
	* [*http://localhost:3000*] - Render view with dummy information
	* [*http://localhost:3000*]/about - Render view with information about project
	* [*http://localhost:3000*]/category/all - Render view with all categories
	* [*http://localhost:3000*]/category/create - Render view with create form for category
	* [*http://localhost:3000*]/category/delete/:id - Render view with delete form for category
	* [*http://localhost:3000*]/category/edit/:id - Render view with edit form for category
	* [*http://localhost:3000*]/device/:id - Render view with information about device
	* [*http://localhost:3000*]/device/all - Render view with all devices
	* [*http://localhost:3000*]/device/buy/:id - Render view with information about device + buy form
	* [*http://localhost:3000*]/device/create - Render view with create form for device
	* [*http://localhost:3000*]/device/delete/:id - Render view with delete form for device
	* [*http://localhost:3000*]/device/edit/:id - Render view with edit form for device
	* [*http://localhost:3000*]/device/search/:search - Render view with all devices within search criteria
	* [*http://localhost:3000*]/user/login - Render view with login form for log in user
	* [*http://localhost:3000*]/user/register - Render view with register form for register user
	* [*http://localhost:3000*]/user/setadminrole - Render view with users for changing role

## Author

**Krasimir Stefanov** - [*Github*](https://github.com/kraskoo/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details