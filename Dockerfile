FROM dmstraub/gramps-webapi:v3.25.1
COPY dist /app/static
LABEL org.opencontainers.image.source="https://github.com/gramps-project/gramps-web"
