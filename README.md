# johnny-bravo-eshop

GYM online shop

## Table of contents

- [Installing](#installing)
- [Built With](#built-with)
- [Application structure](#application-structure)
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

## Built With

### Server
* [ExpressJS](https://github.com/expressjs/express) - web framework for MVC architecture/REST services

### Client
* [ReactJS](https://github.com/facebook/react) - SPA framework
* [Bootstrap](https://github.com/twbs/bootstrap) - front-end Web framework

## Application structure
The application have three main parts

* Public part
	* Guests can access home page
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

## Author

**Krasimir Stefanov** - [*Github*](https://github.com/kraskoo/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details