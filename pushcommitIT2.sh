#!/bin/bash
cd .
node getStats.js
git checkout gh-pages
git add .
git commit -m auto-update
git push