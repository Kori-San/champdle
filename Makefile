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
	@echo "Starting '$(CONTAINER_NAME)'"
	docker start $(CONTAINER_NAME)

build:
	@echo "Building '$(BUILD_TAG)'"
	docker build -t $(BUILD_TAG) .

	@echo ""
	@echo "Creating Image '$(CONTAINER_NAME)'"
	docker create -p $(HTTPS_PORT):443 -p $(HTTP_PORT):80 --name $(CONTAINER_NAME) $(BUILD_TAG)

stop:
	@echo "Stopping '$(CONTAINER_NAME)'"
	docker stop $(CONTAINER_NAME)

clean:
	@echo "Removing '$(CONTAINER_NAME)'"
	docker rm $(CONTAINER_NAME)

restart: stop start

rebuild: clean build

ngrok:
	@echo "Launching ngrok's temporary server listening on port '$(HTTPS_PORT)'"
	./bin/ngrok http $(HTTPS_PORT)
