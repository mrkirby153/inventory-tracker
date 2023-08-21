#!/bin/sh

# Push prisma schema
prisma migrate deploy

node server.js