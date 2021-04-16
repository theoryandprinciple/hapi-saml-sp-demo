# hapi-saml-sp-demo
This is a barebones [hapipal](https://hapipal.com/)-based demo app to show a basic SAML integration with samltest.id using the [hapi-saml-sp](https://github.com/theoryandprinciple/hapi-saml-sp) plugin.

The repo contains a .key and .cert, so it should be ready to use, but I've also included the `keycreate.sh` script to generate your own key/cert pairs.

In order to try this, start up the server and go to [https://samltest.id/idp/profile/SAML2/Unsolicited/SSO?providerId=hapi-saml-sp-demo&target=](https://samltest.id/idp/profile/SAML2/Unsolicited/SSO?providerId=hapi-saml-sp-demo&target=)

This will prompt you to log in using the provided credentials, and will then redirect you to your local hapi server, which will just dump a basic json user profile.
