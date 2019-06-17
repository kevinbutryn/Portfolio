clear
$server = "192.168.86.48\SQLEXPRESS"
#$server = "KEVIN-PC\SQLEXPRESS"
$Database = "db1"

$Connection = New-Object System.Data.SQLClient.SQLConnection
$Connection.ConnectionString = "server='$Server';database='$Database';trusted_connection=true;"
$Connection.Open()
$Command = New-Object System.Data.SQLClient.SQLCommand
$Command.Connection = $Connection
#foreach($i in $list) {
#}


$sql = "INSERT INTO [dbo].[t1]
           ([number])
     VALUES
           (1)"


$Command.CommandText = $sql
$Command.ExecuteReader()

$Connection.Close()











#    $sql ="if not exists (select 1 from [table_nm] where column_nm = '$i' ) 
#        begin 
#        insert table_nm
#        select '$i'
#        end
#    " 