@echo off
if not -%1-==-- (
  setlocal
  set BABEL_ENV=test
  set BABEL_DISABLE_CACHE=1
  call ./node_modules/.bin/tape -r babel-register %1
) else (
  echo Usage: test ^<filename^>
)
