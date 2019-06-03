Clear-Host

## Variables
$isProd = $false

$stocks = ("AMD", "APPL", "SPY")
$stock = ""

foreach($s in $stocks){
    $stock = "${stock}${s}2b"
}
$stock = $stock.substring(0, $stock.Length - 1)





## Test if prod
if($isProd){
    write-host("Running on Production")
    $token = "pk_5bf0d8bcd4e74033a6d2711ffec667e4"
    $IEXurl = "https://cloud.iexapis.com/?symbols="
} else{
    write-host ("Running on TestNet")
    $token = "Tpk_53945fccb66f4aaa9a5cc3cb96bb6b10"
    $IEXurl = "https://sandbox.iexapis.com?symbols="
}

$url = "${IEXurl}${stock}${token}"
write-host $url

#https://cloud.iexapis.com/stable/stock/AMD/news/last/1?token=pk_5bf0d8bcd4e74033a6d2711ffec667e4
#https://cloud.iexapis.com/stable/stock/AMD/quote?token=pk_5bf0d8bcd4e74033a6d2711ffec667e4
#$result = Invoke-RestMethod 