docker build -t mobiquity-pay-image ./docker

docker run --name mobiquity-pay-cont -d -p 8080:80 mobiquity-pay-image
