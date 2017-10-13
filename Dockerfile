FROM node
RUN apt-get update \
&& apt-get install -y --no-install-recommends \
ca-certificates \
libfontconfig \
bzip2 \
curl \
&& mkdir /tmp/phantomjs \
&& curl -L https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-linux-x86_64.tar.bz2 | tar -xj --strip-components=1 -C /tmp/phantomjs \
&& mv /tmp/phantomjs/bin/phantomjs /usr/local/bin
COPY server.js /usr/local/bin

CMD ["phantomjs","server.js"]
