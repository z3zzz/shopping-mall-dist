IP=$( cat /etc/resolv.conf | grep -o '172.*.*.*' )
export MONGODB_URL="mongodb://$IP:27017/shopping"

yarn start-prod
