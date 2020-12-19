build:
	sudo docker-compose build
up:
	sudo docker-compose up
in:
	sudo docker exec -ti gray-scott-model-simulator /bin/ash

test:
	sudo docker exec gray-scott-model-simulator yarn test:unit