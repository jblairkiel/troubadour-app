# Kill prev
ssh root@troubadour.jblairkiel.com "kill -9 \$(ps -ef | grep 'npm exec serv' | head -1 | awk '{print $2}')"

#Remove Previous instance
ssh root@troubadour.jblairkiel.com 'rm -rf troubadour-app'

#Git Clone, and start Build
ssh root@troubadour.jblairkiel.com 'git clone https://github.com/jblairkiel/troubadour-app.git;cd troubadour-app;rm -rf node_modules;npm install;expo build:web'


#Start Server
ssh root@troubadour.jblairkiel.com 'cd troubadour-app;npx serve web-build -l 3001 &'