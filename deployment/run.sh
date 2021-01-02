# echo $API_BASE_PATH
# echo $NEXT_PUBLIC_DOMAIN
printenv > .env

pm2-runtime npm -- start
