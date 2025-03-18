# hapi-saml-sp-demo
This is a barebones [hapipal](https://hapipal.com/)-based demo app to show a basic SAML integration with samltest.id using the [hapi-saml-sp](https://github.com/theoryandprinciple/hapi-saml-sp) plugin.

The repo contains a .key and .cert, so it should be ready to use, but I've also included the `keycreate.sh` script to generate your own key/cert pairs.

In order to try this, start up the server and go to [https://fujifish.github.io/samling/samling.html](https://fujifish.github.io/samling/samling.html)

Set up the SP in the form in step 1 (leave as default or empty if not noted here):
 - Name Identifier: hapi-saml-sp
 - Assertion Consumer URL: http://localhost:3000/login/saml
 - Audience: hapi-saml-sp
 - Sign Response should be checked

 Generate a new keypair and take the "Signature Certificate and put is in the idpCert variable in lib/plugins/hapi-saml-sp.js

This will prompt you to log in using the provided credentials, and will then redirect you to your local hapi server, which will just dump a basic json version of the response..
