ARG VERSION=latest
FROM dmstraub/gramps-webapi:${VERSION}
COPY dist /app/static
LABEL org.opencontainers.image.source="https://github.com/gramps-project/gramps-web"
