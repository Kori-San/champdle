# Variables
PROJECT_NAME = champdle
DOCKERCOMPOSE_FILE = ./conf/docker/docker-compose.yml

HTTPS_PORT = 443

# PHONY Rule
.PHONY: all up stop restart ngrok

# Rules
all: up

up:
	@docker-compose -p $(PROJECT_NAME) -f $(DOCKERCOMPOSE_FILE) up --build -d --remove-orphans

stop:
	@docker-compose -p $(PROJECT_NAME) -f $(DOCKERCOMPOSE_FILE) stop

restart: stop up

down:
	@docker-compose -p $(PROJECT_NAME) -f $(DOCKERCOMPOSE_FILE) down --remove-orphans

prune:
	@docker system prune -af

ngrok:
	@echo "Launching ngrok's temporary server listening on port '$(HTTPS_PORT)'"
	@./bin/ngrok http $(HTTPS_PORT)
