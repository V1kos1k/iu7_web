FROM nginx:1.15-alpine

COPY ./dists/index-bundle.js /usr/share/nginx/html 
COPY ./dists/index.html /usr/share/nginx/html
COPY ./dists/fonts /usr/share/nginx/html/fonts

COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

CMD nginx -g 'daemon off;'