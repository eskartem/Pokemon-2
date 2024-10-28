
login: admin
pass: 111

как запустить:
в терминал по очереди
cd client
npm install (если ещё не установлено)
npm start

также чтобы всё работало на новых версиях ospanel, нужно сделать папку .osp в папке server, в ней сделать файл project.ini, если его до там нету, и написать в него:
[monstaris.local]

php_engine = PHP-8.1

после чего перезагрузить ospanel

