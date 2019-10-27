FROM ruby:2.3.3
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN echo "gem: --no-rdoc --no-ri" > /etc/gemrc

RUN mkdir /app
WORKDIR /app
COPY Gemfile* ./
RUN bundle install --jobs 20 --retry 5
COPY . /app

EXPOSE 3001

CMD bundle exec rails s -p 3001 -b '0.0.0.0'

FROM node:10

RUN mkdir /client
WORKDIR /client
COPY ./client/package*.json ./
COPY . /client

RUN npm install
RUN npm run build

EXPOSE 3000

CMD npm start