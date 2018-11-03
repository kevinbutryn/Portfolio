
$tabName = "SampleTable"

#Create Table object
$table = New-Object system.Data.DataTable “$tabName”

#Define Columns
$col1 = New-Object system.Data.DataColumn ColumnName1,([string])
$col2 = New-Object system.Data.DataColumn ColumnName2,([string])

#Add the Columns
$table.columns.add($col1)
$table.columns.add($col2)

#Create a row
$row = $table.NewRow()

#Enter data in the row
$row.ColumnName1 = "A" 
$row.ColumnName2 = "1" 

#Add the row to the table
$table.Rows.Add($row)

#Display the table
$table | format-table -AutoSize 

#NOTE: Now you can also export this table to a CSV file as shown below.

$tabCsv = $table | export-csv $getPathoutputMACAddress.csv -noType