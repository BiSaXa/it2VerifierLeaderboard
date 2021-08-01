#!/bin/bash
cd .
node getStats.js
git checkout gh-pages
git add .
git commit -m auto-update
git remote set-url origin git@github.com:bisaxa/it2VerifierLeaderboard.git
git push
