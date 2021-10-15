#! /bin/bash
read tag
npm install
nom build
docker build -t nodeappauto:${tag} .
docker images
