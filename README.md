# ticketing-app
Microservices app (5 services) with auth to buy and sell tickets. Built with JS, TypeScript, NextJs, Docker, Kubernetes, and was previously deployed to Digital Ocean.

Welcome to my most complex project! It is currently not hosted, but was previously deployed successfully through Digital Ocean.
This project was used to teach me further about TypeScript, testing using Jest, and getting more familiar with Docker, Kubernetes, and using GitHub Actions.
During this project I also created my first npm package to pass common modules between the different services: https://www.npmjs.com/package/@geoscholar80/common

The project is broken down into five services: authentication, client, expiration, payment, tickets, and client.
In the app users were able to sign up, sign in, post new tickets to sell, and buy tickets for sale through the Stripe API. 
An order is set to expire after 15 minutes, and if an order was completed it was shown on the user's order log page.
