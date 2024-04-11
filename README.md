# silver-goggles

## requirements

- docker

## build

docker build -t silver-goggles-image .

## run

docker run -d --name silver-goggles-container -p 8080:80 silver-goggles-image
