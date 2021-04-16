#!/usr/bin/env bash
#This file is a slimmed down version of mellon_create_metadata.sh, which is found all over the saml-verse
set -e

PROG="$(basename "$0")"

printUsage() {
    echo "Usage: $PROG ENTITY-ID ENDPOINT-URL"
    echo ""
    echo "Example:"
    echo "  $PROG my_entity http://localhost"
    echo ""
}

if [ "$#" -lt 2 ]; then
    printUsage
    exit 1
fi

ENTITYID="$1"
if [ -z "$ENTITYID" ]; then
    echo "$PROG: An entity ID is required." >&2
    exit 1
fi

BASEURL="$2"
if [ -z "$BASEURL" ]; then
    echo "$PROG: The URL for your SP is required." >&2
    exit 1
fi

if ! echo "$BASEURL" | grep -q '^https\?://'; then
    echo "$PROG: The URL must start with \"http://\" or \"https://\"." >&2
    exit 1
fi

HOST="$(echo "$BASEURL" | sed 's#^[a-z]*://\([^:/]*\).*#\1#')"
BASEURL="$(echo "$BASEURL" | sed 's#/$##')"

OUTFILE="$(echo "$ENTITYID" | sed 's/[^0-9A-Za-z.]/_/g' | sed 's/__*/_/g')"
echo "Output files:"
echo "Private key:               $OUTFILE.key"
echo "Certificate:               $OUTFILE.cert"

# Files should not be readable by the rest of the world.
umask 0077

TEMPLATEFILE="$(mktemp -t keycreate_sp.XXXXXXXXXX)"

cat >"$TEMPLATEFILE" <<EOF
RANDFILE           = /dev/urandom
[req]
default_bits       = 2048
default_keyfile    = privkey.pem
distinguished_name = req_distinguished_name
prompt             = no
policy             = policy_anything
[req_distinguished_name]
commonName         = $HOST
EOF

openssl req -utf8 -batch -config "$TEMPLATEFILE" -new -x509 -days 3652 -nodes -out "$OUTFILE.cert" -keyout "$OUTFILE.key" 2>/dev/null

rm -f "$TEMPLATEFILE"

umask 0777
chmod go+r "$OUTFILE.cert"