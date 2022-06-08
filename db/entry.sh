#!/bin/bash
set -e

tar xvzf /db.tar.gz -C /data/
rm -rf /db.tar.gz
exec /usr/local/bin/docker-entrypoint.sh "$@"