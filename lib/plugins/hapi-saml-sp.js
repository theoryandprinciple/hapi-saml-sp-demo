'use strict';

const Fs = require('fs');

const idpCert = `MIIDEjCCAfqgAwIBAgIVAMECQ1tjghafm5OxWDh9hwZfxthWMA0GCSqGSIb3DQEB
CwUAMBYxFDASBgNVBAMMC3NhbWx0ZXN0LmlkMB4XDTE4MDgyNDIxMTQwOVoXDTM4
MDgyNDIxMTQwOVowFjEUMBIGA1UEAwwLc2FtbHRlc3QuaWQwggEiMA0GCSqGSIb3
DQEBAQUAA4IBDwAwggEKAoIBAQC0Z4QX1NFKs71ufbQwoQoW7qkNAJRIANGA4iM0
ThYghul3pC+FwrGv37aTxWXfA1UG9njKbbDreiDAZKngCgyjxj0uJ4lArgkr4AOE
jj5zXA81uGHARfUBctvQcsZpBIxDOvUUImAl+3NqLgMGF2fktxMG7kX3GEVNc1kl
bN3dfYsaw5dUrw25DheL9np7G/+28GwHPvLb4aptOiONbCaVvh9UMHEA9F7c0zfF
/cL5fOpdVa54wTI0u12CsFKt78h6lEGG5jUs/qX9clZncJM7EFkN3imPPy+0HC8n
spXiH/MZW8o2cqWRkrw3MzBZW3Ojk5nQj40V6NUbjb7kfejzAgMBAAGjVzBVMB0G
A1UdDgQWBBQT6Y9J3Tw/hOGc8PNV7JEE4k2ZNTA0BgNVHREELTArggtzYW1sdGVz
dC5pZIYcaHR0cHM6Ly9zYW1sdGVzdC5pZC9zYW1sL2lkcDANBgkqhkiG9w0BAQsF
AAOCAQEASk3guKfTkVhEaIVvxEPNR2w3vWt3fwmwJCccW98XXLWgNbu3YaMb2RSn
7Th4p3h+mfyk2don6au7Uyzc1Jd39RNv80TG5iQoxfCgphy1FYmmdaSfO8wvDtHT
TNiLArAxOYtzfYbzb5QrNNH/gQEN8RJaEf/g/1GTw9x/103dSMK0RXtl+fRs2nbl
D1JJKSQ3AdhxK/weP3aUPtLxVVJ9wMOQOfcy02l+hHMb6uAjsPOpOVKqi3M8XmcU
ZOpx4swtgGdeoSpeRyrtMvRwdcciNBp9UZome44qZAYH1iqrpmmjsfI9pJItsgWu
3kXPjhSfj1AJGR1l9JGvJrHki1iHTA==`;

module.exports = (server, options) => ({
    options: {
        saml: { //passport-saml options
            callbackUrl: `http://localhost:3000/login/saml`,
            entryPoint: 'https://samltest.id/idp/profile/SAML2/Redirect/SSO',
            privateKey: Fs.readFileSync(__dirname + '/../../hapi_saml_sp_demo.key'),
            cert: idpCert,
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
                    return {
                        email: profile.email,
                        firstName: profile['urn:oid:2.5.4.42'],
                        lastName: profile['urn:oid:2.5.4.4'],
                        phone: profile['urn:oid:2.5.4.20']
                    };
                }
            }
        }
    }
});