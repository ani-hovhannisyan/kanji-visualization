#!/bin/bash

# Clean up old containers, images, volumes and networks
docker-compose down --rmi all --volumes --remove-orphans

docker-compose up
