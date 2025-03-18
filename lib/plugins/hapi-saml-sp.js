'use strict';

const Fs = require('fs');

const idpCert = `MIIDCTCCAnKgAwIBAgIBATANBgkqhkiG9w0BAQUFADBvMRQwEgYDVQQDEwtjYXBy
aXphLmNvbTELMAkGA1UEBhMCVVMxETAPBgNVBAgTCFZpcmdpbmlhMRMwEQYDVQQH
EwpCbGFja3NidXJnMRAwDgYDVQQKEwdTYW1saW5nMRAwDgYDVQQLEwdTYW1saW5n
MB4XDTI1MDMxODAwMjY0OFoXDTI2MDMxODAwMjY0OFowbzEUMBIGA1UEAxMLY2Fw
cml6YS5jb20xCzAJBgNVBAYTAlVTMREwDwYDVQQIEwhWaXJnaW5pYTETMBEGA1UE
BxMKQmxhY2tzYnVyZzEQMA4GA1UEChMHU2FtbGluZzEQMA4GA1UECxMHU2FtbGlu
ZzCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEAxB18w1n/mDJEgJbOKl/qpsNh
RXF2v5S1DidH/je855q0AgYwFsQzZLjaoXmU6ZwNsskwA6fBx01Llob/1NHUI3M8
5kkICEp7EMcBZI34QdzIM09kDE2l+6dOHuO/7qVEKxRkbBpqdWV6NaaO0N/aE+Eo
hIE8TDJfaS4iFg0H8iUCAwEAAaOBtDCBsTAMBgNVHRMEBTADAQH/MAsGA1UdDwQE
AwIC9DA7BgNVHSUENDAyBggrBgEFBQcDAQYIKwYBBQUHAwIGCCsGAQUFBwMDBggr
BgEFBQcDBAYIKwYBBQUHAwgwEQYJYIZIAYb4QgEBBAQDAgD3MCUGA1UdEQQeMByG
Gmh0dHA6Ly9jYXByaXphLmNvbS9zYW1saW5nMB0GA1UdDgQWBBSIDFhWM5SGXU0O
xzc6rdnYzu3NkTANBgkqhkiG9w0BAQUFAAOBgQBqd6WVpm7BloGnTP7Ppl86Ha+S
WPSYzY6tfwmUn/SY0ty9YeM6UP8HPl+iOLJAB3mr3X2kYNudueVpbUTpHkbUDEJp
oHb+Bp/kVzmp9wrGrTRoRaGi8ZwOEA16JJvC3osci7y8+46KwcjXK4z1c2QE0dN0
xBEvlcGhURI8oGC4RQ==`;

module.exports = (server, options) => ({
    options: {
        saml: { //passport-saml options
            callbackUrl: `http://localhost:3000/login/saml`,
            entryPoint: 'https://fujifish.github.io/samling/samling.html',
            privateKey: Fs.readFileSync(__dirname + '/../../hapi_saml_sp_demo.key'),
            idpCert,
            issuer: 'hapi-saml-sp-demo'
        },
        config: {
            //required if privateCert is provided above.  Will it yell if privateKey is provided instead?
            signingCert: Fs.readFileSync(__dirname + '/../../hapi_saml_sp_demo.cert').toString(),
            routes: {
                metadata: {
                    path: '/saml/metadata.xml',
                    options: {
                        description: 'Fetch SAML metadata',
                        tags: ['api']
                    }
                },
                assert: {
                    path: '/login/saml',
                    options: {
                        description: 'SAML login endpoint',
                        tags: ['api']
                    }
                }
            },
            assertHooks: {
                onResponse: (profile, request, h) => {

                    //In the real world, your business logic would go here,
                    //and you'd redirect to your front end.
                    return profile;
                }
            }
        }
    }
});
