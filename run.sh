#!/bin/sh
echo "envs $ENVIRONMENT $PORT"
if [ "$ENVIRONMENT" = "debug" ]; then
    sleep infinity
elif [ "$ENVIRONMENT" = "dev" ]; then
    npm run build-dev
    npm run test
    npm run start -- --port $PORT
elif [ "$ENVIRONMENT" = "prod" ]; then
    npm run build-prod
    npm run test
    npm run start -- --port $PORT
fi