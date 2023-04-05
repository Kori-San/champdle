# Variables
BUILD_TAG = champdle:latest
CONTAINER_NAME = champdle
HTTPS_PORT = 443
HTTP_PORT = 80

# PHONY Rule
.PHONY: all start build stop clean ngrok

# Rules
all: start 

start:
	@echo "Champdle: Starting '$(CONTAINER_NAME)'"
	@docker start $(CONTAINER_NAME) > /dev/null

build:
	@echo "Champdle: Building '$(BUILD_TAG)'"

	@echo ""
	@docker build -t $(BUILD_TAG) .
	@echo ""
	
	@echo "Champdle: Creating Image '$(CONTAINER_NAME)'"
	@docker create -p $(HTTPS_PORT):443 -p $(HTTP_PORT):80 --name $(CONTAINER_NAME) $(BUILD_TAG) > /dev/null

stop:
	@echo "Champdle: Stopping '$(CONTAINER_NAME)'"
	@docker stop $(CONTAINER_NAME) > /dev/null

clean:
	@echo "Champdle: Removing '$(CONTAINER_NAME)'"
	@docker rm $(CONTAINER_NAME) > /dev/null

restart: stop start

rebuild: clean build

reload: stop clean build start

ngrok:
	@echo "Launching ngrok's temporary server listening on port '$(HTTPS_PORT)'"
	@./bin/ngrok http $(HTTPS_PORT)
