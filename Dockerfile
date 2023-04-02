# Pulling the nginx image from docker hub.
FROM nginx:1.23.4-bullseye

# Copying the files from the local directory to the docker container.
COPY ./config/keys/ /etc/letsencrypt/live/champdle.com/
COPY ./config/nginx/ /etc/nginx/
COPY ./src/ /opt/champdle/

# Exposing port 443 for https and port 80 for http
EXPOSE 443
EXPOSE 80
