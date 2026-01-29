@echo off
rd /s /q "frontend"
rd /s /q "backend"
echo Folders deleted successfully.
pause

npx create-next-app@latest my-app --ts --tailwind --eslint --app --src-dir --import-alias "@/*"

