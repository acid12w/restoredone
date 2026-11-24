#!/bin/sh
# Rebuilds tailwind.css from the classes used in the HTML files.
#   ./build-css.sh          one-off minified build (run before deploying)
#   ./build-css.sh --watch  rebuild automatically while you edit
cd "$(dirname "$0")" || exit 1
if [ "$1" = "--watch" ]; then
  ./bin/tailwindcss -i ./tailwind-input.css -o ./tailwind.css --watch
else
  ./bin/tailwindcss -i ./tailwind-input.css -o ./tailwind.css --minify
fi
