#############################
#Kevin Butryn################
#Date Started:8/18/2018######
#CreditCardStatementImport###
#############################
clear-host

#############################
#Variable Decleration########
#############################

Add-Type -Path "C:\Users\kevin\Documents\Coding Projects\creditCardStatementAnlysis\Convert-PDF\1.1\itextsharp.dll"
$singleShot = $false
$yearlyTotal = 0
$currentYear = (Get-Date).year

#connection Information
$Server = "KEVIN-PC\SQLEXPRESS"
$Database = "CCSA"
$table_name = "CCStatements"

#Declare Import table
$tabName = "SampleTable"
$table = New-Object system.Data.DataTable “$tabName”

$col1 = New-Object system.Data.DataColumn Date,([string])
$col2 = New-Object system.Data.DataColumn Location,([string])
$col3 = New-Object system.Data.DataColumn Price,([string])

$table.columns.add($col1)
$table.columns.add($col2)
$table.columns.add($col3)

#get CC Statment pdfs
$pdfs = gci "C:\Users\kevin\Documents\CCstatements" *.pdf

if($singleShot) #Single file
{
    #select last file only
    $pdfs = $pdfs[-1]
}
else #all pdf statments
{
    #purge DB
    $UserSqlQuery= $("Delete FROM [CCSA].[dbo].[CCStatements]")
    ExecuteSqlQuery $Server $Database $UserSqlQuery
}

#############################
#Function Decleration########
#############################

function Write-DataTable 
{ 
    [CmdletBinding()] 
    param( 
    [Parameter(Position=0, Mandatory=$true)] [string]$ServerInstance, 
    [Parameter(Position=1, Mandatory=$true)] [string]$Database, 
    [Parameter(Position=2, Mandatory=$true)] [string]$TableName, 
    [Parameter(Position=3, Mandatory=$true)] $Data, 
    [Parameter(Position=4, Mandatory=$false)] [string]$Username, 
    [Parameter(Position=5, Mandatory=$false)] [string]$Password, 
    [Parameter(Position=6, Mandatory=$false)] [Int32]$BatchSize=50000, 
    [Parameter(Position=7, Mandatory=$false)] [Int32]$QueryTimeout=0, 
    [Parameter(Position=8, Mandatory=$false)] [Int32]$ConnectionTimeout=15 
    ) 
     
    $conn=new-object System.Data.SqlClient.SQLConnection 
 
    if ($Username) 
    { $ConnectionString = "Server={0};Database={1};User ID={2};Password={3};Trusted_Connection=False;Connect Timeout={4}" -f $ServerInstance,$Database,$Username,$Password,$ConnectionTimeout } 
    else 
    { $ConnectionString = "Server={0};Database={1};Integrated Security=True;Connect Timeout={2}" -f $ServerInstance,$Database,$ConnectionTimeout } 
 
    $conn.ConnectionString=$ConnectionString 
 
    try 
    { 
        $conn.Open() 
        $bulkCopy = new-object ("Data.SqlClient.SqlBulkCopy") $connectionString 
        $bulkCopy.DestinationTableName = $tableName 
        $bulkCopy.BatchSize = $BatchSize 
        $bulkCopy.BulkCopyTimeout = $QueryTimeOut 
        $bulkCopy.WriteToServer($Data) 
        $conn.Close() 
    } 
    catch 
    { 
        $ex = $_.Exception 
        Write-Error "$ex.Message" 
        continue 
    } 
 
} #Write-DataTable

function ExecuteSqlQuery ($Server, $Database, $SQLQuery) {
    $Datatable = New-Object System.Data.DataTable
    
    $Connection = New-Object System.Data.SQLClient.SQLConnection
    $Connection.ConnectionString = "server='$Server';database='$Database';trusted_connection=true;"
    $Connection.Open()
    $Command = New-Object System.Data.SQLClient.SQLCommand
    $Command.Connection = $Connection
    $Command.CommandText = $SQLQuery
    $Reader = $Command.ExecuteReader()
    $Datatable.Load($Reader)
    $Connection.Close()
    
    return $Datatable

    #$resultsDataTable = New-Object System.Data.DataTable
    #$resultsDataTable = ExecuteSqlQuery $Server $Database $UserSqlQuery 
    #Write-Host ("The table contains: " + $resultsDataTable.Rows.Count + " rows")
}#ExecuteSqlQuery


#############################
#Program Logic###############
#############################

foreach($pdf in $pdfs) {

    write-host "______________________________________________________"
    Write-Host "processing -" $pdf.FullName
    write-host "______________________________________________________"

    # prepare the pdf
    $reader = New-Object iTextSharp.text.pdf.pdfreader -ArgumentList $pdf.FullName
    $flag_StartRecord = $false

    # for each page
    for($page = 1; $page -le $reader.NumberOfPages; $page++) {

        # set the page text
        $pageText = [iTextSharp.text.pdf.parser.PdfTextExtractor]::GetTextFromPage($reader,$page).Split([char]0x000A)
   
       foreach($line in $pageText)
       {
            #write-host "-------------------------------"
            #write-host $line
            
            #############################
            #Conditions/prerequisites####
            #############################
            
            if($line -match "New Balance")
                {$newBalance = $line}
            
            if($line -eq "PURCHASE")
                {$flag_StartRecord = $true}

            if($flag_StartRecord -eq $false)
                {continue}

            if($line -match "PURCHASES AND REDEMPTIONS")
                {break}
            
            If ($line.IndexOf("/") -ne 2)
                {continue}
            
            #############################
            #Parse String Logic##########
            #############################
            
            write-host "-------------------------------"
            write-host $line  
                      
            $date = $line.Substring(0,5)
            $price = ($line.split(' ')[-1]) -replace "[^0-9.]"
            $price = $price.TrimStart('.')

            $location = $line
                       
            if ($date.Length -ne 0)
            {
                $location = $location.Replace($date,'')
            }
            else # No date
            {
                continue
            } 
            

            if ($price.Length -ne 0)
            {
                $location = $location.Replace($price,'')
            }
            else # No price found
            {
                continue
            }
            
            if (($location -match "G2ACOMLIMIT") -or ($location -match "dhgate.com 20170617-1050"))
            {
                continue
            }                       
              
            #############################
            #Save Results to Table#######
            #############################
            #write-host $line

            #write-host $date  
            #write-host $location 
            #write-host $price
                        
            #add entry to table
            $row = $table.NewRow()
                        
            $row.Date = $date+'/'+$currentYear
            $row.Location = $location
            $row.Price =  $price

            $table.Rows.Add($row)         
                        
       }
    }
    
    write-host "______________________________________________________"
    write-host $newBalance
    $yearlyTotal += $newBalance -replace "[^0-9.]"
    $reader.Close()
    
}
#############################
#Save Data/Clean Up##########
#############################

write-host "Yearly total = " $yearlyTotal

Write-DataTable -ServerInstance $Server -Database $Database -TableName $table_name -Data $table 
  
Write-Host ""
Write-Host "done"


#############################
#JUNK########################
#############################
#$export = "C:\Users\kevin\Desktop\export.csv"
#$results = @()
#$results | epcsv $export -NoTypeInformation

#$location = ($line.Replace($date,'')).Replace($price,'')






