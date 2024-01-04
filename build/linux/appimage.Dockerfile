FROM appimagecrafters/appimage-builder:1.1.0

RUN apt-get install -yq \
  squashfs-tools \
  gettext-base

COPY pack-appimage.sh /usr/bin/pack-appimage

# Set working directory (project root)
WORKDIR /opt/nuga

CMD [ "pack-appimage" ]
