FROM node:18-slim AS base
LABEL maintainer = "Gabrielle Guimarães <gabrielle1guim@gmail.com>"

# Create directories for application
RUN mkdir -p /app/src

# Set the working directory
WORKDIR /app/src

# Copy project specification and dependencies lock files
COPY . .


### DEPENDENCIES
FROM base AS dependencies

RUN \
  # Install dependencies for `node-gyp`
  apt-get update \
  && apt-get install -y --no-install-recommends \
    g++ \
    make \
    python \
  # Install Node.js dependencies
  && yarn \
  # Generate GraphQL schema
  && yarn backend:schema \
  # Generate distribution files
  && yarn backend:build


### RELEASE
FROM base AS release

COPY --from=dependencies /app/src/node_modules ./node_modules
COPY --from=dependencies /app/src/packages/backend/dist ./packages/backend/dist

# Expose application port
ENV PORT 8000
EXPOSE ${PORT}

# Run
CMD ["yarn", "backend:start"]