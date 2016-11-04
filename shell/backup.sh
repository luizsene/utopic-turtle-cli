#!/bin/sh


# Definindo parametros do MySQL
echo "  -- Definindo parametros do MySQL ..."
DB_NAME='dbname'
DB_USER='dbuser'
DB_PASS='dbpass'
DB_PARAM='--add-drop-table --add-locks --extended-insert --single-transaction -quick'

# Definindo parametros do sistema
echo "  -- Definindo parametros do sistema ..."
DATE=`date +%Y-%m-%d`
MYSQLDUMP=/usr/bin/mysqldump
BACKUP_DIR=/backup/mysql
BACKUP_NAME=mysql-$DATE.sql
BACKUP_TAR=mysql-$DATE.tar

#Gerando arquivo sql
echo "  -- Gerando Backup da base de dados $DB_NAME em $BACKUP_DIR/$BACKUP_NAME ..."
$MYSQLDUMP $DB_NAME $DB_PARAM -u $DB_USER -p$DB_PASS > $BACKUP_DIR/$BACKUP_NAME

# Compactando arquivo em tar
echo "  -- Compactando arquivo em tar ..."
tar -cf $BACKUP_DIR/$BACKUP_TAR -C $BACKUP_DIR $BACKUP_NAME



#Configuracao para data no arquivo de backup
DATAA=`date +%Y-%m-%dx%H-%M`

# diretorio do backup
DIRETORIOFONTE=""

# diretorio aonde sera feito o backup
DIRETORIOARQBCK=""

# Entrando no diretorio de backup
echo "Entrando no diretorio de Backup"
cd $DIRETORIOARQBCK

# Listando Diretorio
echo "Listando diretorio"
ls -l

# fazendo o backup
echo "Fazendo Backup..."
tar -cjvf $DATAA.tar.bz2 $DIRETORIOFONTE

#Configuracao para data no arquivo de backup
DATA=`date +%Y-%m-%dx%H-%M`

echo "Entrando no diretorio de envio de arquivos"
cd $DIRETORIOARQBCK

echo "Confirmando Diretorio..."
ls -l

# compactando o arquivo para que nao fique muito grande e comer a banda da lan.
echo "Compactando arquivo..."
tar -cjvf $DATA.tar.bz2 $DATAA.tar.bz2

# espere por segundos
sleep 5

FTPSERVER=""
USERNAME=""
PASSWORD=""
LOCALDIR=""

# conecte-se ao servidor FTP e envie o arquivo
echo "conectando no servidor FTP..."

ftp -ivn $FTPSERVER << FTP
user $USERNAME $PASSWORD

echo "Conectado e dentro do diretorio raiz."
cd $LOCALDIR

echo "Confirmando Diretorio..."
ls -l

#Upando Backup
echo "Upando arquivo..."
put $DATA.tar.bz2

echo"listando arquivos"
ls -l

bye
EOF
FTP
