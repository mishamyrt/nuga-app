ARG GOLANG_VERSION=1.21
ARG WAILS_VERSION=2.7.1

FROM golang:${GOLANG_VERSION}

# Setup Debian deps
RUN apt-get update && \
    apt-get install -yq --no-install-recommends \
    git \
    gnupg \
    libudev-dev \
    libgtk-3-dev \
    libwebkit2gtk-4.0-dev \
    gcc \
    build-essential

# Setup Wails
RUN go install github.com/wailsapp/wails/v2/cmd/wails@v2.7.1

COPY build-nuga.sh /usr/bin/build-nuga
RUN chmod +x /usr/bin/build-nuga

# Set working directory (project root)
WORKDIR /opt/nuga

CMD [ "build-nuga" ]
