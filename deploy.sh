#!/usr/bin/env sh

# abort on errors
set -e

git commit --allow-empty -m "Deployment"
git push heroku master