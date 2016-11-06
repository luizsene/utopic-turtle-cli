#!/bin/sh

# -- INICIO CONFIGURAÇÃO --

#configura nome do BACKUP
NOME_BKP="nomeaqui_";

#Configuracao FTP destino do BACKUP
FTP_ATIVADO="TRUE"
FTPSERVER="0.0.0.0"
USERNAME="nomeusuario"
PASSWORD="senhaaqui"
LOCALDIR="/BACKUP/nomeaqui"

#Configuracao para data no arquivo de backup
DATA=$NOME_BKP`date +%Y-%m-%d`

# diretorio do backup
DIRETORIOFONTE="/home/nomeaqui/public_html"

# diretorio aonde sera feito o backup
DIRETORIOARQBCK="/home/nomeaqui/BACKUP"

# Definindo parametros do MySQL
echo "  -- Definindo parametros do MySQL ..."
#BACKUP = TRUE para fazer bkp do banco  BABKUP =  FALSE para desativar bkp do banco
BACKUP_BANCO="FALSE"
DB_NAME='nome_bd'
DB_USER='nome_user'
DB_PASS='senha_bd'
DB_PARAM='--add-drop-table --add-locks --extended-insert --single-transaction -quick'


# -- FIM CONFIGURAÇÃO --


if [ $BACKUP_BANCO != "FALSE" ]; 
	then
	# Definindo parametros do sistema
	echo "NOTA: CONFIGURANDO DADOS PARA BACKUP DO MYSQL"
	DATE=`date +%Y-%m-%d`
	MYSQLDUMP=/usr/bin/mysqldump
	BACKUP_DIR="backup/mysql"
	BACKUP_NAME=mysql-$DATE.sql
	BACKUP_TAR=mysql-$DATE.tar

	if [ ! -d $BACKUP_DIR ]; then
		      echo "NOTA: A Pasta de $BACKUP_DIR nao existe!!! Criando..."
		      mkdir -p $BACKUP_DIR
		      if [ "$?" != "0" ]; then
			  echo "ERRO: A Pasta $BACKUP_DIR nao pode ser criada, saindo do Backup"
			  
		      fi
		      echo "NOTA: Pasta Criada $BACKUP_DIR" 
		fi

	
		if [ -d $BACKUP_DIR ]; 
		 then
			#Gerando arquivo sql
			echo "  -- Gerando Backup da base de dados $DB_NAME em $BACKUP_DIR/$BACKUP_NAME ..."
			$MYSQLDUMP $DB_NAME $DB_PARAM -u $DB_USER -p$DB_PASS > $BACKUP_DIR/$BACKUP_NAME

			# Compactando arquivo em tar
			#echo "  -- Compactando arquivo em tar ..."
			#tar -cf $BACKUP_DIR/$BACKUP_TAR -C $BACKUP_DIR $BACKUP_NAME
		 else
			echo "ERRO: Impossivel fazer BACKUP do banco de dados!!!"
		fi
 else
	echo "NOTA: OPÇÃO BACKUP MYSQL DESATIVADA"
fi




# Verifica se existe a pasta
if [ ! -d $DIRETORIOFONTE ]; then
      echo "ERRO: A Pasta FONTE: $DIRETORIOFONTE nao existe!!!, saindo do Backup"
          exit 1
fi

echo "NOTA: Pasta FONTE OK: $DIRETORIOFONTE"

if [ ! -d $DIRETORIOARQBCK ]; then
      echo "NOTA: A Pasta de $DIRETORIOARQBCK nao existe!!! Criando..."
      mkdir -p $DIRETORIOARQBCK
      if [ "$?" != "0" ]; then
          echo "ERRO: A Pasta $DIRETORIOARQBCK nao pode ser criada, saindo do Backup"
          exit 1
      fi
      echo "NOTA: Pasta Criada" 
fi



# Entrando no diretorio de backup
echo "Entrando no diretorio de Backup..."
cd $DIRETORIOARQBCK

# Listando Diretorio
echo "Listando diretorio..."
ls -l

# fazendo o backup
echo "Fazendo Backup..."
tar -cjvf $DATA.tar.bz2 $DIRETORIOFONTE


echo "Entrando no diretorio de envio de arquivos"
cd $DIRETORIOARQBCK

echo "Confirmando Diretorio..."
ls -l

# compactando o arquivo para que nao fique muito grande e comer a banda da lan.
#echo "Compactando arquivo..."
#tar -cjvf $DATA.tar.bz2 $DATAA.tar.bz2

# espere por segundos
sleep 5


if [ $FTP_ATIVADO != "FALSE" ]; then
 echo "PREPARANDO FTP..."
# conecte-se ao servidor FTP e envie o arquivo
echo "NOTA: conectando no servidor FTP..."
ftp -inv << EOF 2> ftp.error
    open $FTPSERVER
    user $USERNAME $PASSWORD
    cd $LOCALDIR
    ls -l
    binary
    put $DATA.tar.bz2
    ls -l
    quit
EOF
test -s ftp.error && echo "ERRO: FALHA ENVIO FTP" || rm ftp.error
else
 echo "NOTA: ENVIO FTP DESATIVADO"
fi
echo "FIM"
exit 1

